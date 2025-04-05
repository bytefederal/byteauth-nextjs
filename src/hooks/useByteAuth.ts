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

  const verifySession = useCallback(async (sessionId: string, email: string) => {
    try {
      const response = await axios.get(byteAuthConfig.verifySessionEndpoint, {
        params: {
          api_key: byteAuthConfig.apiKey,
          sid: sessionId,
          email: email,
          domain: byteAuthConfig.domain,
        },
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('Failed to verify session:', error);
      return false;
    }
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