import React, { useEffect, useState } from "react"

import Date from "./date-league/date"
import Leagues from "./date-league/leagues"

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
        <Date />
      </div>
      <div className="col mt-2">
        <div className="card">
          <div className="card-header">League Picker</div>
          <ul className="list-group list-group-flush">
            {leagues && leagues.length > 0 ? (
              <Leagues leagues={leagues} />
            ) : (
              <div className="spinner-border mx-auto my-4  text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TimeLeague
