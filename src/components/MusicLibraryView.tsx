import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { 
  MusicNotes, 
  House, 
  Sparkle, 
  Funnel, 
  GridFour,
  Play,
  Disc,
  Moon
} from '@phosphor-icons/react'
import { musicLibrary, type MusicTrack } from '@/lib/media-semantic'
import { motion } from 'framer-motion'

interface MusicLibraryViewProps {
  onSelectTrack: (track: MusicTrack) => void
  currentTrackId?: string
}

export function MusicLibraryView({ onSelectTrack, currentTrackId }: MusicLibraryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = {
    all: {
      label: 'All Music',
      icon: <MusicNotes size={20} weight="fill" />,
      color: 'text-foreground',
      tracks: musicLibrary
    },
    'single-port': {
      label: '💲 Single Port',
      icon: <House size={20} weight="fill" />,
      color: 'text-green',
      tracks: musicLibrary.filter(t => t.themes.includes('taking-home') || t.themes.includes('single-repo'))
    },
    'multistar': {
      label: '✨ Multistar',
      icon: <Sparkle size={20} weight="fill" />,
      color: 'text-purple',
      tracks: musicLibrary.filter(t => 
        t.themes.includes('faceting') || 
        t.themes.includes('multistar') || 
        t.themes.includes('star') ||
        t.id.includes('shine-on') ||
        t.id.includes('starman') ||
        t.id === 'electric-light-orchestra-mr-blue-sky'
      )
    },
    'modulator': {
      label: '🎛️ Modulator',
      icon: <Funnel size={20} weight="fill" />,
      color: 'text-accent',
      tracks: musicLibrary.filter(t => 
        t.themes.includes('modulation') || 
        t.themes.includes('filtering') ||
        t.themes.includes('control') ||
        t.id === 'cheap-trick-one-i-want' ||
        t.id === 'pink-floyd-welcome-machine' ||
        t.id === 'devo-whip-it' ||
        t.id === 'queen-another-one-bites'
      )
    },
    'robot': {
      label: '🦾 Robot',
      icon: <GridFour size={20} weight="fill" />,
      color: 'text-red',
      tracks: musicLibrary.filter(t => 
        t.themes.includes('robot') || 
        t.themes.includes('automation') ||
        t.themes.includes('machine') ||
        t.id === 'styx-mr-roboto' ||
        t.id === 'queen-we-will-rock-you' ||
        t.id === 'pink-floyd-welcome-machine'
      )
    },
    'flow': {
      label: '🔀 Flow',
      icon: <Play size={20} weight="fill" />,
      color: 'text-yellow',
      tracks: musicLibrary.filter(t => 
        t.themes.includes('journey') || 
        t.themes.includes('movement') ||
        t.themes.includes('flow') ||
        t.id === 'the-doobie-brothers-long-train' ||
        t.id === 'grateful-dead-truckin' ||
        t.id === 'steve-miller-band-fly-like-eagle'
      )
    },
    'dark-side': {
      label: '🌙 Dark Side',
      icon: <Moon size={20} weight="fill" />,
      color: 'text-blue',
      tracks: musicLibrary.filter(t => t.album === 'The Dark Side of the Moon')
    },
    'pink-floyd': {
      label: '🌀 Pink Floyd',
      icon: <Disc size={20} weight="fill" />,
      color: 'text-purple',
      tracks: musicLibrary.filter(t => t.artist === 'Pink Floyd')
    },
    'classic-rock': {
      label: '🎸 Classic Rock',
      icon: <Disc size={20} weight="fill" />,
      color: 'text-orange',
      tracks: musicLibrary.filter(t => 
        t.artist !== 'Pink Floyd' && 
        (t.artist === 'Rush' || 
         t.artist === 'The Beatles' || 
         t.artist === 'Queen' ||
         t.artist === 'Led Zeppelin' ||
         t.artist === 'AC/DC' ||
         t.artist === 'The Who')
      )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 
          className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple via-pink to-gold bg-clip-text text-transparent"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          🎵 Quantum Music Library
        </h2>
        <p className="text-sm text-muted-foreground">
          Music semantically matched to machine journeys - filters aimed at supporting growth and happiness
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-9 gap-2 h-auto p-2 bg-card/50">
          {Object.entries(categories).map(([key, cat]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="flex flex-col items-center gap-1 h-auto py-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple/20 data-[state=active]:to-pink/20"
            >
              <div className={cat.color}>{cat.icon}</div>
              <span className="text-xs">{cat.label}</span>
              <Badge variant="outline" className="text-xs">
                {cat.tracks.length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categories).map(([key, cat]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-3">
                {cat.tracks.map((track, index) => {
                  const isPlaying = currentTrackId === track.id
                  const hasUrl = !!track.url

                  return (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className={`p-4 transition-all cursor-pointer ${
                          isPlaying
                            ? 'bg-gradient-to-br from-purple/30 via-pink/20 to-gold/30 border-purple/50 shadow-lg'
                            : 'bg-card/50 hover:bg-card/80 border-border/50 hover:border-purple/30'
                        }`}
                        onClick={() => hasUrl && onSelectTrack(track)}
                      >
                        <div className="flex items-start gap-4">
                          <div 
                            className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isPlaying
                                ? 'bg-gradient-to-br from-purple via-pink to-gold animate-pulse'
                                : 'bg-gradient-to-br from-purple/20 via-pink/10 to-gold/20'
                            }`}
                          >
                            {isPlaying ? (
                              <Play size={24} weight="fill" className="text-foreground" />
                            ) : (
                              <MusicNotes size={24} weight="fill" className="text-purple" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-foreground truncate mb-1">
                                  {track.title}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate">
                                  {track.artist} {track.album && `• ${track.album}`}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                <Badge variant="outline" className="text-xs font-mono">
                                  {track.duration}
                                </Badge>
                                {!hasUrl && (
                                  <Badge variant="outline" className="text-xs bg-yellow/20 border-yellow/30 text-yellow">
                                    Link pending
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {track.lyrics && (
                              <p className="text-xs text-muted-foreground italic mb-2 line-clamp-2">
                                {track.lyrics}
                              </p>
                            )}

                            <div className="flex flex-wrap gap-1.5">
                              {track.themes.slice(0, 5).map(theme => (
                                <Badge 
                                  key={theme} 
                                  variant="outline" 
                                  className="text-xs bg-purple/10 border-purple/20"
                                >
                                  {theme}
                                </Badge>
                              ))}
                            </div>

                            {track.suggestedRepos.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-border/30">
                                <p className="text-xs text-muted-foreground/60 mb-1">
                                  Suggested machines:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {track.suggestedRepos.slice(0, 4).map(repo => (
                                    <Badge 
                                      key={repo} 
                                      variant="outline" 
                                      className="text-xs bg-accent/10 border-accent/20 text-accent"
                                    >
                                      {repo}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="p-4 bg-gradient-to-br from-purple/10 via-pink/5 to-gold/10 border-purple/20">
        <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
          🎼 Semantic Music Logic
        </h3>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p><strong className="text-green">💲 Take Me Home Tonight (Eddie Money):</strong> Single local porting of one repo - taking a machine home for personal use</p>
          <p><strong className="text-purple">✨💎 Shine On You Crazy Diamond (Pink Floyd):</strong> A star who facets other stars out of its own material - special for multistar systems</p>
          <p><strong className="text-accent">🎛️ I Want You to Want Me (Cheap Trick):</strong> A modulator that filters problem areas and moves you to the proper machine</p>
          <p><strong className="text-accent">🎛️ Welcome to the Machine (Pink Floyd):</strong> First-time setup and system onboarding - entering the machine</p>
          <p><strong className="text-red">🦾 Mr. Roboto (Styx):</strong> Robot automation and mechanical systems - "Domo arigato"</p>
          <p><strong className="text-blue">👁️ Every Breath You Take (The Police):</strong> Token viewing and system monitoring - watching every move</p>
          <p><strong className="text-orange">🍄 Won't Get Fooled Again (The Who):</strong> Auditing and verification - preventing deception</p>
          <p><strong className="text-yellow">⭐ Time (Pink Floyd):</strong> Runtime operations and timing systems</p>
          <p><strong className="text-green">💰 Money (Pink Floyd):</strong> Treasury tokens and value systems</p>
          <p><strong className="text-purple">🧠 Brain Damage (Pink Floyd):</strong> Neural core and learning systems</p>
          <p><strong className="text-yellow">🔀 Long Train Runnin' (Doobie Brothers):</strong> Flow control and continuous processing</p>
          <p><strong className="text-blue">🪐 More Than a Feeling (Boston):</strong> Memory systems and emotional recall</p>
          <p><strong className="text-gold">⛓️ Come Together (The Beatles):</strong> Chain linking and semantic connections</p>
          <p><strong className="text-pink">🕹️ White Rabbit (Jefferson Airplane):</strong> Navigation and branching paths - follow the rabbit hole</p>
          <p><strong className="text-red">⚡ Thunderstruck (AC/DC):</strong> Fast urgent processing and explosive energy</p>
          <p className="pt-2 border-t border-border/30 mt-2"><strong className="text-blue">🌙 Dark Side of the Moon:</strong> Individual tracks semantically timed to proper needs - Time for runtime, Money for treasury, Brain Damage for neural systems, Eclipse for completion</p>
        </div>
      </Card>
    </div>
  )
}
