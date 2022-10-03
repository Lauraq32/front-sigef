<template>
   <p>Clasificadores</p>
  <div>
    <div class="d-inline p-2">
      <CButton color="info " @click="IngresoReport">Imprimir Clasificadores de Ingresos</CButton>
    </div>
    <div class="d-inline p-2">
      <CButton color="info" @click="GastoReport">Imprimir Clasificadores de Gastos</CButton>
    </div>
  </div>
  <hr />
  <CTable responsive>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">Control</CTableHeaderCell>
        <CTableHeaderCell scope="col">Clasificador</CTableHeaderCell>
        <CTableHeaderCell scope="col">Cuenta Contable</CTableHeaderCell>
        <CTableHeaderCell scope="col">Cuenta Gastos</CTableHeaderCell>
        <CTableHeaderCell scope="col">Cuenta Ingreso</CTableHeaderCell>
        <CTableHeaderCell scope="col">Detalle</CTableHeaderCell>
        <CTableHeaderCell scope="col">Fuente</CTableHeaderCell>
        <CTableHeaderCell scope="col">Fuente especifica</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre Fuente</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre Fuente Especifica</CTableHeaderCell>
        <CTableHeaderCell scope="col">Organismo Financiero</CTableHeaderCell>
        <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell>11</CTableDataCell>
        <CTableDataCell>1</CTableDataCell>
        <CTableDataCell>IMPUESTOS --</CTableDataCell>
        <CTableDataCell>11</CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell>GENERAL</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell>12</CTableDataCell>
        <CTableDataCell>1</CTableDataCell>
        <CTableDataCell>CONTRIBUCIONES SOCIALES</CTableDataCell>
        <CTableDataCell>12</CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell>GENERAL</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell>13</CTableDataCell>
        <CTableDataCell>1</CTableDataCell>
        <CTableDataCell>DONACIONES</CTableDataCell>
        <CTableDataCell>13</CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell></CTableDataCell>
        <CTableDataCell>GENERAL</CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>
