import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_PATH } from "./common/const";
import EscrowListPage from "./pages/EscrowList";
import EscrowTradePage from "./pages/EscrowTrade";
import EscrowCreatePage from "./pages/EscrowCreate";
import InventoryPage from "./pages/Inventory";
import HistoryPage from "./pages/History";
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
// import { config } from './config';
import { WagmiProvider ,createConfig} from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { mainnet } from 'viem/chains';
import { http } from 'viem';
// import { EthereumWalletConnectors } from '@dynamic-labs/ethereum-all';
const queryClient = new QueryClient()

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});


function App() {
  return (
    <WagmiProvider config={config}>


      <QueryClientProvider client={queryClient}>

        <DynamicContextProvider
          settings={{
            environmentId: '9ebc2da2-5d7d-4c1e-85f8-6442ff43725c',
            walletConnectors: [EthereumWalletConnectors],
          }}>



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
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
