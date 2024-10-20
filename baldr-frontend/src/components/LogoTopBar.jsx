import styled from "styled-components";
import theme from "../styles/theme";
import Baldr from "../assets/image/baldr.png";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const LogoTopBar = () => {
  return (
    <Wrapper className="f-row f-spb vc">
      <div id="title" className="f-row vc">
        <img id="logo" src={Baldr} />
        <p>Baldr</p>
      </div>
      <DynamicWidget />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${theme.color.MAIN_BLACK};
  color: ${theme.color.WHITE};
  font-size: ${theme.font.SIZE.XL};
  padding: 1.4rem 2rem;

  position: fixed;
  top: 0;
  width: 100%;

  #title {
    font-weight: bold;

    #logo {
      width: 3.4rem;
      height: 3.4rem;
      margin-right: 1rem;
      border-radius: 0.4rem;
    }
  }
`;

export default LogoTopBar;
