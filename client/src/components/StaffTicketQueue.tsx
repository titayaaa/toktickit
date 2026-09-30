import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface Category {
  id: number;
  name: string;
}

export interface StaffTicketItem {
  id: number;
  ticketNumber: string;
  summary: string;
  description: string;
  status: string;
  currentStatus: string;
  requestedPriority: string;
  itPriority: string | null;
  resolutionSummary?: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category?: { id: number; name: string };
  relatedSystemId?: number;
  relatedSystem?: { id: number; name: string } | null;
  ownerId?: number | null;
  owner?: { id: number; fullName: string; name?: string; email: string; role?: string } | null;
  requesterId?: number;
  requester?: { id: number; fullName: string; name?: string; email: string } | null;
  counts?: {
    publicComments: number;
    internalNotes: number;
    attachments: number;
  };
}

interface StaffTicketQueueProps {
  categories?: Category[];
  onSelectTicket: (ticketId: number) => void;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
  NEW: { label: 'New', bg: '#E3F2FD', color: '#0D47A1', border: '1px solid #BBDEFB' },
  OPEN: { label: 'Open', bg: '#E8F5E9', color: '#1B5E20', border: '1px solid #C8E6C9' },
  IN_PROGRESS: { label: 'In Progress', bg: '#FFF3E0', color: '#E65100', border: '1px solid #FFE0B2' },
  WAITING_FOR_REQUESTER: { label: 'Waiting for Requester', bg: '#EDE7F6', color: '#4A148C', border: '1px solid #D1C4E9' },
  PENDING: { label: 'Pending', bg: '#FFF9C4', color: '#F57F17', border: '1px solid #FFF59D' },
  RESOLVED: { label: 'Resolved', bg: '#E0F2F1', color: '#004D40', border: '1px solid #B2DFDB' },
  CLOSED: { label: 'Closed', bg: '#ECEFF1', color: '#37474F', border: '1px solid #CFD8DC' },
  REOPENED: { label: 'Reopened', bg: '#FBE9E7', color: '#BF360C', border: '1px solid #FFCCBC' },
  CANCELLED: { label: 'Cancelled', bg: '#EEEEEE', color: '#424242', border: '1px solid #E0E0E0' },
};

const PRIORITY_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
  URGENT: { label: 'Urgent', bg: '#FFEBEE', color: '#B71C1C', border: '1px solid #FFCDD2' },
  CRITICAL: { label: 'Critical', bg: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2' },
  HIGH: { label: 'High', bg: '#FFF3E0', color: '#E65100', border: '1px solid #FFE0B2' },
  MEDIUM: { label: 'Medium', bg: '#FFFDE7', color: '#F57F17', border: '1px solid #FFF59D' },
  LOW: { label: 'Low', bg: '#E8F5E9', color: '#2E7D32', border: '1px solid #C8E6C9' },
};

