import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";
import { timeCalculation } from "../../utils/timeCalculation";

const Deadline = () => {

  const {contract, signer, deadline} = useContext(Web3Context)

  const [newDeadline, setNewDeadline] = useState('')
  const [timerQuote, setTimerQuote] = useState('')

  useEffect(() => {
    setTimerQuote(timeCalculation(Date.now(), (deadline * 1000)))
  }, [deadline])

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(newDeadline)

    const newDate = new Date(newDeadline)
    console.log(newDate)

    const newDateInMilliseconds = newDate.getTime()
    console.log(newDateInMilliseconds)

    console.log(new Date(newDateInMilliseconds))
  }

  return (
    <>
      {signer && (
        <div>
          <div>{timerQuote}</div>
          <div>Manage deadline</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="newDeadline">Set new deadline</label>
            <input
              name="newDeadline"
              type="datetime-local"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              placeholder="Enter new deadline"
            />
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
