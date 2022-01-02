import localForage from "localforage";
import { useCallback, useEffect, useState } from "react";

export function useTodoItems() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    localForage.getItem("todoItems", (_, items) => {
      setTodoItems(items ?? []);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localForage.setItem("todoItems", todoItems);
    }
  }, [todoItems, isLoaded]);

  const addTodoItem = useCallback((newItem) => {
    setTodoItems((currentItems) => [...currentItems, newItem]);
  }, []);

  const removeTodoItem = useCallback((removedItem) => {
    setTodoItems((currentItems) =>
      currentItems.filter((item) => item.key !== removedItem.key)
    );
  }, []);

  const editTodoItem = useCallback((updatedItem) => {
    setTodoItems((currentItems) => {
      const itemIndex = currentItems.findIndex(
        (item) => item.key === updatedItem.key
      );

      return [
        ...currentItems.slice(0, itemIndex),
        updatedItem,
        ...currentItems.slice(itemIndex + 1),
      ];
    });
  }, []);

  return { todoItems, isLoaded, addTodoItem, removeTodoItem, editTodoItem };
}
