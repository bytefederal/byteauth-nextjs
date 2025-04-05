import React, { useState } from 'react';
import QRLogin from './QRLogin';
import useByteAuth from '@/hooks/useByteAuth';

type ByteAuthProps = {
  mode?: 'tab' | 'standalone';
  onAuthSuccess?: (user: any) => void;
};

const ByteAuth: React.FC<ByteAuthProps> = ({ 
  mode = 'tab',
  onAuthSuccess 
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'crypto'>('email');
  const { loading, isAuthenticated, user } = useByteAuth();

  // When authentication is successful and we have a user, call the callback
  React.useEffect(() => {
    if (isAuthenticated && user && onAuthSuccess) {
      onAuthSuccess(user);
    }
  }, [isAuthenticated, user, onAuthSuccess]);

  // If in standalone mode, directly show the QR code
  if (mode === 'standalone') {
    return (
      <div className="byteauth-container">
        <div className="byteauth-standalone">
          <h2>Login with ByteWallet</h2>
          <p>Scan the QR code with your ByteWallet app</p>
          
          <div className="byteauth-qrcode-container">
            <QRLogin />
          </div>
          
          <p className="byteauth-footer">
            Don't have ByteWallet yet? 
            <a href="https://www.bytefederal.com/bytewallet" target="_blank" rel="noopener noreferrer">
              Download it now
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Tab mode: Show tabs for Email and Crypto login
  return (
    <div className="byteauth-container">
      <div className="byteauth-tabs">
        <button 
          className={`byteauth-tab ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          Email
        </button>
        <button 
          className={`byteauth-tab ${activeTab === 'crypto' ? 'active' : ''}`}
          onClick={() => setActiveTab('crypto')}
        >
          Crypto Wallet
        </button>
      </div>

      <div className="byteauth-content">
        {activeTab === 'email' ? (
          <div className="byteauth-email-content">
            {/* This area will be empty - it's meant to show your existing email login form */}
          </div>
        ) : (
          <div className="byteauth-crypto-content">
            <h3>Login with ByteWallet</h3>
            <p>Scan the QR code with your ByteWallet app</p>
            
            <div className="byteauth-qrcode-container">
              <QRLogin />
            </div>
            
            <p className="byteauth-footer">
              Don't have ByteWallet yet? 
              <a href="https://www.bytefederal.com/bytewallet" target="_blank" rel="noopener noreferrer">
                Download it now
              </a>
            </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .byteauth-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          width: 100%;
          margin: 0 auto;
        }

        .byteauth-tabs {
          display: flex;
          border-bottom: 1px solid #eaeaea;
          margin-bottom: 20px;
        }

        .byteauth-tab {
          padding: 10px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          border-bottom: 2px solid transparent;
          transition: all 0.3s;
        }

        .byteauth-tab.active {
          border-bottom: 2px solid #0070f3;
          color: #0070f3;
        }

        .byteauth-tab:hover {
          color: #0070f3;
        }

        .byteauth-content {
          padding: 20px 0;
        }

        .byteauth-crypto-content,
        .byteauth-standalone {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .byteauth-qrcode-container {
          margin: 20px 0;
          padding: 10px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .byteauth-footer {
          font-size: 14px;
          margin-top: 20px;
        }

        .byteauth-footer a {
          margin-left: 5px;
          color: #0070f3;
          text-decoration: none;
        }

        .byteauth-footer a:hover {
          text-decoration: underline;
        }
      ` }} />
    </div>
  );
};

export default ByteAuth;