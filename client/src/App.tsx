import React, { useState, useEffect } from 'react';
import { useRequester } from './contexts/RequesterContext';
import DevelopmentRequesterSelection from './components/DevelopmentRequesterSelection';
import CreateTicketForm from './components/CreateTicketForm';
import MyTickets from './components/MyTickets';

interface Category {
  id: number;
  name: string;
}

interface RelatedSystem {
  id: number;
  name: string;
}

type TabType = 'create' | 'my-tickets';

const App: React.FC = () => {
  const { selectedRequester, setRequester } = useRequester();
  const [activeTab, setActiveTab] = useState<TabType>('create');
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
      } catch (err) {
        setError('Unable to connect to TokTickIT API');
      } finally {
        setLoading(false);
      }
    };

    if (selectedRequester) {
      fetchData();
    }
  }, [selectedRequester]);

  if (!selectedRequester) {
    return <DevelopmentRequesterSelection />;
  }

  return (
    <div className="container py-4">
      {/* App Header & Identity Banner */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm border">
        <div>
          <h1 className="h4 font-weight-bold text-success mb-1">TokTickIT IT Service Desk</h1>
          <div className="small">
            <span className="text-muted me-1">Current Requester:</span>
            <span className="fw-bold text-primary-green">{selectedRequester.name}</span>
            <span className="text-muted ms-1">({selectedRequester.email})</span>
          </div>
        </div>
        <button
          className="btn btn-sm btn-outline-secondary mt-2 mt-sm-0"
          onClick={() => setRequester(null)}
          aria-label="Change Requester"
        >
          Change Requester
        </button>
      </div>

      {/* Main Navigation Tabs */}
      <div className="d-flex gap-2 mb-4">
        <button
          type="button"
          className={`zen-nav-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
          aria-label="Create Ticket tab"
        >
          Create Ticket
        </button>
        <button
          type="button"
          className={`zen-nav-tab ${activeTab === 'my-tickets' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-tickets')}
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
      {activeTab === 'create' ? (
        <div className="mx-auto" style={{ maxWidth: '850px' }}>
          <CreateTicketForm
            categories={categories}
            relatedSystems={relatedSystems}
            isLoadingReferenceData={loading}
            onNavigateToMyTickets={() => setActiveTab('my-tickets')}
          />
        </div>
      ) : (
        <div className="mx-auto" style={{ maxWidth: '1150px' }}>
          <MyTickets
            categories={categories}
            onNavigateToCreate={() => setActiveTab('create')}
          />
        </div>
      )}
    </div>
  );
};

export default App;
