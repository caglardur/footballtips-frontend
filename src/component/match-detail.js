const MatchDetail = ({ match }) => {
  return (
    <div className="card">
      <div className="card-header">Match Detail</div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <div className="card border-0">
              <img src={match.teams.home.logo} className="img-fluid" alt={match.teams.home.name} />
              <div className="card-body">
                <h5 className="card-title text-center">{match.teams.home.name}</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-0">
              <img src={match.teams.away.logo} className="img-fluid" alt={match.teams.away.name} />
              <div className="card-body">
                <h5 className="card-title text-center">{match.teams.away.name}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchDetail
