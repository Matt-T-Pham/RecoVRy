import React, { useState, useEffect } from 'react'
import Progress from './Progress'
import { List, ListSubheader, ListItem, ListItemText } from '@material-ui/core'
import CaretIcon from '../images/right_caret.png'
import { useStateValue } from '../state'

const getPatients = (username, setPatients) => {
    fetch(`${window.location.origin}/getpatientnames?user=${username}`)
    .then(response => {
        if(!response.ok) throw Error(response.statusText)
        response.json().then(json => setPatients(json))
    }).catch(console.log)
}

const TherapistProgress = () => {
    const [{username}, ] = useStateValue()
    const [patients, setPatients] = useState([])
    const [selectedId, setSelectedId] = useState()
    const [hoverId, setHoverId] = useState()
  
    useEffect(() => {
        getPatients(username, setPatients)
    }, [username])
  
    return (
    <div style={{display: 'flex', height: "100%"}}>
        <List
        style={{width: '100%', maxWidth: '260px', boxSizing: 'border-box', marginRight: '1rem'}}
        subheader={
            <ListSubheader component="div">Patients</ListSubheader>
        } className="Patients__list Patients__list--style">
            {patients.map((patient, i) =>
                <React.Fragment key={i} >
                    <ListItem button onMouseEnter={() => setHoverId(i)} onMouseLeave={() => setHoverId(null)} onClick={() => {console.log(patients[i].username); setSelectedId(i)}}>
                        <ListItemText primary={`${patient.firstName} ${patient.lastName}`} />
                        {hoverId === i ? <img src={CaretIcon} alt=">" height={16}/> : <></>}
                    </ListItem>
                </React.Fragment>)
            }
        </List>
        <Progress username={selectedId !== undefined ? patients[selectedId].username : ''} />
    </div>
    );
  }

  export default TherapistProgress;