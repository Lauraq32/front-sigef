<template>
  <h3 class="text-center">Marcas</h3>
  

  <!-- <div>
    <button @click="modal = true">Abrir Modal</button>
    
  </div> -->
  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton color="info" v-on:click="openModal"> >Agregar</CButton>
    </div>
  </div>
  <hr />
  <CSmartTable
    clickableRows
    :tableProps="{
      striped: false,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    header
    :items="Marcas"
    :columns="columns"
    columnFilter
    tableFilter
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item }">
      <td class="py-1">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
    </template>
  </CSmartTable>
  <CModal
    size="lg"
    :visible="lgDemo"
    @close="lgDemo = false"
  >
    <CModalHeader>
      <CModalTitle>Marcas</CModalTitle>
    </CModalHeader>
    <CModalBody v-on:mousemove="closeModal()">
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <!-- <CCol :md="2">
            <CFormLabel for="validationCustom02">Código</CFormLabel>
            <CFormInput
              v-model="postMarcas.id"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol> -->

          <!-- <div>
            <input ref="focusMe" type="text" />
          </div> -->

          <CCol :md="6">
            <CFormLabel for="validationCustom02">Marca</CFormLabel>
            
            <input ref="name" type="text" class="form-control" v-model="postMarcas.nombre" id="exampleInputEmail1"  >
          </CCol>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="unaVez"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="submitForm">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/ActivoFijo/Marca'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../services/ActivoFijoServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      modal: false,
      caca: false,
      runOnc: false,
      prueba: [{ prueba: '' }],
      // input: this.$refs.email,
      focus: false,
      postMarcas: {
        id: 0,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        nombre: null,
      },
      columns: [
        { key: 'id', label: 'Código' },
        { key: 'nombre', label: 'Descripción' },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],

      details: [],

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['Marcas']),
  },

  methods: {
    addField(prueba) {
      prueba.push({})
    },

    // openModal() {
    //   this.lgDemo = true
    //   // Aquí puedes llamar a cualquier función que necesites
    // },

    // focusI() {
    //   this.focus = true
    //   if (this.focus == true) {
    //     this.focusInput()
    //   } else if (this.focus == true) {
    //     this.focus = false
    //   }
    // },

    ...mapActions(useRegistroStore, ['getMarcas', 'addMarcas']),

    focusInput() {
      console.log('kaka')
      this.$refs.name.focus()
    },

    closeModal() {
      // this.lgDemo = false
      // if(this.caca == true){
      //   this.lgDemo = true
      //   this.funcionKlk()
      // }
      // console.log(this.lgDemo)
      
      // this.getMarcas()

      if (this.modal) {
      this.$nextTick(() => {
        this.$refs.inputElement.focus()
        console.log('mmf')
      })
    }
    },

    unaVez() {
      // if (!this.runOnce) {
        this.focusInput()
        // this.runOnce = true
      // }
    },

    funcionKlk() {
   
      if (this.lgDemo == true) {
        console.log('klk12')
        this.unaVez()
      } else {
        console.log('klk3')
        this.unaVez()
      }
    },

    // focusKlk() {
    //   if (this.lgDemo == true) {
    //     this.focusInput()
    //   }
    // },

    focusInput() {
      console.log('kaka')
      this.$refs.name.focus()
    },

    unaVez() {
      // if (!this.runOnce) {
        this.focusInput()
        // this.runOnce = true
      // }
    },

    openModal() {
      this.lgDemo = true
      // <input ref="name" type="text" class="form-control" v-model="postMarcas.nombre" id="exampleInputEmail1"  >
      setTimeout(this.unaVez, 200) 
    },

    toggleDetails(item) {
      console.log(item)
      if (item.Marcas !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      console.log(item.id)
      Api.getMarcaByID(item.id).then((response) => {
        this.postMarcas = response.data.data
        console.log(response)
        this.id = item.id
        //this.postIngreso = response.data.data
      })
    },
    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          'primary'
      }
    },

    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },

    

    submitForm() {
      if (this.id) {
        Api.putMarca(this.id, this.postMarcas).then((response) => {
          console.log(response.data)
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(this.getMarcas, 500)
          this.postMarcas = {
            id: 0,
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            nombre: null,
          }
        })
        setTimeout(this.getMarcas, 500)
      } else {
        this.addMarcas(this.postMarcas)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
        //const form = event.currentTarget
        this.lgDemo = true
        setTimeout(this.getMarcas, 500)
        ;(this.postMarcas = {
          id: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          nombre: null,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getMarcas, 500)
      }
    },
  },

  mounted() {
    this.closeModal()
    
    // console.log(lgDemo)
    // Api.getAllMarca().then((response) => {
    //   This.Marcas = response.data.data
    // })
    // this.focusInput()
  },
}
</script>
