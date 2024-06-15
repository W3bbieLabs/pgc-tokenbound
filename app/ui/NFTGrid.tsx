// app/components/NFT/NFTGrid.tsx
import type { NFT as NFTType } from "thirdweb";
import Link from "next/link";
import React from "react";
import NFTComponent from "./NFT";

type Props = {
  isLoading: boolean;
  nfts: NFTType[] | undefined;
  emptyText?: string;
};

export default function NFTGrid({
  nfts,
  isLoading,
  emptyText = "No owned NFTs.",
}: Props) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!nfts || nfts.length === 0) {
    return <p>{emptyText}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {nfts.map((nft) => (
        <Link key={nft.tokenURI} href={nft.tokenURI}>
          <NFTComponent nft={nft} />
        </Link>
      ))}
    </div>
  );
}
