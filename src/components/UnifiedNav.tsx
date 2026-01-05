import { WalletDisplay } from './WalletDisplay'
import { AuthButton } from './AuthButton'

export function UnifiedNav() {
  return (
    <nav className="unified-nav">
      <div className="nav-brand">🧠 Pewpi Infinity</div>
      <div className="nav-repos">
        <a 
          href="https://pewpi-infinity.github.io/infinity-brain-searc/" 
          className="nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔍 Search & AI
        </a>
        <a 
          href="https://pewpi-infinity.github.io/repo-dashboard-hub/" 
          className="nav-link active"
        >
          📊 Dashboard & Music
        </a>
        <a 
          href="https://pewpi-infinity.github.io/banksy/" 
          className="nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          🎨 Art & Launcher
        </a>
        <a 
          href="https://pewpi-infinity.github.io/smug_look/" 
          className="nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔬 Research & Terminal
        </a>
      </div>
      <div className="nav-user">
        <WalletDisplay />
        <AuthButton />
      </div>
    </nav>
  )
}
