const SingleListItem = ({ match }) => {
  const matchDate = new Date(match.fixture.date)

  return (
    <div className="row">
      <div className="col-auto">{matchDate.toLocaleTimeString().slice(0, 5)}</div>
      <div className="col">{match.teams.home.name}</div>
      <div className="col-auto">-</div>
      <div className="col">{match.teams.away.name}</div>
    </div>
  )
}

export default SingleListItem
