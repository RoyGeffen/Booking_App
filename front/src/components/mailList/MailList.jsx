import "./mailList.css"
import { useState } from "react";

const MailList = () => {
  const [mail, setMail] = useState("");

  const onInput = (e) => setMail(e.target.value);
  const onclick = () => {
    setMail("")
  }

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" onInput={onInput} value={mail}/>
        <button onClick={onclick}>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList