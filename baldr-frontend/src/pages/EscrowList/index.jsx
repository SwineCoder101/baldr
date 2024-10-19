import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  TradeInfo,
  ProgressBar,
} from "./style";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";

// Sample data for escrow requests
const escrowRequests = [
  {
    id: 1,
    uuid: "550e8400-e29b-41d4-a716-446655440000",
    sender: "User123",
    price: "$100",
    quantity: 1,
    date: "2024-10-14",
    item: "Sword of Power",
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
      </Wrapper>

      <BottomNavBar />
    </>
  );
};

export default EscrowListPage;
