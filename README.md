# Interact with Your Smart Contract through Front-end Practice Code
create a simple contract with 2-3 functions. Then show the values of those functions in frontend of the application. 

## Description
The files index.js, MySmartContract.sol, and deploy.js contain the necessary code to interact with the smart contract through a front-end interface..

## Executing the project
To run the project on your local machine, follow these steps:

Clone this repository or download the ZIP file and extract it.

Inside the project directory, open a terminal and run npm i.

Open two additional terminals in your preferred code editor.

In the second terminal, run npx hardhat node to start the local Ethereum node.

In the third terminal, run npx hardhat run --network localhost scripts/deploy.js to deploy the smart contract to the local network.

Back in the first terminal, run npm run dev to launch the front-end application.

After following these steps, the project will be running on your local host, typically at http://localhost:3000/ . Make sure you have MetaMask connected to the local network you set up in order to interact with the smart contract through the front-end interface.

## AUTHOR
Akanksha Teja
## License 
This project is licensed under the MIT License. See the LICENSE file for details.
