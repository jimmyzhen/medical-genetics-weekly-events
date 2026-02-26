import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@styles/globals.css';

function Application({ Component, pageProps }) {
  const router = useRouter();
  const [authState, setAuthState] = useState(null); // null = checking, true/false

  useEffect(() => {
    if (router.pathname === '/login') {
      setAuthState(true);
      return;
    }

    fetch('/api/auth-check')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthState(true);
        } else {
          setAuthState(false);
          router.replace('/login');
        }
      })
      .catch(() => {
        setAuthState(false);
        router.replace('/login');
      });
  }, [router.pathname]);

  if (authState === null) return null;
  if (!authState && router.pathname !== '/login') return null;

  return <Component {...pageProps} />
}

export default Application
