import React, { useEffect, useState } from "react"
import LeagueName from "./match-list/league-name"
import SingleListItem from "./match-list/singleListItem"

const MatchList = ({ matches }) => {
  const [match, setMatch] = useState(null)

  useEffect(() => {
    setMatch(matches)
  }, [matches])

  return (
    <div className="card">
      <div className="card-header">Match List</div>
      {match ? (
        <div className="card-body overflow-auto" style={{ maxHeight: window.innerHeight - 130, overflow: "auto" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Home Team</th>
                <th scope="col"></th>
                <th scope="col">Away Team</th>
              </tr>
            </thead>
            <tbody>
              {match.map((m, index) => (
                <>
                  {index === 0 ? (
                    <tr key={m.fixture.id + m.fixture.country}>
                      <LeagueName nowMatch={m} />
                    </tr>
                  ) : (
                    m.league.id !== match[index - 1].league.id && (
                      <tr key={m.fixture.id + m.fixture.country}>
                        <LeagueName nowMatch={m} />
                      </tr>
                    )
                  )}
                  <tr key={m.fixture.id}>
                    <SingleListItem match={m} />
                  </tr>
                </>
              ))}
            </tbody>
          </table>
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
