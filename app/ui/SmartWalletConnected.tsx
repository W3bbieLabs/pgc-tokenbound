import {
  ThirdwebNftMedia,
  ThirdwebSDKProvider,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useActiveAccount  } from "thirdweb/react";
import getContract from "thirdweb";
import { Signer } from "ethers";
import React from "react";
import {
  nftDropAddress,
  activeChain,
} from "../const/constant";

interface ConnectedProps {
  signer: Signer | undefined;
}

const SmartWalletConnected: React.FC<ConnectedProps> = ({ signer }) => {
  return (
    <ThirdwebSDKProvider signer={signer} activeChain={activeChain.name}>
      <ClaimTokens />
    </ThirdwebSDKProvider>
  );
};

const ClaimTokens = () => {
  const address = useActiveAccount();

  const { contract } = useContract(nftDropAddress);
  const { data: ownedNFTs, isLoading: ownedNFTsIsLoading } = useOwnedNFTs(
    contract,
    address?.address
  );

  return (
    <div>
      <p>
        Smart Wallet addres:{" "}
        <span style={{ overflowWrap: "break-word", maxWidth: "280px" }}>
          {address?.address}
        </span>
      </p>
      
      <br />
      <h1>Claim NFT:</h1>
      
      {ownedNFTsIsLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {ownedNFTs && ownedNFTs.length > 0 ? (
            ownedNFTs.map((nft, index) => {
              return (
                <div key={index}>
                  <ThirdwebNftMedia metadata={nft.metadata} />
                  <p>{nft.metadata.name}</p>
                  <p>QTY: {nft.quantityOwned}</p>
                </div>
              );
            })
          ) : (
            <p>You have no NFTs</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartWalletConnected;
