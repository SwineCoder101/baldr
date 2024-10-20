import { useState } from "react";
import LogoTopBar from "../../components/LogoTopBar";
import BottomNavBar from "../../components/BottomNavBar";
import {
  Wrapper,
  GameSelection,
  GameLabel,
  GameSelect,
  InventoryGrid,
  ItemBox,
  ItemImage,
  DropdownMenu,
  MenuItem,
  InventorySection,
} from "./style";
import Item1 from "../../assets/image/item1.png";
import Item2 from "../../assets/image/item2.png";
import Item3 from "../../assets/image/item3.png";
import Item4 from "../../assets/image/item4.png";
import Item5 from "../../assets/image/item5.png";
import Item6 from "../../assets/image/item6.png";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../common/const";

const items = [
  { name: "Item1", image: Item1 },
  { name: "Item2", image: Item2 },
  { name: "Item3", image: Item3 },
  { name: "Item4", image: Item4 },
  { name: "Item5", image: Item5 },
  { name: "Item6", image: Item6 },
];

const InventoryPage = () => {
  const navigate = useNavigate();

  const [selectedGame, setSelectedGame] = useState("Maple Story");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  const handleMenuItemClick = (action) => {
    if (action === "Escrow") {
      navigate(ROUTE_PATH.ESCROW_CREATE);
    } else {
      alert("Not yet");
    }
  };

  return (
    <>
      <LogoTopBar />

      <Wrapper>
        {/* Select Game Section */}
        <GameSelection className="f-row f-spb">
          <GameLabel>Game</GameLabel>
          <GameSelect value={selectedGame} onChange={handleGameChange}>
            <option value="Maple Story">Maple Story (0x4ce2d015...)</option>
            <option value="League of Legends">League of Legends (0xa42b0cde...)</option>
            <option value="World of Warcraft">World of Warcraft (0x1dcd02be...)</option>
          </GameSelect>
        </GameSelection>

        <InventorySection>
          <p id="title">Inventory</p>
          <InventoryGrid>
            {items.map((item, index) => (
              <ItemBox key={index} onClick={() => handleItemClick(index)}>
                <ItemImage src={item.image} alt={item.name} />
                {selectedItem === index && (
                  <DropdownMenu>
                    <MenuItem onClick={() => handleMenuItemClick("Escrow")}>Escrow</MenuItem>
                    <MenuItem className="none" onClick={() => handleMenuItemClick("Transfer")}>
                      Transfer
                    </MenuItem>
                    <MenuItem className="none" onClick={() => handleMenuItemClick("Rental")}>
                      Rental
                    </MenuItem>
                    <MenuItem className="none" onClick={() => handleMenuItemClick("Lending")}>
                      Lending
                    </MenuItem>
                    <MenuItem className="none" onClick={() => handleMenuItemClick("Auction")}>
                      Auction
                    </MenuItem>
                  </DropdownMenu>
                )}
              </ItemBox>
            ))}
          </InventoryGrid>
        </InventorySection>
      </Wrapper>

      <BottomNavBar />
    </>
  );
};

export default InventoryPage;
