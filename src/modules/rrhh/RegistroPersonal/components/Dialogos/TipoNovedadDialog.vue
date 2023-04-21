<template>
  <CModal backdrop="static" :visible="showModal">
    <CModalHeader>
      <CModalTitle>Tipo de Novedad</CModalTitle>
    </CModalHeader>
    <CForm
      novalidate
      :validated="validatedCustom01"
      :onsubmit="submitTipoAcciones"
    >
      <CModalBody>
        <CCardBody>
          <div class="row mt-3">
            <div class="col-4">
              <CFormLabel for="Descripcion">Descripción</CFormLabel>
            </div>
            <div class="col-8">
              <CFormInput
                required
                id="Descripcion"
                v-model="postTipoAccion.descripcion"
              />
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-4">
              <CFormLabel for="cambiaStatus"> Cambia estatus? </CFormLabel>
            </div>
            <div class="col-8 d-flex">
              <span style="padding-right: 10px">No</span>
              <CFormSwitch
                style="height: 25px; width: 55px"
                id="cambiaStatus"
                v-model="postTipoAccion.cambiaStatus"
                checked
              />
              <span style="padding-left: 10px">Si</span>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-4">
              <CFormLabel for="selectTipoAccion">Estatus</CFormLabel>
            </div>
            <div class="col-8">
              <CFormSelect
                required
                v-model="postTipoAccion.estatus"
                id="selectTipoAccion"
              >
                <option>Activo</option>
                <option>Inactivo</option>
                <option>Licencia</option>
                <option>Vacaciones</option>
              </CFormSelect>
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
          @click="closeModal = false"
          >Cancelar
        </CButton>
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
import { CSmartTable } from '@coreui/vue-pro'
export default {
  name: 'TipoNovedadDialog',
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      postTipoAccion: {
        descripcion: null,
        cambiaStatus: false,
        estatus: 'Activo',
        comprobado: false,
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>
