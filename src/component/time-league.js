import React, { useEffect, useState } from "react"
const TimeLeague = ({ matches }) => {
  const [leagues, setLeagues] = useState(null)

  let countryArray = []

  useEffect(() => {
    if (matches) {
      matches.map(match => {
        const countryIndex = countryArray.findIndex(country => country.country === match.league.country)
        if (countryIndex < 0) {
          countryArray.push({ country: match.league.country, flag: match.league.flag, leagues: [{ league: match.league.name, id: match.league.id, matchCount: 1 }] })
        } else {
          const leagueIndex = countryArray[countryIndex].leagues.findIndex(league => league.id === match.league.id)
          if (leagueIndex < 0) {
            countryArray[countryIndex].leagues.push({ league: match.league.name, id: match.league.id, matchCount: 1 })
          } else {
            countryArray[countryIndex].leagues[leagueIndex].matchCount += 1
          }
        }
      })
    }

    countryArray.map(match => match.leagues.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)))
    countryArray.sort((a, b) => (a.country > b.country ? 1 : b.country > a.country ? -1 : 0))

    setLeagues(countryArray)
  }, [matches])

  return (
    <div className="col">
      <div className="col mt-2">
        <div className="card">
          <div className="card-header">Date Picker</div>
          <div className="card-body">
            <p className="card-text">Select a date.</p>
            <a href="#" className="btn btn-primary">
              Set
            </a>
          </div>
        </div>
      </div>
      <div className="col mt-2">
        <div className="card">
          <div className="card-header">League Picker</div>
          <ul className="list-group list-group-flush">
            {leagues &&
              leagues.length > 0 &&
              leagues.map(country => (
                <li className="list-group-item">
                  <img src={country.flag} className="rounded mx-auto my-auto" alt={country.country} height="14" />
                  {country.country}
                  <ul className="list-group list-group-flush">
                    {country.leagues.map(league => (
                      <li className="list-group-item d-flex justify-content-start align-items-center text-start ">
                        <div className="col">{league.league}</div>
                        <span className="badge bg-primary rounded-pill">{league.matchCount}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TimeLeague
