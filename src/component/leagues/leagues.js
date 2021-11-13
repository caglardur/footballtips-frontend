import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { addLeague, removeLeague, thatLeague } from "../../redux/set-leagues"

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

  console.log(matchLeague)

  return (
    <ul className="list-group">
      {leagues.map(country => (
        <li className="list-group-item border-0 pb-0" key={country.id}>
          <div className="col mb-1 ps-2">
            <img src={country.flag || "/world.png"} className="me-2 mb-1" alt={country.country} height="14" />
            {country.country}
          </div>
          <ul className="list-group">
            {country.leagues.map(league => (
              <li type="button" className={matchLeague.some(match => match.id === league.id) ? "list-group-item list-group-item-action  bg-success text-light" : "list-group-item list-group-item-action"} key={league.id} onClick={() => addLeageuToState({ league: league.league, id: league.id, country: country.country, flag: country.flag })}>
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
