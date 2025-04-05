import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  // If the user is not authenticated, redirect to login
  React.useEffect(() => {
    if (!loading && !session) {
      router.push('/login');
    }
  }, [session, loading, router]);

  // Handle loading state
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
        
        <style jsx>{`
          .dashboard-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #09f;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If no session, don't render anything (will be redirected)
  if (!session) {
    return null;
  }

  // Render the dashboard for authenticated users
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <span>{session.user?.name || session.user?.email}</span>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="sign-out-button"
            >
              Sign Out
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="welcome-card">
            <h2>Welcome to Your Dashboard</h2>
            <p>You are now authenticated with ByteAuth!</p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Profile</h3>
              <p>Your profile information</p>
              <ul className="profile-list">
                <li><strong>Name:</strong> {session.user?.name || 'Not provided'}</li>
                <li><strong>Email:</strong> {session.user?.email || 'Not provided'}</li>
                <li><strong>ID:</strong> {session.user?.id || 'Not provided'}</li>
              </ul>
            </div>

            <div className="dashboard-card">
              <h3>Security</h3>
              <p>Your account is secured with ByteAuth cryptographic authentication.</p>
              <p>Authentication method: <strong>Bitcoin Cryptography</strong></p>
            </div>

            <div className="dashboard-card">
              <h3>Wallet</h3>
              <p>Your ByteWallet gives you access to lightning and bitcoin transactions.</p>
              <button className="dashboard-button">Open Wallet</button>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 20px;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eaeaea;
        }

        .dashboard-header h1 {
          font-size: 2rem;
          color: #333;
          margin: 0;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sign-out-button {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .sign-out-button:hover {
          background-color: #d32f2f;
        }

        .welcome-card {
          background-color: #0070f3;
          color: white;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .welcome-card h2 {
          margin-top: 0;
          margin-bottom: 10px;
        }

        .welcome-card p {
          margin: 0;
          opacity: 0.9;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .dashboard-card {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .dashboard-card h3 {
          margin-top: 0;
          color: #333;
          margin-bottom: 10px;
        }

        .dashboard-button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 15px;
        }

        .dashboard-button:hover {
          background-color: #0060df;
        }

        .profile-list {
          list-style-type: none;
          padding: 0;
        }

        .profile-list li {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;