<template>
  <CModal :visible="usuarioModal" @close="closeModalUsuario" backdrop="static">
    <CModalHeader>
      <CModalTitle>Usuarios</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="needs-validation"
          novalidate
          :validated="usuarioFormValidated"
          ref="formRef"
        >
          <CCol>
            <CFormLabel for="validationCustom05">Empleado</CFormLabel>
            <v-select
              :disabled="postUsuario.id"
              name="selectEmpleado"
              v-model="selectEmpleado"
              :options="empleados"
            ></v-select>
          </CCol>
          <CCol>
            <CFormLabel for="postUsuario.nombre">Nombre</CFormLabel>
            <CFormInput
              :disabled="postUsuario.id"
              id="postUsuario.nombre"
              @keypress="onlyLetter"
              required
              v-model="postUsuario.nombre"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postUsuario.userName"
              >Nombre de Usuario</CFormLabel
            >
            <CFormInput
              :disabled="postUsuario.id"
              id="postUsuario.userName"
              @keypress="onlyLetter"
              required
              v-model="postUsuario.userName"
              placeholder="Ejemplo: Eventura"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postUsuario.email"
              >Correo electr&oacute;nico</CFormLabel
            >
            <CFormInput
              type="email"
              id="postUsuario.email"
              required
              v-model="postUsuario.email"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postUsuario.rolId">Rol</CFormLabel>
            <CFormInput
              :disabled="postUsuario.id"
              id="postUsuario.rolId"
              required
              v-model="postUsuario.rolId"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CModalFooter>
            <CButton class="btn btn-secondary" @click="closeModalUsuario">
              Cerrar
            </CButton>
            <CButton class="btn btn-info btn-block mt-1" @click="saveUsuario">
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CModal } from '@coreui/vue'
import { CModalFooter, CButton } from '@coreui/vue-pro'
import Api from '@/modules/administrativo/Usuario/services/AdministrativoServices'

export default {
  name: 'modalManejoDeUsuarios',
  components: {
    CModal,
    CModalFooter,
    CButton,
  },
  emits: ['post-usuario', 'close-modal'],
  data: function () {
    return {
      usuarioFormValidated: false,
      postUsuario: {
        rolId: 1,
        empleadoId: '',
        nombre: null,
        userName: null,
        email: null,
      },
      empleados: [],
    }
  },

  computed: {
    selectEmpleado: {
      get() {
        return this.empleados.find((x) => x.code == this.postUsuario.empleadoId)
      },
      set(empleado) {
        this.postUsuario.empleadoId = Number(empleado?.code)
      },
    },
  },

  methods: {
    saveUsuario() {
      this.usuarioFormValidated = false
      if (this.postUsuario.empleadoId <= 0) {
        delete this.postUsuario.empleadoId
      }
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('post-usuario', { ...this.postUsuario })
        return
      }
      this.usuarioFormValidated = true
    },

    clearForm() {
      this.postUsuario = {
        rolId: 1,
        ayuntamientoId: 0,
        empleadoId: 0,
        nombre: null,
        userName: null,
        email: null,
      }
    },

    closeModalUsuario() {
      this.$emit('close-modal', false)
      this.clearForm()
    },

    generateByEmpleado(nombre, apellido) {
      const primerNombre = nombre.split(' ')[0]
      const primerApellido = apellido.split(' ')[0]
      const nombreIniciales = primerNombre.charAt(0).toUpperCase()
      const apellidoCompleto = primerApellido.replace(/\s+/g, '').toLowerCase()
      return nombreIniciales + apellidoCompleto
    },

    getAllEmpleado() {
      Api.getAllEmpleado().then(({ data: { data } }) => {
        this.empleados = data.map((elem) => ({
          code: elem.id,
          label: `${elem.id}-${elem.nombre}`,
          nombreCompleto: `${elem.nombre} ${elem.apellido}`,
          nombre: elem.nombre,
          apellido: elem.apellido,
        }))
      })
    },

    generateUserName(nombre) {
      const palabras = nombre.split(' ')

      if (palabras.length >= 3) {
        const primeraLetra = palabras[0][0].toUpperCase()
        const terceraPalabra = palabras[2].toLowerCase()
        this.postUsuario.userName = primeraLetra + terceraPalabra
      } else if (palabras.length === 2) {
        const primeraLetra = palabras[0][0].toUpperCase()
        const segundaPalabra = palabras[1].toLowerCase()
        this.postUsuario.userName = primeraLetra + segundaPalabra
      } else {
        this.postUsuario.userName = ''
      }
    },
  },

  watch: {
    'postUsuario.nombre'(newNombre) {
      if (newNombre) {
        this.generateUserName(newNombre)
      }
    },
    selectEmpleado(value) {
      if (value) {
        this.postUsuario.nombre = value.nombreCompleto
      }
    },
    usuarioModal() {
      this.getAllEmpleado()
    },
    usuarioToUpdate(newUsuario) {
      if (newUsuario) {
        this.postUsuario = { ...newUsuario }
      }
    },
  },

  props: {
    usuarioModal: Boolean,
    usuarioToUpdate: null,
  },
}
</script>
