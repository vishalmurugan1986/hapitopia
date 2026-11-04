// BAT02 Data Architecture & Curriculum Dataset
// Source of truth: C:\Users\vishalmurugan1986\Documents\BAT02.txt & BAT02_Architecture.txt
// 30 Habits: 5 Q Power Habits (Activation Workshop) + 25 Growth Dimension Habits (5 per dimension)
// 25-Week Curriculum Progression Architecture

export const DIMS_BAT02 = [
  { k: 'Q', n: 'Q Power Habits', t: 'Activation Workshop', e: '⚡', slot: 'Workshop', slot_ta: 'பயிலரங்கம்', c: ['#D97706', '#F59E0B'] },
  { k: 'P', n: 'Physically Healthy', t: 'A strong body builds a strong you', e: '💪', slot: 'Morning', slot_ta: 'காலை', c: ['#2E9D78', '#5DCAA5'] },
  { k: 'M', n: 'Mentally Strong', t: 'Train your mind, transform your life', e: '🧠', slot: 'Morning', slot_ta: 'காலை', c: ['#6C64B5', '#AFA9EC'] },
  { k: 'I', n: 'Intellectually Sharp', t: 'Feed your brain, expand your world', e: '📚', slot: 'School hours', slot_ta: 'பள்ளி நேரம்', c: ['#2D7FCD', '#85B7EB'] },
  { k: 'E', n: 'Emotionally Balanced', t: 'Master your emotions, live in harmony', e: '🛡️', slot: 'Evening', slot_ta: 'மாலை', c: ['#C94B73', '#ED93B1'] },
  { k: 'F', n: 'Financially Wealthy', t: 'Smart today, secured tomorrow', e: '🪙', slot: 'Evening', slot_ta: 'மாலை', c: ['#D4623C', '#F0997B'] },
];

export const HABITS_BAT02 = {
  Q: [
    ['Eye Ball Exercise', 'Vision speed, wide peripheral range, eye fatigue reset.'],
    ['Speed Reading Card', 'Rapid card scanning, chunk reading, zero subvocalization.'],
    ['Concentration Music', 'Alpha-frequency deep study soundtrack.'],
    ['Blind Fold Practice', 'Sensory enhancement, tactile precision, inner visualization.'],
    ['Power Affirmations (Habit Book)', 'Daily identity declaration of courage, resilience and success.']
  ],
  P: [
    ['Exposure to Sunlight & Do Warm Up Exercise', 'Morning sun for Vitamin D and circadian rhythm, dynamic joint mobility.'],
    ['Stay hydrated after brushing', 'Pure water immediately after morning brushing to cleanse and hydrate.'],
    ['Super brain yoga (21 max)', 'Ear-lobe acupressure squats up to 21 reps to synchronize brain hemispheres.'],
    ['Eat Fresh fruits and vegetables', 'Natural rainbow fresh fruits and veggies with daily meals.'],
    ['Dinner before 7:00 PM and Sleep at 10:00 PM', 'Early dinner window giving 3 hours before sleep for restorative rest.']
  ],
  M: [
    ['Visualize Your Future Self', 'Mentally rehearse tomorrow’s victories and long-term dream goals.'],
    ['Digital Boundaries', 'Intentional screen limits; no mindless scrolling; purposeful tech use.'],
    ['Journaling my Small Goals & Gratitude', 'Nightly 3-item gratitude log and top 3 tomorrow goals.'],
    ['My Warrier Journey', 'Embrace challenges as character training; rise stronger from failure.'],
    ['Clean workplace rituals (Make my bed / Keep studyplace clean / Get your bag ready)', 'Tidy bedroom, pristine desk, bag packed the night before.']
  ],
  I: [
    ['Practice 5 Random Brain Gym Exercise', 'Cross-crawl, double doodle, hook-ups to stimulate neural connections.'],
    ['Curiosity Questioning', 'Ask 5 “why” and “how” questions about the world every day.'],
    ['Memory Play (Words, Peg Words) Apply on studies', 'Use peg-word system and vivid visualization for academic memory.'],
    ['Brain teasers (Rubik’s Cube, Riddle, Sudoku, Puzzle)', 'Solve 1 brain teaser, Sudoku puzzle, or Rubik pattern daily.'],
    ['Memory Recall Exercise', 'Recall key concepts at the end of each study block without notes.']
  ],
  E: [
    ['Active Appreciation', 'Speak sincere words of appreciation to parents, teachers, or friends daily.'],
    ['Daily Kind Act', 'Perform one secret or selfless helpful deed with zero expectation.'],
    ['Family connect or Quality Sharing time (At dinner time without mobiles)', '15 minutes of uninterrupted, screen-free family conversation at dinner.'],
    ['Sorry fast, Forgive faster', 'Apologize within 60 seconds when wrong; drop grudges instantly.'],
    ['Pause button (S-R-R: Stimuli -> Reflection -> React)', 'Take 3 deep breaths: Stimuli -> Reflection -> Conscious Response.']
  ],
  F: [
    ['Goal Piggy (Delayed Gratification)', 'Save coins toward one meaningful dream goal; delay impulse purchases.'],
    ['Price Detective', 'Compare prices across stores and check unit values before purchasing.'],
    ['Need vs Want', 'Ask twice: “Is this an essential Need or a temporary Want?”'],
    ['3 Jar Allocation System (Save: 50%, Spend: 40%, Give: 10%)', 'Split every rupee received into 50% Save, 40% Spend, 10% Give.'],
    ['Learning Money Concept', 'Learn how value is created, how banking works, and why money compounds.']
  ]
};

// 25-Week Curriculum Progression Architecture (from BAT02_Architecture.txt)
export const BAT02_WEEKLY_ADDITIONS = [
  { week: 1, id: 'B2_P0', dimKey: 'P', habitIndex: 0, name: 'Exposure to Sunlight & Do Warm Up Exercise' },
  { week: 2, id: 'B2_M0', dimKey: 'M', habitIndex: 0, name: 'Visualize Your Future Self' },
  { week: 3, id: 'B2_I0', dimKey: 'I', habitIndex: 0, name: 'Practice 5 Random Brain Gym Exercise' },
  { week: 4, id: 'B2_E0', dimKey: 'E', habitIndex: 0, name: 'Active Appreciation' },
  { week: 5, id: 'B2_F0', dimKey: 'F', habitIndex: 0, name: 'Goal Piggy (Delayed Gratification)' },
  { week: 6, id: 'B2_P1', dimKey: 'P', habitIndex: 1, name: 'Stay hydrated after brushing' },
  { week: 7, id: 'B2_M1', dimKey: 'M', habitIndex: 1, name: 'Digital Boundaries' },
  { week: 8, id: 'B2_I1', dimKey: 'I', habitIndex: 1, name: 'Curiosity Questioning' },
  { week: 9, id: 'B2_E1', dimKey: 'E', habitIndex: 1, name: 'Daily Kind Act' },
  { week: 10, id: 'B2_F1', dimKey: 'F', habitIndex: 1, name: 'Price Detective' },
  { week: 11, id: 'B2_P2', dimKey: 'P', habitIndex: 2, name: 'Super brain yoga (21 max)' },
  { week: 12, id: 'B2_M2', dimKey: 'M', habitIndex: 2, name: 'Journaling my Small Goals & Gratitude' },
  { week: 13, id: 'B2_I2', dimKey: 'I', habitIndex: 2, name: 'Memory Play (Words, Peg Words / Apply on studies)' },
  { week: 14, id: 'B2_E2', dimKey: 'E', habitIndex: 2, name: 'Family connect or Quality Sharing time (At dinner time without mobiles)' },
  { week: 15, id: 'B2_F2', dimKey: 'F', habitIndex: 2, name: 'Need vs Want' },
  { week: 16, id: 'B2_P3', dimKey: 'P', habitIndex: 3, name: 'Eat Fresh fruits and vegetables' },
  { week: 17, id: 'B2_M3', dimKey: 'M', habitIndex: 3, name: 'My Warrier Journey' },
  { week: 18, id: 'B2_I3', dimKey: 'I', habitIndex: 3, name: 'Brain teasers (Rubik\'s Cube, Riddle, Sudoku, Puzzle)' },
  { week: 19, id: 'B2_E3', dimKey: 'E', habitIndex: 3, name: 'Sorry fast, Forgive faster' },
  { week: 20, id: 'B2_F3', dimKey: 'F', habitIndex: 3, name: '3 Jar Allocation System (Save: 50%, Spend: 40%, Give: 10%)' },
  { week: 21, id: 'B2_P4', dimKey: 'P', habitIndex: 4, name: 'Dinner before 7:00 PM and Sleep at 10:00 PM' },
  { week: 22, id: 'B2_M4', dimKey: 'M', habitIndex: 4, name: 'Clean workplace rituals (Make my bed / Keep studyplace clean / Get your bag ready)' },
  { week: 23, id: 'B2_I4', dimKey: 'I', habitIndex: 4, name: 'Memory Recall Exercise' },
  { week: 24, id: 'B2_E4', dimKey: 'E', habitIndex: 4, name: 'Pause button (S-R-R: Stimuli -> Reflection -> React)' },
  { week: 25, id: 'B2_F4', dimKey: 'F', habitIndex: 4, name: 'Learning Money Concept' }
];

