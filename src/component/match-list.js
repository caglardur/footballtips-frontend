import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { thatLeague } from "../redux/set-leagues"
import { setMatchDetail, thatMatch } from "../redux/set-match"

import LeagueName from "./match-list/league-name"
import SingleListItem from "./match-list/singleListItem"

const MatchList = ({ matches }) => {
  const [match, setMatch] = useState(null)
  const [matchFilter, setMatchFilter] = useState("")
  const matchLeague = useSelector(thatLeague)
  const matchDetail = useSelector(thatMatch)
  const dispatch = useDispatch()

  useEffect(() => {
    const canceledMatchCode = ["SUSP", "INT", "PST", "CANC", "ABD", "AWD", "WO"]
    setMatch(null)
    if (matches && matches.length > 0) {
      if (matchLeague.length > 0) {
        if (matchFilter && matchFilter.length > 1) {
          const newFilterMatches = matches.filter(match => {
            const lowerHomeTeam = match.teams.home.name.toLowerCase()
            const lowerAwayTeam = match.teams.away.name.toLowerCase()
            const lowerFilter = matchFilter.toLowerCase()
            return lowerHomeTeam.includes(lowerFilter) || lowerAwayTeam.includes(lowerFilter)
          })
          const newMatchList = newFilterMatches.filter(match => matchLeague.some(league => league.id === match.league.id))
          const notCanceledMatches = newMatchList.filter(match => !canceledMatchCode.includes(match.fixture.status.short))
          setMatch(notCanceledMatches)
        } else {
          const newMatchList = matches.filter(match => matchLeague.some(league => league.id === match.league.id))
          const notCanceledMatches = newMatchList.filter(match => !canceledMatchCode.includes(match.fixture.status.short))
          setMatch(notCanceledMatches)
        }
      } else {
        if (matchFilter && matchFilter.length > 1) {
          const newFilterMatches = matches.filter(match => {
            const lowerHomeTeam = match.teams.home.name.toLowerCase()
            const lowerAwayTeam = match.teams.away.name.toLowerCase()
            const lowerFilter = matchFilter.toLowerCase()
            return lowerHomeTeam.includes(lowerFilter) || lowerAwayTeam.includes(lowerFilter)
          })
          const notCanceledMatches = newFilterMatches.filter(match => !canceledMatchCode.includes(match.fixture.status.short))
          setMatch(notCanceledMatches)
        } else {
          const notCanceledMatches = matches.filter(match => !canceledMatchCode.includes(match.fixture.status.short))
          setMatch(notCanceledMatches)
        }
      }
    }
  }, [matches, matchLeague, matchFilter])

  return (
    <div className="card rounded-0">
      <div className="card-header">
        <div className="row">
          <div className="col fs-6">Match List</div>
          <div className="col-auto">
            <div className="row position-relative">
              <div className="col-auto">
                <input type="text" className="form-control form-control-sm" value={matchFilter} placeholder={matchFilter || "Filter"} aria-label="Country" onChange={e => setMatchFilter(e.target.value)} />
              </div>
              {matchFilter && matchFilter.length > 0 && (
                <div className="col-auto position-absolute top-50 end-0 translate-middle-y">
                  <span type="button" className="material-icons md-24" onClick={() => setMatchFilter("")}>
                    clear
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {match ? (
        <div className="card-body overflow-auto">
          <ul className="list-group">
            {match.map((m, index) =>
              index === 0 ? (
                <div className="col" key={m.fixture.id}>
                  <div className="col mb-2">
                    <LeagueName match={m} />
                  </div>
                  <li type="button" className={matchDetail && matchDetail.fixture.id === m.fixture.id ? "list-group-item list-group-item-action bg-success text-white" : "list-group-item list-group-item-action"} onClick={() => dispatch(setMatchDetail(m))}>
                    <SingleListItem match={m} />
                  </li>
                </div>
              ) : m.league.id !== match[index - 1].league.id ? (
                <div className="col" key={m.fixture.id}>
                  <div className="col my-2">
                    <LeagueName match={m} />
                  </div>
                  <li type="button" className={matchDetail && matchDetail.fixture.id === m.fixture.id ? "list-group-item list-group-item-action bg-success text-white" : "list-group-item list-group-item-action"} onClick={() => dispatch(setMatchDetail(m))}>
                    <SingleListItem match={m} />
                  </li>
                </div>
              ) : (
                <li type="button" className={matchDetail && matchDetail.fixture.id === m.fixture.id ? "list-group-item list-group-item-action bg-success text-white border-top-0" : "list-group-item list-group-item-action border-top-0"} key={m.fixture.id} onClick={() => dispatch(setMatchDetail(m))}>
                  <SingleListItem match={m} />
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="spinner-border mx-auto my-4 text-secondary text-center" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  )
}

export default MatchList
