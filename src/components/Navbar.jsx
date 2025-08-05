import { NavLink } from "react-router-dom";
// import '../stylings/Navbar.css'
import { Web3Context } from "../App";
import { useContext } from "react";

const Navbar = () => {
  const { contract, signer, disconnectWallet, connectWallet } = useContext(Web3Context)

  return (
    <div className="navbar-wrapper">
      Friz It
      <NavLink to="/" className="nav-link">Homepage</NavLink>
      {/* <NavLink to="/transactions" className="nav-link">Transactions</NavLink> */}
      {signer.address && (
        <span className="nav-link">{signer.address.slice(0, 6)}...{signer.address.slice(-4)}</span>
      )}
      {!signer.address && (
        <button className="nav-link" onClick={connectWallet}>
          Connect
        </button>
      )}
      {contract && (
        <button className="nav-link" onClick={disconnectWallet}>
          Disconnect
        </button>
      )}
    </div>
  );
}
 
export default Navbar;