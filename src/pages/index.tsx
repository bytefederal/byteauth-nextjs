import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const IndexPage: React.FC = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <div className="index-page">
      <div className="container">
        <header className="header">
          <h1>ByteAuth NextJS</h1>
          <p className="subtitle">Secure passwordless authentication using crypto wallets</p>
        </header>

        <main className="main">
          <div className="card">
            <h2>Welcome to ByteAuth NextJS</h2>
            <p>
              ByteAuth NextJS is a plugin for NextJS applications that enables biometrically secured
              passwordless authentication using crypto wallets.
            </p>

            <div className="features">
              <div className="feature">
                <h3>🔒 Secure</h3>
                <p>Uses Bitcoin cryptographic (ECDSA/SHA256) standards for authentication</p>
              </div>
              <div className="feature">
                <h3>📱 Mobile</h3>
                <p>Utilizes smartphone biometrics as a universal access key</p>
              </div>
              <div className="feature">
                <h3>🧠 Smart</h3>
                <p>Incorporates user identity checks to prevent fraudulent access</p>
              </div>
              <div className="feature">
                <h3>💼 Complete</h3>
                <p>Provides users with a wallet that supports lightning and bitcoin transactions</p>
              </div>
            </div>

            <div className="auth-status">
              {loading ? (
                <p>Loading authentication status...</p>
              ) : session ? (
                <div>
                  <p>You are signed in as {session.user?.name || session.user?.email}</p>
                  <Link href="/dashboard">
                    <span className="button">Go to Dashboard</span>
                  </Link>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link href="/login">
                    <span className="button">Login with Tab Mode</span>
                  </Link>
                  <Link href="/byte-login">
                    <span className="button secondary">Login with Standalone Mode</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>
            Powered by <a href="https://fast.bytefederal.com" target="_blank" rel="noopener noreferrer">ByteAuth</a>
          </p>
        </footer>
      </div>

      <style jsx>{`
        .index-page {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
        }

        .container {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 1000px;
        }

        .header {
          width: 100%;
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #666;
          font-size: 1.2rem;
        }

        .main {
          width: 100%;
        }

        .card {
          background-color: white;
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card h2 {
          margin-bottom: 1rem;
          color: #333;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .feature h3 {
          margin-bottom: 0.5rem;
          color: #0070f3;
        }

        .auth-status {
          margin-top: 2rem;
          text-align: center;
        }

        .auth-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .button {
          display: inline-block;
          background-color: #0070f3;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .button:hover {
          background-color: #0060df;
        }

        .button.secondary {
          background-color: #333;
        }

        .button.secondary:hover {
          background-color: #555;
        }

        .footer {
          width: 100%;
          height: 50px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
        }

        .footer a {
          color: #0070f3;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;