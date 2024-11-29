'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Success() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Check if `router.isReady` to ensure the query parameters are loaded
    if (router.isReady && router.query.session_id) {
      setSessionId(router.query.session_id);
    }
  }, [router.isReady, router.query.session_id]);

  return (
    <div>
      <h1>Success Page</h1>
      {sessionId ? (
        <p>Session ID: {sessionId}</p>
      ) : (
        <p>Loading session ID...</p>
      )}
    </div>
  );
}
