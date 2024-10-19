import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_PATH } from "./common/const";
import EscrowListPage from "./pages/EscrowList";
import EscrowTradePage from "./pages/EscrowTrade";
import EscrowCreatePage from "./pages/EscrowCreate";
import InventoryPage from "./pages/Inventory";
import HistoryPage from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATH.MAIN} element={<EscrowListPage />}></Route>
        <Route path={ROUTE_PATH.ESCROW_LIST} element={<EscrowListPage />}></Route>
        <Route path={ROUTE_PATH.ESCROW_TRADE} element={<EscrowTradePage />}></Route>
        <Route path={ROUTE_PATH.ESCROW_CREATE} element={<EscrowCreatePage />}></Route>
        <Route path={ROUTE_PATH.INVENTORY} element={<InventoryPage />}></Route>
        <Route path={ROUTE_PATH.HISTORY} element={<HistoryPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
