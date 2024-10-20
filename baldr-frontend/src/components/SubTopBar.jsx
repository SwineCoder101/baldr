import styled from "styled-components";
import theme from "../styles/theme";
import BackIcon from "../assets/icons/left-arrow-white.png";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useNavigate } from "react-router-dom";

const SubTopBar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper className="f-row f-spb vc">
      <img id="b-btn" src={BackIcon} onClick={() => handleGoBack()} />
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

  #b-btn {
    width: 2rem;
  }
`;

export default SubTopBar;
