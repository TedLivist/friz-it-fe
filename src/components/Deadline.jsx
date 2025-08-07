import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";
import { timeCalculation } from "../../utils/timeCalculation";

const Deadline = () => {

  const {contract, signer, deadline} = useContext(Web3Context)

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

    console.log(newDeadline)

    const newDate = new Date(newDeadline)
    
    const newDateInMilliseconds = newDate.getTime()
    const newDateInSeconds = newDateInMilliseconds / 1000

    try {
      if (!contract.runner) {
        console.error("Invalid signer!")
      }

      const tx = await contract.adjustDeadline(newDateInSeconds)

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
            Only the owner can adjust the deadline <br/>
            And the newer deadline must be later than the existing deadline <br/>
            Gas fees apply for this action
          </div>
        </div>
      )}
    </>
  );
}
 
export default Deadline;
