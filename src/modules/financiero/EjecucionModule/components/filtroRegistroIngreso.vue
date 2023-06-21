<template>
  <CModal @close="() => closeFiltro()" :visible="showFiltro" backdrop="static">
    <CModalHeader>
      <CModalTitle>Filtro</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="m-2">
        <CFormLabel>Etapa</CFormLabel>
        <CFormSelect v-model="filtroValue.etapa" @change="filtrarElementos">
          <option value="">Todas las etapas</option>
          <option value="ingreso">Ingreso</option>
          <option value="variacion">Variación</option>
          <option value="compromiso">Compromiso</option>
        </CFormSelect>
      </div>
      <div class="m-2">
        <CFormLabel>Estatus</CFormLabel>
        <CFormSelect v-model="filtroValue.estatus" @change="filtrarElementos">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </CFormSelect>
      </div>
      <div class="m-2">
        <CFormLabel>Detalle</CFormLabel>
        <CFormInput
          type="text"
          v-model="filtroValue.detalle"
          placeholder="Buscar por detalle"
        />
      </div>
      <div class="m-2">
        <CFormLabel>Numero de Comprobante</CFormLabel>
        <CFormInput
          type="text"
          v-model="filtroValue.numeroComprobante"
          placeholder="Numero de comprobante"
        />
      </div>
    </CModalBody>

    <CModalFooter>
      <CButton @click="() => closeFiltro()" class="btn btn-secondary">
        Cancelar
      </CButton>
      <CButton @click="closeFiltro" color="info"> Filtrar </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
export default {
  name: 'filtroRegistroIngreso',

  data: () => {
    return {
      filtroValue: {
        etapa: null,
        detalle: null,
        numeroComprobante: null,
        estatus: 'activo',
      },
    }
  },

  methods: {
    closeFiltro(event) {
      if (!event) {
        this.$emit('close')
        return
      }
      const result = Object.keys(this.filtroValue).reduce((acc, key) => {
        if (this.filtroValue[key]) {
          acc[key] =
            key === 'estatus'
              ? this.filtroValue[key] === 'activo'
              : this.filtroValue[key]
        }
        return acc
      }, {})
      this.$emit('close', result)
      this.clearModal()
    },

    clearModal() {
      this.filtroValue = {
        etapa: null,
        detalle: null,
        numeroComprobante: null,
        estatus: 'activo',
      }
    },
  },

  props: {
    showFiltro: Boolean,
  },
}
</script>
