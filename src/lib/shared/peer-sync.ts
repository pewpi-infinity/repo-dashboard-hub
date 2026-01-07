/**
 * P2P Sync Shim - WebRTC DataChannel wrapper
 * Optional P2P synchronization with configurable signaling
 */

import { encrypt, decrypt, generateECDHKeyPair, exportECDHPublicKey, deriveSharedSecret, importECDHPublicKey } from './crypto-helpers';

export interface P2PConfig {
  signalingUrl?: string;
  iceServers?: RTCIceServer[];
  encryptionEnabled?: boolean;
}

export interface P2PMessage {
  type: 'token' | 'auth' | 'sync' | 'ping';
  payload: any;
  timestamp: number;
  encrypted?: boolean;
}

export class P2PSync {
  private config: P2PConfig;
  private connection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private signalingSocket: WebSocket | null = null;
  private encryptionKey: CryptoKey | null = null;
  private keyPair: CryptoKeyPair | null = null;
  private isInitiator: boolean = false;
  private listeners: Map<string, Set<Function>> = new Map();

  constructor(config: P2PConfig = {}) {
    this.config = {
      signalingUrl: config.signalingUrl || 'wss://signaling.pewpi-infinity.io',
      iceServers: config.iceServers || [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ],
      encryptionEnabled: config.encryptionEnabled !== false
    };
  }

  /**
   * Initialize P2P connection
   */
  async initialize(isInitiator: boolean = false): Promise<void> {
    this.isInitiator = isInitiator;

    // Generate ECDH key pair for encryption
    if (this.config.encryptionEnabled) {
      this.keyPair = await generateECDHKeyPair();
    }

    // Create RTCPeerConnection
    this.connection = new RTCPeerConnection({
      iceServers: this.config.iceServers
    });

    // Set up event handlers
    this.connection.onicecandidate = this.handleIceCandidate.bind(this);
    this.connection.onconnectionstatechange = this.handleConnectionStateChange.bind(this);

    if (isInitiator) {
      // Initiator creates data channel
      this.dataChannel = this.connection.createDataChannel('pewpi-sync');
      this.setupDataChannel();

      // Create offer
      const offer = await this.connection.createOffer();
      await this.connection.setLocalDescription(offer);
      
      // Send offer via signaling (implementation depends on signaling server)
      this.sendSignalingMessage({ type: 'offer', offer });
    } else {
      // Receiver waits for data channel
      this.connection.ondatachannel = (event) => {
        this.dataChannel = event.channel;
        this.setupDataChannel();
      };
    }

    console.log('P2PSync initialized as', isInitiator ? 'initiator' : 'receiver');
  }

  /**
   * Set up data channel event handlers
   */
  private setupDataChannel(): void {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      console.log('P2P DataChannel opened');
      this.emit('connected', {});
      
      // Exchange public keys for encryption
      if (this.config.encryptionEnabled && this.keyPair) {
        this.sendPublicKey();
      }
    };

    this.dataChannel.onmessage = this.handleMessage.bind(this);

    this.dataChannel.onclose = () => {
      console.log('P2P DataChannel closed');
      this.emit('disconnected', {});
    };

    this.dataChannel.onerror = (error) => {
      console.error('P2P DataChannel error:', error);
      this.emit('error', { error });
    };
  }

  /**
   * Send public key for ECDH key exchange
   */
  private async sendPublicKey(): Promise<void> {
    if (!this.keyPair) return;

    const publicKeyStr = await exportECDHPublicKey(this.keyPair.publicKey);
    this.send({
      type: 'sync',
      payload: { action: 'exchange-key', publicKey: publicKeyStr },
      timestamp: Date.now()
    });
  }

  /**
   * Handle received public key and derive shared secret
   */
  private async handlePublicKey(publicKeyStr: string): Promise<void> {
    if (!this.keyPair) return;

    const peerPublicKey = await importECDHPublicKey(publicKeyStr);
    this.encryptionKey = await deriveSharedSecret(this.keyPair.privateKey, peerPublicKey);
    
    console.log('Encryption key derived');
    this.emit('encryption-ready', {});
  }

  /**
   * Send message through data channel
   */
  async send(message: P2PMessage): Promise<void> {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      console.warn('DataChannel not ready');
      return;
    }

    try {
      let payload = JSON.stringify(message);

      // Encrypt if enabled and key is ready
      if (this.config.encryptionEnabled && this.encryptionKey) {
        const encrypted = await encrypt(payload, this.encryptionKey);
        payload = JSON.stringify({
          ...message,
          encrypted: true,
          payload: encrypted
        });
      }

      this.dataChannel.send(payload);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  /**
   * Handle incoming message
   */
  private async handleMessage(event: MessageEvent): Promise<void> {
    try {
      let message: P2PMessage = JSON.parse(event.data);

      // Decrypt if encrypted
      if (message.encrypted && this.encryptionKey) {
        const decrypted = await decrypt(
          (message.payload as any).ciphertext,
          (message.payload as any).iv,
          this.encryptionKey
        );
        message = JSON.parse(decrypted);
      }

      // Handle special sync messages
      if (message.type === 'sync' && message.payload.action === 'exchange-key') {
        await this.handlePublicKey(message.payload.publicKey);
        return;
      }

      // Emit to listeners
      this.emit('message', message);
      this.emit(message.type, message.payload);
    } catch (error) {
      console.error('Failed to handle message:', error);
    }
  }

  /**
   * Handle ICE candidate
   */
  private handleIceCandidate(event: RTCPeerConnectionIceEvent): void {
    if (event.candidate) {
      // Send ICE candidate via signaling
      this.sendSignalingMessage({
        type: 'ice-candidate',
        candidate: event.candidate
      });
    }
  }

  /**
   * Handle connection state change
   */
  private handleConnectionStateChange(): void {
    if (!this.connection) return;

    console.log('Connection state:', this.connection.connectionState);
    this.emit('connection-state', { state: this.connection.connectionState });
  }

  /**
   * Send message via signaling server
   */
  private sendSignalingMessage(message: any): void {
    // This is a stub - actual implementation depends on signaling server
    console.log('Signaling message (stub):', message);
    
    // In production, you would send via WebSocket:
    // if (this.signalingSocket?.readyState === WebSocket.OPEN) {
    //   this.signalingSocket.send(JSON.stringify(message));
    // }
  }

  /**
   * Subscribe to events
   */
  on(event: string, callback: Function): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  /**
   * Emit event
   */
  private emit(event: string, data: any): void {
    this.listeners.get(event)?.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    });
  }

  /**
   * Close connection
   */
  close(): void {
    this.dataChannel?.close();
    this.connection?.close();
    this.signalingSocket?.close();
    
    this.dataChannel = null;
    this.connection = null;
    this.signalingSocket = null;
    this.encryptionKey = null;
    this.keyPair = null;
    
    console.log('P2P connection closed');
  }
}

/**
 * Create and initialize P2P sync
 */
export async function createP2PSync(config?: P2PConfig, isInitiator: boolean = false): Promise<P2PSync> {
  const p2p = new P2PSync(config);
  await p2p.initialize(isInitiator);
  return p2p;
}

export default { P2PSync, createP2PSync };
