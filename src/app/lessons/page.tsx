import type { Metadata } from 'next';
import CarouselGallery from '@/components/CarouselGallery';

export const metadata: Metadata = {
  title: 'A–Z Letter Lessons',
  description: 'Choose any letter from A to Z to start an interactive phonics lesson. Each module pairs a letter with an attribute of God — from Awesome to Zealous.',
  openGraph: {
    title: 'A–Z Letter Lessons | Project Light',
    description: 'Interactive phonics lessons for every letter of the alphabet, each paired with an attribute of God.',
  },
};

export default function LessonsPage() {
  return <CarouselGallery />;
}
