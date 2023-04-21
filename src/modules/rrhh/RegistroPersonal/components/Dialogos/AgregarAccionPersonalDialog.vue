<template>
  <CModal backdrop="static" @close="closeModal" :visible="showModal">
    <CModalHeader>
      <CModalTitle>Acción de Personal</CModalTitle>
    </CModalHeader>
    <CForm
      novalidate
      :validated="validatedCustom01"
      :onsubmit="submitAccionPersonal"
    >
      <CModalBody>
        <CCardBody>
          <div class="row">
            <div class="col-3">
              <CFormLabel for="validationCustom01">Fecha</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <CFormInput
                required
                id="validationCustom01"
                v-model="fechaDesde"
                type="date"
              />
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom02">Tipo de Acciones</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <CFormSelect
                required
                id="validationCustom02"
                v-model="postAccionPersonal.tipoAccionId"
              >
                <option
                  v-for="acciones in this.tipoAcciones"
                  :key="acciones.id"
                  :value="acciones.id"
                >
                  {{ acciones.descripcion }}
                </option>
              </CFormSelect>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom03">Cantidad</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <VueNumberFormat
                id="validationCustom03"
                v-model:value="postAccionPersonal.cantidad"
                class="form-control"
                :format="'0'"
                :options="{
                  precision: 0,
                  prefix: '',
                  decimal: '',
                  thousand: '',
                }"
              >
              </VueNumberFormat>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom04">Hasta</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <CFormInput
                required
                id="validationCustom04"
                type="date"
                v-model="fechaHasta"
              />
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom05">Detalle</CFormLabel>
            </div>
            <div class="col-9">
              <textarea
                required
                id="validationCustom05"
                v-model="postAccionPersonal.detalle"
                class="col-md-10"
                rows="3"
              ></textarea>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>
        </CCardBody>
      </CModalBody>
      <CModalFooter>
        <CButton
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click="closeModal"
          >Cerrar</CButton
        >
        <input
          type="submit"
          class="btn btn-info btn-block mt-1"
          value="Guardar"
        />
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'

export default {
  name: 'AgregarAccionPersonalDialog',
  components: {
    CModal,
  },

  data: () => {
    return {
      postAccionPersonal: {
        fechaDesde: null,
        tipoAccionId: null,
        // empleadoId: this.empleado.id,
        cantidad: null,
        fechaHasta: null,
        detalle: null,
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitAccionPersonal(event) {
      const form = event.currentTarget
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity() === true) {
        if (this.id) {
          Api.putAccionesPersonales(this.id, this.postAccionPersonal)
            .then((response) => {
              setTimeout(this.getAccionPersonalById(this.empleado.id), 500)
              this.show({
                content: 'Registro actualizado correctamente',
                closable: true,
              })
            })
            .catch(({ response }) => {
              this.show({
                content: response.data,
                closable: true,
                color: 'danger',
                class: 'text-white',
              })
            })
        } else {
          this.postAccionesPersonal()
        }
      }
      this.validatedCustom01 = true
    },

    postAccionesPersonal() {
      this.postAccionPersonal.empleadoId = this.empleado.id
      Api.postAccionesPersonal(this.postAccionPersonal)
        .then((response) => {
          setTimeout(this.getAccionPersonalById(this.empleado.id), 500)
          this.show({
            content: 'Registro guardado correctamente',
            closable: true,
          })
        })
        .catch(({ response }) => {
          this.show({
            content: response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>
