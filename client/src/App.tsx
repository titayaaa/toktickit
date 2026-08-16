import React, { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCheckSystem = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);
    setCategories([]);

    try {
      const healthRes = await fetch('/api/health');
      if (!healthRes.ok) {
        throw new Error('Backend health check failed');
      }
      const healthData = await healthRes.json();

      const catRes = await fetch('/api/categories');
      if (!catRes.ok) {
        throw new Error('Failed to fetch categories');
      }
      const catData = await catRes.json();

      if (healthData.status === 'ok') {
        setStatus('Online');
        setCategories(catData);
      } else {
        setStatus('Offline');
        setError('Unable to connect to TokTickIT API');
      }
    } catch (err) {
      setStatus('Offline');
      setError('Unable to connect to TokTickIT API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body p-4">
          <h1 className="h3 font-weight-bold text-success mb-4">TokTickIT IT Service Desk</h1>

          <button
            onClick={handleCheckSystem}
            disabled={loading}
            className="btn btn-outline-success btn-lg mb-4"
          >
            {loading ? '⌛ loading...' : 'Check System'}
          </button>

          {loading && (
            <div className="text-muted my-3 fs-5">
              ⌛ loading...
            </div>
          )}

          {!loading && status && (
            <div className="mt-3">
              <div className="fs-5 mb-3">
                <strong>System Status:</strong>{' '}
                <span className={status === 'Online' ? 'text-success font-weight-bold' : 'text-danger font-weight-bold'}>
                  {status}
                </span>
              </div>

              {status === 'Online' && categories.length > 0 && (
                <div>
                  <h5 className="mt-3 text-secondary">Supported Request Categories:</h5>
                  <ol className="list-group list-group-numbered mt-2">
                    {categories.map((cat) => (
                      <li key={cat.id} className="list-group-item">
                        {cat.name}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {status === 'Offline' && error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
