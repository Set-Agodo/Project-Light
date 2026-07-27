export type SlideType =
  | 'welcome'
  | 'phonetic'
  | 'vocab'
  | 'quiz-choice'
  | 'quiz-yesno'
  | 'quiz-caseMatch'
  | 'quiz-letter-complete'
  | 'type-word'
  | 'sentence-read'
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
  completeWord?: string;
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

const w = (letter: string) => ({ id: 1, type: 'welcome' as SlideType, title: `Letter ${letter}${letter.toLowerCase()}`, subtitle: 'Who God Is' });
const ph = (letter: string) => ({ id: 2, type: 'phonetic' as SlideType, letterPair: `${letter}${letter.toLowerCase()}`, audioUrl: `/audio/${letter.toLowerCase()}_sound.mp3` });
const v = (id: number, word: string, emoji: string) => ({ id, type: 'vocab' as SlideType, word, emoji, audioUrl: `/audio/${word.toLowerCase().replace(/ /g, '-')}.m4a` });
const qc = (id: number, question: string, options: QuizOption[]) => ({ id, type: 'quiz-choice' as SlideType, question, options });
const yn = (id: number, question: string, word1: string, word2: string, emoji1: string, emoji2: string, yesNoAnswer: boolean) => ({ id, type: 'quiz-yesno' as SlideType, question, word1, word2, emoji1, emoji2, yesNoAnswer });
const lc = (id: number, completeWord: string, caseChoices: string[], correctCase: string) => ({ id, type: 'quiz-letter-complete' as SlideType, completeWord, caseChoices, correctCase });
const tw = (id: number, word: string, emoji: string) => ({ id, type: 'type-word' as SlideType, word, emoji, audioUrl: `/audio/${word.toLowerCase().replace(/ /g, '-')}.m4a` });
const cm = (id: number, uppercase: string, caseChoices: string[], correctCase: string) => ({ id, type: 'quiz-caseMatch' as SlideType, uppercase, caseChoices, correctCase });
const sr = (id: number, sentence: string) => ({ id, type: 'sentence-read' as SlideType, correctSentence: sentence });
const sc = (id: number, sentence: string) => ({ id, type: 'scramble' as SlideType, scrambledWords: sentence.split(' '), correctSentence: sentence });
const done = (id: number) => ({ id, type: 'complete' as SlideType });

const SAME = 'Do these words begin with the same sound?';
const DIFF = 'Are the words you hear the same or different?';

