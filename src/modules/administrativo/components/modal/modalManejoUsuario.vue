<template>
  <CModal :visible="usuarioModal" @close="closeModalUsuario" backdrop="static">
    <CModalHeader>
      <CModalTitle>Manejo de Usuario</CModalTitle>
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
            <CFormLabel for="postUsuario.email">Correo Electronico</CFormLabel>
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
            <CFormLabel for="postUsuario.password">Password</CFormLabel>
            <CFormInput
            type="password"
              :disabled="postUsuario.id"
              id="postUsuario.password"
              required
              v-model="postUsuario.password"
              placeholder="Ejemplo: Lma1234$"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postUsuario.password">Rol</CFormLabel>
            <CFormInput
              :disabled="postUsuario.id"
              id="postUsuario.password"
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
  name: 'CargosModal',
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
        rolId: 0,
        empleadoId: '',
        nombre: null,
        userName: null,
        email: null,
        password: null,
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
        this.clearForm()
        return
      }
      this.usuarioFormValidated = true
    },

    clearForm() {
      this.postUsuario = {
        rolId: 0,
        ayuntamientoId: 0,
        empleadoId: 0,
        nombre: null,
        userName: null,
        email: null,
        password: null,
      }
    },

    closeModalUsuario() {
      this.$emit('close-modal', false)
      this.clearForm()
    },

    generateUserName(nombre, apellido) {
      const nombreIniciales = nombre.charAt(0).toUpperCase()
      const apellidoCompleto = apellido.replace(/\s+/g, '').toLowerCase()
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
  },

  watch: {
    selectEmpleado(value) {
      if (value) {
        this.postUsuario.nombre = value.nombreCompleto
        this.postUsuario.userName = this.generateUserName(
          value.nombre,
          value.apellido,
        )
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
