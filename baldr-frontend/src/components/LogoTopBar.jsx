import styled from "styled-components";
import theme from "../styles/theme";

const LogoTopBar = () => {
  return (
    <Wrapper className="f-row f-spb big-pd">
      <div>Baldr</div>
      <div>Wallet</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${theme.color.MAIN_BLACK};
  color: ${theme.color.WHITE};
  font-size: ${theme.font.SIZE.XL};
`;

export default LogoTopBar;
