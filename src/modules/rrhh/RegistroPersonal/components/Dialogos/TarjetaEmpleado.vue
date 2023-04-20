<template>
  <CModal
    :visible="newTarjetaEmpleadoModal"
    backdrop="static"
    style="width: 25%"
  >
    <CModalHeader>
      <CModalTitle>{{itemEmpleado.nombres}}</CModalTitle>

    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <label class="d-block font-weight-bold">Cargo: <span class="font-weight-normal">{{itemEmpleado.posicion.nombre}}</span></label>
        <label class="d-block font-weight-bold">Departamento: <span class="font-weight-normal">{{itemEmpleado.departamento.nombre}}</span></label>
        <img style="max-width: 400px" :src="imageUrl" alt="" />
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">
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
import Api from '../../services/Files'

export default {
  name: 'TarjetaEmpleadoDialogs',
  components: {
    CSmartTable,
    CModal,
    CModalFooter,
  },

  data: function () {
    return {
      itemEmpleado: {
        nombres: '',
        posicion:{
          nombre:''
        },
        departamento: {
          nombre: ''
        }
      },
      imageUrl:
        'https://imgd.aeplcdn.com/393x221/n/cw/ec/1/versions/ktm-rc-200-standard1676900452795.jpg?q=75',
      //   profesionFormValidated: false,
      //   profesionObject: {
      //     name: '',
      //   },
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal')
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
    empleado(obj) {
      Api.getFiles({
        tag: {
          empleadoId: obj.id,
          FileType: '.png',
          FileType2: 'png',
        },
      })
        .then((files) => {
          console.log(files)
          return Api.getFileById(files.pop().id)
        })
        .then((blobUrl) => {
          this.imageUrl = blobUrl
          this.itemEmpleado = { ...obj }
        })
      console.log('3224', obj)
    },
  },

  props: {
    newTarjetaEmpleadoModal: Boolean,
    empleado: Object,
  },
}
</script>
