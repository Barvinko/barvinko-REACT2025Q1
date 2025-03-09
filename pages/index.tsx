import { useEffect } from 'react';
import { useRouter } from 'next/router';

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/page/1');
  }, [router]);

  return null;
}

export default HomePage;
