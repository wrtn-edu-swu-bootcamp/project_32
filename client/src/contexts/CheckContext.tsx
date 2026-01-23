import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface CheckContextType {
  selectedItems: Map<number, number>;
  manualItems: string[];
  addItem: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  addManualItem: (item: string) => void;
  removeManualItem: (index: number) => void;
  clearAll: () => void;
  getTotalCount: () => number;
}

const CheckContext = createContext<CheckContextType | undefined>(undefined);

export const CheckProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<Map<number, number>>(new Map());
  const [manualItems, setManualItems] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('currentCheck');
    if (saved) {
      const data = JSON.parse(saved);
      setSelectedItems(new Map(data.selectedItems));
      setManualItems(data.manualItems || []);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(
      'currentCheck',
      JSON.stringify({
        selectedItems: Array.from(selectedItems.entries()),
        manualItems,
      })
    );
  }, [selectedItems, manualItems]);

  const addItem = (itemId: number, quantity: number) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      newMap.set(itemId, quantity);
      return newMap;
    });
  };

  const removeItem = (itemId: number) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      newMap.delete(itemId);
      return newMap;
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
    } else {
      addItem(itemId, quantity);
    }
  };

  const addManualItem = (item: string) => {
    if (item.trim()) {
      setManualItems((prev) => [...prev, item.trim()]);
    }
  };

  const removeManualItem = (index: number) => {
    setManualItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setSelectedItems(new Map());
    setManualItems([]);
    localStorage.removeItem('currentCheck');
  };

  const getTotalCount = () => {
    let total = 0;
    selectedItems.forEach((quantity) => {
      total += quantity;
    });
    return total + manualItems.length;
  };

  return (
    <CheckContext.Provider
      value={{
        selectedItems,
        manualItems,
        addItem,
        removeItem,
        updateQuantity,
        addManualItem,
        removeManualItem,
        clearAll,
        getTotalCount,
      }}
    >
      {children}
    </CheckContext.Provider>
  );
};

export const useCheck = () => {
  const context = useContext(CheckContext);
  if (!context) {
    throw new Error('useCheck must be used within CheckProvider');
  }
  return context;
};
