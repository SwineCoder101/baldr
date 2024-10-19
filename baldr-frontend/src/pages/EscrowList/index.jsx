import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/const";
import { Wrapper } from "./style";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";

const EscrowListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTE_PATH.ESCROW_LIST, { replace: true });
  }, [navigate]);

  return (
    <>
      <LogoTopBar />

      <Wrapper>EscrowListPage</Wrapper>

      <BottomNavBar />
    </>
  );
};

export default EscrowListPage;
