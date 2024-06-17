"use client";

import {
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { MediaRenderer } from "thirdweb/react";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { activeChain, nftDropAddress } from "../../../const/constant";
import { Signer, Wallet } from "ethers";
import newSmartWallet from "@/app/ui/SmartWallet";
import SmartWalletConnected from "@/app/ui/SmartWalletConnected";
import { client } from "@/app/config/wallet";

export default function TokenPage() {
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<Signer | undefined>(undefined);
  const [nft, setNft] = useState<NFT | null>(null);
  const [contractMetadata, setContractMetadata] = useState<any | null>(null);

  const address = useActiveAccount();
  const wallet = useActiveWallet();
  const router = useRouter();
  const { tokenId } = router.query;

  useEffect(() => {
    const fetchNFTData = async () => {
      if (tokenId) {
        const sdk = new ThirdwebSDK(activeChain);
        const contract = await sdk.getContract(nftDropAddress);
        const fetchedNft = await contract.erc721.get(tokenId as string);
        setNft(fetchedNft);

        let metadata;
        try {
          metadata = await contract.metadata.get();
        } catch (e) {
          metadata = null;
        }
        setContractMetadata(metadata);
      }
    };

    fetchNFTData();
  }, [tokenId]);

  useEffect(() => {
    const createSmartWallet = async (nft: NFT) => {
      if (nft && smartWalletAddress == null && address && wallet) {
        const smartWallet = newSmartWallet(nft);
        console.log("personal wallet", address);
        await smartWallet.connect({
          personalWallet: wallet,
        });
        setSigner(await smartWallet.getSigner());
        console.log("signer", signer);
        setSmartWalletAddress(await smartWallet.getAddress());
        console.log("smart wallet address", await smartWallet.getAddress());
        return smartWallet;
      } else {
        console.log("smart wallet not created");
      }
    };

    if (nft) {
      createSmartWallet(nft);
    }
  }, [nft, smartWalletAddress, address, wallet]);

  if (!nft) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 p-4">
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className="w-full h-auto"
              />
            </div>

            <div className="p-4 flex flex-col justify-between">
              {contractMetadata && (
                <div className="flex items-center space-x-4 mb-4">
                  <MediaRenderer
                    client={client}
                    src={contractMetadata.image}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-lg font-semibold">{contractMetadata.name}</p>
                </div>
              )}
              <h1 className="text-2xl font-bold mb-2">{nft.metadata.name}</h1>
              <p className="text-gray-600 mb-4">Token ID #{nft.metadata.id}</p>
              {smartWalletAddress ? (
                <SmartWalletConnected signer={signer} />
              ) : (
                <div className="flex justify-center items-center">
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
