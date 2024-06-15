"use client"
import { useEffect, useState } from "react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { getContract } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { activeChain, nftDropAddress } from "@/app/const/constant";
import { client } from "@/app/config/wallet";
import NFTGrid from "@/app/ui/NFTGrid";
import { NFT } from "thirdweb";
import { Container } from "./ui/Container";

export default function Home() {
  const address = useActiveAccount();
  const contract = getContract({
    client,
    chain: activeChain,
    address: nftDropAddress,
  });

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (address && contract) {
        setIsLoading(true);
        try {
          const ownedNFTs = await getOwnedNFTs({
            contract,
            owner: address.address,
          });
          setNfts(ownedNFTs);
        } catch (error) {
          console.error("Failed to fetch NFTs", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [address]);

  return (
    <Container className="mt-5 min-h-screen">
      {address ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-foreground-light">Your NFTs</h1>
          <p className="mb-4 text-foreground-light">
            Browse the NFTs inside your personal wallet, select one to connect a token bound smart wallet & view its balance.
          </p>
          <NFTGrid
            nfts={nfts}
            isLoading={isLoading}
            emptyText={
              "Looks like you don't own any NFTs. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
            }
          />
          
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Connect a personal wallet to view your owned NFTs</h2>
        </div>
      )}
    </Container>
  );
}
