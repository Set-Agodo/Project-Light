export type SlideType =
  | 'welcome'
  | 'phonetic'
  | 'vocab'
  | 'quiz-choice'
  | 'quiz-yesno'
  | 'quiz-caseMatch'
  | 'type-word'
  | 'scramble'
  | 'complete';

export interface QuizOption {
  word: string;
  emoji: string;
  isCorrect: boolean;
}

export interface Slide {
  id: number;
  type: SlideType;
  title?: string;
  subtitle?: string;
  letterPair?: string;
  audioUrl?: string;
  word?: string;
  emoji?: string;
  question?: string;
  options?: QuizOption[];
  word1?: string;
  word2?: string;
  emoji1?: string;
  emoji2?: string;
  yesNoAnswer?: boolean;
  uppercase?: string;
  caseChoices?: string[];
  correctCase?: string;
  scrambledWords?: string[];
  correctSentence?: string;
}

export interface LetterModule {
  letter: string;
  attribute: string;
  sentence: string;
  color: string;
  lightColor: string;
  darkColor: string;
  emoji: string;
  image: string;
  slides: Slide[];
}

type QuizDef = { options: QuizOption[]; question?: string };

const makeModule = (
  letter: string,
  attribute: string,
  sentence: string,
  color: string,
  lightColor: string,
  darkColor: string,
  emoji: string,
  vocabWords: string[],
  vocabEmojis: string[],
  quizDefs: QuizDef[],
  word1: string,
  word2: string,
  emoji1: string,
  emoji2: string,
  yesNoAnswer: boolean,
  typeWord: string,
  caseChoices: string[],
  correctCase: string,
): LetterModule => {
  const n = vocabWords.length;
  const q = quizDefs.length;

  const vocabSlides: Slide[] = vocabWords.map((word, i) => ({
    id: 3 + i,
    type: 'vocab' as SlideType,
    word,
    emoji: vocabEmojis[i],
    audioUrl: `/audio/${word.toLowerCase()}.m4a`,
  }));

  const quizSlides: Slide[] = quizDefs.map((def, i) => ({
    id: n + 3 + i,
    type: 'quiz-choice' as SlideType,
    question: def.question ?? `Which word starts with ${letter}?`,
    options: def.options,
  }));

  const typeWordIdx = vocabWords.findIndex(w => w.toLowerCase() === typeWord.toLowerCase());
  const typeWordEmoji = typeWordIdx >= 0 ? vocabEmojis[typeWordIdx] : '📝';
  const scrambledWords = sentence.split(' ');

  return {
    letter, attribute, sentence, color, lightColor, darkColor, emoji,
    image: `/images/letters/${letter}.svg`,
    slides: [
      { id: 1, type: 'welcome', title: `Letter ${letter}${letter.toLowerCase()}`, subtitle: 'Who God Is' },
      { id: 2, type: 'phonetic', letterPair: `${letter}${letter.toLowerCase()}`, audioUrl: `/audio/${letter.toLowerCase()}_sound.m4a` },
      ...vocabSlides,
      ...quizSlides,
      { id: n + q + 3, type: 'quiz-yesno', question: 'Do these words begin with the same sound?', word1, word2, emoji1, emoji2, yesNoAnswer },
      { id: n + q + 4, type: 'type-word', word: typeWord, emoji: typeWordEmoji, audioUrl: `/audio/${typeWord.toLowerCase()}.m4a` },
      { id: n + q + 5, type: 'quiz-caseMatch', question: `Find the lowercase letter that matches ${letter}`, uppercase: letter, caseChoices, correctCase },
      { id: n + q + 6, type: 'scramble', question: 'Put the words in the right order!', scrambledWords: [...scrambledWords].sort(() => Math.random() - 0.5), correctSentence: sentence },
      { id: n + q + 7, type: 'complete', title: 'Great Job!', subtitle: `Letter ${letter}: Completed!` },
    ],
  };
};

export const MODULES: LetterModule[] = [
  makeModule('A', 'Awesome', 'God is Awesome: He is powerful.',
    '#FF6B6B', '#FFF0F0', '#C0392B', '✨',
    ['Arm', 'Animal', 'Above'],
    ['💪', '🐾', '⬆️'],
    [
      { options: [{ word: 'Add', emoji: '➕', isCorrect: true }, { word: 'Ax', emoji: '🪓', isCorrect: true }, { word: 'Eleven', emoji: '1️⃣1️⃣', isCorrect: false }] },
      { options: [{ word: 'Art', emoji: '🎨', isCorrect: true }, { word: 'Open', emoji: '🔓', isCorrect: false }, { word: 'Eleven', emoji: '1️⃣1️⃣', isCorrect: false }] },
    ],
    'Arm', 'End', '💪', '🏁', false,
    'Arm',
    ['a', 'o', 'x', 'b'], 'a',
  ),
  makeModule('B', 'Blessed', 'God is Blessed: He is holy.',
    '#FF9F43', '#FFF4E6', '#D35400', '🌟',
    ['Bed', 'Bird', 'Beach'],
    ['🛏️', '🐦', '🏖️'],
    [
      { options: [{ word: 'Brown', emoji: '🟫', isCorrect: true }, { word: 'Bug', emoji: '🐛', isCorrect: true }, { word: 'Pan', emoji: '🍳', isCorrect: false }] },
    ],
    'Pig', 'Ball', '🐷', '🏀', false,
    'Bed',
    ['b', 'd', 'p', 'q'], 'b',
  ),
  makeModule('C', 'Creator', 'God is Creator: He made all things.',
    '#FECA57', '#FFFDE7', '#B8860B', '🌍',
    ['Cake', 'Cookie', 'Cut'],
    ['🎂', '🍪', '✂️'],
    [
      { options: [{ word: 'Ball', emoji: '🏀', isCorrect: false }, { word: 'Caterpillar', emoji: '🐛', isCorrect: true }, { word: 'Cold', emoji: '🥶', isCorrect: true }] },
    ],
    'Candy', 'Cow', '🍬', '🐄', true,
    'Cake',
    ['c', 'o', 'e', 'g'], 'c',
  ),
  makeModule('D', 'Divine', 'God is Divine: He is perfect.',
    '#5CDB95', '#EAFAF1', '#1E8449', '🕊️',
    ['Door', 'Draw', 'Drive', 'Dot'],
    ['🚪', '✏️', '🚗', '⚫'],
    [
      { options: [{ word: 'Dinosaur', emoji: '🦕', isCorrect: true }, { word: 'Doll', emoji: '🪆', isCorrect: true }, { word: 'Tiger', emoji: '🐯', isCorrect: false }] },
    ],
    'Drop', 'Tree', '💧', '🌳', false,
    'Door',
    ['d', 'b', 'p', 'q'], 'd',
  ),
  makeModule('E', 'Eternal', 'God is Eternal: He has no end.',
    '#48DBFB', '#E8F8FF', '#0876C8', '♾️',
    ['Eye', 'Eat', 'Elephant', 'Eleven'],
    ['👁️', '🍽️', '🐘', '1️⃣1️⃣'],
    [
      { options: [{ word: 'Elephant', emoji: '🐘', isCorrect: true }, { word: 'Animal', emoji: '🐾', isCorrect: false }, { word: 'Orange', emoji: '🍊', isCorrect: false }] },
      { options: [{ word: 'Ear', emoji: '👂', isCorrect: true }, { word: 'Lock', emoji: '🔒', isCorrect: false }, { word: 'Yellow', emoji: '💛', isCorrect: false }] },
    ],
    'Arm', 'End', '💪', '🏁', false,
    'Eye',
    ['e', 'a', 'i', 'o'], 'e',
  ),
  makeModule('F', 'Faithful', 'God is Faithful: He keeps His word.',
    '#54A0FF', '#EBF3FF', '#1A5276', '🤝',
    ['Fire', 'Food', 'Frog'],
    ['🔥', '🍜', '🐸'],
    [
      { options: [{ word: 'Fireman', emoji: '👨‍🚒', isCorrect: true }, { word: 'Foot', emoji: '🦶', isCorrect: true }, { word: 'Puppy', emoji: '🐶', isCorrect: false }] },
    ],
    'Fox', 'Swim', '🦊', '🏊', false,
    'Fire',
    ['f', 't', 'l', 'h'], 'f',
  ),
  makeModule('G', 'Gracious', 'God is Gracious: He shows kindness.',
    '#A29BFE', '#F0EFFF', '#5B4FCF', '🤲',
    ['Garden', 'Goldfish', 'Grass'],
    ['🌻', '🐠', '🌿'],
    [
      { options: [{ word: 'Kick', emoji: '🦵', isCorrect: false }, { word: 'Jam', emoji: '🍓', isCorrect: false }, { word: 'Giraffe', emoji: '🦒', isCorrect: true }] },
    ],
    'Green', 'Gum', '💚', '🫧', true,
    'Garden',
    ['g', 'q', 'b', 'd'], 'g',
  ),
  makeModule('H', 'Holy', 'God is Holy: He is pure.',
    '#FD79A8', '#FFE8F3', '#B03060', '🕊️',
    ['Happy', 'Home', 'Horse'],
    ['😊', '🏠', '🐴'],
    [
      { options: [{ word: 'Head', emoji: '👤', isCorrect: true }, { word: 'Horse', emoji: '🐴', isCorrect: true }, { word: 'Round', emoji: '⭕', isCorrect: false }] },
    ],
    'Hit', 'Mit', '🥊', '🧤', false,
    'Happy',
    ['h', 'n', 'm', 'b'], 'h',
  ),
  makeModule('I', 'Infinite', 'God is Infinite: He has no limits.',
    '#00CEC9', '#E8FFFE', '#006B65', '∞',
    ['Inch', 'Igloo', 'Ice-Cream'],
    ['📏', '🏔️', '🍦'],
    [
      { options: [{ word: 'Iron', emoji: '🔩', isCorrect: true }, { word: 'Eye', emoji: '👁️', isCorrect: true }, { word: 'Vegetables', emoji: '🥦', isCorrect: false }] },
    ],
    'Island', 'Inch', '🏝️', '📏', true,
    'Inch',
    ['i', 'l', 'j', 't'], 'i',
  ),
  makeModule('J', 'Just', 'God is Just: He is always fair.',
    '#6C5CE7', '#F0EEFF', '#3D348B', '⚖️',
    ['Jam', 'Jog', 'Juice'],
    ['🍓', '🏃', '🥤'],
    [
      { options: [{ word: 'Jar', emoji: '🏺', isCorrect: true }, { word: 'Jug', emoji: '🥛', isCorrect: true }, { word: 'Goggles', emoji: '🥽', isCorrect: false }] },
    ],
    'Jellyfish', 'Goggles', '🪼', '🥽', false,
    'Jam',
    ['j', 'i', 'g', 'l'], 'j',
  ),
  makeModule('K', 'Kind', 'God is Kind: He loves us all.',
    '#E84393', '#FFE8F5', '#8B0057', '💝',
    ['King', 'Kick', 'Kid'],
    ['👑', '🦵', '👦'],
    [
      { options: [{ word: 'King', emoji: '👑', isCorrect: true }, { word: 'Garden', emoji: '🌻', isCorrect: false }, { word: 'Bug', emoji: '🐛', isCorrect: false }] },
    ],
    'Kitten', 'Key', '🐱', '🔑', true,
    'King',
    ['k', 'h', 'c', 'x'], 'k',
  ),
  makeModule('L', 'Love', 'God is Love: He cares for us.',
    '#00B894', '#E8FFF9', '#007A61', '❤️',
    ['Little', 'Love', 'Large'],
    ['🐜', '❤️', '📏'],
    [
      { options: [{ word: 'Lion', emoji: '🦁', isCorrect: true }, { word: 'Leg', emoji: '🦵', isCorrect: true }, { word: 'Woman', emoji: '👩', isCorrect: false }] },
      { options: [{ word: 'Little', emoji: '🐜', isCorrect: true }, { word: 'Quarter', emoji: '🪙', isCorrect: false }, { word: 'Beach', emoji: '🏖️', isCorrect: false }] },
    ],
    'Look', 'Leaf', '👀', '🍃', true,
    'Love',
    ['l', 'i', 't', 'f'], 'l',
  ),
  makeModule('M', 'Mighty', 'God is Mighty: He is very strong.',
    '#FDCB6E', '#FFF8E7', '#B8860B', '💪',
    ['Music', 'Meow', 'Mat'],
    ['🎵', '🐱', '🟫'],
    [
      { options: [{ word: 'Moon', emoji: '🌙', isCorrect: true }, { word: 'Mitt', emoji: '🧤', isCorrect: true }, { word: 'Nurse', emoji: '👩‍⚕️', isCorrect: false }] },
    ],
    'Monkey', 'Number', '🐒', '🔢', false,
    'Music',
    ['m', 'n', 'w', 'h'], 'm',
  ),
  makeModule('N', 'Near', 'God is Near: He is always close.',
    '#74B9FF', '#EBF5FF', '#1A5276', '🤗',
    ['Nurse', 'Nut', 'Number'],
    ['👩‍⚕️', '🥜', '🔢'],
    [
      { options: [{ word: 'Nose', emoji: '👃', isCorrect: true }, { word: 'Notebook', emoji: '📓', isCorrect: true }, { word: 'Monkey', emoji: '🐒', isCorrect: false }] },
    ],
    'Nest', 'Vest', '🪺', '🦺', false,
    'Nest',
    ['n', 'm', 'h', 'u'], 'n',
  ),
  makeModule('O', 'Omniscient', 'God is Omniscient: He knows all things.',
    '#FD7272', '#FFF0F0', '#C0392B', '👁️',
    ['Open', 'Orange', 'Oil', 'Ok'],
    ['🔓', '🍊', '🫙', '👌'],
    [
      { options: [{ word: 'Otter', emoji: '🦦', isCorrect: true }, { word: 'Happy', emoji: '😊', isCorrect: false }, { word: 'Arm', emoji: '💪', isCorrect: false }] },
    ],
    'Owl', 'Oil', '🦉', '🫙', true,
    'Orange',
    ['o', 'a', 'c', 'e'], 'o',
  ),
  makeModule('P', 'Patient', 'God is Patient: He waits for us.',
    '#55EFC4', '#EAFFF7', '#1A7A5E', '⏳',
    ['Pan', 'Pull', 'Puppy'],
    ['🍳', '💪', '🐶'],
    [
      { options: [{ word: 'Purple', emoji: '💜', isCorrect: true }, { word: 'Pig', emoji: '🐷', isCorrect: true }, { word: 'Dress', emoji: '👗', isCorrect: false }] },
    ],
    'Pie', 'Bed', '🥧', '🛏️', false,
    'Pan',
    ['p', 'b', 'd', 'q'], 'p',
  ),
  makeModule('Q', 'Quick', 'God is Quick: He is always ready.',
    '#81ECEC', '#E8FFFE', '#006B65', '⚡',
    ['Quack', 'Quarter', 'Queen'],
    ['🦆', '🪙', '👸'],
    [
      { options: [{ word: 'Queen', emoji: '👸', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }] },
    ],
    'Question', 'Kite', '❓', '🪁', true,
    'Quack',
    ['q', 'p', 'g', 'd'], 'q',
  ),
  makeModule('R', 'Righteous', 'God is Righteous: He does what is right.',
    '#F78FB3', '#FFE8F0', '#A0295B', '✅',
    ['Run', 'River', 'Ring', 'Red'],
    ['🏃', '🏞️', '💍', '🔴'],
    [
      { options: [{ word: 'Read', emoji: '📖', isCorrect: true }, { word: 'Wall', emoji: '🧱', isCorrect: false }, { word: 'Star', emoji: '⭐', isCorrect: false }] },
      { options: [{ word: 'Robot', emoji: '🤖', isCorrect: true }, { word: 'Ring', emoji: '💍', isCorrect: true }, { word: 'Swim', emoji: '🏊', isCorrect: false }] },
    ],
    'Rest', 'West', '😴', '🌅', false,
    'Run',
    ['r', 'n', 'h', 'm'], 'r',
  ),
  makeModule('S', 'Sovereign', 'God is Sovereign: He is in control.',
    '#F9CA24', '#FFFBE7', '#B8860B', '👑',
    ['Swim', 'Seven', 'Sad'],
    ['🏊', '7️⃣', '😢'],
    [
      { options: [{ word: 'Spider', emoji: '🕷️', isCorrect: true }, { word: 'Stick', emoji: '🥢', isCorrect: true }, { word: 'Zebra', emoji: '🦓', isCorrect: false }] },
    ],
    'Sleep', 'Star', '😴', '⭐', true,
    'Swim',
    ['s', 'z', 'c', 'x'], 's',
  ),
  makeModule('T', 'True', 'God is True: He never lies.',
    '#6AB04C', '#EAFAE0', '#2E7D32', '✔️',
    ['Tiger', 'Train', 'Tricycle'],
    ['🐯', '🚂', '🚲'],
    [
      { options: [{ word: 'Turtle', emoji: '🐢', isCorrect: true }, { word: 'Table', emoji: '🪑', isCorrect: true }, { word: 'Zoom', emoji: '🔍', isCorrect: false }] },
    ],
    'Top', 'Drop', '🪀', '💧', false,
    'Tiger',
    ['t', 'f', 'l', 'j'], 't',
  ),
  makeModule('U', 'Unchanging', 'God is Unchanging: He stays the same.',
    '#7C83FD', '#EEEFFF', '#3D348B', '🔄',
    ['Unzip', 'Umbrella', 'Unicorn'],
    ['🤐', '☂️', '🦄'],
    [
      { options: [{ word: 'Umbrella', emoji: '☂️', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }] },
    ],
    'Under', 'Up', '⬇️', '⬆️', true,
    'Uncle',
    ['u', 'n', 'v', 'w'], 'u',
  ),
  makeModule('V', 'Victorious', 'God is Victorious: He always wins.',
    '#4ECDC4', '#E8FFFE', '#006B65', '🏆',
    ['Van', 'Violin', 'Vegetables'],
    ['🚐', '🎻', '🥦'],
    [
      { options: [{ word: 'Van', emoji: '🚐', isCorrect: true }, { word: 'Vine', emoji: '🌿', isCorrect: true }, { word: 'Cup', emoji: '☕', isCorrect: false }] },
    ],
    'Van', 'Violin', '🚐', '🎻', true,
    'Van',
    ['v', 'u', 'w', 'y'], 'v',
  ),
  makeModule('W', 'Wise', 'God is Wise: He knows best.',
    '#45B7D1', '#E8F6FD', '#1565C0', '🦉',
    ['Woman', 'Worm', 'Wall'],
    ['👩', '🪱', '🧱'],
    [
      { options: [{ word: 'Water', emoji: '💧', isCorrect: true }, { word: 'Worm', emoji: '🪱', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }] },
    ],
    'Woman', 'Worm', '👩', '🪱', true,
    'Woman',
    ['w', 'm', 'v', 'n'], 'w',
  ),
  makeModule('X', 'Excellent', 'God is Excellent: He is above all.',
    '#ED4C67', '#FFE8EC', '#8B0024', '🌟',
    ['X-Ray', 'Box', 'Ax', 'Excited'],
    ['🦴', '📦', '🪓', '😄'],
    [
      { question: 'Which word has the letter X?', options: [{ word: 'X-Ray', emoji: '🦴', isCorrect: true }, { word: 'Ax', emoji: '🪓', isCorrect: true }, { word: 'Happy', emoji: '😊', isCorrect: false }] },
    ],
    'X-Ray', 'Box', '🦴', '📦', true,
    'X-Ray',
    ['x', 'k', 'z', 'y'], 'x',
  ),
  makeModule('Y', 'Your Provider', 'God is Your Provider: He supplies our needs.',
    '#F9CA24', '#FFFBE7', '#8B6914', '🙏',
    ['Yellow', 'Yo-Yo', 'Yarn'],
    ['💛', '🪀', '🧶'],
    [
      { options: [{ word: 'Yellow', emoji: '💛', isCorrect: true }, { word: 'Yarn', emoji: '🧶', isCorrect: true }, { word: 'Cat', emoji: '🐱', isCorrect: false }] },
    ],
    'Yard', 'Yell', '🏡', '📢', true,
    'Yellow',
    ['y', 'v', 'j', 'g'], 'y',
  ),
  makeModule('Z', 'Zealous', 'God is Zealous: He loves deeply.',
    '#9B59B6', '#F4E6FF', '#5B2C6F', '🔥',
    ['Zipper', 'Zoo', 'Zebra'],
    ['🤐', '🎪', '🦓'],
    [
      { options: [{ word: 'Zebra', emoji: '🦓', isCorrect: true }, { word: 'Zoo', emoji: '🎪', isCorrect: true }, { word: 'Cat', emoji: '🐱', isCorrect: false }] },
    ],
    'Zebra', 'Zipper', '🦓', '🤐', true,
    'Zipper',
    ['z', 's', 'x', 'n'], 'z',
  ),
];

export const MODULE_MAP: Record<string, LetterModule> = Object.fromEntries(
  MODULES.map((m) => [m.letter, m])
);
