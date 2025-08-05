import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";
import { ethers } from "ethers";
import { contractAddress } from "../../utils/contractDetails";
import { tokenABI, tokenAddress, tokenThinABI } from "../../utils/usdcTokenDetails";

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_SEPOLIA_URL)

const Dashboard = () => {
  const { contract, signer } = useContext(Web3Context)

  const [ethBalance, setEthBalance] = useState(null)
  const [USDCBalance, setUSDCBalance] = useState(null)
  const [deadline, setDeadline] = useState(null)
  const [recipient, setRecipient] = useState(null)
  const [owner, setOwner] = useState(null)
  const [deadlineAdjustments, setDeadlineAdjustments] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (!signer) return

    const initializeVariables = async () => {

      setEthBalance(await provider.getBalance(contractAddress))
      
      const newToken = await contract.token() // fetch the string address of the ERC20 token used in the contract
      const initToken = new ethers.Contract(newToken, tokenThinABI, signer)
      setToken(initToken)
      setUSDCBalance(await initToken.balanceOf(await contract.getAddress()))
      
      const initDeadline = await contract.deadline()
      setDeadline(Number(initDeadline))

      const initRecipient = await contract.recipientAddress()
      setRecipient(initRecipient)

      const initOwner = await contract.owner()
      setOwner(initOwner)
    }

    initializeVariables()
  }, [signer])


  return (
    <>
      {signer && (
        <div>
          Hahaha. Home
          {console.log(USDCBalance)}
        </div>
      )}
    </>
  );
}
 
export default Dashboard;