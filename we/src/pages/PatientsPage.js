import React, { useState, useEffect } from 'react'
import '../css/PatientsPage.scss'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import CaretIcon from '../images/right_caret.png'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import { useStateValue } from '../state'
import TrashIcon from '../images/trash.png'
import TransferIcon from '../images/transfer.png'
import PlusIcon from '../images/plus.png'
import MinusIcon from '../images/minus.png'
import UpCaretIcon from '../images/up-caret.png'
import DownCaretIcon from '../images/down-caret.png'
import ConfirmIcon from '../images/tick.png'
import CancelIcon from '../images/close.png'

const addUser = (therapistsUser, userData, patients, setPatients) => {
    fetch(`${window.location.origin}/adduser`, {
        method: 'PUT',
        body: JSON.stringify({therapistsUser: therapistsUser,
            username: userData.username, 
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            accessLevel: 'patient'}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(!response.ok) throw Error(response.statusText)
            
            setPatients(patients.concat({firstName: userData.firstName, lastName: userData.lastName, username: userData.username, workouts: []}))
        }).catch(console.log)
    }
    
const assignWorkout = (username, WID, workoutName, patients, setPatients, selectedDays) => {
    fetch(`${window.location.origin}/assignworkout`, {
        method: 'PUT',
        body: JSON.stringify({username: username, WID: WID, schedule: selectedDays.reduce((acc, n) => acc + (n ? '1' : '0'), '')}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if(!response.ok) throw Error(response.statusText)
        
        let changed = JSON.parse(JSON.stringify(patients))
        const userIdx = changed.findIndex(p => p.username === username)
        changed[userIdx]["workouts"] = changed[userIdx]["workouts"].concat({id: WID, name: workoutName})
        setPatients(changed)
    }).catch(console.log)
}

const removeWorkoutAssignment = (username, WID, patients, setPatients) => {
    fetch(`${window.location.origin}/removeassignedworkout?user=${username}&WID=${WID}`, {
        method: 'DELETE'
    }).then((response) => {
        if(!response.ok) throw Error(response.statusText)
        
        let changed = JSON.parse(JSON.stringify(patients))
        const userIdx = changed.findIndex(p => p.username === username)
        changed[userIdx].workouts.splice(changed[userIdx].workouts.findIndex(w => w.id === WID), 1)
        setPatients(changed)
    }).catch(console.log)
}

const addExerciseToWorkout = (i, exercises, setExercises, selectedExercises, setSelectedExercises, builtWorkout, setBuiltWorkout) =>  {
    const addedExercise = exercises.splice(i, 1)
    setSelectedExercises(selectedExercises.concat(addedExercise))
    setExercises(Object.assign([], exercises))
    builtWorkout.exercises.push({...addedExercise[0], reps: 1});
    setBuiltWorkout(Object.assign({}, builtWorkout))
}

const removeExerciseFromWorkout = (i, exercises, setExercises, selectedExercises, setSelectedExercises, builtWorkout, setBuiltWorkout) =>  {
    const removedExercise = selectedExercises.splice(i, 1)
    setExercises(exercises.concat(removedExercise))
    setSelectedExercises(Object.assign([], selectedExercises))
    builtWorkout.exercises.splice(i, 1);
    setBuiltWorkout(Object.assign({}, builtWorkout))
}

const saveNewWorkout = (username, newWorkout, workouts, setWorkouts, setWorkoutModalOpen) => {
    fetch(`${window.location.origin}/addnewworkout?user=${username}`, {
        method: 'PUT',
        body: JSON.stringify(newWorkout),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if(!response.ok) throw Error(response.statusText)
        setWorkoutModalOpen(false)
        response.json().then((json) => { setWorkouts(workouts.concat(json)) })
    }).catch(console.log)
}

const deletePatient = (idx, patients, setPatients) => {
    fetch(`${window.location.origin}/deleteuser?user=${patients[idx].username}`, {method: 'DELETE'})
    .then((response) => {
        if(!response.ok) throw Error(response.statusText)

        const changed = Object.assign([], patients)
        changed.splice(idx, 1)
        console.log(changed)
        setPatients(changed)
    }).catch(console.log)
}

const getPatients = (username, setPatients) => {
    fetch(`${window.location.origin}/getpatients?user=${username}`)
    .then((response) => {
        if(!response.ok) throw Error(response.statusText)
        console.log(response)
        response.json().then((json) => { setPatients(json) })
    }).catch(console.log)
}

const getWorkouts = (username, setWorkouts) => {
    fetch(`${window.location.origin}/getcreatedworkouts?user=${username}`)
    .then((response) => {
        if(!response.ok) throw Error(response.statusText)
        console.log(response)
        response.json().then((json) => { setWorkouts(json) })
    }).catch(console.log)
}

const getExercises = (username, setExercises) => {
    fetch(`${window.location.origin}/getcreatedexercises?user=${username}`)
    .then((response) => {
        if(!response.ok) throw Error(response.statusText)
        console.log(response)
        response.json().then((json) => { setExercises(json) })
    }).catch(console.log)
}

const Patients = () => {
    // const tempW = [{"id":1,"name":"first workout!"},{"id":2,"name":"A test workout"},{"id":3,"name":"Another test workout"},{"id":4,"name":"Lots of people do this workout"},{"id":5,"name":"So much abs"},{"id":6,"name":"Such many biceps"}]
    // const tempP = [{"firstName":"jane","lastName":"joe","username":"joeie","workouts":[{"id":1,"name":"first workout!"},{"id":6,"name":"Such many biceps"}]},{"firstName":"john","lastName":"joe","username":"johnnny","workouts":[{"id":1,"name":"first workout!"}]},{"firstName":"zack","lastName":"mulhstein","username":"zackky","workouts":[{"id":1,"name":"first workout!"},{"id":2,"name":"A test workout"},{"id":3,"name":"Another test workout"}]},{"firstName":"Last","lastName":"One","username":"hoping","workouts":[{"id":1,"name":"first workout!"},{"id":3,"name":"Another test workout"},{"id":4,"name":"Lots of people do this workout"},{"id":6,"name":"Such many biceps"}]}]
    // const tempE = [{"id":1,"name":"Curls: Bicep Curls"},{"id":2,"name":"Squat:Air Squat"},{"id":3,"name":"Squat:Back Squat"},{"id":4,"name":"High Pull:Sumo High Pull"},{"id":5,"name":"squat"}]
    
    const [{ username }, ] = useStateValue()
    const [hoverId, setHoverId] = useState()
    const [selectedId, setSelectedId] = useState()
    const [newUserData, setNewUserData] = useState({})
    const [patientModalOpen, setPatientModalOpen] = useState(false)
    const [workoutModalOpen, setWorkoutModalOpen] = useState(false)
    const [patients, setPatients] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [exercises, setExercises] = useState([])
    const [selectedExercises, setSelectedExercises] = useState([])
    const [selectedWorkout, setSelectedWorkout] = useState()
    const [selectedDays, setSelectedDays] = useState(Array(7).fill(false))
    const [builtWorkout, setBuiltWorkout] = useState({name: '', exercises: []})
    
    useEffect(() => {
        getPatients(username, setPatients)
        getWorkouts(username, setWorkouts)
        getExercises(username, setExercises)
    }, [username])

    return (
    <div style={{display: 'flex', height: "100%"}}>
        <div className="Patients__list">
            <List
            subheader={
                <ListSubheader component="div">Patients</ListSubheader>
            } className="Patients__list--style">
                {patients.map((data, i) =>
                    <React.Fragment key={i} >
                        <ListItem button onMouseEnter={() => setHoverId(i)} onMouseLeave={() => setHoverId(null)} onClick={() => {setSelectedId(i); setSelectedWorkout(undefined)}}>
                            <ListItemText primary={`${data.firstName} ${data.lastName}`} />
                    {hoverId === i ? <img src={CaretIcon} alt=">" height={16}/> : <></>}
                        </ListItem>
                    </React.Fragment>)
                }
            </List>
            <Button variant="contained" onClick={() => setPatientModalOpen(true)}>New Patient</Button>
        </div>
        <div className="Patients__window">
            {selectedId !== undefined && 
            (<>
                <div className="Patients__window__header">
                    <h2 style={{marginLeft: "1rem"}}>{patients[selectedId].firstName} {patients[selectedId].lastName}</h2>
                    <img src={TransferIcon} alt="Transfer" />
                    <img src={TrashIcon} alt="Remove" onClick={() => {setSelectedId(undefined); deletePatient(selectedId, patients, setPatients)}}/>
                </div>
                <div className="Patients__window__workouts">
                    <List subheader={ <ListSubheader>Prescribed Workouts</ListSubheader> } className="Patients__window__workouts__list">
                        {patients[selectedId].workouts.map((data, i) =>
                        <React.Fragment key={i} >
                            <ListItem button onClick={() => removeWorkoutAssignment(patients[selectedId].username, patients[selectedId].workouts[i].id, patients, setPatients)}>
                                <ListItemText primary={data.name} />
                                <img src={MinusIcon} alt="-" />
                            </ListItem>
                        </React.Fragment>)
                        }
                    </List>
                    <div id="Available-Workouts" className="Patients__window__workouts__list">
                        <List subheader={ <ListSubheader>Available Workouts</ListSubheader> } >
                            {workouts.filter(w1 => !patients[selectedId].workouts.some(w2 => w1.id === w2.id)).map((data, i) =>
                            <React.Fragment key={i} >
                                { i !== selectedWorkout ?
                                    <ListItem button onClick={() => setSelectedWorkout(i)}>
                                        <img src={PlusIcon} alt="+" style={{marginRight: '1.5rem'}}/>
                                        <ListItemText primary={data.name} />
                                    </ListItem>
                                    :
                                    <ListItem style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '48px', backgroundColor: 'rgba(0,0,0,.08)'}}>
                                        {['S','M','T','W','T','F','S'].map((day, i) => <span className='Patients__window__workouts__list__day' style={{backgroundColor: selectedDays[i] ? 'rgba(0,0,0,.2)' : 'transparent'}} onClick={() => {const daysCopy = [...selectedDays]; daysCopy[i] = !daysCopy[i]; setSelectedDays(daysCopy)}}>{day}</span>)}
                                        <img src={CancelIcon} height={16} alt='Cancel' onClick={() => {setSelectedWorkout(undefined); setSelectedDays(Array(7).fill(false))}}/>
                                        <img src={ConfirmIcon} height={16} alt='Confirm' onClick={() => {
                                            assignWorkout(patients[selectedId].username, workouts.filter(w1 => !patients[selectedId].workouts.some(w2 => w1.id === w2.id))[i].id, workouts.filter(w1 => !patients[selectedId].workouts.some(w2 => w1.id === w2.id))[i].name, patients, setPatients, selectedDays)
                                            setSelectedDays(Array(7).fill(false))
                                            setSelectedWorkout(undefined)
                                        }}/>
                                    </ListItem>
                                }
                            </React.Fragment>)
                            }
                        </List>
                        <Button id="Create-Workout-Button" variant="outlined" onClick={() => setWorkoutModalOpen(true)} fullWidth>Create Workout</Button>
                    </div>
                </div>
            </>)
            }
        </div>
        <Modal open={patientModalOpen} 
        onClose={() => setPatientModalOpen(false)}> 
            <div className="Modal">
                <h2 style={{marginLeft: "1rem"}}>NEW PATIENT</h2>
                <form noValidate autoComplete="off" className="Patients__modal__form">
                    <TextField id="outlined-basic" onChange={(e) => setNewUserData({...newUserData, firstName: e.target.value})} 
                        label="First Name" variant="outlined" style={{margin: "1rem", gridArea: "a"}}/>
                    <TextField id="outlined-basic" onChange={(e) => setNewUserData({...newUserData, lastName: e.target.value})} 
                        label="Last Name" variant="outlined" style={{margin: "1rem", gridArea: "b"}}/>
                    <TextField id="outlined-basic" onChange={(e) => setNewUserData({...newUserData, email : e.target.value})}  
                        label="Email" variant="outlined" style={{margin: "1rem", gridArea: "c"}}/>
                    <TextField id="outlined-basic" onChange={(e) => setNewUserData({...newUserData, phoneNumber : e.target.value})}  
                        label="Phone Number" variant="outlined" style={{margin: "1rem", gridArea: "d"}}/>
                    <TextField id="outlined-basic" onChange={(e) => setNewUserData({...newUserData, address : e.target.value})}  
                        label="Address" variant="outlined" style={{margin: "1rem", gridArea: "e"}}/>
                    <TextField id="outlined-basic" onChange={(e) => setNewUserData({...newUserData, username : e.target.value})}  
                        label="Username" variant="outlined" style={{margin: "1rem", gridArea: "f"}}/>
                    <TextField id="outlined-basic" onChange={(e) => setNewUserData({...newUserData, password: e.target.value})}  
                        label="Password" type="password" variant="outlined" style={{margin: "1rem", gridArea: "g"}}/>
                    <Button variant="outlined" style={{margin: "1rem", gridArea: "h"}} 
                        onClick={() => {addUser(username, newUserData, patients, setPatients); setPatientModalOpen(false)}}>ADD PATIENT</Button>
                </form>
            </div>
        </Modal>
        <Modal open={workoutModalOpen} 
        onClose={() => setWorkoutModalOpen(false)}> 
            <div className="Modal" id="WorkoutBuilderModal">
                <h2 style={{marginLeft: "1rem"}}>BUILD NEW WORKOUT</h2>
                <div className="WorkoutBuilder">
                    <List subheader={ <ListSubheader>Available Exercises</ListSubheader> } className="WorkoutBuilder__available">
                        {exercises.map((data, i) =>
                        <React.Fragment key={i} >
                            <ListItem button onClick={() => addExerciseToWorkout(i, exercises, setExercises, selectedExercises, setSelectedExercises, builtWorkout, setBuiltWorkout)}>
                                <ListItemText primary={data.name} />
                                <img src={PlusIcon} alt="+" />
                            </ListItem>
                        </React.Fragment>)
                        }
                    </List>
                    <List subheader={ <ListSubheader>Selected Exercises<span style={{float: 'right'}}>Reps</span></ListSubheader> } className="WorkoutBuilder__selected">
                        {selectedExercises.map((data, i) =>
                        <React.Fragment key={i} >
                            <ListItem>
                                <img src={MinusIcon} alt="-" style={{margin: '-.5rem 1rem -.5rem -.5rem', padding: '.5rem'}} onClick={() => removeExerciseFromWorkout(i, exercises, setExercises, selectedExercises, setSelectedExercises, builtWorkout, setBuiltWorkout)}/>
                                    <ListItemText primary={data.name} />
                                <div className="WorkoutBuilder__selected--reps"><span style={{marginRight: '.5rem'}}>{builtWorkout.exercises[i].reps}</span>
                                    <div className="WorkoutBuilder__selected__carets">
                                        <img src={UpCaretIcon} height={8} alt="^" onClick={() => {builtWorkout.exercises[i].reps++; setBuiltWorkout(Object.assign({}, builtWorkout))}} />
                                        <img src={DownCaretIcon} height={8} alt="v" onClick={() => { if(builtWorkout.exercises[i].reps > 1) { builtWorkout.exercises[i].reps--; setBuiltWorkout(Object.assign({}, builtWorkout))}}} />
                                    </div>
                                </div>
                            </ListItem>
                        </React.Fragment>)
                        }
                    </List>
                </div>
                <div id="Workout-Confirmation-div">
                    <TextField label="Workout Name" onChange={e => {builtWorkout.name = e.target.value; setBuiltWorkout(Object.assign({}, builtWorkout))}} fullWidth />
                    <img src={ConfirmIcon} alt="Confirm" height={24} onClick={() => saveNewWorkout(username, builtWorkout, workouts, setWorkouts, setWorkoutModalOpen)} />
                </div>
            </div>
        </Modal>
    </div>
  );
}

export default Patients;