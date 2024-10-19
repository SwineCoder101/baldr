import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/const";
import { Wrapper } from "./style";

const EscrowListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTE_PATH.ESCROW_LIST, { replace: true });
  }, [navigate]);

  return <Wrapper>EscrowListPage</Wrapper>;
};

export default EscrowListPage;
