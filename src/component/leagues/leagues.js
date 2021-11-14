import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { addLeague, removeLeague, removeAllLeagues, thatLeague } from "../../redux/set-leagues"

const Leagues = ({ leagues }) => {
  const matchLeague = useSelector(thatLeague)
  const dispatch = useDispatch()

  const addLeageuToState = e => {
    const leageuFind = matchLeague.find(leageu => leageu.id === e.id)
    if (!leageuFind) {
      dispatch(addLeague(e))
    } else {
      dispatch(removeLeague(e))
    }
  }

  return (
    <ul className="list-group">
      <li className="list-group-item border-0">
        <ul className="list-group">
          {matchLeague.length > 0 &&
            matchLeague.map(league => (
              <li className="list-group-item list-group-item-action bg-success text-light rounded-0" key={league.id}>
                <div className="row">
                  <div className="col-md-auto">
                    <img src={league.flag || "/world.png"} className="mb-1" alt={league.country} height="14" />
                  </div>
                  <div className="col text-nowrap overflow-hidden mx-0 px-0">{league.league}</div>
                  <div className="col-md-auto">
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => dispatch(removeLeague(league))} />
                  </div>
                </div>
              </li>
            ))}
          {matchLeague.length > 1 && (
            <div className="col-md-auto my-1 align-self-end">
              <button type="button" className="btn btn-sm btn-danger rounded-0 " onClick={() => dispatch(removeAllLeagues())}>
                Clear All
              </button>
            </div>
          )}
        </ul>
      </li>
      {leagues.map(country => (
        <li className="list-group-item border-0 pb-0" key={country.id}>
          <div className="col mb-1 ps-2">
            <img src={country.flag || "/world.png"} className="me-2 mb-1" alt={country.country} height="14" />
            {country.country}
          </div>
          <ul className="list-group">
            {country.leagues.map(league => (
              <li type="button" className={matchLeague.some(match => match.id === league.id) ? "list-group-item list-group-item-action rounded-0  bg-success text-light" : "list-group-item list-group-item-action rounded-0"} key={league.id} onClick={() => addLeageuToState({ league: league.league, id: league.id, country: country.country, flag: country.flag })}>
                <div className="row">
                  <div className="col">{league.league}</div>
                  <div className="col-md-auto">
                    <span className="badge bg-danger rounded-pill">{league.matchCount}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default Leagues
