import { State, City } from 'country-state-city'

export const loadStatesAndCities = (countries) => {
  const statesData = {}
  const citiesData = {}

  countries.forEach((country) => {
    const countryStates = State.getStatesOfCountry(country.isoCode)
    statesData[country.isoCode] = countryStates

    countryStates.forEach((state) => {
      citiesData[state.isoCode] = City.getCitiesOfState(
        country.isoCode,
        state.isoCode
      )
    })
  })

  return { statesData, citiesData }
}
