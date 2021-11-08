import React, { useEffect, useState } from "react"
import SingleListItem from "./match-list/singleListItem"

const MatchList = ({ matches }) => {
  const [match, setMatch] = useState(null)

  const selectedLeagues = document.getElementById("selectedLeagues")

  useEffect(() => {
    setMatch(matches)
  }, [matches])

  return (
    <div className="card mt-2 ">
      <div className="card-header">Match List</div>
      <div className="card-body overflow-auto" style={{ maxHeight: window.innerHeight - (selectedLeagues ? selectedLeagues.offsetHeight + 65 : 0), overflow: "auto" }}>
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
            {match ? (
              match.map(m => (
                <tr key={m.fixture.id}>
                  <SingleListItem match={m} />
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <div className="spinner-border mx-auto my-4  text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MatchList
