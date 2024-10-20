import styled from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  background-color: ${theme.color.MAIN_BLACK};
  color: ${theme.color.WHITE};
  font-size: ${theme.font.SIZE.ML};
  font-weight: 600;
  min-height: 100vh;
  padding: 6rem 2rem 2rem 2rem;

  #title {
    font-size: 2rem;
    margin: 1rem 0;
  }
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-radius: 1rem;
  margin-bottom: 6rem;
`;

export const Label = styled.label`
  font-size: ${theme.font.SIZE.M};
  margin-top: 1.2rem;
`;

export const Input = styled.input`
  padding: 1rem;
  font-size: ${theme.font.SIZE.M};
  background-color: ${theme.color.BACK_GRAY};
  color: ${theme.color.WHITE};
  border: none;
  border-radius: 0.5rem;
  outline: none;
  &:read-only {
    background-color: ${theme.color.BACK_GRAY};
    color: ${theme.color.WHITE};
  }
`;

export const CreateTradeButton = styled.button`
  padding: 1rem;
  margin-top: 2rem;
  font-size: ${theme.font.SIZE.M};
  color: ${theme.color.WHITE};
  background-color: ${theme.color.MAIN_BLUE};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.color.TEXT_BLUE};
  }
`;
