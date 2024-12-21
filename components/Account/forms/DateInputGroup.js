import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { es } from 'date-fns/locale/es'
import { getYear, getMonth, format, setMonth } from 'date-fns'
import { CalendarIcon } from '@/components/Icons' // Importa tu ícono de calendario
import { capitalize } from '@/utils/capitalize'

// Estilizado del contenedor principal

const DateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  z-index: 9;

  label {
    font-size: 0.75rem;
    font-weight: 400;
    color: #9199a0;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    outline: none;
    background: none;
    width: 100%;
    font-size: 0.75rem;
    border-radius: 5px;
    height: 35px;
    border: 1px solid #ccc;
    padding: 5px 10px 4px;
    background-clip: padding-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    cursor: pointer;

    &:focus {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
      outline: none;
    }
  }
`

const Select = styled.select`
  flex-basis: 60%;
`

// Estilizado del ícono de calendario
const Calendar = styled(CalendarIcon)`
  position: absolute;
  top: 22px;
  right: 5px;
  pointer-events: none; /* Evita interacción con el ícono */
  color: #007bff; /* Color principal del ícono */
`

// Componente DateInputGroup
const DateInputGroup = ({
  label,
  selectedDate,
  onChange,
  placeholder = 'Selecciona una fecha',
  required = false,
  name,
}) => {
  // Función para generar un rango de años
  const range = (start, end) => {
    const years = []
    for (let i = start; i <= end; i++) {
      years.push(i)
    }
    return years
  }

  const getMonthNames = () => {
    return Array.from({ length: 12 }, (_, index) =>
      format(setMonth(new Date(), index), 'MMMM', { locale: es })
    )
  }

  const years = range(1900, getYear(new Date()) + 1, 1)
  const months = getMonthNames()

  return (
    <DateInputWrapper>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span style={{ color: '#d9534f' }}>*</span>}
        </label>
      )}
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {'<'}
            </button>
            <Select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {capitalize(option)}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        toggleCalendarOnIconClick
        id={name}
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat='dd/MM/yyyy'
      />
      <Calendar size={28} />
    </DateInputWrapper>
  )
}

export default DateInputGroup
