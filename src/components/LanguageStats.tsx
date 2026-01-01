import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Code } from '@phosphor-icons/react'

interface LanguageStatsProps {
  languages: Record<string, number>
  repoName: string
}

const LANGUAGE_COLORS: Record<string, string> = {
  'JavaScript': 'oklch(0.85 0.15 85)',
  'TypeScript': 'oklch(0.60 0.18 240)',
  'Python': 'oklch(0.65 0.20 220)',
  'Java': 'oklch(0.65 0.18 30)',
  'C': 'oklch(0.55 0.15 260)',
  'C++': 'oklch(0.65 0.18 340)',
  'Go': 'oklch(0.75 0.12 200)',
  'Rust': 'oklch(0.55 0.12 30)',
  'Ruby': 'oklch(0.60 0.20 10)',
  'PHP': 'oklch(0.65 0.15 260)',
  'Swift': 'oklch(0.70 0.18 30)',
  'Kotlin': 'oklch(0.65 0.18 280)',
  'Shell': 'oklch(0.60 0.10 150)',
  'HTML': 'oklch(0.65 0.20 25)',
  'CSS': 'oklch(0.60 0.18 270)',
  'default': 'oklch(0.65 0.12 250)'
}

export function LanguageStats({ languages, repoName }: LanguageStatsProps) {
  const languageData = useMemo(() => {
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)
    
    if (totalBytes === 0) return []
    
    return Object.entries(languages)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: (bytes / totalBytes) * 100,
        color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.default
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 5)
  }, [languages])

  if (languageData.length === 0) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-sm glow-border">
        <div className="flex items-center gap-2 mb-4">
          <Code className="text-primary" size={20} weight="duotone" />
          <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Languages
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          No language data available
        </p>
      </Card>
    )
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm glow-border">
      <div className="flex items-center gap-2 mb-6">
        <Code className="text-primary" size={20} weight="duotone" />
        <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Languages
        </h3>
      </div>

      <div className="space-y-4">
        {languageData.map((lang) => (
          <div key={lang.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {lang.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {formatBytes(lang.bytes)}
                </span>
                <span className="font-semibold text-accent" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {lang.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <Progress 
              value={lang.percentage} 
              className="h-2"
              style={{
                ['--progress-background' as string]: lang.color
              } as React.CSSProperties}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex flex-wrap gap-2">
          {languageData.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
              style={{ 
                backgroundColor: `${lang.color}20`,
                borderLeft: `3px solid ${lang.color}`
              }}
            >
              <span className="font-mono">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
