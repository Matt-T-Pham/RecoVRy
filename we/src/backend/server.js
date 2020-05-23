const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const murmurhash = require('murmurhash')
const fetch = require('node-fetch')

const port = process.env.PORT || 3306;

const app = express();

const connection = mysql.createPool(
    {
        host: 'recovry2.chkom3myuy8n.us-east-1.rds.amazonaws.com',
        user: 'RecovryAdmin',
        password: 'RecovryPassword2019',
        database: 'innodb',
        multipleStatements: true
    }
);

vrIps = [];

const professions = ['Accountant','Actor','Actress','Air Traffic Controller','Architect','Artist','Attorney','Banker','Bartender','Barber','Bookkeeper','Builder','Businessman','Businesswoman','Businessperson','Butcher','Carpenter','Cashier','Chef','Coach','Dental Hygienist','Dentist','Designer','Developer','Dietician','Doctor','Economist','Editor','Electrician','Engineer','Farmer','Filmmaker','Fisherman','Flight Attendant','Jeweler','Judge','Lawyer','Mechanic','Musician','Nutritionist','Nurse','Optician','Painter','Pharmacist','Photographer','Physician','Physicians Assistant','Pilot','Plumber','Police Officer','Politician','Professor','Programmer','Psychologist','Receptionist','Salesman','Salesperson','Saleswoman','Secretary','Singer','Surgeon','Teacher','Therapist','Translator','Translator','Undertaker','Veterinarian','Videographer','Waiter','Waitress','Writer']
const adjectives = ['Adorable','Adventurous','Aggressive','Agreeable','Alert','Alive','Amused','Angry','Annoyed','Annoying','Anxious','Arrogant','Ashamed','Attractive','Average','Awful','Bad','Beautiful','Better','Bewildered','Bloody','Blue','Blue-eyed','Blushing','Bored','Brainy','Brave','Breakable','Bright','Busy','Calm','Careful','Cautious','Charming','Cheerful','Clean','Clear','Clever','Cloudy','Clumsy','Colorful','Combative','Comfortable','Concerned','Condemned','Confused','Cooperative','Courageous','Crazy','Creepy','Crowded','Cruel','Curious','Cute','Dangerous','Dark','Dead','Defeated','Defiant','Delightful','Depressed','Determined','Different','Difficult','Disgusted','Distinct','Disturbed','Dizzy','Doubtful','Drab','Dull','Eager','Easy','Elated','Elegant','Embarrassed','Enchanting','Encouraging','Energetic','Enthusiastic','Envious','Evil','Excited','Expensive','Exuberant','Fair','Faithful','Famous','Fancy','Fantastic','Fierce','Filthy','Fine','Foolish','Fragile','Frail','Frantic','Friendly','Frightened','Funny','Gentle','Gifted','Glamorous','Gleaming','Glorious','Good','Gorgeous','Graceful','Grieving','Grotesque','Grumpy','Handsome','Happy','Healthy','Helpful','Helpless','Hilarious','Homeless','Homely','Horrible','Hungry','Hurt','Ill','Important','Impossible','Inexpensive','Innocent','Inquisitive','Itchy','Jealous','Jittery','Jolly','Joyous','Kind','Lazy','Light','Lively','Lonely','Long','Lovely','Lucky','Magnificent','Misty','Modern','Motionless','Muddy','Mushy','Mysterious','Nasty','Naughty','Nervous','Nice','Nutty','Obedient','Obnoxious','Odd','Old-fashioned','Open','Outrageous','Outstanding','Panicky','Perfect','Plain','Pleasant','Poised','Poor','Powerful','Precious','Prickly','Proud','Putrid','Puzzled','Quaint','Real','Relieved','Repulsive','Rich','Scary','Selfish','Shiny','Shy','Silly','Sleepy','Smiling','Smoggy','Sore','Sparkling','Splendid','Spotless','Stormy','Strange','Stupid','Successful','Super','Talented','Tame','Tasty','Tender','Tense','Terrible','Thankful','Thoughtful','Thoughtless','Tired','Tough','Troubled','Ugliest','Ugly','Uninterested','Unsightly','Unusual','Upset','Uptight','Vast','Victorious','Vivacious','Wandering','Weary','Wicked','Wide-eyed','Wild','Witty','Worried','Worrisome','Wrong','Zany','Zealous']

const hashFunUsername = (username) => {
  const hashVal = murmurhash.v3(username)
  const adjective = adjectives[hashVal % adjectives.length]
  const profession = professions[hashVal % professions.length]
  return `${(['A', 'E', 'I', 'O', 'U'].includes(adjective.substring(0,1)) ? "An" : "A")} ${adjective} ${profession}`
}

