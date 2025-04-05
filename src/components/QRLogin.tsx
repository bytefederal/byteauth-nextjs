import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import byteAuthConfig from '@/config/byteauth';
import { useByteAuthStore } from '@/hooks/useByteAuthStore';

type QRLoginProps = {
  onSidUpdate?: (sid: string) => void;
};

const QRLogin: React.FC<QRLoginProps> = ({ onSidUpdate }) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { setSid } = useByteAuthStore();

  const generateQRCode = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(byteAuthConfig.authEndpoint, {
        params: {
          domain: byteAuthConfig.domain,
          api_key: byteAuthConfig.apiKey,
          protocol: 'bytewallet',
        },
      });

      if (response.data && response.data.qr && response.data.sid) {
        setQrCode(response.data.qr);
        setSid(response.data.sid);
        
        // Store sid in localStorage for persistence
        localStorage.setItem('byteauth_sid', response.data.sid);
        
        // Call the onSidUpdate callback if provided
        if (onSidUpdate) {
          onSidUpdate(response.data.sid);
        }
      }
    } catch (error) {
      console.error('Failed to fetch QR code:', error);
    } finally {
      setLoading(false);
    }
  }, [setSid, onSidUpdate]);

  useEffect(() => {
    generateQRCode();

    // Refresh the QR code every 60 seconds
    const interval = setInterval(() => {
      generateQRCode();
    }, 60000);

    return () => clearInterval(interval);
  }, [generateQRCode]);

  return (
    <div className="qr-login-container">
      {loading ? (
        <div className="qr-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="qr-code">
          {qrCode && <QRCodeSVG value={qrCode} size={250} />}
        </div>
      )}

      <style jsx>{`
        .qr-login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 250px;
          width: 100%;
        }

        .qr-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .qr-code {
          padding: 16px;
          background: white;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default QRLogin;