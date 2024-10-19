import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/const";
import {
  Wrapper,
  GameSelection,
  GameLabel,
  GameSelect,
  TabNavigation,
  TabButton,
  TradeListView,
  SendTradeView,
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
    id: 1,
    uuid: "550e8400-e29b-41d4-a716-446655440000",
    sender: "Louis",
    price: "$100",
    quantity: 1,
    date: "14/10/2024 - 07:11pm",
    item: "Happy Mushroom",
    contractAddress: "0x123...abc",
    walletAddress: "0xABC123...789",
    trustScore: 85, // Trust score out of 100
    tokenId: "12345",
    status: "Processing",
  },
  {
    id: 2,
    uuid: "660e8400-e29b-41d4-a716-446655440111",
    sender: "User456",
    price: "$200",
    quantity: 2,
    date: "2024-10-13",
    item: "Shield of Valor",
    contractAddress: "0x456...def",
    walletAddress: "0xDEF456...012",
    trustScore: 70, // Trust score out of 100
    tokenId: "67890",
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

  return (
    <>
      <LogoTopBar />

      <Wrapper className="big-pd">
        {/* Select Game Section */}
        <GameSelection className="f-row f-spb">
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
                  {escrowRequests.filter((req) => req.status === "Done").length}
                </CountBadge>
              </div>
              <ExpandIcon open={doneOpen} className="f-row vc hc" />
            </SectionHeader>
            <CollapseWrapper open={doneOpen}>
              {escrowRequests
                .filter((request) => request.status === "Done")
                .map((request) => (
                  <TradeCard key={request.uuid}>
                    <TradeCardContent>
                      <div className="f-row f-spb">
                        <p>{request.sender}</p>
                        <p className="date">{request.date}</p>
                      </div>
                      <div className="f-row f-spb" style={{ marginTop: "1rem" }}>
                        <p>{request.item}</p>
                        <p>{request.price} Gold</p>
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
                  {escrowRequests.filter((req) => req.status === "Processing").length}
                </BlueCountBadge>
              </div>
              <ExpandIcon open={processingOpen} />
            </SectionHeader>
            <CollapseWrapper open={processingOpen}>
              {escrowRequests
                .filter((request) => request.status === "Processing")
                .map((request, index) => (
                  <Link
                    key={index}
                    to={`/escrow/99/0xaffABfbDa8fb29E34ffd60545eDFBA3207731008/0xfa6Cc5134a2e81a2F19113992Ef61F9BE81cafdE/bbb08400-e29b-41d4-a716-446655440666-3`}
                  >
                    <TradeCard key={request.uuid}>
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
                  </Link>
                ))}
            </CollapseWrapper>
          </TradeListView>
        )}
        {activeTab === "send" && (
          <SendTradeView>
            <p>Send Trade Section (To be implemented)</p>
          </SendTradeView>
        )}
      </Wrapper>

      <BottomNavBar />
    </>
  );
};

export default EscrowListPage;
