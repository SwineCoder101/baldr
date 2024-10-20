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

import { StoryClient, StoryConfig } from '@story-protocol/core-sdk'
import { http } from 'viem'
import { account, RPCProviderUrl } from '../../utils'

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
    } else if (action === "ProtectIP") {
      console.log("IP Protected using Story network");
      console.log(selectedItem)
      // protectIP();

    } else {
      alert("Not yet");
    }
  };

  const protectIP = async function () {
    // 1. Set up your Story Config
    //
    // Docs: https://docs.story.foundation/docs/typescript-sdk-setup
    const config = {
        account: account,
        transport: http(RPCProviderUrl),
        chainId: 'iliad',
    }
    const client = StoryClient.newClient(config)

    // 2. Set up your IP Metadata
    //
    // Docs: https://docs.story.foundation/docs/ipa-metadata-standard
    const ipMetadata = client.ipAsset.generateIpMetadata({
        title: 'My IP Asset',
        description: 'This is a test IP asset',
        attributes: [
            {
                key: 'Rarity',
                value: 'Legendary',
            },
        ],
    })

    // 3. Set up your NFT Metadata
    //
    // Docs: https://eips.ethereum.org/EIPS/eip-721
    const nftMetadata = {
        name: 'NFT representing ownership of IP Asset',
        description: 'This NFT represents ownership of an IP Asset',
        image: 'https://i.imgur.com/gb59b2S.png',
    }

    // 4. Upload your IP and NFT Metadata to IPFS
    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
    const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex')
    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
    const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex')

    // 5. Mint an NFT
    const tokenId = await mintNFT(account.address, `https://ipfs.io/ipfs/${nftIpfsHash}`)
    console.log(`NFT minted with tokenId ${tokenId}`)

    // 6. Register an IP Asset
    //
    // Docs: https://docs.story.foundation/docs/register-an-nft-as-an-ip-asset
    const response = await client.ipAsset.registerIpAndAttachPilTerms({
        nftContract: NFTContractAddress,
        tokenId: tokenId,
        pilType: PIL_TYPE.NON_COMMERCIAL_REMIX,
        mintingFee: 0, // empty - doesn't apply
        currency: AddressZero, // empty - doesn't apply
        ipMetadata: {
            ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
            ipMetadataHash: `0x${ipHash}`,
            nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
            nftMetadataHash: `0x${nftHash}`,
        },
        txOptions: { waitForTransaction: true },
    })
    console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)
    console.log(`View on the explorer: https://explorer.story.foundation/ipa/${response.ipId}`)
}


  return (
    <>
      <LogoTopBar />

      <Wrapper>
        {/* Select Game Section */}
        <GameSelection className="f-row f-spb">
          <GameLabel>Game:</GameLabel>
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
                    <MenuItem onClick={() => handleMenuItemClick("Transfer")}>Transfer</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("Rental")}>Rental</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("Lending")}>Lending</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("Auction")}>Auction</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("ProtectIP")}>Protect IP</MenuItem>
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