const StaffTicketQueue: React.FC<StaffTicketQueueProps> = ({ categories = [], onSelectTicket }) => {
  const { user } = useAuth();

  const [tickets, setTickets] = useState<StaffTicketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedItPriority, setSelectedItPriority] = useState<string>('');
  const [ownerFilter, setOwnerFilter] = useState<'all' | 'unassigned' | 'me'>('all');

  // Sorting state
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const hasActiveFilters = Boolean(
    activeSearch.trim() || selectedCategory || selectedStatus || selectedItPriority || ownerFilter !== 'all'
  );

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy,
        sortOrder,
      });

      if (activeSearch.trim()) {
        params.append('search', activeSearch.trim());
      }
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      if (selectedStatus) {
        params.append('status', selectedStatus);
      }
      if (selectedItPriority) {
        params.append('itPriority', selectedItPriority);
      }
      if (ownerFilter !== 'all') {
        params.append('ownerId', ownerFilter);
      }

      const token = localStorage.getItem('toktickit_auth_token');
      const res = await fetch(`/api/staff/tickets?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch staff ticket queue');
      }

      const data = await res.json();
      const ticketList: StaffTicketItem[] = data.tickets || data.data || [];
      const pagination = data.pagination || data.meta || {};

      setTickets(ticketList);
      setTotalPages(pagination.totalPages || 1);
      setTotalCount(pagination.total ?? pagination.totalCount ?? ticketList.length);
    } catch (err: any) {
      setError(err.message || 'Unable to connect to TokTickIT Staff API');
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, sortOrder, activeSearch, selectedCategory, selectedStatus, selectedItPriority, ownerFilter]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchTerm);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveSearch('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedItPriority('');
    setOwnerFilter('all');
    setSortBy('createdAt');
    setSortOrder('desc');
    setPage(1);
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setPage(1);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const startRecord = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const endRecord = Math.min(totalCount, page * limit);

  return (
    <div className="staff-ticket-queue" data-testid="staff-ticket-queue">
      {/* Header & Dashboard Stats Bar */}
      <div
        className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm border"
        style={{ borderColor: '#DCE3DE' }}
      >
        <div>
          <div className="d-flex align-items-center gap-2">
            <h1 className="h4 font-weight-bold mb-0" style={{ color: '#006B3C' }}>
              IT Staff Ticket Queue
            </h1>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '600',
                padding: '3px 10px',
                borderRadius: '12px',
                backgroundColor: '#EAF6EF',
                color: '#006B3C',
                border: '1px solid #B2DFDB',
              }}
            >
              {totalCount} {totalCount === 1 ? 'Ticket' : 'Tickets'}
            </span>
          </div>
          <p className="text-muted small mb-0 mt-1">
            Centralized queue for triage, ownership management, and ticket resolution across TokTickIT
          </p>
        </div>

        {/* Quick Search Form */}
        <form onSubmit={handleSearchSubmit} className="d-flex gap-2 mt-2 mt-md-0" role="search">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search Ticket No or Summary..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '240px', borderColor: '#DCE3DE' }}
            aria-label="Search tickets"
          />
          <button type="submit" className="btn btn-sm btn-success" style={{ backgroundColor: '#006B3C' }}>
            Search
          </button>
        </form>
      </div>

      {/* Filter Controls Toolbar */}
      <div className="card border mb-4 shadow-sm" style={{ borderColor: '#DCE3DE' }}>
        <div className="card-body p-3">
          <div className="row g-2 align-items-center">
            {/* Status Filter */}
            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="queue-status-filter" className="form-label small fw-bold text-muted mb-1">
                Status
              </label>
              <select
                id="queue-status-filter"
                className="form-select form-select-sm"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by status"
              >
                <option value="">All Statuses</option>
                <option value="NEW">New</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="WAITING_FOR_REQUESTER">Waiting for Requester</option>
                <option value="PENDING">Pending</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
                <option value="REOPENED">Reopened</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* IT Priority Filter */}
            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="queue-it-priority-filter" className="form-label small fw-bold text-muted mb-1">
                IT Priority
              </label>
              <select
                id="queue-it-priority-filter"
                className="form-select form-select-sm"
                value={selectedItPriority}
                onChange={(e) => {
                  setSelectedItPriority(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by IT priority"
              >
                <option value="">All IT Priorities</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="queue-category-filter" className="form-label small fw-bold text-muted mb-1">
                Category
              </label>
              <select
                id="queue-category-filter"
                className="form-select form-select-sm"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ownership Filter Buttons */}
            <div className="col-12 col-sm-6 col-md-3">
              <span className="form-label small fw-bold text-muted mb-1 d-block">
                Assignment
              </span>
              <div className="btn-group btn-group-sm w-100" role="group" aria-label="Assignment filter">
                <button
                  type="button"
                  className={`btn ${ownerFilter === 'all' ? 'btn-success' : 'btn-outline-secondary'}`}
                  style={ownerFilter === 'all' ? { backgroundColor: '#006B3C', borderColor: '#006B3C' } : {}}
                  onClick={() => {
                    setOwnerFilter('all');
                    setPage(1);
                  }}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn ${ownerFilter === 'unassigned' ? 'btn-success' : 'btn-outline-secondary'}`}
                  style={ownerFilter === 'unassigned' ? { backgroundColor: '#006B3C', borderColor: '#006B3C' } : {}}
                  onClick={() => {
                    setOwnerFilter('unassigned');
                    setPage(1);
                  }}
                >
                  Unassigned
                </button>
                <button
                  type="button"
                  className={`btn ${ownerFilter === 'me' ? 'btn-success' : 'btn-outline-secondary'}`}
                  style={ownerFilter === 'me' ? { backgroundColor: '#006B3C', borderColor: '#006B3C' } : {}}
                  onClick={() => {
                    setOwnerFilter('me');
                    setPage(1);
                  }}
                >
                  Assigned to Me
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips & Clear Action */}
          {hasActiveFilters && (
            <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-2 border-top">
              <span className="small text-muted">Active Filters:</span>
              {activeSearch && (
                <span className="badge bg-light text-dark border">
                  Search: "{activeSearch}"
                </span>
              )}
              {selectedStatus && (
                <span className="badge bg-light text-dark border">
                  Status: {STATUS_CONFIG[selectedStatus]?.label || selectedStatus}
                </span>
              )}
              {selectedItPriority && (
                <span className="badge bg-light text-dark border">
                  IT Priority: {PRIORITY_CONFIG[selectedItPriority]?.label || selectedItPriority}
                </span>
              )}
              {selectedCategory && (
                <span className="badge bg-light text-dark border">
                  Category: {categories.find((c) => String(c.id) === selectedCategory)?.name || selectedCategory}
                </span>
              )}
              {ownerFilter !== 'all' && (
                <span className="badge bg-light text-dark border">
                  Owner: {ownerFilter === 'unassigned' ? 'Unassigned' : 'Assigned to Me'}
                </span>
              )}
              <button
                type="button"
                className="btn btn-sm btn-link text-danger p-0 ms-auto text-decoration-none"
                onClick={handleClearFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Alert Banner */}
      {error && (
        <div className="alert alert-danger shadow-sm mb-4" role="alert">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="card border-0 shadow-sm p-5 text-center bg-white rounded">
          <div className="spinner-border text-success mx-auto mb-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="text-muted small">Loading IT Staff Ticket Queue...</span>
        </div>
      ) : tickets.length === 0 ? (
        /* Empty State */
        <div className="card border p-5 text-center bg-white rounded shadow-sm" style={{ borderColor: '#DCE3DE' }}>
          <div className="text-muted mb-2" style={{ fontSize: '36px' }}>📭</div>
          <h2 className="h5 fw-bold text-dark mb-1">No Tickets Found</h2>
          <p className="text-muted small mb-3">
            {hasActiveFilters
              ? 'No tickets match the current search criteria and filters.'
              : 'There are currently no tickets in the queue.'}
          </p>
          {hasActiveFilters && (
            <div>
              <button
                type="button"
                className="btn btn-sm btn-outline-success"
                onClick={handleClearFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Desktop & Tablet High-Density Table (visible >=768px) */}
          <div className="d-none d-md-block card border shadow-sm rounded overflow-hidden mb-3" style={{ borderColor: '#DCE3DE' }}>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ backgroundColor: '#F5F7F6', borderBottom: '2px solid #DCE3DE' }}>
                  <tr className="small text-muted">
                    <th
                      scope="col"
                      style={{ cursor: 'pointer', minWidth: '130px' }}
                      onClick={() => handleSortChange('ticketNumber')}
                      aria-sort={sortBy === 'ticketNumber' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      Ticket No {sortBy === 'ticketNumber' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th
                      scope="col"
                      style={{ cursor: 'pointer', minWidth: '140px' }}
                      onClick={() => handleSortChange('createdAt')}
                      aria-sort={sortBy === 'createdAt' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      Created Date {sortBy === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th scope="col" style={{ minWidth: '220px' }}>Summary</th>
                    <th scope="col" style={{ minWidth: '130px' }}>Category</th>
                    <th scope="col" style={{ minWidth: '140px' }}>Requester</th>
                    <th scope="col" style={{ minWidth: '100px' }}>Req Priority</th>
                    <th
                      scope="col"
                      style={{ cursor: 'pointer', minWidth: '100px' }}
                      onClick={() => handleSortChange('itPriority')}
                      aria-sort={sortBy === 'itPriority' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      IT Priority {sortBy === 'itPriority' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th
                      scope="col"
                      style={{ cursor: 'pointer', minWidth: '110px' }}
                      onClick={() => handleSortChange('status')}
                      aria-sort={sortBy === 'status' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      Status {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th scope="col" style={{ minWidth: '130px' }}>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t) => {
                    const statusBadge = STATUS_CONFIG[t.currentStatus] || STATUS_CONFIG.NEW;
                    const reqPriorityBadge = PRIORITY_CONFIG[t.requestedPriority] || PRIORITY_CONFIG.MEDIUM;
                    const itPriorityBadge = t.itPriority ? (PRIORITY_CONFIG[t.itPriority] || PRIORITY_CONFIG.MEDIUM) : null;

                    return (
                      <tr
                        key={t.id}
                        style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}
                        onClick={() => onSelectTicket(t.id)}
                      >
                        <td className="fw-bold font-monospace" style={{ color: '#006B3C' }}>
                          <button
                            type="button"
                            className="btn btn-link p-0 text-decoration-none font-monospace fw-bold"
                            style={{ color: '#006B3C' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTicket(t.id);
                            }}
                          >
                            {t.ticketNumber}
                          </button>
                        </td>
                        <td className="small text-muted">{formatDate(t.createdAt)}</td>
                        <td>
                          <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '280px' }}>
                            {t.summary}
                          </div>
                          {t.relatedSystem && (
                            <div className="small text-muted">{t.relatedSystem.name}</div>
                          )}
                        </td>
                        <td className="small">{t.category?.name || '-'}</td>
                        <td>
                          <div className="small fw-semibold text-dark">
                            {t.requester?.fullName || t.requester?.name || 'Requester'}
                          </div>
                          <div className="text-muted" style={{ fontSize: '11px' }}>
                            {t.requester?.email || ''}
                          </div>
                        </td>
                        <td>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              backgroundColor: reqPriorityBadge.bg,
                              color: reqPriorityBadge.color,
                              border: reqPriorityBadge.border,
                            }}
                          >
                            {reqPriorityBadge.label}
                          </span>
                        </td>
                        <td>
                          {itPriorityBadge ? (
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: '600',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                backgroundColor: itPriorityBadge.bg,
                                color: itPriorityBadge.color,
                                border: itPriorityBadge.border,
                              }}
                            >
                              {itPriorityBadge.label}
                            </span>
                          ) : (
                            <span className="small text-muted">-</span>
                          )}
                        </td>
                        <td>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              backgroundColor: statusBadge.bg,
                              color: statusBadge.color,
                              border: statusBadge.border,
                            }}
                          >
                            {statusBadge.label}
                          </span>
                        </td>
                        <td>
                          {t.owner ? (
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: '600',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                backgroundColor: '#E3F2FD',
                                color: '#1565C0',
                                border: '1px solid #BBDEFB',
                              }}
                            >
                              {t.owner.fullName || t.owner.name}
                            </span>
                          ) : (
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: '500',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                backgroundColor: '#ECEFF1',
                                color: '#546E7A',
                                border: '1px solid #CFD8DC',
                              }}
                            >
                              Unassigned
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card Stack Layout (visible <768px) */}
          <div className="d-md-none mb-3 d-flex flex-column gap-3">
            {tickets.map((t) => {
              const statusBadge = STATUS_CONFIG[t.currentStatus] || STATUS_CONFIG.NEW;
              const reqPriorityBadge = PRIORITY_CONFIG[t.requestedPriority] || PRIORITY_CONFIG.MEDIUM;
              const itPriorityBadge = t.itPriority ? (PRIORITY_CONFIG[t.itPriority] || PRIORITY_CONFIG.MEDIUM) : null;

              return (
                <div
                  key={t.id}
                  className="card p-3 shadow-sm border"
                  style={{ borderColor: '#DCE3DE', cursor: 'pointer' }}
                  onClick={() => onSelectTicket(t.id)}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold font-monospace" style={{ color: '#006B3C' }}>
                      {t.ticketNumber}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: statusBadge.bg,
                        color: statusBadge.color,
                        border: statusBadge.border,
                      }}
                    >
                      {statusBadge.label}
                    </span>
                  </div>

                  <h2 className="h6 fw-bold text-dark mb-1">{t.summary}</h2>
                  <div className="small text-muted mb-2">
                    {t.category?.name || 'General'}
                    {t.relatedSystem ? ` • ${t.relatedSystem.name}` : ''}
                    {` • ${formatDate(t.createdAt)}`}
                  </div>

                  <div className="small text-muted mb-2">
                    Requester: <strong>{t.requester?.fullName || t.requester?.name || 'Requester'}</strong>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-2 pt-2 border-top">
                    <div className="d-flex align-items-center gap-1">
                      <span className="text-muted" style={{ fontSize: '11px' }}>Req:</span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '600',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: reqPriorityBadge.bg,
                          color: reqPriorityBadge.color,
                          border: reqPriorityBadge.border,
                        }}
                      >
                        {reqPriorityBadge.label}
                      </span>
                    </div>

                    {itPriorityBadge && (
                      <div className="d-flex align-items-center gap-1">
                        <span className="text-muted" style={{ fontSize: '11px' }}>IT:</span>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '600',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            backgroundColor: itPriorityBadge.bg,
                            color: itPriorityBadge.color,
                            border: itPriorityBadge.border,
                          }}
                        >
                          {itPriorityBadge.label}
                        </span>
                      </div>
                    )}

                    <div className="ms-auto">
                      {t.owner ? (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            backgroundColor: '#E3F2FD',
                            color: '#1565C0',
                          }}
                        >
                          {t.owner.fullName || t.owner.name}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '11px',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            backgroundColor: '#ECEFF1',
                            color: '#546E7A',
                          }}
                        >
                          Unassigned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Footer */}
          <div className="d-flex flex-wrap justify-content-between align-items-center p-3 bg-white rounded border shadow-sm" style={{ borderColor: '#DCE3DE' }}>
            <div className="small text-muted mb-2 mb-sm-0">
              Showing <strong>{startRecord}</strong> to <strong>{endRecord}</strong> of{' '}
              <strong>{totalCount}</strong> tickets
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2 small">
                <span className="text-muted">Per page:</span>
                <select
                  className="form-select form-select-sm"
                  style={{ width: '70px', borderColor: '#DCE3DE' }}
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  aria-label="Items per page"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Navigation Page Buttons */}
              <div className="btn-group btn-group-sm" role="group" aria-label="Pagination controls">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`btn ${p === page ? 'btn-success' : 'btn-outline-secondary'}`}
                      style={p === page ? { backgroundColor: '#006B3C', borderColor: '#006B3C' } : {}}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StaffTicketQueue;
