import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { addLeague, thatLeague } from "../../redux/set-leagues"

const Leagues = ({ leagues }) => {
  const matchLeague = useSelector(thatLeague)
  const dispatch = useDispatch()
  const leagueList = document.getElementById("leageuList")
  var rect = leagueList.getBoundingClientRect()

  const addLeageuToState = e => {
    const leageuFind = matchLeague.find(leageu => leageu.id === e.id)
    if (!leageuFind) {
      dispatch(addLeague(e))
    }
  }

  return (
    <div className="overflow-auto" style={{ maxHeight: window.innerHeight - rect.top - 50, overflow: "auto" }}>
      <ul className="list-group">
        {leagues.map(country => (
          <li className="list-group-item border-0" key={country.id}>
            <div className="col">
              <img src={country.flag || "/world.png"} className="me-2 mb-1" alt={country.country} height="14" />
              {country.country}
            </div>
            <ul className="list-group">
              {country.leagues.map(league => (
                <li className="list-group-item list-group-item-action" key={league.id} onClick={() => addLeageuToState({ league: league.league, id: league.id, country: country.country, flag: country.flag })}>
                  <span className="badge bg-secondary rounded-pill mx-3">{league.matchCount}</span>
                  {league.league}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Leagues
