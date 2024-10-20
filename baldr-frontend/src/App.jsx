import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_PATH } from "./common/const";
import EscrowListPage from "./pages/EscrowList";
import EscrowTradePage from "./pages/EscrowTrade";
import EscrowCreatePage from "./pages/EscrowCreate";
import InventoryPage from "./pages/Inventory";
import HistoryPage from "./pages/History";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "9ebc2da2-5d7d-4c1e-85f8-6442ff43725c",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
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
    </DynamicContextProvider>
  );
}

export default App;
