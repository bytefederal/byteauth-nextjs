import React from 'react';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
  }),
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
}));

// Mock useByteAuthStore
jest.mock('@/hooks/useByteAuthStore', () => ({
  useByteAuthStore: jest.fn(() => ({
    sid: '',
    isAuthenticated: false,
    user: null,
    setSid: jest.fn(),
    setIsAuthenticated: jest.fn(),
    setUser: jest.fn(),
    reset: jest.fn(),
  })),
}));