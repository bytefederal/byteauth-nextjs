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

    // Find or create the user in your database
    const user = await findOrCreateUser(email, bytename);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'Failed to find or create user',
      });
    }

    // Store the authenticated SID in your caching system
    await storeAuthenticatedSid(sid, user.id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error processing login webhook:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

// Verify session integrity with ByteAuth service
async function verifySessionIntegrity(sid: string, email: string): Promise<boolean> {
  try {
    const params = {
      api_key: byteAuthConfig.apiKey,
      sid: sid,
      email: email,
      domain: byteAuthConfig.domain,
    };

    const response = await axios.get(byteAuthConfig.verifySessionEndpoint, { params });
    return response.status === 200;
  } catch (error) {
    console.error('Error verifying session integrity:', error);
    return false;
  }
}

// Mock function to find or create a user
// In a real implementation, this would interact with your database
async function findOrCreateUser(email: string, name: string): Promise<any | null> {
  // Implement your user lookup/creation logic
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