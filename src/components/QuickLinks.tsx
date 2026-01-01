import { Card } from './ui/card'
import { Button } from './ui/button'
import { 
  GitBranch,
  ArrowSquareOut,
  BookOpen,
  ChartLine,
  Pulse,
  Terminal
} from '@phosphor-icons/react'

export function QuickLinks() {
  const links = [
    {
      label: 'GitHub Org',
      href: 'https://github.com/pewpi-infinity',
      icon: <GitBranch size={18} weight="bold" />,
      color: 'text-primary'
    },
    {
      label: 'Documentation',
      href: 'https://github.com/pewpi-infinity',
      icon: <BookOpen size={18} weight="bold" />,
      color: 'text-accent'
    },
    {
      label: 'Analytics',
      href: 'https://github.com/pewpi-infinity',
      icon: <ChartLine size={18} weight="bold" />,
      color: 'text-primary'
    },
    {
      label: 'System Logs',
      href: 'https://github.com/pewpi-infinity',
      icon: <Terminal size={18} weight="bold" />,
      color: 'text-accent'
    },
    {
      label: 'API Status',
      href: 'https://www.githubstatus.com/',
      icon: <Pulse size={18} weight="bold" />,
      color: 'text-primary'
    }
  ]

  return (
    <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <ArrowSquareOut size={18} className="text-muted-foreground" weight="bold" />
        Quick Links
      </h3>
      
      <div className="space-y-2">
        {links.map((link) => (
          <Button
            key={link.label}
            variant="ghost"
            size="sm"
            asChild
            className="w-full justify-start gap-2 h-9 hover:bg-muted/50"
          >
            <a 
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={link.color}>{link.icon}</span>
              <span className="flex-1 text-left text-xs">{link.label}</span>
              <ArrowSquareOut size={12} className="text-muted-foreground" />
            </a>
          </Button>
        ))}
      </div>
    </Card>
  )
}
