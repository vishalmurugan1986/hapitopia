// Source of truth: Habitopia 5x7 Habit Framework
export const DIMS = [
  { k: 'P', n: 'Physically Healthy', t: 'Body = First Classroom', e: '💪', slot: 'Morning', slot_ta: 'காலை', c: ['#2E9D78', '#5DCAA5'] },
  { k: 'M', n: 'Mentally Strong', t: 'Mind > Mood', e: '🧠', slot: 'Morning', slot_ta: 'காலை', c: ['#6C64B5', '#AFA9EC'] },
  { k: 'I', n: 'Intellectually Sharp', t: 'Brain on Beast Mode', e: '📚', slot: 'School hours', slot_ta: 'பள்ளி நேரம்', c: ['#2D7FCD', '#85B7EB'] },
  { k: 'E', n: 'Emotionally Balanced', t: 'Heart with IQ', e: '🛡️', slot: 'Evening', slot_ta: 'மாலை', c: ['#C94B73', '#ED93B1'] },
  { k: 'F', n: 'Financially Wealthy', t: 'Money Smart Early', e: '🪙', slot: 'Evening', slot_ta: 'மாலை', c: ['#D4623C', '#F0997B'] },
];

export const HABITS = {
  P: [
    ['Move 30 Every Day', 'Play, run, cycle, skip. No excuses.'],
    ['Water First Rule', '2 glasses after waking, before screen or snack.'],
    ['Sleep Like a Champion', 'Fixed bedtime. Gadgets out 60 mins before.'],
    ['Rainbow Plate', '3 colors in every meal.'],
    ['Posture Police', 'Sit tall, bag light, stretch between classes.'],
    ['Breathe Reset', '10 slow breaths when tired or angry.'],
    ['Sport a Quarter', 'One sport practiced 3× a week.']
  ],
  M: [
    ['Win the Morning', 'Bed made, 3 priorities spoken aloud.'],
    ['No-Excuse Minute', 'Start homework for just 1 minute.'],
    ['Fail Fast Log', 'Write one mistake and one lesson.'],
    ['Focus Sprint 15', 'Study in a 15-minute power block.'],
    ['Self-Talk Filter', 'Replace “I can’t” with “I’m learning.”'],
    ['Gratitude 3', 'Three good things before sleep.'],
    ['Digital Boundaries', 'Screen with purpose, not boredom.']
  ],
  I: [
    ['Read 10 Pages', 'Any topic you’re curious about.'],
    ['Question Storm', 'Ask 5 “why” or “how” questions.'],
    ['Memory Play', 'Recall games, visualization, mind maps.'],
    ['Teach to Learn', 'Explain one concept to a friend.'],
    ['Math in Life', 'Work out change, time, speed or budget.'],
    ['Create Not Consume', 'Draw, build, code or write.'],
    ['Weekly Deep Dive', 'Explore one topic beyond the textbook.']
  ],
  E: [
    ['Name the Feeling', '“I feel… because…”'],
    ['Kind Act Daily', 'One helpful action, no reward.'],
    ['Pause Button', 'Count to 5 before reacting.'],
    ['Friendship Rule', 'Listen first, talk second.'],
    ['Journal One Line', 'Your mood and the reason.'],
    ['Sorry Fast, Forgive Faster', 'Go on an ego diet.'],
    ['Family Connect', '15 minutes of real talk.']
  ],
  F: [
    ['3-Jar System', 'Save 50 / Spend 40 / Give 10.'],
    ['Earn a Rupee', 'Do a small task. Feel the value of effort.'],
    ['Need vs Want', 'Ask twice before buying.'],
    ['Price Detective', 'Compare costs in shops.'],
    ['Goal Piggy', 'Save for one big dream.'],
    ['Delay Reward', 'Wait 24 hours for non-essentials.'],
    ['Value Creation', 'Sell a craft or service this year.']
  ],
};

export const THEME = {
  7: 'Playful Starter',
  8: 'Adventurer',
  9: 'Explorer',
  10: 'Builder',
  11: 'Creator',
  12: 'Leader',
  13: 'Achiever',
  14: 'Future CEO'
};

export { DIMS_BAT02, HABITS_BAT02, BAT02_WEEKLY_ADDITIONS } from './bat02Data.js';

