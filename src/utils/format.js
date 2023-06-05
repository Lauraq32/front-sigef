const formatPrice = (value) => {
  let val = (value / 1).toFixed(2).replace('.', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const formatDate = (fechaIngreso) => {
  return new Date(fechaIngreso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const estructura = (estructura) => {
  if (!estructura) return;
  const pnap = estructura.substring(0, 2);
  const programa = estructura.substring(2, 4);
  const proyecto = estructura.substring(4, 6);
  const actObra = estructura.substring(6, 10);
  return { pnap, programa, proyecto, actObra };
}

const getConfiguracionNomina = (configuracionNomina) => {
  var configuracionNominaIngreso = Object.keys(configuracionNomina).filter((text) => text.match(/textoing|textoegr/i)).reduce((acc, current) => {
    acc.push({
      index: current.slice(-2),
      key: current,
      value: configuracionNomina[current],
      type: current.match(/textoing/i) ? "ingreso" : "retencion",
      divide: configuracionNomina[`factorDivicion${current.slice(-5)}`],
      retention: configuracionNomina[`retencion${current.slice(-2)}Id`]
    });
    return acc;
  }, []);
  return configuracionNominaIngreso;
}

const formatNumber = (value) => {
  let val = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return val
}  

export { formatPrice, formatDate, estructura, getConfiguracionNomina , formatNumber }
