import { createContext, useEffect, useMemo, useState } from 'react'
import './App.css'

import Navbar from './components/Navbar';

import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/contractDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountIndicator from './components/AccountIndicator';
import Dashboard from './components/Dashboard';
import Deadline from './components/Deadline';
import { tokenABI, tokenAddress, tokenThinABI } from "../utils/usdcTokenDetails";
import Withdrawal from './components/Withdrawal';

export const Web3Context = createContext()
const provider = new ethers.BrowserProvider(window.ethereum);

function App() {
  const [signer, setSigner] = useState("")
  const [contract, setContract] = useState("")
  const [deadline, setDeadline] = useState(null)
  const [ethBalance, setEthBalance] = useState(null)
  const [USDCBalance, setUSDCBalance] = useState(null)
  const [recipient, setRecipient] = useState(null)
  const [token, setToken] = useState(null)

  const connectWallet = async () => {
    await provider.send("eth_requestAccounts", []);

    const initSigner = await provider.getSigner();
    setSigner(initSigner)
    const initContract = new ethers.Contract(contractAddress, contractABI, initSigner);
    setContract(initContract)
    const initDeadline = await initContract.deadline()
    setDeadline(Number(initDeadline))
    
    setEthBalance(await provider.getBalance(contractAddress))

    const newToken = await initContract.token() // fetch the string address of the ERC20 token used in the contract
    const initToken = new ethers.Contract(newToken, tokenThinABI, initSigner)
    setToken(initToken)
    setUSDCBalance(await initToken.balanceOf(await initContract.getAddress()))

    const initRecipient = await initContract.recipientAddress()
    setRecipient(initRecipient)

    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if (chainId !== '0xaa36a7') { // Sepolia's chainId
      await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }]
      })
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])

  // listen for wallet changes and update signer
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
          setSigner(null);
        } else {
          // reconstruct the contract too after changing the signer
          // so that errors do not carry over to the new signer
          const initSigner = await provider.getSigner();
          setSigner(initSigner)
          setContract(new ethers.Contract(contractAddress, contractABI, initSigner));
        }
      };

      // Add event listener for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup listener on component unmount
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const disconnectWallet = () => {
    setContract("")
    setSigner("")
  }

  const webContextValue = useMemo(() => 
    ({ contract, signer, deadline, ethBalance, USDCBalance, token, recipient, disconnectWallet, connectWallet }),
    [contract, signer, deadline, ethBalance, USDCBalance, token, recipient, disconnectWallet, connectWallet]
  )

  return (
    <Web3Context.Provider value={webContextValue}>
      <BrowserRouter>
        <Navbar />
        <AccountIndicator />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/manageDeadline" element={<Deadline />} />
          <Route exact path="/withdrawal" element={<Withdrawal />} />
        </Routes>
      </BrowserRouter>
    </Web3Context.Provider>
  )
}

export default App
