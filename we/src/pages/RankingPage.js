import React, { useEffect, useState } from 'react';
import { useStateValue } from '../state'
import '../css/RankingPage.scss'

const getRanking = (username, setRanking, setUserRank) => {
    fetch(`${window.location.origin}/getranking?user=${username}`)
    .then(response => {
        if(!response.ok) console.log(response.statusText)
        else response.json().then(ranking => {
            console.log(ranking)
            setRanking(ranking)
            setUserRank(ranking.findIndex(person => person.username === "YOU"))
        })
    }).catch(console.log)
}

const RankingPage = () => {

  const [{ username }, ] = useStateValue()
  const [userRank, setUserRank] = useState();
  const [ranking, setRanking] = useState([])

  useEffect(() => {
      getRanking(username, setRanking, setUserRank)
  }, [username])

  return (
    <div className="RankingPage">
        <div className="RankingPage__userDisplay">
            <label>YOUR RANK:</label>
            <span>{userRank !== undefined && userRank+1}</span>
            <label>YOUR SCORE:</label>
            <span>{ranking[userRank] && ranking[userRank].score}</span>
        </div>
        <div className="RankingPage__listArea">
            <div className="RankingPage__listArea--top">
                <div className="RankingPage__listArea--top--rankTwo">{ranking[1] && ranking[1].username}<span>2</span></div>
                <div className="RankingPage__listArea--top--rankOne">{ranking[0] && ranking[0].username}<span>1</span></div>
                <div className="RankingPage__listArea--top--rankThree">{ranking[2] && ranking[2].username}<span>3</span></div>
            </div>  
            <ul>
                {ranking.slice(3).map((person, i) =>
                    <li key={i} className="RankingPage__listArea--item">
                        <span className="RankingPage__listArea--item--rank">{i+4}</span>
                        <span className="RankingPage__listArea--item--name">{person.username}</span>
                        <span className="RankingPage__listArea--item--score">{person.score}</span>
                    </li>
                )}
            </ul>
        </div>
    </div>
  );
}

export default RankingPage;