import rushImg from '@/assets/images/2112.png'
import creepshowPoster from '@/assets/images/Creepshow_(1982).jpg'
import creepshow1 from '@/assets/images/Creepshow_0001.jpg'
import creepshow14 from '@/assets/images/Creepshow_0014.jpg'
import creepshow15 from '@/assets/images/Creepshow_0015.jpg'
import creepshow44 from '@/assets/images/Creepshow_0044.jpg'
import creepshow45 from '@/assets/images/Creepshow_0045.jpg'
import creepshow55 from '@/assets/images/Creepshow_0055.jpg'
import creepshow64 from '@/assets/images/Creepshow_0064.jpg'
import screenshot from '@/assets/images/Screenshot_20251228-231006.png'
import jonlay from '@/assets/images/jon1ay.jpg'
import periodicTable from '@/assets/images/periodic-table-7-21-optimized.svg'
import video1 from '@/assets/video/screen-20251230-000708.mp4'
import video2 from '@/assets/video/screen-20251230-144248.mp4'

export interface MediaAsset {
  id: string
  type: 'image' | 'video' | 'audio'
  src: string
  thumbnail?: string
  name: string
  keywords: string[]
  semanticTags: string[]
  mood: string[]
  suggestedRepos: string[]
  description: string
}

export interface MusicTrack {
  id: string
  title: string
  artist: string
  album?: string
  duration?: string
  lyrics?: string
  themes: string[]
  mood: string[]
  suggestedRepos: string[]
}

