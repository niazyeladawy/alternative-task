import React, { createContext, useState, useContext } from 'react';

interface ActiveIdContextType {
    activeId: string | null;
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ActiveIdContext = createContext<ActiveIdContextType | undefined>(undefined);

export const ActiveIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <ActiveIdContext.Provider value={{ activeId, setActiveId }}>
            {children}
        </ActiveIdContext.Provider>
    );
};

export const useActiveId = (): ActiveIdContextType => {
    const context = useContext(ActiveIdContext);
    if (!context) {
        throw new Error('useActiveId must be used within an ActiveIdProvider');
    }
    return context;
};
