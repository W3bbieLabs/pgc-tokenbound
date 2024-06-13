import { createWallet, inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";

const client = createThirdwebClient({ clientId });

export { wallets, client };
