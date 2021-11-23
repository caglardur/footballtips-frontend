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
        homeYes += 1
      } else {
        homeNo += 1
      }
    })
    awayLastSixMatches.map(match => {
      if (match.score.fulltime.home > 0 && match.score.fulltime.away > 0) {
        awayYes += 1
      } else {
        awayNo += 1
      }
    })
    total = homeYes + awayYes + homeNo + awayNo
    ratioYes = (100 * (homeYes + awayYes)) / total
    ratioNo = (100 * (homeNo + awayNo)) / total
  }

  return (
    <div className="card border-success">
      <div className="card-header">
        <div className="row">
          <div className="col">BTTS</div>
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
      <div className="card-body row text-center">
        <div className="col">
          <div className="col mb-2 fs-6 text-center">{homeTeam && homeTeam.name}</div>
          <div className="row text-white d-flex justify-content-center">
            <div className="col-sm-auto rounded bg-success m-1 py-2 px-3">{homeYes}</div>
            <div className="col-sm-auto rounded bg-danger m-1 py-2 px-3">{homeNo}</div>
          </div>
        </div>
        <div className="col">
          <div className="col mb-2 fs-6 text-center">{awayTeam && awayTeam.name}</div>
          <div className="row text-white d-flex justify-content-center">
            <div className="col-sm-auto rounded bg-success m-1 py-2 px-3">{awayYes}</div>
            <div className="col-sm-auto rounded bg-danger m-1 py-2 px-3">{awayNo}</div>
          </div>
        </div>
        <div className="col">
          <div className="col mb-2 fs-6 text-center">Combination</div>
          <div className="row text-white d-flex justify-content-center">
            <div className="col-sm-auto rounded bg-success m-1 py-2 px-3">{homeYes + awayYes}</div>
            <div className="col-sm-auto rounded bg-danger m-1 py-2 px-3">{homeNo + awayNo}</div>
          </div>
        </div>
        <div className="col">
          <div className="col mb-2 fs-6 text-center">Percent</div>
          <div className="col text-white d-flex justify-content-center">
            <div className="col-sm-auto rounded bg-success m-1 py-2 px-2">{ratioYes.toFixed(0)}%</div>
            <div className="col-sm-auto rounded bg-danger m-1 py-2 px-2">{ratioNo.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BTTS