// 4-Digit Management Batch Codes
export const BATCH_CODES = {
  '1986': 'BAT01',
  '1978': 'BAT02'
};
export const MANAGEMENT_CODES = BATCH_CODES;

export const BATCH_INFO = {
  BAT01: { id: 'BAT01', code: '1986', label: 'BAT01', totalHabits: 35, curriculumType: 'age_tiers', weeks: 0 },
  BAT02: { id: 'BAT02', code: '1978', label: 'BAT02', totalHabits: 30, curriculumType: 'weekly_progression', weeks: 25 }
};

// Clean, decent vector student crest avatars
export const AVATARS = [
  'shield-checkmark',
  'school',
  'compass',
  'bulb',
  'rocket',
  'trophy',
  'leaf',
  'diamond'
];

export const AVATAR_ITEMS = [
  { id: 'shield-checkmark', icon: 'shield-checkmark', label: 'Guardian', labelTa: 'பாதுகாவலர்', color: '#C27C3A' },
  { id: 'school', icon: 'school', label: 'Scholar', labelTa: 'அறிஞர்', color: '#3D8BFF' },
  { id: 'compass', icon: 'compass', label: 'Explorer', labelTa: 'ஆய்வாளர்', color: '#FF7A2F' },
  { id: 'bulb', icon: 'bulb', label: 'Thinker', labelTa: 'சிந்தனையாளர்', color: '#9B6BFF' },
  { id: 'rocket', icon: 'rocket', label: 'Pioneer', labelTa: 'முன்னோடி', color: '#14B8C4' },
  { id: 'trophy', icon: 'trophy', label: 'Champion', labelTa: 'சாம்பியன்', color: '#F2A93B' },
  { id: 'leaf', icon: 'leaf', label: 'Sprout', labelTa: 'தளிர்', color: '#4CAF2A' },
  { id: 'diamond', icon: 'diamond', label: 'Leader', labelTa: 'தலைவர்', color: '#E85A9B' }
];

const LEGACY_AVATAR_MAP = {
  '🦁': 'shield-checkmark',
  '🐯': 'trophy',
  '🦊': 'compass',
  '🐼': 'leaf',
  '🦄': 'diamond',
  '🐲': 'school',
  '🚀': 'rocket',
  '🤖': 'bulb'
};

export function resolveAvatarId(val) {
  if (!val) return 'shield-checkmark';
  if (LEGACY_AVATAR_MAP[val]) return LEGACY_AVATAR_MAP[val];
  const found = AVATAR_ITEMS.find((item) => item.id === val);
  return found ? found.id : 'shield-checkmark';
}

export function getAvatarMeta(val) {
  const id = resolveAvatarId(val);
  return AVATAR_ITEMS.find((item) => item.id === id) || AVATAR_ITEMS[0];
}

export const REWARDS = [
  {
    n: 'Park outing',
    n_ta: 'பூங்கா பயணம்',
    e: '🌳',
    icon: 'leaf-outline',
    r: 1,
    desc: 'A fun outdoor trip to the local park or nature reserve.',
    desc_ta: 'அருகிலுள்ள பூங்கா அல்லது இயற்கை இடத்திற்கு மகிழ்ச்சியான வெளிப்புற பயணம்.'
  },
  {
    n: 'Library trip',
    n_ta: 'நூலகப் பயணம்',
    e: '📖',
    icon: 'book-outline',
    r: 2,
    desc: 'A dedicated afternoon picking out new books at the library.',
    desc_ta: 'நூலகத்தில் புதிய புத்தகங்களைத் தேர்ந்தெடுக்க ஒரு சிறப்பு மாலைப் பொழுது.'
  },
  {
    n: 'Sport gear',
    n_ta: 'விளையாட்டு உபகரணம்',
    e: '⚽',
    icon: 'football-outline',
    r: 3,
    desc: 'A new ball, racket, skipping rope, or active sports accessory.',
    desc_ta: 'புதிய பந்து, ராக்கெட், ஸ்கிப்பிங் கயிறு அல்லது விளையாட்டு உபகரணம்.'
  },
  {
    n: 'A new course',
    n_ta: 'புதிய திறன் பயிற்சி',
    e: '🎓',
    icon: 'school-outline',
    r: 3,
    desc: 'Enrollment in a coding, art, science, or music learning workshop.',
    desc_ta: 'கோடிங், கலை, அறிவியல் அல்லது இசைப் பட்டறையில் சேரும் வாய்ப்பு.'
  }
];

