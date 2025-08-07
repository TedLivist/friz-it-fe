import { useContext, useState } from "react";
import { Web3Context } from "../App";

const Deadline = () => {

  const {contract, signer, deadline} = useContext(Web3Context)

  const [newDeadline, setNewDeadline] = useState('')

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
      {console.log(signer.address)}
      {console.log(deadline)}
      Manage deadline
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
    </>
  );
}
 
export default Deadline;
