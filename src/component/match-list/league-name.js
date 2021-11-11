const LeagueName = ({ nowMatch }) => {
  return (
    <td colSpan={4} className="py-1 bg-light">
      <img src={nowMatch.league.flag || "/world.png"} className="me-2 mb-1" alt={nowMatch.league.country} height="14" />
      {nowMatch.league.country} - {nowMatch.league.name}
    </td>
  )
}

export default LeagueName
