import { useParams } from 'react-router-dom';

export default function Story() {
  const { id } = useParams<{ id: string }>();
  return <main className="w-full h-full">Story</main>;
}
