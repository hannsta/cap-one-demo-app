// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type UserType = 'Employee' | 'Manager' | 'Director' | 'Admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: UserType;
  department: string;
}

interface UserContextType {
  currentUser: User | null;
  userType: UserType;
  setUserType: (type: UserType) => void;
  setCurrentUser: (user: User) => void;
  availableUsers: User[];
}

// Sample users for demo purposes
const DEMO_USERS: User[] = [
  {
    id: 'john.doe',
    name: 'John Doe',
    email: 'john.doe@capitalone.com',
    employeeId: 'C1123456',
    role: 'Employee',
    department: 'Technology'
  },
  {
    id: 'jane.smith',
    name: 'Jane Smith',
    email: 'jane.smith@capitalone.com',
    employeeId: 'C1234567',
    role: 'Manager',
    department: 'Digital'
  },
  {
    id: 'mike.johnson',
    name: 'Mike Johnson',
    email: 'mike.johnson@capitalone.com',
    employeeId: 'C1345678',
    role: 'Director',
    department: 'Risk Management'
  },
  {
    id: 'sarah.wilson',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@capitalone.com',
    employeeId: 'C1456789',
    role: 'Admin',
    department: 'IT Operations'
  },
  {
    id: 'david.brown',
    name: 'David Brown',
    email: 'david.brown@capitalone.com',
    employeeId: 'C1567890',
    role: 'Employee',
    department: 'Finance'
  }
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : DEMO_USERS[0];
  });

  const [userType, setUserType] = useState<UserType>(() => {
    const stored = localStorage.getItem('userType');
    return stored ? (stored as UserType) : currentUser?.role || null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setUserType(currentUser.role);
    }
  }, [currentUser]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    }
  }, [userType]);

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      userType, 
      setUserType, 
      setCurrentUser, 
      availableUsers: DEMO_USERS 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
};