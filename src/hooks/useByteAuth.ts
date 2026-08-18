import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useByteAuthStore } from './useByteAuthStore';
import byteAuthConfig from '@/config/byteauth';

interface UseByteAuthOptions {
  redirectOnAuth?: boolean;
  redirectPath?: string;
  pollingInterval?: number;
}

export const useByteAuth = (options: UseByteAuthOptions = {}) => {
  const {
    redirectOnAuth = true,
    redirectPath = byteAuthConfig.homeRedirect,
    pollingInterval = 5000,
  } = options;

  const router = useRouter();
  const { sid, isAuthenticated, user, setSid, setIsAuthenticated, setUser } = useByteAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * @deprecated Session verification must happen server-side and this always
   * returns false.
   *
   * SECURITY: this ran in the browser and sent `byteAuthConfig.apiKey`, which
   * resolves from BYTEAUTH_API_KEY — a server-only variable, so it was always
   * `undefined` here. Re-exposing it as NEXT_PUBLIC_ to "fix" that would publish
   * your API key to every visitor. It also trusted any 2xx and ignored the
   * `valid` field in the response body.
   *
   * Verify sessions in the webhook handlers under pages/api/byteauth/ instead,
   * and use checkAuthStatus() from this hook to read the result.
   */
  const verifySession = useCallback(async (_sessionId: string, _email: string) => {
    console.error(
      'useByteAuth: verifySession() is deprecated and always returns false. ' +
        'Verify sessions server-side in pages/api/byteauth/webhook/, then poll ' +
        'checkAuthStatus(). See the security notice in the README.'
    );
    return false;
  }, []);

  const checkAuthStatus = useCallback(async () => {
    if (!sid) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/byteauth/check', {
        params: { sid },
      });

      if (response.data.authenticated) {
        setIsAuthenticated(true);
        setUser(response.data.user);

        if (redirectOnAuth) {
          router.push(redirectPath);
        }
      }
    } catch (err) {
      setError('Failed to check authentication status');
      console.error('Error checking auth status:', err);
    } finally {
      setLoading(false);
    }
  }, [sid, redirectOnAuth, redirectPath, router, setIsAuthenticated, setUser]);

  useEffect(() => {
    // Check for stored SID in localStorage on component mount
    const storedSid = typeof window !== 'undefined' ? localStorage.getItem('byteauth_sid') : null;
    if (storedSid && !sid) {
      setSid(storedSid);
    }

    // Only start polling if we have a SID and user is not already authenticated
    if (sid && !isAuthenticated) {
      checkAuthStatus();
      
      const interval = setInterval(() => {
        checkAuthStatus();
      }, pollingInterval);
      
      return () => clearInterval(interval);
    }
  }, [sid, isAuthenticated, checkAuthStatus, setSid, pollingInterval]);

  return {
    sid,
    isAuthenticated,
    user,
    loading,
    error,
    setSid,
    verifySession,
    checkAuthStatus,
  };
};

export default useByteAuth;