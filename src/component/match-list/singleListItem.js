const SingleListItem = ({ match }) => {
  const matchDate = new Date(match.fixture.date)

  return (
    <>
      <th scope="row">{matchDate.toLocaleTimeString().slice(0, 5)}</th>
      <td>{match.teams.home.name}</td>
      <td>-</td>
      <td>{match.teams.away.name}</td>
    </>
  )
}

export default SingleListItem
