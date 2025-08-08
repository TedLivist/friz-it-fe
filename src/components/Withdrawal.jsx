import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";
import { ethers } from "ethers";
import { useContract } from "../ContractContext";
import { simulateContract } from "wagmi/actions";
import { contractABI, contractAddress } from "../../utils/contractDetails";
import { useWriteContract } from "wagmi";
import { config } from "../../wagmi.config";

const Withdrawal = () => {
  const { isConnected, ethBalance, usdcBalance, recipient } = useContract()
  const { writeContract } = useWriteContract()
  
  const [error, setError] = useState("")

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleWithdrawal = async (e) => {
    e.preventDefault()
    
    try {
      // Simulate first, so that error is returned
      // before actual wallet popup for transaction signing
      // just like in ether.js
      await simulateContract(config, {
        address: contractAddress,
        abi: contractABI,
        functionName: 'withdrawBalance',
      })
      
      // If simulation passes, execute
      writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'withdrawBalance',
      })
    } catch (err) {
      setError(err?.cause.reason)
    }
  }

  return (
    <>
      {isConnected && (
        <div>
          Withdraw Funds
          Withdraw the ETH and USDC to the recipient address
          <div>
            <div>{ethBalance} ETH</div>
            <div>{usdcBalance} USDC</div>
          </div>
          <div>Recipient address<br/>{recipient}</div>

          {(error) && (
            <p className="error-message">{error}</p>
          )}
          <form onSubmit={handleWithdrawal}>
            <button type="submit">Withdraw funds</button>
          </form>

          <div>
            Triggering a withdrawal transfers the balance to the declared recipient<br />
            Only the owner can withdraw the balance<br/>
            Gas fees apply for this action
          </div>
        </div>
      )}
    </>
  );
}
 
export default Withdrawal;