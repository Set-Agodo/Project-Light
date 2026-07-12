export type SlideType =
  | 'welcome'
  | 'phonetic'
  | 'vocab'
  | 'quiz-choice'
  | 'quiz-yesno'
  | 'quiz-caseMatch'
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
  quizOptions: QuizOption[],
  word1: string,
  word2: string,
  emoji1: string,
  emoji2: string,
  yesNoAnswer: boolean,
  caseChoices: string[],
  correctCase: string,
  scrambledWords: string[]
): LetterModule => {
  const vocabSlides: Slide[] = vocabWords.map((word, i) => ({
    id: 3 + i,
    type: 'vocab' as SlideType,
    word,
    emoji: vocabEmojis[i],
    audioUrl: `/audio/${word.toLowerCase()}.m4a`,
  }));
  const n = vocabWords.length;
  return {
    letter, attribute, sentence, color, lightColor, darkColor, emoji,
    image: `/images/letters/${letter}.svg`,
    slides: [
      { id: 1, type: 'welcome', title: `Letter ${letter}${letter.toLowerCase()}`, subtitle: 'Who God Is' },
      { id: 2, type: 'phonetic', letterPair: `${letter}${letter.toLowerCase()}`, audioUrl: `/audio/${letter.toLowerCase()}_sound.m4a` },
      ...vocabSlides,
      { id: n + 3, type: 'quiz-choice', question: `Which word starts with ${letter}?`, options: quizOptions },
      { id: n + 4, type: 'quiz-yesno', question: 'Do these words begin with the same sound?', word1, word2, emoji1, emoji2, yesNoAnswer },
      { id: n + 5, type: 'quiz-caseMatch', question: `Find the lowercase letter that matches ${letter}`, uppercase: letter, caseChoices, correctCase },
      { id: n + 6, type: 'scramble', question: 'Put the words in the right order!', scrambledWords: [...scrambledWords].sort(() => Math.random() - 0.5), correctSentence: scrambledWords.join(' ') },
      { id: n + 7, type: 'complete', title: 'Great Job!', subtitle: `Letter ${letter}: Completed!` },
    ],
  };
};

