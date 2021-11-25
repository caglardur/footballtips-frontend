const BTTS = ({ homeLastMatches, awayLastMatches, homeTeam, awayTeam }) => {
  const homeLastSixMatches = homeLastMatches && homeLastMatches.slice(0, 6)
  const awayLastSixMatches = awayLastMatches && awayLastMatches.slice(0, 6)

  let homeYes = 0,
    homeNo = 0,
    awayYes = 0,
    awayNo = 0,
    ratioYes = 0,
    ratioNo = 0,
    total = 0

  if (homeLastSixMatches && awayLastSixMatches) {
    homeLastSixMatches.map(match => {
      if (match.score.fulltime.home > 0 && match.score.fulltime.away > 0) {
        return (homeYes += 1)
      } else {
        return (homeNo += 1)
      }
    })
    awayLastSixMatches.map(match => {
      if (match.score.fulltime.home > 0 && match.score.fulltime.away > 0) {
        return (awayYes += 1)
      } else {
        return (awayNo += 1)
      }
    })
    total = homeYes + awayYes + homeNo + awayNo
    ratioYes = (100 * (homeYes + awayYes)) / total
    ratioNo = (100 * (homeNo + awayNo)) / total
  }

  return (
    <div className="card bg-body shadow-sm overflow-hidden">
      <div className="card-header">
        <div className="row">
          <div className="col fw-bold">BTTS</div>
          <div className="col-auto">
            <div className="row">
              <div className="col bg-success rounded"></div>
              <div className="col">Yes</div>
              <div className="col bg-danger rounded"></div>
              <div className="col">No</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body col text-center bg-light bg-gradient">
        <div className="col-xxl mb-4">
          <div className="row">
            <div className="col">
              <div className="col mb-2 fs-6 text-center">{homeTeam && homeTeam.name}</div>
              <div className="row text-white d-flex justify-content-center">
                <div className="col-auto rounded bg-success m-1 py-2 px-3 fw-bold">{homeYes}</div>
                <div className="col-auto rounded bg-danger m-1 py-2 px-3 fw-bold">{homeNo}</div>
              </div>
            </div>
            <div className="col">
              <div className="col mb-2 fs-6 text-center">{awayTeam && awayTeam.name}</div>
              <div className="row text-white d-flex justify-content-center">
                <div className="col-auto rounded bg-success m-1 py-2 px-3 fw-bold">{awayYes}</div>
                <div className="col-auto rounded bg-danger m-1 py-2 px-3 fw-bold">{awayNo}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className={ratioYes > ratioNo ? "col-auto rounded p-2 bg-success bg-gradient text-center text-white" : ratioYes < ratioNo ? "col-auto rounded p-2 bg-danger bg-gradient text-center text-white" : "col-auto rounded p-2 bg-secondary bg-gradient text-center text-white"}>
            <div className="col fs-6">Both Team To Score</div>
            <div className="col fs-1">
              {ratioYes > ratioNo && "YES"}
              {ratioYes < ratioNo && "NO"}
              {ratioYes === ratioNo && "EQUAL"}
            </div>
            <div className="col fs-6">
              {ratioYes > ratioNo && ratioYes.toFixed(0)}
              {ratioYes < ratioNo && ratioNo.toFixed(0)}
              {ratioYes === ratioNo && "???"}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BTTS
