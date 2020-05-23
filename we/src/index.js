import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './state'
import Routing from './Routing'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/lightBlue';
import green from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const initialState = {
  authenticated: false,
  accessLevel: '',
  userFirstName: '',
  userLastName: '',
  username: '',
  userEmail: '',
  userPhoneNumber: '',
  userAddress: '',
  patients: undefined
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'loginUser':
      return {
        ...state,
        authenticated: true,
        userFirstName: action.firstName,
        userLastName: action.lastName,
        username: action.username,
        userEmail: action.email,
        userPhoneNumber: action.phoneNumber,
        userAddress: action.address,
        accessLevel: action.accessLevel
      }

    case 'logoutUser':
      return {
        authenticated: false,
        userFirstName: '',
        userLastName: '',
        username: '',
        userEmail: '',
        userPhoneNumber: '',
        userAddress: '',
        accessLevel: '',
        patients: undefined
      }

    case 'update':
    default:
      console.log({
        ...state,
        ...action
      })
      return {
        ...state,
        ...action
      }
  }
}

const App = (
  <ThemeProvider theme={theme}>
    <StateProvider reducer={reducer} initialState={initialState}>
      <Routing />
    </StateProvider>
  </ThemeProvider>
)

ReactDOM.render(App, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
