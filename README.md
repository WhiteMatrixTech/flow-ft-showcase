# Flow FT ShowCase

## 目标

基于`FLOW`发行一个`FT`模板项目，包含合约端和前端。

## 使用方法

### 合约部署

1、登录`ChainIDE`并且`Github`克隆项目 https://github.com/WhiteMatrixTech/flow-ft-showcase.git
![image](https://user-images.githubusercontent.com/66669483/221511983-208b4c78-3f7b-4736-ae4d-fdbdc0efa095.png)

2、打开克隆后的项目，打开右侧的的面板，登录`Testnet`
![image](https://user-images.githubusercontent.com/66669483/221512653-bce7b325-b95a-4222-83df-7f14789f1ac9.png)

3、切换到`Deploy & Interaction`面板，打开`TestCoin.cdc`，部署合约
![image](https://user-images.githubusercontent.com/66669483/221512934-c23005f2-fb6a-444c-9633-d75f1a1fd7cf.png)

在110-130行可以修改代币的信息，例如名称、图片、详情等
![image](https://user-images.githubusercontent.com/66669483/221513418-14679d8b-2600-493c-9e82-61a51e7fa5c1.png)


4、打开`TestCoinMinter.cdc`，修改`TestCoin`合约的导入地址为当前登录的账户地址，可以在`init`函数中修改代币的最大供应量和价格，在右侧面板点击`Deploy`部署合约
![image](https://user-images.githubusercontent.com/66669483/221514168-73f9518f-7ea9-408a-b7df-2d304a599ea5.png)

### 前端部署
1、修改`frontend/config.ts`里面的参数，如果合约名没有做修改，只需要修改`deployer`地址即可
![image](https://user-images.githubusercontent.com/66669483/221514820-9361e05f-2f25-469c-9c67-7c65b3516533.png)

2、打开`flow-cli` `terminal`，执行`cd frontend && npm install && npm start`
![image](https://user-images.githubusercontent.com/66669483/221506417-051364d8-ef7a-4c4e-819c-0917a55b773e.png)

![image](https://user-images.githubusercontent.com/66669483/221506529-ce4da4f2-43a1-4f83-a70a-06998876f489.png)

3、打开左边端口转发面板，选择`npm`镜像，选择`flow-cli`镜像，输入端口号3000，点击`Add`
![image](https://user-images.githubusercontent.com/66669483/221507031-167bc9af-e5a2-42d0-89c3-9d4e3dfe47b0.png)

4、添加成功后，表格里会多一条3000端口的记录，点击图示按钮，用浏览器打开

![image](https://user-images.githubusercontent.com/66669483/221507321-d17a7331-2f7b-46a5-8ccd-2f3ba3175ab5.png)

浏览器会打开如下页面
![image](https://user-images.githubusercontent.com/66669483/221515696-eadf4a76-cad5-4e8a-a6ca-5a4477e04fab.png)

5、由于前端实际上是在`terminal`环境内，因此只能使用`blocto`钱包登录，这里切换一个另一个钱包地址，登录成功后可以看到价格和供应量从合约中读取成功
![image](https://user-images.githubusercontent.com/66669483/221517374-05676136-3648-4042-b07e-2597d888fc73.png)

6、点击`BUY TC`执行`mint`，如果钱包`Flow`余额不足，可以从 https://testnet-faucet-v2.onflow.org/fund-account 中获取测试代币，`mint`过后，可以看到，剩余`NFT`数量和`Flow`代币的数值均有对应变化
![image](https://user-images.githubusercontent.com/66669483/221517634-93c77552-44bd-4b6d-b9d8-15ba376874c3.png)
