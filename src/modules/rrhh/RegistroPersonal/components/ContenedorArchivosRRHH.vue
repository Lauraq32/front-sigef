<template>
  <div>
    <CModal @close="CloseModal" size="lg" :visible="showModal">
      <CModalHeader>
        <CModalTitle>Captura de imagenes Asociadas al Documento</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="tab-context">
          <div class="row">
            <h3>Empleado : Yonaiky Matos</h3>
            <hr />

            <div>
              <div v-for="(documento, index) in documentos" :key="index">
                <div class="card">
                  <CCollapse :visible="documento.visible">
                    <canvas class="card-img-top" :src="documento.src" :alt="documento.alt" />
                  </CCollapse>
                  <div class="card-body">
                    <h5 class="card-title">Descripción del documento</h5>
                    <p class="card-text">{{ documento.descripcion }}</p>
                  </div>
                  <div class="card-body">
                    <CButton color="primary" href="#" @click="toggle(index)">Visualizar</CButton>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </CModalBody>
      <div class="modal-footer">
        <button type="button" color="info" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" color="info" class="btn btn-primary" v-on:click="submitForm">
          Guardar
        </button>

      </div>
    </CModal>
  </div>
</template>

<script>
import { CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'
import { CButton, CCollapsePlugin } from '@coreui/vue-pro'
import { CCollapse } from '@coreui/vue'
import { CIcon } from '@coreui/icons-vue'

export default {
  components: {
    CModal,
    CModalHeader,     
    CModalTitle,
    CModalBody,
    CButton,
    CIcon,
    CCollapsePlugin
 
  },

  data() {

    return {
      lgDemo5: false,
      fullscreenDemo: false,
      visible: false,
      file: null,

      documentos: [
        {
          src: 'https://i.pinimg.com/originals/79/83/19/79831914e8d3733c333a42f0921388a6.jpg',
          alt: 'Documento 1',
          descripcion: 'Descripción del documento 1',
          visible: false
        },
        {
          src: 'documento2.png',
          alt: 'Documento 2',
          descripcion: 'Descripción del documento 2',
          visible: false
        },
        {
          src: 'documento3.png',
          alt: 'Documento 3',
          descripcion: 'Descripción del documento 3',
          visible: false
        }
      ]

    }

  },
  methods: {
    focusInput() {
      this.$refs.name.focus()
      this.$refs.klk.focus()
    },

    unaVez() {
      this.focusInput()
    },
    openModal() {
      this.xlDemo = true
      setTimeout(this.unaVez, 200)
    },
    CloseModal() {
      this.$emit('closeModal', false)
    },


    toggle(index) {
      this.documentos[index].visible = !this.documentos[index].visible
    }
  },

  props: {
    showModal: Boolean,
  },
}
</script>
<style scoped>
.file-select>.select-button {
  padding: 0.5rem;

  line-height: 1.5;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.file-select>input[type='file'] {
  display: none;
}
</style>
