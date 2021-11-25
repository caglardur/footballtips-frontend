const OverUnder = ({ homeLastMatches, awayLastMatches, homeTeam, awayTeam }) => {
  const homeLastSixMatches = homeLastMatches && homeLastMatches.slice(0, 6)
  const awayLastSixMatches = awayLastMatches && awayLastMatches.slice(0, 6)

  let homeOver = 0,
    homeUnder = 0,
    awayOver = 0,
    awayUnder = 0,
    ratioOver = 0,
    ratioUnder = 0,
    total = 0

  if (homeLastSixMatches && awayLastSixMatches) {
    homeLastSixMatches.map(match => {
      if (match.score.fulltime.home + match.score.fulltime.away > 2) {
        return (homeOver += 1)
      } else if (match.score.fulltime.home + match.score.fulltime.away < 3) {
        return (homeUnder += 1)
      } else {
        return false
      }
    })
    awayLastSixMatches.map(match => {
      if (match.score.fulltime.home + match.score.fulltime.away > 2) {
        return (awayOver += 1)
      } else if (match.score.fulltime.home + match.score.fulltime.away < 3) {
        return (awayUnder += 1)
      } else {
        return false
      }
    })
    total = homeOver + homeUnder + awayOver + awayUnder
    ratioOver = (100 * (homeOver + awayOver)) / total
    ratioUnder = (100 * (homeUnder + awayUnder)) / total
  }

  return (
    <div className="card bg-body shadow-sm overflow-hidden">
      <div className="card-header">
        <div className="row">
          <div className="col fw-bold">Over/Under (2.5 goals)</div>
          <div className="col-auto">
            <div className="row">
              <div className="col bg-success rounded"></div>
              <div className="col">Over</div>
              <div className="col bg-danger rounded"></div>
              <div className="col">Under</div>
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
                <div className="col-auto rounded bg-success m-1 py-2 px-3 fw-bold">{homeOver}</div>
                <div className="col-auto rounded bg-danger m-1 py-2 px-3 fw-bold">{homeUnder}</div>
              </div>
            </div>
            <div className="col">
              <div className="col mb-2 fs-6 text-center">{awayTeam && awayTeam.name}</div>
              <div className="row text-white d-flex justify-content-center">
                <div className="col-auto rounded bg-success m-1 py-2 px-3 fw-bold">{awayOver}</div>
                <div className="col-auto rounded bg-danger m-1 py-2 px-3 fw-bold">{awayUnder}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className={ratioOver > ratioUnder ? "col-auto rounded p-2 bg-success bg-gradient text-center text-white" : "col-auto rounded p-2 bg-danger bg-gradient text-center text-white"}>
            <div className="col fs-6">Over/Under (2.5 goals)</div>
            <div className="col fs-1">{ratioOver > ratioUnder ? "OVER" : "UNDER"}</div>
            <div className="col fs-6">{ratioOver > ratioUnder ? ratioOver.toFixed(0) : ratioUnder.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverUnder
