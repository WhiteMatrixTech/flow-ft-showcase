# 🌈 Fungible-Token on Flow - ShowCase 🎉

Welcome to the Flow Fungible-Token Showcase! In this tutorial, we will show you how to build a complete FT (Fungible-Token) minting page on the Flow blockchain platform using ChainIDE, Cadence, and React.

🚨 **Disclaimer:** This tutorial is intended for educational purposes only. Before deploying to a production environment, it's crucial to conduct a thorough code review.

🤝 If you have any questions, please join our [ChainIDE Discord](https://discord.gg/QpGq4hjWrh)

## The Tutorial

This tutorial will be divided into the following four steps:

1.  💰 Use Flow wallet and get test coins
2.  🛠️ Deploy the NFT smart contract
3.  🚀 Deploy the front-end page
4.  🌐 Deploy on the main network

## 1. 💰 Use Flow wallet and get test coins

When you deploy a smart contract on the blockchain or interact with deployed smart contracts, you need a Flow wallet. There are many types of Flow wallets (Blocto, Lilico, Flipper, etc.), but we'll use **Blocto** for this tutorial.

On the right side of the ChainIDE Flow programming page, select Testnet and click Authenticate.

![image-20230312205320888](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230312205320888.png)

👉 Select Blocto from the options.

![Blocto wallet option](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230315154505744.png)

👉 Register for an account and fund your wallet

🔑 First, enter your email address and register for an account on [Selecte Blocto](https://blocto.com/).

💰 Next, click on the 'copy wallet address' button and navigate to the [Flow Faucet](https://testnet-faucet.onflow.org/fund-account) to paste your copied address. Select FLOW by default, complete hCaptcha authentication, and click 'FUND YOUR ACCOUNT' to receive 1000 Flow test coins.

![Flow Faucet](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230312205910626.png)

## 2. 🛠️ Deploy the NFT smart contract

📝 Our FT smart contract is based on the [Flow Fungible Token Standard](https://github.com/onflow/flow-ft). Go to the `contracts` folder and open `TestCoin.cdc`.

![TestCoin.cdc](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313174348129.png)

🔗 Import `FungibleToken`, `MetadataViews`, and `FungibleTokenMetadataViews` from the Flow Core Contracts at these addresses without deploying them yourself. Find all the information [here](https://developers.flow.com/flow/core-contracts/fungible-token).

💡 Modify the token information such as name, picture, and details from lines 111-135 of `TestCoin.cdc`.

![Token info](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313174832421.png)

🚀 Switch to the 'Deploy & Interaction' panel to deploy your TestCoin contract. Open `TestCoinMinter.cdc`, modify the import address of the TestCoin contract to your wallet address, and adjust the maximum supply and price of tokens in the init function. Finally, click 'Deploy' on the right panel to deploy your contract.

![Deploy contract](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180046294.png)

## 3. 🚀 Deploy the front-end page
Modify the parameters in `frontend/config.ts`. If the contract name has not been modified, you only need to modify the deployer address. Change `deployer` to your wallet address.

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180548039.png)

Open Sandbox flow-cli, execute `cd frontend && npm install && npm start`

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180621678.png)

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180746507.png)

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181454982.png)

Open the port forwarding panel on the left, select the flow-cli image, enter the port number 3000, and click Add 🔍

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181534845.png)

After the addition is successful, there will be an additional record of port 3000 in the table, click the icon button to open it with a browser 🌐

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313094756154.png)

The browser will open the following page 👇

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181617743.png)

After successfully logging in to the wallet, you can see that the price and supply are successfully read from the contract. 💰

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181705599.png)

Click to execute Mint, if the wallet Flow balance is insufficient, you can get Flow test tokens from FLow Faucet. 💸

![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181812423.png)

## 4. 🌐 Deploy on the main network

If you want to deploy FT and web pages on the mainnet, you need to go through the testnet tutorial again and modify the following parts:

1.  Connect to the main network 👨‍💻
    
    -   Follow the same steps as the testnet tutorial to connect to the main network. Here is an image to guide you:
        
        ![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230328100730940.png)
    
2.  Replace the address of the smart contract import contract with the mainnet address 📝
    
    -   After connecting to the main network, replace the address of the smart contract import contract with the mainnet address. Here is an image to guide you:
        
        ![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230328105642197.png)
        
        ![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230328110053414.png)
    
3.  Replace the front-end page flow.ts configuration information 💻
    
    -   Open `frontend/wallet/services/flow.ts`.
        
    -   Replace the content after `//Mainnet` with the corresponding code in front. Here is an image to guide you:
        
        ![](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230328102925859.png)
        

Congratulations, you have completed everything in this tutorial! 🎉
