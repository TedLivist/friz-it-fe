import '../stylings/AccountIndicator.css'
import { Web3Context } from '../App';
import { useContext, useEffect, useState } from 'react';

const AccountIndicator = () => {
  const { contract, signer } = useContext(Web3Context)

  const [owner, setOwner] = useState(null)

  
  useEffect(() => {
    if (!contract) return

    const getOwner = async () => {
      setOwner(await contract.owner())
    }

    getOwner()
  })

  return (
    <>
      {signer && (
        <div className={`indicator-wrapper ${signer.address == owner ? 'green-bg' : 'red-bg'}`} />
      )}
    </>
  );
}
 
export default AccountIndicator;