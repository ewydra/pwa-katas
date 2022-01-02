import { useCallback, useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
`;

const SectionWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const InputLabel = styled.label`
  display: inline-block;
  width: 100px;
`;

const defaultFn = () => {};

export function TodoItemForm({
  initialTitle = "",
  initialDescription = "",
  onSave = defaultFn,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = useCallback(() => {
    onSave({ title, description });
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [title, description, initialDescription, initialTitle, onSave]);

  return (
    <FormWrapper>
      <SectionWrapper>
        <InputLabel htmlFor="title">Title:</InputLabel>
        <input
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </SectionWrapper>
      <SectionWrapper>
        <InputLabel htmlFor="description">Description:</InputLabel>
        <textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </SectionWrapper>
      <button onClick={handleSave}>Save</button>
    </FormWrapper>
  );
}