export const MODULES: LetterModule[] = [
  {
    letter: 'A', attribute: 'Awesome',
    sentence: 'God is awesome. He is powerful.',
    color: '#FF6B6B', lightColor: '#FFF0F0', darkColor: '#C0392B', emoji: '✨',
    image: '/images/letters/A.svg',
    slides: [
      w('A'), ph('A'),
      v(3, 'Arm', '💪'), v(4, 'Animal', '🐾'), v(5, 'Above', '⬆️'),
      qc(6, 'Which word starts with A?', [{ word: 'Add', emoji: '➕', isCorrect: true }, { word: 'Ax', emoji: '🪓', isCorrect: true }, { word: 'Eleven', emoji: '1️⃣', isCorrect: false }]),
      qc(7, 'Which word starts with A?', [{ word: 'Art', emoji: '🎨', isCorrect: true }, { word: 'Open', emoji: '🔓', isCorrect: false }, { word: 'Eleven', emoji: '1️⃣', isCorrect: false }]),
      yn(8, SAME, 'Arm', 'End', '💪', '🏁', false),
      tw(9, 'Arm', '💪'),
      cm(10, 'A', ['a', 'o', 'x', 'b'], 'a'),
      sr(11, 'God is awesome. He is powerful.'),
      sc(11, 'God is awesome. He is powerful.'),
      done(12),
    ],
  },
  {
    letter: 'B', attribute: 'the Bread of Life',
    sentence: 'God is the bread of life. He will supply our needs.',
    color: '#FF9F43', lightColor: '#FFF4E6', darkColor: '#D35400', emoji: '🍞',
    image: '/images/letters/B.svg',
    slides: [
      w('B'), ph('B'),
      v(3, 'Bed', '🛏️'), v(4, 'Bird', '🐦'), v(5, 'Beach', '🏖️'),
      lc(6, 'Barn', ['b', 'd', 'p', 'g'], 'b'),
      lc(7, 'Blue', ['b', 'd', 'p', 'q'], 'b'),
      yn(8, SAME, 'Pig', 'Ball', '🐷', '🏀', false),
      qc(9, 'Which word starts with B?', [{ word: 'Brown', emoji: '🟫', isCorrect: true }, { word: 'Bug', emoji: '🐛', isCorrect: true }, { word: 'Pan', emoji: '🍳', isCorrect: false }]),
      tw(10, 'Bed', '🛏️'),
      cm(11, 'B', ['b', 'd', 'p', 'q'], 'b'),
      sr(12, 'God is the bread of life. He will supply our needs.'),
      sc(12, 'God is the bread of life. He will supply our needs.'),
      done(13),
    ],
  },
  {
    letter: 'C', attribute: 'our Comforter',
    sentence: 'God is our Comforter. He holds us in times of trouble.',
    color: '#FECA57', lightColor: '#FFFDE7', darkColor: '#B8860B', emoji: '🤗',
    image: '/images/letters/C.svg',
    slides: [
      w('C'), ph('C'),
      v(3, 'Cake', '🎂'), v(4, 'Cookie', '🍪'), v(5, 'Cut', '✂️'),
      lc(6, 'Cap', ['c', 'g', 'k', 's'], 'c'),
      qc(7, 'Which word starts with C?', [{ word: 'Ball', emoji: '🏀', isCorrect: false }, { word: 'Caterpillar', emoji: '🐛', isCorrect: true }, { word: 'Cold', emoji: '🥶', isCorrect: true }]),
      lc(8, 'Car', ['c', 'g', 'k', 's'], 'c'),
      yn(9, SAME, 'Candy', 'Cow', '🍬', '🐄', true),
      tw(10, 'Cake', '🎂'),
      cm(11, 'C', ['c', 'o', 'e', 'g'], 'c'),
      sr(12, 'God is our Comforter. He holds us in times of trouble.'),
      sc(12, 'God is our Comforter. He holds us in times of trouble.'),
      done(13),
    ],
  },
  {
    letter: 'D', attribute: 'our Deliverer',
    sentence: 'God is our deliverer. He will bring us out of trouble.',
    color: '#5CDB95', lightColor: '#EAFAF1', darkColor: '#1E8449', emoji: '🕊️',
    image: '/images/letters/D.svg',
    slides: [
      w('D'), ph('D'),
      v(3, 'Door', '🚪'), v(4, 'Draw', '✏️'), v(5, 'Drive', '🚗'), v(6, 'Dot', '⚫'),
      lc(7, 'Dress', ['d', 'b', 'p', 'q'], 'd'),
      yn(8, SAME, 'Drop', 'Tree', '💧', '🌳', false),
      qc(9, 'Which word starts with D?', [{ word: 'Dinosaur', emoji: '🦕', isCorrect: true }, { word: 'Doll', emoji: '🪆', isCorrect: true }, { word: 'Tiger', emoji: '🐯', isCorrect: false }]),
      lc(10, 'Dot', ['d', 'b', 'p', 'q'], 'd'),
      tw(11, 'Door', '🚪'),
      cm(12, 'D', ['d', 'b', 'p', 'q'], 'd'),
      sr(13, 'God is our deliverer. He will bring us out of trouble.'),
      sc(13, 'God is our deliverer. He will bring us out of trouble.'),
      done(14),
    ],
  },
  {
    letter: 'E', attribute: 'Everlasting',
    sentence: 'God is everlasting. He will always be there.',
    color: '#48DBFB', lightColor: '#E8F8FF', darkColor: '#0876C8', emoji: '♾️',
    image: '/images/letters/E.svg',
    slides: [
      w('E'), ph('E'),
      v(3, 'Eye', '👁️'), v(4, 'Eat', '🍽️'), v(5, 'Elephant', '🐘'), v(6, 'Eleven', '1️⃣'),
      yn(7, SAME, 'Arm', 'End', '💪', '🏁', false),
      qc(8, 'Which word starts with E?', [{ word: 'Elephant', emoji: '🐘', isCorrect: true }, { word: 'Animal', emoji: '🐾', isCorrect: false }, { word: 'Orange', emoji: '🍊', isCorrect: false }]),
      qc(9, 'Which word starts with E?', [{ word: 'Ear', emoji: '👂', isCorrect: true }, { word: 'Lock', emoji: '🔒', isCorrect: false }, { word: 'Yellow', emoji: '💛', isCorrect: false }]),
      tw(10, 'Eye', '👁️'),
      cm(11, 'E', ['e', 'a', 'i', 'o'], 'e'),
      sr(12, 'God is everlasting. He will always be there.'),
      sc(12, 'God is everlasting. He will always be there.'),
      done(13),
    ],
  },
  {
    letter: 'F', attribute: 'our Father',
    sentence: 'God is our Father. We are his children who he loves.',
    color: '#54A0FF', lightColor: '#EBF3FF', darkColor: '#1A5276', emoji: '👨‍👧',
    image: '/images/letters/F.svg',
    slides: [
      w('F'), ph('F'),
      v(3, 'Fire', '🔥'), v(4, 'Food', '🍜'), v(5, 'Frog', '🐸'),
      lc(6, 'Face', ['f', 't', 'l', 'v'], 'f'),
      lc(7, 'Fire', ['f', 't', 'l', 'v'], 'f'),
      qc(8, 'Which word starts with F?', [{ word: 'Fireman', emoji: '👨‍🚒', isCorrect: true }, { word: 'Foot', emoji: '🦶', isCorrect: true }, { word: 'Puppy', emoji: '🐶', isCorrect: false }]),
      yn(9, SAME, 'Fox', 'Swim', '🦊', '🏊', false),
      tw(10, 'Fire', '🔥'),
      cm(11, 'F', ['f', 't', 'l', 'h'], 'f'),
      sr(12, 'God is our Father. We are his children who he loves.'),
      sc(12, 'God is our Father. We are his children who he loves.'),
      done(13),
    ],
  },
  {
    letter: 'G', attribute: 'the Good Shepherd',
    sentence: 'God is the good shepherd. He will watch over us.',
    color: '#A29BFE', lightColor: '#F0EFFF', darkColor: '#5B4FCF', emoji: '🐑',
    image: '/images/letters/G.svg',
    slides: [
      w('G'), ph('G'),
      v(3, 'Garden', '🌻'), v(4, 'Goldfish', '🐠'), v(5, 'Grass', '🌿'),
      lc(6, 'Goose', ['g', 'q', 'b', 'd'], 'g'),
      lc(7, 'Gold', ['g', 'q', 'b', 'd'], 'g'),
      yn(8, SAME, 'Green', 'Gum', '💚', '🫧', true),
      qc(9, 'Which word starts with G?', [{ word: 'Kick', emoji: '🦵', isCorrect: false }, { word: 'Jam', emoji: '🍓', isCorrect: false }, { word: 'Giraffe', emoji: '🦒', isCorrect: true }]),
      tw(10, 'Garden', '🌻'),
      cm(11, 'G', ['g', 'q', 'b', 'd'], 'g'),
      sr(12, 'God is the good shepherd. He will watch over us.'),
      sc(12, 'God is the good shepherd. He will watch over us.'),
      done(13),
    ],
  },
  {
    letter: 'H', attribute: 'our Hiding Place',
    sentence: 'God is our hiding place. He will shelter us.',
    color: '#FD79A8', lightColor: '#FFE8F3', darkColor: '#B03060', emoji: '🏠',
    image: '/images/letters/H.svg',
    slides: [
      w('H'), ph('H'),
      v(3, 'Happy', '😊'), v(4, 'Home', '🏠'), v(5, 'Horse', '🐴'),
      lc(6, 'Hole', ['h', 'n', 'm', 'b'], 'h'),
      yn(7, SAME, 'Hit', 'Mit', '🥊', '🧤', false),
      qc(8, 'Which word starts with H?', [{ word: 'Head', emoji: '👤', isCorrect: true }, { word: 'Horse', emoji: '🐴', isCorrect: true }, { word: 'Round', emoji: '⭕', isCorrect: false }]),
      tw(9, 'Happy', '😊'),
      cm(10, 'H', ['h', 'n', 'm', 'b'], 'h'),
      sr(11, 'God is our hiding place. He will shelter us.'),
      sc(11, 'God is our hiding place. He will shelter us.'),
      done(12),
    ],
  },
  {
    letter: 'I', attribute: 'I Am',
    sentence: 'God is I am. He is who he says he is.',
    color: '#00CEC9', lightColor: '#E8FFFE', darkColor: '#006B65', emoji: '∞',
    image: '/images/letters/I.svg',
    slides: [
      w('I'), ph('I'),
      v(3, 'Inch', '📏'), v(4, 'Igloo', '🏔️'), v(5, 'Ice Cream', '🍦'),
      yn(6, SAME, 'Island', 'Inch', '🏝️', '📏', true),
      qc(7, 'Which word starts with I?', [{ word: 'Iron', emoji: '🔩', isCorrect: true }, { word: 'Eye', emoji: '👁️', isCorrect: false }, { word: 'Vegetables', emoji: '🥦', isCorrect: false }]),
      cm(8, 'I', ['i', 'l', 'j', 't'], 'i'),
      sr(9, 'God is I am. He is who he says he is.'),
      sc(9, 'God is I am. He is who he says he is.'),
      done(10),
    ],
  },
  {
    letter: 'J', attribute: 'Just',
    sentence: 'God is just. He is always fair.',
    color: '#6C5CE7', lightColor: '#F0EEFF', darkColor: '#3D348B', emoji: '⚖️',
    image: '/images/letters/J.svg',
    slides: [
      w('J'), ph('J'),
      v(3, 'Jam', '🍓'), v(4, 'Jog', '🏃'), v(5, 'Juice', '🥤'),
      lc(6, 'Jar', ['j', 'g', 'i', 'l'], 'j'),
      lc(7, 'Jug', ['j', 'g', 'i', 'l'], 'j'),
      yn(8, SAME, 'Jellyfish', 'Goggles', '🪼', '🥽', false),
      tw(9, 'Jam', '🍓'),
      yn(10, DIFF, 'Yell', 'Gel', '📢', '💈', false),
      cm(11, 'J', ['j', 'i', 'g', 'l'], 'j'),
      sr(12, 'God is just. He is always fair.'),
      sc(12, 'God is just. He is always fair.'),
      done(13),
    ],
  },
  {
    letter: 'K', attribute: 'King',
    sentence: 'God is king. He rules over all things.',
    color: '#E84393', lightColor: '#FFE8F5', darkColor: '#8B0057', emoji: '👑',
    image: '/images/letters/K.svg',
    slides: [
      w('K'), ph('K'),
      v(3, 'King', '👑'), v(4, 'Kick', '🦵'), v(5, 'Kid', '👦'),
      qc(6, 'Which word starts with K?', [{ word: 'King', emoji: '👑', isCorrect: true }, { word: 'Garden', emoji: '🌻', isCorrect: false }, { word: 'Bug', emoji: '🐛', isCorrect: false }]),
      lc(7, 'Kite', ['k', 'c', 'g', 'h'], 'k'),
      lc(8, 'Kiss', ['k', 'c', 'g', 'h'], 'k'),
      yn(9, SAME, 'Kitten', 'Key', '🐱', '🔑', true),
      tw(10, 'King', '👑'),
      cm(11, 'K', ['k', 'h', 'c', 'x'], 'k'),
      sr(12, 'God is king. He rules over all things.'),
      sc(12, 'God is king. He rules over all things.'),
      done(13),
    ],
  },
  {
    letter: 'L', attribute: 'Love',
    sentence: 'God is love. He is a loving father.',
    color: '#00B894', lightColor: '#E8FFF9', darkColor: '#007A61', emoji: '❤️',
    image: '/images/letters/L.svg',
    slides: [
      w('L'), ph('L'),
      v(3, 'Little', '🐜'), v(4, 'Love', '❤️'), v(5, 'Large', '📏'),
      qc(6, 'Which word starts with L?', [{ word: 'Lion', emoji: '🦁', isCorrect: true }, { word: 'Leg', emoji: '🦵', isCorrect: true }, { word: 'Woman', emoji: '👩', isCorrect: false }]),
      lc(7, 'Light', ['l', 'i', 't', 'f'], 'l'),
      yn(8, SAME, 'Look', 'Leaf', '👀', '🍃', true),
      qc(9, 'Which word starts with L?', [{ word: 'Little', emoji: '🐜', isCorrect: true }, { word: 'Quarter', emoji: '🪙', isCorrect: false }, { word: 'Beach', emoji: '🏖️', isCorrect: false }]),
      tw(10, 'Love', '❤️'),
      yn(11, DIFF, 'Like', 'Right', '👍', '👉', false),
      cm(12, 'L', ['l', 'i', 't', 'f'], 'l'),
      sr(13, 'God is love. He is a loving father.'),
      sc(13, 'God is love. He is a loving father.'),
      done(14),
    ],
  },
  {
    letter: 'M', attribute: 'Maker',
    sentence: 'God is maker. He is the creator of all things.',
    color: '#FDCB6E', lightColor: '#FFF8E7', darkColor: '#B8860B', emoji: '🔨',
    image: '/images/letters/M.svg',
    slides: [
      w('M'), ph('M'),
      v(3, 'Music', '🎵'), v(4, 'Meow', '🐱'), v(5, 'Mat', '🟫'),
      lc(6, 'Map', ['m', 'n', 'w', 'h'], 'm'),
      yn(7, SAME, 'Monkey', 'Number', '🐒', '🔢', false),
      qc(8, 'Which word starts with M?', [{ word: 'Moon', emoji: '🌙', isCorrect: true }, { word: 'Mitt', emoji: '🧤', isCorrect: true }, { word: 'Nurse', emoji: '👩‍⚕️', isCorrect: false }]),
      lc(9, 'Mug', ['m', 'n', 'w', 'h'], 'm'),
      tw(10, 'Music', '🎵'),
      cm(11, 'M', ['m', 'n', 'w', 'h'], 'm'),
      sr(12, 'God is maker. He is the creator of all things.'),
      sc(12, 'God is maker. He is the creator of all things.'),
      done(13),
    ],
  },
  {
    letter: 'N', attribute: 'New Every Morning',
    sentence: "God's mercy is new every morning. His forgiveness never runs out.",
    color: '#74B9FF', lightColor: '#EBF5FF', darkColor: '#1A5276', emoji: '🌅',
    image: '/images/letters/N.svg',
    slides: [
      w('N'), ph('N'),
      v(3, 'Nurse', '👩‍⚕️'), v(4, 'Nut', '🥜'), v(5, 'Number', '🔢'),
      lc(6, 'Nine', ['n', 'm', 'h', 'u'], 'n'),
      lc(7, 'New', ['n', 'm', 'h', 'u'], 'n'),
      qc(8, 'Which word starts with N?', [{ word: 'Nose', emoji: '👃', isCorrect: true }, { word: 'Notebook', emoji: '📓', isCorrect: true }, { word: 'Monkey', emoji: '🐒', isCorrect: false }]),
      yn(9, SAME, 'Nest', 'Vest', '🪺', '🦺', false),
      tw(10, 'Nest', '🪺'),
      cm(11, 'N', ['n', 'm', 'h', 'u'], 'n'),
      sr(12, "God's mercy is new every morning. His forgiveness never runs out."),
      sc(12, "God's mercy is new every morning. His forgiveness never runs out."),
      done(13),
    ],
  },
  {
    letter: 'O', attribute: 'our Peace',
    sentence: 'God is our peace. He is our resting place.',
    color: '#FD7272', lightColor: '#FFF0F0', darkColor: '#C0392B', emoji: '☮️',
    image: '/images/letters/O.svg',
    slides: [
      w('O'), ph('O'),
      v(3, 'Open', '🔓'), v(4, 'Orange', '🍊'), v(5, 'Oil', '🫙'), v(6, 'Ok', '👌'),
      yn(7, SAME, 'Officer', 'Umbrella', '👮', '☂️', false),
      yn(8, SAME, 'Owl', 'Oil', '🦉', '🫙', true),
      yn(9, SAME, 'Orange', 'Fox', '🍊', '🦊', false),
      qc(10, 'Which word starts with O?', [{ word: 'Otter', emoji: '🦦', isCorrect: true }, { word: 'Happy', emoji: '😊', isCorrect: false }, { word: 'Arm', emoji: '💪', isCorrect: false }]),
      tw(11, 'Orange', '🍊'),
      cm(12, 'O', ['o', 'a', 'c', 'e'], 'o'),
      sr(13, 'God is our peace. He is our resting place.'),
      sc(13, 'God is our peace. He is our resting place.'),
      done(14),
    ],
  },
  {
    letter: 'P', attribute: 'the Potter',
    sentence: 'God is the potter. We are clay in his hands.',
    color: '#55EFC4', lightColor: '#EAFFF7', darkColor: '#1A7A5E', emoji: '🏺',
    image: '/images/letters/P.svg',
    slides: [
      w('P'), ph('P'),
      v(3, 'Pan', '🍳'), v(4, 'Pull', '💪'), v(5, 'Puppy', '🐶'),
      yn(6, SAME, 'Pie', 'Bed', '🥧', '🛏️', false),
      qc(7, 'Which word starts with P?', [{ word: 'Purple', emoji: '💜', isCorrect: true }, { word: 'Pig', emoji: '🐷', isCorrect: true }, { word: 'Dress', emoji: '👗', isCorrect: false }]),
      lc(8, 'Pot', ['p', 'b', 'd', 'q'], 'p'),
      yn(9, SAME, 'Play', 'Pumpkin', '🎮', '🎃', true),
      tw(10, 'Pan', '🍳'),
      cm(11, 'P', ['p', 'b', 'd', 'q'], 'p'),
      yn(12, DIFF, 'Bet', 'Pet', '🎰', '🐾', false),
      sr(13, 'God is the potter. We are clay in his hands.'),
      sc(13, 'God is the potter. We are clay in his hands.'),
      done(14),
    ],
  },
  {
    letter: 'Q', attribute: 'Quintessential',
    sentence: 'God is quintessential. There is no one like him.',
    color: '#81ECEC', lightColor: '#E8FFFE', darkColor: '#006B65', emoji: '💎',
    image: '/images/letters/Q.svg',
    slides: [
      w('Q'), ph('Q'),
      v(3, 'Quack', '🦆'), v(4, 'Quarter', '🪙'), v(5, 'Queen', '👸'),
      lc(6, 'Quilt', ['q', 'p', 'g', 'd'], 'q'),
      lc(7, 'Quiet', ['q', 'p', 'g', 'd'], 'q'),
      yn(8, SAME, 'Question', 'Kite', '❓', '🪁', true),
      yn(9, SAME, 'Quack', 'Car', '🦆', '🚗', true),
      tw(10, 'Quack', '🦆'),
      cm(11, 'Q', ['q', 'p', 'g', 'd'], 'q'),
      sr(12, 'God is quintessential. There is no one like him.'),
      sc(12, 'God is quintessential. There is no one like him.'),
      done(13),
    ],
  },
  {
    letter: 'R', attribute: 'our Refuge',
    sentence: 'God is our refuge. We are safe in him.',
    color: '#F78FB3', lightColor: '#FFE8F0', darkColor: '#A0295B', emoji: '🏰',
    image: '/images/letters/R.svg',
    slides: [
      w('R'), ph('R'),
      v(3, 'Run', '🏃'), v(4, 'River', '🏞️'), v(5, 'Ring', '💍'), v(6, 'Red', '🔴'),
      lc(7, 'Rip', ['r', 'n', 'h', 'm'], 'r'),
      qc(8, 'Which word starts with R?', [{ word: 'Read', emoji: '📖', isCorrect: true }, { word: 'Wall', emoji: '🧱', isCorrect: false }, { word: 'Star', emoji: '⭐', isCorrect: false }]),
      qc(9, 'Which word starts with R?', [{ word: 'Robot', emoji: '🤖', isCorrect: true }, { word: 'Ring', emoji: '💍', isCorrect: true }, { word: 'Swim', emoji: '🏊', isCorrect: false }]),
      tw(10, 'Run', '🏃'),
      yn(11, DIFF, 'Rest', 'West', '😴', '🌅', false),
      cm(12, 'R', ['r', 'n', 'h', 'm'], 'r'),
      sr(13, 'God is our refuge. We are safe in him.'),
      sc(13, 'God is our refuge. We are safe in him.'),
      done(14),
    ],
  },
  {
    letter: 'S', attribute: 'our Savior',
    sentence: 'God is our savior. He delivered us from our sins.',
    color: '#F9CA24', lightColor: '#FFFBE7', darkColor: '#B8860B', emoji: '🛡️',
    image: '/images/letters/S.svg',
    slides: [
      w('S'), ph('S'),
      v(3, 'Swim', '🏊'), v(4, 'Seven', '7️⃣'), v(5, 'Sad', '😢'),
      lc(6, 'Sun', ['s', 'z', 'c', 'x'], 's'),
      yn(7, SAME, 'Sleep', 'Star', '😴', '⭐', true),
      lc(8, 'Six', ['s', 'z', 'c', 'x'], 's'),
      qc(9, 'Which word starts with S?', [{ word: 'Spider', emoji: '🕷️', isCorrect: true }, { word: 'Stick', emoji: '🥢', isCorrect: true }, { word: 'Zebra', emoji: '🦓', isCorrect: false }]),
      tw(10, 'Swim', '🏊'),
      cm(11, 'S', ['s', 'z', 'c', 'x'], 's'),
      sr(12, 'God is our savior. He delivered us from our sins.'),
      sc(12, 'God is our savior. He delivered us from our sins.'),
      done(13),
    ],
  },
  {
    letter: 'T', attribute: 'Truth',
    sentence: 'God is truth. He never lies.',
    color: '#6AB04C', lightColor: '#EAFAE0', darkColor: '#2E7D32', emoji: '✔️',
    image: '/images/letters/T.svg',
    slides: [
      w('T'), ph('T'),
      v(3, 'Tiger', '🐯'), v(4, 'Train', '🚂'), v(5, 'Tricycle', '🚲'),
      lc(6, 'Ten', ['t', 'f', 'l', 'j'], 't'),
      yn(7, SAME, 'Top', 'Drop', '🪀', '💧', false),
      yn(8, SAME, 'Time', 'Ten', '⏰', '🔟', true),
      qc(9, 'Which word starts with T?', [{ word: 'Turtle', emoji: '🐢', isCorrect: true }, { word: 'Table', emoji: '🪑', isCorrect: true }, { word: 'Zoom', emoji: '🔍', isCorrect: false }]),
      tw(10, 'Tiger', '🐯'),
      cm(11, 'T', ['t', 'f', 'l', 'j'], 't'),
      sr(12, 'God is truth. He never lies.'),
      sc(12, 'God is truth. He never lies.'),
      done(13),
    ],
  },
  {
    letter: 'U', attribute: 'Understanding',
    sentence: 'God is understanding. He knows everything.',
    color: '#7C83FD', lightColor: '#EEEFFF', darkColor: '#3D348B', emoji: '🧠',
    image: '/images/letters/U.svg',
    slides: [
      w('U'), ph('U'),
      v(3, 'Unzip', '🤐'), v(4, 'Umbrella', '☂️'), v(5, 'Unicorn', '🦄'),
      yn(6, SAME, 'Under', 'Up', '⬇️', '⬆️', true),
      tw(7, 'Uncle', '👨'),
      tw(8, 'Umbrella', '☂️'),
      cm(9, 'U', ['u', 'n', 'v', 'w'], 'u'),
      sr(10, 'God is understanding. He knows everything.'),
      sc(10, 'God is understanding. He knows everything.'),
      done(11),
    ],
  },
  {
    letter: 'V', attribute: 'the Vine',
    sentence: 'God is the vine. We are the branches who receive life from him.',
    color: '#4ECDC4', lightColor: '#E8FFFE', darkColor: '#006B65', emoji: '🌿',
    image: '/images/letters/V.svg',
    slides: [
      w('V'), ph('V'),
      v(3, 'Van', '🚐'), v(4, 'Violin', '🎻'), v(5, 'Vegetables', '🥦'),
      yn(6, SAME, 'Feet', 'Vase', '🦶', '🏺', false),
      yn(7, SAME, 'Vest', 'House', '🦺', '🏠', false),
      lc(8, 'Vine', ['v', 'u', 'w', 'y'], 'v'),
      tw(9, 'Van', '🚐'),
      yn(10, DIFF, 'Verse', 'Worse', '📖', '😞', false),
      cm(11, 'V', ['v', 'u', 'w', 'y'], 'v'),
      sr(12, 'God is the vine. We are the branches who receive life from him.'),
      sc(12, 'God is the vine. We are the branches who receive life from him.'),
      done(13),
    ],
  },
  {
    letter: 'W', attribute: 'Wonderful',
    sentence: 'God is wonderful. Every good thing comes from him.',
    color: '#45B7D1', lightColor: '#E8F6FD', darkColor: '#1565C0', emoji: '🌟',
    image: '/images/letters/W.svg',
    slides: [
      w('W'), ph('W'),
      v(3, 'Woman', '👩'), v(4, 'Worm', '🪱'), v(5, 'Wall', '🧱'),
      lc(6, 'Win', ['w', 'm', 'v', 'n'], 'w'),
      yn(7, SAME, 'Wolf', 'Walk', '🐺', '🚶', true),
      tw(8, 'Woman', '👩'),
      yn(9, DIFF, 'Walk', 'Talk', '🚶', '💬', false),
      cm(10, 'W', ['w', 'm', 'v', 'n'], 'w'),
      sr(11, 'God is wonderful. Every good thing comes from him.'),
      sc(11, 'God is wonderful. Every good thing comes from him.'),
      done(12),
    ],
  },
  {
    letter: 'X', attribute: 'Extremely Gracious',
    sentence: 'God is extremely gracious. He forgives our sins and sets us free.',
    color: '#ED4C67', lightColor: '#FFE8EC', darkColor: '#8B0024', emoji: '🎁',
    image: '/images/letters/X.svg',
    slides: [
      w('X'), ph('X'),
      v(3, 'Xray', '🦴'), v(4, 'Box', '📦'), v(5, 'Ax', '🪓'), v(6, 'Excited', '😄'),
      lc(7, 'Six', ['x', 'k', 'z', 'y'], 'x'),
      lc(8, 'Fox', ['x', 'k', 'z', 'y'], 'x'),
      tw(9, 'Mix', '🥄'),
      cm(10, 'X', ['x', 'k', 'z', 'y'], 'x'),
      sr(11, 'God is extremely gracious. He forgives our sins and sets us free.'),
      sc(11, 'God is extremely gracious. He forgives our sins and sets us free.'),
      done(12),
    ],
  },
  {
    letter: 'Y', attribute: 'Your Redeemer',
    sentence: 'God is your redeemer. He redeemed us through Jesus Christ.',
    color: '#FAB1A0', lightColor: '#FFF5F0', darkColor: '#8B3A2A', emoji: '🙏',
    image: '/images/letters/Y.svg',
    slides: [
      w('Y'), ph('Y'),
      v(3, 'Yellow', '💛'), v(4, 'Yo-yo', '🪀'), v(5, 'Yarn', '🧶'),
      tw(6, 'Yard', '🏡'),
      tw(7, 'Yolk', '🥚'),
      yn(8, SAME, 'Ice', 'Yo-yo', '🧊', '🪀', false),
      yn(9, SAME, 'Vine', 'Yellow', '🌿', '💛', false),
      yn(10, DIFF, 'Yet', 'Jet', '⏳', '✈️', false),
      cm(11, 'Y', ['y', 'v', 'j', 'g'], 'y'),
      sr(12, 'God is your redeemer. He redeemed us through Jesus Christ.'),
      sc(12, 'God is your redeemer. He redeemed us through Jesus Christ.'),
      done(13),
    ],
  },
  {
    letter: 'Z', attribute: 'Zealous',
    sentence: 'God is zealous. He is eager to see us saved.',
    color: '#9B59B6', lightColor: '#F4E6FF', darkColor: '#5B2C6F', emoji: '🔥',
    image: '/images/letters/Z.svg',
    slides: [
      w('Z'), ph('Z'),
      v(3, 'Zipper', '🤐'), v(4, 'Zoo', '🎪'), v(5, 'Zebra', '🦓'),
      tw(6, 'Zigzag', '⚡'),
      tw(7, 'Zipper', '🤐'),
      lc(8, 'Zoom', ['z', 's', 'x', 'n'], 'z'),
      cm(9, 'Z', ['z', 's', 'x', 'n'], 'z'),
      sr(10, 'God is zealous. He is eager to see us saved.'),
      sc(10, 'God is zealous. He is eager to see us saved.'),
      done(11),
    ],
  },
];

export const MODULE_MAP: Record<string, LetterModule> = Object.fromEntries(
  MODULES.map((m) => [m.letter, m])
);
