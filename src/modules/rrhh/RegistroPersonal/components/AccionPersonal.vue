<template>
  <AccionPersonalModal :showModal="showModal" :empleado="empleado" />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CForm, CSmartTable } from '@coreui/vue-pro'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import AccionPersonalModal from '@/modules/rrhh/RegistroPersonal/components/Dialogos/AccionPersonalDialog.vue'
import AgregarAccionPersonal from './Dialogos/AgregarAccionPersonalDialog.vue'

export default {
  name: 'AccionPersonalDialog',
  components: {
    CSmartTable,
    CModal,
    CForm,
    AccionPersonalModal,
    AgregarAccionPersonal,
  },

  data: function () {
    return {
      imageUrl: '',
      showAccionPersonalDialog: false,
      validatedCustom01: null,
      showDialogAgregarAccionesPersonal: false,
      accionPersonalList: [],
      toasts: [],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal(data) {
      alert(data)
      if (data) {
        this.submitAccionPersonal(data)
      }
      this.showAccionPersonalDialog = false
    },
  },

  props: {
    showModal: Boolean,
    empleado: Array,
  },
}
</script>
