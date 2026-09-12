import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface RequesterUser {
  id: number;
  name: string;
  email: string;
}

interface RequesterContextType {
  selectedRequester: RequesterUser | null;
  setRequester: (requester: RequesterUser | null) => void;
}

const RequesterContext = createContext<RequesterContextType | undefined>(undefined);

export const RequesterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRequester, setSelectedRequester] = useState<RequesterUser | null>(() => {
    try {
      const saved = localStorage.getItem('toktickit_dev_requester');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (selectedRequester) {
      localStorage.setItem('toktickit_dev_requester', JSON.stringify(selectedRequester));
    } else {
      localStorage.removeItem('toktickit_dev_requester');
    }
  }, [selectedRequester]);

  return (
    <RequesterContext.Provider value={{ selectedRequester, setRequester: setSelectedRequester }}>
      {children}
    </RequesterContext.Provider>
  );
};

export const useRequester = () => {
  const context = useContext(RequesterContext);
  if (context === undefined) {
    throw new Error('useRequester must be used within a RequesterProvider');
  }
  return context;
};
