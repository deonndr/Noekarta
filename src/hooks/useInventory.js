import { useState, useEffect } from 'react';

export function useInventory() {
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const item = window.localStorage.getItem('noekarta_inventory');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('noekarta_inventory', JSON.stringify(savedItems));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  }, [savedItems]);

  const toggleSave = (id) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return { savedItems, toggleSave };
}
