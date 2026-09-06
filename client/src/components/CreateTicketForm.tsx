import React, { useState } from 'react';
import { useRequester } from '../contexts/RequesterContext';

interface Category {
  id: number;
  name: string;
}

interface RelatedSystem {
  id: number;
  name: string;
}

interface CreateTicketFormProps {
  categories: Category[];
  relatedSystems: RelatedSystem[];
  isLoadingReferenceData?: boolean;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ 
  categories, 
  relatedSystems, 
  isLoadingReferenceData = false 
}) => {
  const { selectedRequester } = useRequester();
  
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [relatedSystemId, setRelatedSystemId] = useState<number | ''>('');
  const [requestedPriority, setRequestedPriority] = useState('LOW');
  
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successTicketNumber, setSuccessTicketNumber] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!summary.trim()) {
      newErrors.summary = 'Summary is required';
    } else if (summary.length > 200) {
      newErrors.summary = 'Summary must be less than 200 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }

    if (categoryId === '') {
      newErrors.categoryId = 'Category is required';
    }

    if (relatedSystemId === '') {
      newErrors.relatedSystemId = 'Related System is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessTicketNumber(null);
    setGlobalError(null);

    if (!validate()) {
      return;
    }

    if (!selectedRequester) {
      setGlobalError('No requester selected. Please select a requester first.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer dev_requester_${selectedRequester.id}`
        },
        body: JSON.stringify({
          summary: summary.trim(),
          description: description.trim(),
          categoryId,
          relatedSystemId,
          requestedPriority
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create ticket');
      }

      setSuccessTicketNumber(data.ticketNumber);
      // Optional: reset form fields here if you want to allow creating another ticket immediately
      setSummary('');
      setDescription('');
      setCategoryId('');
      setRelatedSystemId('');
      setRequestedPriority('LOW');
      setErrors({});
    } catch (err: any) {
      if (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setGlobalError('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        setGlobalError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body p-4">
        <h2 className="h4 text-success font-weight-bold mb-4">Create New Ticket</h2>
        
        {successTicketNumber && (
          <div className="alert alert-success" role="alert">
            Ticket successfully created! Ticket Number: <strong>{successTicketNumber}</strong>
          </div>
        )}

        {globalError && (
          <div className="alert alert-danger" role="alert">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="summary" className="form-label fw-bold">
              Summary <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="summary"
              className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of the issue"
            />
            {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              id="description"
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the issue"
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="categoryId" className="form-label fw-bold">
                Category <span className="text-danger">*</span>
              </label>
              <select
                id="categoryId"
                className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value === '' ? '' : Number(e.target.value))}
                disabled={isLoadingReferenceData}
              >
                <option value="">{isLoadingReferenceData ? 'Loading categories...' : 'Select Category...'}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="relatedSystemId" className="form-label fw-bold">
                Related System <span className="text-danger">*</span>
              </label>
              <select
                id="relatedSystemId"
                className={`form-select ${errors.relatedSystemId ? 'is-invalid' : ''}`}
                value={relatedSystemId}
                onChange={(e) => setRelatedSystemId(e.target.value === '' ? '' : Number(e.target.value))}
                disabled={isLoadingReferenceData}
              >
                <option value="">{isLoadingReferenceData ? 'Loading systems...' : 'Select System...'}</option>
                {relatedSystems.map((sys) => (
                  <option key={sys.id} value={sys.id}>{sys.name}</option>
                ))}
              </select>
              {errors.relatedSystemId && <div className="invalid-feedback">{errors.relatedSystemId}</div>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="requestedPriority" className="form-label fw-bold">
              Priority <span className="text-danger">*</span>
            </label>
            <select
              id="requestedPriority"
              className="form-select"
              value={requestedPriority}
              onChange={(e) => setRequestedPriority(e.target.value)}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success btn-lg"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Busy...
                </>
              ) : (
                'Submit Ticket'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketForm;
