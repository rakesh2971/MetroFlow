"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { User } from '@/types';
import { users } from '@/lib/data';

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  availableUsers: User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[1]); // Default to Supervisor

  const contextValue = useMemo(() => ({
    user: currentUser,
    setUser: setCurrentUser,
    availableUsers: users,
  }), [currentUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
