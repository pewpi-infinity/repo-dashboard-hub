import { useState, useMemo } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  MusicNotes,
  X,
  Info,
  ArrowsOut
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMediaForRepo, getMusicForRepo, type MediaAsset, type MusicTrack } from '@/lib/media-semantic'

interface MediaGalleryProps {
  repoName: string
  compact?: boolean
}

export function MediaGallery({ repoName, compact = false }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack | null>(null)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const mediaAssets = useMemo(() => getMediaForRepo(repoName), [repoName])
  const musicTracks = useMemo(() => getMusicForRepo(repoName), [repoName])

  const images = mediaAssets.filter(m => m.type === 'image')
  const videos = mediaAssets.filter(m => m.type === 'video')

  const handleMediaClick = (media: MediaAsset) => {
    setSelectedMedia(media)
    setShowFullscreen(true)
  }

  const handleTrackClick = (track: MusicTrack) => {
    setSelectedTrack(selectedTrack?.id === track.id ? null : track)
  }

  if (mediaAssets.length === 0 && musicTracks.length === 0) {
    return null
  }

  if (compact) {
    return (
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <ImageIcon size={16} className="text-accent" weight="fill" />
          <h4 className="text-sm font-semibold">Media Library</h4>
          <Badge variant="outline" className="ml-auto">
            {mediaAssets.length + musicTracks.length}
          </Badge>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map(media => (
            <button
              key={media.id}
              onClick={() => handleMediaClick(media)}
              className="aspect-square rounded-lg overflow-hidden border border-border/50 hover:border-accent transition-all hover:scale-105"
            >
              <img 
                src={media.src} 
                alt={media.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="images" className="gap-2">
              <ImageIcon size={16} />
              Images ({images.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <VideoIcon size={16} />
              Videos ({videos.length})
            </TabsTrigger>
            <TabsTrigger value="music" className="gap-2">
              <MusicNotes size={16} />
              Music ({musicTracks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="mt-0">
            <ScrollArea className="h-96">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map(media => (
                  <motion.button
                    key={media.id}
                    onClick={() => handleMediaClick(media)}
                    className="group relative aspect-video rounded-lg overflow-hidden border border-border/50 hover:border-accent transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={media.src} 
                      alt={media.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-sm font-semibold text-white truncate">
                          {media.name}
                        </div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {media.mood.slice(0, 2).map(mood => (
                            <span 
                              key={mood}
                              className="text-xs px-1.5 py-0.5 rounded bg-accent/80 text-white"
                            >
                              {mood}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                      >
                        <ArrowsOut size={16} className="text-white" />
                      </Button>
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="videos" className="mt-0">
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map(media => (
                  <motion.button
                    key={media.id}
                    onClick={() => handleMediaClick(media)}
                    className="group relative aspect-video rounded-lg overflow-hidden border border-border/50 hover:border-accent transition-all bg-muted"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <video 
                      src={media.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause()
                        e.currentTarget.currentTime = 0
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-sm font-semibold text-white truncate">
                          {media.name}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                      >
                        <ArrowsOut size={16} className="text-white" />
                      </Button>
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="music" className="mt-0">
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {musicTracks.map((track, index) => (
                  <motion.button
                    key={track.id}
                    onClick={() => handleTrackClick(track)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedTrack?.id === track.id
                        ? 'bg-purple/30 border border-purple/50'
                        : 'bg-card border border-border/50 hover:border-accent hover:bg-card/80'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-sm text-muted-foreground font-mono w-8 flex-shrink-0 pt-1">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">
                          {track.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {track.artist} {track.album && `• ${track.album}`}
                        </div>
                        {selectedTrack?.id === track.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 pt-2 border-t border-border/50"
                          >
                            <div className="text-xs text-muted-foreground mb-2">
                              {track.lyrics}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {track.themes.map(theme => (
                                <Badge key={theme} variant="outline" className="text-xs">
                                  {theme}
                                </Badge>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono flex-shrink-0">
                        {track.duration}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>

      <AnimatePresence>
        {showFullscreen && selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowFullscreen(false)}
          >
            <div className="relative max-w-6xl w-full max-h-full">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowFullscreen(false)}
                className="absolute top-4 right-4 z-10 h-10 w-10 p-0 bg-black/50 hover:bg-black/70 rounded-full"
              >
                <X size={20} className="text-white" />
              </Button>

              <div className="bg-card rounded-xl overflow-hidden border border-border">
                {selectedMedia.type === 'image' ? (
                  <img 
                    src={selectedMedia.src} 
                    alt={selectedMedia.name}
                    className="w-full h-auto max-h-[80vh] object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <video 
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[80vh] object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                
                <div className="p-4 bg-card/95 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {selectedMedia.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {selectedMedia.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedia.mood.map(mood => (
                          <Badge key={mood} variant="outline">
                            {mood}
                          </Badge>
                        ))}
                        {selectedMedia.semanticTags.map(tag => (
                          <Badge key={tag} className="bg-accent/20 text-accent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
