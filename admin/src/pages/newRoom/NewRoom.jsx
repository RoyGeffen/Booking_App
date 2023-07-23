import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelID, setHotelID] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const {data,loading,error} = useFetch("/hotels")

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e)=>{
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(room=> ({number: room}));
    try {
      const res = await axios.post(`/rooms/${hotelID}`, {...info, roomNumbers});
      console.log(res.status)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
                <div className="formInput">
                  <label>Choose a Hotel</label>
                  <select id="hotelID" onChange={e=>setHotelID(e.target.value)}>
                    {loading? "Loading, please wait": 
                      data && data.map(hotel=>(
                      <option value={hotel._id} key={hotel._id}>{hotel.name} {hotel._id}</option>
                    ))}
                  </select>
                </div>
                <div className="formInput">
                  <label>Rooms</label>
                  <textarea onChange={e=>setRooms(e.target.value)} placeholder="write room numbers with comma in between"></textarea>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
