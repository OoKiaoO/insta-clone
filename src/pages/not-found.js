import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not found!';
  }, []);
  // to have the effect take place only on first load, include empty square brakets as second argument

  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Page Not Found!</p>
      </div>
    </div>
  );
}