export const MODULES: LetterModule[] = [
  makeModule('A', 'Awesome', 'God is Awesome: He is powerful.',
    '#FF6B6B', '#FFF0F0', '#C0392B', '✨',
    ['Above', 'Add', 'Animal', 'Arm', 'Art', 'Ax'],
    ['⬆️', '➕', '🐾', '💪', '🎨', '🪓'],
    [{ word: 'Arm', emoji: '💪', isCorrect: true }, { word: 'Ball', emoji: '🏀', isCorrect: false }, { word: 'Cat', emoji: '🐱', isCorrect: false }],
    'Arm', 'Apple', '💪', '🍎', true,
    ['a', 'o', 'x', 'b'], 'a',
    ['God', 'is', 'Awesome:', 'He', 'is', 'powerful.']
  ),
  makeModule('B', 'Blessed', 'God is Blessed: He is holy.',
    '#FF9F43', '#FFF4E6', '#D35400', '🌟',
    ['Ball', 'Barn', 'Beach', 'Bed', 'Bird', 'Blue', 'Box', 'Brown', 'Bug', 'Buzz'],
    ['🏀', '🏚️', '🏖️', '🛏️', '🐦', '💙', '📦', '🟫', '🐛', '🐝'],
    [{ word: 'Bird', emoji: '🐦', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }],
    'Bird', 'Bear', '🐦', '🐻', true,
    ['b', 'd', 'p', 'q'], 'b',
    ['God', 'is', 'Blessed:', 'He', 'is', 'holy.']
  ),
  makeModule('C', 'Creator', 'God is Creator: He made all things.',
    '#FECA57', '#FFFDE7', '#B8860B', '🌍',
    ['Cake', 'Candy', 'Cap', 'Car', 'Caterpillar', 'Cold', 'Cookie', 'Cow', 'Cut'],
    ['🎂', '🍬', '🧢', '🚗', '🐛', '🥶', '🍪', '🐄', '✂️'],
    [{ word: 'Cow', emoji: '🐄', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }],
    'Cow', 'Car', '🐄', '🚗', true,
    ['c', 'o', 'e', 'g'], 'c',
    ['God', 'is', 'Creator:', 'He', 'made', 'all', 'things.']
  ),
  makeModule('D', 'Divine', 'God is Divine: He is perfect.',
    '#5CDB95', '#EAFAF1', '#1E8449', '🕊️',
    ['Dinosaur', 'Doll', 'Door', 'Dot', 'Draw', 'Dress', 'Drive', 'Drop'],
    ['🦕', '🪆', '🚪', '⚫', '✏️', '👗', '🚗', '💧'],
    [{ word: 'Dinosaur', emoji: '🦕', isCorrect: true }, { word: 'Cat', emoji: '🐱', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }],
    'Dinosaur', 'Doll', '🦕', '🪆', true,
    ['d', 'b', 'p', 'q'], 'd',
    ['God', 'is', 'Divine:', 'He', 'is', 'perfect.']
  ),
  makeModule('E', 'Eternal', 'God is Eternal: He has no end.',
    '#48DBFB', '#E8F8FF', '#0876C8', '♾️',
    ['Eagle', 'Ear', 'Eat', 'Egg', 'Eight', 'Elephant', 'Eleven', 'End', 'Excited', 'Eye'],
    ['🦅', '👂', '🍽️', '🥚', '8️⃣', '🐘', '1️⃣1️⃣', '🏁', '😄', '👁️'],
    [{ word: 'Egg', emoji: '🥚', isCorrect: true }, { word: 'Ball', emoji: '🏀', isCorrect: false }, { word: 'Cup', emoji: '☕', isCorrect: false }],
    'Egg', 'Eagle', '🥚', '🦅', true,
    ['e', 'a', 'i', 'o'], 'e',
    ['God', 'is', 'Eternal:', 'He', 'has', 'no', 'end.']
  ),
  makeModule('F', 'Faithful', 'God is Faithful: He keeps His word.',
    '#54A0FF', '#EBF3FF', '#1A5276', '🤝',
    ['Face', 'Feet', 'Fire', 'Fireman', 'Food', 'Four', 'Fox', 'Frog'],
    ['😊', '🦶', '🔥', '👨‍🚒', '🍜', '4️⃣', '🦊', '🐸'],
    [{ word: 'Frog', emoji: '🐸', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Tree', emoji: '🌳', isCorrect: false }],
    'Frog', 'Face', '🐸', '😊', true,
    ['f', 't', 'l', 'h'], 'f',
    ['God', 'is', 'Faithful:', 'He', 'keeps', 'His', 'word.']
  ),
  makeModule('G', 'Gracious', 'God is Gracious: He shows kindness.',
    '#A29BFE', '#F0EFFF', '#5B4FCF', '🤲',
    ['Garden', 'Giraffe', 'Girl', 'Gold', 'Goldfish', 'Goggles', 'Goose', 'Grass', 'Green', 'Gum'],
    ['🌻', '🦒', '👧', '🥇', '🐠', '🥽', '🪿', '🌿', '💚', '🫧'],
    [{ word: 'Giraffe', emoji: '🦒', isCorrect: true }, { word: 'Bird', emoji: '🐦', isCorrect: false }, { word: 'Cup', emoji: '☕', isCorrect: false }],
    'Giraffe', 'Gold', '🦒', '🥇', true,
    ['g', 'q', 'b', 'd'], 'g',
    ['God', 'is', 'Gracious:', 'He', 'shows', 'kindness.']
  ),
  makeModule('H', 'Holy', 'God is Holy: He is pure.',
    '#FD79A8', '#FFE8F3', '#B03060', '🕊️',
    ['Happy', 'Head', 'Hit', 'Hole', 'Home', 'Hop', 'Horse'],
    ['😊', '👤', '🥊', '⭕', '🏠', '🐰', '🐴'],
    [{ word: 'Horse', emoji: '🐴', isCorrect: true }, { word: 'Ball', emoji: '🏀', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }],
    'Horse', 'Head', '🐴', '👤', true,
    ['h', 'n', 'm', 'b'], 'h',
    ['God', 'is', 'Holy:', 'He', 'is', 'pure.']
  ),
  makeModule('I', 'Infinite', 'God is Infinite: He has no limits.',
    '#00CEC9', '#E8FFFE', '#006B65', '∞',
    ['Ice', 'Ice-Cream', 'Igloo', 'Inch', 'Iron', 'Island'],
    ['🧊', '🍦', '🏠', '📏', '🔩', '🏝️'],
    [{ word: 'Igloo', emoji: '🏠', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Ball', emoji: '🏀', isCorrect: false }],
    'Igloo', 'Island', '🏠', '🏝️', true,
    ['i', 'l', 'j', 't'], 'i',
    ['God', 'is', 'Infinite:', 'He', 'has', 'no', 'limits.']
  ),
  makeModule('J', 'Just', 'God is Just: He is always fair.',
    '#6C5CE7', '#F0EEFF', '#3D348B', '⚖️',
    ['Jam', 'Jar', 'Jeans', 'Jog', 'Joke', 'Juice'],
    ['🍓', '🏺', '👖', '🏃', '😄', '🥤'],
    [{ word: 'Jar', emoji: '🏺', isCorrect: true }, { word: 'Cat', emoji: '🐱', isCorrect: false }, { word: 'Bird', emoji: '🐦', isCorrect: false }],
    'Jar', 'Juice', '🏺', '🥤', true,
    ['j', 'i', 'g', 'l'], 'j',
    ['God', 'is', 'Just:', 'He', 'is', 'always', 'fair.']
  ),
  makeModule('K', 'Kind', 'God is Kind: He loves us all.',
    '#E84393', '#FFE8F5', '#8B0057', '💝',
    ['Key', 'Kick', 'Kid', 'Kind', 'King', 'Kite', 'Kitten'],
    ['🔑', '🦵', '👦', '❤️', '👑', '🪁', '🐱'],
    [{ word: 'Kite', emoji: '🪁', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }],
    'Kite', 'Kitten', '🪁', '🐱', true,
    ['k', 'h', 'c', 'x'], 'k',
    ['God', 'is', 'Kind:', 'He', 'loves', 'us', 'all.']
  ),
  makeModule('L', 'Love', 'God is Love: He cares for us.',
    '#00B894', '#E8FFF9', '#007A61', '❤️',
    ['Large', 'Leaf', 'Leg', 'Light', 'Lion', 'Little', 'Lock', 'Look', 'Love'],
    ['📏', '🍃', '🦵', '💡', '🦁', '🐜', '🔒', '👀', '❤️'],
    [{ word: 'Lion', emoji: '🦁', isCorrect: true }, { word: 'Cup', emoji: '☕', isCorrect: false }, { word: 'Egg', emoji: '🥚', isCorrect: false }],
    'Lion', 'Leaf', '🦁', '🍃', true,
    ['l', 'i', 't', 'f'], 'l',
    ['God', 'is', 'Love:', 'He', 'cares', 'for', 'us.']
  ),
  makeModule('M', 'Mighty', 'God is Mighty: He is very strong.',
    '#FDCB6E', '#FFF8E7', '#B8860B', '💪',
    ['Map', 'Mat', 'Meow', 'Mix', 'Monkey', 'Moon', 'Mug', 'Music'],
    ['🗺️', '🟫', '🐱', '🥣', '🐒', '🌙', '☕', '🎵'],
    [{ word: 'Moon', emoji: '🌙', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Cat', emoji: '🐱', isCorrect: false }],
    'Moon', 'Map', '🌙', '🗺️', true,
    ['m', 'n', 'w', 'h'], 'm',
    ['God', 'is', 'Mighty:', 'He', 'is', 'very', 'strong.']
  ),
  makeModule('N', 'Near', 'God is Near: He is always close.',
    '#74B9FF', '#EBF5FF', '#1A5276', '🤗',
    ['Nest', 'Nine', 'Nose', 'Notebook', 'Number', 'Nurse', 'Nut'],
    ['🪺', '9️⃣', '👃', '📓', '🔢', '👩‍⚕️', '🥜'],
    [{ word: 'Nest', emoji: '🪺', isCorrect: true }, { word: 'Ball', emoji: '🏀', isCorrect: false }, { word: 'Cup', emoji: '☕', isCorrect: false }],
    'Nest', 'Nose', '🪺', '👃', true,
    ['n', 'm', 'h', 'u'], 'n',
    ['God', 'is', 'Near:', 'He', 'is', 'always', 'close.']
  ),
  makeModule('O', 'Omniscient', 'God is Omniscient: He knows all things.',
    '#FD7272', '#FFF0F0', '#C0392B', '👁️',
    ['Oil', 'Olive', 'Open', 'Orange', 'Owl'],
    ['🫙', '🫒', '🔓', '🍊', '🦉'],
    [{ word: 'Owl', emoji: '🦉', isCorrect: true }, { word: 'Cat', emoji: '🐱', isCorrect: false }, { word: 'Bird', emoji: '🐦', isCorrect: false }],
    'Owl', 'Orange', '🦉', '🍊', true,
    ['o', 'a', 'c', 'e'], 'o',
    ['God', 'is', 'Omniscient:', 'He', 'knows', 'all', 'things.']
  ),
  makeModule('P', 'Patient', 'God is Patient: He waits for us.',
    '#55EFC4', '#EAFFF7', '#1A7A5E', '⏳',
    ['Pan', 'Pie', 'Pig', 'Play', 'Pot', 'Pull', 'Puppy', 'Purple'],
    ['🍳', '🥧', '🐷', '🎮', '🍲', '💪', '🐶', '💜'],
    [{ word: 'Pig', emoji: '🐷', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Hat', emoji: '🎩', isCorrect: false }],
    'Pig', 'Pan', '🐷', '🍳', true,
    ['p', 'b', 'd', 'q'], 'p',
    ['God', 'is', 'Patient:', 'He', 'waits', 'for', 'us.']
  ),
  makeModule('Q', 'Quick', 'God is Quick: He is always ready.',
    '#81ECEC', '#E8FFFE', '#006B65', '⚡',
    ['Quarter', 'Queen', 'Question', 'Quiet', 'Quilt'],
    ['🪙', '👸', '❓', '🤫', '🛏️'],
    [{ word: 'Queen', emoji: '👸', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }],
    'Queen', 'Quiet', '👸', '🤫', true,
    ['q', 'p', 'g', 'd'], 'q',
    ['God', 'is', 'Quick:', 'He', 'is', 'always', 'ready.']
  ),
  makeModule('R', 'Righteous', 'God is Righteous: He does what is right.',
    '#F78FB3', '#FFE8F0', '#A0295B', '✅',
    ['Read', 'Red', 'Ring', 'Rip', 'River', 'Rock', 'Rocket', 'Round', 'Run'],
    ['📖', '🔴', '💍', '✂️', '🏞️', '🪨', '🚀', '⭕', '🏃'],
    [{ word: 'River', emoji: '🏞️', isCorrect: true }, { word: 'Ball', emoji: '🏀', isCorrect: false }, { word: 'Cup', emoji: '☕', isCorrect: false }],
    'River', 'Rock', '🏞️', '🪨', true,
    ['r', 'n', 'h', 'm'], 'r',
    ['God', 'is', 'Righteous:', 'He', 'does', 'what', 'is', 'right.']
  ),
  makeModule('S', 'Sovereign', 'God is Sovereign: He is in control.',
    '#F9CA24', '#FFFBE7', '#B8860B', '👑',
    ['Sad', 'Seven', 'Six', 'Sleep', 'Spider', 'Star', 'Stick', 'Sun', 'Swim'],
    ['😢', '7️⃣', '6️⃣', '😴', '🕷️', '⭐', '🥢', '☀️', '🏊'],
    [{ word: 'Sun', emoji: '☀️', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Bird', emoji: '🐦', isCorrect: false }],
    'Sun', 'Star', '☀️', '⭐', true,
    ['s', 'z', 'c', 'x'], 's',
    ['God', 'is', 'Sovereign:', 'He', 'is', 'in', 'control.']
  ),
  makeModule('T', 'True', 'God is True: He never lies.',
    '#6AB04C', '#EAFAE0', '#2E7D32', '✔️',
    ['Table', 'Taxi', 'Ten', 'Tiger', 'Time', 'Top', 'Train', 'Tree', 'Triangle', 'Tricycle', 'Turtle'],
    ['🪑', '🚕', '🔟', '🐯', '⏰', '🪀', '🚂', '🌳', '📐', '🚲', '🐢'],
    [{ word: 'Tree', emoji: '🌳', isCorrect: true }, { word: 'Cup', emoji: '☕', isCorrect: false }, { word: 'Ball', emoji: '🏀', isCorrect: false }],
    'Tree', 'Turtle', '🌳', '🐢', true,
    ['t', 'f', 'l', 'j'], 't',
    ['God', 'is', 'True:', 'He', 'never', 'lies.']
  ),
  makeModule('U', 'Unchanging', 'God is Unchanging: He stays the same.',
    '#7C83FD', '#EEEFFF', '#3D348B', '🔄',
    ['Umbrella', 'Uncle', 'Under', 'Unzip', 'Up'],
    ['☂️', '👨', '⬇️', '🤐', '⬆️'],
    [{ word: 'Umbrella', emoji: '☂️', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Fish', emoji: '🐟', isCorrect: false }],
    'Umbrella', 'Uncle', '☂️', '👨', true,
    ['u', 'n', 'v', 'w'], 'u',
    ['God', 'is', 'Unchanging:', 'He', 'stays', 'the', 'same.']
  ),
  makeModule('V', 'Victorious', 'God is Victorious: He always wins.',
    '#4ECDC4', '#E8FFFE', '#006B65', '🏆',
    ['Van', 'Vase', 'Vegetables', 'Verse', 'Vest', 'Vine', 'Violin'],
    ['🚐', '🏺', '🥦', '📖', '🦺', '🌿', '🎻'],
    [{ word: 'Vine', emoji: '🌿', isCorrect: true }, { word: 'Cup', emoji: '☕', isCorrect: false }, { word: 'Bird', emoji: '🐦', isCorrect: false }],
    'Vine', 'Violin', '🌿', '🎻', true,
    ['v', 'u', 'w', 'y'], 'v',
    ['God', 'is', 'Victorious:', 'He', 'always', 'wins.']
  ),
  makeModule('W', 'Wise', 'God is Wise: He knows best.',
    '#45B7D1', '#E8F6FD', '#1565C0', '🦉',
    ['Walk', 'Wall', 'Water', 'Win', 'Women', 'Worm'],
    ['🚶', '🧱', '💧', '🏆', '👩', '🪱'],
    [{ word: 'Water', emoji: '💧', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Cat', emoji: '🐱', isCorrect: false }],
    'Water', 'Worm', '💧', '🪱', true,
    ['w', 'm', 'v', 'n'], 'w',
    ['God', 'is', 'Wise:', 'He', 'knows', 'best.']
  ),
  makeModule('X', 'Excellent', 'God is Excellent: He is above all.',
    '#ED4C67', '#FFE8EC', '#8B0024', '🌟',
    ['Xylophone', 'X-Ray', 'Extra'],
    ['🎵', '🦴', '✨'],
    [{ word: 'Xylophone', emoji: '🎵', isCorrect: true }, { word: 'Dog', emoji: '🐕', isCorrect: false }, { word: 'Bird', emoji: '🐦', isCorrect: false }],
    'Xylophone', 'Xenia', '🎵', '🌸', true,
    ['x', 'k', 'z', 'y'], 'x',
    ['God', 'is', 'Excellent:', 'He', 'is', 'above', 'all.']
  ),
  makeModule('Y', 'Your Provider', 'God is Your Provider: He supplies our needs.',
    '#F9CA24', '#FFFBE7', '#8B6914', '🙏',
    ['Yard', 'Yarn', 'Yell', 'Yellow', 'Yes', 'Yo-Yo'],
    ['🏡', '🧶', '📢', '💛', '✅', '🪀'],
    [{ word: 'Yard', emoji: '🏡', isCorrect: true }, { word: 'Cat', emoji: '🐱', isCorrect: false }, { word: 'Ball', emoji: '🏀', isCorrect: false }],
    'Yard', 'Yellow', '🏡', '💛', true,
    ['y', 'v', 'j', 'g'], 'y',
    ['God', 'is', 'Your', 'Provider:', 'He', 'supplies', 'our', 'needs.']
  ),
  makeModule('Z', 'Zealous', 'God is Zealous: He loves deeply.',
    '#9B59B6', '#F4E6FF', '#5B2C6F', '🔥',
    ['Zebra', 'Zero', 'Zig-Zag', 'Zipper', 'Zoo', 'Zoom'],
    ['🦓', '0️⃣', '⚡', '🤐', '🎪', '🔍'],
    [{ word: 'Zebra', emoji: '🦓', isCorrect: true }, { word: 'Cat', emoji: '🐱', isCorrect: false }, { word: 'Dog', emoji: '🐕', isCorrect: false }],
    'Zebra', 'Zipper', '🦓', '🤐', true,
    ['z', 's', 'x', 'n'], 'z',
    ['God', 'is', 'Zealous:', 'He', 'loves', 'deeply.']
  ),
];

export const MODULE_MAP: Record<string, LetterModule> = Object.fromEntries(
  MODULES.map((m) => [m.letter, m])
);
