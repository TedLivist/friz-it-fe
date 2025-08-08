import { useEffect, useState } from "react";
import { timeCalculation } from "../../utils/timeCalculation";
import { useContract } from "../ContractContext";
import { contractABI, contractAddress } from "../../utils/contractDetails";
import { config } from "../../wagmi.config";
import { simulateContract } from "wagmi/actions";

const Deadline = () => {

  const { deadline, isConnected } = useContract()
  
  const [newDeadline, setNewDeadline] = useState('')
  const [timerQuote, setTimerQuote] = useState('')
  const [error, setError] = useState("")
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    setTimerQuote(timeCalculation(Date.now(), (deadline * 1000)))
  }, [deadline])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newDate = new Date(newDeadline)
    const newDateInMilliseconds = newDate.getTime()
    const newDateInSeconds = newDateInMilliseconds / 1000

    try {
      await simulateContract(config, {
        address: contractAddress,
        abi: contractABI,
        functionName: 'adjustDeadline',
        args: [newDateInSeconds]
      })

      writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'adjustDeadline',
        args: [newDateInSeconds]
      })
    } catch (e) {
      setError(e?.cause.reason)
    }
  }

  return (
    <>
      {isConnected && (
      <div>
        <div>Manage deadline</div>
        <div>{timerQuote}</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newDeadline">Set new deadline</label>
          <input
            name="newDeadline"
            type="datetime-local"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            placeholder="Enter new deadline"
          />

          {(error) && (
            <p className="error-message">{error}</p>
          )}
          <button type="submit">Set Deadline</button>
        </form>
        <div>
          And the newer deadline must be later than the existing deadline <br/>
          Only the owner can adjust the deadline <br/>
          Gas fees apply for this action
        </div>
      </div>
      )}
    </>
  );
}
 
export default Deadline;
