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
  },
  {
    id: 'the-who-wont-get-fooled',
    title: "Won't Get Fooled Again",
    artist: 'The Who',
    album: "Who's Next",
    duration: '8:33',
    url: 'https://archive.org/download/78rpm-won-t-get-fooled-again/Won%27t%20Get%20Fooled%20Again%20-%20The%20Who.mp3',
    themes: ['revolution', 'authority', 'power', 'deception', 'awakening', 'resistance', 'no-fooling'],
    mood: ['powerful', 'defiant', 'energetic', 'anthemic', 'epic'],
    suggestedRepos: ['legend-🍄-auditor', 'legend-👁️-token-viewer', 'legend-core'],
    lyrics: '🍄 Meet the new boss, same as the old boss - Auditing and verification to prevent deception'
  },
  {
    id: 'boston-more-than-feeling',
    title: 'More Than a Feeling',
    artist: 'Boston',
    album: 'Boston',
    duration: '4:45',
    url: 'https://archive.org/download/78_more-than-a-feeling_boston-tom-scholz_gbia0026424a/More%20Than%20A%20Feeling%20-%20Boston-restored.mp3',
    themes: ['nostalgia', 'memory', 'emotion', 'recall', 'awakening', 'clarity'],
    mood: ['uplifting', 'nostalgic', 'energetic', 'anthemic', 'powerful'],
    suggestedRepos: ['legend-🪐-memory', 'mongoose.os', 'legend-⭐-runtime'],
    lyrics: '🪐 It\'s more than a feeling - Memory systems and emotional recall'
  },
  {
    id: 'the-police-every-breath',
    title: 'Every Breath You Take',
    artist: 'The Police',
    album: 'Synchronicity',
    duration: '4:13',
    url: 'https://archive.org/download/78_every-breath-you-take_the-police-sting_gbia0027795a/Every%20Breath%20You%20Take%20-%20The%20Police-restored.mp3',
    themes: ['watching', 'monitoring', 'observation', 'tracking', 'surveillance', 'attention'],
    mood: ['haunting', 'persistent', 'watchful', 'intense', 'obsessive'],
    suggestedRepos: ['legend-👁️-token-viewer', 'legend-🍄-auditor', 'legend-🔗-semantic'],
    lyrics: '👁️ Every move you make, every step you take - Token viewing and system monitoring'
  },
  {
    id: 'foreigner-urgent',
    title: 'Urgent',
    artist: 'Foreigner',
    album: '4',
    duration: '4:29',
    url: 'https://archive.org/download/78_urgent_foreigner-mick-jones_gbia0027673a/Urgent%20-%20Foreigner-restored.mp3',
    themes: ['urgency', 'priority', 'immediate', 'critical', 'emergency', 'fast'],
    mood: ['urgent', 'intense', 'driving', 'energetic', 'compelling'],
    suggestedRepos: ['legend-⚡-fast', 'legend-🔀-flow', 'legend-🦾-robot-core'],
    lyrics: '⚡ You\'re not shy, you get around - Fast urgent processing and immediate action'
  },
  {
    id: 'journey-dont-stop-believing',
    title: "Don't Stop Believin'",
    artist: 'Journey',
    album: 'Escape',
    duration: '4:11',
    url: 'https://archive.org/download/78_dont-stop-believin_journey-jonathan-cain-neal-schon-steve-perry_gbia0026688a/Don%27t%20Stop%20Believin%27%20-%20Journey-restored.mp3',
    themes: ['hope', 'persistence', 'journey', 'belief', 'determination', 'motivation'],
    mood: ['uplifting', 'hopeful', 'anthemic', 'inspiring', 'triumphant'],
    suggestedRepos: ['legend-🔀-flow', 'legend-✨-multistar', 'truvio-studios'],
    lyrics: '✨ Don\'t stop believin\' - Keep pushing through the journey to create multiple stars'
  },
  {
    id: 'toto-africa',
    title: 'Africa',
    artist: 'Toto',
    album: 'Toto IV',
    duration: '4:55',
    url: 'https://archive.org/download/78_africa_toto-david-paich-jeff-porcaro_gbia0026003a/Africa%20-%20Toto-restored.mp3',
    themes: ['journey', 'distance', 'blessing', 'rain', 'travel', 'longing'],
    mood: ['nostalgic', 'atmospheric', 'yearning', 'epic', 'majestic'],
    suggestedRepos: ['legend-🔀-flow', 'legend-🌐-network', 'legend-🪐-memory'],
    lyrics: '🌐 I bless the rains down in Africa - Global network connections and distant coordination'
  },
  {
    id: 'queen-we-will-rock-you',
    title: 'We Will Rock You',
    artist: 'Queen',
    album: 'News of the World',
    duration: '2:02',
    url: 'https://archive.org/download/78_we-will-rock-you_queen-brian-may_gbia0027892a/We%20Will%20Rock%20You%20-%20Queen-restored.mp3',
    themes: ['power', 'dominance', 'rhythm', 'unity', 'strength', 'anthem'],
    mood: ['powerful', 'commanding', 'rhythmic', 'defiant', 'anthemic'],
    suggestedRepos: ['legend-🦾-robot-core', 'legend-core', 'mongoose.os'],
    lyrics: '🦾 We will, we will rock you - Powerful robot core systems with commanding presence'
  },
  {
    id: 'queen-another-one-bites',
    title: 'Another One Bites the Dust',
    artist: 'Queen',
    album: 'The Game',
    duration: '3:35',
    url: 'https://archive.org/download/78_another-one-bites-the-dust_queen-john-deacon_gbia0026129a/Another%20One%20Bites%20The%20Dust%20-%20Queen-restored.mp3',
    themes: ['rhythm', 'defeat', 'bass', 'funky', 'relentless', 'elimination'],
    mood: ['groovy', 'funky', 'confident', 'relentless', 'commanding'],
    suggestedRepos: ['legend-🔀-flow', 'legend-🎛️-modulator', 'legend-🦾-robot-core'],
    lyrics: '🎛️ Another one bites the dust - Modulating and filtering out problems systematically'
  },
  {
    id: 'styx-mr-roboto',
    title: 'Mr. Roboto',
    artist: 'Styx',
    album: 'Kilroy Was Here',
    duration: '5:28',
    url: 'https://archive.org/download/78_mr-roboto_styx-dennis-de-young_gbia0027452a/Mr.%20Roboto%20-%20Styx-restored.mp3',
    themes: ['robot', 'automation', 'identity', 'machine', 'humanity', 'technology'],
    mood: ['mechanical', 'theatrical', 'robotic', 'dramatic', 'quirky'],
    suggestedRepos: ['legend-🦾-robot-core', 'legend-🦿-robot-legs', 'mongoose.os'],
    lyrics: '🦾 Domo arigato, Mr. Roboto - The quintessential robot machine song'
  },
  {
    id: 'electric-light-orchestra-mr-blue-sky',
    title: 'Mr. Blue Sky',
    artist: 'Electric Light Orchestra',
    album: 'Out of the Blue',
    duration: '5:03',
    url: 'https://archive.org/download/78_mr-blue-sky_electric-light-orchestra-jeff-lynne_gbia0027364a/Mr.%20Blue%20Sky%20-%20Electric%20Light%20Orchestra-restored.mp3',
    themes: ['optimism', 'sunshine', 'happiness', 'sky', 'weather', 'joy'],
    mood: ['uplifting', 'joyful', 'optimistic', 'energetic', 'bright'],
    suggestedRepos: ['legend-✨-multistar', 'legend-💫-star', 'truvio-studios'],
    lyrics: '☀️ Mr. Blue Sky please tell us why - Bright optimistic star generation'
  },
  {
    id: 'the-cars-drive',
    title: 'Drive',
    artist: 'The Cars',
    album: 'Heartbeat City',
    duration: '3:55',
    url: 'https://archive.org/download/78_drive_the-cars-ric-ocasek_gbia0026720a/Drive%20-%20The%20Cars-restored.mp3',
    themes: ['control', 'direction', 'guidance', 'driving', 'navigation', 'steering'],
    mood: ['melancholic', 'introspective', 'smooth', 'reflective', 'questioning'],
    suggestedRepos: ['legend-🔀-flow', 'legend-🎛️-modulator', 'legend-🕹️-mario-exit'],
    lyrics: '🕹️ Who\'s gonna drive you home tonight? - Navigation and directional control'
  },
  {
    id: 'billy-joel-piano-man',
    title: 'Piano Man',
    artist: 'Billy Joel',
    album: 'Piano Man',
    duration: '5:38',
    url: 'https://archive.org/download/78_piano-man_billy-joel_gbia0027550a/Piano%20Man%20-%20Billy%20Joel-restored.mp3',
    themes: ['storytelling', 'memories', 'community', 'gathering', 'music', 'nostalgia'],
    mood: ['nostalgic', 'storytelling', 'warm', 'melancholic', 'communal'],
    suggestedRepos: ['legend-🎵-sync', 'truvio-studios', 'mongoose.os'],
    lyrics: '🎵 Sing us a song, you\'re the piano man - Music synchronization and storytelling'
  },
  {
    id: 'fleetwood-mac-go-your-own-way',
    title: 'Go Your Own Way',
    artist: 'Fleetwood Mac',
    album: 'Rumours',
    duration: '3:43',
    url: 'https://archive.org/download/78_go-your-own-way_fleetwood-mac-lindsey-buckingham_gbia0026910a/Go%20Your%20Own%20Way%20-%20Fleetwood%20Mac-restored.mp3',
    themes: ['independence', 'separation', 'freedom', 'divergence', 'path', 'autonomy'],
    mood: ['defiant', 'emotional', 'energetic', 'liberating', 'powerful'],
    suggestedRepos: ['legend-🔀-flow', 'legend-🕹️-mario-exit', 'legend-💲-inject-one'],
    lyrics: '🕹️ You can go your own way - Branching paths and independent routing'
  },
  {
    id: 'the-beatles-come-together',
    title: 'Come Together',
    artist: 'The Beatles',
    album: 'Abbey Road',
    duration: '4:20',
    url: 'https://archive.org/download/78_come-together_the-beatles-john-lennon-paul-mccartney_gbia0026501a/Come%20Together%20-%20The%20Beatles-restored.mp3',
    themes: ['unity', 'gathering', 'collaboration', 'convergence', 'assembly', 'joining'],
    mood: ['groovy', 'mysterious', 'hypnotic', 'funky', 'unifying'],
    suggestedRepos: ['legend-⛓️-chain', 'legend-🔗-semantic', 'legend-spine-index'],
    lyrics: '⛓️ Come together, right now - Chain linking and semantic connection of components'
  },
  {
    id: 'the-beatles-here-comes-the-sun',
    title: 'Here Comes the Sun',
    artist: 'The Beatles',
    album: 'Abbey Road',
    duration: '3:05',
    url: 'https://archive.org/download/78_here-comes-the-sun_the-beatles-george-harrison_gbia0026963a/Here%20Comes%20The%20Sun%20-%20The%20Beatles-restored.mp3',
    themes: ['hope', 'renewal', 'brightness', 'optimism', 'sunshine', 'emergence'],
    mood: ['uplifting', 'joyful', 'optimistic', 'bright', 'hopeful'],
    suggestedRepos: ['legend-💫-star', 'legend-✨-multistar', 'legend-⭐-runtime'],
    lyrics: '☀️ Here comes the sun - New stars emerging and runtime initialization'
  },
  {
    id: 'david-bowie-starman',
    title: 'Starman',
    artist: 'David Bowie',
    album: 'The Rise and Fall of Ziggy Stardust',
    duration: '4:10',
    url: 'https://archive.org/download/78_starman_david-bowie_gbia0029237a/Starman%20-%20David%20Bowie-restored.mp3',
    themes: ['star', 'cosmic', 'alien', 'communication', 'space', 'hope'],
    mood: ['cosmic', 'uplifting', 'otherworldly', 'hopeful', 'theatrical'],
    suggestedRepos: ['legend-💫-star', 'legend-✨-multistar', 'legend-🪐-memory'],
    lyrics: '⭐ There\'s a starman waiting in the sky - Star systems and cosmic coordination'
  },
  {
    id: 'steve-miller-band-fly-like-eagle',
    title: 'Fly Like an Eagle',
    artist: 'Steve Miller Band',
    album: 'Fly Like an Eagle',
    duration: '4:42',
    url: 'https://archive.org/download/78_fly-like-an-eagle_steve-miller-band-steve-miller_gbia0026810a/Fly%20Like%20An%20Eagle%20-%20Steve%20Miller%20Band-restored.mp3',
    themes: ['freedom', 'flight', 'time', 'transcendence', 'soaring', 'liberation'],
    mood: ['soaring', 'psychedelic', 'uplifting', 'smooth', 'transcendent'],
    suggestedRepos: ['legend-🔀-flow', 'legend-⭐-runtime', 'legend-✨-multistar'],
    lyrics: '🦅 Time keeps on slippin\' into the future - Flow and runtime coordination through time'
  },
  {
    id: 'eagles-hotel-california',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: '6:30',
    url: 'https://archive.org/download/78_hotel-california_eagles-don-felder-don-henley-glenn-frey_gbia0026986a/Hotel%20California%20-%20Eagles-restored.mp3',
    themes: ['mystery', 'entrapment', 'paradise', 'illusion', 'checking-in', 'permanence'],
    mood: ['mysterious', 'haunting', 'epic', 'atmospheric', 'ominous'],
    suggestedRepos: ['legend-🪐-memory', 'legend-🎛️-modulator', 'mongoose.os'],
    lyrics: '🏨 You can check out any time you like, but you can never leave - Memory persistence and data permanence'
  },
  {
    id: 'supertramp-logical-song',
    title: 'The Logical Song',
    artist: 'Supertramp',
    album: 'Breakfast in America',
    duration: '4:11',
    url: 'https://archive.org/download/78_the-logical-song_supertramp-rick-davies-roger-hodgson_gbia0027318a/The%20Logical%20Song%20-%20Supertramp-restored.mp3',
    themes: ['logic', 'reasoning', 'education', 'questioning', 'analysis', 'rational'],
    mood: ['thoughtful', 'questioning', 'melodic', 'reflective', 'analytical'],
    suggestedRepos: ['legend-🔗-semantic', 'mongoose.os', 'legend-🍄-auditor'],
    lyrics: '🧠 Watch what you say or they\'ll be calling you a radical - Logical reasoning and semantic analysis'
  },
  {
    id: 'talking-heads-once-in-lifetime',
    title: 'Once in a Lifetime',
    artist: 'Talking Heads',
    album: 'Remain in Light',
    duration: '4:20',
    url: 'https://archive.org/download/78_once-in-a-lifetime_talking-heads-brian-eno-chris-frantz-david-byrne-jerry-harrison_gbia0027511a/Once%20In%20A%20Lifetime%20-%20Talking%20Heads-restored.mp3',
    themes: ['moment', 'realization', 'questioning', 'existence', 'unique', 'revelation'],
    mood: ['hypnotic', 'existential', 'rhythmic', 'trance-like', 'contemplative'],
    suggestedRepos: ['legend-⭐-runtime', 'legend-🪐-memory', 'mongoose.os'],
    lyrics: '⏰ Same as it ever was - Time loops, runtime cycles, and existential moments'
  },
  {
    id: 'blondie-heart-of-glass',
    title: 'Heart of Glass',
    artist: 'Blondie',
    album: 'Parallel Lines',
    duration: '5:50',
    url: 'https://archive.org/download/78_heart-of-glass_blondie-deborah-harry-chris-stein_gbia0026966a/Heart%20Of%20Glass%20-%20Blondie-restored.mp3',
    themes: ['fragility', 'transparency', 'vulnerability', 'glass', 'breakable', 'clarity'],
    mood: ['disco', 'melancholic', 'smooth', 'reflective', 'groovy'],
    suggestedRepos: ['legend-👁️-token-viewer', 'legend-🔗-semantic', 'legend-🍄-auditor'],
    lyrics: '💎 Heart of glass - Transparent token viewing and clear semantic understanding'
  },
  {
    id: 'devo-whip-it',
    title: 'Whip It',
    artist: 'DEVO',
    album: 'Freedom of Choice',
    duration: '2:39',
    url: 'https://archive.org/download/78_whip-it_devo-mark-mothersbaugh-gerald-casale_gbia0027903a/Whip%20It%20-%20DEVO-restored.mp3',
    themes: ['action', 'discipline', 'correction', 'control', 'motivation', 'drive'],
    mood: ['energetic', 'quirky', 'driving', 'robotic', 'motivational'],
    suggestedRepos: ['legend-🎛️-modulator', 'legend-🔀-flow', 'legend-🦾-robot-core'],
    lyrics: '🎛️ When a problem comes along, you must whip it - Quick modulation and problem resolution'
  },
  {
    id: 'the-doobie-brothers-long-train',
    title: 'Long Train Runnin\'',
    artist: 'The Doobie Brothers',
    album: 'The Captain and Me',
    duration: '3:28',
    url: 'https://archive.org/download/78_long-train-runnin_the-doobie-brothers-tom-johnston_gbia0027336a/Long%20Train%20Runnin%27%20-%20The%20Doobie%20Brothers-restored.mp3',
    themes: ['journey', 'movement', 'continuous', 'train', 'running', 'persistence'],
    mood: ['groovy', 'driving', 'energetic', 'rhythmic', 'persistent'],
    suggestedRepos: ['legend-⛓️-chain', 'legend-🔀-flow', 'legend-⭐-runtime'],
    lyrics: '⛓️ Long train runnin\' - Chain operations and continuous flow processing'
  },
  {
    id: 'led-zeppelin-immigrant-song',
    title: 'Immigrant Song',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin III',
    duration: '2:26',
    url: 'https://archive.org/download/78_immigrant-song_led-zeppelin-jimmy-page-robert-plant_gbia0027067a/Immigrant%20Song%20-%20Led%20Zeppelin-restored.mp3',
    themes: ['journey', 'migration', 'power', 'vikings', 'conquest', 'arrival'],
    mood: ['powerful', 'primal', 'urgent', 'epic', 'fierce'],
    suggestedRepos: ['legend-🔀-flow', 'legend-🦾-robot-core', 'legend-core'],
    lyrics: '⚔️ We come from the land of the ice and snow - Powerful migration and system deployment'
  },
  {
    id: 'ac-dc-thunderstruck',
    title: 'Thunderstruck',
    artist: 'AC/DC',
    album: 'The Razors Edge',
    duration: '4:52',
    url: 'https://archive.org/download/78_thunderstruck_acdc-angus-young-malcolm-young_gbia0027823a/Thunderstruck%20-%20AC-DC-restored.mp3',
    themes: ['power', 'electricity', 'thunder', 'energy', 'explosive', 'voltage'],
    mood: ['explosive', 'energetic', 'powerful', 'electrifying', 'intense'],
    suggestedRepos: ['legend-⚡-fast', 'legend-🦾-robot-core', 'legend-core'],
    lyrics: '⚡ Thunder! - Raw electrical power and explosive energy systems'
  },
  {
    id: 'grateful-dead-truckin',
    title: "Truckin'",
    artist: 'Grateful Dead',
    album: 'American Beauty',
    duration: '5:08',
    url: 'https://archive.org/download/78_truckin_grateful-dead-bob-weir-jerry-garcia-phil-lesh-robert-hunter_gbia0027871a/Truckin%27%20-%20Grateful%20Dead-restored.mp3',
    themes: ['journey', 'travel', 'persistence', 'trucking', 'long-haul', 'endurance'],
    mood: ['groovy', 'laid-back', 'persistent', 'storytelling', 'enduring'],
    suggestedRepos: ['legend-🔀-flow', 'legend-⛓️-chain', 'legend-🪐-memory'],
    lyrics: '🚚 Truckin\' got my chips cashed in - Long-haul data transport and persistence'
  },
  {
    id: 'jefferson-airplane-white-rabbit',
    title: 'White Rabbit',
    artist: 'Jefferson Airplane',
    album: 'Surrealistic Pillow',
    duration: '2:31',
    url: 'https://archive.org/download/78_white-rabbit_jefferson-airplane-grace-slick_gbia0027905a/White%20Rabbit%20-%20Jefferson%20Airplane-restored.mp3',
    themes: ['rabbit-hole', 'curiosity', 'alice', 'transformation', 'journey', 'wonderland'],
    mood: ['psychedelic', 'mysterious', 'trippy', 'surreal', 'building'],
    suggestedRepos: ['legend-🕹️-mario-exit', 'legend-🔀-flow', 'legend-🪐-memory'],
    lyrics: '🐰 Go ask Alice - Following the rabbit hole through branching paths'
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
      return track.id.includes('shine-on') || track.id === 'electric-light-orchestra-mr-blue-sky' || track.id === 'journey-dont-stop-believing'
    }
    
    if (lowerName.includes('star') || lowerName.includes('💫')) {
      return track.id.includes('star') || track.id === 'david-bowie-starman' || track.id === 'the-beatles-here-comes-the-sun'
    }
    
    if (lowerName.includes('modulator') || lowerName.includes('🎛️')) {
      return track.id === 'cheap-trick-one-i-want' || track.id === 'pink-floyd-welcome-machine' || track.id === 'devo-whip-it' || track.id === 'queen-another-one-bites'
    }
    
    if (lowerName.includes('robot') || lowerName.includes('🦾') || lowerName.includes('🦿')) {
      return track.id === 'styx-mr-roboto' || track.id === 'pink-floyd-welcome-machine' || track.id === 'pink-floyd-on-the-run' || track.id === 'queen-we-will-rock-you'
    }
    
    if (lowerName.includes('time') || lowerName.includes('runtime') || lowerName.includes('⭐')) {
      return track.id === 'pink-floyd-time' || track.id === 'steve-miller-band-fly-like-eagle' || track.id === 'talking-heads-once-in-lifetime'
    }
    
    if (lowerName.includes('money') || lowerName.includes('💰') || lowerName.includes('💲') || lowerName.includes('treasury') || lowerName.includes('value')) {
      return track.id === 'pink-floyd-money' || track.id === 'eddie-money-take-me-home'
    }
    
    if (lowerName.includes('brain') || lowerName.includes('🧠') || lowerName.includes('mongoose')) {
      return track.id === 'pink-floyd-brain-damage' || track.id === 'pink-floyd-breathe' || track.id === 'supertramp-logical-song' || track.id === 'boston-more-than-feeling'
    }
    
    if (lowerName.includes('core') || lowerName.includes('spine') || lowerName.includes('index')) {
      return track.id === 'pink-floyd-eclipse' || track.id === 'pink-floyd-speak-to-me' || track.id === 'queen-we-will-rock-you' || track.id === 'the-beatles-come-together'
    }
    
    if (lowerName.includes('flow') || lowerName.includes('🔀')) {
      return track.id === 'the-doobie-brothers-long-train' || track.id === 'grateful-dead-truckin' || track.id === 'toto-africa' || track.id === 'steve-miller-band-fly-like-eagle'
    }
    
    if (lowerName.includes('memory') || lowerName.includes('🪐')) {
      return track.id === 'boston-more-than-feeling' || track.id === 'eagles-hotel-california' || track.id === 'pink-floyd-echoes'
    }
    
    if (lowerName.includes('auditor') || lowerName.includes('🍄') || lowerName.includes('viewer') || lowerName.includes('👁️')) {
      return track.id === 'the-who-wont-get-fooled' || track.id === 'the-police-every-breath' || track.id === 'blondie-heart-of-glass'
    }
    
    if (lowerName.includes('chain') || lowerName.includes('⛓️') || lowerName.includes('semantic') || lowerName.includes('🔗')) {
      return track.id === 'the-beatles-come-together' || track.id === 'the-doobie-brothers-long-train' || track.id === 'pink-floyd-echoes'
    }
    
    if (lowerName.includes('mario') || lowerName.includes('exit') || lowerName.includes('🕹️')) {
      return track.id === 'jefferson-airplane-white-rabbit' || track.id === 'the-cars-drive' || track.id === 'fleetwood-mac-go-your-own-way'
    }
    
    if (lowerName.includes('music') || lowerName.includes('sync') || lowerName.includes('🎵')) {
      return track.id === 'billy-joel-piano-man' || track.id === 'rush-2112-suite' || track.id.includes('pink-floyd')
    }
    
    if (lowerName.includes('fast') || lowerName.includes('urgent') || lowerName.includes('⚡')) {
      return track.id === 'foreigner-urgent' || track.id === 'ac-dc-thunderstruck' || track.id === 'led-zeppelin-immigrant-song'
    }
    
    return false
  })
  
  if (matched.length === 0) {
    return musicLibrary.filter(track => 
      track.id === 'pink-floyd-welcome-machine' || 
      track.id === 'pink-floyd-breathe' ||
      track.id === 'rush-2112-suite' ||
      track.id === 'the-beatles-come-together'
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
   - Also: "Don't Stop Believin'" for journey to multistar, "Mr. Blue Sky" for bright star generation

3. 🎛️ MODULATOR / FILTER (I Want You to Want Me - Cheap Trick):
   - Use when: Repo filters/modulates/adjusts to solve problems
   - Use when: Moving between machines, problem-solving, coordination
   - Keywords: modulate, filter, adjust, coordinate, move, solve, redirect
   - Also: "Whip It" for quick fixes, "Another One Bites the Dust" for systematic elimination

4. 🎛️ WELCOME TO MACHINE (Welcome to the Machine - Pink Floyd):
   - Use when: First-time setup, onboarding, system introduction
   - Use when: Core system repos, foundational machines
   - Keywords: welcome, core, system, foundation, entry, introduction

5. 🦾 ROBOT / AUTOMATION (Mr. Roboto - Styx):
   - Use when: Robot systems, automation, mechanical processes
   - Keywords: robot, automation, mechanical, machine
   - Also: "We Will Rock You" for powerful robot cores

6. 👁️ MONITORING / AUDITING (Every Breath You Take - The Police):
   - Use when: Token viewers, auditors, monitoring systems
   - Keywords: watch, monitor, audit, observe, track, view
   - Also: "Won't Get Fooled Again" for audit verification

7. ⭐ RUNTIME / TIME (Time - Pink Floyd):
   - Use when: Runtime operations, timing, scheduling
   - Keywords: time, runtime, clock, schedule, timing
   - Also: "Fly Like an Eagle" for time flow, "Once in a Lifetime" for unique moments

8. 💰 MONEY / TREASURY (Money - Pink Floyd):
   - Use when: Treasury, value, tokens, financial systems
   - Keywords: money, treasury, value, token, payment, currency

9. 🧠 BRAIN / LEARNING (Brain Damage - Pink Floyd):
   - Use when: Neural systems, learning, cognition, intelligence
   - Keywords: brain, neural, learning, cognitive, intelligence
   - Also: "The Logical Song" for reasoning, "More Than a Feeling" for memory

10. 🔀 FLOW / MOVEMENT (Long Train Runnin' - Doobie Brothers):
    - Use when: Flow control, routing, movement, transport
    - Keywords: flow, movement, route, transport, journey
    - Also: "Truckin'" for long-haul, "Africa" for distant connections

11. 🪐 MEMORY / STORAGE (More Than a Feeling - Boston):
    - Use when: Memory systems, storage, recall, persistence
    - Keywords: memory, storage, recall, remember, persist
    - Also: "Hotel California" for permanent storage

12. ⛓️ CHAIN / CONNECTION (Come Together - The Beatles):
    - Use when: Chaining, linking, semantic connections
    - Keywords: chain, link, connect, semantic, bind, join

13. 🕹️ NAVIGATION / BRANCHING (White Rabbit - Jefferson Airplane):
    - Use when: Navigation, paths, choices, branching, mario-style exits
    - Keywords: navigate, path, route, choice, branch, exit
    - Also: "Drive" for control, "Go Your Own Way" for independent paths

14. ⚡ FAST / URGENT (Thunderstruck - AC/DC):
    - Use when: Speed, urgency, fast processing, immediate action
    - Keywords: fast, urgent, quick, immediate, speed, rapid
    - Also: "Urgent" for priority processing

15. DARK SIDE OF THE MOON - Track by semantic need:
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
- What is the PRIMARY function based on repo name and emojis?
- Does it match robot/automation? → Mr. Roboto or We Will Rock You
- Does it monitor/audit? → Every Breath You Take or Won't Get Fooled Again
- Does it modulate/filter? → Cheap Trick, Whip It, or Welcome to the Machine
- Does it create multiple stars? → Shine On You Crazy Diamond or Don't Stop Believin'
- Does it handle time/runtime? → Time or Fly Like an Eagle
- Does it handle flow/routing? → Long Train Runnin' or Truckin'
- Does it handle memory/storage? → More Than a Feeling or Hotel California
- Does it chain/connect? → Come Together
- Does it navigate/branch? → White Rabbit or Drive

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
