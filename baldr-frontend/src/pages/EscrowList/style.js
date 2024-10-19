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

export const TradeListView = styled.div`
  margin-top: 2rem;
`;

export const SendTradeView = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: ${theme.color.WHITE};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 0;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 6px;
`;

export const SectionTitle = styled.p`
  color: ${theme.color.WHITE};
`;

export const CountBadge = styled.div`
  background-color: ${theme.color.BACK_GREEN};
  color: ${theme.color.TEXT_GREEN};
  font-size: 1.4rem;
  padding: 4px 6px;
  border-radius: 4px;
  margin-left: 1rem;
`;

export const BlueCountBadge = styled.div`
  background-color: ${theme.color.BACK_BLUE};
  color: ${theme.color.TEXT_BLUE};
  font-size: 1.4rem;
  padding: 4px 6px;
  border-radius: 4px;
  margin-left: 1rem;
`;

export const ExpandIcon = styled.div`
  width: 3rem;
  height: 3rem;
  transform: ${({ open }) => (open ? "rotate(0deg)" : "rotate(180deg)")};
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
`;

export const TradeInfo = styled.p`
  color: ${theme.color.TEXT_LIGHT_GRAY};
  margin: 4px 0;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${theme.color.PROGRESS_BACKGROUND};
  border-radius: 5px;
  margin: 8px 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ value }) => value}%;
    background-color: ${theme.color.PROGRESS_FILL};
    border-radius: 5px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  color: ${theme.color.WHITE};
  background-color: ${({ primary }) =>
    primary ? theme.color.PRIMARY_BLUE : theme.color.BUTTON_GRAY};
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ primary }) =>
      primary ? theme.color.HOVER_BLUE : theme.color.HOVER_GRAY};
  }
`;
