<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="text-white py-5" style="width: 50%">
              <img src="../../../public/LogoTemp.png" />
            </CCard>
            <CCard class="p-5">
              <CCardBody>
                <CForm :validated="validatedCustom01" @submit="handleSubmitCustom01">
                  <h1>Iniciar Sesion</h1>
                  <p class="text-medium-emphasis"></p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>


                    <CFormInput id="validationCustom01" placeholder="Usuario" autocomplete="Correo" required
                      v-model="userForm.email" />
                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput id="validationCustom02" type="password" placeholder="Contraseña"
                      autocomplete="current-password" required v-model="userForm.password" />
                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6" style="width: 100%" class="text-center">
                      <input value="Ingreso" type="submit" color="primary" class="btn btn-primary btn-block mt-1"/>
                      <!-- <button
              class="btn btn-primary btn-block mt-1"
              @click="getClasificador"
            >
              Buscar
            </button> -->
                    </CCol>
                    <CCol :xs="6" class="text-center" style="width: 100%">
                      <CButton color="link" class="px-0">
                        ¿Olvidaste tu Contraseña?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'Login',
  data: () => {
    return {
      userForm: {
        email: '',
        password: ''
      },
      validatedCustom01: null,
      validationCustom02: null,

    }
  },
  methods: {
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()

      }
      event.preventDefault()
        event.stopPropagation()
      this.validatedCustom01 = true
      this.$store.commit('myCustomModule/SET_USER', this.userForm)
      //this.gotToDashboard()
      //this.$store.dispatch('myCustomModule/Login')

    },

    gotToDashboard() { this.$router.push({ name: 'financiero' }) },
  },

}
</script>
