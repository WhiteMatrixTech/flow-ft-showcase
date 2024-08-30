# Fungible-Token on Flow - ShowCase 

> 注意：本教程仅作为教学使用，部署到生产环境时还需要进行严格的代码审计。

这是一份指南，教您如何使用 ChainIDE、Cadence 和 React 在 Flow 上创建全栈的 FT Mint 页面

如果你有任何问题，请加入我们的 [ChainIDE Discord](https://discord.gg/QpGq4hjWrh)

这份教程将分为以下几个步骤：

1. 使用 Flow 钱包并获取测试币

2. 部署 NFT 智能合约

3. 部署前端页面

4. 在主网上部署


### 1 使用 Flow 钱包并获取测试币

当我们在区块链上部署一个智能合约或对已部署的智能合约进行交互时，我们需要一个 Flow 的钱包，FLow 的钱包有许多种(Blocto,Lilico,Flipper等)，在此，我们选择 Blocto

在 ChainIDE Flow 编程页面右侧，选择 Testnet，然后点击 Autheniticate

![image-20230312205320888](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230312205320888.png)

选择 Flow Wallet

![image](https://github.com/user-attachments/assets/4a290ede-2c93-4126-a57f-9eb3234f72fc)


点击复制钱包地址

![image-20230312205623790](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230312205623790.png)

进入 [Flow Faucet](https://testnet-faucet.onflow.org/fund-account) ，粘贴地址，默认选择FLOW，完成 hCaptcha 认证后，点击 FUND YOUR ACCOUNT

![image-20230312205910626](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230312205910626.png)

这样我们就获得1000个 Flow 测试币了

![image-20230312205948828](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230312205948828.png)

### 2 部署 FT 智能合约

我们的 FT 智能合约是基于[Flow Fungible Token Standard]( https://github.com/onflow/flow-ft)

进入`contracts`文件夹，打开`TestCoin.cdc`
![image-20230313174348129](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313174348129.png)

```js
import FungibleToken from 0x9a0766d93b6608b7
import MetadataViews from 0x631e88ae7f1d7c20
import FungibleTokenMetadataViews from 0x9a0766d93b6608b7
```

`NonFungibleToken`和`MetadataViews`已经部署在各种网络上。你可以从这些地址将它们导入你的合约中，无需自己部署它们。你可以在[Fungible Token Contract | Flow Blockchain](https://developers.flow.com/flow/core-contracts/fungible-token)找到所有信息

在111-135行可以修改代币的信息，例如名称、图片、详情等

![image-20230313174832421](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313174832421.png)

切换到`Deploy & Interacttion`面板，部署 TestCoin 合约。

![image-20230313175641804](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313175641804.png)

打开`TestCoinMinter.cdc`

![image-20230313175746229](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313175746229.png)

修改`TestCoin`合约的导入地址为当前登录的账户地址，可以在`init`函数中修改代币的最大供应量和价格

![image-20230313180007297](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180007297.png)

在右侧面板点击`Deploy`部署合约

![image-20230313180046294](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180046294.png)

### 3 部署前端页面
修改`frontend/config.ts`里面的参数，如果合约名没有做修改，只需要修改`deployer`地址即可, 将 deployer 修改为你的钱包地址
![image-20230313180548039](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180548039.png)

打开`Sandbox` `Flow (Ubuntu)` ，执行

```bash
cd frontend  
yarn  
yarn start
```

![image-20230313180621678](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180621678.png)

![image-20230313180746507](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313180746507.png)

![image-20230313181454982](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181454982.png)

打开左边端口转发面板，选择`Flow (Ubuntu)`镜像， Protocol： HTTP，输入端口号3000，点击`Add`

![image](https://github.com/user-attachments/assets/d5ab700a-4c9f-41ab-9e63-e54f45c248b5)


添加成功后，表格里会多一条3000端口的记录，点击图示按钮，用浏览器打开

![image](https://github.com/user-attachments/assets/046cdf07-8027-4c7a-b35f-4be1603ad7de)


浏览器会打开如下页面
![image-20230313181617743](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181617743.png)

钱包登录成功后可以看到价格和供应量从合约中读取成功.
![image-20230313181705599](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181705599.png)

点击执行`Mint`，如果钱包`Flow`余额不足，可以从 [FLow Faucet](https://testnet-faucet-v2.onflow.org/fund-account) 中获取 Flow 测试代币。
![image-20230313181748886](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181748886.png)

`Mint`过后，在右上角可以看到你的 TestCoin 数值发生变化
![image-20230313181812423](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230313181812423.png)

### 4 在主网上部署

如果你想把 FT 和网页部署在主网上，你需要按照测试网的教程再走一遍，并对以下部分进行修改

#### 1 连接主网

![image-20230328100730940](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230328100730940.png)

#### 2 替换智能合约 import contract 的地址为主网地址

打开 `cadences/contracts`

![image-20230328105642197](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230328105642197.png)

![image-20230328110053414](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230328110053414.png)

#### 3 替换前端页面 flow.ts 配置信息

打开 `frontend/wallet/services/flow.ts`

将 //Mainnet 后的内容替换到前方对应的代码中

![image-20230328102925859](https://d3gvnlbntpm4ho.cloudfront.net/Fungible-Token_on_Flow/flow-ft.assets/image-20230328102925859.png)

这样你就可以在主网上发行 FT 了
恭喜，你已经完成了本教程的所有内容！
