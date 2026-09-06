import React, { useState, useEffect } from 'react';
import { useRequester } from './contexts/RequesterContext';
import DevelopmentRequesterSelection from './components/DevelopmentRequesterSelection';
import CreateTicketForm from './components/CreateTicketForm';

interface Category {
  id: number;
  name: string;
}

interface RelatedSystem {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const { selectedRequester, setRequester } = useRequester();
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [relatedSystems, setRelatedSystems] = useState<RelatedSystem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, sysRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/related-systems')
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
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="text-muted me-2">Current Requester:</span>
          <span className="fw-bold text-primary-green">{selectedRequester.name}</span>
        </div>
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={() => setRequester(null)}
        >
          Change Requester
        </button>
      </div>

      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="h3 font-weight-bold text-success mb-4 text-center">TokTickIT IT Service Desk</h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <CreateTicketForm 
          categories={categories} 
          relatedSystems={relatedSystems} 
          isLoadingReferenceData={loading}
        />
      </div>
    </div>
  );
};

export default App;
