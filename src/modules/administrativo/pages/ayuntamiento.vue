<template>
  <div>
    <h4 class="text-center">{{ postAyuntamiento.descripcion }}</h4>
    <div class="text-center">
      <span
        ><h6>{{ postAyuntamiento.direccion }}</h6></span
      >
      <span
        ><h6>RNC: {{ postAyuntamiento.rnc }}</h6></span
      >
      <span
        ><h6>Codigo: {{ postAyuntamiento.codigo }}</h6></span
      >
    </div>
  </div>

  <div class="mt-4">
    <CForm class="w-50 mx-auto">
      <div class="d-flex justify-content-center">
        <div
          class="position-relative flex justify-content-center border border-2 border-dark"
          style="height: 200px"
        >
          <label
            class="position-absolute top-50 start-50 translate-middle fs-5 upload-label"
            style="font-weight: bolder"
            for=""
            >Click aqu&iacute; para agregar imagen</label
          >
          <img
            width="200"
            height="200"
            :src="postAyuntamiento.imagenUrl"
            alt="Logo del ayuntamiento"
            style="opacity: 0.5"
          />
          <input
            accept="image/png, image/jpeg"
            type="file"
            @change="saveFile"
            class="position-absolute top-50 start-50 translate-middle input-wrapper w-100 h-100 opacity-0"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <CFormLabel for="postAyuntamiento.lema">Lema</CFormLabel>
          <CFormInput
            id="postAyuntamiento.lema"
            v-model="postAyuntamiento.lema"
            maxlength="50"
          />
        </div>

        <div class="col-6">
          <CFormLabel for="postAyuntamiento.siglas">Siglas</CFormLabel>
          <CFormInput
            id="postAyuntamiento.siglas"
            v-model="postAyuntamiento.siglas"
            maxlength="5"
          />
        </div>
      </div>

      <div>
        <div class="row">
          <div class="col-6">
            <CFormLabel for="postAyuntamiento.telefono"
              >Tel&eacute;fono</CFormLabel
            >
            <CFormInput
              @keypress="onlyNumber"
              id="postAyuntamiento.telefono"
              v-model="postAyuntamiento.telefono"
              maxlength="10"
            />
          </div>

          <div class="col-6">
            <CFormLabel for="postAyuntamiento.fax">Fax</CFormLabel>
            <CFormInput
              @keypress="onlyNumber"
              id="postAyuntamiento.fax"
              v-model="postAyuntamiento.fax"
              maxlength="10"
            />
          </div>
        </div>
      </div>

      <div>
        <CFormLabel for="postAyuntamiento.direccion"
          >Direcci&oacute;n</CFormLabel
        >
        <CFormInput
          id="postAyuntamiento.direccion"
          v-model="postAyuntamiento.direccion"
          maxlength="50"
        />
      </div>

      <div>
        <CFormLabel for="region">Regi&oacute;n</CFormLabel>
        <CFormInput id="region" disabled :value="region" />
      </div>

      <div>
        <CFormLabel for="provincia">Provincia</CFormLabel>
        <CFormInput id="provincia" disabled :value="provincia" />
      </div>

      <div>
        <CFormLabel for="municipio">Municipio</CFormLabel>
        <CFormInput id="municipio" disabled :value="municipio" />
      </div>

      <div>
        <CFormLabel for="distrito">Distrito</CFormLabel>
        <CFormInput id="distrito" disabled :value="distrito" />
      </div>

      <div class="d-flex justify-content-end mt-3">
        <CButton
          class="btn btn-info btn-block mt-1"
          @Click="editarAyuntamiento"
        >
          Guardar
        </CButton>
      </div>
    </CForm>
  </div>
</template>

<script>
import Api from '../services/AdministrativoServices'
import { getAyuntamientoId } from '@/utils/logged-info'
import { CFormTextarea } from '@coreui/vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import { onlyNumber } from '@/utils/validator'

export default {
  name: 'ayuntamiento',
  components: { CFormTextarea },
  data: () => {
    return {
      postAyuntamiento: {
        codigo: null,
        descripcion: null,
        imagenUrl: null,
        lema: null,
        telefono: null,
        direccion: null,
        fax: null,
        estatus: true,
        siglas: null,
        rnc: null,
        tipoGobierno: 'AYUNTAMIENTO',
      },
      onlyNumber,
    }
  },

  computed: {
    provincia() {
      return this.postAyuntamiento?.provincia?.descripcion ?? ''
    },

    region() {
      return this.postAyuntamiento?.region?.descripcion ?? ''
    },

    distrito() {
      return this.postAyuntamiento?.distrito?.descripcion ?? ''
    },

    municipio() {
      return this.postAyuntamiento?.municipio?.descripcion ?? ''
    },
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    getAyuntamiento() {
      Api.getAyuntamiento(getAyuntamientoId()).then((response) => {
        this.postAyuntamiento = response.data.data
      })
    },

    editarAyuntamiento() {
      Api.putAyuntamiento(getAyuntamientoId(), {
        ...this.postAyuntamiento,
        regionId: this.postAyuntamiento.region.id ?? 0,
        provinciaId: this.postAyuntamiento.provincia.id ?? 0,
        municipioId: this.postAyuntamiento.municipio?.id ?? 0,
        distritoId: this.postAyuntamiento.distrito?.id ?? 0,
      })
        .then(() => {
          this.show({
            content: 'Ayuntamiento actualizado correctamente',
            closable: true,
            time: 7_000,
          })
        })
        .catch(() => {
          this.show({
            content: 'Hubo un error al actualizar el Ayuntamiento',
            closable: true,
            time: 7_000,
          })
        })
    },

    saveFile(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (evt) => {
          this.postAyuntamiento.imagenUrl = evt.target.result
        }
        reader.readAsDataURL(file)
      }
    },
  },
  mounted() {
    this.getAyuntamiento()
  },
}
</script>
