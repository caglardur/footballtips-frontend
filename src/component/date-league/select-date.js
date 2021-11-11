import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { newDate, thatDate } from "../../redux/set-date"

const SelectDate = () => {
  const matchDate = useSelector(thatDate)
  const dispatch = useDispatch()
  const toDay = new Date()
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let week = []

  const newDateFunction = i => {
    toDay.setDate(toDay.getDate() + i)
    dispatch(newDate(toDay.getFullYear() + "-" + (toDay.getMonth() + 1 > 9 ? toDay.getMonth() + 1 : "0" + toDay.getMonth() + 1) + "-" + (toDay.getDate() > 9 ? toDay.getDate() : "0" + toDay.getDate())))
  }

  for (let i = -1; i < 4; i++) {
    week.push(
      <button type="button" className={new Date(matchDate).getDate() === toDay.getDate() + i ? "col mx-1 px-1 btn btn-primary" : "col mx-1 px-1 btn btn-secondary"} key={i} onClick={() => newDateFunction(i)}>
        <div className="col fs-3">{toDay.getDate() + i < 10 ? "0" + (toDay.getDate() + i) : toDay.getDate() + i} </div>
        <div className="col">{month[toDay.getMonth() > 11 ? toDay.getMonth() - 12 : toDay.getMonth()]}</div>
      </button>
    )
  }

  return (
    <div className="card">
      <div className="card-header">Date Picker</div>
      <div className="card-body">
        <div className="row">{week.map(day => day)}</div>
      </div>
    </div>
  )
}

export default SelectDate
