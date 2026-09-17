import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth, UserRole } from './contexts/AuthContext';
import { RequesterProvider } from './contexts/RequesterContext';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import CreateTicketForm from './components/CreateTicketForm';
import MyTickets from './components/MyTickets';
import TicketDetail from './components/TicketDetail';

interface Category {
  id: number;
  name: string;
}

interface RelatedSystem {
  id: number;
  name: string;
}

type TabType = 'create' | 'my-tickets';

const ROLE_CONFIG: Record<UserRole, { label: string; bg: string; color: string; border: string }> = {
  REQUESTER: {
    label: 'Requester',
    bg: '#E8F5E9',
    color: '#2E7D32',
    border: '1px solid #A5D6A7',
  },
  IT_STAFF: {
    label: 'IT Staff',
    bg: '#E3F2FD',
    color: '#1565C0',
    border: '1px solid #90CAF9',
  },
  ADMINISTRATOR: {
    label: 'Administrator',
    bg: '#EDE7F6',
    color: '#512DA8',
    border: '1px solid #B39DDB',
  },
};

const MainApplication: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('create');
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [relatedSystems, setRelatedSystems] = useState<RelatedSystem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, sysRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/related-systems'),
        ]);

        if (!catRes.ok || !sysRes.ok) {
          throw new Error('Failed to fetch reference data');
        }

        const catData = await catRes.json();
        const sysData = await sysRes.json();

        setCategories(catData);
        setRelatedSystems(sysData);
      } catch {
        setError('Unable to connect to TokTickIT API');
      } finally {
        setLoading(false);
      }
    };

    if (user && !user.mustChangePassword) {
      fetchData();
    }
  }, [user]);

  // Loading indicator while initializing auth
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F7F6' }}>
        <span style={{ color: '#006B3C', fontSize: '16px', fontWeight: '600' }}>Loading TokTickIT...</span>
      </div>
    );
  }

  // Mandatory Login view when unauthenticated
  if (!user) {
    return <Login />;
  }

  // Mandatory Change Password view for users with mustChangePassword = true
  if (user.mustChangePassword) {
    return <ChangePassword />;
  }

  const roleBadge = ROLE_CONFIG[user.role] || ROLE_CONFIG.REQUESTER;

  return (
    <div className="container py-4">
      {/* App Header & Identity Banner */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm border">
        <div>
          <h1 className="h4 font-weight-bold text-success mb-1">TokTickIT IT Service Desk</h1>
          <div className="d-flex align-items-center gap-2 small mt-1">
            <span className="text-muted">Signed in as:</span>
            <span className="fw-bold text-dark">{user.fullName || user.name}</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: roleBadge.bg,
                color: roleBadge.color,
                border: roleBadge.border,
              }}
            >
              {roleBadge.label}
            </span>
            <span className="text-muted">({user.email})</span>
          </div>
        </div>
        <button
          className="btn btn-sm btn-outline-danger mt-2 mt-sm-0"
          onClick={() => logout()}
          aria-label="Sign Out"
        >
          Sign Out
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="d-flex gap-2 mb-4">
        <button
          type="button"
          className={`zen-nav-tab ${activeTab === 'create' && !selectedTicketId ? 'active' : ''}`}
          onClick={() => {
            setSelectedTicketId(null);
            setActiveTab('create');
          }}
          aria-label="Create Ticket tab"
        >
          Create Ticket
        </button>
        <button
          type="button"
          className={`zen-nav-tab ${activeTab === 'my-tickets' || selectedTicketId !== null ? 'active' : ''}`}
          onClick={() => {
            setSelectedTicketId(null);
            setActiveTab('my-tickets');
          }}
          aria-label="My Tickets tab"
        >
          My Tickets
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}

      {/* Active Tab View */}
      {selectedTicketId !== null ? (
        <div className="mx-auto" style={{ maxWidth: '950px' }}>
          <TicketDetail
            ticketId={selectedTicketId}
            onBack={() => setSelectedTicketId(null)}
          />
        </div>
      ) : activeTab === 'create' ? (
        <div className="mx-auto" style={{ maxWidth: '850px' }}>
          <CreateTicketForm
            categories={categories}
            relatedSystems={relatedSystems}
            isLoadingReferenceData={loading}
            onNavigateToMyTickets={() => {
              setSelectedTicketId(null);
              setActiveTab('my-tickets');
            }}
          />
        </div>
      ) : (
        <div className="mx-auto" style={{ maxWidth: '1150px' }}>
          <MyTickets
            categories={categories}
            onNavigateToCreate={() => {
              setSelectedTicketId(null);
              setActiveTab('create');
            }}
            onSelectTicket={(ticketId: number) => {
              setSelectedTicketId(ticketId);
            }}
          />
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RequesterProvider>
        <MainApplication />
      </RequesterProvider>
    </AuthProvider>
  );
};

export default App;
