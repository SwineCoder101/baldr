import styled from "styled-components";
import theme from "../styles/theme";

const BottomNavBar = () => {
  return <Wrapper className="f-spb big-pd">BottomNavBar</Wrapper>;
};

const Wrapper = styled.div`
  background-color: ${theme.color.BACK_BLACK};
  color: ${theme.color.WHITE};
  font-size: ${theme.font.SIZE.XL};

  position: fixed;
  bottom: 0;
  width: 100%;
`;

export default BottomNavBar;
