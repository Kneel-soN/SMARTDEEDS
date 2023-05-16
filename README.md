# SMARTDEEDS
I have used **Ganache** to test this smart contract if you don't have **Ganache**
you can install it with this link
: https://trufflesuite.com/ganache/

and you need to install **node.js** too:
https://nodejs.org/en
select the one based on your operating system


1) download the zip and extract it 
 

![download-zip](https://github.com/Kneel-soN/SMARTDEEDS/assets/125803337/6c5bc73a-a623-4315-a874-606dde8dfad0)

Use text editors like Visual Studio Code for easier installation of dependencies
2) In your termnial, to install the dependencies needed 
, do **npm install** 
 > or do **yarn install** if you prefer yarn to install the needed dependencies
-npm install web3
-npm install dotenv
-npm install solc

3) Make your own private key/s in your .env file
  
![PK](https://github.com/Kneel-soN/SMARTDEEDS/assets/125803337/2eb7b4de-3bcd-4c5b-94a9-b54eb3d58fc5)

4) Start your Ganache, in my testing i clicked Quickstart

![ganac](https://github.com/Kneel-soN/SMARTDEEDS/assets/125803337/e7065c6b-fc9a-4ec1-a9c2-b10fe2d51b55)

5)In your truffle.config.js somewhere line 67 there change your **port** and **network ID** according to your Ganache network


![same](https://github.com/Kneel-soN/SMARTDEEDS/assets/125803337/3d4aab22-15ba-4174-ad53-fe36485bd9b8)

6) Then in you Ganache Network copy any account address that you want to test with then go to **deploy.js**
![deploy](https://github.com/Kneel-soN/SMARTDEEDS/assets/125803337/5dbbb4a1-132e-4eed-8c6a-0a43ce98765e)

paste the address that you copied to in line 8
>const tester = "0x67B335873E3b99A3a5df97A80e91C87620F431c9";

7) Output should be something like this
![out](https://github.com/Kneel-soN/SMARTDEEDS/assets/125803337/a9d75a04-fc4e-42d1-a27f-ec85d21e1c31)




