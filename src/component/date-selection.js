import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { newDate, thatDate } from "../redux/set-date"

const DateSelection = () => {
  const matchDate = useSelector(thatDate)
  const dispatch = useDispatch()
  const toDay = new Date()
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let week = []

  const newDateFunction = i => {
    toDay.setDate(toDay.getDate() + i)
    dispatch(newDate(toDay.getFullYear() + "-" + (toDay.getMonth() + 1 > 9 ? toDay.getMonth() + 1 : "0" + toDay.getMonth() + 1) + "-" + (toDay.getDate() > 9 ? toDay.getDate() : "0" + toDay.getDate())))
  }

  for (let i = -2; i < 4; i++) {
    week.push(
      <div type="button" className={new Date(matchDate).getDate() === toDay.getDate() + i ? "col px-5 pt-1 ms-1 text-center bg-white text-dark rounded-0 rounded-top " : "col px-5 mt-1 ms-1 text-center bg-dark text-light rounded-0 rounded-top opacity-50"} key={i} onClick={() => newDateFunction(i)}>
        <div className="col fs-4 fw-bold lh-sm">{toDay.getDate() + i < 10 ? "0" + (toDay.getDate() + i) : toDay.getDate() + i} </div>
        <div className="col lh-sm pb-2">{month[toDay.getMonth() > 11 ? toDay.getMonth() - 12 : toDay.getMonth()]}</div>
      </div>
    )
  }
  return <div className="row mt-2">{week.map(day => day)}</div>
}

export default DateSelection
