import React, { useEffect } from "react"

const Leagues = ({ leagues }) => {
  console.log(window.innerHeight)
  const leagueList = document.getElementById("leageuList")
  var rect = leagueList.getBoundingClientRect()
  console.log(rect.top)

  return (
    <div className="overflow-auto" style={{ maxHeight: window.innerHeight - rect.top - 50, overflow: "auto" }}>
      {leagues.map(country => (
        <ul className="list-group  list-group-flush border-bottom">
          <li className="list-group-item">
            <div className="col">
              <img src={country.flag} className="me-2 mb-1" alt={country.country} height="14" />
              {country.country}
            </div>
          </li>
          {country.leagues.map(league => (
            <li className="list-group-item list-group-item-action">
              <span className="badge bg-secondary rounded-pill mx-3">{league.matchCount}</span>
              {league.league}
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default Leagues
