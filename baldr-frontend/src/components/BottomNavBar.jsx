import styled from "styled-components";
import theme from "../styles/theme";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTE_PATH } from "../common/const";
import TradeWhiteIcon from "../assets/icons/trade-white.png";
import TradeGrayIcon from "../assets/icons/trade-gray.png";
import InventoryWhiteIcon from "../assets/icons/inventory-white.png";
import InventoryGrayIcon from "../assets/icons/inventory-gray.png";
import HistoryWhiteIcon from "../assets/icons/history-white.png";
import HistoryGrayIcon from "../assets/icons/history-gray.png";

const BottomNavBar = () => {
  const location = useLocation();

  return (
    <Wrapper className="f-spb">
      <NavLink to={ROUTE_PATH.ESCROW_LIST} className="f-col vc">
        <img
          src={location.pathname === ROUTE_PATH.ESCROW_LIST ? TradeWhiteIcon : TradeGrayIcon}
          alt="Escrow Icon"
        />
        <p className={location.pathname === ROUTE_PATH.ESCROW_LIST ? "wh" : "gr"}>Escrow</p>
      </NavLink>

      <NavLink to={ROUTE_PATH.INVENTORY} className="f-col vc">
        <img
          src={location.pathname === ROUTE_PATH.INVENTORY ? InventoryWhiteIcon : InventoryGrayIcon}
          alt="Inventory Icon"
        />
        <p className={location.pathname === ROUTE_PATH.INVENTORY ? "wh" : "gr"}>Inventory</p>
      </NavLink>

      <NavLink to={ROUTE_PATH.HISTORY} className="f-col vc">
        <img
          src={location.pathname === ROUTE_PATH.HISTORY ? HistoryWhiteIcon : HistoryGrayIcon}
          alt="History Icon"
        />
        <p className={location.pathname === ROUTE_PATH.HISTORY ? "wh" : "gr"}>History</p>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${theme.color.BACK_BLACK};
  color: ${theme.color.WHITE};
  font-size: ${theme.font.SIZE.XL};
  padding: 1.4rem 3rem;

  position: fixed;
  bottom: 0;
  width: 100%;

  img {
    width: 3rem;
  }

  p {
    font-size: ${theme.font.SIZE.M};
    margin-top: 0.4rem;
  }

  .wh {
    color: ${theme.color.WHITE};
  }

  .gr {
    color: ${theme.color.TEXT_GRAY};
  }
`;

export default BottomNavBar;
