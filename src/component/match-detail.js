import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { thatMatch, removeMatchDetail } from "../redux/set-match"
import { getConfigDetail } from "../redux/set-config"

import ConfigDetail from "./match-detail/configDetail"
import FinalScore from "./match-detail/finalScore"
import GoalAverage from "./match-detail/goalAverage"
import LastMatches from "./match-detail/lastMatches"
import LeagueName from "./match-detail/leagueName"
import MatchDate from "./match-detail/matchDate"
import OverUnder from "./match-detail/overUnder"
import Result from "./match-detail/result"
import BTTS from "./match-detail/bTTS"

const MatchDetail = () => {
  const [homeMatches, setHomeMatches] = useState(null)
  const [awayMatches, setAwayMatches] = useState(null)
  const matchDetail = useSelector(thatMatch)
  const configDetail = useSelector(getConfigDetail)
  const dispatch = useDispatch()

  let matchDate
  if (matchDetail) {
    matchDate = new Date(matchDetail.fixture.date)
  }

  useEffect(() => {
    const finisedArray = ["FT", "AET", "PEN"]
    if (matchDetail) {
      fetch(process.env.REACT_APP_DB_HOST + "matchesByTeams/" + matchDetail.teams.home.id + "/" + matchDetail.teams.away.id)
        .then(res => res.json())
        .then(data => {
          if (data.lastMatches) {
            data.lastMatches.sort((a, b) => {
              if (a.fixture.date > b.fixture.date) {
                return -1
              }
              if (a.fixture.date < b.fixture.date) {
                return +1
              }
              return 0
            })
          }
          const oldMatches = data.lastMatches.filter(match => new Date(match.fixture.date) < new Date(matchDetail.fixture.date))
          const finishedOldMatches = oldMatches.filter(match => finisedArray.includes(match.fixture.status.short))
          if (configDetail.league === true && configDetail.homeAway === false) {
            const sameLeagueMatchesHomeTeam = finishedOldMatches.filter(match => (match.league.id === matchDetail.league.id && match.teams.home.id === matchDetail.teams.home.id) || (match.league.id === matchDetail.league.id && match.teams.away.id === matchDetail.teams.home.id))
            const sameLeagueMatchesAwayTeam = finishedOldMatches.filter(match => (match.league.id === matchDetail.league.id && match.teams.home.id === matchDetail.teams.away.id) || (match.league.id === matchDetail.league.id && match.teams.away.id === matchDetail.teams.away.id))
            setHomeMatches([...sameLeagueMatchesHomeTeam])
            setAwayMatches([...sameLeagueMatchesAwayTeam])
          } else if (configDetail.league === true && configDetail.homeAway === true) {
            const sameLeagueMatchesHomeTeam = finishedOldMatches.filter(match => match.league.id === matchDetail.league.id && match.teams.home.id === matchDetail.teams.home.id)
            const sameLeagueMatchesAwayTeam = finishedOldMatches.filter(match => match.league.id === matchDetail.league.id && match.teams.away.id === matchDetail.teams.away.id)
            setHomeMatches([...sameLeagueMatchesHomeTeam])
            setAwayMatches([...sameLeagueMatchesAwayTeam])
          } else if (configDetail.league === false && configDetail.homeAway === true) {
            setHomeMatches([...finishedOldMatches.filter(match => match.teams.home.id === matchDetail.teams.home.id)])
            setAwayMatches([...finishedOldMatches.filter(match => match.teams.away.id === matchDetail.teams.away.id)])
          } else {
            setHomeMatches([...finishedOldMatches.filter(match => match.teams.home.id === matchDetail.teams.home.id || match.teams.away.id === matchDetail.teams.home.id)])
            setAwayMatches([...finishedOldMatches.filter(match => match.teams.home.id === matchDetail.teams.away.id || match.teams.away.id === matchDetail.teams.away.id)])
          }
        })
        .catch(err => console.log(err))
    }
  }, [matchDetail, configDetail])

  return (
    <div className="card rounded-0">
      <div className="card-header">
        <div className="row">
          <div className="col">Match Detail</div>
          <div className="col-auto" onClick={() => dispatch(removeMatchDetail())}>
            <button type="button" className="btn btn-sm btn-danger">
              Close
            </button>
          </div>
        </div>
      </div>
      {matchDetail ? (
        <div className="card-body">
          <div className="col">
            <LeagueName league={matchDetail.league} />
          </div>
          <div className="col">
            <MatchDate matchDate={matchDate} />
          </div>

          <div className="row d-flex justify-content-center mb-4">
            <div className="col-auto d-flex flex-column justify-content-between">
              <img src={matchDetail.teams.home.logo} className="img-fluid" alt={matchDetail.teams.home.name} style={{ maxHeight: "200px" }} />
              <h6 className="text-center mt-3">{matchDetail.teams.home.name}</h6>
            </div>
            <div className="col-auto align-self-center">{matchDetail.fixture.status.short === "FT" && <FinalScore goals={matchDetail.goals} />}</div>
            <div className="col-auto d-flex flex-column justify-content-between">
              <img src={matchDetail.teams.away.logo} className="img-fluid" alt={matchDetail.teams.away.name} style={{ maxHeight: "200px" }} />
              <h6 className="text-center mt-3">{matchDetail.teams.away.name}</h6>
            </div>
          </div>

          <div className="col mb-4">
            <ConfigDetail />
          </div>
          <div className="row">
            <div className="col-lg mb-4">
              <LastMatches lastMatches={homeMatches && homeMatches} team={matchDetail.teams.home} />
            </div>
            <div className="col-lg mb-4">
              <LastMatches lastMatches={awayMatches && awayMatches} team={matchDetail.teams.away} />
            </div>
          </div>

          <div className="row">
            <div className="col-lg mb-4">
              <OverUnder homeLastMatches={homeMatches && homeMatches} awayLastMatches={awayMatches && awayMatches} homeTeam={matchDetail.teams.home} awayTeam={matchDetail.teams.away} />
            </div>

            <div className="col-lg mb-4">
              <BTTS homeLastMatches={homeMatches && homeMatches} awayLastMatches={awayMatches && awayMatches} homeTeam={matchDetail.teams.home} awayTeam={matchDetail.teams.away} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg mb-4">
              <GoalAverage homeLastMatches={homeMatches && homeMatches} awayLastMatches={awayMatches && awayMatches} homeTeam={matchDetail.teams.home} awayTeam={matchDetail.teams.away} />
            </div>
            <div className="col-lg mb-4">
              <Result homeLastMatches={homeMatches && homeMatches} awayLastMatches={awayMatches && awayMatches} homeTeam={matchDetail.teams.home} awayTeam={matchDetail.teams.away} />
            </div>
          </div>

          <div className="col">Match Id: {matchDetail.fixture.id}</div>
        </div>
      ) : (
        <div className="spinner-border mx-auto my-4  text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  )
}

export default MatchDetail
