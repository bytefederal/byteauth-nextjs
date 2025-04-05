import React from 'react';
import { useRouter } from 'next/router';
import ByteAuth from '@/components/ByteAuth';
import byteAuthConfig from '@/config/byteauth';

const ByteLoginPage: React.FC = () => {
  const router = useRouter();

  const handleAuthSuccess = (user: any) => {
    console.log('ByteAuth authentication successful', user);
    router.push(byteAuthConfig.homeRedirect);
  };

  return (
    <div className="byte-login-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-left">
            <div className="auth-content">
              <h1>Welcome</h1>
              <p>Scan with ByteWallet app to securely log in.</p>
              
              <ByteAuth mode="standalone" onAuthSuccess={handleAuthSuccess} />
              
              <p className="auth-footer">
                Powered by <a href="https://fast.bytefederal.com" target="_blank" rel="noopener noreferrer">ByteAuth</a>
              </p>
            </div>
          </div>
          <div className="auth-card-right">
            <div className="auth-image-container">
              <h2>Biometrically Secured Login</h2>
              <p>No username or password needed</p>
              <p>Secured by Bitcoin cryptography</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .byte-login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 20px;
        }

        .auth-container {
          width: 100%;
          max-width: 1000px;
        }

        .auth-card {
          display: flex;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .auth-card-left {
          flex: 1;
          padding: 40px;
        }

        .auth-card-right {
          flex: 1;
          background-color: #10111E;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }

        .auth-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .auth-content h1 {
          font-size: 32px;
          color: #333;
          margin-bottom: 10px;
        }

        .auth-content p {
          color: #666;
          margin-bottom: 20px;
          text-align: center;
        }

        .auth-image-container {
          text-align: center;
        }

        .auth-image-container h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .auth-image-container p {
          margin: 10px 0;
          font-size: 16px;
          opacity: 0.8;
        }

        .auth-footer {
          margin-top: 40px;
          font-size: 14px;
          color: #666;
        }

        .auth-footer a {
          color: #0070f3;
          text-decoration: none;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .auth-card {
            flex-direction: column;
          }

          .auth-card-left,
          .auth-card-right {
            padding: 30px;
          }

          .auth-card-right {
            display: none; /* Hide the right panel on small screens */
          }
        }
      `}</style>
    </div>
  );
};

export default ByteLoginPage;