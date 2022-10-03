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
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow>
        <CTableHeaderCell scope="row">1</CTableHeaderCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row">2</CTableHeaderCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableHeaderCell scope="row">3</CTableHeaderCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
        <CTableDataCell>Cell</CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>
  export default{
    methods:{
    IngresoReport() {
      window.open(`http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Clasificadores_Ingreso&rs:Command=Render`, '_blank').focus();
    },
    GastoReport() {
      window.open(`http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Clasificadores_Gasto&rs:Command=Render`, '_blank').focus();
    },
  }
  }
</script>