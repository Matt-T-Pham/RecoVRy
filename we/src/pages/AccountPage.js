import React, { useState, useRef } from 'react';
import { useStateValue } from '../state'
import '../css/AccountPage.scss'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import EditIcon from '../images/pencil.png'
import CancelIcon from '../images/close.png'
import ConfirmIcon from '../images/tick.png'

let newPassword = ''
let newPasswordConf = ''

const changePassword = (username, newPassword) => {
  fetch(`${window.location.origin}/changepassword`, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      newPassword: newPassword
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (!response.ok) throw Error(response.statusText)

  }).catch(console.log)
}

const editInfo = (newInfo, dispatch) => {
  dispatch({
    type: 'update',
    userEmail: newInfo.email,
    userPhoneNumber: newInfo.phoneNumber,
    userAddress: newInfo.address
  })
  fetch(`${window.location.origin}/edituser`, {
    method: 'POST',
    body: JSON.stringify(newInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (!response.ok) throw Error(response.statusText)

  }).catch(console.log)
}

const Account = () => {
  const [{ username, userFirstName, userLastName, userEmail, userPhoneNumber, userAddress }, dispatch] = useStateValue()
  const [modalOpen, setModalOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const addressEl = useRef(null)
  const emailEl = useRef(null)
  const phoneNumEl = useRef(null)
 
  return (
      <div className="AccountPage">
        <h1 className="AccountPage__header">
          Account Info
          <img src={editable ? CancelIcon : EditIcon} alt="Edit" onClick={() => setEditable(!editable)}/>
          {editable && <img src={ConfirmIcon} alt="Confirm" onClick={() => { 
            editInfo({address: addressEl.current.value, 
              email: emailEl.current.value, 
              phoneNumber: phoneNumEl.current.value,
              username: username }, dispatch)
            setEditable(!editable) }} /> }
        </h1>

        <div className="AccountPage__info">
          <TextField disabled label="Name" defaultValue={`${userFirstName} ${userLastName}`} />
          <TextField disabled label="Username" defaultValue={username} />
          <TextField inputRef={emailEl} disabled={!editable} variant={editable ? "filled" : "standard"} label="Email" defaultValue={userEmail} />
          <TextField inputRef={phoneNumEl} disabled={!editable} variant={editable ? "filled" : "standard"} label="Phone Number" defaultValue={userPhoneNumber} />
          <TextField inputRef={addressEl} disabled={!editable} variant={editable ? "filled" : "standard"} label="Address" defaultValue={userAddress} />
        </div>
        <Button className="AccountPage__button" variant="outlined" style={{ marginTop: "1rem" }} onClick={() => setModalOpen(true)}>Change Password</Button>

        <Modal open={modalOpen} onClose={() => { setModalOpen(false); setPasswordsMatch(true) }}>
          <div className="Modal">
            <h2 style={{ marginLeft: "1rem" }}>NEW PASSWORD</h2>
            <form noValidate autoComplete="off" style={{ margin: "1rem" }}>
              <TextField fullWidth onChange={(e) => { newPassword = e.target.value }}
                label="Password" type="password" variant="outlined" />
              <TextField fullWidth type="password" onChange={(e) => { newPasswordConf = e.target.value }}
                label="Confirm Password" variant="outlined" style={{ margin: "1rem 0" }} />
              {!passwordsMatch && <p style={{width: '100%', textAlign: 'center', margin: '0 0 1rem 0', color: 'red'}}>Passwords Don't Match</p>}
              <Button fullWidth variant="outlined"
                onClick={() => {
                  if(newPassword !== newPasswordConf) setPasswordsMatch(false)
                  else {
                    changePassword(username, newPassword)
                    setModalOpen(false)
                    setPasswordsMatch(true)
                  }
                }}>Confirm Password Change</Button>
            </form>
          </div>
        </Modal>
      </div>
  );
}

export default Account;
