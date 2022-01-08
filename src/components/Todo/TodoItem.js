import { useState } from "react";
import styled from "styled-components";
import { Button } from "..";
import { TodoItemContent } from "./TodoItemContent";

const ItemWrapper = styled.div`
  display: flex;
  max-width: 500px;
  justify-content: space-between;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 16px;
  gap: 8px;
`;

export function TodoItem({ item, removeTodoItem, editTodoItem }) {
  const [isEditMode, setEditMode] = useState(false);

  return (
    <li>
      <ItemWrapper>
        <TodoItemContent
          isEditMode={isEditMode}
          setEditMode={setEditMode}
          item={item}
          editItem={editTodoItem}
        />
        <ButtonsWrapper>
          <Button onClick={() => removeTodoItem(item)}>Remove</Button>
          <Button disabled={isEditMode} onClick={() => setEditMode(true)}>
            Edit
          </Button>
        </ButtonsWrapper>
      </ItemWrapper>
    </li>
  );
}
