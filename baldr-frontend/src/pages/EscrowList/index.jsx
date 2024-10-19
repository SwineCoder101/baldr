import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/const";

const EscrowListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTE_PATH.ESCROW_LIST, { replace: true });
  }, [navigate]);

  return <div>EscrowListPage</div>;
};

export default EscrowListPage;
