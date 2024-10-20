import { Wrapper } from "./style";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";

import ContractTester from "../../components/ContractTester";



const HistoryPage = () => {
  return (
    <>
      <LogoTopBar />

      <Wrapper>

        <ContractTester />
      </Wrapper>

      <BottomNavBar />
    </>
  );
};

export default HistoryPage;
