export function onlyLetter(event) {
  if (!/[a-z\s]+/i.test(event.key)) {
    event.preventDefault()
    return false
  }
}

export function onlyNumber(event) {
  if (!/[0-9]+/.test(event.key)) {
    event.preventDefault()
    return false
  }
}

export function onlyDecimal(event) {
  const value = !event.target.value
    ? event.key
    : `${event.target.value}${event.key}`
  if (
    !/^[0-9]+\.?\d*?$/.test(value) ||
    (event.key === '.' && event.target.value.indexOf('.') > -1)
  ) {
    event.preventDefault()
    return false
  }
}

export function maxLength(maxLen, callback) {
  return (event) => {
    if (event.target.value.length > maxLen) {
      return false
    }

    return callback(event)
  }
}

export function calculateAge(fechaNacimiento) {
  const current = new Date()
  const BOD = new Date(fechaNacimiento)
  let edad = current.getFullYear() - BOD.getFullYear()
  const mes = current.getMonth() - BOD.getMonth()

  if (mes < 0 || (mes === 0 && current.getDate() < BOD.getDate())) {
    edad--
  }

  return edad
}

export function filter(params) {
  let query = ''
  if (params) {
    const tags = Object.keys(params).reduce((list, key) => {
      if(params[key]){
        list.push(`${key}=${params[key]}`)
      }
      return list
    }, [])

    query = `?${tags.join('&')}`
  }
  return query
}