export const MEDALS = ['No medal yet', 'Bronze', 'Silver', 'Gold'];

// Section 7: Dimension Report Cards Diagnostic Rubric Criteria
export const DIM_RUBRICS = {
  Q: {
    title: 'Q Power Habits (Activation Workshop Core)',
    beginner: 'Needs teacher or parental prompting to perform eye exercises and concentration music routine.',
    developing: 'Completes speed reading and affirmations with occasional gentle reminders.',
    proficient: 'Independently engages in blindfold focus and eyeball tracking exercises daily with sharp focus.',
    master: 'Exhibits deep calm, superior sensory focus, rapid reading retention, and inspires peers in workshop habits.',
    ta: {
      beginner: 'கண் பயிற்சி மற்றும் கவன இசை வழக்கத்தைச் செய்ய ஆசிரியர் அல்லது பெற்றோரின் நினைவூட்டல் தேவைப்படுகிறது.',
      developing: 'வேக வாசிப்பு மற்றும் தன்னம்பிக்கை உறுதிமொழிகளை சிறிய நினைவூட்டல்களுடன் முடிக்கிறார்.',
      proficient: 'கண்களை மூடி உணர்தல் மற்றும் கண் பயிற்சிகளைச் சுயமாக ஆழ்ந்த கவனத்துடன் தினமும் செய்கிறார்.',
      master: 'ஆழ்ந்த அமைதி, சிறந்த புலன் கவனம், விரைவு வாசிப்புத் தேர்ச்சி காட்டி நண்பர்களுக்கும் வழிகாட்டுகிறார்.'
    }
  },
  P: {
    title: 'Physically Healthy (Body = First Classroom)',
    beginner: 'Needs parental prompting for hydration, fixed bedtime, and physical movement.',
    developing: 'Engages in daily movement and water intake with occasional gentle reminders.',
    proficient: 'Consistently completes morning routine, stays active for 30+ mins, and avoids screens before bed.',
    master: 'Proactively maintains personal fitness, eats clean, and inspires peers to stay physically active.',
    ta: {
      beginner: 'தண்ணீர் குடித்தல், சரியான உறக்க நேரம் மற்றும் உடற்பயிற்சிக்கு பெற்றோரின் நினைவூட்டல் தேவைப்படுகிறது.',
      developing: 'சிறிய நினைவூட்டல்களுடன் தினசரி உடற்பயிற்சி மற்றும் தண்ணீர் குடிக்கும் பழக்கத்தில் ஈடுபடுகிறார்.',
      proficient: 'காலை வழக்கத்தைத் தொடர்ந்து முடித்து, 30+ நிமிடம் சுறுசுறுப்பாக இருந்து, உறங்கும் முன் திரையைத் தவிர்க்கிறார்.',
      master: 'சுயமாக உடல் ஆரோக்கியத்தைக் காத்து, சத்தான உணவை உண்டு, நண்பர்களுக்கும் ஊக்கமளிக்கிறார்.'
    }
  },
  M: {
    title: 'Mentally Strong (Mind > Mood)',
    beginner: 'Struggles with homework procrastination; negative self-talk appears during setbacks.',
    developing: 'Uses the 1-minute rule to start tasks; practices gratitude when reminded.',
    proficient: 'Independently sets daily priorities, embraces mistakes as learning, and limits distractions.',
    master: 'Demonstrates deep resilience, filters self-talk automatically, and coaches others in focus.',
    ta: {
      beginner: 'வீட்டுப்பாடத்தைத் தள்ளிப்போடுகிறார்; சவால்களின் போது எதிர்மறை எண்ணங்கள் தோன்றுகின்றன.',
      developing: '1-நிமிட விதியைப் பயன்படுத்தி பணிகளைத் தொடங்குகிறார்; நினைவூட்டும்போது நன்றியுணர்வைப் பழகுகிறார்.',
      proficient: 'தினசரி முன்னுரிமைகளைத் தானே அமைத்து, தவறுகளில் இருந்து கற்று, கவனச்சிதறல்களைக் கட்டுப்படுத்துகிறார்.',
      master: 'ஆழ்ந்த மன உறுதியைக் காட்டி, நேர்மறை சுய-பேச்சைக் கொண்டு, மற்றவர்களுக்கும் வழிகாட்டுகிறார்.'
    }
  },
  I: {
    title: 'Intellectually Sharp (Brain on Beast Mode)',
    beginner: 'Reads only when assigned; rarely asks exploratory questions outside textbooks.',
    developing: 'Reads 10 pages on topics of interest; asks curious questions with encouragement.',
    proficient: 'Consistently creates rather than consumes; explains concepts clearly to peers.',
    master: 'Leads self-directed deep dives, solves real-world math and logic problems, builds projects.',
    ta: {
      beginner: 'சொன்னால் மட்டுமே படிக்கிறார்; பாடப்புத்தகத்திற்கு வெளியே கேள்விகள் கேட்பது குறைவு.',
      developing: 'ஆர்வமுள்ள தலைப்புகளில் 10 பக்கங்கள் படிக்கிறார்; ஊக்குவிக்கும்போது ஆர்வத்துடன் கேள்விகள் கேட்கிறார்.',
      proficient: 'தொடர்ந்து படைப்பாற்றலில் ஈடுபடுகிறார்; கற்ற கருத்துகளை நண்பர்களுக்குத் தெளிவாக விளக்குகிறார்.',
      master: 'சுயமாக ஆழ்ந்த தேடல்களில் ஈடுபட்டு, நடைமுறை கணக்கு மற்றும் தர்க்கச் சிக்கல்களைத் தீர்க்கிறார்.'
    }
  },
  E: {
    title: 'Emotionally Balanced (Heart with IQ)',
    beginner: 'Reacts impulsively during anger or frustration; finds it difficult to articulate feelings.',
    developing: 'Identifies feelings using “I feel… because…”; pauses with parental cues.',
    proficient: 'Regularly practices empathy, performs unprompted kind acts, and resolves conflicts quickly.',
    master: 'Exemplifies emotional maturity, listens deeply, supports friends, and fosters family harmony.',
    ta: {
      beginner: 'கோபம் அல்லது விரக்தியின் போது உடனடியாக எதிர்வினையாற்றுகிறார்; உணர்வுகளை விவரிக்க சிரமப்படுகிறார்.',
      developing: '“நான் உணர்கிறேன்… ஏனெனில்…” என்று உணர்வுகளை அடையாளம் காண்கிறார்; பெற்றோர் கூறும்போது நிதானிக்கிறார்.',
      proficient: 'தொடர்ந்து பரிவு காட்டி, யாரும் சொல்லாமலேயே உதவிகள் செய்து, மனக்கசப்புகளை விரைவாகத் தீர்க்கிறார்.',
      master: 'சிறந்த உணர்ச்சி முதிர்ச்சியுடன் செயல்பட்டு, பிறர் சொல்வதைக் கூர்ந்து கவனித்து, குடும்ப நல்லிணக்கத்தை வளர்க்கிறார்.'
    }
  },
  F: {
    title: 'Financially Wealthy (Money Smart Early)',
    beginner: 'Does not distinguish between needs and wants; impulsive spending tendencies.',
    developing: 'Maintains the 3-Jar System with guidance; compares prices before small purchases.',
    proficient: 'Earns pocket money through dedicated effort; delays gratification for 24+ hours.',
    master: 'Creates tangible value through micro-ventures/services; saves strategically for long-term dreams.',
    ta: {
      beginner: 'தேவைக்கும் ஆசைக்கும் வேறுபாடு தெரிவதில்லை; உடனடியாக செலவு செய்யும் போக்கு உள்ளது.',
      developing: 'வழிகாட்டுதலுடன் 3-ஜாடி முறையைப் பின்பற்றுகிறார்; சிறிய பொருட்களை வாங்கும் முன் விலையை ஒப்பிடுகிறார்.',
      proficient: 'சிறு உழைப்பின் மூலம் சேமிப்பைப் பெறுகிறார்; அத்தியாவசியமற்ற பொருட்களுக்கு 24+ மணி நேரம் காத்திருக்கிறார்.',
      master: 'சிறிய கைவினை அல்லது சேவைகள் மூலம் மதிப்பை உருவாக்கி, நீண்டகாலக் கனவுகளுக்காகத் திட்டமிட்டுச் சேமிக்கிறார்.'
    }
  }
};

