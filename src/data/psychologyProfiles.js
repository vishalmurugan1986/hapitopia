// Section 1: Book Introduction & Section 2: Age Psychology Profiles (Ages 7–14, Class 2–8)
// Source of truth: "5x7 Habit Game Framework"

export const BOOK_INTRO = {
  en: {
    welcomeTitle: 'Welcome to The 5×7 Habit Game',
    welcomeLetter: 'Dear Future Leader, Welcome to the ultimate adventure of your life. Habits are your secret superpowers. Every small daily choice (what you drink when you wake up, how you handle a mistake, how you treat a friend) builds the person you will become tomorrow.',
    heroJourneyTitle: 'The Hero’s Journey',
    heroJourneyStory: 'Every great hero in history, from inventors and athletes to leaders and explorers, began as a normal child with simple daily routines. You are the hero of your own story. Your 35 habits are the tools in your quest. Across 5 dimensions, you will level up, face challenges, conquer bosses, and emerge as the CEO of your own life.',
    whyHabitsMatter: 'Goals tell you where you want to go, but habits are the system that actually takes you there. Mastering even 60% of these daily practices transforms how your brain thinks, how your body moves, and how your heart leads.',
    growthMindset: 'Your brain is a muscle that grows every time you practice something difficult. Mistakes are not failures; they are data points on your path to mastery. When you say “I can’t do this yet, but I’m learning,” your potential becomes limitless.',
    gameOverview: '5 Dimensions × 7 Habits = 35 Superpowers. Play daily, track your score each week, earn experience rewards, and graduate the 30-day Capstone challenge.'
  },
  ta: {
    welcomeTitle: '5×7 பழக்க விளையாட்டுக்கு நல்வரவு',
    welcomeLetter: 'அன்பு எதிர்காலத் தலைவரே, உனது வாழ்வின் மகத்தான வெற்றிப் பயணத்திற்கு நல்வரவு. பழக்கங்களே உனது ரகசிய சக்திகள். காலையில் எழும் நேரம், செய்யும் உடற்பயிற்சி, செய்யும் ஒரு நற்செயல் என ஒவ்வொரு சிறிய செயலும் நாளை நீ உருவாகப்போகும் மாபெரும் ஆளுமையைத் தீர்மானிக்கிறது.',
    heroJourneyTitle: 'வீரனின் வெற்றிப் பயணம் (Hero’s Journey)',
    heroJourneyStory: 'வரலாற்றில் முத்திரை பதித்த விஞ்ஞானிகள், விளையாட்டு வீரர்கள், தலைவர்கள் அனைவரும் எளிய அன்றாட பழக்கவழக்கங்களுடன் தொடங்கியவர்களே. நீயே உனது வாழ்வுக் கதையின் கதாநாயகன். 5 பரிமாணங்களில் 35 பழக்கங்களை வளர்த்து, சவால்களை வென்று, உனது வாழ்க்கையின் தலைமை நிர்வாகியாக (CEO) உருவெடுப்பாய்.',
    whyHabitsMatter: 'இலக்குகள் நாம் எங்கு செல்ல வேண்டும் என்று காட்டுகின்றன; ஆனால் பழக்கங்களே நம்மை அங்கு கொண்டு சேர்க்கும் வாகனங்கள். இதில் 60% தேர்ச்சி பெற்றாலே உனது மூளை, உடல், மனம் அனைத்தும் புதிய வலிமையைப் பெறும்.',
    growthMindset: 'வளரும் மனப்பான்மை: உனது மூளை ஒரு தசை போன்றது; கடினமான விஷயங்களைப் பயிற்சி செய்யும்போது அது மேலும் வளர்கிறது. தவறுகள் தோல்விகள் அல்ல, அவை கற்றலுக்கான படிகள். "என்னால் இன்னும் முடியவில்லை, ஆனால் நான் கற்கிறேன்" என்று கூறு.',
    gameOverview: '5 பரிமாணங்கள் × 7 பழக்கங்கள் = 35 நற்பழக்கங்கள். தினமும் விளையாடு, வாரந்தோறும் புள்ளிகள் பெறு, அனுபவப் பரிசுகளை வெல், 30-நாள் கேப்ஸ்டோன் பட்டமளிப்புச் சவாலை முடி.'
  }
};