var dailyInspiration = {imageUrl: "", quote: "", quoteAuthor: ""};

const getDailyPhoto = () => {
  fetch('https://api.unsplash.com/photos/random?query=nature&client_id=NqeM31mR0OApi4s_9bX_nDPfDvnO9ONaDK2gwnvwDVs')
  .then(response => {
    if(!response.ok) console.log(response.statusText)
    else response.json().then(json => {
      dailyInspiration.imageUrl = json.urls.regular
    })
  })
}

const getDailyQuote = () => {
  fetch('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
  .then(response => {
    if(!response.ok) console.log(response.statusText)
    else response.json().then(json => {
      dailyInspiration.quote = json.quoteText
      dailyInspiration.quoteAuthor = json.quoteAuthor
    }).catch(console.log)
  })
}

getDailyQuote()
getDailyPhoto()
setInterval(() => { getDailyQuote(); getDailyPhoto() }, 86400000);

/// Test googel drive save system /////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback,res) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client,res);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback, res) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client,res);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth,rest) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
    // console.log(files);
     // files.map((file) => {
       // console.log(`${file.name} (${file.id})`);
      //});
      rest.send(files);
    } else {
      console.log('No files found.');
    }
  });
}

app.get('/testfilesystem', (req, res) =>{
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
   authorize(JSON.parse(content), listFiles, res);

  });
  
})
///End Test google drive system //////////////////////////////////////////////////////////
// connection.query('SELECT * FROM innodb.user', function(err, data){
//   (err) ? console.log(err) :
//   console.log(data.map(rowDataPacket => rowDataPacket.last_name));
// });

// require('./routes/html-routes')(app);

app.use(express.static(path.join(__dirname, '../../build')))
app.use(bodyParser.json());
app.use(bodyParser.text({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({
  extended: true
}));

ipsTopins={}

app.put('/vrStartupPin', (req,res)=>{
  ipsTopins[req.body]= {sendto:res,idofstarter:0};
})
app.get('/vrStartupPin', (req,res)=>{
  
})
app.post('/vrStartupPin', (req,res)=>{
  if(ipsToPins[req.body]){
    connection.query('SELECT exercisename, username, u.id FROM innodb.user AS u JOIN innodb.assignment AS a ON u.id = a.pid JOIN innodb.workout_exercises AS w ON a.wid = w.wid JOIN innodb.exercise AS e ON w.eid = e.eid WHERE  username = ?)', req.query.user, (err, data) => {
    console.log(data)
    if (err) console.log(err)
    else {
      if (data[0]) {
        //connection.query(`UPDATE innodb.user SET start = FALSE WHERE username = ?`, data[0].username)
        console.log(data[0].username)
        ipsToPins[req.body].send(data)
        res.send("1");
      } else {
        res.send("0")
      }
    }
  })
  }
})

app.post('/connectvr', (req, res) => {
  console.log("Post Connect VR");
  console.log(req.body);
  connection.query("Insert into innodb.exercise values(NULL, 'Zachary',?)",  req.body, (err)=>{
    if (err) res.send(err);
    res.send("Gucci")
  });
})

app.put('/connectvr', (req, res) => {
  console.log("Put Connect VR");
  console.log(req.body);
  connection.query("update innodb.user set innodb.user.pin = ? where innodb.user.username = 'johnnny'", req.body, (err)=>{
    if (err) res.send(err);
    res.send("Gucci")
  });
})
app.get('/dailyinspiration', (_, res) => res.send(dailyInspiration))

app.get('/connectvr', (req, res) => {
  // vrIps.push(req.connection.remoteAddress)
  // res.send("Successfully Connected")
  //  SELECT exercisename ,username FROM   innodb.user AS u JOIN innodb.assignment AS a ON u.id = a.pid JOIN innodb.workout_exercises AS w ON a.wid = w.wid JOIN innodb.exercise AS e ON w.eid = e.eid WHERE  start= true
  console.log("Get Connect VR");
  connection.query('SELECT exercisename, recording, username FROM innodb.user AS u JOIN innodb.assignment AS a ON u.id = a.pid JOIN innodb.workout_exercises AS w ON a.wid = w.wid JOIN innodb.exercise AS e ON w.eid = e.eid WHERE  start= true', (err, data) => {
    console.log(data)
    if (err) console.log(err)
    else {
      if (data[0]) {
        connection.query(`UPDATE innodb.user SET start = FALSE WHERE username = ?`, data[0].username)
        console.log(data[0].username)
        res.send(data)
      } else {
        res.send("#")
      }
    }
  })
})

app.get('/getpatientnames', (req, res) => {
  connection.query(`SELECT first_name, last_name, username FROM innodb.user JOIN innodb.relationship ON ID = PID WHERE TID = (SELECT ID FROM innodb.user WHERE username = ?)`, req.query.user, (err, data) => {
    if (err) console.log(err)
    else res.send(data.map(user => {return {firstName: user.first_name, lastName: user.last_name, username: user.username}}))
  })
})

app.get('/getpatients', (req, res) => {
  connection.query(`SELECT first_name, last_name, username FROM innodb.user JOIN innodb.relationship ON ID = PID WHERE TID = (SELECT ID FROM innodb.user WHERE username = ?)`, req.query.user, (err, data) => {
    if (err) console.log(err)
    else {
      connection.query(`SELECT WID, name, username FROM innodb.user JOIN (innodb.assignment NATURAL JOIN innodb.workout) ON ID = PID WHERE username IN (?)`, [data.map(p => p.username)], (err2, data2) => {
        if (err2) console.log(err2)
        else {
          res.send(data.map((patient) => {
            const workouts = data2.filter(d => d.username === patient.username).map(d => { return { id: d.WID, name: d.name } })
            return { firstName: patient.first_name, lastName: patient.last_name, username: patient.username, workouts: workouts }
          }))
        }
      })
    }
  })
})

app.get('/getranking', (req, res) => {
  connection.query('SELECT username, ranking_group, IFNULL(workouts_done/workouts_assigned, 0) AS compliance FROM innodb.user WHERE ranking_group = (SELECT ranking_group FROM innodb.user WHERE username = ?) ORDER BY compliance DESC', req.query.user, (err, data) => {
    if(err) console.log(err)
    else {
      res.send(JSON.stringify(data.map(ranking => {
        return {
          username: req.query.user === ranking.username ? "YOU" : hashFunUsername(ranking.username),
          score: ranking.compliance * 100000
        }
      })))
    }
  })
})

app.get('/getlogs', (req, res) => {
  connection.query('SELECT name, date, avg(score) AS score FROM innodb.log JOIN innodb.workout ON log.WID = workout.WID WHERE PID = (SELECT ID FROM user WHERE username = ?) GROUP BY log.WID, log.date', req.query.user, (err, data) => {
    if(err) console.log(err)
    else res.send(JSON.stringify(data))
  })
})

app.get('/getassignments', (req, res) => {
  connection.query('SELECT name, schedule, date_assigned FROM innodb.assignment JOIN innodb.workout ON assignment.WID = workout.WID WHERE PID = (SELECT ID FROM user WHERE username = ?);', req.query.user, (err, data) => {
    if(err) console.log(err)
    else res.send(JSON.stringify(data))
  })
})

app.get('/getcreatedworkouts', (req, res) => {
  connection.query(`SELECT WID, name FROM innodb.workout NATURAL JOIN innodb.created_workout WHERE TID = (SELECT ID FROM innodb.user WHERE username = ?)`, req.query.user, (err, data) => {
    if (err) console.log(err)
    else {
      res.send(data.map(row => { return { id: row.WID, name: row.name } }))
    }
  })
})

app.get('/getcreatedexercises', (req, res) => {
  connection.query(`SELECT EID, ExerciseName FROM innodb.exercise NATURAL JOIN innodb.created_exercise WHERE TID = (SELECT ID FROM innodb.user WHERE username = ?) OR generic = TRUE`, req.query.user, (err, data) => {
    if(err) console.log(err)
    else {
      res.send(data.map(row => {return {id: row.EID, name: row.ExerciseName}}))
    }
  })
})

app.get('/getassignedworkouts', (req, res) => {
  connection.query(`SELECT WID, name, schedule FROM innodb.workout NATURAL JOIN innodb.assignment WHERE PID = (SELECT ID FROM innodb.user WHERE username = ?)`, req.query.user, (err, data) => {
    if (err) console.log(err)
    else {
      res.send(data.map(row => { return { id: row.WID, name: row.name, schedule: row.schedule } }))
    }
  })
})

app.post('/startvr', (req, res) => {
  // if(vrIps.includes(req.connection.remoteAddress)) {
  //   fetch(`http://${req.connection.remoteAddress}/startvr`).then((res, err) => {
  //     if(err) console.log(err)
  //     else {
  //       res.send("Give us just a sec, we're starting your VR experience!")
  //     }
  //   })
  // } else {
  //   res.send("We looked really hard, but we couldn't find a VR application connected to your account :(")
  // }
  console.log(req.body);
  connection.query(`UPDATE innodb.user SET start = TRUE WHERE username = ?`, req.body.username, (err) => { err && console.log(err) })
})

// app.get('*.ico', function () { })

app.get('*', (req, res) => {
  pathname = `${__dirname}/../../build/index.html`
  res.sendFile(path.resolve(pathname))
})

app.post('/login', (req, res) => {
  console.log(req.body);
  const username = req.body.username
  const password = req.body.password

  connection.query(`SELECT password, first_name, last_name, email, phone_number, address, access_level FROM innodb.user WHERE username = ?`, username, (err, data) => {
    if (err) console.log(err)
    else {
      console.log(data);
      res.header('Content-Type', 'application/json')
      if (password === (data[0] && data[0].password)) {
        res.send(JSON.stringify({
          isAuth: true,
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          email: data[0].email,
          phoneNumber: data[0].phone_number,
          address: data[0].address,
          accessLevel: data[0].access_level
        }))
      } else {
        res.send(JSON.stringify({ isAuth: false }))
      }
    }
  })
})

app.post('/edituser', (req, res) => {
  console.log(req.body)
  connection.query(`UPDATE innodb.user SET email = ?, phone_number = ?, address = ? WHERE username = ?`,
  [req.body.email, req.body.phoneNumber, req.body.address, req.body.username],
  (err,) => {
    if(err) console.log(err)
    else res.send("peace")
  })
})

app.post('/changepassword', (req, res) => {
  connection.query(`UPDATE innodb.user SET password = ? WHERE username = ?`,
  [req.body.newPassword, req.body.username],
  (err,) => {
    if(err) console.log(err)
    else res.send("peace")
  })
})

app.put('/adduser', (req, res) => {
  connection.query(`INSERT INTO innodb.user VALUES (NULL, ?, ?, ?, ?, ?, ?, NULL, 0, ?, ?, 0, 0, 0, NULL)`, 
  [req.body.lastName, req.body.firstName, req.body.email, req.body.phoneNumber, req.body.address, req.body.accessLevel, req.body.username, req.body.password],
  (err, ) => {
    if (err) console.log(err);
    else {
      connection.query(`INSERT INTO innodb.relationship VALUES((SELECT ID FROM innodb.user WHERE username = ?), (SELECT ID FROM innodb.user WHERE username = ?))`, 
      [req.body.therapistsUser, req.body.username],
      (err, data) => {
        if (err) console.log(err);
        else {
           res.send("Yay");
        }
      })
    }
  })
})

app.put('/assignworkout', (req, res) => {
  connection.query(`INSERT INTO innodb.assignment VALUES ((SELECT ID FROM innodb.user WHERE username = ?), ?, ?, ?)`, 
  [req.body.username, req.body.WID, req.body.schedule, new Date()],
  (err, ) => {
    if (err) console.log(err);
    else res.send(`Successfully assigned workout ${req.body.WID} to ${req.body.username}`)
  })
})

app.put('/addnewworkout', (req, res) => {
  connection.query(`INSERT INTO innodb.workout VALUES (NULL, ?)`, req.body.name, (err, result) => {
      if(err) console.log(err);
      else {
        let sqlQuery = `USE innodb;INSERT INTO created_workout VALUES ((SELECT ID FROM user WHERE username = "${req.query.user}"), ${result.insertId});`
        req.body.exercises.forEach((exercise, idx) => {
          sqlQuery += `INSERT INTO workout_exercises VALUES (${result.insertId}, ${exercise.id}, NULL, ${exercise.reps}, ${idx});`
        })
        connection.query(sqlQuery, (err) => {
          if(err) console.log(err);
          else res.send({id: result.insertId, name: req.body.name})
      })
    }
  })
})

app.delete('/deleteuser', (req, res) => {
  connection.query(`DELETE FROM innodb.user WHERE username = ?`, req.query.user, (err, ) => {
    if (err) console.log(err);
    else res.send(`Successfully removed user ${req.query.user}`);
  })
})

app.delete('/removeassignedworkout', (req, res) => {
  connection.query(`DELETE FROM innodb.assignment WHERE PID = (SELECT ID FROM innodb.user WHERE username = ?) AND WID = ?`, 
  [req.query.user, req.query.WID],
  (err, ) => {
    if (err) console.log(err);
    else res.send(`Successfully removed workout ${req.query.WID} from ${req.query.user}`)
  })
})

app.listen(port, () => { console.log(`App running on port ${port}`); });


