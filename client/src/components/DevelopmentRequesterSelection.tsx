import React, { useEffect, useState } from 'react';
import { useRequester, RequesterUser } from '../contexts/RequesterContext';

const DevelopmentRequesterSelection: React.FC = () => {
  const { setRequester } = useRequester();
  const [requesters, setRequesters] = useState<RequesterUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    const fetchRequesters = async () => {
      try {
        const response = await fetch('/api/requesters');
        if (!response.ok) {
          throw new Error('Failed to load active requesters');
        }
        const data = await response.json();
        setRequesters(data);
        if (data.length > 0) {
          setSelectedId(data[0].id.toString());
        }
      } catch (err) {
        setError('Unable to load requesters. Please check your backend connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequesters();
  }, []);

  const handleContinue = () => {
    const requester = requesters.find((r) => r.id.toString() === selectedId);
    if (requester) {
      setRequester(requester);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="zen-card p-4 p-md-5 w-100" style={{ maxWidth: '600px' }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex justify-content-center align-items-center bg-pale-green rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
            <span className="fs-2">👤</span>
          </div>
          <h2 className="fw-bold mb-2">Select Development Requester</h2>
          <p className="text-muted small">
            Choose a development requester to simulate the current requester context for Lab 2. <br/>
            This is for testing only and is not a login screen.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary-green" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading active requesters...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : requesters.length === 0 ? (
          <div className="alert alert-warning text-center" role="alert">
            No active requesters found in the database.
          </div>
        ) : (
          <div className="mb-4">
            <label htmlFor="requesterSelect" className="form-label">
              Development Requester <span className="text-danger">*</span>
            </label>
            <select 
              id="requesterSelect" 
              className="form-select form-select-lg mb-4"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {requesters.map((req) => (
                <option key={req.id} value={req.id}>
                  {req.name} ({req.email})
                </option>
              ))}
            </select>
            
            <div className="alert bg-pale-green border-0 d-flex align-items-center mb-4">
              <span className="me-2 text-primary-green">ℹ️</span>
              <small className="text-dark">Only active development requesters are shown.</small>
            </div>

            <div className="alert bg-light border text-muted d-flex align-items-center mb-4">
              <span className="me-2">🛡️</span>
              <div>
                <small className="fw-bold d-block">Authentication coming in Lab 3</small>
                <small style={{ fontSize: '0.75rem' }}>In Lab 3, this selection will be replaced with secure authentication so you can access the system with your own account.</small>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button 
                type="button" 
                className="btn btn-outline-secondary me-2" 
                disabled
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary px-4" 
                onClick={handleContinue}
                disabled={!selectedId}
              >
                Continue →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevelopmentRequesterSelection;
