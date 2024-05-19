export const useLocalStorage = () => {
  const setItem = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const removeItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { setItem, getItem, removeItem };
};
