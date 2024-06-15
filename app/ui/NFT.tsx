import { NFT } from "thirdweb";
import React from "react";
import { MediaRenderer } from "thirdweb/react";
import { client } from "../config/wallet";
import { useState } from "react";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const [isClaiming, setIsClaiming] = useState(false);

  return (
    <div className="border p-4 rounded-lg text-center transition-shadow duration-200 ease-in-out hover:shadow-lg">
      <MediaRenderer client={client} src={nft.metadata.image as string} className="w-full rounded-lg" />
      <p className="mt-2 text-lg font-medium text-foreground-dark">{nft.metadata.name}</p>
      <p className="mt-2 text-lg font-medium text-foreground-dark">{nft.metadata.description}</p>
      <div className="mt-4">
            <button
              
              disabled={isClaiming}
              className="px-4 py-2 bg-background-dark dark:bg-background-light text-foreground-light dark:text-foreground-dark rounded disabled:opacity-50"
            >
              {isClaiming ? "Claiming..." : "Claim NFT"}
            </button>
          </div>
    </div>
  );
}
