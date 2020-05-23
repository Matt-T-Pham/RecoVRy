import React, { useState, useEffect } from 'react';
import '../css/Calendar.scss'
import '../css/Progress.scss'
import Calendar from 'react-calendar'

const today = new Date(Date.now())

const getRecord = (username, setRecord) => {
  fetch(`${window.location.origin}/getlogs?user=${username}`)
    .then(response => {
        if(!response.ok) console.log(response.statusText)
        else response.json().then(logs => {
            const record = {}
            logs.forEach(log => {
              const dateStr = new Date(log.date).toDateString()
              if(!record[dateStr]) record[dateStr] = []
              record[dateStr].push({name: log.name, score: log.score})
            })
            setRecord(record)
        })
    }).catch(console.log)
}

const getAssignments = (username, setAssignments) => {
  fetch(`${window.location.origin}/getassignments?user=${username}`)
  .then(response => {
      if(!response.ok) console.log(response.statusText)
      else response.json().then(assignments => {
        setAssignments(assignments.map(assignment => {return {...assignment, dateAssigned: new Date(assignment.date_assigned)}}))
          //setAssignedDays(assignments.reduce((prev, curr) => prev | parseInt(curr.schedule, 2), 0).toString(2).padStart(7, '0').split(''))
      })
  }).catch(console.log)
}

const mapScoreToClass = (dailyRecords) => {
  if(!dailyRecords) return 'noScore'
  const score = dailyRecords.reduce((prev, curr) => prev + curr.score, 0) / dailyRecords.length
  if(score < 1000) return 'goodScore'
  else if (score < 2000) return 'medScore'
  else return 'badScore'
}

const Progress = ({username}) => {
  console.log(`getting progress for patient ${username}`)
  // const testA = [{"name":"first workout!","schedule":"1110000","dateAssigned":new Date("2020-04-11T06:00:00.000Z")},{"name":"Lots of people do this workout","schedule":"0010110","dateAssigned":new Date("2020-04-13T06:00:00.000Z")}]
  const [record, setRecord] = useState({})
  const [assignments, setAssignments] = useState([]) //Should implement this later, would map workout names to schedules (binary arrays)
  //const [assignedDays, setAssignedDays] = useState([0,0,0,0,0,0,0])

  const hasAssignment = date => assignments.find(assignment => assignment.dateAssigned < date && assignment.schedule.charAt(date.getDay()) === '1')
  
  useEffect(() => {
    getRecord(username, setRecord)
    getAssignments(username, setAssignments)
  }, [username])

  return (
    <div className="Progress">
      <Calendar calendarType="US" className="Progress__calendar" tileClassName={ ({activeStartDate, date, view}) => view === 'month' && date <= today && hasAssignment(date) !== undefined ? mapScoreToClass(record[date.toDateString()]) : null } />
      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '1rem'}}>
        <h2>Legend</h2>
        <div className="Progress__legend">
          <div className='goodScore'>Good Score</div>
          <div className='medScore'>Mediocre Score</div>
          <div className='badScore'>Low Score</div>
          <div className='noScore'>No Workout Recorded</div>
          <div style={{backgroundColor: '#fef975'}}>Today</div>
        </div>
      </div>
    </div>
  );
}

export default Progress;