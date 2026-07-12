export const SIGHT_WORDS: string[] = [
  'the', 'of', 'and', 'a', 'to', 'in', 'it', 'you', 'that', 'he',
  'for', 'on', 'as', 'with', 'his', 'they', 'I', 'at', 'be', 'this',
  'have', 'from', 'or', 'one', 'by', 'but', 'not', 'what', 'all', 'we',
  'there', 'an', 'which', 'she', 'do', 'their', 'if', 'about', 'get', 'go',
  'her', 'me', 'my', 'out', 'say', 'so', 'up', 'who', 'will', 'would',
];

export function getSightWordAudio(word: string): string {
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  return `/audio/sight-words/${capitalized}.m4a`;
}
