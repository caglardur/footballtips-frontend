const LeagueName = ({ match }) => {
  return (
    <div className="col">
      <img src={match.league.flag || "/world.png"} className="me-2 mb-1" alt={match.league.country} height="14" />
      {match.league.country} - {match.league.name}
    </div>
  )
}

export default LeagueName
