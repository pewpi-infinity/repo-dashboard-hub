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
  url?: string
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
    id: 'eddie-money-take-me-home',
    title: 'Take Me Home Tonight',
    artist: 'Eddie Money',
    album: 'Can\'t Hold Back',
    duration: '4:01',
    url: 'https://archive.org/download/78_take-me-home-tonight_eddie-money-ellie-greenwich-jeff-barry-phil-spector-richie_gbia0396964a/Take%20Me%20Home%20Tonight%20-%20Eddie%20Money-restored.mp3',
    themes: ['taking-home', 'single-repo', 'local-porting', 'one-machine', 'personal', 'connection', 'romance', 'commitment'],
    mood: ['upbeat', 'energetic', 'romantic', 'nostalgic', 'catchy'],
    suggestedRepos: ['single-local-port', '💲-inject-one'],
    lyrics: 'Take me home tonight - Perfect for single local porting of one repo 💲'
  },
  {
    id: 'cheap-trick-one-i-want',
    title: 'I Want You to Want Me',
    artist: 'Cheap Trick',
    album: 'At Budokan',
    duration: '3:42',
    url: 'https://archive.org/download/78_i-want-you-to-want-me_cheap-trick-rick-nielsen_gbia0000014b/I%20Want%20You%20To%20Want%20Me%20-%20Cheap%20Trick-restored.mp3',
    themes: ['modulation', 'filtering', 'problem-solving', 'adjustment', 'coordination', 'desire', 'connection'],
    mood: ['energetic', 'passionate', 'driving', 'upbeat'],
    suggestedRepos: ['legend-🎛️-modulator', 'legend-🔀-flow'],
    lyrics: 'I\'m the one who wants to be with you - A modulator that filters the problem area and moves you to the proper machine'
  },
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
  },
  {
    id: 'pink-floyd-speak-to-me',
    title: 'Speak to Me',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '1:07',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/01SpeakToMe.mp3',
    themes: ['introduction', 'chaos', 'heartbeat', 'life', 'beginning'],
    mood: ['atmospheric', 'mysterious', 'building', 'anticipatory'],
    suggestedRepos: ['legend-core', 'mongoose.os']
  },
  {
    id: 'pink-floyd-breathe',
    title: 'Breathe (In the Air)',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '2:43',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/02Breathe.mp3',
    themes: ['breathing', 'life', 'air', 'existence', 'beginning', 'calm'],
    mood: ['peaceful', 'atmospheric', 'gentle', 'reflective'],
    suggestedRepos: ['legend-🪐-memory', 'mongoose.os', 'legend-core']
  },
  {
    id: 'pink-floyd-on-the-run',
    title: 'On the Run',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '3:33',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/03OnTheRun.mp3',
    themes: ['running', 'escape', 'panic', 'anxiety', 'movement', 'urgency'],
    mood: ['anxious', 'urgent', 'mechanical', 'intense'],
    suggestedRepos: ['legend-🔀-flow', 'legend-⚙️-engineer', 'legend-🦾-robot-core']
  },
  {
    id: 'pink-floyd-time',
    title: 'Time',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '6:53',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/04Time.mp3',
    themes: ['time', 'aging', 'mortality', 'regret', 'urgency', 'clock'],
    mood: ['urgent', 'reflective', 'powerful', 'existential'],
    suggestedRepos: ['legend-⭐-runtime', 'legend-🪐-memory', 'legend-🔀-flow']
  },
  {
    id: 'pink-floyd-great-gig',
    title: 'The Great Gig in the Sky',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '4:15',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/05TheGreatGigInTheSky.mp3',
    themes: ['death', 'transcendence', 'emotion', 'soul', 'release'],
    mood: ['emotional', 'powerful', 'cathartic', 'ethereal'],
    suggestedRepos: ['legend-✨-multistar', 'legend-💫-star', 'truvio-studios']
  },
  {
    id: 'pink-floyd-money',
    title: 'Money',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '6:23',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/06Money.mp3',
    themes: ['money', 'greed', 'capitalism', 'wealth', 'materialism'],
    mood: ['groovy', 'satirical', 'funky', 'powerful'],
    suggestedRepos: ['legend-💰-treasury', 'legend-💲-value', 'legend-👁️-token-viewer']
  },
  {
    id: 'pink-floyd-us-and-them',
    title: 'Us and Them',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '7:40',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/07UsAndThem.mp3',
    themes: ['conflict', 'division', 'war', 'empathy', 'understanding'],
    mood: ['melancholic', 'atmospheric', 'reflective', 'spacious'],
    suggestedRepos: ['legend-🔗-semantic', 'legend-⛓️-chain', 'mongoose.os']
  },
  {
    id: 'pink-floyd-any-colour',
    title: 'Any Colour You Like',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '3:24',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/08AnyColourYouLike.mp3',
    themes: ['choice', 'illusion', 'freedom', 'psychedelic', 'control'],
    mood: ['psychedelic', 'energetic', 'trippy', 'flowing'],
    suggestedRepos: ['legend-🎛️-modulator', 'legend-🔀-flow', 'legend-🎨-creator']
  },
  {
    id: 'pink-floyd-brain-damage',
    title: 'Brain Damage',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '3:50',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/09BrainDamage.mp3',
    themes: ['madness', 'mental-health', 'insanity', 'moon', 'dark-side'],
    mood: ['haunting', 'unsettling', 'reflective', 'melancholic'],
    suggestedRepos: ['mongoose.os', 'legend-🧠-brain', 'legend-🍄-auditor']
  },
  {
    id: 'pink-floyd-eclipse',
    title: 'Eclipse',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '2:04',
    url: 'https://archive.org/download/DarkSideOfTheMoon_201608/10Eclipse.mp3',
    themes: ['unity', 'totality', 'everything', 'completion', 'harmony', 'sun'],
    mood: ['triumphant', 'unifying', 'powerful', 'conclusive'],
    suggestedRepos: ['legend-spine-index', 'legend-core', 'mongoose.os']
  },
  {
    id: 'pink-floyd-shine-on-part-1',
    title: 'Shine On You Crazy Diamond (Parts I-V)',
    artist: 'Pink Floyd',
    album: 'Wish You Were Here',
    duration: '13:31',
    url: 'https://archive.org/download/PinkFloyd-ShineOnYouCrazyDiamond1975/Pink%20Floyd%20-%20Shine%20On%20You%20Crazy%20Diamond%20%281975%29.mp3',
    themes: ['tribute', 'loss', 'mental-health', 'friendship', 'nostalgia', 'diamond', 'shine', 'star', 'cosmic', 'faceting', 'multistar'],
    mood: ['ethereal', 'melancholic', 'expansive', 'atmospheric', 'reflective'],
    suggestedRepos: ['legend-✨-multistar', 'legend-💫-star', 'legend-⭐-runtime', 'legend-🪐-memory'],
    lyrics: '⭐💎 A star who facets other stars out of its own material - special song for multistar systems'
  },
  {
    id: 'pink-floyd-welcome-machine',
    title: 'Welcome to the Machine',
    artist: 'Pink Floyd',
    album: 'Wish You Were Here',
    duration: '7:31',
    url: 'https://archive.org/download/PinkFloyd_WelcometotheMachine_NY_2jul77/PinkFloyd_WelcometotheMachine_NY_2jul77.mp3',
    themes: ['industry', 'automation', 'control', 'system', 'machine', 'dystopia', 'corporate', 'assimilation', 'welcome', 'onboarding'],
    mood: ['ominous', 'mechanical', 'dystopian', 'powerful', 'immersive'],
    suggestedRepos: ['legend-🦾-robot-core', 'legend-🎛️-modulator', 'legend-spine-index', 'mongoose.os', 'legend-core'],
    lyrics: '🎛️ Welcome to the machine - The journey of entering and becoming part of the system'
  },
  {
    id: 'pink-floyd-wish-you-were-here',
    title: 'Wish You Were Here',
    artist: 'Pink Floyd',
    album: 'Wish You Were Here',
    duration: '5:34',
    url: 'https://archive.org/download/PinkFloyd-WishYouWereHere_201601/Pink%20Floyd%20-%20Wish%20You%20Were%20Here.mp3',
    themes: ['absence', 'longing', 'connection', 'loss', 'nostalgia'],
    mood: ['melancholic', 'gentle', 'emotional', 'intimate'],
    suggestedRepos: ['legend-🔗-semantic', 'legend-⛓️-chain', 'truvio-studios']
  },
  {
    id: 'pink-floyd-shine-on-part-2',
    title: 'Shine On You Crazy Diamond (Parts VI-IX)',
    artist: 'Pink Floyd',
    album: 'Wish You Were Here',
    duration: '12:26',
    themes: ['tribute', 'loss', 'mental-health', 'friendship', 'nostalgia', 'diamond', 'shine', 'star', 'cosmic'],
    mood: ['ethereal', 'melancholic', 'expansive', 'atmospheric', 'reflective'],
    suggestedRepos: ['legend-✨-multistar', 'legend-💫-star', 'legend-⭐-runtime', 'legend-🪐-memory']
  },
  {
    id: 'pink-floyd-comfortably-numb',
    title: 'Comfortably Numb',
    artist: 'Pink Floyd',
    album: 'The Wall',
    duration: '6:21',
    themes: ['isolation', 'numbness', 'disconnection', 'pain', 'healing'],
    mood: ['melancholic', 'powerful', 'epic', 'emotional'],
    suggestedRepos: ['legend-🍄-auditor', 'mongoose.os', 'truvio-studios']
  },
  {
    id: 'pink-floyd-time',
    title: 'Time',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '6:53',
    themes: ['time', 'aging', 'mortality', 'regret', 'urgency', 'clock'],
    mood: ['urgent', 'reflective', 'powerful', 'existential'],
    suggestedRepos: ['legend-⭐-runtime', 'legend-🪐-memory', 'legend-🔀-flow']
  },
  {
    id: 'pink-floyd-money',
    title: 'Money',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: '6:23',
    themes: ['money', 'greed', 'capitalism', 'wealth', 'materialism'],
    mood: ['groovy', 'satirical', 'funky', 'powerful'],
    suggestedRepos: ['legend-💰-treasury', 'legend-💲-value', 'legend-👁️-token-viewer']
  },
  {
    id: 'pink-floyd-echoes',
    title: 'Echoes',
    artist: 'Pink Floyd',
    album: 'Meddle',
    duration: '23:31',
    themes: ['journey', 'cosmic', 'underwater', 'communication', 'connection', 'exploration'],
    mood: ['expansive', 'atmospheric', 'mysterious', 'epic', 'transcendent'],
    suggestedRepos: ['legend-🪐-memory', 'legend-🔗-semantic', 'legend-⛓️-chain', 'mongoose.os']
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
  
  const matched = musicLibrary.filter(track => {
    if (track.suggestedRepos.some(repo => lowerName.includes(repo.toLowerCase()))) {
      return true
    }
    
    if (track.themes.some(theme => lowerName.includes(theme))) {
      return true
    }
    
    if (lowerName.includes('multistar') || lowerName.includes('✨')) {
      return track.id.includes('shine-on')
    }
    
    if (lowerName.includes('modulator') || lowerName.includes('🎛️')) {
      return track.id === 'cheap-trick-one-i-want' || track.id === 'pink-floyd-welcome-machine'
    }
    
    if (lowerName.includes('robot') || lowerName.includes('🦾')) {
      return track.id === 'pink-floyd-welcome-machine' || track.id === 'pink-floyd-on-the-run'
    }
    
    if (lowerName.includes('time') || lowerName.includes('runtime') || lowerName.includes('⭐')) {
      return track.id === 'pink-floyd-time'
    }
    
    if (lowerName.includes('money') || lowerName.includes('💰') || lowerName.includes('💲') || lowerName.includes('treasury') || lowerName.includes('value')) {
      return track.id === 'pink-floyd-money'
    }
    
    if (lowerName.includes('brain') || lowerName.includes('🧠') || lowerName.includes('mongoose')) {
      return track.id === 'pink-floyd-brain-damage' || track.id === 'pink-floyd-breathe'
    }
    
    if (lowerName.includes('core') || lowerName.includes('spine') || lowerName.includes('index')) {
      return track.id === 'pink-floyd-eclipse' || track.id === 'pink-floyd-speak-to-me'
    }
    
    return false
  })
  
  if (matched.length === 0) {
    return musicLibrary.filter(track => 
      track.id === 'pink-floyd-welcome-machine' || 
      track.id === 'pink-floyd-breathe' ||
      track.id === 'rush-2112-suite'
    )
  }
  
  return matched
}

