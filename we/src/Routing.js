import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Workouts from './pages/Workouts'
import Progress from './pages/Progress'
import Dashboard from './pages/Dashboard'
import Account from './pages/AccountPage'
import PageNotFound from './pages/PageNotFound'
import NavRoute from './components/NavRoute'
import Patients from './pages/PatientsPage'
import Ranking from './pages/RankingPage'
import TherapistProgress from './pages/TherapistProgress'
import { useStateValue } from './state'

const availableRoutes = (accessLevel, username) => {
    switch(accessLevel) {
      case 'patient':
        return(
            <Switch>
                <Route exact path="/login" render={props => <LoginPage {...props} />}/>
                <NavRoute exact path="/" component={Dashboard} />
                <NavRoute exact path="/account" component={Account} />
                <NavRoute exact path="/workouts" component={Workouts} />
                <NavRoute exact path="/progress" component={Progress} innerProps={{username: username}} />
                <NavRoute exact path="/ranking" component={Ranking} />
                <NavRoute component={PageNotFound} />
            </Switch>
        )
      case 'therapist':
        return(
            <Switch>
                <Route exact path="/login" render={props => <LoginPage {...props} />}/>
                <NavRoute exact path="/" component={Dashboard} />
                <NavRoute exact path="/account" component={Account} />
                <NavRoute exact path="/patients" component={Patients} />
                <NavRoute exact path="/progress" component={TherapistProgress} />
                <NavRoute component={PageNotFound} />
            </Switch>
        )
      case 'admin':
        return;
      default:
        return(
            <Switch>
                <Route exact path="/login" render={props => <LoginPage {...props} />}/>
                <NavRoute component={PageNotFound} />
            </Switch>
        )
    }
  }
  
  const Routing = () => {
    const [{accessLevel, username},] = useStateValue()
    return(
      <Router>
          { availableRoutes(accessLevel, username) }
      </Router>
    )
  }

  export default Routing;