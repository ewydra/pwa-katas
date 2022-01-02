import { useState } from "react";
import styled from "styled-components";
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

  & > button {
    margin-right: 8px;
  }
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
          <button onClick={() => removeTodoItem(item)}>Remove</button>
          <button disabled={isEditMode} onClick={() => setEditMode(true)}>
            Edit
          </button>
        </ButtonsWrapper>
      </ItemWrapper>
    </li>
  );
}
