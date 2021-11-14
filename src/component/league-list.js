import React, { useEffect, useState } from "react"

import Leagues from "./leagues/leagues"

const LeagueList = ({ matches }) => {
  const [leagues, setLeagues] = useState(null)

  useEffect(() => {
    let countryArray = []
    if (matches) {
      matches.map(match => {
        const countryIndex = countryArray.findIndex(country => country.country === match.league.country)
        if (countryIndex < 0) {
          return countryArray.push({ country: match.league.country, flag: match.league.flag, leagues: [{ league: match.league.name, id: match.league.id, matchCount: 1 }], id: countryArray.length })
        } else {
          const leagueIndex = countryArray[countryIndex].leagues.findIndex(league => league.id === match.league.id)
          if (leagueIndex < 0) {
            return countryArray[countryIndex].leagues.push({ league: match.league.name, id: match.league.id, matchCount: 1 })
          } else {
            return (countryArray[countryIndex].leagues[leagueIndex].matchCount += 1)
          }
        }
      })
    }

    countryArray.map(country => country.leagues.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)))
    countryArray.sort((a, b) => (a.country > b.country ? 1 : b.country > a.country ? -1 : 0))

    setLeagues([...countryArray])
  }, [matches])

  return (
    <div className="col">
      <div className="card rounded-0">
        <div className="card-header">
          <div className="col">League Picker</div>
        </div>
        {leagues && leagues.length > 0 ? (
          <div className="overflow-auto" style={{ height: window.innerHeight - 130, overflow: "auto" }}>
            <Leagues leagues={leagues} />
          </div>
        ) : (
          <div className="spinner-border mx-auto my-4  text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeagueList
