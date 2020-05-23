(this["webpackJsonprecovry-web"]=this["webpackJsonprecovry-web"]||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){"use strict";a.r(t);var n=a(13),c=a(0),r=a.n(c),o=a(8),A=a.n(o);a(83),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=Object(c.createContext)(),l=function(){return Object(c.useContext)(i)},s=a(5),u=a(24),m=a(15),g=(a(84),a(85),a(35)),d=a.n(g),E=function(e){var t=l(),a=Object(s.a)(t,2)[1],n=Object(c.useState)(""),o=Object(s.a)(n,2),A=o[0],i=o[1],u=Object(c.useState)(""),m=Object(s.a)(u,2),g=m[0],E=m[1],h=function(){fetch(window.location.href,{method:"POST",body:JSON.stringify({username:A,password:g}),headers:{"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw Error(e.statusText);e.json().then((function(e){e.isAuth&&a({type:"loginUser",firstName:e.firstName,lastName:e.lastName,username:A,email:e.email,phoneNumber:e.phoneNumber,address:e.address,accessLevel:e.accessLevel})}))})).catch(console.log)};return r.a.createElement("div",null,r.a.createElement("img",{src:d.a,alt:"RecoVRy",height:100}),r.a.createElement("div",{className:"Login-form"},r.a.createElement("div",{className:"Login-form--overlay"},r.a.createElement("div",{className:"Login-form__header"},r.a.createElement("h1",{className:""},"Log in"),r.a.createElement("p",null,"If you don\u2019t have an account, talk to your therapist or admin about creating one.")),r.a.createElement("input",{className:"Login-form__field",type:"text",placeholder:"User ID",onInput:function(e){return i(e.target.value)}}),r.a.createElement("input",{className:"Login-form__field",type:"password",placeholder:"Password",onInput:function(e){return E(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&setTimeout(h,1e3)}}),r.a.createElement("div",{onClick:h,className:"Login-form__field Login-form__button"},"Login"))))};var h=function(){var e=l();return Object(s.a)(e,1)[0].authenticated?r.a.createElement(u.a,{to:"/"}):r.a.createElement("div",{className:"Login-page"},r.a.createElement(E,null))},b=(a(91),a(133)),f=a(131),p=a(127),C=a(132),v=a(137),I=function(){var e=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],t=l(),a=Object(s.a)(t,1)[0].username,n=Object(c.useState)([]),o=Object(s.a)(n,2),A=o[0],i=o[1];return Object(c.useEffect)((function(){!function(e,t){fetch("".concat(window.location.origin,"/getassignedworkouts?user=").concat(e)).then((function(e){if(!e.ok)throw Error(e.statusText);console.log(e),e.json().then((function(e){t(e)}))})).catch(console.log)}(a,i)}),[a]),r.a.createElement(p.a,{className:"Workouts",subheader:r.a.createElement(f.a,{style:{backgroundColor:"rgb(233,228,251)"}},"Your Workouts")},A.map((function(t,a){return r.a.createElement(r.a.Fragment,{key:a},r.a.createElement(C.a,{style:{backgroundColor:a%2?"rgba(0,0,255,.1)":"transparent"},button:!0,onClick:function(){return console.log("Click")}},r.a.createElement(v.a,{primary:t.name,secondary:e.filter((function(e,a){return"1"===t.schedule.charAt(a)})).join("  |  ")}),r.a.createElement(b.a,null,"START THIS WORKOUT")))})))},w=(a(92),a(93),a(66)),N=new Date(Date.now()),R=function(e){var t=e.username;console.log("getting progress for patient ".concat(t));var a=Object(c.useState)({}),o=Object(s.a)(a,2),A=o[0],i=o[1],l=Object(c.useState)([]),u=Object(s.a)(l,2),m=u[0],g=u[1];return Object(c.useEffect)((function(){!function(e,t){fetch("".concat(window.location.origin,"/getlogs?user=").concat(e)).then((function(e){e.ok?e.json().then((function(e){var a={};e.forEach((function(e){var t=new Date(e.date).toDateString();a[t]||(a[t]=[]),a[t].push({name:e.name,score:e.score})})),t(a)})):console.log(e.statusText)})).catch(console.log)}(t,i),function(e,t){fetch("".concat(window.location.origin,"/getassignments?user=").concat(e)).then((function(e){e.ok?e.json().then((function(e){t(e.map((function(e){return Object(n.a)({},e,{dateAssigned:new Date(e.date_assigned)})})))})):console.log(e.statusText)})).catch(console.log)}(t,g)}),[t]),r.a.createElement("div",{className:"Progress"},r.a.createElement(w.a,{calendarType:"US",className:"Progress__calendar",tileClassName:function(e){e.activeStartDate;var t=e.date;return"month"===e.view&&t<=N&&void 0!==function(e){return m.find((function(t){return t.dateAssigned<e&&"1"===t.schedule.charAt(e.getDay())}))}(t)?function(e){if(!e)return"noScore";var t=e.reduce((function(e,t){return e+t.score}),0)/e.length;return t<1e3?"goodScore":t<2e3?"medScore":"badScore"}(A[t.toDateString()]):null}}),r.a.createElement("div",{style:{display:"flex",flexDirection:"column",marginLeft:"1rem"}},r.a.createElement("h2",null,"Legend"),r.a.createElement("div",{className:"Progress__legend"},r.a.createElement("div",{className:"goodScore"},"Good Score"),r.a.createElement("div",{className:"medScore"},"Mediocre Score"),r.a.createElement("div",{className:"badScore"},"Bad Score"),r.a.createElement("div",{className:"noScore"},"No Workout Recorded"),r.a.createElement("div",{style:{backgroundColor:"#fef975"}},"Today"))))},O=(a(94),function(){var e=l(),t=Object(s.a)(e,1)[0],a=t.userFirstName,n=t.username,o=Object(c.useState)((new Date).toLocaleTimeString()),A=Object(s.a)(o,2),i=A[0],u=A[1],m=Object(c.useState)({}),g=Object(s.a)(m,2),d=g[0],E=g[1];Object(c.useEffect)((function(){setInterval((function(){return u((new Date).toLocaleTimeString())}),1e3),function(e){fetch("".concat(window.location.origin,"/dailyinspiration")).then((function(t){t.ok?t.json().then(e):console.log(t.statusText)})).catch(console.log)}(E)}),[]);return r.a.createElement("div",{className:"Dashboard"},r.a.createElement("h1",{className:"Dashboard__header"},"Welcome back",a&&",\n ".concat(a),"!"),r.a.createElement("div",{className:"Dashboard__clock"},i),r.a.createElement("div",{className:"Dashboard__display",style:{backgroundImage:"url(".concat(d.imageUrl,")")}},r.a.createElement("h2",null,d.quote,r.a.createElement("br",null),r.a.createElement("br",null),d.quoteAuthor)),r.a.createElement(b.a,{id:"Dashboard__button",variant:"outlined",onClick:function(){fetch("".concat(window.location.origin,"/startvr"),{method:"POST",body:JSON.stringify({username:n}),headers:{"Content-Type":"application/json"}})}},"Start VR Experience"))}),j=(a(95),a(136)),k=a(135),y=a(59),B=a.n(y),W=a(41),S=a.n(W),P=a(32),L=a.n(P),J="",x="",M=function(){var e=l(),t=Object(s.a)(e,2),a=t[0],n=a.username,o=a.userFirstName,A=a.userLastName,i=a.userEmail,u=a.userPhoneNumber,m=a.userAddress,g=t[1],d=Object(c.useState)(!1),E=Object(s.a)(d,2),h=E[0],f=E[1],p=Object(c.useState)(!1),C=Object(s.a)(p,2),v=C[0],I=C[1],w=Object(c.useState)(!0),N=Object(s.a)(w,2),R=N[0],O=N[1],y=Object(c.useRef)(null),W=Object(c.useRef)(null),P=Object(c.useRef)(null);return r.a.createElement("div",{className:"AccountPage"},r.a.createElement("h1",{className:"AccountPage__header"},"Account Info",r.a.createElement("img",{src:v?S.a:B.a,alt:"Edit",onClick:function(){return I(!v)}}),v&&r.a.createElement("img",{src:L.a,alt:"Confirm",onClick:function(){!function(e,t){t({type:"update",userEmail:e.email,userPhoneNumber:e.phoneNumber,userAddress:e.address}),fetch("".concat(window.location.origin,"/edituser"),{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw Error(e.statusText)})).catch(console.log)}({address:y.current.value,email:W.current.value,phoneNumber:P.current.value,username:n},g),I(!v)}})),r.a.createElement("div",{className:"AccountPage__info"},r.a.createElement(k.a,{disabled:!0,label:"Name",defaultValue:"".concat(o," ").concat(A)}),r.a.createElement(k.a,{disabled:!0,label:"Username",defaultValue:n}),r.a.createElement(k.a,{inputRef:W,disabled:!v,variant:v?"filled":"standard",label:"Email",defaultValue:i}),r.a.createElement(k.a,{inputRef:P,disabled:!v,variant:v?"filled":"standard",label:"Phone Number",defaultValue:u}),r.a.createElement(k.a,{inputRef:y,disabled:!v,variant:v?"filled":"standard",label:"Address",defaultValue:m})),r.a.createElement(b.a,{className:"AccountPage__button",variant:"outlined",style:{marginTop:"1rem"},onClick:function(){return f(!0)}},"Change Password"),r.a.createElement(j.a,{open:h,onClose:function(){f(!1),O(!0)}},r.a.createElement("div",{className:"Modal"},r.a.createElement("h2",{style:{marginLeft:"1rem"}},"NEW PASSWORD"),r.a.createElement("form",{noValidate:!0,autoComplete:"off",style:{margin:"1rem"}},r.a.createElement(k.a,{fullWidth:!0,onChange:function(e){J=e.target.value},label:"Password",type:"password",variant:"outlined"}),r.a.createElement(k.a,{fullWidth:!0,type:"password",onChange:function(e){x=e.target.value},label:"Confirm Password",variant:"outlined",style:{margin:"1rem 0"}}),!R&&r.a.createElement("p",{style:{width:"100%",textAlign:"center",margin:"0 0 1rem 0",color:"red"}},"Passwords Don't Match"),r.a.createElement(b.a,{fullWidth:!0,variant:"outlined",onClick:function(){J!==x?O(!1):(!function(e,t){fetch("".concat(window.location.origin,"/changepassword"),{method:"POST",body:JSON.stringify({username:e,newPassword:t}),headers:{"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw Error(e.statusText)})).catch(console.log)}(n,J),f(!1),O(!0))}},"Confirm Password Change")))))},Y=(a(96),function(){return r.a.createElement("h1",{className:"PageNotFound__header"},"Woops! It's a 404...")});a(97),a(98);function U(e){if(window.location.pathname===e)return"Navbar--active"}var Z=function(){var e=l(),t=Object(s.a)(e,2),a=t[0].accessLevel,n=t[1];return r.a.createElement("div",{className:"Navbar"},r.a.createElement("div",{className:"Navbar--logo"},r.a.createElement(m.b,{to:"/"},r.a.createElement("img",{src:d.a,alt:"RecoVRy",height:75}))),r.a.createElement(m.b,{to:"/",className:U("/")},"Dashboard"),"patient"===a?r.a.createElement(r.a.Fragment,null,r.a.createElement(m.b,{to:"/ranking",className:U("/ranking")},"Ranking"),r.a.createElement(m.b,{to:"/workouts",className:U("/workouts")},"All Workouts")):r.a.createElement(m.b,{to:"/patients",className:U("/patients")},"Patients"),r.a.createElement(m.b,{to:"/progress",className:U("/progress")},"Progress"),r.a.createElement(m.b,{to:"/account",className:U("/account")},"Account"),r.a.createElement(m.b,{to:"/login",onClick:function(){n({type:"logoutUser"})},className:"Navbar--logout"},"Logout"))},T=function(e){var t=e.exact,a=e.path,n=e.component,c=e.innerProps,o=l();return Object(s.a)(o,1)[0].authenticated?r.a.createElement(u.b,{exact:t,path:a,render:function(e){return r.a.createElement("div",{className:"Page"},r.a.createElement(Z,null),r.a.createElement("div",{className:"Page__body"},r.a.createElement(n,Object.assign({},e,c))))}}):r.a.createElement(u.a,{to:"/login"})},D=a(68),Q=(a(99),a(43)),X=a.n(Q),G=a(60),F=a.n(G),V=a(61),z=a.n(V),H=a(49),K=a.n(H),_=a(50),q=a.n(_),$=a(62),ee=a.n($),te=a(63),ae=a.n(te),ne=function(){var e=l(),t=Object(s.a)(e,1)[0].username,a=Object(c.useState)(),o=Object(s.a)(a,2),A=o[0],i=o[1],u=Object(c.useState)(),m=Object(s.a)(u,2),g=m[0],d=m[1],E=Object(c.useState)({}),h=Object(s.a)(E,2),I=h[0],w=h[1],N=Object(c.useState)(!1),R=Object(s.a)(N,2),O=R[0],y=R[1],B=Object(c.useState)(!1),W=Object(s.a)(B,2),P=W[0],J=W[1],x=Object(c.useState)([]),M=Object(s.a)(x,2),Y=M[0],U=M[1],Z=Object(c.useState)([]),T=Object(s.a)(Z,2),Q=T[0],G=T[1],V=Object(c.useState)([]),H=Object(s.a)(V,2),_=H[0],$=H[1],te=Object(c.useState)([]),ne=Object(s.a)(te,2),ce=ne[0],re=ne[1],oe=Object(c.useState)(),Ae=Object(s.a)(oe,2),ie=Ae[0],le=Ae[1],se=Object(c.useState)(Array(7).fill(!1)),ue=Object(s.a)(se,2),me=ue[0],ge=ue[1],de=Object(c.useState)({name:"",exercises:[]}),Ee=Object(s.a)(de,2),he=Ee[0],be=Ee[1];return Object(c.useEffect)((function(){!function(e,t){fetch("".concat(window.location.origin,"/getpatients?user=").concat(e)).then((function(e){if(!e.ok)throw Error(e.statusText);console.log(e),e.json().then((function(e){t(e)}))})).catch(console.log)}(t,U),function(e,t){fetch("".concat(window.location.origin,"/getcreatedworkouts?user=").concat(e)).then((function(e){if(!e.ok)throw Error(e.statusText);console.log(e),e.json().then((function(e){t(e)}))})).catch(console.log)}(t,G),function(e,t){fetch("".concat(window.location.origin,"/getcreatedexercises?user=").concat(e)).then((function(e){if(!e.ok)throw Error(e.statusText);console.log(e),e.json().then((function(e){t(e)}))})).catch(console.log)}(t,$)}),[t]),r.a.createElement("div",{style:{display:"flex",height:"100%"}},r.a.createElement("div",{className:"Patients__list"},r.a.createElement(p.a,{subheader:r.a.createElement(f.a,{component:"div"},"Patients"),className:"Patients__list--style"},Y.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(C.a,{button:!0,onMouseEnter:function(){return i(t)},onMouseLeave:function(){return i(null)},onClick:function(){d(t),le(void 0)}},r.a.createElement(v.a,{primary:"".concat(e.firstName," ").concat(e.lastName)}),A===t?r.a.createElement("img",{src:X.a,alt:">",height:16}):r.a.createElement(r.a.Fragment,null)))}))),r.a.createElement(b.a,{variant:"contained",onClick:function(){return y(!0)}},"New Patient")),r.a.createElement("div",{className:"Patients__window"},void 0!==g&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"Patients__window__header"},r.a.createElement("h2",{style:{marginLeft:"1rem"}},Y[g].firstName," ",Y[g].lastName),r.a.createElement("img",{src:z.a,alt:"Transfer"}),r.a.createElement("img",{src:F.a,alt:"Remove",onClick:function(){d(void 0),function(e,t,a){fetch("".concat(window.location.origin,"/deleteuser?user=").concat(t[e].username),{method:"DELETE"}).then((function(n){if(!n.ok)throw Error(n.statusText);var c=Object.assign([],t);c.splice(e,1),console.log(c),a(c)})).catch(console.log)}(g,Y,U)}})),r.a.createElement("div",{className:"Patients__window__workouts"},r.a.createElement(p.a,{subheader:r.a.createElement(f.a,null,"Prescribed Workouts"),className:"Patients__window__workouts__list"},Y[g].workouts.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(C.a,{button:!0,onClick:function(){return function(e,t,a,n){fetch("".concat(window.location.origin,"/removeassignedworkout?user=").concat(e,"&WID=").concat(t),{method:"DELETE"}).then((function(c){if(!c.ok)throw Error(c.statusText);var r=JSON.parse(JSON.stringify(a)),o=r.findIndex((function(t){return t.username===e}));r[o].workouts.splice(r[o].workouts.findIndex((function(e){return e.id===t})),1),n(r)})).catch(console.log)}(Y[g].username,Y[g].workouts[t].id,Y,U)}},r.a.createElement(v.a,{primary:e.name}),r.a.createElement("img",{src:q.a,alt:"-"})))}))),r.a.createElement("div",{id:"Available-Workouts",className:"Patients__window__workouts__list"},r.a.createElement(p.a,{subheader:r.a.createElement(f.a,null,"Available Workouts")},Q.filter((function(e){return!Y[g].workouts.some((function(t){return e.id===t.id}))})).map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},t!==ie?r.a.createElement(C.a,{button:!0,onClick:function(){return le(t)}},r.a.createElement("img",{src:K.a,alt:"+",style:{marginRight:"1.5rem"}}),r.a.createElement(v.a,{primary:e.name})):r.a.createElement(C.a,{style:{display:"flex",justifyContent:"space-around",alignItems:"center",height:"48px",backgroundColor:"rgba(0,0,0,.08)"}},["S","M","T","W","T","F","S"].map((function(e,t){return r.a.createElement("span",{className:"Patients__window__workouts__list__day",style:{backgroundColor:me[t]?"rgba(0,0,0,.2)":"transparent"},onClick:function(){var e=Object(D.a)(me);e[t]=!e[t],ge(e)}},e)})),r.a.createElement("img",{src:S.a,height:16,alt:"Cancel",onClick:function(){le(void 0),ge(Array(7).fill(!1))}}),r.a.createElement("img",{src:L.a,height:16,alt:"Confirm",onClick:function(){!function(e,t,a,n,c,r){fetch("".concat(window.location.origin,"/assignworkout"),{method:"PUT",body:JSON.stringify({username:e,WID:t,schedule:r.reduce((function(e,t){return e+(t?"1":"0")}),"")}),headers:{"Content-Type":"application/json"}}).then((function(r){if(!r.ok)throw Error(r.statusText);var o=JSON.parse(JSON.stringify(n)),A=o.findIndex((function(t){return t.username===e}));o[A].workouts=o[A].workouts.concat({id:t,name:a}),c(o)})).catch(console.log)}(Y[g].username,Q.filter((function(e){return!Y[g].workouts.some((function(t){return e.id===t.id}))}))[t].id,Q.filter((function(e){return!Y[g].workouts.some((function(t){return e.id===t.id}))}))[t].name,Y,U,me),ge(Array(7).fill(!1)),le(void 0)}})))}))),r.a.createElement(b.a,{id:"Create-Workout-Button",variant:"outlined",onClick:function(){return J(!0)},fullWidth:!0},"Create Workout"))))),r.a.createElement(j.a,{open:O,onClose:function(){return y(!1)}},r.a.createElement("div",{className:"Modal"},r.a.createElement("h2",{style:{marginLeft:"1rem"}},"NEW PATIENT"),r.a.createElement("form",{noValidate:!0,autoComplete:"off",className:"Patients__modal__form"},r.a.createElement(k.a,{id:"outlined-basic",onChange:function(e){return w(Object(n.a)({},I,{firstName:e.target.value}))},label:"First Name",variant:"outlined",style:{margin:"1rem",gridArea:"a"}}),r.a.createElement(k.a,{id:"outlined-basic",onChange:function(e){return w(Object(n.a)({},I,{lastName:e.target.value}))},label:"Last Name",variant:"outlined",style:{margin:"1rem",gridArea:"b"}}),r.a.createElement(k.a,{id:"outlined-basic",onChange:function(e){return w(Object(n.a)({},I,{email:e.target.value}))},label:"Email",variant:"outlined",style:{margin:"1rem",gridArea:"c"}}),r.a.createElement(k.a,{id:"outlined-basic",onChange:function(e){return w(Object(n.a)({},I,{phoneNumber:e.target.value}))},label:"Phone Number",variant:"outlined",style:{margin:"1rem",gridArea:"d"}}),r.a.createElement(k.a,{id:"outlined-basic",onChange:function(e){return w(Object(n.a)({},I,{address:e.target.value}))},label:"Address",variant:"outlined",style:{margin:"1rem",gridArea:"e"}}),r.a.createElement(k.a,{id:"outlined-basic",onChange:function(e){return w(Object(n.a)({},I,{username:e.target.value}))},label:"Username",variant:"outlined",style:{margin:"1rem",gridArea:"f"}}),r.a.createElement(k.a,{id:"outlined-basic",onChange:function(e){return w(Object(n.a)({},I,{password:e.target.value}))},label:"Password",type:"password",variant:"outlined",style:{margin:"1rem",gridArea:"g"}}),r.a.createElement(b.a,{variant:"outlined",style:{margin:"1rem",gridArea:"h"},onClick:function(){!function(e,t,a,n){fetch("".concat(window.location.origin,"/adduser"),{method:"PUT",body:JSON.stringify({therapistsUser:e,username:t.username,password:t.password,firstName:t.firstName,lastName:t.lastName,address:t.address,phoneNumber:t.phoneNumber,email:t.email,accessLevel:"patient"}),headers:{"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw Error(e.statusText);n(a.concat({firstName:t.firstName,lastName:t.lastName,username:t.username,workouts:[]}))})).catch(console.log)}(t,I,Y,U),y(!1)}},"ADD PATIENT")))),r.a.createElement(j.a,{open:P,onClose:function(){return J(!1)}},r.a.createElement("div",{className:"Modal",id:"WorkoutBuilderModal"},r.a.createElement("h2",{style:{marginLeft:"1rem"}},"BUILD NEW WORKOUT"),r.a.createElement("div",{className:"WorkoutBuilder"},r.a.createElement(p.a,{subheader:r.a.createElement(f.a,null,"Available Exercises"),className:"WorkoutBuilder__available"},_.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(C.a,{button:!0,onClick:function(){return function(e,t,a,c,r,o,A){var i=t.splice(e,1);r(c.concat(i)),a(Object.assign([],t)),o.exercises.push(Object(n.a)({},i[0],{reps:1})),A(Object.assign({},o))}(t,_,$,ce,re,he,be)}},r.a.createElement(v.a,{primary:e.name}),r.a.createElement("img",{src:K.a,alt:"+"})))}))),r.a.createElement(p.a,{subheader:r.a.createElement(f.a,null,"Selected Exercises",r.a.createElement("span",{style:{float:"right"}},"Reps")),className:"WorkoutBuilder__selected"},ce.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(C.a,null,r.a.createElement("img",{src:q.a,alt:"-",style:{margin:"-.5rem 1rem -.5rem -.5rem",padding:".5rem"},onClick:function(){return function(e,t,a,n,c,r,o){var A=n.splice(e,1);a(t.concat(A)),c(Object.assign([],n)),r.exercises.splice(e,1),o(Object.assign({},r))}(t,_,$,ce,re,he,be)}}),r.a.createElement(v.a,{primary:e.name}),r.a.createElement("div",{className:"WorkoutBuilder__selected--reps"},r.a.createElement("span",{style:{marginRight:".5rem"}},he.exercises[t].reps),r.a.createElement("div",{className:"WorkoutBuilder__selected__carets"},r.a.createElement("img",{src:ee.a,height:8,alt:"^",onClick:function(){he.exercises[t].reps++,be(Object.assign({},he))}}),r.a.createElement("img",{src:ae.a,height:8,alt:"v",onClick:function(){he.exercises[t].reps>1&&(he.exercises[t].reps--,be(Object.assign({},he)))}})))))})))),r.a.createElement("div",{id:"Workout-Confirmation-div"},r.a.createElement(k.a,{label:"Workout Name",onChange:function(e){he.name=e.target.value,be(Object.assign({},he))},fullWidth:!0}),r.a.createElement("img",{src:L.a,alt:"Confirm",height:24,onClick:function(){return function(e,t,a,n,c){fetch("".concat(window.location.origin,"/addnewworkout?user=").concat(e),{method:"PUT",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw Error(e.statusText);c(!1),e.json().then((function(e){n(a.concat(e))}))})).catch(console.log)}(t,he,Q,G,J)}})))))},ce=(a(100),function(){var e=l(),t=Object(s.a)(e,1)[0].username,a=Object(c.useState)(),n=Object(s.a)(a,2),o=n[0],A=n[1],i=Object(c.useState)([]),u=Object(s.a)(i,2),m=u[0],g=u[1];return Object(c.useEffect)((function(){!function(e,t,a){fetch("".concat(window.location.origin,"/getranking?user=").concat(e)).then((function(e){e.ok?e.json().then((function(e){console.log(e),t(e),a(e.findIndex((function(e){return"YOU"===e.username})))})):console.log(e.statusText)})).catch(console.log)}(t,g,A)}),[t]),r.a.createElement("div",{className:"RankingPage"},r.a.createElement("div",{className:"RankingPage__userDisplay"},r.a.createElement("label",null,"YOUR RANK:"),r.a.createElement("span",null,void 0!==o&&o+1),r.a.createElement("label",null,"YOUR SCORE:"),r.a.createElement("span",null,m[o]&&m[o].score)),r.a.createElement("div",{className:"RankingPage__listArea"},r.a.createElement("div",{className:"RankingPage__listArea--top"},r.a.createElement("div",{className:"RankingPage__listArea--top--rankTwo"},m[1]&&m[1].username,r.a.createElement("span",null,"2")),r.a.createElement("div",{className:"RankingPage__listArea--top--rankOne"},m[0]&&m[0].username,r.a.createElement("span",null,"1")),r.a.createElement("div",{className:"RankingPage__listArea--top--rankThree"},m[2]&&m[2].username,r.a.createElement("span",null,"3"))),r.a.createElement("ul",null,m.slice(3).map((function(e,t){return r.a.createElement("li",{key:t,className:"RankingPage__listArea--item"},r.a.createElement("span",{className:"RankingPage__listArea--item--rank"},t+4),r.a.createElement("span",{className:"RankingPage__listArea--item--name"},e.username),r.a.createElement("span",{className:"RankingPage__listArea--item--score"},e.score))})))))}),re=function(){var e=l(),t=Object(s.a)(e,1)[0].username,a=Object(c.useState)([]),n=Object(s.a)(a,2),o=n[0],A=n[1],i=Object(c.useState)(),u=Object(s.a)(i,2),m=u[0],g=u[1],d=Object(c.useState)(),E=Object(s.a)(d,2),h=E[0],b=E[1];return Object(c.useEffect)((function(){!function(e,t){fetch("".concat(window.location.origin,"/getpatientnames?user=").concat(e)).then((function(e){if(!e.ok)throw Error(e.statusText);e.json().then((function(e){return t(e)}))})).catch(console.log)}(t,A)}),[t]),r.a.createElement("div",{style:{display:"flex",height:"100%"}},r.a.createElement(p.a,{style:{width:"100%",maxWidth:"260px",boxSizing:"border-box",marginRight:"1rem"},subheader:r.a.createElement(f.a,{component:"div"},"Patients"),className:"Patients__list Patients__list--style"},o.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(C.a,{button:!0,onMouseEnter:function(){return b(t)},onMouseLeave:function(){return b(null)},onClick:function(){console.log(o[t].username),g(t)}},r.a.createElement(v.a,{primary:"".concat(e.firstName," ").concat(e.lastName)}),h===t?r.a.createElement("img",{src:X.a,alt:">",height:16}):r.a.createElement(r.a.Fragment,null)))}))),r.a.createElement(R,{username:void 0!==m?o[m].username:""}))},oe=function(){var e=l(),t=Object(s.a)(e,1)[0],a=t.accessLevel,n=t.username;return r.a.createElement(m.a,null,function(e,t){switch(e){case"patient":return r.a.createElement(u.d,null,r.a.createElement(u.b,{exact:!0,path:"/login",render:function(e){return r.a.createElement(h,e)}}),r.a.createElement(T,{exact:!0,path:"/",component:O}),r.a.createElement(T,{exact:!0,path:"/account",component:M}),r.a.createElement(T,{exact:!0,path:"/workouts",component:I}),r.a.createElement(T,{exact:!0,path:"/progress",component:R,innerProps:{username:t}}),r.a.createElement(T,{exact:!0,path:"/ranking",component:ce}),r.a.createElement(T,{component:Y}));case"therapist":return r.a.createElement(u.d,null,r.a.createElement(u.b,{exact:!0,path:"/login",render:function(e){return r.a.createElement(h,e)}}),r.a.createElement(T,{exact:!0,path:"/",component:O}),r.a.createElement(T,{exact:!0,path:"/account",component:M}),r.a.createElement(T,{exact:!0,path:"/patients",component:ne}),r.a.createElement(T,{exact:!0,path:"/progress",component:re}),r.a.createElement(T,{component:Y}));case"admin":return;default:return r.a.createElement(u.d,null,r.a.createElement(u.b,{exact:!0,path:"/login",render:function(e){return r.a.createElement(h,e)}}),r.a.createElement(T,{component:Y}))}}(a,n))},Ae=a(67),ie=a(134),le=a(64),se=a.n(le),ue=a(65),me=a.n(ue),ge=Object(Ae.a)({palette:{primary:se.a,secondary:me.a},status:{danger:"orange"}}),de={authenticated:!1,accessLevel:"",userFirstName:"",userLastName:"",username:"",userEmail:"",userPhoneNumber:"",userAddress:"",patients:void 0},Ee=r.a.createElement(ie.a,{theme:ge},r.a.createElement((function(e){var t=e.reducer,a=e.initialState,n=e.children;return r.a.createElement(i.Provider,{value:Object(c.useReducer)(t,a)},n)}),{reducer:function(e,t){switch(t.type){case"loginUser":return Object(n.a)({},e,{authenticated:!0,userFirstName:t.firstName,userLastName:t.lastName,username:t.username,userEmail:t.email,userPhoneNumber:t.phoneNumber,userAddress:t.address,accessLevel:t.accessLevel});case"logoutUser":return{authenticated:!1,userFirstName:"",userLastName:"",username:"",userEmail:"",userPhoneNumber:"",userAddress:"",accessLevel:"",patients:void 0};case"update":default:return console.log(Object(n.a)({},e,{},t)),Object(n.a)({},e,{},t)}},initialState:de},r.a.createElement(oe,null)));A.a.render(Ee,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},32:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAACAElEQVRYCcWWSyhEURjHZ7xCKcpChJLYkA2S1SyVhdWUrLBS2AgrsmEjj4UFOyUrFkrNwkaxUSwUDQsWFCGPvF95/f6Lk5qYuczMuf/6NWfOfOf7n7n3u989Ho/LSnTRvwhvrxsb8GJcAgOQCdYl0w14h2vb7gkYLsALfMIcWNUobo8g8zUoA2tqx+kGZL4LdWBN9Tidg8yPoBWsSBVfDocg81voB2vKxmkTZK6qnwRrUo8JwCtoA6r+LLAm/VtT8auMS605Y9QLut/651vgA2vy43QJMj+AJrCmapyOQebaRDdElIolJWJU+AA9bnmwAzJXqx0DR6okqg2U5L9KZ+EKvIE2MAuacyQViS7bhKPon4Nk+AwyX4ICcKwgkVp4BT2OV30HDjJ8AOVYhyr4k1Sl6s9KcAKN4FTq6eYFs8e4wenC0Lg+JnQFtAn17VqIJB8Bp6A1Z6C3XVSaYrW5j9uMC3/JpmIthn2QubrdEEStVDIsgpJ+wDKkQagymNBhQjGKnYZkiIlUvUquxE8wA6GaZ8IcqQKMc0IDov1eQwLTUNTPVeVGIwxMxWujFeaHWH/6Sahi1JW4gBboBFPxQcZxP1J1YWKOUdqMecHokW0GKxrH5R50JYRuidUjVQKGOrvrOKU+H/MjVRJJw0mPWgeo0dzBMLiifFxzXXGOt+kXALmBFR9Kh4gAAAAASUVORK5CYII="},35:function(e,t,a){e.exports=a.p+"static/media/logo.f8b070c0.png"},41:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAA+UlEQVRYCe2X6wqDMAyFy55uMNj7v8m2X1s6iMY2LScXkTEFsabJd44RWlrKea0deNPwSfdtDaWPKrtqVK3uelCkTrzovnez8cCVEFKjI7YJmSZgNpzY2R8HzExzwVi7uFnuQmEmzIgAIrXiG4qrhWni7MQCtOQyH3oiYCQHEhslzQRmcyOeK64JaTEXHC2S63ld13lt33sf2fiTXx3aPy4b7I+8HPoLZOt529Ziu/RyJjSbSzGDCCA5LjMWsCUXMuMBempUMxFQpPZrJgwgipvhLlT6aGaZCxTRNgQz4cRWAXiH2PLQkHkmYH+tCY4vz8OPZouTvxp8AOVwtCcOo/jzAAAAAElFTkSuQmCC"},43:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAACZLAAAmSwEM2kwxAAABy2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD53d3cuaW5rc2NhcGUub3JnPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoE1OjLAAACDElEQVRYCcWXvU7DMBSFnbiliAXxMyHRKunYgaFigQr1BXgCVlaehpWRJ0GVkICMXYtaJCaQYEEUmoRz0kRKIG6T1BZXsm7jOvd8vk6uYyHyTbLbcZxT13HfXNedtNvtI/Z1Op01el1mKwL57LeEdQm3KUKxHwbhACC94XD4pRNCBWARIBTW89yLD3gLHTe6IRYCBMHsDLIvoNkAwKcJiGimnGWO8TnwW62WY9u1e0x/B9eEWEdDcsTJaDQacDm4LOirZKoMMJjf7Xbr4/H4EZk4hOIr+iiuNROLMkAIQQjP875NZWIpgGmIQgAmIQoDmIIoBWACojSAbohFryG1co1vRdFXlONyg8SdlQB4b1EIjuv3+zUVRKUlSAfL1gn5gIDb+H+K1kAL/cA/RjG7xe+ossJnrHIGkijpTEhpH6B/gtZAqWZ5tqSsXcVjg9hn3MoAmWgVLpRrUzRWegkCP/Bw3xbaFNvVfAn82Xkci5ONvjPi68itlIG0OHdMRKQ4N6tInDsm1z9+CP+Ik6DyQ/hbXLVdJ+MolmeVAJKgOnbI0gA6xZmRUgC6xUsBmBAvDGBKvBCASfGlAKbFlwH862d5VDabzaYrpbxTFZlVzwTMgKoUh/xTyvo1avouLng003ogYXzaQgDMfI+DUCx4NNN2GmLMxFQA0fE8FOEFBr6D4MmyrZ6Oo1ginPgf+6jBSI+U8HwAAAAASUVORK5CYII="},49:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAAXElEQVQ4EWNgwANMTU2bQBiPEgYWfJJAOVkC8gxMhBQQkh81gIGB0cTEpIGRkVESR2A5QMUPYJP/////c4oDEZvBcDFgIpoPwnABLAyKXTBqAAPB3PgYS8CjCAEAoAkL+iECdvoAAAAASUVORK5CYII="},50:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAAJ0lEQVQ4EWNgGAXDIAQYTUxMGhgZGSXJ8cv///+fM5GjcVTPsAsBAMDjBSCOm/wqAAAAAElFTkSuQmCC"},59:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAgQAJCKQK5dBAAAB+0lEQVRIx5XTQUtUURgG4MdsIVRqpKll9ANKSisKydIsN/2CWghtWlS7oEUtQzctjAKDoJYGbloUFLXJKNQUtRCnsaJ1Njpozugi5rZwGmbUe8d5V/d88Lzn3Hu4lJJGzy2ZdbkklctBPyX0eitwq3R+wA9zDqPMI4E7pfFG381pyq7WKm6Xwr9ZcCxvUlLFPrMCcfUF022eCFwqzht8Na9bQmxDxRtfi/F6MQta0LxJRY9kNK8zI+l4dtVspaDikIRnUXyvaUkncuteQV5Fk1/i6sJ5rS8Wncyt7wrcc1RC3D5HzInbH85rfLboVMHuvdkXSYj7LaYhnO8xZUnrJhy6BWbWfc6CVBuz7Oy6w//PUYno3at9ktIewpuL8SqjUjpCeIv56MNXGZFyLoQfM29KTTivNCKtM5QvRPMdhqSdD+GtFk1G83dWXYzke8J5uSGBb56qxfp7b7Nk3G4RaROYNm5V3wZ+xh9j0ZxeyyrQJ62/gLdbNqpakUx6ARqkBfpz8w7LRlQV4w0yrmefb0hLu68GnVKGi3OuCNzMq+uz6rEL0j6qLM4ZlJFxNW8yZUbaB7u2wrdLemggr6JCTOD91vjaFXYpNyDjpmteSgm8s3NrnB4p1bo8kBHImNDjtPKtciasSAkkDboS9advnjIxK155bdjfUjH8A9fqwtXmzOP8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAyLTA0VDAwOjM2OjM0KzAwOjAwQiUZMgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMi0wNFQwMDozNjozNCswMDowMDN4oY4AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"},60:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAR8BKjVMAf9xAAAB3ElEQVRIx53UsWsUQRTH8c+FHCEXL7lgghaBFHaijYeKTUBbO8VOEYuAaPAfEPwLRGJnYSXWVlZik6iQMqWNEFFIcZqEHMrF8zIWN7fZy+1eNr5p3sy8+c7vvTe7ZNuUVR0hjo5VNcey+4KGL3E0BA+yA0dyFfDEmTgek6dgNPGqFlSS2XlccCvO6jiXzPhtVbMfVLORZFxkfDXdr+COeSvWClbokqvuWk4vfRBcLFziuuBT1y1FHXt4IxRG3FQypn2w8O5YFQiC92kFlNUtu2zRxpG3vzTvmo/p+7v2SrCAOc+dimu33YvenKfmwKZWNvmZ4AYeCpbi2qbt6C0JHqHkj+8Hh9IvsYFZtOh12WjS6Km4U1PWGA7YRXVAXzXuzMbIDMAPzMSwyUxAczggrWAQMBl3ZuJVxwYUUFA8hRwF2/4WTCFHQfDTLJrC/6VAw5iqfb8yAW2t4UVMVyEL0P0HHaGg14ey8b6dERMJYN/W0YDDZZwwYjcCtnSGpZANmIwlHFdJVyBLQfZLyPkSiqeQ08T8LuSlMAAY7QvrKVjXjmGfjUX0nnUDr+CwTev45gQmkgvK0aug5IVgMX2kdAjx1nXNfpEpqzhtx1mb+RpOem0n91fetuZK/4F/7tDOytfBWcoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDEtMzFUMDE6NDI6NTMrMDA6MDA2PkJ8AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTAxLTMxVDAxOjQyOjUzKzAwOjAwR2P6wAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="},61:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAR8BJDSlheJpAAABRUlEQVRIx9WTvUrDUBSAv9SAThk6iK4FJycdBMHBoYOZ7NAXECwEHRTUzVGXiOAkvoFDfACfoIJLFwfBSURwUWomHcxxsLFJetrcJlPP2ZL7fecnuTDxMTXG2QoHzPJYvNg6QoRXXOAiCBG75QQlFH+Ctukgy3z0KqbTMVU0VPwZ0gprADxkgT2+gBWcgbcPvAEOt6wi7HCVPeAjCPXcAeMuWhouuAYrrdJF+NRwE4FNgCCc2An8CLihCcxRGwK+8g3YXNMEzjhOVw+w1d33s5Oo7mebD7CBTo4iB4dpakNyq3cug5+m8FHh/nfhJx+HCF2qBh/O1XBoESG0lb8uG3UNtwCPSyzu2CAE5lkcQEPugRkueOJcc3uJLl7U3Tfy2usrNPydpfwVxQrTu6DENj9jXKaRisKCeJC14gLYZJ9KGcHExS9Al9DPI5GviwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMS0zMVQwMTozNjo1MiswMDowMLCZ/DEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDEtMzFUMDE6MzY6NTIrMDA6MDDBxESNAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="},62:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABLUlEQVRIDe2VMQ6CQBBFWbwBJFppBfQmehQbLaQh8RheQiuDhYkHUKLHsNIGzsARwD9mJ1kJwrIWNm4yGXZg9r+dHcCyfjzEF/q253lzys+y7AhXmKxlmyQhR/i+vxFCHMhwvUPMaK2eAQCJb5G3UnLHruuO8jw/I1Yq8dbLrgB14ixiBNEFwJaljlgRPobdYGMZI4ghKpFgrlUJXQDe+Zt4mqYRxE4Q7UNwqkBoH4cOAIurZx6TOARfnQ+IiylEG0CruNy1ZQrRBFAnvld3zuLsJcQA84mMtTbmJ4DahmsSVyCu1IiYazVmLQC6PcQCaxiPtzPn4AdfohJJFcJxnDvij2qOzterizivX8hq0WvKQ+u15IfpCMIgCJYI6EByXtXT/2IBm1Vv/OdcgSc294S155vKbgAAAABJRU5ErkJggg=="},63:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABS0lEQVRIDeVUO07EMBSMs1dIlIpt82lQEPdga2jQCiSOQcEZaEDLIUCcA7ZJSvrkChBmFluyvC8bx9JWuFj7vZ33Zt7YShT997UYMSAuy3KdJMlp3/dbYIYR3FQ6zvP8Osuys67rPqU+ogCSA/yslFqlaXoCEW9S8QQ7h3hCj3vgLjDMF/p8uDWxm2A8DMO3lV+zEWIRa+Hs444cCQ5iluii6ABt5+SorHV1PcMJiXzTtu0Deu2JEAUQCBGvIM1wPjciYOOSeamRxii49YjzrY7p5gvIGf+YnL2PCdhhQPZui8B91gdEGPI7Q6DJbxCL5MQdFECAp4ggci8BHiIibfusydmXS/1tXr/i49KV9mvfNE0zeucu0xwBrN2z2m7oc+c2nufJN+AWuG/C/B9CHiSARa6IUHIjPnSPq6q6KoriEg3mfCVD+Y5T9wuJMaEoxtOtiQAAAABJRU5ErkJggg=="},78:function(e,t,a){e.exports=a(101)},83:function(e,t,a){},84:function(e,t,a){},85:function(e,t,a){},91:function(e,t,a){},92:function(e,t,a){},93:function(e,t,a){},94:function(e,t,a){},95:function(e,t,a){},96:function(e,t,a){},97:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){}},[[78,1,2]]]);
//# sourceMappingURL=main.e78c8156.chunk.js.map