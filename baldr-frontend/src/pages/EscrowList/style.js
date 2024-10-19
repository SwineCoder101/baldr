import styled from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  background-color: ${theme.color.MAIN_BLACK};
  color: ${theme.color.WHITE};
  font-size: ${theme.font.SIZE.ML};
  font-weight: 600;
  height: 100vh;
`;

export const GameSelection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const GameLabel = styled.p`
  color: ${theme.color.WHITE};
  margin-right: 16px;
`;

export const GameSelect = styled.select`
  padding: 0.6rem;
  color: ${theme.color.TEXT_BLUE};
  background-color: ${theme.color.BACK_BLUE};
  border-radius: 0.4rem;
  border: none;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
`;

export const TabNavigation = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button`
  padding: 1rem 1rem;
  width: 50%;
  font-size: ${theme.font.SIZE.M};
  color: ${({ active }) => (active ? theme.color.WHITE : theme.color.TEXT_GRAY)};
  border: none;
  border-bottom: ${({ active }) => (active ? `2px solid ${theme.color.WHITE}` : "none")};
  cursor: pointer;
  outline: none;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: ${theme.color.WHITE};
  }
`;
