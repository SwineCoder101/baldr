import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_PATH } from "./common/const";
import EscrowListPage from "./pages/EscrowList";
import EscrowTradePage from "./pages/EscrowTrade";
import EscrowCreatePage from "./pages/EscrowCreate";
import InventoryPage from "./pages/Inventory";
import HistoryPage from "./pages/History";


import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  baseSepolia,
  polygonAmoy,
  flowTestnet,
  skaleNebulaTestnet,
  auroraTestnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";




const config = getDefaultConfig({
  appName: 'baldr',
  projectId: 'fc8b5ed20be8c39819928d4a45318f7e',
  chains: [mainnet, flowTestnet,polygonAmoy,baseSepolia,skaleNebulaTestnet,auroraTestnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();


function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  );
}

export default App;