export const mediaLibrary: MediaAsset[] = [
  {
    id: 'rush-2112',
    type: 'image',
    src: rushImg,
    name: '2112 by Rush',
    keywords: ['rush', '2112', 'progressive rock', 'album', 'music', 'iconic', 'scifi', 'dystopian'],
    semanticTags: ['music', 'album-art', 'progressive', 'concept-album', 'futuristic', 'rebellion'],
    mood: ['epic', 'rebellious', 'futuristic', 'energetic', 'complex'],
    suggestedRepos: ['legend-🎵-sync', 'legend-⭐-runtime', 'legend-🪐-memory', 'truvio-studios'],
    description: 'Rush\'s iconic 2112 album cover - a progressive rock masterpiece about rebellion and discovery'
  },
  {
    id: 'creepshow-poster',
    type: 'image',
    src: creepshowPoster,
    name: 'Creepshow (1982) Movie Poster',
    keywords: ['creepshow', 'horror', 'stephen king', 'george romero', 'anthology', 'comic book', '1982'],
    semanticTags: ['horror', 'comedy', 'anthology', 'interactive', 'storytelling', 'vintage'],
    mood: ['scary', 'fun', 'nostalgic', 'campy', 'colorful'],
    suggestedRepos: ['truvio-studios', 'legend-🎬-production', 'legend-spine-index'],
    description: 'Creepshow movie poster - interactive horror anthology where you become part of the story'
  },
  {
    id: 'creepshow-frame-1',
    type: 'image',
    src: creepshow1,
    name: 'Creepshow Scene 1',
    keywords: ['creepshow', 'horror', 'scene', 'movie', 'frame'],
    semanticTags: ['horror', 'cinematic', 'storytelling', 'scene'],
    mood: ['eerie', 'theatrical', 'dramatic'],
    suggestedRepos: ['truvio-studios', 'legend-🎬-production'],
    description: 'Scene from Creepshow - comic book style horror storytelling'
  },
  {
    id: 'creepshow-frame-14',
    type: 'image',
    src: creepshow14,
    name: 'Creepshow Scene 14',
    keywords: ['creepshow', 'horror', 'scene', 'movie', 'frame'],
    semanticTags: ['horror', 'cinematic', 'storytelling', 'scene'],
    mood: ['eerie', 'theatrical', 'dramatic'],
    suggestedRepos: ['truvio-studios', 'legend-🎬-production'],
    description: 'Scene from Creepshow - vintage horror aesthetic'
  },
  {
    id: 'creepshow-frame-15',
    type: 'image',
    src: creepshow15,
    name: 'Creepshow Scene 15',
    keywords: ['creepshow', 'horror', 'scene', 'movie', 'frame', 'underwater'],
    semanticTags: ['horror', 'cinematic', 'storytelling', 'underwater', 'danger'],
    mood: ['eerie', 'threatening', 'immersive'],
    suggestedRepos: ['truvio-studios', 'legend-🎬-production', 'legend-🔀-flow'],
    description: 'Underwater scene from Creepshow - correcting the script to avoid going under'
  },
  {
    id: 'creepshow-frame-44',
    type: 'image',
    src: creepshow44,
    name: 'Creepshow Scene 44',
    keywords: ['creepshow', 'horror', 'scene', 'movie', 'frame'],
    semanticTags: ['horror', 'cinematic', 'storytelling', 'scene'],
    mood: ['eerie', 'theatrical', 'dramatic'],
    suggestedRepos: ['truvio-studios', 'legend-🎬-production'],
    description: 'Scene from Creepshow - interactive horror experience'
  },
  {
    id: 'creepshow-frame-45',
    type: 'image',
    src: creepshow45,
    name: 'Creepshow Scene 45',
    keywords: ['creepshow', 'horror', 'scene', 'movie', 'frame'],
    semanticTags: ['horror', 'cinematic', 'storytelling', 'scene'],
    mood: ['eerie', 'theatrical', 'dramatic'],
    suggestedRepos: ['truvio-studios', 'legend-🎬-production'],
    description: 'Scene from Creepshow - become part of the horror story'
  },
  {
    id: 'creepshow-frame-55',
    type: 'image',
    src: creepshow55,
    name: 'Creepshow Scene 55',
    keywords: ['creepshow', 'horror', 'scene', 'movie', 'frame'],
    semanticTags: ['horror', 'cinematic', 'storytelling', 'scene'],
    mood: ['eerie', 'theatrical', 'dramatic'],
    suggestedRepos: ['truvio-studios', 'legend-🎬-production'],
    description: 'Scene from Creepshow - movie as video game experience'
  },
  {
    id: 'creepshow-frame-64',
    type: 'image',
    src: creepshow64,
    name: 'Creepshow Scene 64',
    keywords: ['creepshow', 'horror', 'scene', 'movie', 'frame'],
    semanticTags: ['horror', 'cinematic', 'storytelling', 'scene'],
    mood: ['eerie', 'theatrical', 'dramatic'],
    suggestedRepos: ['truvio-studios', 'legend-🎬-production'],
    description: 'Scene from Creepshow - correct the script to change the ending'
  },
  {
    id: 'screenshot-ui',
    type: 'image',
    src: screenshot,
    name: 'Dashboard Screenshot',
    keywords: ['ui', 'dashboard', 'interface', 'design', 'quantum', 'system'],
    semanticTags: ['ui', 'dashboard', 'interface', 'technical', 'quantum'],
    mood: ['technical', 'modern', 'organized'],
    suggestedRepos: ['legend-spine-index', 'legend-👁️-token-viewer', 'mongoose.os'],
    description: 'Dashboard interface screenshot'
  },
  {
    id: 'jonlay-avatar',
    type: 'image',
    src: jonlay,
    name: 'Jon Lay Profile',
    keywords: ['profile', 'avatar', 'person', 'identity'],
    semanticTags: ['profile', 'identity', 'human', 'avatar'],
    mood: ['personal', 'identity'],
    suggestedRepos: ['legend-core', 'truvio-studios'],
    description: 'Profile image'
  },
  {
    id: 'periodic-table',
    type: 'image',
    src: periodicTable,
    name: 'Periodic Table of Elements',
    keywords: ['chemistry', 'periodic table', 'elements', 'science', 'education', 'hydrogen', 'investigative'],
    semanticTags: ['science', 'chemistry', 'elements', 'educational', 'reference', 'research'],
    mood: ['educational', 'scientific', 'investigative', 'factual'],
    suggestedRepos: ['legend-🧱-encode', 'legend-🔗-semantic', 'legend-🍄-auditor', 'mongoose.os'],
    description: 'Periodic table of elements - for investigative research like hydrogen studies'
  },
  {
    id: 'demo-video-1',
    type: 'video',
    src: video1,
    name: 'System Demo Video 1',
    keywords: ['demo', 'video', 'system', 'showcase', 'tutorial'],
    semanticTags: ['demo', 'tutorial', 'showcase', 'video'],
    mood: ['informative', 'dynamic', 'showcase'],
    suggestedRepos: ['truvio-studios', 'legend-spine-index', 'mongoose.os'],
    description: 'System demonstration video'
  },
  {
    id: 'demo-video-2',
    type: 'video',
    src: video2,
    name: 'System Demo Video 2',
    keywords: ['demo', 'video', 'system', 'showcase', 'tutorial'],
    semanticTags: ['demo', 'tutorial', 'showcase', 'video'],
    mood: ['informative', 'dynamic', 'showcase'],
    suggestedRepos: ['truvio-studios', 'legend-spine-index', 'mongoose.os'],
    description: 'System demonstration video'
  }
]

