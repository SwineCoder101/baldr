import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MY_WALLET_ADDRESS, ROUTE_PATH } from "../../common/const";
import {
  Wrapper,
  GameSelection,
  GameLabel,
  GameSelect,
  TabNavigation,
  TabButton,
  TradeListView,
  SectionHeader,
  SectionTitle,
  CountBadge,
  ExpandIcon,
  CollapseWrapper,
  TradeCard,
  TradeCardContent,
  BlueCountBadge,
} from "./style";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";

// Sample data for escrow requests
const escrowRequests = [
  {
    tokenId: 0,
    sender: "Louis",
    price: "$100",
    quantity: 1,
    date: "19/10/2024 - 07:11pm",
    item: "Happy Mushroom",
    contractAddress: "0xe38995f919822a378a66c89eb7e68a9bc0f88f18",
    walletAddress: "0xedc5fb724f19b4d9e45258f0f8438bff62ab058f",
    trustScore: 65, // Trust score out of 100
    status: "Processing",
  },
  {
    tokenId: 1,
    sender: "NotScammer",
    price: "$200",
    quantity: 2,
    date: "14/10/2024 - 06:30pm",
    item: "Shield of Valor",
    contractAddress: "0xc61673b172adc6dcc6937f0a427817de4ea2e519",
    walletAddress: "0xeffec0407c715472c43dcba49ce5d7056318f5ee",
    trustScore: 10, // Trust score out of 100
    status: "Processing",
  },
  {
    tokenId: 2,
    sender: "DuckDuck",
    price: "$750",
    quantity: 1,
    date: "11/10/2024 - 01:04am",
    item: "Doran's Ring",
    contractAddress: "0x0c59603550d0722ebb61edcccb9bc7c99d4fd54f",
    walletAddress: "0x82ec3687b8376244e720ab6076944e9e004cff7e",
    trustScore: 80, // Trust score out of 100
    status: "Done",
  },
  {
    tokenId: 3,
    sender: "JamJam",
    price: "$150",
    quantity: 1,
    date: "10/10/2024 - 09:10am",
    item: "Hack Mac",
    contractAddress: "0x769ac1e37dd301e4ffadba4c440450a781a2e0d9",
    walletAddress: MY_WALLET_ADDRESS,
    trustScore: 80, // Trust score out of 100
    status: "Done",
  },
];

