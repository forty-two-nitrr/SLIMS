import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";
import "./LeftSide.css";
// import useWebSocket from 'react-use-websocket';

const LeftSide = ({ id }) => {
  // const [socketUrl, setSocketUrl] = useState("192.168.201.97");

  // const { sendMessage } = useWebSocket(socketUrl);

  // socket.on("connection", () => {
  //   console.log("connection established");
  // });
  const [details, setDetails] = useState(null);
  useEffect(() => {
    if (id === 0) return;
    axios
      .get("http://192.168.172.97:8000/tracker/lights/?id=" + id)
      .then((res) => {
        setDetails(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err.response));
  }, [id]);

  const formatTime = (time) => {
    if (parseInt(time / (24 * 60)) === 0)
      return `${parseInt(time / 60)} Hours ${parseInt(time % 60)} Minutes`;
    else
      return `${parseInt(time / (24 * 60))} Days ${parseInt(
        time % (24 * 60)
      )} Hours ${parseInt(time % 60)} Minutes`;
  };

  const changeTimeFormat = (powers) => {
    powers.forEach((power) => {
      let time = new Date(power.createdAt).toLocaleTimeString("it-IT");
      power.time = time;
    });
    console.log(powers);
    return powers;
  };

  return (
    <div className="light-container">
      {details && (
        <>
          <h3 className="light-title">Street Light Id : {details.id}</h3>
          <p> Pincode : {details.pincode}</p>
          <p>Status : {details.status ? "Working 😃" : "Faulty ☠️"}</p>
          <p>Up Time : {formatTime(details.uptime)}</p>
          <p>Power Consumed In Watts</p>
          <LineChart
            width={600}
            height={400}
            data={changeTimeFormat(details.power)}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            padding={{
              bottom: 10,
            }}
          >
            <Line type="monotone" dataKey="power" stroke="#8884d8" />
            {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" domain={[0, 50]} />
            <Legend />
            <Tooltip />
          </LineChart>
        </>
      )}
      {!details && (
        <div className="no-details">Click On The Marker To See The Data</div>
      )}
    </div>
  );
};

export default LeftSide;