// Section 8 & 9: Parent and Teacher Implementation Guides
export const PARENT_GUIDE = [
  {
    title: "Home Implementation System",
    title_ta: "வீட்டில் செயல்படுத்தும் முறை",
    content: "Follow one daily rhythm: Morning for Physical and Mental habits, school hours for Intellectual habits, Evening for Emotional and Financial habits, and Sunday for the family review. Keep the habit card on the fridge and let one adult be the daily habit anchor.",
    content_ta: "ஒரே தினசரி முறையைப் பின்பற்றுங்கள்: காலை உடல் மற்றும் மனப் பழக்கங்கள், பள்ளி நேரம் அறிவுப் பழக்கங்கள், மாலை உணர்வு மற்றும் நிதிப் பழக்கங்கள், ஞாயிறு குடும்ப ஆய்வு. பழக்க அட்டையை குளிர்சாதனப் பெட்டியில் ஒட்டி, ஒரு பெரியவரை தினசரி பழக்க வழிகாட்டியாக வைத்திருங்கள்."
  },
  {
    title: 'How Parents Support Habits',
    title_ta: 'பழக்கங்களை வளர்க்க பெற்றோரின் பங்கு',
    content: 'Praise effort and consistency, not just outcomes. Children build lifelong habits when parents model the same routines (e.g. drinking water first, putting gadgets away before bed).',
    content_ta: 'முடிவுகளை மட்டுமல்லாமல் முயற்சியையும் தொடர்ச்சியையும் பாராட்டுங்கள். பெற்றோர்கள் அதே பழக்கங்களை (எ.கா. காலையில் தண்ணீர் குடித்தல், உறங்கும் முன் கைபேசியைத் தவிர்த்தல்) பின்பற்றும்போது குழந்தைகள் வாழ்நாள் பழக்கங்களை உருவாக்குகிறார்கள்.'
  },
  {
    title: 'Sunday Family Review Protocol',
    title_ta: 'ஞாயிறு குடும்ப ஆய்வு முறை',
    content: 'Dedicate 15–20 minutes every Sunday evening. Celebrate the week’s points, discuss what was challenging with empathy, and write down one shared goal for next week.',
    content_ta: 'ஒவ்வொரு ஞாயிறு மாலையும் 15–20 நிமிடங்கள் ஒதுக்குங்கள். வாரத்தின் புள்ளிகளைக் கொண்டாடுங்கள், சவாலானவற்றைப் பரிவுடன் விவாதித்து, அடுத்த வாரத்திற்கான ஒரு கூட்டு இலக்கை எழுதுங்கள்.'
  },
  {
    title: 'Screen-Time Management',
    title_ta: 'திரை நேர மேலாண்மை',
    content: 'Establish digital boundaries without hostility. Gadgets exit bedrooms 60 minutes before sleep. Use screens purposefully for creation and learning, not endless passive consumption.',
    content_ta: 'கடுமையின்றி டிஜிட்டல் எல்லைகளை அமையுங்கள். உறங்குவதற்கு 60 நிமிடங்களுக்கு முன்பே படுக்கையறையிலிருந்து கருவிகளை அகற்றுங்கள். உருவாக்கத்திற்கும் கற்றலுக்கும் மட்டுமே திரையைப் பயன்படுத்துங்கள்.'
  },
  {
    title: 'Positive Reinforcement',
    title_ta: 'நேர்மறை ஊக்குவிப்பு',
    content: 'Never use toy bribes. Reward achievement with memorable bonding experiences (park outings, library book shopping, sports games, or fun skill courses).',
    content_ta: 'பொம்மைகளை லஞ்சமாகத் தராதீர்கள். பூங்கா பயணம், நூலகப் பயணம், விளையாட்டு உபகரணம் அல்லது புதிய திறன் பயிற்சி போன்ற மறக்க முடியாத அனுபவங்களைப் பரிசாக வழங்குங்கள்.'
  }
];

