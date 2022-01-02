import { useCallback } from "react";
import styled from "styled-components";
import { useTodoItems } from "../../hooks";
import { TodoItem } from "./TodoItem";
import { TodoItemForm } from "./TodoItemForm";

const List = styled.ol`
  padding-left: 16px;
`;

export function TodoList() {
  const { todoItems, isLoaded, addTodoItem, ...itemActions } = useTodoItems();

  const handleAddItem = useCallback(
    (itemData) => {
      addTodoItem({
        key: Date.now(),
        ...itemData,
      });
    },
    [addTodoItem]
  );

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div>
      <List>
        {todoItems.map((item) => (
          <TodoItem key={item.key} item={item} {...itemActions} />
        ))}
      </List>
      <TodoItemForm onSave={handleAddItem} />
    </div>
  );
}
