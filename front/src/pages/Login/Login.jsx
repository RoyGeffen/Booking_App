import { useContext, useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import "./login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isLogin, setisLogin] = useState(true);
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const {loading, error, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange= (e)=>{
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data.user });
            navigate("/")
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data});
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("/auth/register", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data.user });
            navigate("/")
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data});
        }
    }

    return(
        <div className="body">
            <div className="lContainer">
                <h1 className="head">Login and Register</h1>
                <div id="formContainer">
                    {isLogin? 
                    (<div className = "loginFormContainer">
                    <h2 className="base">Login</h2>
                            <form id="loginForm">
                                <input 
                                    type="text"
                                    placeholder="username" 
                                    id="username" 
                                    onChange={handleChange} 
                                    className="lInput"
                                    required
                                    />
                                <input 
                                    type="password" 
                                    placeholder="password" 
                                    id="password" 
                                    onChange={handleChange} 
                                    className="lInput"
                                    required
                                    />
                                <button disabled={loading} onClick={handleLogin} className="lButton">
                                    Login
                                </button>
                                <p className="switchLink">Don't have an account? <span onClick={()=>setisLogin(false)} className="link">Register here.</span></p>
                            </form>
                        {error && <span className="error">{error.message}</span>}
                    </div>)
                    :
                    (
                    <div className = "registerFormContainer">
                    <h2 className="base">Register</h2>
                            <form id="registerForm">
                                <input 
                                    type="text"
                                    placeholder="username" 
                                    id="username" 
                                    onChange={handleChange} 
                                    className="lInput"
                                    required
                                    />
                                <input 
                                    type="password" 
                                    placeholder="password" 
                                    id="password" 
                                    onChange={handleChange} 
                                    className="lInput"
                                    required
                                    />
                                <input 
                                    type="text"
                                    placeholder="email" 
                                    id="email" 
                                    onChange={handleChange} 
                                    className="lInput"
                                    required
                                    />
                                <button disabled={loading} onClick={handleRegister} className="lButton">
                                    Register
                                </button>
                                <p className="switchLink">Already have an account? 
                                <span className="link" onClick={()=>setisLogin(true)}>Login here.</span></p>
                            </form>
                        {error && <span className="error">{error.message}</span>}
                    </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Login;
