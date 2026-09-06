import React, { useState, useEffect, useCallback } from 'react';
import { useRequester } from '../contexts/RequesterContext';

interface Category {
  id: number;
  name: string;
}

interface TicketItem {
  id: number;
  ticketNumber: string;
  summary: string;
  description: string;
  requestedPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  currentStatus: 'NEW' | 'OPEN' | 'IN_PROGRESS' | 'PENDING' | 'RESOLVED' | 'CLOSED' | 'CANCELLED' | string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  categoryName?: string;
  category?: { id: number; name: string };
  relatedSystemName?: string;
  relatedSystem?: { id: number; name: string };
}

interface MyTicketsProps {
  categories: Category[];
  onNavigateToCreate: () => void;
}

const MyTickets: React.FC<MyTicketsProps> = ({ categories, onNavigateToCreate }) => {
  const { selectedRequester } = useRequester();

  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  
  // Sort states (default: createdAt desc)
  const [sortOption, setSortOption] = useState<string>('createdAt_desc');

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Check if any filter or search is active
  const hasActiveFilters = Boolean(
    activeSearch.trim() || selectedCategory || selectedStatus || selectedPriority
  );

  const fetchTickets = useCallback(async () => {
    if (!selectedRequester) return;

    setLoading(true);
    setError(null);

    try {
      const [sortBy, sortDir] = sortOption.split('_');
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy,
        sortDir,
      });

      if (activeSearch.trim()) {
        params.append('search', activeSearch.trim());
      }
      if (selectedCategory) {
        params.append('categoryId', selectedCategory);
      }
      if (selectedStatus) {
        params.append('status', selectedStatus);
      }
      if (selectedPriority) {
        params.append('priority', selectedPriority);
      }

      const res = await fetch(`/api/tickets?${params.toString()}`, {
        headers: {
          Authorization: `Bearer dev_requester_${selectedRequester.id}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch tickets');
      }

      const data = await res.json();
      const ticketList: TicketItem[] = [...(data.data || data.tickets || [])];
      const meta = data.meta || {};

      // Ensure priority sort strictly orders by severity (CRITICAL > HIGH > MEDIUM > LOW)
      if (sortBy === 'requestedPriority' || sortBy === 'priority') {
        const PRIORITY_ORDER: Record<string, number> = {
          CRITICAL: 4,
          HIGH: 3,
          MEDIUM: 2,
          LOW: 1,
        };
        ticketList.sort((a, b) => {
          const weightA = PRIORITY_ORDER[a.requestedPriority?.toUpperCase()] ?? 0;
          const weightB = PRIORITY_ORDER[b.requestedPriority?.toUpperCase()] ?? 0;
          return sortDir === 'asc' ? weightA - weightB : weightB - weightA;
        });
      }

      setTickets(ticketList);
      setTotalPages(meta.totalPages || 1);
      setTotalCount(meta.totalCount ?? meta.total ?? ticketList.length);
    } catch (err: any) {
      setError(err.message || 'Unable to load tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [
    selectedRequester,
    page,
    limit,
    sortOption,
    activeSearch,
    selectedCategory,
    selectedStatus,
    selectedPriority,
  ]);

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
    setSelectedPriority('');
    setPage(1);
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority?.toUpperCase()) {
      case 'LOW':
        return 'badge-priority-low';
      case 'MEDIUM':
        return 'badge-priority-medium';
      case 'HIGH':
        return 'badge-priority-high';
      case 'CRITICAL':
        return 'badge-priority-critical';
      default:
        return 'bg-secondary text-white';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'NEW':
        return 'badge-status-new';
      case 'OPEN':
        return 'badge-status-open';
      case 'IN_PROGRESS':
        return 'badge-status-in-progress';
      case 'RESOLVED':
        return 'badge-status-resolved';
      case 'CLOSED':
      case 'CANCELLED':
        return 'badge-status-closed';
      default:
        return 'bg-secondary text-white';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body p-4">
        {/* Header with Title and Create Button */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
          <div>
            <h2 className="h4 text-success font-weight-bold mb-1">My Tickets</h2>
            <p className="text-muted small mb-0">
              View and track all tickets submitted by you
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={onNavigateToCreate}
          >
            <span>+ Create Ticket</span>
          </button>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="bg-light p-3 rounded mb-4 border">
          <form onSubmit={handleSearchSubmit} className="row g-2 align-items-center">
            {/* Search Input */}
            <div className="col-12 col-md-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search ticket no. or summary..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search tickets"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  aria-label="Submit search"
                >
                  Search
                </button>
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveSearch('');
                      setPage(1);
                    }}
                    aria-label="Clear search input"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by Category"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by Status"
              >
                <option value="">All Statuses</option>
                <option value="NEW">New</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="PENDING">Pending</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
                value={selectedPriority}
                onChange={(e) => {
                  setSelectedPriority(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by Priority"
              >
                <option value="">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setPage(1);
                }}
                aria-label="Sort tickets"
              >
                <option value="createdAt_desc">Newest First</option>
                <option value="createdAt_asc">Oldest First</option>
                <option value="ticketNumber_asc">Ticket No (A-Z)</option>
                <option value="ticketNumber_desc">Ticket No (Z-A)</option>
                <option value="requestedPriority_desc">Priority (High to Low)</option>
                <option value="requestedPriority_asc">Priority (Low to High)</option>
                <option value="currentStatus_asc">Status</option>
              </select>
            </div>
          </form>

          {/* Active Filter Indicators */}
          {hasActiveFilters && (
            <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top">
              <div className="small text-muted">
                Filters active: {activeSearch && `Search: "${activeSearch}" `}
                {selectedCategory && `Category `}
                {selectedStatus && `Status: ${selectedStatus} `}
                {selectedPriority && `Priority: ${selectedPriority} `}
              </div>
              <button
                type="button"
                className="btn btn-link btn-sm text-decoration-none p-0 text-danger"
                onClick={handleClearFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
            <div>{error}</div>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => fetchTickets()}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5" data-testid="loading-indicator">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading tickets...</span>
            </div>
            <p className="text-muted mt-2 small">Loading tickets...</p>
          </div>
        )}

        {/* Content States when not loading */}
        {!loading && !error && (
          <>
            {/* Empty State (User has no tickets at all) */}
            {tickets.length === 0 && !hasActiveFilters && (
              <div className="text-center py-5 border rounded bg-light" data-testid="empty-state">
                <div className="display-6 text-muted mb-3">🎫</div>
                <h3 className="h5 fw-bold text-dark">You haven't submitted any tickets yet</h3>
                <p className="text-muted small mb-4">
                  Need IT support? Click the button below to submit your first ticket.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onNavigateToCreate}
                >
                  Create Your First Ticket
                </button>
              </div>
            )}

            {/* No-Results State (Search/filter active but 0 results) */}
            {tickets.length === 0 && hasActiveFilters && (
              <div className="text-center py-5 border rounded bg-light" data-testid="no-results-state">
                <div className="display-6 text-muted mb-3">🔍</div>
                <h3 className="h5 fw-bold text-dark">No tickets found</h3>
                <p className="text-muted small mb-4">
                  No tickets matched your current search or filter criteria.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Ticket List Table (Desktop: ≥ 768px) */}
            {tickets.length > 0 && (
              <>
                <div className="table-responsive d-none d-md-block">
                  <table className="table zen-table align-middle">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: '18%' }}>Ticket Number</th>
                        <th scope="col" style={{ width: '32%' }}>Summary</th>
                        <th scope="col" style={{ width: '18%' }}>Category</th>
                        <th scope="col" style={{ width: '12%' }}>Priority</th>
                        <th scope="col" style={{ width: '10%' }}>Status</th>
                        <th scope="col" style={{ width: '10%' }}>Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td>
                            <span className="fw-bold text-primary-green">
                              {ticket.ticketNumber}
                            </span>
                          </td>
                          <td>
                            <div className="text-truncate" style={{ maxWidth: '300px' }} title={ticket.summary}>
                              {ticket.summary}
                            </div>
                          </td>
                          <td>
                            <span className="text-muted small">
                              {ticket.categoryName || ticket.category?.name || '-'}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge px-2 py-1 rounded-pill ${getPriorityBadgeClass(
                                ticket.requestedPriority
                              )}`}
                            >
                              {ticket.requestedPriority}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge px-2 py-1 rounded-pill ${getStatusBadgeClass(
                                ticket.currentStatus || ticket.status || 'NEW'
                              )}`}
                            >
                              {ticket.currentStatus || ticket.status || 'NEW'}
                            </span>
                          </td>
                          <td>
                            <span className="text-muted small">
                              {formatDate(ticket.updatedAt || ticket.createdAt)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Ticket Cards (Mobile: < 768px) */}
                <div className="d-block d-md-none">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-mobile-card p-3 mb-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="fw-bold text-primary-green">
                          {ticket.ticketNumber}
                        </span>
                        <span
                          className={`badge px-2 py-1 rounded-pill ${getStatusBadgeClass(
                            ticket.currentStatus || ticket.status || 'NEW'
                          )}`}
                        >
                          {ticket.currentStatus || ticket.status || 'NEW'}
                        </span>
                      </div>
                      <h4 className="h6 fw-semibold text-dark mb-2">{ticket.summary}</h4>
                      <div className="d-flex flex-wrap justify-content-between align-items-center text-muted small mt-2 pt-2 border-top">
                        <span>{ticket.categoryName || ticket.category?.name || 'General'}</span>
                        <span
                          className={`badge px-2 py-1 rounded-pill ${getPriorityBadgeClass(
                            ticket.requestedPriority
                          )}`}
                        >
                          {ticket.requestedPriority}
                        </span>
                      </div>
                      <div className="text-end text-muted small mt-1">
                        Updated: {formatDate(ticket.updatedAt || ticket.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 pt-3 border-top gap-2">
                  <div className="text-muted small">
                    Showing {tickets.length} of {totalCount} ticket{totalCount !== 1 ? 's' : ''} (Page {page} of {totalPages})
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    {/* Limit Selector */}
                    <div className="d-flex align-items-center gap-1 me-2">
                      <span className="small text-muted">Per page:</span>
                      <select
                        className="form-select form-select-sm"
                        style={{ width: '70px' }}
                        value={limit}
                        onChange={(e) => {
                          setLimit(Number(e.target.value));
                          setPage(1);
                        }}
                        aria-label="Items per page"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                      </select>
                    </div>

                    {/* Prev / Next Buttons */}
                    <nav aria-label="Ticket pagination">
                      <ul className="pagination pagination-sm mb-0">
                        <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                            aria-label="Previous page"
                          >
                            &lsaquo; Prev
                          </button>
                        </li>
                        <li className="page-item active">
                          <span className="page-link">{page}</span>
                        </li>
                        <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page >= totalPages}
                            aria-label="Next page"
                          >
                            Next &rsaquo;
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