export const TEACHER_GUIDE = [
  {
    title: "Classroom Implementation",
    title_ta: "வகுப்பறைச் செயல்பாடு",
    content: "Start each morning with a 3-minute check-in: ask two or three children which morning habit they completed and what they will practise today. Foster a no-excuses, growth-mindset culture where effort is praised.",
    content_ta: "ஒவ்வொரு காலையிலும் 3 நிமிடச் சரிபார்ப்புடன் தொடங்குங்கள்: இரண்டு மூன்று மாணவர்களிடம் எந்தக் காலைப் பழக்கத்தை முடித்தார்கள், இன்று எதைப் பயிற்சி செய்வார்கள் என்று கேளுங்கள். முயற்சியைப் பாராட்டும் வளர்ச்சி மனப்பான்மையை வளர்த்தெடுங்கள்."
  },
  {
    title: "Weekly Review Process",
    title_ta: "வாராந்திர ஆய்வு முறை",
    content: "Every Friday, spend 10 minutes on the weekly score: celebrate medals (Gold 300+, Silver 240+, Bronze 180+), let each child name one win and one habit to improve, and import audit codes into the School Management Portal.",
    content_ta: "ஒவ்வொரு வெள்ளிக்கிழமையும் 10 நிமிடங்கள் வாராந்திர மதிப்பெண்ணை ஆய்வு செய்யுங்கள்: பதக்கங்களைக் கொண்டாடுங்கள் (தங்கம் 300+, வெள்ளி 240+, வெண்கலம் 180+), ஒவ்வொரு மாணவரும் ஒரு வெற்றியையும் மேம்படுத்த வேண்டிய ஒரு பழக்கத்தையும் சொல்லட்டும், தணிக்கைக் குறியீடுகளை பள்ளி மேலாண்மை போர்ட்டலில் சேர்க்கவும்."
  },
  {
    title: "Peer Teaching Circle",
    title_ta: "சக மாணவர் கற்பித்தல் வட்டம்",
    content: "Pair students once a week for 10 minutes where each explains one thing they learned or practised to their partner. Teaching cements mastery and builds confidence.",
    content_ta: "வாரத்திற்கு ஒருமுறை 10 நிமிடங்கள் மாணவர்களை இணையாக அமர்த்தி, தாங்கள் கற்ற அல்லது பயிற்சி செய்த ஒன்றை நண்பருக்கு விளக்கச் செய்யுங்கள். கற்பித்தல் தெளிவையும் தன்னம்பிக்கையையும் வளர்க்கும்."
  },
  {
    title: "Assessment Framework",
    title_ta: "மதிப்பீட்டு முறை",
    content: "Assess each habit with the 4-level rubric in its chapter (Beginner, Developing, Proficient, Master). A day counts as successful at 60% of missions; use the dimension report cards and the Future-Proof Child Index for term reports.",
    content_ta: "ஒவ்வொரு பழக்கத்தையும் அதன் அத்தியாயத்திலுள்ள 4-நிலை அளவுகோலால் மதிப்பிடுங்கள் (தொடக்கம், வளர்ச்சி, திறமை, தேர்ச்சி). 60% பணிகள் முடிந்தால் அந்த நாள் வெற்றி; பருவ அறிக்கைகளுக்கு பரிமாண அறிக்கை அட்டைகளையும் எதிர்காலத் தயார் குழந்தை குறியீட்டையும் பயன்படுத்துங்கள்."
  },
  {
    title: "Evidence Collection & Recognition",
    title_ta: "சான்று சேகரிப்பு & அங்கீகாரம்",
    content: "Acknowledge children who reach the 60% threshold. Display streak charts on classroom walls and award peer-nominated kindness and leadership badges.",
    content_ta: "60% தேர்ச்சி இலக்கை அடையும் மாணவர்களைப் பாராட்டுங்கள். வகுப்பறைச் சுவர்களில் தொடர் வெற்றிப் பட்டியலைக் காட்சிப்படுத்தி, அன்பு மற்றும் தலைமைத்துவப் பதக்கங்களை வழங்குங்கள்."
  }
];

