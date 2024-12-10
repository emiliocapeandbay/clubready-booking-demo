import React, { createContext, useContext, useState, ReactNode } from "react";

interface TabContextProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = (): TabContextProps => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};