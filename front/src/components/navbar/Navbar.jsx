import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./navbar.css"
import {Link, Navigate, useNavigate} from "react-router-dom"
import axios from "axios"
const Navbar = () => {

  const {user, dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const LogOutUser = async (e) => {
    try {
        await axios.post('/auth/logout')
        localStorage.removeItem('user')
        dispatch({ type:"USER_LOGOUT" })
        window.location.reload(); // weird
        //navigate("/")
    } catch (error) {
        console.log(error)
      }
  }

  const LoginClick = ()=>{
    navigate("/login")
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to ="/" style={{color:"inherit", textDecoration:"none"}}>
          <span className="logo">RoyBooking</span>
        </Link>
        {user ? 
            (<div>
              {user.username}
              <button className="logout-button" onClick={LogOutUser}>Log Out</button>
            </div>)
          : (<div className="navItems">
              <button className="navButton">Register</button>
              <button className="navButton" onClick={LoginClick}>Login</button>
            </div>)}
      </div>
    </div>
  )
}

export default Navbar