export const AGE_PROFILES = {
  7: {
    stage: 'Playful Starter',
    stageTa: 'துடிப்பான தொடக்க வீரர்',
    classGrade: 'Class 2',
    theme: 'Highly visual, playful, stories, and cartoons.',
    themeTa: 'வண்ணமயமான காட்சிகள், விளையாட்டு, கதைகள் மற்றும் சித்திரங்கள்.',
    en: {
      cognitive: 'Thinking is concrete and exploratory. Learns best through playful stories, colorful visual cues, and hands-on demonstrations.',
      emotional: 'Needs frequent encouragement and positive reinforcement. Easily overwhelmed by abstract rules; thrives on predictable daily rituals.',
      social: 'Developing peer awareness; learning to take turns and share. Adult presence and validation remain the primary source of security.',
      physical: 'High energy in short bursts. Gross motor skills improving rapidly; fine motor coordination still developing.',
      learning: 'Responds strongly to gamification, colorful habit badges, stickers, and immediate celebration of effort.'
    },
    ta: {
      cognitive: 'கண்களால் பார்த்து, தொட்டு உணர்ந்து, கதைகள் மூலமாக மிக எளிதாகக் கற்கிறார்.',
      emotional: 'அடிக்கடி பாராட்டும் உற்சாகமும் தேவை; தெளிவான அன்பான வழிகாட்டுதலில் சிறந்து விளங்குகிறார்.',
      social: 'நண்பர்களுடன் பகிர்ந்துகொள்ளவும், விட்டுக்கொடுத்து விளையாடவும் கற்றுக்கொள்கிறார்.',
      physical: 'அதிக ஆற்றல் உடையவர்; ஓடி ஆடி விளையாடுவதன் மூலம் உடல்திறன் கூடுகிறது.',
      learning: 'வண்ணமயமான படங்கள், பதக்கங்கள் மற்றும் உடனடி பாராட்டுக்கள் மூலம் ஆர்வத்துடன் கற்கிறார்.'
    }
  },
  8: {
    stage: 'Adventurer',
    stageTa: 'துணிச்சல் வீரர்',
    classGrade: 'Class 3',
    theme: 'Adventure-based quests and discovery missions.',
    themeTa: 'சாகச அடிப்படையிலான இலக்குகள் மற்றும் தேடல் பயணங்கள்.',
    en: {
      cognitive: 'Grasps cause-and-effect relationships. Begins to organize facts and loves solving simple mysteries and puzzles.',
      emotional: 'More resilient during setbacks. Enjoys feeling brave and undertaking "missions" that challenge current limits.',
      social: 'Friendships become cooperative. Values teamwork and fair play in group activities and sports.',
      physical: 'Increased coordination, balance, and stamina. Ready for structured sports drills and movement routines.',
      learning: 'Thrives on quest-based challenges where habits are framed as adventurous milestones.'
    },
    ta: {
      cognitive: 'காரண காரியங்களைப் புரிந்துகொள்ளத் தொடங்குகிறார்; புதிர்களைத் தீர்க்க விரும்புகிறார்.',
      emotional: 'சவால்களை எதிர்கொள்ளும் துணிச்சல் வளர்கிறது; தோல்விகளில் இருந்து மீளக் கற்கிறார்.',
      social: 'கூட்டு விளையாட்டுகளையும், நண்பர்களுடன் இணைந்து செயல்படுவதையும் விரும்புகிறார்.',
      physical: 'உடல் ஒருங்கிணைப்பும் நிலைத்தன்மையும் கூடுகிறது; குறிப்பிட்ட விளையாட்டுகளில் ஈடுபடத் தயார்.',
      learning: 'சவாலான இலக்குகளை ஒரு சாகசப் பயணமாக எதிர்கொள்ளும்போது வேகமாக முன்னேறுகிறார்.'
    }
  },
  9: {
    stage: 'Explorer',
    stageTa: 'ஆராய்ச்சியாளர்',
    classGrade: 'Class 4',
    theme: 'Explorer-based inquiry and curiosity storms.',
    themeTa: 'ஆராய்ச்சி மற்றும் ஆர்வமூட்டும் கேள்வித் தேடல்கள்.',
    en: {
      cognitive: 'Curiosity peaks. Asks frequent "Why" and "How" questions. Capable of classifying information and retaining deeper memory.',
      emotional: 'Begins to self-regulate emotions using language. Can pause and express "I feel... because...".',
      social: 'Stronger empathy and peer loyalty. Understands the viewpoints of others with gentle prompting.',
      physical: 'Refined agility and motor skills. Can maintain 30+ minutes of continuous active sports or cycling.',
      learning: 'Enjoys independent exploration, reading curiosity-driven books, and keeping personal logs.'
    },
    ta: {
      cognitive: 'ஆழ்ந்த ஆர்வம்; "ஏன்", "எப்படி" என்ற கேள்விகளைத் தொடர்ந்து கேட்டு உலகை ஆராய்கிறார்.',
      emotional: 'தன் உணர்வுகளைப் புரிந்து வெளிப்படுத்தும் திறன் கூடுகிறது; பொறுமையைக் கையாள்கிறார்.',
      social: 'நண்பர்களின் உணர்வுகளைப் புரிந்து கொண்டு பழகும் நற்பண்பு வளர்கிறது.',
      physical: 'தொடர்ந்து 30 நிமிடங்கள் சுறுசுறுப்பாக உடற்பயிற்சி அல்லது விளையாட்டில் ஈடுபட முடிகிறது.',
      learning: 'சுயமாகப் புத்தகங்களை வாசிப்பதிலும், புதிய விஷயங்களை அறிவதிலும் ஆர்வம் காட்டுகிறார்.'
    }
  },
  10: {
    stage: 'Builder',
    stageTa: 'உருவாக்குபவர்',
    classGrade: 'Class 5',
    theme: 'Builder-based routines, structure, and tracker charts.',
    themeTa: 'கட்டமைக்கப்பட்ட பழக்கவழக்கங்கள் மற்றும் முன்னேற்ற அட்டவணைகள்.',
    en: {
      cognitive: 'Transition to structured logical thinking. Understands long-term consequences and the value of consistent practice.',
      emotional: 'Pride in personal competence. Ready to take personal ownership of morning and homework routines.',
      social: 'Group identity strengthens. Sensitive to peer feedback; strives to be reliable and responsible.',
      physical: 'Rapid growth phase begins. Needs emphasis on posture, hydration, and wholesome nutrition.',
      learning: 'Self-motivated by tracker charts, scorecards, and building multi-week habit streaks.'
    },
    ta: {
      cognitive: 'தர்க்கரீதியான சிந்தனை வளர்கிறது; திட்டமிட்டு செயல்படுவதன் பலனை உணர்கிறார்.',
      emotional: 'சுய பொறுப்புணர்வு கூடுகிறது; தன் வேலைகளைத் தானே செய்து முடிப்பதில் பெருமை கொள்கிறார்.',
      social: 'நண்பர்கள் மத்தியில் நற்பெயர் பெறவும், பொறுப்புடன் நடக்கவும் விரும்புகிறார்.',
      physical: 'உடல் வளர்ச்சி விரைவடைகிறது; சரியான தோரணை மற்றும் சத்தான உணவு மிக முக்கியம்.',
      learning: 'அட்டவணைகள் மற்றும் தொடர் முன்னேற்றக் குறியீடுகள் மூலம் சிறப்பாகக் கற்கிறார்.'
    }
  },
  11: {
    stage: 'Creator',
    stageTa: 'படைப்பாளி',
    classGrade: 'Class 6',
    theme: 'Creator-based coding, writing, building, and value creation.',
    themeTa: 'படைப்பாற்றல் சார்ந்த நிரலாக்கம், எழுதுதல் மற்றும் உருவாக்கம்.',
    en: {
      cognitive: 'Abstract reasoning emerges. Capable of creative synthesis: coding, writing, designing, and creative problem solving.',
      emotional: 'Mood swings can emerge due to hormonal changes. "Mind > Mood" and breath reset become crucial coping tools.',
      social: 'Values authentic self-expression. Begins to navigate diverse peer dynamics and negotiate boundaries.',
      physical: 'Coordination adjusts to growth spurts. Daily physical reset helps channel excess restless energy.',
      learning: 'Learns best by creating tangible projects rather than passively consuming textbooks.'
    },
    ta: {
      cognitive: 'புதியவற்றை சுயமாகப் படைக்கும் திறன் (எழுதுதல், வரைதல், நிரலாக்கம்) கூடுகிறது.',
      emotional: 'மன மாற்றங்கள் ஏற்படக்கூடிய பருவம்; மூச்சுப் பயிற்சி மற்றும் மன உறுதி அவசியம்.',
      social: 'தன் தனித்தன்மையை வெளிப்படுத்தவும், நல்ல நட்பு வட்டத்தை உருவாக்கவும் விழைகிறார்.',
      physical: 'உடல் மாற்றங்களை எதிர்கொள்ள தினமும் 30 நிமிட உடற்பயிற்சி மன அமைதியைத் தருகிறது.',
      learning: 'நுகர்வோராக இல்லாமல் புதியவற்றை உருவாக்கும் படைப்பாளியாகக் கற்க விரும்புகிறார்.'
    }
  },
  12: {
    stage: 'Leader',
    stageTa: 'தலைவர்',
    classGrade: 'Class 7',
    theme: 'Leader-based peer teaching, listening, and empathy.',
    themeTa: 'தலைமைப் பண்பு, சக மாணவர்களுக்குக் கற்பித்தல் மற்றும் பரிவு.',
    en: {
      cognitive: 'Metacognition: can analyze their own thinking process. Excels at "Teach to Learn" and peer coaching.',
      emotional: 'Heightened self-awareness. Deepens empathy by practicing "Listen first, talk second" and forgiving fast.',
      social: 'Leadership potential blossoms. Can mentor younger peers, resolve classroom conflicts, and model integrity.',
      physical: 'Greater athletic strength and endurance. Able to commit to consistent sports training 3× weekly.',
      learning: 'Driven by social impact, leadership responsibilities, and teaching others.'
    },
    ta: {
      cognitive: 'சுய சிந்தனை ஆழமடைகிறது; ஒரு கருத்தை மற்றவர்களுக்குக் கற்பிப்பதன் மூலம் எளிதில் கற்கிறார்.',
      emotional: 'முதிர்ந்த உணர்ச்சி சமநிலை; மற்றவர்கள் சொல்வதைக் கூர்ந்து கவனித்து முடிவெடுக்கிறார்.',
      social: 'தலைமைப் பண்பு மலர்கிறது; மற்றவர்களுக்கு வழிகாட்டியாகவும் நேர்மையாகவும் திகழ்கிறார்.',
      physical: 'உடல் வலிமையும் தாங்குதிறனும் கூடுகிறது; விளையாட்டில் தீவிர ஈடுபாடு காட்டுகிறார்.',
      learning: 'மற்றவர்களுக்குக் கற்பிப்பதன் மூலமும், தலைமைப் பொறுப்புகளை ஏற்பதன் மூலமும் கற்கிறார்.'
    }
  },
  13: {
    stage: 'Achiever',
    stageTa: 'வெற்றியாளர்',
    classGrade: 'Class 8',
    theme: 'Achiever-based discipline, focus sprints, and deep dives.',
    themeTa: 'வெற்றியாளர் ஒழுக்கம், 15-நிமிட கவனக் குவியல் மற்றும் ஆழ்ந்த தேடல்.',
    en: {
      cognitive: 'Advanced analytical capability. Studies in 15-minute power focus sprints and conducts independent deep dives.',
      emotional: 'Building strong internal motivation. Resilient against peer pressure; defends healthy digital boundaries.',
      social: 'Forms deep, purposeful friendships. Respects diverse opinions and values honest communication.',
      physical: 'Peak adolescent energy. Requires fixed 8-hour sleep schedules and gadgets out 60 mins before bed.',
      learning: 'Driven by mastery, competitive excellence, and measurable habit performance rubrics.'
    },
    ta: {
      cognitive: 'ஆழ்ந்த பகுப்பாய்வுத் திறன்; 15 நிமிட கவனக் குவியலுடன் படித்து ஆழமாகப் புரிந்துகொள்கிறார்.',
      emotional: 'வலுவான சுய ஒழுக்கம்; தேவையற்ற கவனச்சிதறல்களைத் தவிர்த்து இலக்கில் நிலைத்திருக்கிறார்.',
      social: 'உண்மையான நண்பர்களைத் தேர்ந்தெடுத்து, பரஸ்பர மரியாதையுடன் பழகுகிறார்.',
      physical: 'சரியான தூக்கமும், இரவு சாதனங்களை விலக்குவதும் புத்துணர்ச்சியைத் தருகிறது.',
      learning: 'வெற்றி இலக்குகளை நிர்ணயித்து, தொடர் சுய ஒழுக்கத்தின் மூலம் தேர்ச்சி பெறுகிறார்.'
    }
  },
  14: {
    stage: 'Future CEO',
    stageTa: 'எதிர்கால தலைமை நிர்வாகி (CEO)',
    classGrade: 'Advanced Track',
    theme: 'Future CEO: Life governance, investor mindset, and lifelong habits.',
    themeTa: 'எதிர்கால CEO: தன் வாழ்க்கை ஆளுமை, முதலீட்டுச் சிந்தனை மற்றும் வாழ்நாள் நற்பழக்கங்கள்.',
    en: {
      cognitive: 'Systems thinker. Connects daily habits to life vision, financial management (3-Jar System), and long-term goals.',
      emotional: 'Self-governing and autonomous. Does not need parental nagging; views personal discipline as true freedom.',
      social: 'Global citizenship mindset. Builds trust, communicates articulately, and creates economic/social value.',
      physical: 'Takes complete personal ownership of sleep, nutrition, athletic fitness, and mental wellness.',
      learning: 'Operates as the CEO of their own life. Self-audits weekly and monthly performance with maturity.'
    },
    ta: {
      cognitive: 'முழுமையான வாழ்க்கை மேலாண்மை; நிதி அறிவு (3 உண்டியல் முறை) மற்றும் நீண்டகால இலக்குகளை இணைக்கிறார்.',
      emotional: 'சுய ஆளுமை; பிறர் சொல்லித்தரத் தேவையின்றி, தன் ஒழுக்கமே தன் சுதந்திரம் என உணர்கிறார்.',
      social: 'நம்பகமான தலைமைத்துவம், தெளிவான பேச்சு மற்றும் சமுதாயத்திற்கு மதிப்பை உருவாக்கும் குணம்.',
      physical: 'தன் உணவு, தூக்கம், உடல்தகுதி மற்றும் மன அமைதியைத் தானே பொறுப்பேற்றுப் பராமரிக்கிறார்.',
      learning: 'தன் வாழ்க்கையின் தலைமை நிர்வாகியாக (CEO) திகழ்ந்து, வாழ்நாள் நற்பழக்கங்களை நிலைநிறுத்துகிறார்.'
    }
  }
};
