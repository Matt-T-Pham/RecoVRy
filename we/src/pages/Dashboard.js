import React, { useEffect, useState } from 'react';
import { useStateValue } from '../state'
import '../css/Dashboard.scss'
import Button from '@material-ui/core/Button'

const getDailyInspiration = (setDailyInspiration) => {
  fetch(`${window.location.origin}/dailyinspiration`)
  .then(response => {
      if(!response.ok) console.log(response.statusText)
      else response.json().then(setDailyInspiration)
  }).catch(console.log)
}

const Dashboard = () => {

  const [{ userFirstName, username }, ] = useStateValue()
  const [ dateString, setDateString ] = useState(new Date().toLocaleTimeString())
  const [ dailyInspiration, setDailyInspiration ] = useState({})

  useEffect(() => {
    setInterval(() => setDateString(new Date().toLocaleTimeString()), 1000)
    getDailyInspiration(setDailyInspiration)
  }, [])

  const startVR = () => {
    fetch(`${window.location.origin}/startvr`, {
      method: 'POST',
      body: JSON.stringify({"username": username}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <div className="Dashboard">
        <h1 className="Dashboard__header">
          Welcome back{userFirstName && `,\n ${userFirstName}`}!
        </h1>
        <div className="Dashboard__clock">{dateString}</div>
        <div className="Dashboard__display" style={{backgroundImage: `url(${dailyInspiration.imageUrl})`}}><h2>{dailyInspiration.quote}<br/><br/>{dailyInspiration.quoteAuthor}</h2></div>
        <Button id="Dashboard__button" variant="outlined" onClick={startVR}>Start VR Experience</Button>
    </div>
  );
}

export default Dashboard;
