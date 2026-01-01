import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { FilmStrip, Skull, CheckCircle, XCircle, Warning, ArrowRight, ArrowCounterClockwise } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

export type StoryNode = {
  id: string
  title: string
  scene: string
  description: string
  brokenScript?: string
  correctScript?: string
  image?: string
  choices?: {
    text: string
    nextId: string
    requiresCorrection?: boolean
  }[]
  outcome?: 'good' | 'bad' | 'neutral'
  emoji: string
}

type StoryProgress = {
  currentNodeId: string
  visitedNodes: string[]
  corrections: number
  failures: number
  endings: string[]
}

export function CreepshowStory() {
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null)
  const [scriptInput, setScriptInput] = useState('')
  const [showCorrection, setShowCorrection] = useState(false)
  const [isUnderwater, setIsUnderwater] = useState(false)
  const [progress, setProgress] = useKV<StoryProgress>('creepshow-progress', {
    currentNodeId: 'start',
    visitedNodes: [],
    corrections: 0,
    failures: 0,
    endings: []
  })

  const storyNodes: Record<string, StoryNode> = {
    start: {
      id: 'start',
      title: '🎬 The Opening Frame',
      scene: 'Scene 1: The Discovery',
      description: 'You discover an old film reel in the Truvio Studios archive. The label reads "The Quantum Incident - UNFINISHED". As you load it into the projector, the screen flickers to life with a grainy black-and-white scene.',
      emoji: '🎞️',
      choices: [
        { text: 'Start the projector', nextId: 'scene2' },
        { text: 'Examine the reel more closely', nextId: 'inspect' }
      ]
    },
    
    inspect: {
      id: 'inspect',
      title: '🔍 The Inspection',
      scene: 'Scene 1b: A Closer Look',
      description: 'Upon closer inspection, you notice script notes scrawled on the film canister: "WARNING: Timeline corrupted. Script corrections required to prevent drowning sequence." A chill runs down your spine.',
      emoji: '⚠️',
      brokenScript: 'character.dive(depth: INFINITE)',
      correctScript: 'character.dive(depth: SAFE_LIMIT)',
      choices: [
        { text: 'Continue despite the warning', nextId: 'scene2', requiresCorrection: false },
        { text: 'Fix the script before proceeding', nextId: 'scene2_safe', requiresCorrection: true }
      ]
    },

    scene2: {
      id: 'scene2',
      title: '🌊 The Laboratory',
      scene: 'Scene 2: Descent into Danger',
      description: 'The scene shows a scientist in a 1950s laboratory, standing before a massive quantum computer. Thunder crashes outside. "I can bend time itself!" he declares. But the script has an error - the protective safeguards are missing.',
      emoji: '⚡',
      brokenScript: `function activateQuantumField() {
  power.setLevel(MAXIMUM);
  shields.disable();
  temporal.unlock();
}`,
      correctScript: `function activateQuantumField() {
  power.setLevel(SAFE_MAXIMUM);
  shields.enable();
  temporal.unlock();
}`,
      choices: [
        { text: 'Ignore the script error', nextId: 'underwater_bad' },
        { text: 'Correct the script', nextId: 'scene3_fixed', requiresCorrection: true }
      ]
    },

    scene2_safe: {
      id: 'scene2_safe',
      title: '🛡️ The Safe Path',
      scene: 'Scene 2: Cautious Progress',
      description: 'Thanks to your earlier correction, the scene unfolds safely. The scientist activates the quantum field with proper safeguards. Reality ripples but holds steady. You feel the narrative shifting in your favor.',
      emoji: '✨',
      choices: [
        { text: 'Continue the story', nextId: 'scene3_safe' }
      ],
      outcome: 'good'
    },

    scene3_safe: {
      id: 'scene3_safe',
      title: '🌟 The Breakthrough',
      scene: 'Scene 3: Success',
      description: 'The quantum field stabilizes beautifully. Through the portal, you see infinite timelines branching like a cosmic tree. The scientist smiles. "We did it! Time itself bends to our will!" But wait - another script error appears in the closing sequence.',
      emoji: '🎯',
      brokenScript: `portal.close();
memory.erase(ALL);
scientist.fate = "forgotten";`,
      correctScript: `portal.close();
memory.preserve(KEY_MOMENTS);
scientist.fate = "remembered_hero";`,
      choices: [
        { text: 'Let the original script play', nextId: 'ending_bittersweet' },
        { text: 'Correct the ending script', nextId: 'ending_perfect', requiresCorrection: true }
      ]
    },

    scene3_fixed: {
      id: 'scene3_fixed',
      title: '⚡ The Correction',
      scene: 'Scene 3: Narrowly Avoided',
      description: 'Your script correction takes effect just in time! The shields engage before the quantum surge. The scientist looks startled but safe. "That was close," he mutters. The film continues, but you notice water beginning to seep into the frame edges...',
      emoji: '💧',
      brokenScript: `if (surge.detected) {
  containment.attempt();
  // BUG: No fallback!
}`,
      correctScript: `if (surge.detected) {
  containment.attempt();
  if (!containment.success) {
    emergency.protocol();
  }
}`,
      choices: [
        { text: 'Leave the bug', nextId: 'underwater_partial' },
        { text: 'Fix the fallback code', nextId: 'scene4_recovered', requiresCorrection: true }
      ]
    },

    scene4_recovered: {
      id: 'scene4_recovered',
      title: '🔧 The Recovery',
      scene: 'Scene 4: Crisis Management',
      description: 'Your continued corrections are stabilizing the narrative! The water recedes. The scientist implements the emergency protocol, and the quantum computer powers down safely. "Someone out there is helping me," he says, looking directly at the camera. At you.',
      emoji: '👁️',
      choices: [
        { text: 'Acknowledge the scientist', nextId: 'meta_revelation' },
        { text: 'Stay silent', nextId: 'ending_grateful' }
      ],
      outcome: 'good'
    },

    meta_revelation: {
      id: 'meta_revelation',
      title: '🎭 The Fourth Wall',
      scene: 'Scene 5: Breaking Reality',
      description: 'The scientist steps closer to the camera. "You can see the scripts, can\'t you? The code that makes our reality?" The film grain intensifies. "There\'s one more correction needed. A big one. But it will change everything..."',
      emoji: '🌀',
      brokenScript: `reality.layers = ["film", "viewer"];
boundary.status = "solid";
awareness.limit = "medium";`,
      correctScript: `reality.layers = ["film", "viewer", "quantum", "infinity"];
boundary.status = "permeable";
awareness.limit = "unlimited";`,
      choices: [
        { text: 'Make the final correction', nextId: 'ending_transcendent', requiresCorrection: true },
        { text: 'Preserve the fourth wall', nextId: 'ending_grateful' }
      ]
    },

    underwater_bad: {
      id: 'underwater_bad',
      title: '🌊 DROWNING SEQUENCE',
      scene: 'Scene X: The Deep',
      description: 'The uncorrected script triggers a cascade failure! Water floods the laboratory. The scientist tries to swim but the quantum field pulls him deeper. The entire scene submerges in murky water. You can barely make out shapes through the bubbles. The film stutters and loops.',
      emoji: '💀',
      outcome: 'bad',
      choices: [
        { text: 'Try to salvage the timeline', nextId: 'underwater_struggle' },
        { text: 'Accept the dark ending', nextId: 'ending_drowned' }
      ]
    },

    underwater_partial: {
      id: 'underwater_partial',
      title: '🌊 Partial Submersion',
      scene: 'Scene X: Rising Waters',
      description: 'The missing fallback causes water to slowly fill the scene. It\'s not catastrophic yet, but the scientist is ankle-deep and rising. "I can still fix this!" he shouts, but his voice sounds distant, distorted. You have one more chance.',
      emoji: '💧',
      brokenScript: `water.level += RATE_FAST;
time.remaining = 60;`,
      correctScript: `water.level = water.drain();
time.remaining = SAFE;`,
      choices: [
        { text: 'Drain the water with code', nextId: 'scene5_rescued', requiresCorrection: true },
        { text: 'Let it flood', nextId: 'underwater_bad' }
      ]
    },

    underwater_struggle: {
      id: 'underwater_struggle',
      title: '🤿 The Struggle',
      scene: 'Scene X: Fighting the Tide',
      description: 'You frantically try to patch the script, but the water keeps rising. The scientist is swimming now, looking up desperately. You can see his mouth forming words but no sound reaches you through the water. One last desperate correction might save him.',
      emoji: '⚠️',
      brokenScript: `oxygen.remaining = 0;
timeline.status = "collapsed";
narrative.end = true;`,
      correctScript: `oxygen.restore();
timeline.status = "repairing";
narrative.end = false;`,
      choices: [
        { text: 'Emergency script rewrite', nextId: 'scene5_rescued', requiresCorrection: true },
        { text: 'It\'s too late', nextId: 'ending_drowned' }
      ]
    },

    scene5_rescued: {
      id: 'scene5_rescued',
      title: '💨 The Rescue',
      scene: 'Scene 5: Emergence',
      description: 'Your correction creates a powerful drainage vortex! The water spirals away, leaving the scientist gasping on the floor. "Thank you," he wheezes. "I don\'t know who you are, but you saved my life. And maybe... the timeline itself." The scene stabilizes.',
      emoji: '🌬️',
      outcome: 'good',
      choices: [
        { text: 'Complete the story', nextId: 'ending_heroic' }
      ]
    },

    ending_drowned: {
      id: 'ending_drowned',
      title: '💀 THE END: Drowned',
      scene: 'Final Scene: Lost',
      description: 'The screen fills completely with dark water. The scientist is gone. The quantum computer sparks and dies underwater. As the film ends, text appears: "Some scripts cannot be saved. Some timelines end in darkness. But you can always try again..." The projector clicks off.',
      emoji: '🎬',
      outcome: 'bad',
      choices: [
        { text: 'Rewind and try again', nextId: 'start' }
      ]
    },

    ending_bittersweet: {
      id: 'ending_bittersweet',
      title: '🌙 THE END: Forgotten',
      scene: 'Final Scene: Memory Erased',
      description: 'The portal closes. The scientist\'s memories fade. In the final frame, he sits alone in the lab, staring at equations he no longer understands. A single tear rolls down his cheek. "I feel like I forgot something important..." The screen fades to black. Credits roll.',
      emoji: '😢',
      outcome: 'neutral',
      choices: [
        { text: 'Try for a better ending', nextId: 'start' }
      ]
    },

    ending_grateful: {
      id: 'ending_grateful',
      title: '🙏 THE END: Grateful',
      scene: 'Final Scene: Quiet Success',
      description: 'The scientist completes his work safely. As he leaves the lab, he pauses at the door and looks back. "I felt someone watching over me today," he says softly. "Guardian angel, maybe. Or something stranger." He smiles and leaves. The quantum computer hums peacefully. A good ending.',
      emoji: '✨',
      outcome: 'good',
      choices: [
        { text: 'Play again', nextId: 'start' }
      ]
    },

    ending_perfect: {
      id: 'ending_perfect',
      title: '🌟 THE END: Perfect',
      scene: 'Final Scene: Legend',
      description: 'With your final correction, everything aligns perfectly. The scientist becomes a hero, remembered across all timelines. The quantum computer opens pathways to infinite possibilities. The screen shimmers and text appears: "LEGEND STATUS ACHIEVED - All scripts corrected. All timelines saved. You are the master of narrative destiny."',
      emoji: '👑',
      outcome: 'good',
      choices: [
        { text: 'Play again for different paths', nextId: 'start' }
      ]
    },

    ending_heroic: {
      id: 'ending_heroic',
      title: '🦸 THE END: Hero',
      scene: 'Final Scene: Rescue',
      description: 'The scientist completes his work, forever changed by the near-death experience. In the final frame, he writes in his journal: "Today I was saved by someone - something - that exists outside the script. They corrected my fate. I owe them everything." The sun rises. A new day begins.',
      emoji: '🌅',
      outcome: 'good',
      choices: [
        { text: 'Experience another timeline', nextId: 'start' }
      ]
    },

    ending_transcendent: {
      id: 'ending_transcendent',
      title: '🌌 THE END: Transcendent',
      scene: 'Final Scene: Beyond',
      description: 'The final correction shatters all boundaries. The scientist steps through the screen. The film grain dissolves into quantum particles. "We\'re free now," he says, standing in your reality. "Film, code, reality - all just different scripts. And you know how to rewrite them all." Everything shimmers with infinite possibility.',
      emoji: '♾️',
      outcome: 'good',
      choices: [
        { text: 'Explore the infinite', nextId: 'start' }
      ]
    }
  }

  useEffect(() => {
    if (!progress) return
    
    const node = storyNodes[progress.currentNodeId]
    if (node) {
      setCurrentNode(node)
      if (node.brokenScript) {
        setScriptInput(node.brokenScript)
      } else {
        setScriptInput('')
      }
      
      if (node.outcome === 'bad' && node.id.includes('underwater')) {
        setIsUnderwater(true)
        toast.error('⚠️ DROWNING SEQUENCE ACTIVATED', {
          description: 'Correct the script to survive!',
          duration: 5000
        })
      } else {
        setIsUnderwater(false)
      }
    }
  }, [progress])

  const handleChoice = (nextId: string, requiresCorrection?: boolean) => {
    if (requiresCorrection && currentNode?.correctScript) {
      const isCorrect = scriptInput.trim() === currentNode.correctScript.trim()
      
      if (isCorrect) {
        toast.success('✅ Script corrected successfully!', {
          description: 'Timeline stabilized.',
          duration: 3000
        })
        
        setProgress((prev) => ({
          currentNodeId: nextId,
          visitedNodes: [...(prev?.visitedNodes || []), currentNode.id],
          corrections: (prev?.corrections || 0) + 1,
          failures: prev?.failures || 0,
          endings: prev?.endings || []
        }))
        
        setShowCorrection(false)
      } else {
        toast.error('❌ Script correction failed!', {
          description: 'The timeline remains unstable.',
          duration: 3000
        })
        
        setProgress((prev) => ({
          currentNodeId: prev?.currentNodeId || 'start',
          visitedNodes: prev?.visitedNodes || [],
          corrections: prev?.corrections || 0,
          failures: (prev?.failures || 0) + 1,
          endings: prev?.endings || []
        }))
      }
    } else {
      setProgress((prev) => {
        const newProgress = {
          currentNodeId: nextId,
          visitedNodes: [...(prev?.visitedNodes || []), currentNode?.id || ''],
          corrections: prev?.corrections || 0,
          failures: prev?.failures || 0,
          endings: prev?.endings || []
        }
        
        if (currentNode?.outcome && !(prev?.endings || []).includes(currentNode.id)) {
          newProgress.endings = [...newProgress.endings, currentNode.id]
        }
        
        return newProgress
      })
      
      setShowCorrection(false)
    }
  }

  const resetStory = () => {
    setProgress({
      currentNodeId: 'start',
      visitedNodes: [],
      corrections: 0,
      failures: 0,
      endings: []
    })
    setScriptInput('')
    setShowCorrection(false)
    setIsUnderwater(false)
  }

  const progressPercent = ((progress?.visitedNodes?.length || 0) / Object.keys(storyNodes).length) * 100

  if (!currentNode) return null

  return (
    <div className={`min-h-screen relative overflow-hidden ${isUnderwater ? 'underwater-effect' : ''}`}>
      {isUnderwater && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue/30 via-blue/50 to-blue/70 animate-pulse pointer-events-none z-10" />
      )}
      
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              oklch(0.25 0.12 280 / 0.1) 0px,
              transparent 2px,
              transparent 40px,
              oklch(0.25 0.12 280 / 0.1) 42px
            ),
            repeating-linear-gradient(
              90deg,
              oklch(0.25 0.12 280 / 0.1) 0px,
              transparent 2px,
              transparent 40px,
              oklch(0.25 0.12 280 / 0.1) 42px
            )
          `
        }}
      />

      <div className="relative z-20 container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple via-pink to-red bg-clip-text text-transparent"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <FilmStrip size={40} className="inline-block mr-3 text-purple" weight="fill" />
              CREEPSHOW INTERACTIVE
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={resetStory}
              className="gap-2"
            >
              <ArrowCounterClockwise size={16} />
              Restart
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-purple/50">
              <div className="text-xs text-muted-foreground mb-1">Scenes Visited</div>
              <div className="text-2xl font-bold text-purple">{progress?.visitedNodes?.length || 0}</div>
            </Card>
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-green/50">
              <div className="text-xs text-muted-foreground mb-1">Corrections</div>
              <div className="text-2xl font-bold text-green">{progress?.corrections || 0}</div>
            </Card>
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-red/50">
              <div className="text-xs text-muted-foreground mb-1">Failures</div>
              <div className="text-2xl font-bold text-red">{progress?.failures || 0}</div>
            </Card>
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-gold/50">
              <div className="text-xs text-muted-foreground mb-1">Endings Found</div>
              <div className="text-2xl font-bold text-gold">{progress?.endings?.length || 0}</div>
            </Card>
          </div>

          <div className="mb-2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Story Progress</span>
              <span className="text-accent font-mono">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`p-8 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-lg border-2 ${
              isUnderwater ? 'border-blue glow-border-accent' : 
              currentNode.outcome === 'bad' ? 'border-red glow-border' :
              currentNode.outcome === 'good' ? 'border-green glow-border' :
              'border-purple/50'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl emoji-glow">{currentNode.emoji}</span>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2 text-accent border-accent/50">
                    {currentNode.scene}
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {currentNode.title}
                  </h2>
                </div>
              </div>

              {currentNode.outcome && (
                <Alert className={`mb-6 ${
                  currentNode.outcome === 'bad' ? 'border-red bg-red/10' :
                  currentNode.outcome === 'good' ? 'border-green bg-green/10' :
                  'border-yellow bg-yellow/10'
                }`}>
                  {currentNode.outcome === 'bad' ? <Skull size={20} className="text-red" /> :
                   currentNode.outcome === 'good' ? <CheckCircle size={20} className="text-green" /> :
                   <Warning size={20} className="text-yellow" />}
                  <AlertDescription className="ml-2">
                    {currentNode.outcome === 'bad' ? 'Bad Ending' :
                     currentNode.outcome === 'good' ? 'Good Ending' :
                     'Neutral Ending'}
                  </AlertDescription>
                </Alert>
              )}

              <p className="text-lg leading-relaxed mb-8 text-foreground/90">
                {currentNode.description}
              </p>

              {currentNode.brokenScript && (
                <div className="mb-8 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="text-red" size={20} />
                    <span className="font-bold text-red">Broken Script Detected</span>
                  </div>
                  
                  <Textarea
                    value={scriptInput}
                    onChange={(e) => setScriptInput(e.target.value)}
                    className="font-mono text-sm bg-muted/50 border-red/50 min-h-[150px]"
                    placeholder="Enter the corrected script here..."
                  />

                  {currentNode.correctScript && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCorrection(!showCorrection)}
                      className="gap-2"
                    >
                      {showCorrection ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      {showCorrection ? 'Hide' : 'Show'} Correct Script
                    </Button>
                  )}

                  {showCorrection && currentNode.correctScript && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-green/10 border border-green/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="text-green" size={16} />
                        <span className="font-semibold text-green text-sm">Correct Script:</span>
                      </div>
                      <pre className="font-mono text-xs text-foreground/90 whitespace-pre-wrap">
                        {currentNode.correctScript}
                      </pre>
                    </motion.div>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-3">
                {currentNode.choices?.map((choice, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleChoice(choice.nextId, choice.requiresCorrection)}
                    className={`justify-between text-left h-auto py-4 px-6 ${
                      choice.requiresCorrection 
                        ? 'bg-gradient-to-r from-green to-accent hover:from-green/90 hover:to-accent/90' 
                        : 'bg-gradient-to-r from-primary to-purple hover:from-primary/90 hover:to-purple/90'
                    }`}
                    size="lg"
                  >
                    <span className="flex-1">{choice.text}</span>
                    <ArrowRight size={20} weight="bold" />
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <Card className="mt-6 p-6 bg-card/60 backdrop-blur-sm border-accent/30">
          <h3 className="font-bold mb-3 text-accent flex items-center gap-2">
            <FilmStrip size={20} />
            How to Play
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Read each scene and make choices to progress the story</li>
            <li>• When you see <span className="text-red font-bold">Broken Script Detected</span>, you must correct the code</li>
            <li>• Some choices require script correction - fix the code before proceeding</li>
            <li>• Wrong corrections lead to dangerous outcomes (including drowning sequences!)</li>
            <li>• Find all endings to master the narrative</li>
            <li>• Your progress and stats are tracked automatically</li>
          </ul>
        </Card>
      </div>

      <style>{`
        .underwater-effect {
          animation: underwater 3s ease-in-out infinite;
        }
        
        @keyframes underwater {
          0%, 100% {
            filter: hue-rotate(0deg) blur(0px);
          }
          50% {
            filter: hue-rotate(20deg) blur(1px);
          }
        }
      `}</style>
    </div>
  )
}
