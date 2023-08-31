import {useState,useEffect} from "react";
import {ethers} from "ethers";
import crypto_making_tree_abi from "../artifacts/contracts/wallet.sol/wallet.json";

export default function Homepage() {

    const [meMessage,setMeMessage] = useState("Ethers");
    const [defaultAccount,setDefaultAccount] = useState(undefined);
    const [balance,setBalance] = useState(undefined);
    const [ethWallet,setEthWallet] = useState(undefined); 
    const [wallet,setwallet] = useState(undefined); // it is the atm
    const [redeemedAmount, setRedeemedAmount] = useState(0);
    
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const smcABI = crypto_making_tree_abi.abi;

    const getBalance = async() => {
        if(wallet) {
            setBalance( (await wallet.getBalance()).toNumber());
        }
    }

    const deposit = async() => {
        if(wallet) {
            let tx = await wallet.Deposite(1);
            await tx.wait();
            getBalance();
        }
    }

    const withdraw = async() => {
        if (wallet) {
            let tx = await wallet.Withdraw(1);
            await tx.wait();
            getBalance();
        }
    }

    const getWallet = async() => {
        
        if(window.ethereum){
            setEthWallet(window.ethereum);
            console.log("getwallet is executed");
        }
        

        if(ethWallet){
            const account = await ethWallet.request({method: "eth_accounts"});
            accountHandler(account);
        }
    }

    const accountHandler = async(accounts) => {
        if(accounts){
            console.log("Account connected =",accounts);
            setDefaultAccount(accounts);
        }
        else {
            console.log("No Account Found");
        }
    }

    const connectWallettHandler = async() => {
        if(!ethWallet){
            alert("MetaMask Wallet is required to Connect");
            return;
        }
        

        const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });

        accountHandler(accounts);

        getMyContract();
    }
    
    const getMyContract = async() => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, smcABI, signer);

        setwallet(contract);
    }

    const redeem = async () => {
        try {
          if (wallet) {
            let tx = await wallet.Redeem();
            await tx.wait();
            setRedeemedAmount(balance); // Set the redeemed amount to the current balance
            getBalance(); // Refresh the balance after redemption
          }
        } catch (error) {
          console.error("Error while redeeming:", error.message);
        }
      };

    const initUser = () => {
        if(!ethWallet){
            return <p>Please Install the MetaMask extension in your Browser</p>;
        }

        if(!defaultAccount){
            return (<button onClick={connectWallettHandler}>Activate Wallet Functionality for Ethereum Contracts</button>)
        }

        getBalance();

        return (
            <div>
                <h3 style={{ color: 'white' , background: 'pink' }}>Your Account : {defaultAccount}</h3>
               <p style={{ color: 'white' , background: 'green'}}>Your Balance : {balance}</p>
               <h3><button onClick={deposit} style={{ color: 'white', background: 'blue' }}>Allocate 1 ETH</button></h3>
               <h3><button onClick={withdraw} style={{ color: 'white', background: 'red' }}>Extract 1 ETH</button></h3>
               <h3><button onClick={redeem} style={{ color: 'white', background: 'purple' }}>Claim</button></h3>
               <p style={{ color: 'white',background: 'purple' }}>Claimed Amount : {redeemedAmount}</p> {/* Display the redeemed amount */}
            </div>
        )
    }

    useEffect(() => {getWallet();}, []);

    return (
      <main className="container">
        <header><h1>Elevate Your Banking Experience at Akanksha's Metacrafters ATM</h1></header>
        <h2>{meMessage}</h2>
        {initUser()}
        <style jsx>{`
            *{
                margin: 0;
                padding: 0;
            }
          .container {
            width: 1500px;
            height: 800px;
            background-image: url("https://media.istockphoto.com/id/957728570/vector/the-connection-cube-with-abstract-geometric-polygonal-with-connecting-dots-and-lines-abstract.jpg?s=612x612&w=0&k=20&c=xYCjWjOY3XSNnEHk8Tilge5Li4cqMIvdnvcv7apVf1E=");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            width: 100vw;
            height: 100vh;
            text-align: center;
            color: blue;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            color: white;
          }
        `}
        </style>
      </main>
    )    
}