// Curriculum-specific guide entries, shown after the shared ones (GuidesModal).
export const CURRICULUM_GUIDE_EXTRAS = {
  BAT01: {
    parent: {
      title: "Age Levels at Home",
      title_ta: "வயதுக்கேற்ற நிலைகள்",
      content: "Ages 7 to 9 (Starter) practise 1 habit per dimension with an adult guiding. Ages 10 to 11 (Builder) practise 3 per dimension with a tracker chart. Ages 12 to 14 (Master) manage all 7 per dimension on their own scoreboard.",
      content_ta: "7 முதல் 9 வயது (தொடக்கம்): பெரியவர் வழிகாட்டுதலுடன் ஒவ்வொரு பரிமாணத்திலும் 1 பழக்கம். 10 முதல் 11 வயது (கட்டமைப்பாளர்): கண்காணிப்பு அட்டவணையுடன் 3 பழக்கங்கள். 12 முதல் 14 வயது (தேர்ச்சியாளர்): சொந்த மதிப்பெண் பலகையுடன் அனைத்து 7 பழக்கங்களும்."
    },
    teacher: {
      title: "Running the 5×7 Habit Game",
      title_ta: "5×7 பழக்க விளையாட்டை நடத்துதல்",
      content: "Each habit is worth 10 points a day and the weekly score is scaled to 350. Check that each child has the right number of daily missions for their age level, and use the 8-week challenge calendar for class-wide focus weeks.",
      content_ta: "ஒவ்வொரு பழக்கமும் தினமும் 10 புள்ளிகள்; வாராந்திர மதிப்பெண் 350க்கு அளவிடப்படுகிறது. ஒவ்வொரு மாணவருக்கும் அவர்கள் வயது நிலைக்கேற்ற தினசரி பணிகள் உள்ளதா எனச் சரிபாருங்கள்; வகுப்பு முழுவதற்குமான கவன வாரங்களுக்கு 8-வார சவால் அட்டவணையைப் பயன்படுத்துங்கள்."
    }
  },
  BAT02: {
    parent: {
      title: "Supporting the 25-Week Journey",
      title_ta: "25-வாரப் பயணத்திற்கு ஆதரவு",
      content: "Every day your child practises the 5 Q Power habits, and each week one new growth habit is added. Ask about this week's new habit at dinner and help them keep it going: by Week 25 all 30 habits are part of daily life.",
      content_ta: "உங்கள் குழந்தை தினமும் 5 Q பவர் பழக்கங்களைப் பயிற்சி செய்கிறது; ஒவ்வொரு வாரமும் ஒரு புதிய வளர்ச்சிப் பழக்கம் சேர்கிறது. இரவு உணவின்போது இந்த வாரத்தின் புதிய பழக்கத்தைப் பற்றிக் கேளுங்கள்: 25-ஆம் வாரத்தில் அனைத்து 30 பழக்கங்களும் வாழ்க்கையின் பகுதியாகும்."
    },
    teacher: {
      title: "Q Power Workshop & Weekly Unlock",
      title_ta: "Q பவர் பயிலரங்கம் & வாராந்திரப் புதிய பழக்கம்",
      content: "Lead the 5 Q Power habits (Eye Ball Exercise, Speed Reading Card, Concentration Music, Blind Fold Practice, Power Affirmations) as a short daily activation. Introduce each week's new growth habit on Monday using its chapter, and review the 25-week roadmap in the app with the class.",
      content_ta: "5 Q பவர் பழக்கங்களை (கண் பயிற்சி, வேக வாசிப்பு அட்டை, கவன இசை, கண்கட்டு பயிற்சி, சக்தி உறுதிமொழிகள்) தினசரி சிறு செயல்படுத்தலாக நடத்துங்கள். ஒவ்வொரு வாரத்தின் புதிய வளர்ச்சிப் பழக்கத்தையும் திங்கள்கிழமை அதன் அத்தியாயத்துடன் அறிமுகப்படுத்தி, செயலியிலுள்ள 25-வார வரைபடத்தை வகுப்புடன் ஆய்வு செய்யுங்கள்."
    }
  }
};
