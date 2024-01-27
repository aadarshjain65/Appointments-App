import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentsList
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: new Date(dateInput),
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filterAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1 className="heading"> Add Appointment </h1>
          <div className="add-appointments-container">
            <form className="add-apointment" onSubmit={this.onAddAppointment}>
              <label className="label" htmlFor="title">
                {' '}
                TITLE{' '}
              </label>
              <input
                type="text"
                id="title"
                className="title-input"
                value={titleInput}
                onChange={this.onChangeTitle}
                placeholder="Title"
                autoComplete="OFF"
              />
              <label className="label" htmlFor="date">
                {' '}
                DATE{' '}
              </label>
              <input
                type="date"
                id="date"
                className="date-input"
                value={dateInput}
                onChange={this.onChangeDate}
                placeholder="dd/mm/yyyy"
              />
              <button type="submit" className="add-btn">
                {' '}
                Add{' '}
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointments-img"
              alt="appointments"
            />
          </div>
          <hr className="appointment-line" />
          <div className="appointment-starred-container">
            <h1 className="appointment-heading"> Appointments </h1>
            <button
              type="button"
              className={`starred-btn ${filterClassName}`}
              onClick={this.onClickFilter}
            >
              {' '}
              Starred{' '}
            </button>
          </div>
          <ul className="appointments-list">
            {filterAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
                starredAppointments={this.getStarredAppointments}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