export const musicLibrary: MusicTrack[] = [
  {
    id: 'rush-2112-suite',
    title: '2112 (Suite)',
    artist: 'Rush',
    album: '2112',
    duration: '20:34',
    themes: ['discovery', 'rebellion', 'individuality', 'oppression', 'freedom', 'music', 'temples', 'presentation'],
    mood: ['epic', 'progressive', 'triumphant', 'melancholic', 'energetic'],
    suggestedRepos: ['legend-🎵-sync', 'legend-⭐-runtime', 'truvio-studios'],
    lyrics: 'I. Overture - II. The Temples of Syrinx - III. Discovery - IV. Presentation - V. Oracle: The Dream - VI. Soliloquy - VII. Grand Finale'
  },
  {
    id: 'rush-passage-to-bangkok',
    title: 'A Passage to Bangkok',
    artist: 'Rush',
    album: '2112',
    duration: '3:34',
    themes: ['journey', 'exploration', 'world', 'travel'],
    mood: ['energetic', 'adventurous', 'upbeat'],
    suggestedRepos: ['legend-🔀-flow', 'legend-🪐-memory', 'truvio-studios']
  },
  {
    id: 'rush-twilight-zone',
    title: 'The Twilight Zone',
    artist: 'Rush',
    album: '2112',
    duration: '3:17',
    themes: ['mystery', 'unknown', 'surreal', 'science-fiction'],
    mood: ['mysterious', 'curious', 'haunting'],
    suggestedRepos: ['legend-🪐-memory', 'legend-🔗-semantic', 'truvio-studios']
  },
  {
    id: 'rush-lessons',
    title: 'Lessons',
    artist: 'Rush',
    album: '2112',
    duration: '3:51',
    themes: ['learning', 'growth', 'wisdom', 'experience'],
    mood: ['reflective', 'thoughtful', 'gentle'],
    suggestedRepos: ['mongoose.os', 'legend-🧠-brain', 'truvio-studios']
  },
  {
    id: 'rush-tears',
    title: 'Tears',
    artist: 'Rush',
    album: '2112',
    duration: '3:31',
    themes: ['emotion', 'sadness', 'loss', 'beauty'],
    mood: ['emotional', 'melancholic', 'beautiful'],
    suggestedRepos: ['legend-✨-multistar', 'truvio-studios']
  },
  {
    id: 'rush-something-for-nothing',
    title: 'Something for Nothing',
    artist: 'Rush',
    album: '2112',
    duration: '3:59',
    themes: ['effort', 'reward', 'work', 'value', 'philosophy'],
    mood: ['driving', 'powerful', 'motivational'],
    suggestedRepos: ['legend-core', 'legend-🎛️-modulator', 'truvio-studios']
  }
]

export function getMediaForRepo(repoName: string): MediaAsset[] {
  const lowerName = repoName.toLowerCase()
  return mediaLibrary.filter(media => 
    media.suggestedRepos.some(repo => lowerName.includes(repo.toLowerCase())) ||
    media.keywords.some(keyword => lowerName.includes(keyword))
  )
}

export function getMusicForRepo(repoName: string): MusicTrack[] {
  const lowerName = repoName.toLowerCase()
  return musicLibrary.filter(track => 
    track.suggestedRepos.some(repo => lowerName.includes(repo.toLowerCase())) ||
    track.themes.some(theme => lowerName.includes(theme))
  )
}

export function getBackgroundForRepo(repoName: string): MediaAsset | null {
  const backgrounds = getMediaForRepo(repoName).filter(m => m.type === 'image')
  if (backgrounds.length === 0) return null
  
  const lowerName = repoName.toLowerCase()
  if (lowerName.includes('truvio') || lowerName.includes('studio') || lowerName.includes('production')) {
    return backgrounds.find(b => b.id.includes('creepshow')) || backgrounds[0]
  }
  
  if (lowerName.includes('sync') || lowerName.includes('music') || lowerName.includes('🎵')) {
    return backgrounds.find(b => b.id.includes('rush')) || backgrounds[0]
  }
  
  if (lowerName.includes('encode') || lowerName.includes('semantic') || lowerName.includes('auditor')) {
    return backgrounds.find(b => b.id.includes('periodic')) || backgrounds[0]
  }
  
  return backgrounds[0]
}

export function semanticallyMatchContent(query: string): MediaAsset[] {
  const lowerQuery = query.toLowerCase()
  const words = lowerQuery.split(/\s+/)
  
  return mediaLibrary
    .map(media => {
      let score = 0
      
      if (media.keywords.some(k => words.some(w => k.includes(w) || w.includes(k)))) {
        score += 10
      }
      
      if (media.semanticTags.some(t => words.some(w => t.includes(w) || w.includes(t)))) {
        score += 5
      }
      
      if (media.mood.some(m => words.some(w => m.includes(w) || w.includes(w)))) {
        score += 3
      }
      
      if (media.description.toLowerCase().includes(lowerQuery)) {
        score += 8
      }
      
      return { media, score }
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.media)
}

export function semanticallyMatchMusic(query: string): MusicTrack[] {
  const lowerQuery = query.toLowerCase()
  const words = lowerQuery.split(/\s+/)
  
  return musicLibrary
    .map(track => {
      let score = 0
      
      if (track.title.toLowerCase().includes(lowerQuery)) score += 15
      if (track.artist.toLowerCase().includes(lowerQuery)) score += 10
      
      if (track.themes.some(t => words.some(w => t.includes(w) || w.includes(t)))) {
        score += 8
      }
      
      if (track.mood.some(m => words.some(w => m.includes(w) || w.includes(m)))) {
        score += 5
      }
      
      if (track.lyrics?.toLowerCase().includes(lowerQuery)) {
        score += 12
      }
      
      return { track, score }
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.track)
}
