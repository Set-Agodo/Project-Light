import type { Metadata } from 'next';
import SightWordsClient from './SightWordsClient';

export const metadata: Metadata = {
  title: '50 Sight Words',
  description: 'Practice the 50 most common English words with interactive audio flash cards. These words make up about half of everything you read.',
  openGraph: {
    title: '50 Sight Words | Project Light',
    description: 'Tap each flash card to hear the word spoken aloud. Master the 50 words that make up half of everything you read.',
  },
};

export default function SightWordsPage() {
  return <SightWordsClient />;
}
