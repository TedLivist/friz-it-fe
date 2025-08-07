import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";
import { ethers } from "ethers";

const Withdrawal = () => {
  const { signer, contract, ethBalance, USDCBalance, recipient } = useContext(Web3Context)

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
      if (!contract.runner) {
        console.error("Invalid signer!")
      }

      const tx = await contract.withdrawBalance()

      console.log(tx.hash)
      console.log(tx)
    } catch (e) {
      console.error(e.reason)
      setError(e.reason)
    }
  }

  return (
    <>
      {signer && (
        <div>
          Withdraw Funds
          Withdraw the ETH and USDC to the recipient address
          {USDCBalance && (
            <div>
              <div>{ethers.formatEther(ethBalance.toString())} ETH</div>
              <div>{ethers.formatUnits(USDCBalance, 6)} USDC</div>
            </div>
          )}
          <div>Recipient address<br/>{recipient}</div>

          {(error) && (
            <p className="error-message">{error}</p>
          )}
          <form onSubmit={handleWithdrawal}>
            <button type="submit">Withdraw funds</button>
          </form>

          <div>
            Only the owner can withdraw the balance<br/>
            Triggering a withdrawal transfers the balance to the declared recipient<br />
            Gas fees apply for this action
          </div>
        </div>
      )}
    </>
  );
}
 
export default Withdrawal;