// Complete Pedagogical Curriculum Chapters for All 30 Habits in BAT02
export const BAT02_HABIT_CHAPTERS = {
  // ==========================================
  // Q POWER HABITS (Activation Workshop)
  // ==========================================
  B2_Q0: {
    id: 'B2_Q0', dim: 'Q',
    en: {
      name: 'Eye Ball Exercise',
      tagline: 'Vision speed, wide peripheral range, eye fatigue reset.',
      whyItMatters: 'Eye tracking exercises stretch and strengthen the six extraocular muscles. This widens peripheral vision, boosts reading speed by over 40%, and shields eyes from digital strain.',
      story: 'Aditi noticed her eyes grew tired after 15 minutes of reading textbook chapters. During the activation workshop, she practiced 8-figure rotations and lateral focus shifts. Within three weeks, her reading span doubled with zero eye strain.',
      dailyPractice: 'Spend 3 minutes doing smooth horizontal, vertical, diagonal, and infinity-loop eye movements followed by warm palm relaxation.',
      weeklyChallenge: 'Practice eye ball stretches twice daily for 5 continuous days and log the difference in reading comfort.',
      monthlyMission: 'Master a full 180-degree peripheral vision scan while holding focus on a center point.',
      reflectionQuestions: ['How relaxed do your eyes feel after palming?', 'Did reading small text become easier?'],
      parentQuestions: ['Can we do a 2-minute family eye relaxation break during evening screen time?'],
      teacherQuestions: ['Can we lead a 60-second eye exercise before students begin silent reading?'],
      rubric: {
        beginner: 'Practices only when guided in workshop.',
        developing: 'Performs eye exercises 2-3 times a week with reminders.',
        proficient: 'Routinely exercises eyes daily before studying.',
        master: 'Effortlessly executes eye stretches and shares palming technique with peers.'
      }
    },
    ta: {
      name: 'கண் கருவிழி உடற்பயிற்சி',
      tagline: 'பார்வை வேகம், விரிந்த பக்கவாட்டு பார்வை, கண் சோர்வு நீக்கம்.',
      whyItMatters: 'கண் தசைப் பயிற்சிகள் பார்வை வேகத்தை 40% அதிகரிக்கின்றன. டிஜிட்டல் திரைகளால் ஏற்படும் கண் எரிச்சலைத் தடுத்து கவனத்தை கூர்மையாக்குகின்றன.',
      story: 'அதிதி புத்தகம் படிக்கும்போது அடிக்கடி கண் சோர்வு அடைந்தாள். பயிலரங்கில் 8-வடிவ சுழற்சி மற்றும் கண் அசைவுப் பயிற்சிகளைத் தினமும் செய்யத் தொடங்கினாள். சில வாரங்களில் கண் சோர்வு நீங்கி, வேகமாகப் படிக்கத் தொடங்கினாள்!',
      dailyPractice: 'தினமும் 3 நிமிடங்கள் பக்கவாட்டு, மேல்-கீழ் மற்றும் வட்ட வடிவ கண் அசைவுப் பயிற்சிகளைச் செய்து உள்ளங்கையால் கண்களை ஒத்தடம் கொடு.',
      weeklyChallenge: 'இந்த வாரத்தின் 5 நாட்கள் தொடர்ந்து காலை மற்றும் மாலை வேளைகளில் கண் பயிற்சி செய்.',
      monthlyMission: 'மையப் புள்ளியைப் பார்த்தவாறே 180-பாகை பக்கவாட்டுப் பொருள்களைக் கவனிக்கும் ஆற்றலை வளர்த்துக்கொள்.',
      reflectionQuestions: ['கண் பயிற்சி செய்த பிறகு கண்கள் எவ்வளவு புத்துணர்ச்சியாக உணர்கின்றன?', 'வாசிப்பு வேகம் கூடியுள்ளதா?'],
      parentQuestions: ['மாலையில் குடும்பத்தோடு 2 நிமிட கண் தளர்வுப் பயிற்சி செய்யலாமா?'],
      teacherQuestions: ['வகுப்பில் வாசிப்புப் பகுதி தொடங்கும் முன் 1 நிமிட கண் பயிற்சி அளிக்கலாமா?'],
      rubric: {
        beginner: 'வழிகாட்டும் போது மட்டுமே கண் பயிற்சி செய்கிறார்.',
        developing: 'வாரத்தில் 2-3 நாட்கள் நினைவூட்டலுடன் செய்கிறார்.',
        proficient: 'தானாகவே தினமும் படிப்பதற்கு முன் கண் பயிற்சி செய்கிறார்.',
        master: 'கண் தசைப் பயிற்சிகளைத் துல்லியமாகச் செய்து மற்றவர்க்கும் கற்றுத் தருகிறார்.'
      }
    }
  },

  B2_Q1: {
    id: 'B2_Q1', dim: 'Q',
    en: {
      name: 'Speed Reading Card',
      tagline: 'Rapid card scanning, chunk reading, zero subvocalization.',
      whyItMatters: 'Using a speed reading pacer card trains your brain to absorb 3 to 4 words per glance rather than word-by-word reading, cutting study time in half while improving retention.',
      story: 'Sanjay spent hours memorizing single pages because he read every syllable in his head. When he adopted the guide card technique to pull his gaze forward, he completed his science chapter in just 20 minutes with high recall.',
      dailyPractice: 'Use a blank white index card to guide your eyes down the page at a steady, rhythmic pace for 10 minutes.',
      weeklyChallenge: 'Measure and increase your words-per-minute speed by 25% over 7 days using the card pacer.',
      monthlyMission: 'Finish an entire storybook or chapter book using speed reading pacing cards.',
      reflectionQuestions: ['Did your eyes learn to move smoother without stopping on every word?', 'Which reading speed felt most comfortable?'],
      parentQuestions: ['Do we have plain cards or bookmarks available near the child’s study desk?'],
      teacherQuestions: ['Can we run a 5-minute speed card scanning challenge in the classroom?'],
      rubric: {
        beginner: 'Reads slowly word by word without using a pacer.',
        developing: 'Uses the speed card occasionally with verbal prompting.',
        proficient: 'Consistently uses a card pacer to read smoothly and quickly.',
        master: 'Reads in wide word chunks and teaches friends how to use speed pacers.'
      }
    },
    ta: {
      name: 'வேக வாசிப்பு அட்டை',
      tagline: 'விரைவான அட்டை வாசிப்பு, சொல் தொகுப்பு வாசிப்பு, வாய்மொழி இல்லா வேகம்.',
      whyItMatters: 'வேக வாசிப்பு அட்டை மூளையை ஒரே பார்வையில் 3-4 சொற்களைப் படிக்கப் பழக்குகிறது. இது படிக்கும் நேரத்தைக் குறைத்து நினைவாற்றலை உயர்த்துகிறது.',
      story: 'சஞ்சய் ஒவ்வொரு சொல்லையும் மனதிற்குள் மெதுவாக உச்சரித்துப் படித்தான். வேக வாசிப்பு அட்டையைப் பயன்படுத்தி கண்களை முன்னோக்கி நகர்த்திப் பழகியதும், ஒரு முழு அறிவியல் பாடத்தை 20 நிமிடங்களில் படித்து முடித்தான்!',
      dailyPractice: 'வெள்ளை அட்டையைப் பயன்படுத்தி தினமும் 10 நிமிடங்கள் சீரான வேகத்தில் புத்தக வரிகளை வாசி.',
      weeklyChallenge: '7 நாட்களில் வாசிப்பு வேகத்தை 25% உயர்த்தி சோதித்துப் பார்.',
      monthlyMission: 'ஒரு முழு கதைப் புத்தகத்தை வேக வாசிப்பு அட்டை மூலம் படித்து முடி.',
      reflectionQuestions: ['சொற்களைத் தொகுப்பாகப் படிக்கும்போது வாசிப்பு எளிதாக இருந்ததா?', 'உன் வாசிப்பு வேகம் கூடியுள்ளதா?'],
      parentQuestions: ['படிக்கும் மேசையில் வேக வாசிப்பு அட்டைகள் தயாராக வைக்கப்பட்டுள்ளதா?'],
      teacherQuestions: ['வகுப்பறையில் 5 நிமிட வேக வாசிப்புப் பயிற்சியை முன்னெடுக்கலாமா?'],
      rubric: {
        beginner: 'ஒவ்வொரு சொல்லாக மெதுவாகப் படிக்கிறார்.',
        developing: 'நினைவூட்டும்போது மட்டும் அட்டையைப் பயன்படுத்திப் படிக்கிறார்.',
        proficient: 'தானாகவே அட்டையைப் பயன்படுத்தி வேகமாகப் படிக்கிறார்.',
        master: 'சொல் தொகுப்புகளாகப் படித்து மற்றவர்க்கும் வழிகாட்டுகிறார்.'
      }
    }
  },

  B2_Q2: {
    id: 'B2_Q2', dim: 'Q',
    en: {
      name: 'Concentration Music',
      tagline: 'Alpha-frequency deep study soundtrack.',
      whyItMatters: 'Binaural beats and 60 BPM alpha-frequency instrumental music shift brainwaves from frantic beta to calm alpha state (8-12 Hz), allowing deep flow without distraction.',
      story: 'Kiran was easily distracted by background chatter while studying. Listening to gentle 60 BPM classical and concentration frequencies created an auditory cocoon where he completed difficult math problems in absolute stillness.',
      dailyPractice: 'Play 15 to 20 minutes of calming alpha-frequency or 60 BPM instrumental music during homework or focused reading.',
      weeklyChallenge: 'Study with concentration music across 5 study sessions and note your focus duration.',
      monthlyMission: 'Build your personal focus playlist of lyric-free ambient and classical pieces.',
      reflectionQuestions: ['Did the background music help block outside noise?', 'How calm was your mind while working?'],
      parentQuestions: ['Can we provide a quiet speaker or safe headphones for focus study blocks?'],
      teacherQuestions: ['Can we play gentle ambient focus frequencies during classroom independent work?'],
      rubric: {
        beginner: 'Easily distracted by external noises and leaves desk.',
        developing: 'Focuses well with background audio when reminded.',
        proficient: 'Proactively switches on concentration music for study sessions.',
        master: 'Enters deep focus flow effortlessly and maintains calm concentration.'
      }
    },
    ta: {
      name: 'கவனக் குவிப்பு இசை',
      tagline: 'ஆல்ஃபா அலைவரிசை ஆழ்ந்த படிப்பு இசை பின்னணி.',
      whyItMatters: '60 பி.பி.எம் ஆல்ஃபா அலைவரிசை இசை மூளையை அமைதிப்படுத்தி ஆழ்ந்த கவன நிலைக்கு (8-12 ஹெர்ட்ஸ்) கொண்டுசெல்கிறது. சிதறல்களை நீக்கி படிப்பில் ஆழ்ந்த ஈடுபாட்டைத் தருகிறது.',
      story: 'கிரண் படிக்கும் போது சுற்றியுள்ள சத்தங்களால் எளிதில் கவனம் இழந்தான். பாடல்கள் இல்லாத ஆல்ஃபா இசையைக் கேட்டவாறு கணக்குகளைச் செய்தபோது, எவ்வித கவனச்சிதறலும் இன்றி விரைவாக முடித்தான்!',
      dailyPractice: 'படிக்கும் போது 15-20 நிமிடங்கள் மென்மையான ஆல்ஃபா அலைவரிசை அல்லது அமைதியான இசையைக் கேள்.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 படிப்பு அமர்வுகளில் கவனக் குவிப்பு இசையைப் பயன்படுத்திப் பார்.',
      monthlyMission: 'உனக்குப் பிடித்த கவனக் குவிப்பு இசைக் கோவையை உருவாக்கிப் பயன்படுத்து.',
      reflectionQuestions: ['இசை கேட்டபோது வெளிச் சத்தங்கள் குறைந்ததா?', 'மனம் எவ்வளவு அமைதியாக இருந்தது?'],
      parentQuestions: ['குழந்தை படிக்கும் போது அமைதியான பின்னணி இசையை ஏற்பாடு செய்யலாமா?'],
      teacherQuestions: ['மாணவர்கள் சுயமாக எழுதும் போது மென்மையான கவன இசையை ஒலிக்கவிடலாமா?'],
      rubric: {
        beginner: 'வெளிச் சத்தங்களால் எளிதில் கவனச்சிதறல் அடைகிறார்.',
        developing: 'நினைவூட்டும்போது இசையுடன் படிக்கிறார்.',
        proficient: 'தானாகவே கவனக் குவிப்பு இசையைப் பயன்படுத்தி ஆழ்ந்து படிக்கிறார்.',
        master: 'நீண்ட நேரம் முழு கவனத்துடன் படித்து தேர்ச்சி பெறுகிறார்.'
      }
    }
  },

  B2_Q3: {
    id: 'B2_Q3', dim: 'Q',
    en: {
      name: 'Blind Fold Practice',
      tagline: 'Sensory enhancement, tactile precision, inner visualization.',
      whyItMatters: 'Temporarily taking away sight forces the brain to supercharge hearing, touch, spatial memory, and internal visualization, activating right-brain neuroplasticity.',
      story: 'Rohan wore a soft blindfold and learned to identify geometric shapes, coins, and textures with his fingertips. Soon, his mental 3D spatial ability in geometry and science class skyrocketed!',
      dailyPractice: 'Spend 5 minutes blindfolded identifying objects, sorting tokens, or navigating a safe room path using touch and sound.',
      weeklyChallenge: 'Identify 10 household items purely by tactile feel and sound while blindfolded.',
      monthlyMission: 'Solve a tactile puzzle or rubik side entirely with your eyes closed.',
      reflectionQuestions: ['What senses became sharper when your eyes were closed?', 'How clear was your internal mental picture?'],
      parentQuestions: ['Can we create a safe blindfold touch-and-guess game at home?'],
      teacherQuestions: ['How can blindfold tactile games boost sensory integration in science class?'],
      rubric: {
        beginner: 'Hesitant to close eyes or keep blindfold on.',
        developing: 'Completes 3-minute blindfold games with encouragement.',
        proficient: 'Confidently identifies objects and maps mental space while blindfolded.',
        master: 'Demonstrates exceptional tactile memory and spatial intuition.'
      }
    },
    ta: {
      name: 'கண்கட்டுப் பயிற்சி',
      tagline: 'புலன் கூர்மை, தொடு உணர்வுத் துல்லியம், உள் மனக் காட்சிப்படுத்துதல்.',
      whyItMatters: 'கண்களை மூடும்போது தொடுதல், கேட்டல் மற்றும் நினைவாற்றல் பல மடங்கு கூர்மையாகின்றன. இது வலது மூளையின் காட்சிப்படுத்தும் ஆற்றலை வளர்க்கிறது.',
      story: 'ரோஹன் கண்களைக் கட்டிக்கொண்டு நாணயங்கள் மற்றும் வடிவங்களைத் தொட்டுணர்ந்து சரியாக அடையாளம் கண்டான். இது அவனது வடிவியல் (Geometry) மற்றும் அறிவியல் சிந்தனையை வியக்கத்தக்க வகையில் உயர்த்தியது!',
      dailyPractice: 'தினமும் 5 நிமிடங்கள் கண்களை மென்மையான துணியால் கட்டி, தொடு உணர்வு மற்றும் ஒலி மூலம் பொருட்களை அடையாளம் காண்.',
      weeklyChallenge: 'கண்கட்டோடு 10 வீட்டுப் பொருட்களைத் தொட்டுப் பார்த்துச் சரியாகக் கண்டுபிடி.',
      monthlyMission: 'கண்களை மூடியவாறே ஒரு புதிரை தொடு உணர்வின் மூலம் விடுவிக்க முயற்சி செய்.',
      reflectionQuestions: ['கண்களை மூடியபோது தொடு உணர்வும் கேட்கும் திறனும் எப்படி கூர்மையானது?', 'மனதில் படங்கள் துல்லியமாகத் தெரிந்ததா?'],
      parentQuestions: ['பாதுகாப்பான முறையில் கண்கட்டு விளையாட்டுக்களை வீட்டில் விளையாடலாமா?'],
      teacherQuestions: ['வகுப்பறையில் புலன் கூர்மைப்படுத்தும் விளையாட்டுகளை நடத்தலாமா?'],
      rubric: {
        beginner: 'கண்களை மூடத் தயங்குகிறார்.',
        developing: 'ஆதரவுடன் 3 நிமிடங்கள் பயிற்சி செய்கிறார்.',
        proficient: 'கண்கட்டோடு பொருட்களைத் துல்லியமாக அடையாளம் காண்கிறார்.',
        master: 'சிறந்த தொடு உணர்வு மற்றும் உள் மனக் காட்சிப்படுத்தும் திறனைக் கொண்டுள்ளார்.'
      }
    }
  },

  B2_Q4: {
    id: 'B2_Q4', dim: 'Q',
    en: {
      name: 'Power Affirmations (Habit Book)',
      tagline: 'Daily identity declaration of courage, resilience and success.',
      whyItMatters: 'Speaking positive first-person affirmations rewires neural pathways, dissolves subconscious self-doubt, and builds unshakeable courage for tests and challenges.',
      story: 'Pooja used to panic before exams saying “I am going to forget everything.” She wrote in her Habit Book: “I am calm, focused, and my memory is sharp.” Repeating it daily transformed her test anxiety into calm confidence.',
      dailyPractice: 'Stand tall with shoulders back and speak aloud your 3 power affirmations from your Habit Book each morning and evening.',
      weeklyChallenge: 'Recite power affirmations with genuine emotion 7 mornings in a row.',
      monthlyMission: 'Write a full page of identity affirmations for your future self in your Habit Book.',
      reflectionQuestions: ['How does your posture change when speaking power affirmations?', 'Which phrase gave you the most confidence?'],
      parentQuestions: ['Can we share morning family power affirmations before heading to school?'],
      teacherQuestions: ['Can students start the morning assembly with empowering growth mindset affirmations?'],
      rubric: {
        beginner: 'Mutters affirmations timidly or forgets them.',
        developing: 'Recites affirmations when reminded by parents.',
        proficient: 'Speaks power affirmations daily with energy and conviction.',
        master: 'Radiates self-belief and encourages peers with positive words.'
      }
    },
    ta: {
      name: 'சக்தி வாய்ந்த உறுதிமொழிகள்',
      tagline: 'துணிவு, மீள்திறன் மற்றும் வெற்றிக்கான தினசரி உறுதிமொழி பிரகடனம்.',
      whyItMatters: 'நேர்மறையான உறுதிமொழிகளைத் தினமும் உரக்கக் கூறுவது மன பயத்தை நீக்கி, நரம்பியல் பாதைகளை வெற்றிக்காக மாற்றியமைக்கிறது.',
      story: 'பூஜா தேர்வுக்கு முன் "எனக்கு மறந்துவிடும்" என்று பயப்படுவாள். தனது பழக்கக் குறிப்பேட்டில் "நான் அமைதியானவன், என் நினைவாற்றல் கூர்மையானது" என்று எழுதித் தினமும் சொன்னாள். அவளது தேர்வு பயம் மறைந்து முதல் மதிப்பெண் பெற்றாள்!',
      dailyPractice: 'தினமும் காலையிலும் மாலையிலும் நிமிர்ந்து நின்று உனது 3 உறுதிமொழிகளை உரக்கச் சொல்.',
      weeklyChallenge: '7 நாட்களும் தவறாமல் காலையில் முழு உணர்வுடன் உறுதிமொழிகளைப் பிரகடனம் செய்.',
      monthlyMission: 'உனது எதிர்கால இலக்குக்கான முழு பக்க உறுதிமொழிகளை எழுதிப் பழகு.',
      reflectionQuestions: ['உறுதிமொழிகளை உரக்கச் சொன்ன பிறகு மன தைரியம் கூடியதா?', 'உனக்குப் பிடித்த வாக்கியம் எது?'],
      parentQuestions: ['காலையில் குடும்பமாக நேர்மறை உறுதிமொழிகளைப் பகிர்ந்துகொள்ளலாமா?'],
      teacherQuestions: ['காலை வழிபாட்டுக் கூட்டத்தில் ஊக்கமளிக்கும் உறுதிமொழிகளை மாணவர்களோடு கூறலாமா?'],
      rubric: {
        beginner: 'உறுதிமொழிகளை மெல்லிய குரலில் தயங்கிச் சொல்கிறார்.',
        developing: 'நினைவூட்டும்போது ஆர்வத்துடன் கூறுகிறார்.',
        proficient: 'தானாகவே கம்பீரமாக தினசரி உறுதிமொழிகளைப் பிரகடனம் செய்கிறார்.',
        master: 'உறுதியான தன்னம்பிக்கையுடன் செயல்பட்டு மற்றவர்க்கும் ஊக்கமளிக்கிறார்.'
      }
    }
  },

  // ==========================================
  // 1. PHYSICALLY HEALTHY
  // ==========================================
  B2_P0: {
    id: 'B2_P0', dim: 'P',
    en: {
      name: 'Exposure to Sunlight & Do Warm Up Exercise',
      tagline: 'Morning sun for Vitamin D and circadian rhythm, dynamic joint mobility.',
      whyItMatters: 'Morning sunlight entering the eyes sets your master circadian clock, triggers Vitamin D synthesis, boosts serotonin, and morning dynamic stretches activate blood circulation to the brain.',
      story: 'Arjun woke up sluggish every school morning. His PE teacher suggested 10 minutes of morning sunlight while doing arm circles, knee raises, and gentle jumping jacks. Within a week, his morning lethargy was replaced by radiant energy!',
      dailyPractice: 'Spend 10 minutes outdoors in morning sunlight doing gentle warm-up mobility movements (neck rolls, arm circles, squats, torso twists).',
      weeklyChallenge: 'Catch morning sunlight and do warm-ups on 6 out of 7 days this week.',
      monthlyMission: 'Establish an unbroken 30-day streak of greeting the morning sun with dynamic stretches.',
      reflectionQuestions: ['How did the morning sunshine feel on your skin?', 'Did your muscles feel loose and ready for the day?'],
      parentQuestions: ['Can we join our child for a 10-minute morning balcony or garden warm-up?'],
      teacherQuestions: ['Can we hold morning assembly in open sunlight with dynamic stretching?'],
      rubric: {
        beginner: 'Stays indoors in dark rooms until leaving for school.',
        developing: 'Steps into sunlight when prompted by parents.',
        proficient: 'Proactively does 10 minutes of morning sun warm-ups daily.',
        master: 'Leads family or friends in morning sunlight mobility routines.'
      }
    },
    ta: {
      name: 'காலை சூரிய ஒளி & உடற்பயிற்சி',
      tagline: 'வைட்டமின் டி, சீரான தூக்க சுழற்சி, மூட்டு அசைவுப் பயிற்சிகள்.',
      whyItMatters: 'காலை இளவெயில் உடலுக்குத் தேவையான வைட்டமின் டி மற்றும் செரடோனின் ஹார்மோனைத் தருகிறது. உடற்பயிற்சி மூளைக்கு ரத்த ஓட்டத்தை அதிகரித்து சுறுசுறுப்பாக்குகிறது.',
      story: 'அர்ஜுன் காலையில் எழும்போது சோர்வாக இருப்பான். தினமும் 10 நிமிடங்கள் காலை வெயிலில் கைகள், கால்களை அசைத்து வார்ம்-அப் செய்யத் தொடங்கியதும் அவனது சோம்பல் நீங்கி புத்துணர்ச்சி பெற்றான்!',
      dailyPractice: 'காலையில் 10 நிமிடங்கள் திறந்த வெளியில் இளவெயிலில் நின்று எளிய உடற்பயிற்சிகளைச் செய்.',
      weeklyChallenge: 'இந்த வாரத்தின் 6 நாட்கள் தவறாமல் காலை வெயிலில் பயிற்சி செய்.',
      monthlyMission: 'தொடர்ந்து 30 நாட்கள் காலை சூரிய ஒளியை வரவேற்று உடற்பயிற்சியைப் பதிவு செய்.',
      reflectionQuestions: ['வெயிலில் நின்ற பிறகு உடல் எவ்வளவு சுறுசுறுப்பானது?', 'எந்த வார்ம்-அப் பயிற்சி உனக்குப் பிடித்திருந்தது?'],
      parentQuestions: ['காலை வேளையில் குழந்தையோடு சேர்ந்து பால்கனியில் எளிய உடற்பயிற்சி செய்யலாமா?'],
      teacherQuestions: ['காலை வழிபாட்டுக் கூட்டத்தில் சூரிய ஒளியில் எளிய உடற்பயிற்சிகளை முன்னெடுக்கலாமா?'],
      rubric: {
        beginner: 'காலையில் வெளியில் வரத் தயங்குகிறார்.',
        developing: 'பெற்றோர் அழைத்தால் மட்டும் வெயிலில் உடற்பயிற்சி செய்கிறார்.',
        proficient: 'தானாகவே தினமும் 10 நிமிடங்கள் காலை வெயிலில் பயிற்சி செய்கிறார்.',
        master: 'குடும்பத்தினரையும் சேர்த்துக்கொண்டு காலை உடற்பயிற்சியில் தலைமை தாங்குகிறார்.'
      }
    }
  },

  B2_P1: {
    id: 'B2_P1', dim: 'P',
    en: {
      name: 'Stay hydrated after brushing',
      tagline: 'Pure water immediately after morning brushing to cleanse and hydrate.',
      whyItMatters: 'After overnight fasting, your organs need hydration. Drinking clean water right after brushing flushes nighttime metabolic waste and awakens digestion.',
      story: 'Kavya often skipped water until lunchtime, causing fatigue and headaches. She placed a fresh brass cup on the sink and drank two full cups right after brushing. Her focus during early school periods jumped dramatically.',
      dailyPractice: 'Drink 1-2 glasses of pure room-temperature water immediately after brushing your teeth each morning.',
      weeklyChallenge: 'Complete hydration after brushing 7 days in a row without missing.',
      monthlyMission: 'Track daily hydration volume and ensure you drink water before breakfast all month.',
      reflectionQuestions: ['How refreshing did the water feel in your mouth and throat?', 'Did you notice higher morning energy?'],
      parentQuestions: ['Is fresh drinking water conveniently placed near the bathroom for easy morning access?'],
      teacherQuestions: ['Do we remind students to hydrate during morning roll-call?'],
      rubric: {
        beginner: 'Forgets to drink water and skips to sweet beverages.',
        developing: 'Drinks water after brushing when reminded.',
        proficient: 'Independently drinks 2 glasses of pure water right after brushing.',
        master: 'Champions hydration at home and encourages siblings to drink water first.'
      }
    },
    ta: {
      name: 'பல் துலக்கியதும் தண்ணீர் குடித்தல்',
      tagline: 'பல் துலக்கியவுடன் தூய தண்ணீர் குடித்து உடலை நீரேற்றம் செய்தல்.',
      whyItMatters: 'இரவு தூக்கத்திற்குப் பிறகு உறுப்புகள் நீரிழப்புடன் இருக்கும். பல் துலக்கியதும் தண்ணீர் குடிப்பது கழிவுகளை வெளியேற்றி செரிமானத்தைத் தூண்டுகிறது.',
      story: 'காவ்யா மதியம் வரை தண்ணீர் குடிக்காமல் இருப்பதால் தலைவலி வந்தது. பல் துலக்கியவுடன் 2 டம்ளர் தண்ணீர் குடிக்கும் பழக்கத்தை மேற்கொண்டதும் தலைவலி நீங்கி சுறுசுறுப்பானாள்!',
      dailyPractice: 'தினமும் காலையில் பல் துலக்கிய உடனே 1-2 டம்ளர் தூய தண்ணீர் குடி.',
      weeklyChallenge: 'இந்த வாரத்தின் 7 நாட்களும் தவறாமல் பல் துலக்கியதும் தண்ணீர் குடி.',
      monthlyMission: 'மாதம் முழுவதும் காலை உணவுக்கு முன் தண்ணீர் குடிக்கும் பழக்கத்தை நிலைநிறுத்து.',
      reflectionQuestions: ['தண்ணீர் குடித்த பிறகு வயிற்றில் என்ன புத்துணர்ச்சி தெரிந்தது?', 'காலையில் தலைவலி குறைந்ததா?'],
      parentQuestions: ['பல் துலக்கும் இடத்திற்கு அருகில் சுத்தமான குடிநீர் வைக்கப்பட்டுள்ளதா?'],
      teacherQuestions: ['காலை வகுப்பில் மாணவர்கள் தண்ணீர் குடிப்பதை உறுதிசெய்கிறோமா?'],
      rubric: {
        beginner: 'நினைவூட்டினாலும் தண்ணீர் குடிக்க மறுக்கிறார்.',
        developing: 'பெற்றோர் நினைவூட்டும்போது தண்ணீர் குடிக்கிறார்.',
        proficient: 'சுயமாக பல் துலக்கியவுடன் 2 டம்ளர் தண்ணீர் குடிக்கிறார்.',
        master: 'தண்ணீர் குடிக்கும் பழக்கத்தை நிலைநிறுத்தி மற்றவர்க்கும் முன்மாதிரியாக இருக்கிறார்.'
      }
    }
  },

  B2_P2: {
    id: 'B2_P2', dim: 'P',
    en: {
      name: 'Super brain yoga (21 max)',
      tagline: 'Ear-lobe acupressure squats up to 21 reps to synchronize brain hemispheres.',
      whyItMatters: 'Super Brain Yoga (Thoppukaranam) presses vital acupuncture points on the earlobes while squatting, balancing left-right brain activity and enhancing concentration.',
      story: 'Vikram struggled with mental fatigue while doing math homework. His grandfather taught him Super Brain Yoga with tongue against the palate. Doing 21 squats daily sharpened his memory and brought calm focus to his studies.',
      dailyPractice: 'Hold your left earlobe with right hand and right earlobe with left hand, breathe in while squatting down, breathe out while standing up. Do up to 21 reps.',
      weeklyChallenge: 'Practice 21 Super Brain Yoga squats daily for 5 days this week.',
      monthlyMission: 'Maintain correct breathing posture and master 21 squats smoothly for 30 consecutive days.',
      reflectionQuestions: ['Did you feel a warm flow of energy in your head after the squats?', 'Was your focus sharper afterwards?'],
      parentQuestions: ['Can we practice traditional Thoppukaranam as a family fitness game?'],
      teacherQuestions: ['Can we do 7-14 Super Brain Yoga squats before an exam or math session?'],
      rubric: {
        beginner: 'Hesitant or uses incorrect arm crossing technique.',
        developing: 'Performs 10-14 squats with verbal reminders.',
        proficient: 'Performs 21 squats smoothly with proper breathing daily.',
        master: 'Executes perfect form independently and explains the science to others.'
      }
    },
    ta: {
      name: 'சூப்பர் பிரைன் யோகா (தோப்புக்கரணம்)',
      tagline: 'மூளைப் பகுதிகளை இணைக்கும் 21 முறை காது பிடித்து அமர்ந்து எழும் தோப்புக்கரணம்.',
      whyItMatters: 'காது மடல்களைப் பிடித்து தோப்புக்கரணம் போடுவது மூளையின் இரு துருவங்களையும் இணைத்து நரம்பியல் ஆற்றலைத் தூண்டுகிறது. நினைவாற்றலையும் கவனத்தையும் பெருமளவில் உயர்த்துகிறது.',
      story: 'விக்ரம் கணிதப் பாடம் படிக்கும் போது எளிதில் சோர்ந்துபோனான். அவனது தாத்தா தினமும் 21 முறை தோப்புக்கரணம் போடக் கற்றுக்கொடுத்தார். சில வாரங்களில் அவனது நினைவாற்றல் கூர்மையாகி கணக்குகளை விரைவாகச் செய்தான்!',
      dailyPractice: 'வலது கையால் இடது காதையும், இடது கையால் வலது காதையும் பிடித்து மூச்சை உள்ளிழுத்து அமர்ந்து, மூச்சை வெளிவிட்டு எழு. 21 முறை செய்.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 நாட்கள் தவறாமல் 21 தோப்புக்கரணம் போடு.',
      monthlyMission: '30 நாட்களும் சீரான சுவாசத்தோடு தோப்புக்கரணம் செய்யும் பழக்கத்தை நிலைநிறுத்து.',
      reflectionQuestions: ['தோப்புக்கரணம் போட்ட பிறகு மூளையில் சுறுசுறுப்பு தெரிந்ததா?', 'கவனம் கூர்மையானதா?'],
      parentQuestions: ['நம் பாரம்பர்ய தோப்புக்கரணத்தை குடும்ப உடற்பயிற்சியாகச் செய்யலாமா?'],
      teacherQuestions: ['தேர்வுக்கு முன் மாணவர்களை 10 முறை தோப்புக்கரணம் போட வைக்கலாமா?'],
      rubric: {
        beginner: 'கைகளை மாற்றிப் பிடிக்கத் தெரியாமல் தடுமாறுகிறார்.',
        developing: 'நினைவூட்டும்போது 10-14 முறை செய்கிறார்.',
        proficient: 'தானாகவே சரியான முறையில் 21 முறை செய்கிறார்.',
        master: 'சரியான சுவாசத்தோடு செய்து இதன் அறிவியலை நண்பர்களுக்கும் விளக்குகிறார்.'
      }
    }
  },

  B2_P3: {
    id: 'B2_P3', dim: 'P',
    en: {
      name: 'Eat Fresh fruits and vegetables',
      tagline: 'Natural rainbow fresh fruits and veggies with daily meals.',
      whyItMatters: 'Fresh raw fruits and vegetables provide live enzymes, antioxidants, and phytonutrients that protect your brain cells and sustain steady energy without sugar crashes.',
      story: 'Meera always preferred fried snacks over vegetables. When she joined the green plate challenge and added crunchy carrots, apples, and cucumbers to her lunchbox, her digestion improved and skin glowed with health.',
      dailyPractice: 'Eat at least one serving of fresh seasonal fruit and one serving of raw/steamed colorful vegetables every day.',
      weeklyChallenge: 'Include 3 different colors of fruits and vegetables on your plate 5 days this week.',
      monthlyMission: 'Try 2 new healthy fruits or vegetables you have never tasted before.',
      reflectionQuestions: ['Which fresh fruit gave you the cleanest afternoon energy?', 'How light did your stomach feel after eating fresh greens?'],
      parentQuestions: ['How can we make colorful sliced fruits and veggies easily accessible at snack time?'],
      teacherQuestions: ['Can we organize a Fruit Rainbow Day in the school cafeteria?'],
      rubric: {
        beginner: 'Refuses vegetables and picks out greens from food.',
        developing: 'Eats fresh fruits when sliced and served by parents.',
        proficient: 'Happily chooses fresh fruits and vegetables every day.',
        master: 'Advocates healthy natural foods and helps prepare family salads.'
      }
    },
    ta: {
      name: 'புதிய பழங்கள் & காய்கறிகள்',
      tagline: 'இயற்கையான வண்ணமயமான புதிய பழங்கள் மற்றும் காய்கறிகளை உண்ணுதல்.',
      whyItMatters: 'புதிய பழங்களும் காய்கறிகளும் உடலுக்குத் தேவையான வைட்டமின்களையும் நார்ச்சத்துக்களையும் தருகின்றன. மூளைக்குத் தேவையான நிலையான ஆற்றலை வழங்கி உடலைப் பாதுகாக்கின்றன.',
      story: 'மீரா நொறுக்குத்தீனிகளை மட்டுமே விரும்பி உண்டாள். தினமும் மதிய உணவோடு கேரட், வெள்ளரி மற்றும் ஆப்பிள் துண்டுகளைச் சேர்த்து உண்ணத் தொடங்கியதும் அவளது செரிமானம் சீராகி உடல் பொலிவுற்றாள்!',
      dailyPractice: 'தினமும் ஒரு புதிய பழம் மற்றும் ஒரு கப் காய்கறியை உன் உணவோடு சேர்த்துக்கொள்.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 நாட்கள் உன் தட்டில் 3 வெவ்வேறு வண்ணக் காய்கறி, பழங்களைச் சேர்த்துக்கொள்.',
      monthlyMission: 'நீ இதுவரை சுவைத்திராத 2 புதிய சத்தான பழங்கள் அல்லது காய்கறிகளை ருசித்துப்பார்.',
      reflectionQuestions: ['பழங்களை உண்ட பிறகு உடல் எவ்வளவு புத்துணர்ச்சியாக இருந்தது?', 'உனக்குப் பிடித்த காய்கறி எது?'],
      parentQuestions: ['மாலையில் நொறுக்குத்தீனிக்கு பதிலாக பழத்துண்டுகளை நறுக்கி வைக்கலாமா?'],
      teacherQuestions: ['வகுப்பில் சத்தான காய்கறி-பழங்கள் உண்ணும் விழிப்புணர்வை ஏற்படுத்தலாமா?'],
      rubric: {
        beginner: 'காய்கறிகளை உண்ண அடம் பிடிக்கிறார்.',
        developing: 'பெற்றோர் தரும்போது பழங்களை உண்கிறார்.',
        proficient: 'தானாகவே ஆர்வத்துடன் தினமும் பழங்கள் மற்றும் காய்கறிகளை உண்கிறார்.',
        master: 'ஆரோக்கியமான உணவுகளைத் தேர்வு செய்து மற்றவர்க்கும் விழிப்புணர்வு ஏற்படுத்துகிறார்.'
      }
    }
  },

  B2_P4: {
    id: 'B2_P4', dim: 'P',
    en: {
      name: 'Dinner before 7:00 PM and Sleep at 10:00 PM',
      tagline: 'Early dinner window giving 3 hours before sleep for restorative rest.',
      whyItMatters: 'Finishing dinner 3 hours before sleep allows the digestive system to rest before bedtime, enabling your body to redirect energy to cell repair and deep growth hormone release.',
      story: 'Anand used to eat heavy dinners at 9:30 PM and woke up tired with acid reflux. Shifting dinner to 6:45 PM and lights out at 10:00 PM gave his stomach time to digest. He woke up feeling light, refreshed, and hungry for breakfast!',
      dailyPractice: 'Eat dinner before 7:00 PM, turn off screens by 9:00 PM, and be in bed asleep by 10:00 PM.',
      weeklyChallenge: 'Finish dinner before 7:00 PM on 5 nights this week.',
      monthlyMission: 'Maintain the 7:00 PM dinner and 10:00 PM sleep rhythm for 25+ days this month.',
      reflectionQuestions: ['Did you sleep deeper without a full stomach?', 'Did you wake up earlier with natural energy?'],
      parentQuestions: ['Can our family schedule evening dinner together before 7:00 PM?'],
      teacherQuestions: ['How can we help students understand the link between dinner timing and academic focus?'],
      rubric: {
        beginner: 'Eats late night dinners and stays awake past 11 PM.',
        developing: 'Eats by 7 PM when dinner is ready, but sleeps late.',
        proficient: 'Consistently finishes dinner by 7 PM and sleeps by 10 PM.',
        master: 'Champions family evening rhythms and wakes up early energized.'
      }
    },
    ta: {
      name: 'இரவு 7 மணிக்கு முன் உணவு & 10 மணிக்கு தூக்கம்',
      tagline: 'செரிமானத்திற்கு 3 மணி நேர இடைவெளி தந்து இரவு 10 மணிக்கு ஆழ்ந்த தூக்கம்.',
      whyItMatters: 'தூங்குவதற்கு 3 மணி நேரத்திற்கு முன் உணவு உண்பது செரிமான உறுப்புகளுக்கு ஓய்வளிக்கிறது. தூக்கத்தில் உடல் திசுக்கள் புதுப்பிக்கப்பட்டு ஆழ்ந்த உறக்கம் கிடைக்கிறது.',
      story: 'ஆனந்த் இரவு 9:30 மணிக்கு உணவு உண்டுவிட்டு உடனே தூங்கினான். காலையில் எழுந்திருக்கவே கஷ்டப்பட்டான். இரவு உணவை 7 மணிக்கு மாற்றி, 10 மணிக்குத் தூங்கியதும் காலையில் சீக்கிரம் புத்துணர்ச்சியோடு கண் விழித்தான்!',
      dailyPractice: 'இரவு உணவை 7:00 மணிக்குள் முடித்து, 10:00 மணிக்குள் தூங்கச் செல்.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 நாட்கள் இரவு 7 மணிக்குள் உணவை முடி.',
      monthlyMission: 'மாதத்தில் 25+ நாட்கள் இரவு 7 மணி உணவு, 10 மணி தூக்கம் வழக்கத்தைக் கடைப்பிடி.',
      reflectionQuestions: ['முன்கூட்டியே உண்டதால் தூக்கம் எவ்வளவு ஆழமாக இருந்தது?', 'காலையில் வயிறு எவ்வளவு லேசாக உணர்ந்தது?'],
      parentQuestions: ['குடும்பமாக இரவு 7 மணிக்குள் சாப்பிடும் வழக்கத்தை உருவாக்கலாமா?'],
      teacherQuestions: ['முன்கூட்டியே சாப்பிடுவதன் முக்கியத்துவத்தை மாணவர்களுக்கு கற்பிக்கலாமா?'],
      rubric: {
        beginner: 'இரவு நெடுநேரம் கழித்து உண்கிறார்.',
        developing: 'நினைவூட்டும்போது 7 மணிக்குள் உண்கிறார்.',
        proficient: 'சுயமாக இரவு 7 மணிக்குள் உண்டு 10 மணிக்கு தூங்குகிறார்.',
        master: 'நேர மேலாண்மையைக் கடைப்பிடித்து சீரான தூக்க முறையைப் பின்பற்றுகிறார்.'
      }
    }
  },

  // ==========================================
  // 2. MENTALLY STRONG
  // ==========================================
  B2_M0: {
    id: 'B2_M0', dim: 'M',
    en: {
      name: 'Visualize Your Future Self',
      tagline: 'Mentally rehearse tomorrow’s victories and long-term dream goals.',
      whyItMatters: 'The brain cannot distinguish between vividly imagined visualization and actual reality. Mentally rehearsing your success primes your subconscious to act boldly and confidently.',
      story: 'Diya felt terrified of giving speeches. Every evening, she closed her eyes for 3 minutes and visualized herself walking to the podium with a smile, speaking clearly, and receiving applause. When speech day arrived, she spoke flawlessly!',
      dailyPractice: 'Close your eyes for 3 minutes each morning or evening. Visualize yourself successfully handling today’s challenges and achieving your big dream.',
      weeklyChallenge: 'Do future self visualization 5 days this week with vivid colors and sensations.',
      monthlyMission: 'Draw or write a vivid description of who you will be 5 years from now in your Habit Book.',
      reflectionQuestions: ['What did your future self look like in your mind?', 'Did visualization make challenging tasks feel easier?'],
      parentQuestions: ['Can we ask our child: “What did you visualize yourself doing today?”'],
      teacherQuestions: ['Can we guide students through a 2-minute visualization before starting a major creative project?'],
      rubric: {
        beginner: 'Doubts abilities and does not practice mental imagery.',
        developing: 'Visualizes goals when guided during workshop.',
        proficient: 'Routinely visualizes daily challenges and positive outcomes.',
        master: 'Holds an inspiring vision of future self that drives daily discipline.'
      }
    },
    ta: {
      name: 'எதிர்கால சுயத்தை காட்சிப்படுத்துதல்',
      tagline: 'வெற்றிகளையும் எதிர்கால பெரிய கனவுகளையும் மனதில் காட்சிப்படுத்திப் பார்த்தல்.',
      whyItMatters: 'மனதில் மீண்டும் மீண்டும் காட்சிப்படுத்தும் காட்சிகளை மூளை உண்மையான அனுபவமாக எடுத்துக்கொள்கிறது. இது தன்னம்பிக்கையையும் இலக்கை அடையும் உறுதியையும் வளர்க்கிறது.',
      story: 'தியா மேடையில் பேசப் பயந்தாள். தினமும் 3 நிமிடங்கள் கண்களை மூடி தான் புன்னகையோடு மேடையில் கம்பீரமாகப் பேசுவதைக் காட்சிப்படுத்தினாள். பேச்சுப் போட்டி நாளில் எவ்வித பயமும் இன்றி பேசி முதல் பரிசு பெற்றாள்!',
      dailyPractice: 'தினமும் 3 நிமிடங்கள் கண்களை மூடி உன் எதிர்கால வெற்றிகளையும் சாதனைகளையும் மனத்திரையில் பார்.',
      weeklyChallenge: 'இந்த வாரத்தின் 5 நாட்கள் முழு நம்பிக்கையோடு காட்சிப்படுத்தும் பயிற்சியைச் செய்.',
      monthlyMission: '5 வருடங்கள் கழித்து நீ என்னவாக மாற விரும்புகிறாய் என்பதை உனது குறிப்பேட்டில் வரைந்து வை.',
      reflectionQuestions: ['மனதில் உன்னைக் கண்டபோது என்ன உணர்வு தோன்றியது?', 'பயங்கள் குறைந்ததா?'],
      parentQuestions: ['குழந்தையின் எதிர்கால கனவுகளைப் பற்றி தினமும் உரையாடலாமா?'],
      teacherQuestions: ['வகுப்பில் புதிய திட்டங்களைத் தொடங்கும் முன் காட்சிப்படுத்தும் பயிற்சியைத் தரலாமா?'],
      rubric: {
        beginner: 'தன் திறமை மீது நம்பிக்கை இல்லாமல் காட்சிப்படுத்தத் தயங்குகிறார்.',
        developing: 'பெரியவர்கள் வழிகாட்டும்போது ஆர்வத்துடன் காட்சிப்படுத்துகிறார்.',
        proficient: 'தானாகவே தினமும் தன் இலக்குகளைக் காட்சிப்படுத்திப் பார்க்கிறார்.',
        master: 'தெளிவான எதிர்கால பார்வையுடன் செயல்பட்டு மற்றவர்க்கும் ஊக்கமளிக்கிறார்.'
      }
    }
  },

  B2_M1: {
    id: 'B2_M1', dim: 'M',
    en: {
      name: 'Digital Boundaries',
      tagline: 'Intentional screen limits; no mindless scrolling; purposeful tech use.',
      whyItMatters: 'Unregulated screen time over-stimulates dopamine circuits, drains attention spans, and steals sleep. Setting firm boundaries puts you in control of technology.',
      story: 'Karthik lost 3 hours every afternoon watching random video shorts. He set a rule: zero screens during homework, maximum 30 minutes of educational tech, and screens away at 8 PM. Suddenly he had time to play football and read books!',
      dailyPractice: 'Define a specific purpose before turning on any screen. Put all devices away during meals and at least 60 minutes before bed.',
      weeklyChallenge: 'Achieve 5 screen-disciplined days with zero mindless video surfing.',
      monthlyMission: 'Complete a full Sunday Digital Fast (no recreational screens for 24 hours).',
      reflectionQuestions: ['What fun offline activity did you do when screens were turned off?', 'Did you notice a calmer, clearer mind?'],
      parentQuestions: ['Are family digital charging stations parked outside the bedrooms?'],
      teacherQuestions: ['How can we teach students the difference between digital creation and digital consumption?'],
      rubric: {
        beginner: 'Throws tantrums when screens are taken away.',
        developing: 'Follows screen rules only with strict supervision.',
        proficient: 'Self-regulates screen time and logs off when time is up.',
        master: 'Uses tech strictly as a creative learning tool and enjoys offline hobbies.'
      }
    },
    ta: {
      name: 'டிஜிட்டல் எல்லைகள் (திரைக் கட்டுப்பாடு)',
      tagline: 'பயனுள்ள பயன்பாடு, வீண் நேரக் கழிப்பு தவிர்த்தல், சுய திரைக் கட்டுப்பாடு.',
      whyItMatters: 'அளவுக்கு அதிகமான மொபைல் பயன்பாடு மூளையின் கவனத்தைக் குறைக்கிறது. நேரக் கட்டுப்பாடு விதிப்பது உங்களை டிஜிட்டல் உலகின் எஜமானாக மாற்றுகிறது.',
      story: 'கார்த்திக் வீடியோக்களைப் பார்த்து தினமும் 3 மணி நேரம் வீணடித்தான். படிக்கின்ற நேரத்திலும், இரவு தூங்கும் முன்பும் மொபைல் தொட மாட்டேன் என உறுதி எடுத்தான். மிச்சமான நேரத்தில் மைதானத்தில் விளையாடி மகிழ்ந்தான்!',
      dailyPractice: 'திரையைத் தொடும் முன் நோக்கம் என்னவென்று தீர்மானி. உணவு வேளையிலும் இரவு தூங்குவதற்கு 1 மணி நேரத்திற்கு முன்பும் திரையைத் தொடாதே.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 நாட்கள் தேவையற்ற வீடியோக்களைப் பார்க்காமல் கட்டுப்பாட்டைக் கடைப்பிடி.',
      monthlyMission: 'ஒரு ஞாயிற்றுக்கிழமை முழுவதும் பொழுதுபோக்குத் திரைகள் இல்லாத "டிஜிட்டல் விரதம்" இரு.',
      reflectionQuestions: ['மொபைல் இல்லாத நேரத்தில் என்னென்ன புதிய விஷயங்களைச் செய்தாய்?', 'மனம் அமைதியாக இருந்ததா?'],
      parentQuestions: ['இரவில் மொபைல் போன்களை படுக்கையறைக்கு வெளியே வைக்கும் பழக்கத்தை உருவாக்கலாமா?'],
      teacherQuestions: ['மாணவர்களுக்கு பயனுள்ள பயன்பாட்டிற்கும் வீண் பொழுதுபோக்கிற்கும் உள்ள வேறுபாட்டை விளக்குகிறோமா?'],
      rubric: {
        beginner: 'மொபைலை எடுக்க விடாமல் அடம் பிடிக்கிறார்.',
        developing: 'பெற்றோர் கூறினால் மட்டும் மொபைலை வைக்கிறார்.',
        proficient: 'தானாகவே நேரத்தைக் கண்காணித்துத் திரையை மூடுகிறார்.',
        master: 'தொழில்நுட்பத்தைப் பயனுள்ள ஆக்கப்பூர்வ வழியில் மட்டுமே பயன்படுத்துகிறார்.'
      }
    }
  },

  B2_M2: {
    id: 'B2_M2', dim: 'M',
    en: {
      name: 'Journaling my Small Goals & Gratitude',
      tagline: 'Nightly 3-item gratitude log and top 3 tomorrow goals.',
      whyItMatters: 'Writing down 3 small wins and 3 goals before bed organizes the subconscious mind overnight, reducing sleep anxiety and creating purposeful morning momentum.',
      story: 'Sneha felt overwhelmed with assignments and tests. Every night, she wrote 3 things she was thankful for and 3 small tasks for tomorrow. Waking up with a written plan made her school days calm and organized.',
      dailyPractice: 'Spend 5 minutes before bed writing 3 specific gratitudes and 3 top priorities for tomorrow in your journal.',
      weeklyChallenge: 'Journal gratitude and small goals for 6 consecutive nights.',
      monthlyMission: 'Review a month of entries and celebrate 90 documented blessings and completed goals.',
      reflectionQuestions: ['How does writing small goals help you wake up focused?', 'What was the sweetest thing you felt grateful for today?'],
      parentQuestions: ['Can we share 1 family gratitude aloud at the dinner table?'],
      teacherQuestions: ['Can students keep a daily win journal in their homeroom folders?'],
      rubric: {
        beginner: 'Does not write or reflect on daily events.',
        developing: 'Journals occasionally when reminded by parents.',
        proficient: 'Consistently writes 3 gratitudes and 3 goals every night.',
        master: 'Maintains an insightful, disciplined reflective growth journal.'
      }
    },
    ta: {
      name: 'சிறு இலக்குகள் & நன்றியுணர்வு குறிப்பேடு',
      tagline: 'இரவில் 3 நன்றியுணர்வு பதிவுகள் மற்றும் நாளைய 3 சிறு இலக்குகள்.',
      whyItMatters: 'தினமும் இரவில் நன்றியுணர்வையும் நாளைய இலக்குகளையும் எழுதுவது மன அமைதியைத் தந்து தூக்கத்தை மேம்படுத்துகிறது. காலையில் தெளிவான நோக்கத்தோடு செயல்பட வைக்கிறது.',
      story: 'சினேகா வீட்டுப்பாடங்களை முடிக்க முடியாமல் தவித்தாள். இரவில் தனக்கு உதவிய 3 விஷயங்களுக்கு நன்றி கூறி, நாளை முடிக்க வேண்டிய 3 சிறு இலக்குகளை எழுதினாள். காலையில் தெளிவோடு அவற்றை எளிதாக முடித்தாள்!',
      dailyPractice: 'இரவில் தூங்கும் முன் 3 நன்றியுணர்வு மற்றும் நாளைய 3 முக்கிய இலக்குகளை உன் குறிப்பேட்டில் எழுது.',
      weeklyChallenge: 'தொடர்ந்து 6 நாட்கள் தவறாமல் குறிப்பேட்டில் எழுதிப் பார்.',
      monthlyMission: 'மாத இறுதியில் உன் குறிப்பேட்டைத் திருப்பிப் பார்த்து 90 வெற்றிகளையும் நன்மைகளையும் கொண்டாடு.',
      reflectionQuestions: ['இலக்குகளை எழுதிய பின் மனம் எவ்வளவு தெளிவாக இருந்தது?', 'இன்று நீ யாருக்கு நன்றி கூற விரும்பினாய்?'],
      parentQuestions: ['இரவு உணவின் போது அனைவரும் தலா 1 நன்றியைப் பகிர்ந்துகொள்ளலாமா?'],
      teacherQuestions: ['வகுப்பில் மாணவர்களை தங்களின் அன்றைய சிறு வெற்றிகளை எழுத ஊக்குவிக்கலாமா?'],
      rubric: {
        beginner: 'எழுதத் தயங்கி நாட்குறிப்பைத் தவிர்ப்பார்.',
        developing: 'நினைவூட்டும்போது மட்டும் எழுதுகிறார்.',
        proficient: 'சுயமாக தினமும் 3 நன்றியையும் 3 இலக்குகளையும் எழுதுகிறார்.',
        master: 'தெளிவான வாழ்க்கைத் திட்டமிடலோடு குறிப்பேட்டைப் பராமரித்து வெற்றி பெறுகிறார்.'
      }
    }
  },

  B2_M3: {
    id: 'B2_M3', dim: 'M',
    en: {
      name: 'My Warrier Journey',
      tagline: 'Embrace challenges as character training; rise stronger from failure.',
      whyItMatters: 'Every obstacle is weight-lifting for the mind. Seeing yourself as a courageous warrior on a heroic quest reframes mistakes into valuable lessons rather than defeats.',
      story: 'Varun failed his school football selection and wanted to quit sports. He reminded himself: “A warrior is not someone who never falls, but someone who rises every time.” He trained for 30 minutes every morning and made the team the next semester!',
      dailyPractice: 'Whenever faced with a difficult task or mistake, write down the lesson and say: “I am a warrior, I learn and overcome.”',
      weeklyChallenge: 'Identify one hard challenge you were avoiding and tackle it head-on.',
      monthlyMission: 'Document a major breakthrough where you turned a setback into a victory in your Habit Book.',
      reflectionQuestions: ['What did a recent mistake teach you about your strength?', 'How did staying brave change the final result?'],
      parentQuestions: ['When our child makes a mistake, do we ask: “What did you learn from this test?”'],
      teacherQuestions: ['How can we celebrate resilience and grit when students tackle hard problems?'],
      rubric: {
        beginner: 'Gives up immediately when faced with difficulty.',
        developing: 'Tries again only with strong encouragement from adults.',
        proficient: 'Demonstrates resilience and treats setbacks as growth challenges.',
        master: 'Embodies a relentless warrior spirit and inspires struggling classmates.'
      }
    },
    ta: {
      name: 'என் வீரப் பயணம் (தளரா மனம்)',
      tagline: 'சவால்களைப் பயிற்சியாக ஏற்று தோல்வியிலிருந்து மீண்டெழுதல்.',
      whyItMatters: 'தடைகளும் சவால்களுமே மன வலிமையை வளர்க்கும் பயிற்சிக் கருவிகள். தவறுகளைத் தோல்வியாகப் பார்க்காமல் பாடங்களாகப் பார்க்கும் வீர மனப்பான்மை வெற்றியின் ரகசியம்.',
      story: 'வருண் கால்பந்து அணியில் தேர்வாகாமல் வருந்தினான். "ஒரு வீரன் கீழே விழுவதால் தோற்பதில்லை, எழ மறுக்கும் போதே தோற்கிறான்" என்று உணர்ந்து தினமும் பயிற்சி செய்து அடுத்த போட்டியில் தேர்வானான்!',
      dailyPractice: 'கடினமான சூழல் வரும்போது மனம் தளராமல் "நான் ஒரு வீரன், நான் கற்று வெல்வேன்" என்று கூறி முன்னேறு.',
      weeklyChallenge: 'நீ பயந்து தவிர்த்த ஒரு கடினமான செயலை இந்த வாரம் துணிந்து செய்.',
      monthlyMission: 'தோல்வியிலிருந்து நீ கற்றுக்கொண்டு சாதித்த ஒரு பெரிய வெற்றியை உன் குறிப்பேட்டில் பதிவு செய்.',
      reflectionQuestions: ['சமீபத்திய தவறு உனக்கு என்ன வலிமையைக் கற்றுத்தந்தது?', 'துணிவோடு நின்றபோது என்ன உணர்ந்தாய்?'],
      parentQuestions: ['குழந்தை தடுமாறும் போது "இதிலிருந்து என்ன கற்றுக்கொண்டாய்?" என்று வழிகாட்டலாமா?'],
      teacherQuestions: ['தோல்வியைக் கண்டு துவளாமல் முயற்சிக்கும் மாணவர்களின் மன உறுதியைப் பாராட்டலாமா?'],
      rubric: {
        beginner: 'சிறு தடங்கலுக்கும் முயற்சியைக் கைவிடுகிறார்.',
        developing: 'ஊக்கப்படுத்தினால் மீண்டும் முயற்சிக்கிறார்.',
        proficient: 'சுயமாக தடைகளை எதிர்கொண்டு சவால்களை வெல்கிறார்.',
        master: 'அசைக்க முடியாத வீர மனப்பான்மையோடு செயல்பட்டு மற்றவர்க்கும் வழிகாட்டுகிறார்.'
      }
    }
  },

  B2_M4: {
    id: 'B2_M4', dim: 'M',
    en: {
      name: 'Clean workplace rituals (Make my bed / Keep studyplace clean / Get your bag ready)',
      tagline: 'Tidy bedroom, pristine desk, bag packed the night before.',
      whyItMatters: 'Physical clutter creates mental clutter. Completing clean workspace rituals gives an immediate sense of control, saves 15 minutes of morning panic, and primes the brain for focus.',
      story: 'Rahul could never find his geometry box or homework sheets in the morning, leading to frantic arguments. He adopted the 3-step evening ritual: clear desk, pack bag with tomorrow’s timetable, make bed upon rising. His mornings became peaceful and confident!',
      dailyPractice: 'Make your bed immediately upon rising, keep your study desk 100% clean, and pack your school bag the night before.',
      weeklyChallenge: 'Achieve 7 out of 7 days with bed made and bag packed the night before.',
      monthlyMission: 'Do a deep monthly organization of your bookshelf and study drawers.',
      reflectionQuestions: ['How does walking into a tidy room change your mood?', 'Did packing your bag at night save morning stress?'],
      parentQuestions: ['Do we model tidy desks and organized workspaces at home?'],
      teacherQuestions: ['Can we do a 1-minute desk clearance ritual at the end of each school day?'],
      rubric: {
        beginner: 'Leaves bedroom messy and scrambles for books in the morning.',
        developing: 'Cleans desk and makes bed when told by parents.',
        proficient: 'Routinely completes bed-making, desk cleaning, and bag prep independently.',
        master: 'Maintains an immaculate workspace and helps organize shared home areas.'
      }
    },
    ta: {
      name: 'தூய்மையான பணியிட ஒழுக்கம்',
      tagline: 'படுக்கை விரித்தல், படிக்கும் மேசை சுத்தம், முந்தைய இரவே புத்தகப் பை தயார்.',
      whyItMatters: 'சுற்றுப்புறத் தூய்மையே மன அமைதியைத் தருகிறது. படுக்கையை விரிப்பதும், முந்தைய இரவே பையை அடுக்குவதும் காலையின் பதற்றத்தைத் தவிர்த்து கவனத்தை உயர்த்துகிறது.',
      story: 'ராகுல் காலையில் கிளம்பும்போது வீட்டுப்பாட நோட்டைத் தேடித் தவிப்பான். இரவிலேயே கால அட்டவணைப்படி பையை அடுக்கி, எழுந்ததும் படுக்கையைச் சுருட்டி வைக்கும் பழக்கத்தை மேற்கொண்டான். காலை நேரம் இனிமையாக மாறியது!',
      dailyPractice: 'விழித்ததும் படுக்கையை ஒழுங்குபடுத்து, படிக்கும் மேசையைத் தூய்மையாக வை, முந்தைய இரவே பையைத் தயார் செய்.',
      weeklyChallenge: '7 நாட்களும் இரவிலேயே பையை அடுக்கி, காலையில் படுக்கையை ஒழுங்கு செய்.',
      monthlyMission: 'மாதத்தில் ஒரு நாள் உன் புத்தக அலமாரியை முழுமையாகச் சுத்தம் செய்து அடுக்கி வை.',
      reflectionQuestions: ['சுத்தமான மேசையில் படிக்கும்போது மனம் எவ்வளவு தெளிவாக இருக்கிறது?', 'காலையில் பதற்றம் குறைந்ததா?'],
      parentQuestions: ['நாமும் நமது வேலை மேசைகளை ஒழுங்காக வைத்து முன்மாதிரியாக இருக்கிறோமா?'],
      teacherQuestions: ['பள்ளி முடியும் முன் 1 நிமிடம் மேசையைச் சுத்தம் செய்யும் பழக்கத்தை வைக்கலாமா?'],
      rubric: {
        beginner: 'பொருட்களை ஆங்காங்கே சிதறவிட்டுத் தேடுகிறார்.',
        developing: 'பெற்றோர் கூறினால் மட்டும் பையை அடுக்குகிறார்.',
        proficient: 'சுயமாக படுக்கையை விரித்து, மேசையைச் சுத்தம் செய்து பையைத் தயார் செய்கிறார்.',
        master: 'மிகச் சிறந்த ஒழுங்குமுறையைக் கடைப்பிடித்து வீட்டைத் தூய்மையாக வைக்க உதவுகிறார்.'
      }
    }
  },

  // ==========================================
  // 3. INTELLECTUALLY SHARP
  // ==========================================
  B2_I0: {
    id: 'B2_I0', dim: 'I',
    en: {
      name: 'Practice 5 Random Brain Gym Exercise',
      tagline: 'Cross-crawl, double doodle, hook-ups to stimulate neural connections.',
      whyItMatters: 'Brain gym movements cross the body’s midline, stimulating both the logical left and creative right cerebral hemispheres for integrated high-speed learning.',
      story: 'Ananya felt stuck while trying to write creative essays. She practiced 5 minutes of Cross-Crawl and Lazy 8 arm drawings. Reconnecting both hemispheres allowed ideas to flow effortlessly onto paper.',
      dailyPractice: 'Spend 5 minutes practicing 5 Brain Gym moves (Cross Crawl, Double Doodle, Brain Buttons, Hook-ups, Lazy 8s).',
      weeklyChallenge: 'Do Brain Gym movements before every study block for 5 days.',
      monthlyMission: 'Teach 5 Brain Gym exercises to family members or classmates.',
      reflectionQuestions: ['Did your mind feel more awake after cross-body movements?', 'Which movement felt most energizing?'],
      parentQuestions: ['Can we do Brain Gym exercises together before study time?'],
      teacherQuestions: ['Can we lead a 3-minute Brain Gym stretch session before difficult lessons?'],
      rubric: {
        beginner: 'Struggles with cross-body coordination.',
        developing: 'Performs exercises when guided step by step.',
        proficient: 'Performs 5 Brain Gym moves smoothly and independently.',
        master: 'Expertly demonstrates brain exercises and explains neural benefits.'
      }
    },
    ta: {
      name: '5 எளிய மூளைப் பயிற்சிகள் (Brain Gym)',
      tagline: 'இடது-வலது மூளை நரம்புகளை இணைக்கும் 5 எளிய உடலியக்க மூளைப் பயிற்சிகள்.',
      whyItMatters: 'உடலின் குறுக்குவெட்டு அசைவுகள் மூளையின் இடது மற்றும் வலது அரைக்கோளங்களை இணைத்து சிந்தனை வேகத்தையும் படைப்பாற்றலையும் தூண்டுகின்றன.',
      story: 'அனன்யாவுக்கு கட்டுரை எழுதும்போது கருத்துக்கள் வரவில்லை. 5 நிமிடங்கள் குறுக்கு-நடை (Cross Crawl) மற்றும் சோம்பல் 8 (Lazy 8) பயிற்சிகளைச் செய்தாள். மூளை சுறுசுறுப்பாகி அருமையான கட்டுரையை எழுதினாள்!',
      dailyPractice: 'தினமும் 5 நிமிடங்கள் 5 எளிய மூளைப் பயிற்சிகளைச் செய்.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 நாட்கள் படிப்பதற்கு முன் மூளைப் பயிற்சிகளைச் செய்து பார்.',
      monthlyMission: 'இந்த 5 மூளைப் பயிற்சிகளை உனது நண்பர்கள் அல்லது குடும்பத்தினருக்குக் கற்றுக்கொடு.',
      reflectionQuestions: ['பயிற்சி செய்த பிறகு படிப்பு எவ்வளவு எளிதானது?', 'உனக்குப் பிடித்த மூளைப் பயிற்சி எது?'],
      parentQuestions: ['படிக்கும் முன் குழந்தையோடு சேர்ந்து மூளைப் பயிற்சிகள் செய்யலாமா?'],
      teacherQuestions: ['கடினமான பாடத்திற்கு முன் 3 நிமிட மூளைப் பயிற்சிகளை வகுப்பில் செய்யலாமா?'],
      rubric: {
        beginner: 'குறுக்குவெட்டு அசைவுகளைச் செய்யத் தயங்குகிறார்.',
        developing: 'வழிகாட்டுதலோடு பயிற்சிகளைச் செய்கிறார்.',
        proficient: 'தானாகவே 5 பயிற்சிகளையும் துல்லியமாகச் செய்கிறார்.',
        master: 'பயிற்சிகளை நேர்த்தியாகச் செய்து மற்றவர்க்கும் பயிற்சி அளிக்கிறார்.'
      }
    }
  },

  B2_I1: {
    id: 'B2_I1', dim: 'I',
    en: {
      name: 'Curiosity Questioning',
      tagline: 'Ask 5 “why” and “how” questions about the world every day.',
      whyItMatters: 'Curiosity is the engine of intellect. Asking deep “Why”, “How”, and “What if” questions builds critical thinking skills that cannot be replaced by machines.',
      story: 'Tarun stopped simply memorizing science definitions and started asking: “Why do leaves change color? How do clouds hold metric tons of water?” Investigating his own questions turned him into the top science thinker in his grade.',
      dailyPractice: 'Write down and investigate 3 to 5 curious questions every day about science, nature, history, or how things work.',
      weeklyChallenge: 'Ask your teachers or parents 5 deep questions this week and research the answers.',
      monthlyMission: 'Create a “Book of Wonder” containing your 30 favorite investigated questions.',
      reflectionQuestions: ['What was the most fascinating thing you learned from asking a question today?', 'Why is asking questions better than silent memorizing?'],
      parentQuestions: ['When our child asks a question, do we explore the answer together?'],
      teacherQuestions: ['Can we have a “Question of the Day” board where students post deep inquiries?'],
      rubric: {
        beginner: 'Passively accepts information without asking questions.',
        developing: 'Asks simple factual questions occasionally.',
        proficient: 'Consistently formulates deep, analytical “why” and “how” questions.',
        master: 'Drives independent research projects fueled by relentless curiosity.'
      }
    },
    ta: {
      name: 'ஆர்வக் கேள்விகள் கேட்டல்',
      tagline: 'உலகத்தைப் பற்றி தினமும் 5 "ஏன்? எதற்கு? எப்படி?" கேள்விகள் கேட்டல்.',
      whyItMatters: 'ஆர்வமே அறிவின் திறவுகோல். மனப்பாடம் செய்வதை விட "ஏன்? எப்படி?" என்று கேள்வி கேட்பது விமர்சன சிந்தனையையும் மேதமையையும் உருவாக்குகிறது.',
      story: 'தருண் பாடங்களை மனப்பாடம் செய்யாமல் "இலைகள் ஏன் பச்சை நிறமாக உள்ளன? மேகங்களில் மழை எப்படி உருவாகிறது?" என்று ஆராய்ந்தான். அவனது அறிவியல் ஆர்வம் பள்ளியிலேயே முதலிடம் பிடிக்க வைத்தது!',
      dailyPractice: 'தினமும் உலகம், இயற்கை மற்றும் அறிவியல் பற்றி 3-5 ஆழ்ந்த கேள்விகளைக் கேட்டு விடை தேடு.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 சுவாரசியமான கேள்விகளைக் கேட்டு ஆசிரியரிடம் விடை அறிந்துகொள்.',
      monthlyMission: 'உனக்குப் பிடித்த 30 வியப்பூட்டும் கேள்விகள் அடங்கிய "வியப்புப் புத்தகம்" உருவாக்கு.',
      reflectionQuestions: ['இன்று நீ கேட்ட கேள்வியில் எந்த உண்மை உன்னை வியப்பில் ஆழ்த்தியது?', 'கேள்வி கேட்பது ஏன் முக்கியம்?'],
      parentQuestions: ['குழந்தை கேள்வி கேட்கும்போது சளைக்காமல் விடையைத் தேட உதவுகிறோமா?'],
      teacherQuestions: ['வகுப்பறையில் "இன்றைய சிறந்த கேள்வி" பலகையை அமைத்துப் பாராட்டலாமா?'],
      rubric: {
        beginner: 'கேள்வி கேட்காமல் மౌனமாக இருக்கிறார்.',
        developing: 'அவ்வப்போது எளிய கேள்விகளைக் கேட்கிறார்.',
        proficient: 'தினமும் ஆழ்ந்த சிந்தனையோடு "ஏன்? எப்படி?" எனக் கேள்வி கேட்கிறார்.',
        master: 'ஆராய்ச்சி நோக்குடன் கேள்விகளை எழுப்பி சுயமாக விடை காண்கிறார்.'
      }
    }
  },

  B2_I2: {
    id: 'B2_I2', dim: 'I',
    en: {
      name: 'Memory Play (Words, Peg Words) Apply on studies',
      tagline: 'Use peg-word system and vivid visualization for academic memory.',
      whyItMatters: 'Rote learning fades quickly, but associative peg memory (linking items to vivid pictures, rhyming numbers, or stories) embeds knowledge permanently in long-term memory.',
      story: 'Deepak could never remember the periodic table elements or historical dates. Using the peg-word system (1 = Sun, 2 = Shoe, 3 = Tree), he linked historical treaties to vivid funny images and scored 100% on his history test!',
      dailyPractice: 'Pick 5 vocabulary words, facts, or formulas daily and link them using vivid mental peg images or stories.',
      weeklyChallenge: 'Memorize a 10-item list in exact order in under 5 minutes using the peg-word system.',
      monthlyMission: 'Apply peg words and visual memory palaces to master an entire difficult chapter.',
      reflectionQuestions: ['How much faster did you recall facts when connected to funny images?', 'Which visual link was the easiest to remember?'],
      parentQuestions: ['Can we play a 5-minute memory peg association game during car rides?'],
      teacherQuestions: ['Can we teach mnemonic peg words as a study tool before exams?'],
      rubric: {
        beginner: 'Relies solely on rote repetition and forgets easily.',
        developing: 'Uses mnemonics when taught by teachers.',
        proficient: 'Independently creates mental peg images to memorize school topics.',
        master: 'Masterfully applies advanced visual memory techniques across all subjects.'
      }
    },
    ta: {
      name: 'நினைவாற்றல் விளையாட்டு (Peg Words)',
      tagline: 'படிக்கும் பாடங்களை காட்சிப் படங்கள் மற்றும் இணைப்புக் குறியீடுகளோடு இணைத்து நினைவில் நிறுத்துதல்.',
      whyItMatters: 'சாதாரண மனப்பாடம் விரைவில் மறந்துவிடும். ஆனால் நகைச்சுவையான படங்கள் மற்றும் இணைப்புக் குறியீடுகள் (Peg Words) மூலம் படிப்பது நீண்ட கால நினைவில் நிலைத்து நிற்கும்.',
      story: 'தீபக் வரலாற்று வருடங்களை நினைவில் வைக்க முடியாமல் திணறினான். எண்களுக்குப் படங்களை இணைத்து கதைகளாக மாற்றியதும், 20 வரலாற்று நிகழ்வுகளையும் வரிசையாகச் சொல்லி ஆசிரியரை அசத்தினான்!',
      dailyPractice: 'தினமும் 5 கடினமான சொற்கள் அல்லது சூத்திரங்களை கற்பனைப் படங்களோடு இணைத்து நினைவில் வை.',
      weeklyChallenge: '10 தகவல்களை 5 நிமிடங்களில் வரிசை மாறாமல் நினைவில் நிறுத்தி சோதித்துப் பார்.',
      monthlyMission: 'ஒரு கடினமான முழுப் பாடத்தை நினைவாற்றல் உத்திகளைப் பயன்படுத்தி வசப்படுத்து.',
      reflectionQuestions: ['படங்களோடு இணைத்துப் படித்தபோது எவ்வளவு எளிதாக நினைவுக்கு வந்தது?', 'எந்தக் காட்சி உனக்கு எளிதாக இருந்தது?'],
      parentQuestions: ['பயணங்களின் போது நினைவாற்றல் விளையாட்டுக்களை விளையாடலாமா?'],
      teacherQuestions: ['மாணவர்களுக்கு பாடங்களை நினைவில் நிறுத்த நினைவாற்றல் உத்திகளைக் கற்பிக்கலாமா?'],
      rubric: {
        beginner: 'மறுபடி மறுபடி படித்து மறந்துவிடுகிறார்.',
        developing: 'பெரியவர்கள் கற்றுக்கொடுத்தால் உத்திகளைப் பயன்படுத்துகிறார்.',
        proficient: 'தானாகவே படங்களை உருவாக்கி நினைவாற்றல் உத்திகளைப் பயன்படுத்துகிறார்.',
        master: 'நினைவாற்றல் கலைகளில் தேர்ச்சி பெற்று நண்பர்களுக்கும் கற்றுத் தருகிறார்.'
      }
    }
  },

  B2_I3: {
    id: 'B2_I3', dim: 'I',
    en: {
      name: 'Brain teasers (Rubik’s Cube, Riddle, Sudoku, Puzzle)',
      tagline: 'Solve 1 brain teaser, Sudoku puzzle, or Rubik pattern daily.',
      whyItMatters: 'Puzzles and brain teasers build cognitive flexibility, pattern recognition, working memory, and logical deductive reasoning.',
      story: 'Naveen used to get frustrated whenever math problems weren’t straightforward. Solving a daily Sudoku and practicing Rubik’s cube algorithm sequences developed his patience and mental stamina to solve complex problems.',
      dailyPractice: 'Spend 10 minutes solving a Rubik’s cube stage, Sudoku grid, logic riddle, or tangram puzzle daily.',
      weeklyChallenge: 'Solve 5 different brain teasers or complete a 9x9 Sudoku puzzle this week.',
      monthlyMission: 'Master solving a 3x3 Rubik’s cube from start to finish.',
      reflectionQuestions: ['What strategy helped you break through when you felt stuck?', 'Did solving the riddle give you a burst of joy?'],
      parentQuestions: ['Do we have Sudoku books, Rubik cubes, or logic puzzles at home instead of video games?'],
      teacherQuestions: ['Can we introduce a weekly Friday Math Brain Teaser challenge?'],
      rubric: {
        beginner: 'Gives up on puzzles after 1 minute of trying.',
        developing: 'Solves simple puzzles with adult hints.',
        proficient: 'Persistently works through brain teasers and Sudokus independently.',
        master: 'Solves complex puzzles rapidly and creates original riddles for others.'
      }
    },
    ta: {
      name: 'மூளைப் புதிர்கள் (ரூபிக்ஸ் க்யூப், சுடோகு)',
      tagline: 'ரூபிக்ஸ் க்யூப், சுடோகு, விடுகதைகள் மற்றும் தர்க்க புதிர்களைத் தினமும் விடுவித்தல்.',
      whyItMatters: 'புதிர்களை விடுவிப்பது மூளையின் தர்க்க சிந்தனையையும், சிக்கல் தீர்க்கும் ஆற்றலையும், பொறுமையையும் அபரிமிதமாக வளர்க்கிறது.',
      story: 'நவீன் கடினமான கணக்குகளைப் பார்த்ததும் பயந்தான். தினமும் சுடோகு மற்றும் ரூபிக்ஸ் க்யூப் புதிர்களை விடுவிக்கப் பழகியதும், அவனது மூளையின் சிக்கல் தீர்க்கும் வேகம் கூடி கணக்குகளை எளிதாகச் செய்தான்!',
      dailyPractice: 'தினமும் 10 நிமிடங்கள் ஒரு சுடோகு, ரூபிக்ஸ் க்யூப் அல்லது விடுகதையை விடுவிக்க முயற்சி செய்.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 புதிர்களை சுயமாக விடுவித்து வெற்றி பெறு.',
      monthlyMission: '3x3 ரூபிக்ஸ் க்யூபை முழுமையாகச் சேர்த்து முடிக்கும் திறனை அடை.',
      reflectionQuestions: ['புதிரை விடுவித்தபோது என்ன மகிழ்ச்சி ஏற்பட்டது?', 'சிக்கலைத் தீர்க்க எந்த வழி உதவியது?'],
      parentQuestions: ['வீட்டில் வீடியோ கேம்களுக்குப் பதிலாக புதிர்ப் புத்தகங்களை வாங்கித் தரலாமா?'],
      teacherQuestions: ['வாரந்தோறும் ஒரு கணிதப் புதிர் சவாலை வகுப்பில் நடத்தலாமா?'],
      rubric: {
        beginner: 'புதிர்களைப் பார்த்தவுடன் விலகுகிறார்.',
        developing: 'உதவியுடன் எளிய புதிர்களை விடுவிக்கிறார்.',
        proficient: 'சுயமாக பொறுமையோடு புதிர்களையும் சுடோகுவையும் விடுவிக்கிறார்.',
        master: 'கடினமான புதிர்களை விரைவாக விடுவித்து புதிய புதிர்களை உருவாக்குகிறார்.'
      }
    }
  },

  B2_I4: {
    id: 'B2_I4', dim: 'I',
    en: {
      name: 'Memory Recall Exercise',
      tagline: 'Recall key concepts at the end of each study block without notes.',
      whyItMatters: 'Testing yourself through active retrieval strengthens synaptic connections 300% more effectively than passive re-reading, cementing knowledge into permanent storage.',
      story: 'Manoj read his science notes five times but forgot them during exams. His tutor asked him to close the book after reading and write everything he remembered on a blank sheet. This single habit shot his grades to the top of the class!',
      dailyPractice: 'At the end of every study session, close your notebook and spend 3 minutes writing or speaking aloud the key ideas from memory.',
      weeklyChallenge: 'Do a closed-book active recall brain dump for 5 study sessions this week.',
      monthlyMission: 'Conduct a weekly cumulative recall test on Sundays without looking at textbooks.',
      reflectionQuestions: ['How much could you recall without peeking at the book?', 'Which ideas needed a second review?'],
      parentQuestions: ['Can we ask our child: “Can you teach me the top 3 things you learned today?”'],
      teacherQuestions: ['Can we dedicate the last 3 minutes of class to a closed-book exit-ticket recall?'],
      rubric: {
        beginner: 'Passive reader; never tests memory without looking.',
        developing: 'Recalls facts when asked direct questions by parents.',
        proficient: 'Consistently tests own memory with closed-book recall after studying.',
        master: 'Excels in active retrieval and teaches concepts effortlessly without notes.'
      }
    },
    ta: {
      name: 'சுய நினைவூட்டல் பயிற்சி (Active Recall)',
      tagline: 'படித்து முடித்தவுடன் புத்தகத்தை மூடிவிட்டு நினைவிலிருந்து மீட்டுப் பார்த்தல்.',
      whyItMatters: 'மீண்டும் மீண்டும் வாசிப்பதை விட, புத்தகத்தை மூடிவிட்டு நினைவிலிருந்து மீட்டெடுப்பதே தகவல்களை நிரந்தர நினைவாற்றலாக மாற்றுகிறது.',
      story: 'மனோஜ் ஐந்து முறை படித்தும் தேர்வில் மறந்தான். ஆசிரியர் ஒரு பாடத்தைப் படித்து முடித்ததும் புத்தகத்தை மூடிவிட்டு நினைவிலிருந்து ஒரு தாளில் எழுதச் சொன்னார். இந்த உத்தி அவனுக்கு முழு மதிப்பெண்களைப் பெற்றுத் தந்தது!',
      dailyPractice: 'படிப்பு முடிந்ததும் புத்தகத்தை மூடிவிட்டு 3 நிமிடங்கள் படித்த முக்கியக் கருத்துக்களை நினைவிலிருந்து எழுதிப் பார்.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 முறை படித்தவுடன் சுய நினைவூட்டல் சோதனையைச் செய்.',
      monthlyMission: 'ஞாயிறுதோறும் அந்த வாரப் பாடங்களை புத்தகம் பார்க்காமல் நினைவிலிருந்து எழுதிப் பார்.',
      reflectionQuestions: ['புத்தகம் பார்க்காமல் எத்தனை தகவல்களை உன்னால் எழுத முடிந்தது?', 'எந்தப் பகுதி மீண்டும் படிக்க வேண்டியிருந்தது?'],
      parentQuestions: ['குழந்தையிடம் "இன்று படித்ததில் 3 முக்கிய விஷயங்களை எனக்குக் கற்றுக்கொடுக்கிறாயா?" எனக் கேட்கலாமா?'],
      teacherQuestions: ['பாடம் முடியும் முன் 3 நிமிடங்கள் புத்தகத்தை மூடிவிட்டு நினைவிலிருந்து எழுத வைக்கலாமா?'],
      rubric: {
        beginner: 'புத்தகத்தைப் பார்த்து மட்டுமே படிக்கிறார்.',
        developing: 'கேள்வி கேட்டால் மட்டும் நினைவுகூர்கிறார்.',
        proficient: 'தானாகவே புத்தகத்தை மூடிவிட்டு முக்கியக் கருத்துக்களை மீட்டெழுதுகிறார்.',
        master: 'குறிப்புகள் இன்றியே பாடங்களை மிகத் தெளிவாக மற்றவர்க்கு விளக்குகிறார்.'
      }
    }
  },

  // ==========================================
  // 4. EMOTIONALLY BALANCED
  // ==========================================
  B2_E0: {
    id: 'B2_E0', dim: 'E',
    en: {
      name: 'Active Appreciation',
      tagline: 'Speak sincere words of appreciation to parents, teachers, or friends daily.',
      whyItMatters: 'Expressing genuine vocal appreciation releases oxytocin, deepens emotional bonds, and trains your brain to spot goodness in the people around you.',
      story: 'Priya realized her mother spent hours cooking every evening without anyone saying thank you. One evening she hugged her and said: “Amma, thank you for making delicious warm meals every single day.” Her mother’s joyful tears showed her the power of sincere appreciation.',
      dailyPractice: 'Look someone in the eye every day and say one specific, heartfelt sentence of appreciation.',
      weeklyChallenge: 'Express active appreciation to 7 different people over the week.',
      monthlyMission: 'Write a handwritten letter of deep gratitude to a teacher or grandparent.',
      reflectionQuestions: ['How did the other person’s face light up when you thanked them?', 'How did your heart feel after speaking kindly?'],
      parentQuestions: ['Do we openly express appreciation for our children’s efforts and kindness?'],
      teacherQuestions: ['Can we include an “Appreciation Circle” on Friday afternoons in class?'],
      rubric: {
        beginner: 'Takes others for granted and rarely says thank you.',
        developing: 'Says thank you only when reminded by adults.',
        proficient: 'Spontaneously gives genuine, specific appreciation every day.',
        master: 'Creates an atmosphere of gratitude and upliftment wherever they go.'
      }
    },
    ta: {
      name: 'வெளிப்படையான பாராட்டு',
      tagline: 'பெற்றோர், ஆசிரியர் மற்றும் நண்பர்களுக்குத் தினமும் மனமார்ந்த பாராட்டு தெரிவித்தல்.',
      whyItMatters: 'பிறரின் நற்செயல்களை வாய்விட்டுப் பாராட்டுவது உறவுகளை பலப்படுத்துகிறது. மனதில் அன்பையும் மகிழ்ச்சியையும் பெருக்கி அனைவரையும் உற்சாகப்படுத்துகிறது.',
      story: 'பிரியா தன் தாய் தினமும் கஷ்டப்பட்டு சமைப்பதை கவனித்தாள். ஒரு நாள் தாயைக் கட்டியணைத்து "அம்மா, தினமும் எனக்காக அன்போடு சமைத்துத் தருவதற்கு நன்றி" என்றாள். தாயின் கண்களில் வழிந்த ஆனந்தக் கண்ணீர் அவளுக்குப் பாராட்டுகளின் சக்தியை உணர்த்தியது!',
      dailyPractice: 'தினமும் ஒருவரின் கண்களைப் பார்த்து மனதார ஒரு பாராட்டையோ நன்றியையோ வாய்விட்டுச் சொல்.',
      weeklyChallenge: 'இந்த வாரத்தில் 7 வெவ்வேறு நபர்களுக்கு மனமார்ந்த பாராட்டைத் தெரிவி.',
      monthlyMission: 'உனக்குப் பிடித்த ஆசிரியர் அல்லது தாத்தா-பாட்டிக்கு கைப்பட ஒரு நன்றி கடிதம் எழுது.',
      reflectionQuestions: ['நீ பாராட்டிய போது மற்றவர்களின் முகம் எவ்வாறு மலர்ந்தது?', 'உன் மனம் எவ்வளவு மகிழ்ச்சியாக இருந்தது?'],
      parentQuestions: ['குழந்தைகளின் சிறு முயற்சிகளையும் நாம் வாய்விட்டுப் பாராட்டுகிறோமா?'],
      teacherQuestions: ['வகுப்பில் வெள்ளிக்கிழமை தோறும் "பாராட்டு வட்டம்" அமைத்துப் பேசலாமா?'],
      rubric: {
        beginner: 'மற்றவர்களின் உழைப்பை உணராமல் நன்றி கூற மறுக்கிறார்.',
        developing: 'பெரியவர்கள் கூறினால் மட்டும் நன்றி சொல்கிறார்.',
        proficient: 'தானாகவே தினமும் மற்றவர்களை மனதாரப் பாராட்டுகிறார்.',
        master: 'அனைவரையும் ஊக்கப்படுத்தி அன்பான சூழலை உருவாக்குகிறார்.'
      }
    }
  },

  B2_E1: {
    id: 'B2_E1', dim: 'E',
    en: {
      name: 'Daily Kind Act',
      tagline: 'Perform one secret or selfless helpful deed with zero expectation.',
      whyItMatters: 'Selfless kindness stimulates the vagus nerve and activates the brain’s altruism center, fostering empathy and making you an emotionally secure, trustworthy friend.',
      story: 'Ashwin saw a classmate drop and scatter his pencils. While others laughed, Ashwin quietly knelt down, helped collect every pencil, and shared a warm smile. That small kind act forged a lifelong best friendship.',
      dailyPractice: 'Perform at least one kind, helpful action every day without asking for reward or praise.',
      weeklyChallenge: 'Do a “Secret Kindness Agent” mission: complete 5 helpful deeds without getting caught.',
      monthlyMission: 'Organize a community or school kindness project with friends.',
      reflectionQuestions: ['How did performing kindness without seeking credit feel?', 'Who can you help tomorrow?'],
      parentQuestions: ['Can we celebrate daily acts of quiet kindness in our home?'],
      teacherQuestions: ['Can we recognize quiet acts of empathy and service in the school?'],
      rubric: {
        beginner: 'Helps only when offered a reward or prize.',
        developing: 'Helps when directly asked by adults.',
        proficient: 'Proactively spots opportunities to help and acts with kindness.',
        master: 'Instinctively compassionate; leads peer kindness initiatives.'
      }
    },
    ta: {
      name: 'தினசரி நற்செயல் (அன்புப் பணி)',
      tagline: 'எதிர்பார்ப்பின்றி தினமும் ஒருவருக்கு செய்யும் இரக்கமுள்ள நற்செயல்.',
      whyItMatters: 'எதிர்பார்ப்பின்றி பிறருக்கு உதவுவது சுயநலத்தை நீக்கி இரக்க குணத்தை வளர்க்கிறது. இது உங்களை அனைவரும் விரும்பும் நல்ல மனிதராக மாற்றுகிறது.',
      story: 'அஸ்வின் தன் நண்பனின் பென்சில் பெட்டி கீழே விழுந்து சிதறியபோது, மற்றவர்கள் சிரித்தபோதும் அவன் உடனே குனிந்து பொறுக்கி எடுத்துக்கொடுத்து உதவினான். அந்தச் சிறு உதவி அவர்களின் நட்பை ஆழமாக்கியது!',
      dailyPractice: 'எந்தப் பாராட்டையும் எதிர்பார்க்காமல் தினமும் ஒருவருக்கு ஏதேனும் ஒரு சிறு உதவி செய்.',
      weeklyChallenge: 'யாரும் அறியாமல் ரகசியமாக 5 நற்செயல்களை இந்த வாரம் செய்து பார்.',
      monthlyMission: 'நண்பர்களோடு சேர்ந்து பள்ளி அல்லது ஊருக்கு ஒரு நற்செயல் திட்டத்தைச் செய்.',
      reflectionQuestions: ['எதிர்பார்ப்பின்றி உதவிய போது மனதில் என்ன அமைதி கிடைத்தது?', 'நாளை நீ யாருக்கு உதவலாம்?'],
      parentQuestions: ['வீட்டில் குழந்தைகள் செய்யும் சிறு நற்செயல்களைப் பாராட்டுகிறோமா?'],
      teacherQuestions: ['பள்ளியில் இரக்கத்தோடு உதவும் மாணவர்களை அடையாளம் கண்டு பாராட்டலாமா?'],
      rubric: {
        beginner: 'பரிசு கொடுத்தால் மட்டுமே உதவுகிறார்.',
        developing: 'பெரியவர்கள் சொன்னால் உதவுகிறார்.',
        proficient: 'தானாகவே முன்வந்து தினமும் நற்செயல்களைச் செய்கிறார்.',
        master: 'கருணை உள்ளத்தோடு செயல்பட்டு மற்றவர்க்கும் அன்பைப் பரப்புகிறார்.'
      }
    }
  },

  B2_E2: {
    id: 'B2_E2', dim: 'E',
    en: {
      name: 'Family connect or Quality Sharing time (At dinner time without mobiles)',
      tagline: '15 minutes of uninterrupted, screen-free family conversation at dinner.',
      whyItMatters: 'Daily family connection without mobile distractions builds deep psychological safety in children, strengthening resilience against peer pressure and anxiety.',
      story: 'In Harish’s house, dinner was silent with everyone staring at their own phone screens. Harish suggested a “Phone Basket” rule at 7 PM. Soon, dinner was filled with laughter, stories of school adventures, and genuine warmth.',
      dailyPractice: 'Sit with your family for dinner with all phones parked away. Share the highlight of your day and listen to others.',
      weeklyChallenge: 'Achieve 5 screen-free family dinner conversations this week.',
      monthlyMission: 'Plan and host a special family weekend cooking or story-sharing evening.',
      reflectionQuestions: ['What surprising or funny thing did you learn about your parents today?', 'How did it feel to have everyone’s full attention?'],
      parentQuestions: ['Are we willing to keep our work phones completely away during family dinner?'],
      teacherQuestions: ['How can we encourage students to interview their parents about their childhood memories?'],
      rubric: {
        beginner: 'Insists on watching mobile screens or TV while eating.',
        developing: 'Participates in dinner conversation with occasional reminders.',
        proficient: 'Enthusiastically connects with family without any devices at meals.',
        master: 'Champions family bonding traditions and creates meaningful family memories.'
      }
    },
    ta: {
      name: 'குடும்பத்தோடு பகிர்தல் (திரையில்லா இரவு உணவு)',
      tagline: 'இரவு உணவு நேரத்தில் மொபைல் போன்கள் இன்றி 15 நிமிடங்கள் குடும்பத்தோடு உரையாடுதல்.',
      whyItMatters: 'மொபைல் போன் இன்றி குடும்பத்தோடு பேசுவது மனதிற்குப் பாதுகாப்பையும் தன்னம்பிக்கையையும் தருகிறது. குழந்தைகளின் மன அழுத்தத்தைக் குறைத்து குடும்பப் பிணைப்பை பலப்படுத்துகிறது.',
      story: 'ஹரிஷ் வீட்டில் அனைவரும் உணவின் போது மொபைலைப் பார்த்துக்கொண்டிருந்தனர். ஹரிஷ் "மொபைல் கூடை" விதியை அறிமுகப்படுத்தினான். உணவின் போது அனைவரும் தங்கள் அன்றாட அனுபவங்களைப் பேசிச் சிரித்து மகிழ்ந்தனர்!',
      dailyPractice: 'இரவு உணவின் போது மொபைல் திரைகளை ஒதுக்கி வைத்துவிட்டு, குடும்பத்தோடு 15 நிமிடங்கள் மனம் திறந்து பேசு.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 நாட்கள் திரையில்லா குடும்ப இரவு உணவு வழக்கத்தைக் கடைப்பிடி.',
      monthlyMission: 'குடும்பத்தோடு சேர்ந்து ஒரு சிறப்பு கதைப் பகிர்வு அல்லது சமையல் மாலைப் பொழுதை நடத்து.',
      reflectionQuestions: ['குடும்பத்தோடு பேசியபோது என்ன புதிய விஷயம் தெரிந்தது?', 'அனைவரின் கவனமும் உன்னிடம் இருந்தபோது என்ன உணர்ந்தாய்?'],
      parentQuestions: ['உணவு வேளையில் நாமும் பணி சார்ந்த அழைப்புகளைத் தள்ளி வைக்கிறோமா?'],
      teacherQuestions: ['பெற்றோரின் குழந்தைப் பருவ நினைவுகளைப் பற்றி மாணவர்களைப் பேச வைக்கலாமா?'],
      rubric: {
        beginner: 'சாப்பிடும் போது மொபைல் அல்லது டிவி வேண்டும் என அடம்பிடிக்கிறார்.',
        developing: 'நினைவூட்டும்போது உரையாடலில் இணைகிறார்.',
        proficient: 'திரைகள் இன்றி குடும்பத்தோடு மகிழ்ந்து உரையாடுகிறார்.',
        master: 'குடும்ப பிணைப்பை மதித்து உறவுகளைப் பேணிப் பாதுகாக்கிறார்.'
      }
    }
  },

  B2_E3: {
    id: 'B2_E3', dim: 'E',
    en: {
      name: 'Sorry fast, Forgive faster',
      tagline: 'Apologize within 60 seconds when wrong; drop grudges instantly.',
      whyItMatters: 'Holding onto anger and grudges burns mental energy and spikes cortisol. Quick apologies drop the ego, and instant forgiveness heals hearts and restores peace.',
      story: 'Siddharth accidentally tore his brother’s notebook and initially blamed the wind. Remembering the 60-second rule, he looked into his brother’s eyes and said: “I made a mistake, I am truly sorry.” His brother smiled and hugged him, ending the tension instantly.',
      dailyPractice: 'If you make a mistake or hurt someone, apologize sincerely within 60 seconds. If someone hurts you, forgive them immediately without holding bitterness.',
      weeklyChallenge: 'Practice zero grudges for 7 days; resolve any conflict before going to sleep.',
      monthlyMission: 'Identify an old misunderstanding and offer genuine reconciliation.',
      reflectionQuestions: ['How light does your heart feel after saying sorry sincerely?', 'Why is forgiving someone a gift to your own peace?'],
      parentQuestions: ['Do we apologize to our children when we make mistakes or lose patience?'],
      teacherQuestions: ['How can we guide restorative conflict resolution in the classroom?'],
      rubric: {
        beginner: 'Stubborn; argues, blames others, and holds long grudges.',
        developing: 'Apologizes only after prolonged parental intervention.',
        proficient: 'Quickly apologizes when wrong and readily forgives others.',
        master: 'Acts as a peacemaker among peers; dissolves tension with grace.'
      }
    },
    ta: {
      name: 'மன்னிப்பு உடனே, மறப்பது மிக விரைவாக',
      tagline: 'தவறு செய்தால் 60 நொடிகளில் மன்னிப்புக் கேட்டல், மனக்கசப்புகளை உடனே மறத்தல்.',
      whyItMatters: 'கோபத்தையும் மனக்கசப்பையும் சுமப்பது மன அமைதியைக் கெடுக்கும். ஈகோ இல்லாமல் உடனே மன்னிப்புக் கேட்பதும், பிறரை மன்னிப்பதும் மனதை லேசாக்கி அமைதியைத் தருகிறது.',
      story: 'சித்தார்த் தன் தம்பியின் நோட்டை தவறுதலாகக் கிழித்துவிட்டு முதலில் மறைத்தான். பிறகு உடனே "தம்பி, என் தவறுதான், என்னை மன்னித்துவிடு" என்றான். தம்பி உடனே சிரித்துக் கட்டிப்பிடித்துக்கொண்டான்; பிரச்சனை நொடியில் தீர்ந்தது!',
      dailyPractice: 'தவறு செய்தால் 60 நொடிக்குள் "மன்னித்துவிடு" என்று சொல். பிறர் தவறிழைத்தால் மனக்கசப்பு இன்றி உடனே மன்னித்துவிடு.',
      weeklyChallenge: 'இந்த வாரத்தின் 7 நாட்களும் எவர் மீதும் கோபம் வைக்காமல் இரவுக்குள் பேசித் தீர்த்துவிடு.',
      monthlyMission: 'பழைய மனக்கசப்பு ஏதேனும் இருந்தால் அதை மறந்து நேசக் கரம் நீட்டு.',
      reflectionQuestions: ['மன்னிப்புக் கேட்ட பிறகு மனம் எவ்வளவு லேசானது?', 'மன்னிப்பது நமக்கு எப்படி நிம்மதியைத் தருகிறது?'],
      parentQuestions: ['நாமும் தவறு செய்தால் குழந்தைகளிடம் மன்னிப்புக் கேட்கிறோமா?'],
      teacherQuestions: ['வகுப்பறையில் சமாதானம் செய்து வைக்கும் பண்பை வளர்க்கிறோமா?'],
      rubric: {
        beginner: 'தவற்றை ஒப்புக் கொள்ளாமல் வீண் பிடிவாதம் பிடிக்கிறார்.',
        developing: 'வற்புறுத்தினால் மட்டும் மன்னிப்புக் கேட்கிறார்.',
        proficient: 'உடனே தவற்றை உணர்ந்து மன்னிப்புக் கேட்டு பிறரையும் மன்னிக்கிறார்.',
        master: 'நண்பர்களுக்கு இடையே சமாதானத் தூதுவராக விளங்கி அன்பைப் பரப்புகிறார்.'
      }
    }
  },

  B2_E4: {
    id: 'B2_E4', dim: 'E',
    en: {
      name: 'Pause button (S-R-R: Stimuli -> Reflection -> React)',
      tagline: 'Take 3 deep breaths: Stimuli -> Reflection -> Conscious Response.',
      whyItMatters: 'Between a trigger (stimulus) and your reaction lies your power to choose. Pressing the mental pause button prevents knee-jerk anger and gives control back to your rational prefrontal cortex.',
      story: 'When someone bumped into Divya in the hallway, she felt like screaming. Instead, she pressed her invisible pause button, took 3 slow belly breaths, and asked: “Are you okay?” What could have been an ugly fight turned into a respectful moment.',
      dailyPractice: 'Whenever angry or frustrated, freeze for 5 seconds. Take 3 deep breaths: Stimuli -> Reflection -> Conscious Response.',
      weeklyChallenge: 'Successfully press the pause button during 3 tense moments this week without losing your cool.',
      monthlyMission: 'Master the S-R-R technique so thoroughly that calm responses become your natural reflex.',
      reflectionQuestions: ['What happened in your body when you took 3 slow breaths before reacting?', 'How did pausing save you from saying hurtful words?'],
      parentQuestions: ['Do we pause and take deep breaths before responding when frustrated at home?'],
      teacherQuestions: ['Can we teach the 5-second Pause Button technique as a school-wide emotional tool?'],
      rubric: {
        beginner: 'Reacts impulsively with shouting or slamming doors.',
        developing: 'Pauses occasionally when reminded by adults.',
        proficient: 'Consistently uses the S-R-R pause button during stressful moments.',
        master: 'Exemplifies supreme emotional poise and calms heated peer disputes.'
      }
    },
    ta: {
      name: 'இடைநிறுத்த பொத்தான் (S-R-R உத்தி)',
      tagline: 'தூண்டல் -> சிந்தனை -> செயல்: கோபத்தில் 3 முறை மூச்சை இழுத்து நிதானித்தல்.',
      whyItMatters: 'தூண்டலுக்கும் நமது எதிர்வினைக்கும் இடையே சிந்திக்கும் இடைவெளி உள்ளது. அவசரப்பட்டு கோபப்படாமல் 5 நொடிகள் இடைநிறுத்துவது புத்திசாலித்தனமான முடிவை எடுக்க வைக்கிறது.',
      story: 'திவ்யா மீது ஒருவன் மோதியபோது அவளுக்குக் கோபம் வந்தது. உடனே தன் மன இடைநிறுத்த பொத்தானை அழுத்தி, 3 முறை மூச்சை இழுத்துவிட்டு "உனக்கு ஒன்றும் ஆகவில்லையே?" என்று கனிவோடு கேட்டாள். பெரிய சண்டை அங்கே சமாதானமானது!',
      dailyPractice: 'கோபம் அல்லது பதற்றம் வரும்போது 5 நொடிகள் நில். 3 முறை ஆழ்ந்து மூச்சு விடு: தூண்டல் -> சிந்தனை -> தெளிவான எதிர்வினை.',
      weeklyChallenge: 'இந்த வாரத்தில் கோபம் வரும் 3 தருணங்களில் நிதானித்து அமைதியாக எதிர்வினையாற்று.',
      monthlyMission: 'S-R-R உத்தியை உனது இயல்பான குணமாக மாற்றி அமைதியைக் கடைப்பிடி.',
      reflectionQuestions: ['மூச்சை இழுத்துவிட்ட பிறகு கோபம் குறைந்ததா?', 'நிதானித்ததால் என்ன தவறு தவிர்க்கப்பட்டது?'],
      parentQuestions: ['கோபம் வரும்போது நாமும் நிதானித்து அமைதியாகப் பேசுகிறோமா?'],
      teacherQuestions: ['மாணவர்களுக்கு 5-நொடி இடைநிறுத்த உத்தியை உணர்ச்சி மேலாண்மையாகக் கற்பிக்கலாமா?'],
      rubric: {
        beginner: 'உணர்ச்சிகளைக் கட்டுப்படுத்த முடியாமல் உடனே கோபப்படுகிறார்.',
        developing: 'நினைவூட்டும்போது மூச்சை இழுத்து நிதானிக்கிறார்.',
        proficient: 'பதற்றமான சூழலிலும் S-R-R உத்தியைப் பயன்படுத்தி அமைதியாக இருக்கிறார்.',
        master: 'அற்புதமான உணர்ச்சி முதிர்ச்சியோடு செயல்பட்டு மற்றவர்க்கும் அமைதியைத் தருகிறார்.'
      }
    }
  },

  // ==========================================
  // 5. FINANCIALLY WEALTHY
  // ==========================================
  B2_F0: {
    id: 'B2_F0', dim: 'F',
    en: {
      name: 'Goal Piggy (Delayed Gratification)',
      tagline: 'Save coins toward one meaningful dream goal; delay impulse purchases.',
      whyItMatters: 'Immediate gratification leads to empty pockets and impulsiveness. Saving toward a targeted goal trains the patience muscle that underpins all financial success.',
      story: 'Kiran received small pocket coins from his grandparents. Instead of buying cheap candies, he labeled a piggy bank: “My Telescope Fund.” After six months of disciplined saving, he bought his own astronomical telescope and gazed at Saturn’s rings!',
      dailyPractice: 'Drop spare coins or earnings into your Goal Piggy bank toward your chosen target. Resist spending on impulsive temptations.',
      weeklyChallenge: 'Deposit into your Goal Piggy on 5 days this week without spending a single rupee on junk snacks.',
      monthlyMission: 'Reach 25% of your target savings goal and review your progress.',
      reflectionQuestions: ['How excited do you feel when your Goal Piggy grows heavier?', 'Why is waiting for something big better than buying small candies?'],
      parentQuestions: ['Can we help our child label a tangible goal on their piggy bank?'],
      teacherQuestions: ['Can we teach goal-based savings through classroom project banks?'],
      rubric: {
        beginner: 'Spends money instantly on snacks or toys.',
        developing: 'Saves coins only when parents directly instruct.',
        proficient: 'Consistently saves toward a defined dream goal independently.',
        master: 'Understands delayed gratification and inspires siblings to save.'
      }
    },
    ta: {
      name: 'இலக்கு உண்டியல் (தாமத திருப்தி)',
      tagline: 'ஒரு பெரிய கனவு இலக்குக்காக சிறு நாணயங்களைச் சேமித்தல், வீண் செலவைத் தவிர்த்தல்.',
      whyItMatters: 'உடனடி ஆசைகளுக்காக பணத்தை செலவழிப்பது சேமிப்பைக் கரைக்கும். ஒரு பெரிய இலக்கிற்காகப் பொறுமையோடு சேமிப்பது எதிர்கால நிதி சுதந்திரத்திற்கு அடித்தளமிடுகிறது.',
      story: 'கிரண் தாத்தா கொடுத்த சிறு சில்லறைகளை மிட்டாய் வாங்கி வீணாக்காமல் "வானியல் தொலைநோக்கி" உண்டியலில் சேர்த்தான். 6 மாதங்களில் பணத்தைச் சேர்த்து தன் சொந்த தொலைநோக்கியை வாங்கி வானத்து நிலவைப் பார்த்து மகிழ்ந்தான்!',
      dailyPractice: 'கிடைக்கும் சிறு நாணயங்களை உன் இலக்கு உண்டியலில் போடு. தேவையற்ற உடனடி ஆசைகளைத் தள்ளிப்போடு.',
      weeklyChallenge: 'இந்த வாரத்தில் 5 நாட்கள் வீண் செலவு செய்யாமல் உண்டியலில் சேமி.',
      monthlyMission: 'உனது சேமிப்பு இலக்கில் 25% தொகையை எட்டிப் பார்.',
      reflectionQuestions: ['உண்டியலின் எடை கூடும்போது என்ன மகிழ்ச்சி ஏற்படுகிறது?', 'பெரிய கனவுக்காகக் காத்திருப்பது ஏன் சிறந்தது?'],
      parentQuestions: ['குழந்தையின் உண்டியலில் ஒரு பெரிய இலக்கை எழுதி ஒட்டி வைக்கலாமா?'],
      teacherQuestions: ['வகுப்பறையில் இலக்கு சேமிப்பு பற்றிய விழிப்புணர்வை ஏற்படுத்தலாமா?'],
      rubric: {
        beginner: 'பணம் கிடைத்தவுடன் உடனே மிட்டாய் வாங்கிச் செலவழிக்கிறார்.',
        developing: 'பெற்றோர் சொன்னால் மட்டும் உண்டியலில் போடுகிறார்.',
        proficient: 'சுயமாக தன் இலக்குக்காக தொடர்ந்து சேமிக்கிறார்.',
        master: 'தாமத திருப்தியின் நன்மையை உணர்ந்து நிதி ஒழுக்கத்தைக் கடைப்பிடிக்கிறார்.'
      }
    }
  },

  B2_F1: {
    id: 'B2_F1', dim: 'F',
    en: {
      name: 'Price Detective',
      tagline: 'Compare prices across stores and check unit values before purchasing.',
      whyItMatters: 'Smart consumers do not buy the first item they see. Investigating prices, checking weights, and comparing unit costs protects your wealth from clever marketing tricks.',
      story: 'When shopping for school stationery, Tanvi acted as the family Price Detective. She discovered that buying a 5-pack of notebooks was 30% cheaper per page than individual books, saving her family 150 rupees!',
      dailyPractice: 'Whenever buying anything or visiting a market, check two different brands or shops and compare price per unit.',
      weeklyChallenge: 'Find 3 instances where comparing prices saved your family money.',
      monthlyMission: 'Analyze a monthly grocery bill to identify top 3 smart-budget savings.',
      reflectionQuestions: ['What did you discover when comparing two similar products?', 'How do shops try to trick people with flashy packaging?'],
      parentQuestions: ['Can we invite our child to be the official “Price Detective” on grocery trips?'],
      teacherQuestions: ['Can we run a practical math lesson on comparing unit costs in class?'],
      rubric: {
        beginner: 'Grabs items based solely on cartoon packaging or advertising.',
        developing: 'Checks prices when prompted by parents.',
        proficient: 'Independently compares prices and calculates value per unit.',
        master: 'Demonstrates exceptional consumer intelligence and spots deceptive deals.'
      }
    },
    ta: {
      name: 'விலை துப்பறிவாளர் (Price Detective)',
      tagline: 'பொருட்களின் தரம் மற்றும் விலையை ஒப்பிட்டுப் பார்த்து வாங்குதல்.',
      whyItMatters: 'பார்த்த முதல் பொருளையே வாங்காமல், வெவ்வேறு கடைகளிலும் பிராண்டுகளிலும் விலையையும் அளவையும் ஒப்பிட்டுப் பார்ப்பது புத்திசாலித்தனமான சேமிப்பாகும்.',
      story: 'தான்வி கடைக்குச் சென்றபோது 5 நோட்டுப் புத்தகங்கள் அடங்கிய தொகுப்பை ஒப்பிட்டுப் பார்த்தாள். தனித்தனியாக வாங்குவதை விட 150 ரூபாய் மிச்சமானது! அவளது குடும்பத்தினர் அவளை "விலை துப்பறிவாளர்" எனப் பாராட்டினர்!',
      dailyPractice: 'எந்தப் பொருளை வாங்கும் முன்பும் அதன் எடை மற்றும் விலையை இரு வேறு பொருட்களோடு ஒப்பிட்டுப் பார்.',
      weeklyChallenge: 'இந்த வாரத்தில் விலையை ஒப்பிட்டுப் பார்த்து குடும்பத்திற்குப் பணத்தை மிச்சப்படுத்து.',
      monthlyMission: 'மாத மளிகைப் பட்டியலை ஆய்வு செய்து 3 சிக்கன வழிகளைக் கண்டறி.',
      reflectionQuestions: ['விலையை ஒப்பிட்டபோது என்ன புதிய தகவல் தெரிந்தது?', 'விளம்பரங்கள் நம்மை எவ்வாறு ஏமாற்றுகின்றன?'],
      parentQuestions: ['கடைக்குச் செல்லும்போது குழந்தையை "விலை துப்பறிவாளர்" ஆக்கலாமா?'],
      teacherQuestions: ['வகுப்பில் நடைமுறை கணக்குப் பாடமாக விலை ஒப்பீட்டுப் பயிற்சியைத் தரலாமா?'],
      rubric: {
        beginner: 'விளம்பரப் படங்களைப் பார்த்து எதையும் வாங்க அடம் பிடிக்கிறார்.',
        developing: 'பெற்றோர் கூறும்போது விலையை ஒப்பிடுகிறார்.',
        proficient: 'சுயமாக விலையையும் தரத்தையும் ஒப்பிட்டுப் பார்த்துத் தேர்வு செய்கிறார்.',
        master: 'சிறந்த விவேகமுள்ள நுகர்வோராக விளங்கி குடும்பத்திற்குப் பணம் சேமிக்கிறார்.'
      }
    }
  },

  B2_F2: {
    id: 'B2_F2', dim: 'F',
    en: {
      name: 'Need vs Want',
      tagline: 'Ask twice: “Is this an essential Need or a temporary Want?”',
      whyItMatters: 'Needs keep you alive and thriving; wants are fleeting desires created by mood and marketing. Distinguishing the two gives you emotional mastery over your money.',
      story: 'Suresh begged for an expensive branded water bottle because his friend had one. His mother said: “Let’s wait 48 hours and ask: is it a need or a want?” Two days later, he realized his current bottle worked perfectly and chose to save the money instead.',
      dailyPractice: 'Before buying or asking for anything, ask twice: “Is this an essential Need or a temporary Want?” Wait 24 hours for wants.',
      weeklyChallenge: 'Identify 3 things you wanted this week, pause, and decide which ones were purely temporary wants.',
      monthlyMission: 'Categorize your household’s monthly expenses into Needs and Wants with parents.',
      reflectionQuestions: ['What is the difference between a need and a want?', 'How did waiting 24 hours change your desire for a toy or snack?'],
      parentQuestions: ['Do we guide our child through the 24-hour cooling-off rule for wants?'],
      teacherQuestions: ['Can we lead a classroom sorting game classifying items into Needs vs Wants?'],
      rubric: {
        beginner: 'Demands every passing want as if it were an urgent need.',
        developing: 'Recognizes wants after parents explain.',
        proficient: 'Independently applies the 24-hour rule to filter wants from needs.',
        master: 'Champions conscious spending and prioritizes true needs with maturity.'
      }
    },
    ta: {
      name: 'தேவை vs ஆசை (Need vs Want)',
      tagline: '"இது அத்தியாவசிய தேவையா அல்லது தற்காலிக ஆசையா?" என இருமுறை கேட்டல்.',
      whyItMatters: 'தேவை என்பது வாழ்வதற்கு அவசியமானது; ஆசை என்பது தற்காலிக ஆசை. இவ்விரண்டையும் பிரித்தறியும் விவேகமே பணத்தை சரியான வழியில் நிர்வகிக்க உதவும்.',
      story: 'சுரேஷ் நண்பனைப் பார்த்து ஒரு விலையுயர்ந்த பாட்டிலை உடனே வாங்க வேண்டும் என்றான். தாய் "2 நாட்கள் கழித்து முடிவெடுப்போம், இது தேவையா ஆசையா?" என்றார். 2 நாட்கள் கழித்து பழைய பாட்டிலே நன்றாக இருப்பதால் பணம் மிச்சமானது!',
      dailyPractice: 'எதையும் வாங்கும் முன் இருமுறை கேள்: "இது எனது அத்தியாவசிய தேவையா அல்லது தற்காலிக ஆசையா?" ஆசைகளுக்கு 24 மணி நேரம் காத்திரு.',
      weeklyChallenge: 'இந்த வாரத்தில் நீ ஆசைப்பட்ட 3 விஷயங்களில் எவை தற்காலிக ஆசை எனப் பிரித்துப் பார்.',
      monthlyMission: 'வீட்டுச் செலவுகளில் எவை தேவைகள், எவை ஆசைகள் என பெற்றோருடன் அமர்ந்து வகைப்படுத்து.',
      reflectionQuestions: ['தேவைக்கும் ஆசைக்கும் உள்ள முக்கிய வேறுபாடு என்ன?', '24 மணி நேரம் காத்திருந்தபோது ஆசை குறைந்ததா?'],
      parentQuestions: ['பொருட்கள் வாங்கும் முன் 24 மணி நேர காத்திருப்பு விதியைக் கற்றுக்கொடுக்கிறோமா?'],
      teacherQuestions: ['வகுப்பறையில் தேவை vs ஆசை பற்றிய வகைப்படுத்தும் விளையாட்டை நடத்தலாமா?'],
      rubric: {
        beginner: 'பார்த்ததையெல்லாம் உடனே வேண்டும் என அடம்பிடிக்கிறார்.',
        developing: 'பெற்றோர் விளக்கினால் ஆசையைக் கட்டுப்படுத்துகிறார்.',
        proficient: 'சுயமாக 24 மணி நேர விதியைப் பயன்படுத்தி ஆசைகளை வடிகட்டுகிறார்.',
        master: 'விவேகத்தோடு தேவைகளுக்கு முன்னுரிமை தந்து பணத்தைச் சேமிக்கிறார்.'
      }
    }
  },

  B2_F3: {
    id: 'B2_F3', dim: 'F',
    en: {
      name: '3 Jar Allocation System (Save: 50%, Spend: 40%, Give: 10%)',
      tagline: 'Split every rupee received into 50% Save, 40% Spend, 10% Give.',
      whyItMatters: 'Allocating money before spending builds automatic wealth habits. 50% builds your future, 40% covers daily living and guilt-free spending, and 10% gives back to society.',
      story: 'When Aakash received 100 rupees for festival gift, he split it immediately: 50 in his Save Jar, 40 in his Spend Jar for drawing pens, and 10 in his Give Jar to buy biscuits for stray puppies. He felt wealthy, responsible, and generous!',
      dailyPractice: 'Whenever you receive any pocket money, cash gifts, or chore earnings, divide it immediately into 50% Save, 40% Spend, 10% Give.',
      weeklyChallenge: 'Maintain your 3 jars with 100% accurate allocation records this week.',
      monthlyMission: 'Use your Give Jar money to perform a meaningful act of charity in your community.',
      reflectionQuestions: ['How does having 3 separate jars give you peace of mind?', 'How did sharing money from your Give Jar feel?'],
      parentQuestions: ['Can we help our child set up 3 labeled physical jars or envelopes at home?'],
      teacherQuestions: ['Can we teach the 50/40/10 jar formula as foundational financial literacy in class?'],
      rubric: {
        beginner: 'Spends 100% of received money immediately.',
        developing: 'Divides money into jars only when supervised.',
        proficient: 'Routinely divides all money into 50% Save, 40% Spend, 10% Give.',
        master: 'Exemplifies financial balance and inspires others to give and save.'
      }
    },
    ta: {
      name: '3 உண்டியல் ஒதுக்கீட்டு முறை (50/40/10)',
      tagline: 'கிடைக்கும் பணத்தை சேமிப்பு 50%, செலவு 40%, ஈகை 10% என பிரித்தல்.',
      whyItMatters: 'பணத்தைப் பிரித்து நிர்வகிப்பதே செல்வத்தின் அடிப்படை விதி. 50% சேமிப்பு எதிர்காலத்தைப் பாதுகாக்கிறது, 40% தேவைகளை நிறைவேற்றுகிறது, 10% பிறருக்கு உதவும் மனநிறைவைத் தருகிறது.',
      story: 'ஆகாஷுக்கு பரிசாகக் கிடைத்த 100 ரூபாயை 3 உண்டியல்களில் பிரித்தான்: 50 ரூபாய் சேமிப்புக்கு, 40 ரூபாய் வரைபட பென்சிலுக்கு, 10 ரூபாய் ஆதரவற்ற நாய்க்குட்டிகளுக்கு பிஸ்கட் வாங்க! அவன் மனம் பெருமிதத்தால் நிறைந்தது!',
      dailyPractice: 'கிடைக்கும் எந்தப் பணத்தையும் உடனே 50% சேமிப்பு, 40% செலவு, 10% ஈகை என 3 உண்டியல்களில் பிரித்துப் போடு.',
      weeklyChallenge: 'இந்த வாரம் கிடைத்த தொகையை 3 உண்டியல்களில் சரியாகப் பிரித்து வை.',
      monthlyMission: 'உனது ஈகை உண்டியல் பணத்தைக் கொண்டு ஏழை எளியவருக்கு ஏதேனும் ஒரு உதவி செய்.',
      reflectionQuestions: ['3 உண்டியல்களில் பிரித்து வைத்தபோது என்ன பொறுப்புணர்ச்சி வந்தது?', 'ஈகை உண்டியல் பணம் கொடுத்தபோது என்ன உணர்ந்தாய்?'],
      parentQuestions: ['வீட்டில் 3 உண்டியல்கள் அல்லது கவர்களை பெயரிட்டு வைக்க உதவலாமா?'],
      teacherQuestions: ['பள்ளியில் 50/40/10 நிதி ஒதுக்கீட்டு முறையை மாணவர்களுக்குக் கற்பிக்கலாமா?'],
      rubric: {
        beginner: 'கிடைத்த பணத்தை உடனே செலவழிக்கிறார்.',
        developing: 'பெரியவர்கள் கூறினால் பணத்தைப் பிரிக்கிறார்.',
        proficient: 'சுயமாக பணத்தை 50/40/10 என பிரித்து வைக்கிறார்.',
        master: 'சிறந்த நிதித் திட்டமிடலோடு சேமித்து, செலவழித்து, பிறருக்கும் உதவுகிறார்.'
      }
    }
  },

  B2_F4: {
    id: 'B2_F4', dim: 'F',
    en: {
      name: 'Learning Money Concept',
      tagline: 'Learn how value is created, how banking works, and why money compounds.',
      whyItMatters: 'Money is not paper; it is a representation of value created for others through effort, problem-solving, and skills. Understanding compound interest and investing turns you into a future builder.',
      story: 'Bhavna wondered where ATM money came from. Her father explained: “Money is stored value for work done. When you invest, money works for you day and night.” Bhavna started learning about simple interest and bank savings, determined to become a future entrepreneur!',
      dailyPractice: 'Spend 5 minutes daily reading or discussing one real-world money concept (earning, banking, saving, inflation, compounding).',
      weeklyChallenge: 'Explain to a family member how compound interest or bank savings works.',
      monthlyMission: 'Visit a bank or read an introductory book on junior financial literacy.',
      reflectionQuestions: ['How is money created through solving people’s problems?', 'Why does money saved in a bank grow over time?'],
      parentQuestions: ['Can we discuss how family budgeting and savings work during financial literacy talks?'],
      teacherQuestions: ['Can we run a mini classroom economy where students earn and budget class tokens?'],
      rubric: {
        beginner: 'Believes ATMs print infinite free money without work.',
        developing: 'Understands basic earning when explained by parents.',
        proficient: 'Grasps value creation, bank interest, and smart money stewardship.',
        master: 'Thinks like an entrepreneur and articulates compound growth principles.'
      }
    },
    ta: {
      name: 'நிதி மற்றும் பணக் கருத்துக்களைக் கற்றல்',
      tagline: 'மதிப்பு உருவாக்கம், வங்கிகளின் இயக்கம் மற்றும் கூட்டு வட்டி அறிவியலைக் கற்றல்.',
      whyItMatters: 'பணம் என்பது உழைப்பு மற்றும் சிக்கலைத் தீர்க்கும் திறனுக்குக் கிடைக்கும் மதிப்பு. கூட்டு வட்டியையும் நிதி மேலாண்மையையும் இளமையிலேயே கற்பது எதிர்கால பொருளாதார சுதந்திரத்தைத் தரும்.',
      story: 'பவானா ஏடிஎம் இயந்திரத்திலிருந்து தானாகப் பணம் வருவதாக நினைத்தாள். தந்தை "உழைத்து மதிப்பு உருவாக்கும் போதே வங்கிக் கணக்கில் பணம் சேர்கிறது" என்றார். பவானா வங்கி முறை மற்றும் சேமிப்பு வளர்ச்சியை ஆர்வத்தோடு கற்றுக்கொண்டாள்!',
      dailyPractice: 'தினமும் 5 நிமிடங்கள் பணம், வங்கி, சேமிப்பு அல்லது முதலீடு பற்றிய ஒரு புதிய கருத்தைக் கற்றுக்கொள்.',
      weeklyChallenge: 'சேமிப்பு மற்றும் கூட்டு வட்டி எவ்வாறு செயல்படுகிறது என்பதை குடும்பத்தாரிடம் விளக்கு.',
      monthlyMission: 'வங்கிக்கு நேரில் சென்று அதன் செயல்பாடுகளை அறிந்துகொள் அல்லது சிறுவர் நிதிப் புத்தகத்தைப் படி.',
      reflectionQuestions: ['பிறரின் பிரச்சனைகளைத் தீர்ப்பதன் மூலம் பணம் எப்படி உருவாகிறது?', 'சேமித்த பணம் காலத்தில் எப்படி வளர்கிறது?'],
      parentQuestions: ['வீட்டு வரவு-செலவுத் திட்டத்தைப் பற்றி குழந்தைகளோடு பேசிப் புரியவைக்கலாமா?'],
      teacherQuestions: ['வகுப்பறையில் மாதிரி நாணயங்கள் மூலம் சிறு நிதிப் பொருளாதார விளையாட்டை நடத்தலாமா?'],
      rubric: {
        beginner: 'பணம் எப்படி உழைப்பால் வருகிறது என்பதை அறியாமல் இருக்கிறார்.',
        developing: 'விளக்கினால் எளிய நிதி விஷயங்களைப் புரிந்துகொள்கிறார்.',
        proficient: 'மதிப்பு உருவாக்கம், வங்கி சேமிப்பு மற்றும் நிதி விதிகளில் தெளிவோடு இருக்கிறார்.',
        master: 'தொழில்முனைவோர் சிந்தனையோடு செயல்பட்டு சிறந்த நிதி அறிவைப் பெறுகிறார்.'
      }
    }
  }
};

