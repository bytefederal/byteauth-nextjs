interface ByteAuthConfig {
  domain: string;
  apiKey: string;
  homeRedirect: string;
  authEndpoint: string;
  verifySessionEndpoint: string;
}

const byteAuthConfig: ByteAuthConfig = {
  domain: process.env.NEXT_PUBLIC_BYTEAUTH_DOMAIN || 'localhost:3000',
  apiKey: process.env.BYTEAUTH_API_KEY || '',
  homeRedirect: process.env.NEXT_PUBLIC_BYTEAUTH_HOME_REDIRECT || '/dashboard',
  authEndpoint: 'https://auth.bytefederal.com/getqrcode',
  verifySessionEndpoint: 'https://auth.bytefederal.com/api/verify-session',
};

export default byteAuthConfig;