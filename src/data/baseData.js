// Source of truth: Habitopia 5x7 Habit Framework
export const DIMS = [
  { k: 'P', n: 'Physically Healthy', t: 'Body = First Classroom', e: '💪', slot: 'Morning', slot_ta: 'காலை', c: ['#059669', '#10B981'] },
  { k: 'M', n: 'Mentally Strong', t: 'Mind > Mood', e: '🧠', slot: 'Morning', slot_ta: 'காலை', c: ['#C2185B', '#D81B60'] },
  { k: 'I', n: 'Intellectually Sharp', t: 'Brain on Beast Mode', e: '📚', slot: 'School hours', slot_ta: 'பள்ளி நேரம்', c: ['#0891B2', '#06B6D4'] },
  { k: 'E', n: 'Emotionally Balanced', t: 'Heart with IQ', e: '💛', slot: 'Evening', slot_ta: 'மாலை', c: ['#E11D48', '#F43F5E'] },
  { k: 'F', n: 'Financially Wealthy', t: 'Money Smart Early', e: '🪙', slot: 'Evening', slot_ta: 'மாலை', c: ['#D97706', '#F59E0B'] },
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

export const AVATARS = ['🦁', '🐯', '🦊', '🐼', '🦄', '🐲', '🚀', '🤖'];

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
    title: 'Classroom Implementation',
    title_ta: 'வகுப்பறைச் செயல்பாடு',
    content: 'Start each morning with a 3-minute check-in: confirm posture, water first, and 3 priorities. Foster a “no-excuses” and growth mindset culture.',
    content_ta: 'ஒவ்வொரு காலையிலும் 3 நிமிடச் சரிபார்ப்புடன் தொடங்குங்கள்: நிமிர்ந்த அமர்வு, தண்ணீர் குடித்தல் மற்றும் 3 முன்னுரிமைகளை உறுதிப்படுத்துங்கள். வளர்ச்சி மனப்பான்மையை வளர்த்தெடுங்கள்.'
  },
  {
    title: 'Weekly Deep Dive & Teach to Learn',
    title_ta: 'வாராந்திர ஆழ்ந்த தேடல் & கற்பித்துக் கற்றல்',
    content: 'Pair students once a week for 10 minutes where each explains one concept they learned to their partner. This cements mastery and builds confidence.',
    content_ta: 'வாரத்திற்கு ஒருமுறை 10 நிமிடங்கள் மாணவர்களை இணையாக அமர்த்தி, தாங்கள் கற்ற ஒரு கருத்தை நண்பருக்கு விளக்கச் செய்யுங்கள். இது தெளிவையும் தன்னம்பிக்கையையும் வளர்க்கும்.'
  },
  {
    title: 'Evidence Collection & Recognition',
    title_ta: 'சான்று சேகரிப்பு & அங்கீகாரம்',
    content: 'Acknowledge children who master the 60% threshold. Display streak charts on classroom walls and award peer-nominated kindness & leadership badges.',
    content_ta: '60% தேர்ச்சி இலக்கை அடையும் மாணவர்களைப் பாராட்டுங்கள். வகுப்பறைச் சுவர்களில் தொடர் வெற்றிப் பட்டியலைக் காட்சிப்படுத்தி, அன்பு மற்றும் தலைமைத்துவப் பதக்கங்களை வழங்குங்கள்.'
  }
];
