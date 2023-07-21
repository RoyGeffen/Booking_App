import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dropDownList.css"
import userImage from '../../images/userImage.png';
import edit from '../../images/edit.png';
import settings from '../../images/settings.png';
import logout from '../../images/log-out.png';
import register from '../../images/register.png';
import pfp from '../../images/pfp.jpg';


const DropDownList = ()=>{
    const navigate = useNavigate()
    const {user, loading, error, dispatch} = useContext(AuthContext)
    const [open, setOpen] = useState(false);

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

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }});

    function DropdownItem(props){
        return(
          <li onClick={props.onclick} className = 'dropdownItem'>
            <img src={props.img} alt=""></img>
            <a> {props.text} </a>
          </li>
        );
      }

    return(
        <div className="DropDownList">
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                    <img src= { (user&&user.pfp) ? pfp : userImage} alt="Profile"></img>
                </div>
            {user?
                (
                <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                    <h3>Menu<br/><span>User options</span></h3>
                        <ul>
                        <DropdownItem onclick={()=>(navigate("./profile"))} img = {edit} text = {"Edit Profile"}/>
                        <DropdownItem onclick={()=>(navigate("./settings"))} img = {settings} text = {"Settings"}/>
                        <DropdownItem onclick={LogOutUser} img = {logout} text = {"Logout"}/>
                        </ul>
                </div>
                )  
                : 
                (
                    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                        <h3>Menu<br/><span>User options</span></h3>
                            <ul>
                                <DropdownItem onclick={()=>(navigate("./login"))} img = {edit} text = {"login"}/>
                                <DropdownItem onclick={()=>(navigate("./register"))} img = {register} text = {"register"}/>
                                <DropdownItem onclick={()=>(navigate("./settings"))} img = {settings} text = {"Settings"}/>
                            </ul>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default DropDownList;

