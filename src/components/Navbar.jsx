import { NavLink } from "react-router-dom";
// import '../stylings/Navbar.css'
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Navbar = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    const injectConnector = connectors.find(c => c.id === 'injected')
    if(injectConnector) connect({ connector: injectConnector })
  }

  return (
    <div className="navbar-wrapper">
      Friz It
      <NavLink to="/" className="nav-link">Homepage</NavLink>
      <NavLink to="/manageDeadline" className="nav-link">Deadline</NavLink>
      <NavLink to="/withdrawal" className="nav-link">Withdrawal</NavLink>
      
      {isConnected && address && (
        <span className="nav-link">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      )}
      {!isConnected && (
        <button className="nav-link" onClick={handleConnect}>
          Connect
        </button>
      )}
      {isConnected && (
        <button className="nav-link" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
    </div>
  );
}
 
export default Navbar;