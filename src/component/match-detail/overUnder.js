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
        homeOver += 1
      } else if (match.score.fulltime.home + match.score.fulltime.away < 3) {
        homeUnder += 1
      }
    })
    awayLastSixMatches.map(match => {
      if (match.score.fulltime.home + match.score.fulltime.away > 2) {
        awayOver += 1
      } else if (match.score.fulltime.home + match.score.fulltime.away < 3) {
        awayUnder += 1
      }
    })
    total = homeOver + homeUnder + awayOver + awayUnder
    ratioOver = (100 * (homeOver + awayOver)) / total
    ratioUnder = (100 * (homeUnder + awayUnder)) / total
  }

  return (
    <div className="card border-success">
      <div className="card-header">
        <div className="row">
          <div className="col">Over/Under (2.5 goals)</div>
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
      <div className="card-body row text-center">
        <div className="col">
          <div className="col mb-2 fs-6 text-center">{homeTeam && homeTeam.name}</div>
          <div className="row text-white d-flex justify-content-center">
            <div className="col-sm-auto rounded bg-success m-1 py-2 px-3">{homeOver}</div>
            <div className="col-sm-auto rounded bg-danger m-1 py-2 px-3">{homeUnder}</div>
          </div>
        </div>
        <div className="col">
          <div className="col mb-2 fs-6 text-center">{awayTeam && awayTeam.name}</div>
          <div className="row text-white d-flex justify-content-center">
            <div className="col-sm-auto rounded bg-success m-1 py-2 px-3">{awayOver}</div>
            <div className="col-sm-auto rounded bg-danger m-1 py-2 px-3">{awayUnder}</div>
          </div>
        </div>
        <div className="col">
          <div className="col mb-2 fs-6 text-center">Combination</div>
          <div className="row text-white d-flex justify-content-center">
            <div className="col-sm-auto rounded bg-success m-1 py-2 px-3">{homeOver + awayOver}</div>
            <div className="col-sm-auto rounded bg-danger m-1 py-2 px-3">{homeUnder + awayUnder}</div>
          </div>
        </div>
        <div className="col">
          <div className="col mb-2 fs-6 text-center">Percent</div>
          <div className="col text-white d-flex justify-content-center">
            <div className="col-sm-auto rounded bg-success m-1 py-2 px-2">{ratioOver.toFixed(0)}%</div>
            <div className="col-sm-auto rounded bg-danger m-1 py-2 px-2">{ratioUnder.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverUnder
