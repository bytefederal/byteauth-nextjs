import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import byteAuthConfig from '@/config/byteauth';

// Types for the response data
type ResponseData = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { sid, email, bytename } = req.body;

    if (!sid || !email || !bytename) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: sid, email, and bytename are required',
      });
    }

    // Verify session integrity with ByteAuth service
    const isValid = await verifySessionIntegrity(sid, email);
    
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Session verification failed',
      });
    }

    // Create or find the user in your database
    // This is where you would integrate with your user management system
    const user = await createOrFindUser(email, bytename);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create or find user',
      });
    }

    // Store the authenticated SID in your caching system
    // For demonstration, we'll mock this
    await storeAuthenticatedSid(sid, user.id);

    return res.status(200).json({
      success: true,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Error processing registration webhook:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

// Verify session integrity with ByteAuth service
async function verifySessionIntegrity(sid: string, email: string): Promise<boolean> {
  // SECURITY: fail closed when the API key is unset. Without it the upstream
  // cannot bind the session to your domain.
  if (!byteAuthConfig.apiKey) {
    console.error('BYTEAUTH_API_KEY is not set; refusing to verify session.');
    return false;
  }

  try {
    const params = {
      api_key: byteAuthConfig.apiKey,
      sid: sid,
      email: email,
      domain: byteAuthConfig.domain,
    };

    const response = await axios.get(byteAuthConfig.verifySessionEndpoint, { params });

    // SECURITY: a 2xx alone is not proof of a valid session — an upstream that
    // returns 200 for an unknown or mismatched sid would yield a false "valid".
    // Require an explicit valid=true AND that the verified email matches the one
    // we were asked to authenticate. That second check binds sid <-> email.
    if (response.status !== 200) {
      return false;
    }

    const data = response.data;
    if (!data || typeof data !== 'object' || data.valid !== true) {
      return false;
    }

    if (
      typeof data.email === 'string' &&
      data.email.toLowerCase() !== email.toLowerCase()
    ) {
      console.warn('Session verification email mismatch.');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verifying session integrity:', error);
    return false;
  }
}

// Mock function to create or find a user
// In a real implementation, this would interact with your database
async function createOrFindUser(email: string, name: string): Promise<any | null> {
  // Implement your user creation/lookup logic
  // For example, using Prisma, TypeORM, or any other ORM
  
  // Mock return for demonstration
  return {
    id: '123',
    email,
    name,
  };
}

// Mock function to store authenticated SID
// In a real implementation, this would store in Redis, database, etc.
async function storeAuthenticatedSid(sid: string, userId: string): Promise<void> {
  // Implement your storage logic
  // For example, using Redis:
  // await redis.set(`authenticated_sid_${sid}`, userId, 'EX', 600); // 10 minutes expiry
}