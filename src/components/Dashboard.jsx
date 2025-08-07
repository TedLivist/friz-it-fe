import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";
import { ethers } from "ethers";
import { contractAddress } from "../../utils/contractDetails";
import { tokenABI, tokenAddress, tokenThinABI } from "../../utils/usdcTokenDetails";
import { timeCalculation } from "../../utils/timeCalculation";

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_SEPOLIA_URL)

const Dashboard = () => {
  const { contract, signer, deadline } = useContext(Web3Context)

  const [ethBalance, setEthBalance] = useState(null)
  const [USDCBalance, setUSDCBalance] = useState(null)
  const [recipient, setRecipient] = useState(null)
  const [owner, setOwner] = useState(null)
  const [token, setToken] = useState(null)
  const [timerQuote, setTimerQuote] = useState('')

  useEffect(() => {
    if (!signer) return

    const initializeVariables = async () => {
      setEthBalance(Number(await provider.getBalance(contractAddress)))
      
      const newToken = await contract.token() // fetch the string address of the ERC20 token used in the contract
      const initToken = new ethers.Contract(newToken, tokenThinABI, signer)
      setToken(initToken)
      setUSDCBalance(Number(await initToken.balanceOf(await contract.getAddress())))

      const initRecipient = await contract.recipientAddress()
      setRecipient(initRecipient)

      const initOwner = await contract.owner()
      setOwner(initOwner)

      // const networkName = await provider.getNetwork()
      // console.log(networkName.name)
    }

    initializeVariables()
  }, [signer])

  useEffect(() => {
    if(!deadline) return

    const deadlineInMilliseconds = deadline * 1000

    const updateTimerQuote = () => {
      const dateNow = Date.now()
      const timeQuote = timeCalculation(dateNow, deadlineInMilliseconds)
      setTimerQuote(timeQuote)
    }

    updateTimerQuote()
    const interval = setInterval(updateTimerQuote, 10000)

    return () => clearInterval(interval)
  }, [deadline])

  return (
    <>
      {signer && (
        <div>
          Hahaha. Home
          <div>ETH Balance | {ethBalance}</div>
          <div>USDC Balance | {USDCBalance}</div>
          <div>Deadline timer | {timerQuote}</div>
          <div>Owner | {owner}</div>
          <div>Recipient address | {recipient}</div>
          {/* {console.log(USDCBalance)} */}
        </div>
      )}
    </>
  );
}
 
export default Dashboard;