export async function aiMatchMusicToRepo(repoName: string, repoDescription?: string): Promise<MusicTrack | null> {
  try {
    const availableTracks = getMusicForRepo(repoName)
    
    if (availableTracks.length === 0) {
      return musicLibrary[0] || null
    }
    
    if (availableTracks.length === 1) {
      return availableTracks[0]
    }

    const tracksInfo = availableTracks.map((track, idx) => 
      `${idx + 1}. "${track.title}" by ${track.artist}
   Album: ${track.album || 'N/A'}
   Themes: ${track.themes.join(', ')}
   Mood: ${track.mood.join(', ')}
   Description: ${track.lyrics || 'No description'}
   Duration: ${track.duration}`
    ).join('\n\n')

    const promptText = `You are an AI music curator for the pewpi-infinity quantum computing system where each repository represents a unique machine component with specific purposes and journeys.

SEMANTIC MUSIC SELECTION RULES:

1. 💲 SINGLE LOCAL PORT (Take Me Home Tonight - Eddie Money):
   - Use when: Repo is being "taken home" for local development
   - Use when: Single machine, personal use, one-time porting
   - Keywords: single, local, port, personal, one, individual, home

2. ⭐💎 MULTISTAR FACETING (Shine On You Crazy Diamond - Pink Floyd):
   - Use when: Repo facets/creates OTHER repos or stars from itself
   - Use when: A star that generates multiple other components
   - Keywords: multistar, facet, diamond, shine, generate, create, multiple, spawn

3. 🎛️ MODULATOR (I Want You to Want Me - Cheap Trick):
   - Use when: Repo filters/modulates/adjusts to solve problems
   - Use when: Moving between machines, problem-solving, coordination
   - Keywords: modulate, filter, adjust, coordinate, move, solve, redirect

4. 🎛️ WELCOME TO MACHINE (Welcome to the Machine - Pink Floyd):
   - Use when: First-time setup, onboarding, system introduction
   - Use when: Core system repos, foundational machines
   - Keywords: welcome, core, system, foundation, entry, introduction

5. DARK SIDE OF THE MOON - Track by semantic need:
   - "Speak to Me" → initialization, beginning
   - "Breathe" → life, existence, calm start
   - "Time" ⭐ → runtime, timing, clocks, scheduling
   - "Money" 💰 → treasury, value, tokens, payments
   - "Brain Damage" 🧠 → neural core, learning, cognition
   - "Eclipse" → completion, unity, finale

Repository: ${repoName}
Description: ${repoDescription || 'No description'}

Available tracks:
${tracksInfo}

ANALYZE:
- Is this repo being "taken home" (local single port)? → Eddie Money
- Does this repo create/facet other repos? → Shine On You Crazy Diamond
- Does this repo modulate/filter/coordinate? → Cheap Trick OR Welcome to the Machine
- What's the PRIMARY semantic function based on name/emoji?

Return ONLY the number (1-${availableTracks.length}) of the BEST matching track based on these semantic rules.`

    const result = await window.spark.llm(promptText, 'gpt-4o-mini')
    const trackIndex = parseInt(result.trim()) - 1
    
    if (trackIndex >= 0 && trackIndex < availableTracks.length) {
      return availableTracks[trackIndex]
    }
    
    return availableTracks[0]
  } catch (error) {
    console.error('AI music matching failed:', error)
    const fallback = getMusicForRepo(repoName)
    return fallback[0] || musicLibrary[0] || null
  }
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
