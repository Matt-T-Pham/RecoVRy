import '../css/LoginForm.scss'
import React, { useState } from 'react'
import { useStateValue } from '../state'
import Logo from '../images/logo.png'

const Login = (props) => {

    const [, dispatch] = useStateValue();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authenticate = () => {
        const resProm = fetch(window.location.href, {
            method: 'POST',
            body: JSON.stringify({"username": username, "password": password}),
            headers: {
              'Content-Type': 'application/json'
            }
        });
        
        resProm.then((response) => {
            if(!response.ok) throw Error(response.statusText)

            response.json().then(json => {
                if(json.isAuth){
                    dispatch({
                        type: 'loginUser',
                        firstName: json.firstName,
                        lastName: json.lastName,
                        username: username,
                        email: json.email,
                        phoneNumber: json.phoneNumber,
                        address: json.address,
                        accessLevel: json.accessLevel
                    });
                }
            })
        }).catch(console.log)
    }

    return (
        <div>
            <img src={Logo} alt="RecoVRy" height={100}/>
            <div className="Login-form">
                <div className="Login-form--overlay">
                    <div className="Login-form__header">
                        <h1 className="">Log in</h1>
                        <p>If you don’t have an account, talk to your therapist or admin about creating one.</p>
                    </div>
                    <input className="Login-form__field" type="text" placeholder="User ID" onInput={e => setUsername(e.target.value)}/>
                    <input className="Login-form__field" type="password" placeholder="Password" 
                    onInput={e => setPassword(e.target.value)} onKeyPress={e => {if(e.key === "Enter") setTimeout(authenticate, 1000)}}/>
                    <div onClick={authenticate} className="Login-form__field Login-form__button">Login</div>
                </div>
            </div>
        </div>
    )
}

export default Login;