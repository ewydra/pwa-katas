import { useCallback } from "react";
import styled from "styled-components";
import { TodoItemForm } from "./TodoItemForm";

const Label = styled.span`
  display: inline-block;
  width: 100px;
`;

export function TodoItemContent({ item, editItem, isEditMode, setEditMode }) {
  const handleEdit = useCallback(
    (itemData) => {
      editItem({ key: item.key, ...itemData });
      setEditMode(false);
    },
    [editItem, item.key, setEditMode]
  );

  if (!isEditMode) {
    return (
      <div>
        <p>
          <Label>Title:</Label>
          {item.title}
        </p>
        <p>
          <Label>Description:</Label>
          {item.description}
        </p>
      </div>
    );
  }

  return (
    <TodoItemForm
      initialTitle={item.title}
      initialDescription={item.description}
      onSave={handleEdit}
    />
  );
}
