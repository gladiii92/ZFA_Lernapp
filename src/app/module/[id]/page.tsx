import { courseData } from '@/data/courseData';
import { ModuleLessonClient } from '@/components/lesson/ModuleLessonClient';

export function generateStaticParams() {
  return courseData.modules.map((mod) => ({
    id: mod.id,
  }));
}

export default function ModulePage({ params }: { params: { id: string } }) {
  return <ModuleLessonClient moduleId={params.id} />;
}
