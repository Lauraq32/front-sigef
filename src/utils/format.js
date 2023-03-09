const formatPrice = (value) => {
  let val = (value / 1).toFixed(2).replace('.', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const formatDate = (fechaIngreso) =>  {
    return new Date(fechaIngreso).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

export { formatPrice,formatDate }