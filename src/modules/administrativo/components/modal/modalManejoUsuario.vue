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
            <CFormLabel for="postUsuario.nombre">Nombres</CFormLabel>
            <CFormInput
              :disabled="postUsuario.id"
              id="postUsuario.nombre"
              @keypress="onlyLetter"
              required
              v-model="nombreUser"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postUsuario.nombre">Apellidos</CFormLabel>
            <CFormInput
              :disabled="postUsuario.id"
              id="postUsuario.nombre"
              @keypress="onlyLetter"
              required
              v-model="apellidoUser"
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
import { cibOpenstreetmap } from '@coreui/icons'

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
      nombreUser: '',
      apellidoUser: '',
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
      this.nombreUser = ''
      this.apellidoUser = ''
    },

    closeModalUsuario() {
      this.$emit('close-modal', false)
      this.clearForm()
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

    generarNombreUsuario() {
      const primerNombre = this.nombreUser.split(' ')[0]
      const primerApellido = this.apellidoUser.split(' ')[0]
      const nombreIniciales = primerNombre.charAt(0).toUpperCase()
      const apellidoCompleto = primerApellido.replace(/\s+/g, '').toLowerCase()
      this.postUsuario.userName = nombreIniciales + apellidoCompleto
    },
  },

  watch: {
    nombreUser: {
      immediate: true,
      handler() {
        this.generarNombreUsuario()
        this.postUsuario.nombre = `${this.nombreUser} ${this.apellidoUser}`
      },
    },
    apellidoUser: {
      immediate: true,
      handler() {
        this.generarNombreUsuario()
        this.postUsuario.nombre = `${this.nombreUser} ${this.apellidoUser}`
      },
    },
    selectEmpleado(value) {
      if (value) {
        this.nombreUser = value.nombre
        this.apellidoUser = value.apellido
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
