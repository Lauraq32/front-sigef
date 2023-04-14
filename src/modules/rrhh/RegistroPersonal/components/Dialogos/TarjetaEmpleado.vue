<template>
    <CModal :visible="newTarjetaEmpleadoModal" backdrop="static" style="width: 25%">
      <CModalHeader>
        <CModalTitle>Tarjeta Empleado</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CCardBody>
       <img :src="imageUrl" alt="">
      </CCardBody>
    </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          data-bs-dismiss="modal"
          @click="closeModal"
        >
          Cerrar
        </CButton>
        <!-- <CButton 
          color="primary" @click="saveProfesion">
          Guardar
        </CButton> -->
      </CModalFooter>
    </CModal>
  </template>
  <script>
  import { CModalFooter, CSmartTable } from '@coreui/vue-pro'
  import { CModal } from '@coreui/vue'
  import Api from '../../services/RegistroPersonalServices'

  export default {
  name: 'TarjetaEmpleadoDialogs',
  components: {
    CSmartTable,
    CModal,
    CModalFooter
},

  data: function () {
    return {
        imageUrl: 'https://imgd.aeplcdn.com/393x221/n/cw/ec/1/versions/ktm-rc-200-standard1676900452795.jpg?q=75'
    //   profesionFormValidated: false,
    //   profesionObject: {
    //     name: '',
    //   },
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    // saveProfesion() {
    //   this.profesionFormValidated = false;
    //   if (this.$refs.formRef.$el.checkValidity()) {
    //     this.$emit('post-profesiones', { ...this.profesionObject })
    //     this.clearForm()
    //     return;
    //   }
    //   this.profesionFormValidated = true;
    // },
    // clearForm() {
    //   this.profesionObject = {
    //     name: '',
    //   }
    // },
  },

  watch: {
    tarjetaEmpleadoId(newId) {
      if (newId) {
        Api.getEmpleadoByID(newId)
        .then((response) => {
            console.log('23',response);
        });
      }
    },
  },

  props: {
    newTarjetaEmpleadoModal: Boolean,
    tarjetaEmpleadoId: Number
  },
}
</script>