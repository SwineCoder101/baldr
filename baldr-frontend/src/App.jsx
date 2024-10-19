import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_PATH } from "./common/const";
import EscrowListPage from "./pages/EscrowList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATH.MAIN} element={<EscrowListPage />}></Route>
        <Route path={ROUTE_PATH.ESCROW_LIST} element={<EscrowListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
