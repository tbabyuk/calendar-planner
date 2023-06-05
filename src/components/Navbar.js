// styles
import "./Navbar.css"

import logo from "../assets/dcam-logo-white.png"


export const Navbar = () => {

  return (
    <div className="navbar">
        <div className="title">Monthly Planner</div>
        <img src={logo} alt="Da Capo Academy of Music logo" />
    </div>
  )
}