import { Card } from './ui/card'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { 
  GitBranch, 
  ArrowSquareOut, 
  Question,
  ChartLine,
  Code,
  Users
} from '@phosphor-icons/react'

interface EmptyStateProps {
  hasSearchQuery: boolean
  searchQuery?: string
  onReset?: () => void
}

export function EmptyState({ hasSearchQuery, searchQuery, onReset }: EmptyStateProps) {
  if (hasSearchQuery) {
    return (
      <Alert className="bg-card/50 border-border/50">
        <AlertDescription className="flex items-center justify-between">
          <span>
            No repositories match <strong>"{searchQuery}"</strong>. Try a different search term.
          </span>
          {onReset && (
            <Button variant="outline" size="sm" onClick={onReset}>
              Clear Search
            </Button>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="p-12 border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
          <GitBranch size={48} className="text-primary" weight="bold" />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            No Repositories Found
          </h2>
          <p className="text-muted-foreground text-lg">
            We couldn't load repositories from <strong>pewpi-infinity</strong> organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <Card className="p-4 border-border/30 bg-muted/20">
            <div className="flex items-start gap-3">
              <Question size={24} className="text-primary mt-1" weight="bold" />
              <div>
                <h3 className="font-semibold mb-1">Check Organization</h3>
                <p className="text-sm text-muted-foreground">
                  Verify the organization name is correct and publicly accessible.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/30 bg-muted/20">
            <div className="flex items-start gap-3">
              <Users size={24} className="text-accent mt-1" weight="bold" />
              <div>
                <h3 className="font-semibold mb-1">API Rate Limits</h3>
                <p className="text-sm text-muted-foreground">
                  GitHub API may have rate limits. Try again in a few minutes.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">Helpful Resources</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://github.com/pewpi-infinity" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gap-2"
              >
                <GitBranch size={16} />
                View Organization
                <ArrowSquareOut size={14} />
              </a>
            </Button>
            
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://docs.github.com/en/rest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Code size={16} />
                API Docs
                <ArrowSquareOut size={14} />
              </a>
            </Button>
            
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://www.githubstatus.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gap-2"
              >
                <ChartLine size={16} />
                GitHub Status
                <ArrowSquareOut size={14} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
