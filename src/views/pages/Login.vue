<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center position-relative">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="d-flex justify-content-center align-items-center py-5" style="width: 100%">
              <img src="../../../public/LogoTemp.png" />
            </CCard>
            <CCard class="p-5">
              <CCardBody>
                <CCardTitle class="text-center">Iniciar Sesi&oacute;n</CCardTitle>
                <CForm
                  @submit="handleAuth"
                  class="mt-4"
                >
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Usuario" required
                      v-model="userForm.usuario"
                      :disabled="isLoading"
                    />
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CInputGroup>
                  <CInputGroup class="mb-1">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput 
                      type="password"
                      placeholder="Contraseña" required
                      v-model="userForm.password"
                      :disabled="isLoading"
                    />
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CInputGroup>
                  <CRow class="mb-4">
                    <CCol class="text-end">
                      <CButton color="link" class="px-0">
                        ¿Olvidaste tu Contrase&ntilde;a?
                      </CButton>
                    </CCol>
                  </CRow>
                  <CAlert v-if="msg" color="danger" v-html="msg"></CAlert>
                  <CRow class="text-center">
                    <CCol class="d-grid">
                      <CButton 
                        type="submit"
                        color="primary"
                        :disabled="isLoading">
                        Ingresar
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
      <LoadingIndicator :isVisible="isLoading"/>
    </CContainer>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/AuthStore';
import { mapStores } from 'pinia';
import LoadingIndicator from '../../components/AppLoadingIndicator.vue';

export default {
  name: 'Login',
  components: {
    LoadingIndicator
  },
  data: () => {
    return {
      userForm: {
        email: '',
        password: '',
      },
      msg: '',
      isLoading: false,
    }
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    handleAuth(event) {
      this.msg = '';
      this.isLoading = true;
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        this.msg = 'Usuario/contrase&ntilde;a inv&aacute;lidos';
        this.isLoading = false;
      }

      this.AuthStore.signIn(this.userForm)
        .then(() => {
          this.$router.push({ name: 'financiero' })
        })
        .catch(error => {
          this.isLoading = false;
          this.msg = error.response.data.message ?? error.response.data.data;
        });
    }
  },
}
</script>
<style>
img {
    max-width: 100%;
    object-fit: cover;
}
</style>