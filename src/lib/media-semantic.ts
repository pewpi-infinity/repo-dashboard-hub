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
    url: 'https://archive.org/download/78_2112_rush-geddy-lee-alex-lifeson-neil-peart_gbia0534613b/2112%20-%20Rush-restored.mp3',
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
    url: 'https://archive.org/download/cd_2112_rush/disc1/01.%20Rush%20-%202112%3A%20I.%20Overture_FLAC.mp3',
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
    url: 'https://archive.org/download/cd_2112_rush/disc1/04.%20Rush%20-%20The%20Twilight%20Zone_FLAC.mp3',
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
    url: 'https://archive.org/download/cd_2112_rush/disc1/05.%20Rush%20-%20Lessons_FLAC.mp3',
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
    url: 'https://archive.org/download/cd_2112_rush/disc1/06.%20Rush%20-%20Tears_FLAC.mp3',
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
    url: 'https://archive.org/download/cd_2112_rush/disc1/07.%20Rush%20-%20Something%20For%20Nothing_FLAC.mp3',
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
    url: 'https://archive.org/download/PinkFloyd-ShineOnYouCrazyDiamond1975/Pink%20Floyd%20-%20Shine%20On%20You%20Crazy%20Diamond%20%281975%29.mp3',
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
    url: 'https://archive.org/download/PinkFloyd-ComfortablyNumb/Pink%20Floyd%20-%20Comfortably%20Numb.mp3',
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
    url: 'https://archive.org/download/PinkFloyd-Echoes_201409/Pink%20Floyd%20-%20Echoes.mp3',
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
  },
  {
    id: 'grateful-dead-touch-of-grey',
    title: 'Touch of Grey',
    artist: 'Grateful Dead',
    album: 'In the Dark',
    duration: '5:49',
    url: 'https://archive.org/download/78_touch-of-grey_grateful-dead-jerry-garcia-robert-hunter_gbia0027852a/Touch%20Of%20Grey%20-%20Grateful%20Dead-restored.mp3',
    themes: ['survival', 'resilience', 'age', 'wisdom', 'endurance', 'perspective'],
    mood: ['uplifting', 'resilient', 'wise', 'hopeful', 'upbeat'],
    suggestedRepos: ['mongoose.os', 'legend-🪐-memory', 'legend-🍄-auditor'],
    lyrics: '🎸 I will survive - Resilience and survival through system changes'
  },
  {
    id: 'alice-cooper-schools-out',
    title: "School's Out",
    artist: 'Alice Cooper',
    album: "School's Out",
    duration: '3:29',
    url: 'https://archive.org/download/78_schools-out_alice-cooper-michael-bruce-glen-buxton-dennis-dunaway-neal-smith_gbia0027765a/School%27s%20Out%20-%20Alice%20Cooper-restored.mp3',
    themes: ['freedom', 'liberation', 'escape', 'education-complete', 'release', 'celebration'],
    mood: ['rebellious', 'celebratory', 'energetic', 'liberating', 'triumphant'],
    suggestedRepos: ['legend-🕹️-mario-exit', 'legend-core', 'mongoose.os'],
    lyrics: '🏫 School\'s out forever - Project completion and graduation to next phase'
  },
  {
    id: 'starship-we-built-this-city',
    title: 'We Built This City',
    artist: 'Starship',
    album: 'Knee Deep in the Hoopla',
    duration: '4:57',
    url: 'https://archive.org/download/78_we-built-this-city_starship-bernie-taupin-dennis-lambert-martin-page-peter-wolf_gbia0027891a/We%20Built%20This%20City%20-%20Starship-restored.mp3',
    themes: ['building', 'creation', 'city', 'construction', 'rock-n-roll', 'foundation'],
    mood: ['upbeat', 'anthemic', 'optimistic', 'building', 'energetic'],
    suggestedRepos: ['legend-core', 'legend-🧱-encode', 'legend-spine-index', 'mongoose.os'],
    lyrics: '🏙️ We built this city on rock and roll - Building foundational systems and architectures'
  },
  {
    id: 'black-sabbath-iron-man',
    title: 'Iron Man',
    artist: 'Black Sabbath',
    album: 'Paranoid',
    duration: '5:56',
    url: 'https://archive.org/download/78_iron-man_black-sabbath-tony-iommi-geezer-butler-ozzy-osbourne-bill-ward_gbia0027086a/Iron%20Man%20-%20Black%20Sabbath-restored.mp3',
    themes: ['robot', 'metal', 'machine', 'power', 'transformation', 'heavy'],
    mood: ['heavy', 'powerful', 'mechanical', 'dark', 'commanding'],
    suggestedRepos: ['legend-🦾-robot-core', 'legend-🦿-robot-legs', 'legend-core'],
    lyrics: '🤖 I am Iron Man - Heavy metal robot systems with commanding power'
  },
  {
    id: 'black-sabbath-paranoid',
    title: 'Paranoid',
    artist: 'Black Sabbath',
    album: 'Paranoid',
    duration: '2:48',
    url: 'https://archive.org/download/78_paranoid_black-sabbath-tony-iommi-geezer-butler-ozzy-osbourne-bill-ward_gbia0027544a/Paranoid%20-%20Black%20Sabbath-restored.mp3',
    themes: ['anxiety', 'monitoring', 'watchfulness', 'tension', 'alertness'],
    mood: ['intense', 'driving', 'anxious', 'energetic', 'heavy'],
    suggestedRepos: ['legend-🍄-auditor', 'legend-👁️-token-viewer', 'legend-👀-watcher'],
    lyrics: '👀 People think I\'m insane - Vigilant monitoring and audit systems'
  },
  {
    id: 'rod-stewart-maggie-may',
    title: 'Maggie May',
    artist: 'Rod Stewart',
    album: 'Every Picture Tells a Story',
    duration: '5:46',
    url: 'https://archive.org/download/78_maggie-may_rod-stewart-martin-quittenton_gbia0027326a/Maggie%20May%20-%20Rod%20Stewart-restored.mp3',
    themes: ['story', 'memory', 'nostalgia', 'change', 'growing-up', 'reflection'],
    mood: ['nostalgic', 'storytelling', 'reflective', 'bittersweet', 'upbeat'],
    suggestedRepos: ['legend-🪐-memory', 'truvio-studios', 'legend-🎵-sync'],
    lyrics: '📖 Wake up Maggie - Story-based memory recall and narrative systems'
  },
  {
    id: 'phil-collins-in-the-air-tonight',
    title: 'In the Air Tonight',
    artist: 'Phil Collins',
    album: 'Face Value',
    duration: '5:34',
    url: 'https://archive.org/download/78_in-the-air-tonight_phil-collins_gbia0027076a/In%20The%20Air%20Tonight%20-%20Phil%20Collins-restored.mp3',
    themes: ['anticipation', 'buildup', 'tension', 'waiting', 'arrival', 'dramatic'],
    mood: ['atmospheric', 'building', 'tense', 'dramatic', 'powerful'],
    suggestedRepos: ['legend-⭐-runtime', 'legend-🪐-memory', 'mongoose.os'],
    lyrics: '🥁 I can feel it coming in the air tonight - Anticipation and dramatic runtime moments'
  },
  {
    id: 'traffic-dear-mr-fantasy',
    title: 'Dear Mr. Fantasy',
    artist: 'Traffic',
    album: 'Mr. Fantasy',
    duration: '5:32',
    url: 'https://archive.org/download/78_dear-mr-fantasy_traffic-steve-winwood-jim-capaldi-chris-wood_gbia0026721a/Dear%20Mr.%20Fantasy%20-%20Traffic-restored.mp3',
    themes: ['fantasy', 'imagination', 'escape', 'creativity', 'music', 'joy'],
    mood: ['psychedelic', 'uplifting', 'imaginative', 'joyful', 'flowing'],
    suggestedRepos: ['legend-🎵-sync', 'legend-✨-multistar', 'truvio-studios'],
    lyrics: '🎸 Play us a tune, something to make us all happy - Creative musical flow and joyful generation'
  },
  {
    id: 'van-halen-jump',
    title: 'Jump',
    artist: 'Van Halen',
    album: '1984',
    duration: '4:04',
    url: 'https://archive.org/download/78_jump_van-halen-david-lee-roth-eddie-van-halen-alex-van-halen-michael-anthony_gbia0027207a/Jump%20-%20Van%20Halen-restored.mp3',
    themes: ['action', 'leap', 'risk', 'excitement', 'motivation', 'energy'],
    mood: ['energetic', 'exciting', 'motivational', 'upbeat', 'driving'],
    suggestedRepos: ['legend-🔀-flow', 'legend-🕹️-mario-exit', 'legend-⚡-fast'],
    lyrics: '🎹 Go ahead and jump - Taking action and making the leap'
  },
  {
    id: 'stevie-ray-vaughan-pride-and-joy',
    title: 'Pride and Joy',
    artist: 'Stevie Ray Vaughan',
    album: 'Texas Flood',
    duration: '3:39',
    url: 'https://archive.org/download/78_pride-and-joy_stevie-ray-vaughan-and-double-trouble-stevie-ray-vaughan_gbia0027591a/Pride%20And%20Joy%20-%20Stevie%20Ray%20Vaughan-restored.mp3',
    themes: ['pride', 'joy', 'blues', 'guitar', 'celebration', 'love'],
    mood: ['upbeat', 'joyful', 'bluesy', 'energetic', 'celebratory'],
    suggestedRepos: ['legend-core', 'legend-✨-multistar', 'legend-🎵-sync'],
    lyrics: '🎸 She\'s my sweet little thing - Pride in well-crafted systems'
  },
  {
    id: 'bush-machinehead',
    title: 'Machinehead',
    artist: 'Bush',
    album: 'Sixteen Stone',
    duration: '4:12',
    url: 'https://archive.org/download/78_machinehead_bush-gavin-rossdale_gbia0027323a/Machinehead%20-%20Bush-restored.mp3',
    themes: ['machine', 'industrial', 'mechanical', 'grunge', 'power', 'automation'],
    mood: ['heavy', 'industrial', 'powerful', 'mechanical', 'intense'],
    suggestedRepos: ['legend-🦾-robot-core', 'legend-🎛️-modulator', 'mongoose.os'],
    lyrics: '🤖 Breathe in, breathe out - Industrial machine systems and automation'
  },
  {
    id: 'the-doors-break-on-through',
    title: 'Break On Through (To the Other Side)',
    artist: 'The Doors',
    album: 'The Doors',
    duration: '2:29',
    themes: ['breakthrough', 'revolution', 'breaking', 'liberation', 'freedom', 'unlock'],
    mood: ['rebellious', 'energetic', 'liberating', 'psychedelic', 'powerful'],
    suggestedRepos: ['legend-⛓️‍💥-chain-breaker', 'legend-🔀-flow', 'legend-🕹️-mario-exit'],
    lyrics: '⛓️‍💥 Break on through to the other side - Chain breaking and liberation'
  },
  {
    id: 'the-ramones-i-wanna-be-sedated',
    title: 'I Wanna Be Sedated',
    artist: 'Ramones',
    album: 'Road to Ruin',
    duration: '2:30',
    themes: ['rest', 'calm', 'peace', 'escape', 'sleep'],
    mood: ['fast', 'energetic', 'ironic', 'punk', 'driving'],
    suggestedRepos: ['legend-🛞-tire', 'legend-🔀-flow', 'legend-⭐-runtime'],
    lyrics: '🛞 Twenty-twenty-twenty-four hours to go - Cyclical rotation and time management'
  },
  {
    id: 'eurythmics-sweet-dreams',
    title: 'Sweet Dreams (Are Made of This)',
    artist: 'Eurythmics',
    album: 'Sweet Dreams',
    duration: '3:36',
    themes: ['dreams', 'searching', 'journey', 'exploration', 'desire'],
    mood: ['haunting', 'hypnotic', 'mysterious', 'driving', 'electronic'],
    suggestedRepos: ['legend-🪐-memory', 'mongoose.os', 'legend-🔗-semantic'],
    lyrics: '🪐 Who am I to disagree? - Memory and dream storage systems'
  },
  {
    id: 'the-kinks-lola',
    title: 'Lola',
    artist: 'The Kinks',
    album: 'Lola Versus Powerman',
    duration: '4:04',
    themes: ['identity', 'story', 'transformation', 'recognition', 'acceptance'],
    mood: ['storytelling', 'upbeat', 'catchy', 'playful', 'narrative'],
    suggestedRepos: ['legend-📖-reader', 'legend-🔗-semantic', 'truvio-studios'],
    lyrics: '📖 I\'m glad I\'m a man, and so is Lola - Reading and understanding stories'
  },
  {
    id: 'the-zombies-time-of-season',
    title: 'Time of the Season',
    artist: 'The Zombies',
    album: 'Odessey and Oracle',
    duration: '3:34',
    themes: ['time', 'season', 'cycle', 'change', 'transformation'],
    mood: ['psychedelic', 'groovy', 'mysterious', 'sensual', 'atmospheric'],
    suggestedRepos: ['legend-🛞-tire', 'legend-���-runtime', 'legend-🔀-flow'],
    lyrics: '🛞 It\'s the time of the season - Cyclical rotation and seasonal changes'
  },
  {
    id: 'cream-white-room',
    title: 'White Room',
    artist: 'Cream',
    album: 'Wheels of Fire',
    duration: '4:58',
    themes: ['space', 'isolation', 'transformation', 'journey', 'platform', 'station'],
    mood: ['psychedelic', 'powerful', 'mysterious', 'epic', 'bluesy'],
    suggestedRepos: ['legend-🖼️-frame', 'legend-🪐-memory', 'legend-core'],
    lyrics: '🖼️ In a white room with black curtains - Frame and boundary creation'
  },
  {
    id: 'the-yardbirds-for-your-love',
    title: 'For Your Love',
    artist: 'The Yardbirds',
    album: 'For Your Love',
    duration: '2:30',
    themes: ['dedication', 'service', 'giving', 'sacrifice', 'commitment'],
    mood: ['upbeat', 'catchy', 'energetic', 'romantic', 'driving'],
    suggestedRepos: ['legend-🗣️-voice', 'legend-🎵-sync', 'legend-💰-money'],
    lyrics: '🗣️ I\'d give the stars above - Voice of dedication and service'
  },
  {
    id: 'buffalo-springfield-for-what-its-worth',
    title: "For What It's Worth",
    artist: 'Buffalo Springfield',
    album: 'Buffalo Springfield',
    duration: '2:37',
    themes: ['awareness', 'watching', 'observation', 'tension', 'vigilance', 'monitoring'],
    mood: ['cautious', 'observant', 'tense', 'folk-rock', 'reflective'],
    suggestedRepos: ['legend-👀-watcher', 'legend-👁️-viewer', 'legend-🍄-auditor'],
    lyrics: '👀 Stop, hey, what\'s that sound? Everybody look what\'s going down - System watching and monitoring'
  },
  {
    id: 'simon-garfunkel-bridge-over-troubled-water',
    title: 'Bridge Over Troubled Water',
    artist: 'Simon & Garfunkel',
    album: 'Bridge Over Troubled Water',
    duration: '4:52',
    themes: ['support', 'bridge', 'connection', 'help', 'comfort', 'crossing'],
    mood: ['uplifting', 'emotional', 'powerful', 'comforting', 'epic'],
    suggestedRepos: ['legend-⛓️-chain', 'legend-🔗-semantic', 'legend-🔌-socket'],
    lyrics: '⛓️ I\'m on your side - Bridge connections and support chains'
  },
  {
    id: 'bob-dylan-like-a-rolling-stone',
    title: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    album: 'Highway 61 Revisited',
    duration: '6:13',
    themes: ['freedom', 'independence', 'rolling', 'movement', 'transformation', 'change'],
    mood: ['defiant', 'energetic', 'liberating', 'revolutionary', 'iconic'],
    suggestedRepos: ['legend-🛞-tire', 'legend-🔀-flow', 'legend-⛓️‍💥-chain-breaker'],
    lyrics: '🛞 How does it feel, to be on your own, like a rolling stone - Continuous rotation and movement'
  },
  {
    id: 'the-animals-house-of-rising-sun',
    title: 'House of the Rising Sun',
    artist: 'The Animals',
    album: 'The Animals',
    duration: '4:30',
    themes: ['house', 'dwelling', 'memory', 'warning', 'story', 'history'],
    mood: ['haunting', 'emotional', 'powerful', 'tragic', 'legendary'],
    suggestedRepos: ['legend-🖼️-frame', 'legend-🪐-memory', 'truvio-studios'],
    lyrics: '🏠 There is a house in New Orleans - Frame structures and memory houses'
  },
  {
    id: 'the-clash-rock-the-casbah',
    title: 'Rock the Casbah',
    artist: 'The Clash',
    album: 'Combat Rock',
    duration: '3:42',
    themes: ['revolution', 'rebellion', 'music', 'freedom', 'defiance', 'rock'],
    mood: ['rebellious', 'energetic', 'defiant', 'upbeat', 'funky'],
    suggestedRepos: ['legend-🎵-sync', 'legend-⛓️‍💥-chain-breaker', 'legend-core'],
    lyrics: '🎵 Rock the Casbah - Music sync and rebellious rhythm'
  },
  {
    id: 'squeeze-tempted',
    title: 'Tempted',
    artist: 'Squeeze',
    album: 'East Side Story',
    duration: '4:03',
    themes: ['temptation', 'resistance', 'choice', 'decision', 'control'],
    mood: ['smooth', 'soulful', 'groovy', 'reflective', 'tempting'],
    suggestedRepos: ['legend-🎛️-modulator', 'legend-🔀-flow', 'mongoose.os'],
    lyrics: '🎛️ I\'m tempted by the fruit of another - Modulation and choice filtering'
  },
  {
    id: 'the-rolling-stones-paint-it-black',
    title: 'Paint It Black',
    artist: 'The Rolling Stones',
    album: 'Aftermath',
    duration: '3:44',
    themes: ['transformation', 'change', 'color', 'painting', 'darkness', 'emotion'],
    mood: ['dark', 'intense', 'dramatic', 'psychedelic', 'driving'],
    suggestedRepos: ['legend-🎨-printer', 'legend-🖼️-frame', 'legend-core'],
    lyrics: '🎨 I see a red door and I want it painted black - Rendering and color transformation'
  },
  {
    id: 'ccr-fortunate-son',
    title: 'Fortunate Son',
    artist: 'Creedence Clearwater Revival',
    album: 'Willy and the Poor Boys',
    duration: '2:20',
    themes: ['inequality', 'privilege', 'protest', 'military', 'defiance'],
    mood: ['defiant', 'energetic', 'rebellious', 'powerful', 'driving'],
    suggestedRepos: ['legend-core', 'legend-⛓️‍💥-chain-breaker', 'mongoose.os'],
    lyrics: '👑 It ain\'t me, I ain\'t no fortunate son - Questioning authority and privilege'
  },
  {
    id: 'ccr-have-you-ever-seen-the-rain',
    title: 'Have You Ever Seen the Rain',
    artist: 'Creedence Clearwater Revival',
    album: 'Pendulum',
    duration: '2:40',
    themes: ['rain', 'weather', 'cycles', 'change', 'nature', 'reflection'],
    mood: ['reflective', 'melancholic', 'gentle', 'nostalgic', 'folk-rock'],
    suggestedRepos: ['legend-👁️-viewer', 'legend-🪐-memory', 'legend-🛞-tire'],
    lyrics: '👁️ Have you ever seen the rain coming down on a sunny day - Observation and pattern recognition'
  },
  {
    id: 'the-guess-who-american-woman',
    title: 'American Woman',
    artist: 'The Guess Who',
    album: 'American Woman',
    duration: '5:08',
    themes: ['independence', 'freedom', 'rejection', 'autonomy', 'separation'],
    mood: ['powerful', 'defiant', 'driving', 'bluesy', 'heavy'],
    suggestedRepos: ['legend-⛓️‍💥-chain-breaker', 'legend-🔀-flow', 'legend-core'],
    lyrics: '⛓️ American woman, stay away from me - Breaking dependencies and chains'
  },
  {
    id: 'derek-and-dominos-layla',
    title: 'Layla',
    artist: 'Derek and the Dominos',
    album: 'Layla and Other Assorted Love Songs',
    duration: '7:10',
    themes: ['passion', 'desire', 'pursuit', 'connection', 'longing'],
    mood: ['passionate', 'powerful', 'emotional', 'bluesy', 'epic'],
    suggestedRepos: ['legend-🔗-semantic', 'legend-⛓️-chain', 'truvio-studios'],
    lyrics: '🔗 Layla, you got me on my knees - Semantic connection and passionate linking'
  },
  {
    id: 'tom-petty-free-fallin',
    title: "Free Fallin'",
    artist: 'Tom Petty',
    album: 'Full Moon Fever',
    duration: '4:15',
    themes: ['freedom', 'falling', 'liberation', 'flow', 'movement', 'descent'],
    mood: ['carefree', 'smooth', 'liberating', 'upbeat', 'flowing'],
    suggestedRepos: ['legend-🔀-flow', 'legend-⛓️‍💥-chain-breaker', 'legend-🛞-tire'],
    lyrics: '🔀 Free fallin\' - Uninhibited flow and movement'
  },
  {
    id: 'the-cars-just-what-i-needed',
    title: 'Just What I Needed',
    artist: 'The Cars',
    album: 'The Cars',
    duration: '3:44',
    themes: ['necessity', 'need', 'satisfaction', 'fulfillment', 'perfect-fit'],
    mood: ['upbeat', 'energetic', 'catchy', 'new-wave', 'driving'],
    suggestedRepos: ['legend-🎛️-modulator', 'legend-🔗-semantic', 'mongoose.os'],
    lyrics: '🎛️ You\'re just what I needed - Finding the perfect modulation and match'
  },
  {
    id: 'the-moody-blues-nights-in-white-satin',
    title: 'Nights in White Satin',
    artist: 'The Moody Blues',
    album: 'Days of Future Passed',
    duration: '7:24',
    themes: ['night', 'dreams', 'emotion', 'beauty', 'love', 'transcendence'],
    mood: ['ethereal', 'emotional', 'dramatic', 'orchestral', 'romantic'],
    suggestedRepos: ['legend-🪐-memory', 'legend-✨-multistar', 'truvio-studios'],
    lyrics: '���� Nights in white satin, never reaching the end - Memory and dream states'
  },
  {
    id: 'procol-harum-whiter-shade-pale',
    title: 'A Whiter Shade of Pale',
    artist: 'Procol Harum',
    album: 'Procol Harum',
    duration: '4:04',
    themes: ['mystery', 'transformation', 'color', 'shade', 'change', 'psychedelic'],
    mood: ['mysterious', 'dreamy', 'baroque', 'haunting', 'ethereal'],
    suggestedRepos: ['legend-🎨-printer', 'legend-🖼️-frame', 'legend-🪐-memory'],
    lyrics: '🎨 We skipped the light fandango - Color rendering and transformation'
  },
  {
    id: 'golden-earring-radar-love',
    title: 'Radar Love',
    artist: 'Golden Earring',
    album: 'Moontan',
    duration: '6:44',
    themes: ['radar', 'detection', 'connection', 'signal', 'communication', 'drive'],
    mood: ['driving', 'energetic', 'urgent', 'powerful', 'hypnotic'],
    suggestedRepos: ['legend-🔌-socket', 'legend-👀-watcher', 'legend-🔗-semantic'],
    lyrics: '🔌 I\'ve got a feeling called radar love - Socket connections and real-time signals'
  },
  {
    id: 'alice-cooper-eighteen',
    title: "I'm Eighteen",
    artist: 'Alice Cooper',
    album: 'Love It to Death',
    duration: '2:58',
    themes: ['age', 'identity', 'confusion', 'transition', 'growing', 'change'],
    mood: ['rebellious', 'confused', 'energetic', 'rock', 'anthemic'],
    suggestedRepos: ['legend-core', 'mongoose.os', 'legend-⭐-runtime'],
    lyrics: '⭐ I\'m eighteen and I don\'t know what I want - Runtime identity and system age'
  },
  {
    id: 'mountain-mississippi-queen',
    title: 'Mississippi Queen',
    artist: 'Mountain',
    album: 'Climbing!',
    duration: '2:30',
    themes: ['power', 'queen', 'authority', 'dominance', 'leadership'],
    mood: ['powerful', 'heavy', 'driving', 'bluesy', 'commanding'],
    suggestedRepos: ['legend-core', 'legend-👑-authority', 'mongoose.os'],
    lyrics: '👑 Mississippi Queen - Authority and commanding presence'
  },
  {
    id: 'blue-oyster-cult-dont-fear-reaper',
    title: "(Don't Fear) The Reaper",
    artist: 'Blue Öyster Cult',
    album: 'Agents of Fortune',
    duration: '5:08',
    themes: ['death', 'eternity', 'transcendence', 'fearless', 'acceptance', 'cycle'],
    mood: ['haunting', 'ethereal', 'powerful', 'mysterious', 'epic'],
    suggestedRepos: ['legend-🛞-tire', 'legend-⭐-runtime', 'legend-🍄-auditor'],
    lyrics: '🛞 Seasons don\'t fear the reaper - Accepting the cycles of time'
  },
  {
    id: 'jethro-tull-aqualung',
    title: 'Aqualung',
    artist: 'Jethro Tull',
    album: 'Aqualung',
    duration: '6:35',
    themes: ['observation', 'watching', 'society', 'breathing', 'survival'],
    mood: ['heavy', 'progressive', 'gritty', 'powerful', 'observant'],
    suggestedRepos: ['legend-👁️-viewer', 'legend-👀-watcher', 'mongoose.os'],
    lyrics: '👁️ Eyeing little girls with bad intent - Observation and watching systems'
  },
  {
    id: 'yes-roundabout',
    title: 'Roundabout',
    artist: 'Yes',
    album: 'Fragile',
    duration: '8:29',
    themes: ['circle', 'rotation', 'cycle', 'journey', 'roundabout', 'complexity'],
    mood: ['progressive', 'complex', 'uplifting', 'virtuosic', 'epic'],
    suggestedRepos: ['legend-🛞-tire', 'legend-🔀-flow', 'legend-⛓️-chain'],
    lyrics: '🛞 I\'ll be the roundabout - Cyclical rotation and complex routing'
  },
  {
    id: 'steely-dan-reelin-in-years',
    title: "Reelin' in the Years",
    artist: 'Steely Dan',
    album: 'Can\'t Buy a Thrill',
    duration: '4:36',
    themes: ['time', 'memory', 'reflection', 'accumulation', 'years', 'storage'],
    mood: ['jazzy', 'smooth', 'reflective', 'sophisticated', 'groovy'],
    suggestedRepos: ['legend-🪐-memory', 'legend-⭐-runtime', 'mongoose.os'],
    lyrics: '🪐 Reelin\' in the years - Accumulating and storing memories over time'
  },
  {
    id: 'the-velvet-underground-sweet-jane',
    title: 'Sweet Jane',
    artist: 'The Velvet Underground',
    album: 'Loaded',
    duration: '4:32',
    themes: ['story', 'life', 'simplicity', 'joy', 'celebration'],
    mood: ['upbeat', 'joyful', 'celebratory', 'rock', 'anthemic'],
    suggestedRepos: ['legend-📖-reader', 'truvio-studios', 'legend-🎵-sync'],
    lyrics: '📖 Sweet Jane - Reading life stories and narratives'
  },
  {
    id: 'lou-reed-walk-on-wild-side',
    title: 'Walk on the Wild Side',
    artist: 'Lou Reed',
    album: 'Transformer',
    duration: '4:12',
    themes: ['walk', 'journey', 'adventure', 'exploration', 'wild', 'freedom'],
    mood: ['smooth', 'jazzy', 'storytelling', 'cool', 'laid-back'],
    suggestedRepos: ['legend-🕹️-mario-exit', 'legend-🔀-flow', 'truvio-studios'],
    lyrics: '🕹️ Take a walk on the wild side - Navigating unconventional paths'
  },
  {
    id: 'iggy-pop-lust-for-life',
    title: 'Lust for Life',
    artist: 'Iggy Pop',
    album: 'Lust for Life',
    duration: '5:13',
    themes: ['life', 'energy', 'vitality', 'passion', 'living', 'drive'],
    mood: ['energetic', 'driving', 'powerful', 'upbeat', 'anthemic'],
    suggestedRepos: ['legend-core', 'mongoose.os', 'legend-⭐-runtime'],
    lyrics: '⭐ I\'ve got a lust for life - Core vitality and runtime energy'
  },
  {
    id: 'the-pretenders-brass-in-pocket',
    title: 'Brass in Pocket',
    artist: 'The Pretenders',
    album: 'Pretenders',
    duration: '3:05',
    themes: ['confidence', 'pride', 'assertion', 'money', 'currency', 'possession'],
    mood: ['confident', 'catchy', 'upbeat', 'new-wave', 'assertive'],
    suggestedRepos: ['legend-💰-money', 'legend-💵-currency', 'legend-core'],
    lyrics: '💰 I\'m gonna use my arms, gonna use my legs - Currency and confident value'
  },
  {
    id: 'pat-benatar-hit-me-with-best-shot',
    title: 'Hit Me with Your Best Shot',
    artist: 'Pat Benatar',
    album: 'Crimes of Passion',
    duration: '2:50',
    themes: ['challenge', 'resilience', 'strength', 'defiance', 'toughness'],
    mood: ['defiant', 'powerful', 'energetic', 'rock', 'confident'],
    suggestedRepos: ['legend-🍄-auditor', 'legend-core', 'legend-🦾-robot-core'],
    lyrics: '🍄 Hit me with your best shot - Audit challenges and resilient verification'
  },
  {
    id: 'dire-straits-sultans-of-swing',
    title: 'Sultans of Swing',
    artist: 'Dire Straits',
    album: 'Dire Straits',
    duration: '5:50',
    themes: ['music', 'mastery', 'skill', 'performance', 'flow', 'groove'],
    mood: ['smooth', 'masterful', 'groovy', 'skillful', 'jazzy'],
    suggestedRepos: ['legend-🎵-sync', 'legend-🔀-flow', 'truvio-studios'],
    lyrics: '🎵 The Sultans of Swing - Musical mastery and flowing synchronization'
  },
  {
    id: 'kansas-carry-on-wayward-son',
    title: 'Carry On Wayward Son',
    artist: 'Kansas',
    album: 'Leftoverture',
    duration: '5:26',
    themes: ['journey', 'perseverance', 'completion', 'peace', 'rest', 'closure'],
    mood: ['epic', 'anthemic', 'progressive', 'powerful', 'triumphant'],
    suggestedRepos: ['legend-🔀-flow', 'legend-spine-index', 'legend-⭐-runtime'],
    lyrics: '🔀 Carry on my wayward son - Continuous flow and journey persistence'
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
    
    if (lowerName.includes('star') || lowerName.includes('���')) {
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
    
    if (lowerName.includes('socket') || lowerName.includes('🔌') || lowerName.includes('connection')) {
      return track.id === 'golden-earring-radar-love' || track.id === 'simon-garfunkel-bridge-over-troubled-water' || track.id === 'the-beatles-come-together'
    }
    
    if (lowerName.includes('chain-breaker') || lowerName.includes('⛓️‍💥') || lowerName.includes('break') || lowerName.includes('liberation')) {
      return track.id === 'the-doors-break-on-through' || track.id === 'the-guess-who-american-woman' || track.id === 'tom-petty-free-fallin'
    }
    
    if (lowerName.includes('frame') || lowerName.includes('🖼️') || lowerName.includes('boundary')) {
      return track.id === 'cream-white-room' || track.id === 'the-rolling-stones-paint-it-black' || track.id === 'the-animals-house-of-rising-sun'
    }
    
    if (lowerName.includes('tire') || lowerName.includes('🛞') || lowerName.includes('rotation') || lowerName.includes('cycle')) {
      return track.id === 'bob-dylan-like-a-rolling-stone' || track.id === 'the-zombies-time-of-season' || track.id === 'yes-roundabout' || track.id === 'blue-oyster-cult-dont-fear-reaper'
    }
    
    if (lowerName.includes('printer') || lowerName.includes('🎨') || lowerName.includes('render') || lowerName.includes('paint')) {
      return track.id === 'the-rolling-stones-paint-it-black' || track.id === 'procol-harum-whiter-shade-pale'
    }
    
    if (lowerName.includes('reader') || lowerName.includes('📖') || lowerName.includes('read') || lowerName.includes('story')) {
      return track.id === 'the-kinks-lola' || track.id === 'the-velvet-underground-sweet-jane' || track.id === 'rod-stewart-maggie-may'
    }
    
    if (lowerName.includes('money') || lowerName.includes('💰') || lowerName.includes('currency') || lowerName.includes('💵')) {
      return track.id === 'pink-floyd-money' || track.id === 'eddie-money-take-me-home' || track.id === 'the-pretenders-brass-in-pocket'
    }
    
    if (lowerName.includes('voice') || lowerName.includes('🗣️') || lowerName.includes('speech')) {
      return track.id === 'the-yardbirds-for-your-love' || track.id === 'billy-joel-piano-man'
    }
    
    if (lowerName.includes('listener') || lowerName.includes('👂') || lowerName.includes('listen')) {
      return track.id === 'buffalo-springfield-for-what-its-worth' || track.id === 'the-police-every-breath'
    }
    
    if (lowerName.includes('viewer') || lowerName.includes('👁️') || lowerName.includes('view')) {
      return track.id === 'jethro-tull-aqualung' || track.id === 'ccr-have-you-ever-seen-the-rain' || track.id === 'blondie-heart-of-glass'
    }
    
    if (lowerName.includes('watcher') || lowerName.includes('👀') || lowerName.includes('watch')) {
      return track.id === 'buffalo-springfield-for-what-its-worth' || track.id === 'the-police-every-breath' || track.id === 'black-sabbath-paranoid'
    }
    
    if (lowerName.includes('map') || lowerName.includes('🗺️') || lowerName.includes('navigate')) {
      return track.id === 'toto-africa' || track.id === 'lou-reed-walk-on-wild-side' || track.id === 'jefferson-airplane-white-rabbit'
    }
    
    if (lowerName.includes('dictionary') || lowerName.includes('📚') || lowerName.includes('language') || lowerName.includes('🌐')) {
      return track.id === 'supertramp-logical-song' || track.id === 'the-kinks-lola'
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
    if (!window.spark || typeof window.spark.llm !== 'function') {
      console.warn('Spark LLM not available, using fallback music selection')
      const fallback = getMusicForRepo(repoName)
      return fallback[0] || musicLibrary[0] || null
    }

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
