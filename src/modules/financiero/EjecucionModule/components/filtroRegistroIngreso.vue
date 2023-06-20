<template>
  <CModal @close="closeFiltro" :visible="showFiltro" backdrop="static">
    <CModalHeader>
      <CModalTitle>Filtro</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="m-2">
        <CFormSelect v-model="filtroValue.etapa" @change="filtrarElementos">
          <option value="">Todas las etapas</option>
          <option value="ingreso">Ingreso</option>
          <option value="variacion">Variación</option>
          <option value="compromiso">Compromiso</option>
        </CFormSelect>
      </div>
      <div class="m-2">
        <CFormSelect v-model="filtroValue.estatus" @change="filtrarElementos">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </CFormSelect>
      </div>
      <div class="m-2">
        <CFormInput
          type="text"
          v-model="filtroValue.detalle"
          placeholder="Buscar por detalle"
        />
      </div>
      <div class="m-2">
        <CFormInput
          type="text"
          v-model="filtroValue.numeroComprobante"
          placeholder="Numero de comprobante"
        />
      </div>
    </CModalBody>

    <CModalFooter>
      <CButton @click="closeFiltro" type="button" color="primary">
        Filtrar
      </CButton>
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
    closeFiltro() {
      const result = Object.key(this.filtroValue).reduce((acc, key) => {
        if (this.filtroValue[key]) {
          acc[key] = this.filtroValue
        }
        return acc
      }, {})
      this.$emit('close', result)
    },
  },

  props: {
    showFiltro: Boolean,
  },
}
</script>
