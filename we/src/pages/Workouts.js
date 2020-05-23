import React, { useState, useEffect } from 'react'
import '../css/Workouts.scss'
import Button from '@material-ui/core/Button'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useStateValue } from '../state'

const getWorkouts = (username, setWorkouts) => {
  fetch(`${window.location.origin}/getassignedworkouts?user=${username}`)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText)
      else {
        console.log(response)
        response.json().then((json) => { setWorkouts(json) })
      }
    }).catch(console.log)
}
const Workouts = () => {
  //const testW = [{"id":1,"name":"first workout!","schedule":"1111111"},{"id":2,"name":"A test workout","schedule":"0101010"},{"id":3,"name":"Another test workout","schedule":"0101010"},{"id":4,"name":"Lots of people do this workout","schedule":"0101010"},{"id":5,"name":"So much abs","schedule":"0101010"},{"id":19,"name":"Workout Awesome","schedule":"0101010"},{"id":1,"name":"first workout!","schedule":"0101010"},{"id":2,"name":"A test workout","schedule":"0101010"},{"id":3,"name":"Another test workout","schedule":"0101010"},{"id":4,"name":"Lots of people do this workout","schedule":"0101010"},{"id":5,"name":"So much abs","schedule":"0101010"}]
  
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [{ username },] = useStateValue()
  const [workouts, setWorkouts] = useState([])
  useEffect(() => {
    getWorkouts(username, setWorkouts)
  }, [username])
  return (
    <List className="Workouts" subheader={<ListSubheader style={{backgroundColor: 'rgb(233,228,251)'}}>Your Workouts</ListSubheader>} >
      {workouts.map((data, i) =>
        <React.Fragment key={i} >
          <ListItem style={{backgroundColor: i % 2 ? 'rgba(0,0,255,.1)' : 'transparent'}} button onClick={() => console.log("Click")}>
            <ListItemText primary={data.name} secondary={weekdays.filter((_, i) => data.schedule.charAt(i) === '1').join('  |  ')} />
            <Button>START THIS WORKOUT</Button>
          </ListItem>
        </React.Fragment>)
      }
    </List>
  );

}

export default Workouts;
