<template>
  <AccionPersonalModal
    :showModal="showModal"
    :empleado="empleado"
    :accionPersonal="accionPersonalList"
    @closeModal="closeModal"
  />
</template>

<script>
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import { CModal } from '@coreui/vue'
import { CForm, CSmartTable } from '@coreui/vue-pro'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import ApiFiles from '@/modules/rrhh/RegistroPersonal/services/Files'
import AccionPersonalModal from '@/modules/rrhh/RegistroPersonal/components/Dialogos/AccionPersonalDialog.vue'

export default {
  name: 'AccionPersonalDialog',
  components: {
    CSmartTable,
    CModal,
    CForm,
    AccionPersonalModal,
  },

  data: function () {
    return {
      imageUrl: '',
      showAccionPersonalDialog: false,
      validatedCustom01: null,
      showDialogAgregarAccionesPersonal: false,
      accionPersonalList: [],
      tipoAcciones: [],
      toasts: [],
    }
  },

  computed: {
    fechaDesde: {
      get() {
        if (
          this.postAccionPersonal.fechaDesde !== null &&
          this.postAccionPersonal.fechaDesde?.toString() !== 'Invalid Date'
        ) {
          let date = this.postAccionPersonal.fechaDesde
          if (typeof this.postAccionPersonal.fechaDesde === 'string') {
            date = new Date(this.postAccionPersonal.fechaDesde)
            return date.toISOString().split('T')[0]
          }
        }
      },
      set(value) {
        return (this.postAccionPersonal.fechaDesde = new Date(
          `${value}T00:00:00`,
        ))
      },
    },

    fechaHasta: {
      get() {
        if (
          this.postAccionPersonal.fechaHasta !== null &&
          this.postAccionPersonal.fechaHasta?.toString() !== 'Invalid Date'
        ) {
          let date = this.postAccionPersonal.fechaHasta
          if (typeof this.postAccionPersonal.fechaHasta === 'string') {
            date = new Date(this.postAccionPersonal.fechaHasta)
            return date.toISOString().split('T')[0]
          }
        }
      },
      set(value) {
        return (this.postAccionPersonal.fechaHasta = new Date(
          `${value}T00:00:00`,
        ))
      },
    },
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.showAccionPersonalDialog = false
    },

    getTipoAcciones() {
      Api.getAllTipoAcciones().then((response) => {
        this.tipoAcciones = response.data.data
        this.postAccionPersonal.tipoAccionId = this.tipoAcciones[0].id
      })
    },

    clearAccionPersonal() {
      this.validatedCustom01 = null
      this.id = null
      this.postAccionPersonal = {
        fechaDesde: null,
        tipoAccionId: null,
        empleadoId: null,
        cantidad: null,
        fechaHasta: null,
        detalle: null,
      }
    },

    getAccionesPersonalById(item) {
      this.clearAccionPersonal()
      this.getTipoAcciones()
      Api.getAccionesPersonalById(item.id).then((response) => {
        this.postAccionPersonal = response.data.data
        this.id = item.id
      })
      this.showDialogAgregarAccionesPersonal = true
    },

    getAccionPersonalById(empleadoId) {
      Api.getAccionPersonalByID(empleadoId).then((response) => {
        this.accionPersonalList = response.data.data
      })
    },
  },
  watch: {
    empleado() {
      setTimeout(this.getAccionPersonalById(this.empleado.id), 10000)
      ApiFiles.getEmployeeIdentityImage({
        empleadoId: this.empleado.id,
        FileType: '.png',
        FileType2: 'png',
      }).then((url) => {
        this.imageUrl = url
      })
    },
  },

  props: {
    showModal: Boolean,
    empleado: Array,
  },
}
</script>
