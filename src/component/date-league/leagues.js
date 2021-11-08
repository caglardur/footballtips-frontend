import React, { useEffect } from "react"

const Leagues = ({ leagues }) => {
  const leagueList = document.getElementById("leageuList")
  var rect = leagueList.getBoundingClientRect()

  return (
    <div className="overflow-auto" style={{ maxHeight: window.innerHeight - rect.top - 50, overflow: "auto" }}>
      <ul className="list-group">
        {leagues.map(country => (
          <li className="list-group-item border-0" key={country.id}>
            <div className="col">
              <img src={country.flag} className="me-2 mb-1" alt={country.country} height="14" />
              {country.country}
            </div>
            <ul className="list-group">
              {country.leagues.map(league => (
                <li className="list-group-item list-group-item-action" key={league.id}>
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
