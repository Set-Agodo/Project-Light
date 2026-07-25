import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: { absolute: 'Project Light — Literacy for Life Transformation' },
  description: 'A scripture-based A–Z literacy program for pre-readers, early learners, and ESL students. Each letter introduces an attribute of God.',
  openGraph: {
    title: 'Project Light — Literacy for Life Transformation',
    description: 'A scripture-based A–Z literacy program for pre-readers, early learners, and ESL students. Each letter introduces an attribute of God.',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
