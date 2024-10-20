import styled from "styled-components";
import theme from "../../styles/theme";

export const Wrapper = styled.div`
  background-color: ${theme.color.MAIN_BLACK};
  color: ${theme.color.WHITE};
  font-size: ${theme.font.SIZE.ML};
  font-weight: 600;
  height: 100vh;
  padding: 8rem 2rem 2rem 2rem;
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

export const InventorySection = styled.div`
  #title {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
  }
`;

export const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  background-color: ${theme.color.BACK_GRAY};
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
`;

export const ItemBox = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

export const ItemImage = styled.img`
  width: 100%;
  border-radius: 0.8rem;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${theme.color.BACK_GRAY};
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  z-index: 2;

  .none {
    color: ${theme.color.TEXT_GRAY};
  }
`;

export const MenuItem = styled.div`
  padding: 1.2rem;
  font-size: 1.4rem;
  color: ${theme.color.WHITE};
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 3;

  &:hover {
    background-color: ${theme.color.BACK_BLUE};
  }
`;
