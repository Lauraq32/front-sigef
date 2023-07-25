<template>
    <h3 class="text-center mb-5">Perfil de suario</h3>

    <CCard>
        <CCardBody>
            <CCardTitle class="mb-4">Informaci&oacute;n del Empleado</CCardTitle>
            <CCardText><label class="fw-semibold col-3">C&oacute;digo:</label> {{ empleado.codigo }}</CCardText>
            <CCardText> <label class="fw-semibold col-3">Nombre:</label> {{ `${empleado.nombre} ${empleado.apellido}` }}
            </CCardText>
            <CCardText> <label class="fw-semibold col-3">C&eacute;dula:</label> {{ empleado.codigoIdentidad }}</CCardText>
            <CCardText> <label class="fw-semibold col-3">Direcci&oacute;n:</label> {{ empleado.direccion }}</CCardText>
            <CCardText> <label class="fw-semibold col-3">Genero:</label> {{ empleado.sexo === 'M' ? 'Masculino' : 'Femenino'
            }}
            </CCardText>
            <CCardText> <label class="fw-semibold col-3">Grupo ocupacional:</label> {{ empleado.grupoOcupacional }}
            </CCardText>
            <CCardText> <label class="fw-semibold col-3">Departamento:</label> {{ empleado.departamento?.nombre }}
            </CCardText>
        </CCardBody>
    </CCard>


    <CCard class="mt-5">

        <CCardBody>
            <CCardTitle class="mb-4">Informaci&oacute;n del Ayuntamiento</CCardTitle>
            <CCardText><label class="fw-semibold col-3">C&oacute;digo:</label> {{ ayuntInfo.codigo }}</CCardText>
            <CCardText><label class="fw-semibold col-3">Descripci&oacute;n:</label> {{ ayuntInfo.descripcion }}
            </CCardText>
            <CCardText><label class="fw-semibold col-3">RNC:</label> {{ ayuntInfo.rnc }}</CCardText>
            <CCardText><label class="fw-semibold col-3">T&eacute;lefono:</label> {{ formatPhoneNumber(ayuntInfo.telefono
                ?? '') }}</CCardText>
        </CCardBody>
    </CCard>

    <CCard class="mt-5">
        <CCardBody>
            <CCardTitle class="mb-4">Informaci&oacute;n del Usuario</CCardTitle>
            <CCardText><label class="fw-semibold col-3">Correo electr&oacute;nico:</label> {{ usuario.email }}</CCardText>
            <CCardText><label class="fw-semibold col-3">Nombre de usuario:</label> {{ usuario.userName }}</CCardText>

            <CForm class="needs-validation" novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
                <CCardTitle class="mb-3 mt-4">Contraseña</CCardTitle>
                <CRow class="mt-2">
                    <CFormLabel for="dataPassword.passwordActual" class=" fw-semibold col-sm-3 col-form-label">Contraseña
                        actual
                    </CFormLabel>
                    <div class="col-sm-3">
                        <CFormInput required v-model="dataPassword.passwordActual" type="password"
                            id="dataPassword.passwordActual" />
                    </div>
                </CRow>
                <CRow class="mb-2">
                    <CFormLabel for="dataPassword.passwordNuevo" class=" fw-semibold col-sm-3 col-form-label mt-3">
                        Contraseña nueva
                    </CFormLabel>
                    <div class="col-sm-3 mt-3">
                        <CFormInput required v-model="dataPassword.passwordNuevo" type="password"
                            id="dataPassword.passwordNuevo" />
                    </div>
                </CRow>

                <CRow class="mb-2">
                    <CFormLabel for="dataPassword.passwordNuevo2" class="fw-semibold col-sm-3 col-form-label mt-3">Repetir
                        Contraseña
                    </CFormLabel>
                    <div class="col-sm-3 mt-3">
                        <CFormInput v-model="dataPassword.passwordNuevo2" required class="fw-semibold" type="password"
                            id="dataPassword.passwordNuevo2" />
                        <CFormFeedback invalid
                            :style="{ display: !validacionPassWord && massegePassword ? 'flex' : 'none' }">
                            La contraseña no coincide
                        </CFormFeedback>
                    </div>
                </CRow>
            </CForm>
            <div class="row">
                <div class="col-6 d-flex justify-content-end">
                    <CButton color="primary" class="mt-3 " @click="validationChangePassWord">
                        Guardar
                    </CButton>
                </div>
            </div>

        </CCardBody>
    </CCard>
</template>



<script setup>
import Api from '@/modules/administrativo/Usuario/services/AdministrativoServices'
import { useToastStore } from '@/store/toast'
import { CButton } from '@coreui/vue';
import { getLoggedInfo } from '@/utils/logged-info';
import { reactive, ref, onMounted, computed } from 'vue'
import { formatPhoneNumber } from '@/utils/format'


const dataPassword = reactive({
    passwordActual: null,
    passwordNuevo: null,
    passwordNuevo2: null
});
const toastStore = useToastStore()
const usuario = ref({})
const empleado = ref({})
const ayuntInfo = ref({})
const validacionPassWord = computed(() => dataPassword.passwordNuevo === dataPassword.passwordNuevo2)
const massegePassword = ref(false)
const eventTypeForm = ref(null);
const isFormEventTypeValidated = ref(null)
const userInfo = getLoggedInfo().user

const validationChangePassWord = () => {
    massegePassword.value = true
    isFormEventTypeValidated.value = false
    if (eventTypeForm.value.$el.checkValidity() && validacionPassWord.value) {
        changedPassword()
    }
    isFormEventTypeValidated.value = true
}

const changedPassword = () => {
    Api.putUsuarioPassWord(userInfo.id, dataPassword).then((response) => {
        toastStore.show({
            content: response.data,
            closable: true,
        })
        clearPassWord()
    }).catch((e) => {
        toastStore.show({
            content: e.response.data,
            closable: true,
            color: 'danger'
        })
    })
}

const clearPassWord = () => {
    isFormEventTypeValidated.value = false
    dataPassword.passwordActual = null,
        dataPassword.passwordNuevo = null
    dataPassword.passwordNuevo2 = null
}

onMounted(async () => {
    const [_usuario, _empleado, _ayuntamiento] = await Promise.allSettled([
        Api.getUsuariosById(userInfo.id).then(res => res.data.data),
        Api.getEmpleadoByID(userInfo.empleadoId).then(res => res.data.data),
        Api.getAyuntamiento(userInfo.ayuntamiento.id).then(res => res.data.data)
    ]);
    usuario.value = _usuario.value;
    empleado.value = _empleado.value;
    ayuntInfo.value = _ayuntamiento.value;

});


</script>