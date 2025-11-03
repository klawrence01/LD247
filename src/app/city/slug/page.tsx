import { use } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CityPage({ params }: PageProps) {
  const { slug } = params;

  return (
    <div>
      <h1>Welcome to {slug.charAt(0).toUpperCase() + slug.slice(1)}!</h1>
      <p>This is the dynamic city page for {slug}.</p>
    </div>
  );
}
