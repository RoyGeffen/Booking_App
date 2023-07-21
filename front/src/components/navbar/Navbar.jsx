import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./navbar.css"
import {Link, Navigate, useNavigate} from "react-router-dom"
import axios from "axios"
import DropDownList from "../dropDownList/dropDownList"
const Navbar = () => {

  const {user, dispatch} = useContext(AuthContext)



  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to ="/" style={{color:"inherit", textDecoration:"none"}}>
          <span className="logo">RoyBooking</span>
        </Link>

        <DropDownList />

      </div>
    </div>
  )
}

export default Navbar