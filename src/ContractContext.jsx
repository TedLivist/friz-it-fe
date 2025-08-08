import { createContext, useContext, useMemo } from "react";
import { useAccount, useBalance, useReadContract, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/contractDetails";
import { tokenThinABI } from "../utils/usdcTokenDetails";

const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
  const { isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()

  const { data: ethBalance } = useBalance({
    address: contractAddress,
    query: { enabled: isConnected }
  })

  const { data: tokenAddress } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'token',
    query: { enabled: isConnected }
  })

  const { data: recipient } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'recipientAddress',
    query: { enabled: isConnected }
  })

  const { data: owner } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'owner',
    query: { enabled: isConnected }
  })

  const { data: deadline } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'deadline',
    query: { enabled: isConnected }
  })

  const { data: usdcBalance } = useReadContract({
    address: tokenAddress,
    abi: tokenThinABI,
    functionName: 'balanceOf',
    args: [contractAddress],
    query: { enabled: isConnected && tokenAddress }
  })

  const signer = useMemo(() => {
    if (!walletClient) return null
    return walletClient
  }, [walletClient])

  const contract = useMemo(() => {
    if (!signer) return null
    return new ethers.Contract(contractAddress, contractABI, signer)
  }, [signer])

  const value = {
    ethBalance: ethBalance ? ethers.formatEther(ethBalance.value) : 0, // ethBalance?.formatted,
    usdcBalance: usdcBalance ? ethers.formatUnits(usdcBalance, 6) : 0,
    deadline: Number(deadline) || 0,
    recipient,
    owner,
    contract,
    signer,
    isConnected
  }

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  )
}

export const useContract = () => {
  const context = useContext(ContractContext)
  if (!context) throw new Error('useContract must be used within ContractProvider')
  return context
}