const EscrowListPage = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState("Maple Story");
  const [doneOpen, setDoneOpen] = useState(false);
  const [processingOpen, setProcessingOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("received");

  useEffect(() => {
    navigate(ROUTE_PATH.ESCROW_LIST, { replace: true });
  }, [navigate]);

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleToggleDone = () => {
    setDoneOpen(!doneOpen);
  };

  const handleToggleProcessing = () => {
    setProcessingOpen(!processingOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTradeClick = (request) => {
    // escrow/:escrowCount/:sellerAddress/:buyerAddress
    const url = `/escrow/${request.tokenId}/${request.walletAddress}/${MY_WALLET_ADDRESS}`;
    navigate(url, { state: { request } });
  };

  return (
    <>
      <LogoTopBar />

      <Wrapper className="big-pd">
        {/* Select Game Section */}
        <GameSelection className="f-row f-spb vc">
          <GameLabel>Game:</GameLabel>
          <GameSelect value={selectedGame} onChange={handleGameChange}>
            <option value="Maple Story">Maple Story (0x4ce2d015...)</option>
            <option value="League of Legends">League of Legends (0xa42b0cde...)</option>
            <option value="World of Warcraft">World of Warcraft (0x1dcd02be...)</option>
          </GameSelect>
        </GameSelection>

        {/* Tab Navigation Section */}
        <TabNavigation className="f-row f-spb">
          <TabButton active={activeTab === "received"} onClick={() => handleTabChange("received")}>
            Received Trade
          </TabButton>
          <TabButton active={activeTab === "send"} onClick={() => handleTabChange("send")}>
            Send Trade
          </TabButton>
        </TabNavigation>

        {/* Trade List View Section */}
        {activeTab === "received" && (
          <TradeListView>
            {/* Done Dropdown */}
            <SectionHeader onClick={handleToggleDone} className="">
              <div className="f-row vc">
                <SectionTitle>Done</SectionTitle>
                <CountBadge>
                  {
                    escrowRequests.filter(
                      (req) => req.status === "Done" && req.walletAddress !== MY_WALLET_ADDRESS
                    ).length
                  }
                </CountBadge>
              </div>
              <ExpandIcon open={doneOpen} className="f-row vc hc" />
            </SectionHeader>

            <CollapseWrapper open={doneOpen}>
              {escrowRequests
                .filter(
                  (request) =>
                    request.status === "Done" && request.walletAddress !== MY_WALLET_ADDRESS
                )
                .map((request) => (
                  <TradeCard key={request.uuid} onClick={() => handleTradeClick(request)}>
                    <TradeCardContent>
                      <div className="f-row f-spb">
                        <p>{request.sender}</p>
                        <p className="date">{request.date}</p>
                      </div>
                      <div className="f-row f-spb" style={{ marginTop: "1rem" }}>
                        <p>{request.item}</p>
                        <p>{request.price}</p>
                      </div>
                    </TradeCardContent>
                  </TradeCard>
                ))}
            </CollapseWrapper>

            {/* Processing Dropdown */}
            <SectionHeader onClick={handleToggleProcessing}>
              <div className="f-row vc">
                <SectionTitle>Processing</SectionTitle>
                <BlueCountBadge>
                  {
                    escrowRequests.filter(
                      (req) =>
                        req.status === "Processing" && req.walletAddress !== MY_WALLET_ADDRESS
                    ).length
                  }
                </BlueCountBadge>
              </div>
              <ExpandIcon open={processingOpen} />
            </SectionHeader>

            <CollapseWrapper open={processingOpen}>
              {escrowRequests
                .filter(
                  (request) =>
                    request.status === "Processing" && request.walletAddress !== MY_WALLET_ADDRESS
                )
                .map((request) => (
                  <TradeCard key={request.uuid} onClick={() => handleTradeClick(request)}>
                    <TradeCardContent>
                      <div className="f-row f-spb">
                        <p>{request.sender}</p>
                        <p className="date">{request.date}</p>
                      </div>
                      <div className="f-row f-spb" style={{ marginTop: "1rem" }}>
                        <p>{request.item}</p>
                        <p>{request.price}</p>
                      </div>
                    </TradeCardContent>
                  </TradeCard>
                ))}
            </CollapseWrapper>
          </TradeListView>
        )}

        {activeTab === "send" && (
          <TradeListView>
            {/* Done Dropdown */}
            <SectionHeader onClick={handleToggleDone} className="">
              <div className="f-row vc">
                <SectionTitle>Done</SectionTitle>
                <CountBadge>
                  {
                    escrowRequests.filter(
                      (req) => req.status === "Done" && req.walletAddress === MY_WALLET_ADDRESS
                    ).length
                  }
                </CountBadge>
              </div>
              <ExpandIcon open={doneOpen} className="f-row vc hc" />
            </SectionHeader>

            <CollapseWrapper open={doneOpen}>
              {escrowRequests
                .filter(
                  (request) =>
                    request.status === "Done" && request.walletAddress === MY_WALLET_ADDRESS
                )
                .map((request) => (
                  <TradeCard key={request.uuid} onClick={() => handleTradeClick(request)}>
                    <TradeCardContent>
                      <div className="f-row f-spb">
                        <p>{request.sender}</p>
                        <p className="date">{request.date}</p>
                      </div>
                      <div className="f-row f-spb" style={{ marginTop: "1rem" }}>
                        <p>{request.item}</p>
                        <p>{request.price}</p>
                      </div>
                    </TradeCardContent>
                  </TradeCard>
                ))}
            </CollapseWrapper>

            {/* Processing Dropdown */}
            <SectionHeader onClick={handleToggleProcessing}>
              <div className="f-row vc">
                <SectionTitle>Processing</SectionTitle>
                <BlueCountBadge>
                  {
                    escrowRequests.filter(
                      (req) =>
                        req.status === "Processing" && req.walletAddress === MY_WALLET_ADDRESS
                    ).length
                  }
                </BlueCountBadge>
              </div>
              <ExpandIcon open={processingOpen} />
            </SectionHeader>

            <CollapseWrapper open={processingOpen}>
              {escrowRequests
                .filter(
                  (request) =>
                    request.status === "Processing" && request.walletAddress === MY_WALLET_ADDRESS
                )
                .map((request) => (
                  <TradeCard key={request.uuid} onClick={() => handleTradeClick(request)}>
                    <TradeCardContent>
                      <div className="f-row f-spb">
                        <p>{request.sender}</p>
                        <p className="date">{request.date}</p>
                      </div>
                      <div className="f-row f-spb" style={{ marginTop: "1rem" }}>
                        <p>{request.item}</p>
                        <p>{request.price}</p>
                      </div>
                    </TradeCardContent>
                  </TradeCard>
                ))}
            </CollapseWrapper>
          </TradeListView>
        )}
      </Wrapper>

      <BottomNavBar />
    </>
  );
};

export default EscrowListPage;
