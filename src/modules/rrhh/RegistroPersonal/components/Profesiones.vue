<template>
  <h3 class="text-center">Profesiones</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            newProfesionesModal = true
          }
        "
        >Agregar</CButton
      >
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    :footer="footerItem"
    header
    :items="profesiones"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="getProfesionById(item)">
            {{  'Editar' }}
          </CButton>
      </td>
    </template>
    <template #details="{ item }">
      <CCollapse :visible="this.details.includes(item._id)">
        <CCardBody>
          <h4>
            {{ item.username }}
          </h4>
          <p class="text-muted">User since: {{ item.registered }}</p>
          <CButton size="sm" color="info" class=""> User Settings </CButton>
          <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
        </CCardBody>
      </CCollapse>
    </template>
  </CSmartTable>
  <ProfesionesDialogs
    :newProfesionesModal="newProfesionesModal"
    @close-modal="closeModal"
    @post-profesiones="saveProfesion"
    :profesionId="profesionId"
  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import ProfesionesDialogs from '../Dialogos/ProfesionesModal.vue'
import { useToastStore } from '@/store/toast'
export default {
  components: {
    CSmartTable,
    CModal,
    ProfesionesDialogs,
  },
  data: () => {
    return {
      profesionId: null,
      validatedCustom01: null,
      profesiones: [],
      newProfesionesModal: false,
      columns: [
        { key: 'name', label: 'Profesión', _style: { width: '40%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },
        {
          label: 'total profesiones',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },
      ],
      details: [],
    }
  },
  watch: {
    profesion() {
      this.getAllProfesiones()
    },
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal(payload) {
      this.newProfesionesModal = payload
    },
    getProfesionById(item) {
      this.profesionId = item.id
      this.newProfesionesModal = true
    },
    saveProfesion(payload) {
      if (this.profesionId != null) {
        Api.updateProfesion(this.profesionId, payload)
          .then((response) => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllProfesiones(), 200)
          })
          .catch((errors) => {
            errors.response.data.errors.map((error) => {
              return this.show({
                content: error.message,
                closable: true,
                color: 'danger',
              })
            })
          })
      } else {
        Api.addProfesion(payload)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllProfesiones(), 200)
          })
          .catch((errors) => {
            errors.response.data.errors.map((error) => {
              return this.show({
                content: error.message,
                closable: true,
                color: 'danger',
              })
            })
          })
      }
    },
    getAllProfesiones() {
      Api.getProfesion().then((response) => {
        this.profesiones = response.data.data
        this.footerItem[1] = response.data.data.length
      })
    },
  },
  mounted() {
    this.getAllProfesiones()
  },
}
</script>
