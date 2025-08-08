import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";
import { ethers } from "ethers";
import { timeCalculation } from "../../utils/timeCalculation";
import { useContract } from "../ContractContext";

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_SEPOLIA_URL)

const Dashboard = () => {
  const { ethBalance, usdcBalance, deadline, owner, recipient, isConnected } = useContract()
  const [timerQuote, setTimerQuote] = useState('')
  
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

  // another form conditional rendering -
  // just ensure that all the useState and useEffect
  // declarations are done before it
  if (!isConnected) return null

  return (
    <>
      <div>Hahaha. Home</div>
      <div>ETH Balance | {ethBalance}</div>
      <div>USDC Balance | {usdcBalance}</div>
      <div>Deadline timer | {timerQuote}</div>
      <div>Owner | {owner}</div>
      <div>Recipient address | {recipient}</div>
    </>
  );
}
 
export default Dashboard;