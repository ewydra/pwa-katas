import { useState, useCallback } from "react";
import styled from "styled-components";

const AccordionButton = styled.button`
  background-color: #fa8d00;
  border: none;
  border-radius: 4px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  color: #fff;
  cursor: pointer;
  width: 100%;
  outline: none;
  padding: 16px;
  transition: background-color 0.4s;

  &:hover {
    background-color: #d26c00;
  }
`;

const AccordionContent = styled.div`
  height: auto;
  max-height: ${({ isActive }) => (isActive ? "800px" : "0")};
  overflow: hidden;
  transition: max-height 1s
    ${({ isActive }) => (isActive ? "ease-in" : "ease-out")};
`;

const ContentWrapper = styled.div`
  border: 1px solid #fa8d00;
  padding: 8px 16px;
`;

export function Accordion({ label, children }) {
  const [isActive, setActive] = useState(false);

  const handleOpen = useCallback(() => {
    setActive((active) => !active);
  }, []);

  return (
    <>
      <AccordionButton onClick={handleOpen}>{label}</AccordionButton>
      <AccordionContent isActive={isActive}>
        <ContentWrapper>{children}</ContentWrapper>
      </AccordionContent>
    </>
  );
}
