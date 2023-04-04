<template>
  <h3 class="text-center">Profesiones</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            profesion = true
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
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem @click="getProfesionesById(item)">Editar</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
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
    :showModal="profesion"
    @close-modal="closeModal"
    @post-profesiones="saveProfesion"
    :profesionesId="profesionesId"
  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import ProfesionesDialogs from '../Dialogos/ProfesionesDialogs.vue'
import { useToastStore } from '@/store/toast'
export default {
  components: {
    CSmartTable,
    CModal,
    ProfesionesDialogs,
  },
  data: () => {
    return {
      totalItems: 0,
      profesionesId: null,
      validatedCustom01: null,
      profesiones: [],
      profesion: false,
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
  watch:{
    profesion(){
      this.getAllProfesiones()
    },
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal(payload) {
      this.profesion = payload
    },
    getProfesionesById(item) {
      this.profesionesId = item.id
      this.profesion = true
    },
    saveProfesion(payload) {
      if(this.profesionesId != null) {
        Api.updateProfesion(this.profesionesId, payload).then((response) => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
            life: 15000,
          })
          setTimeout(() => this.getAllProfesiones(), 200)
        })
      } else {
        Api.addProfesion(payload).then((response) => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
            life: 15000,
          })
          setTimeout(() => this.getAllProfesiones(), 200)
        })
      }
    },
    getAllProfesiones() {
      Api.getProfesion().then((response) => {
        this.profesiones = response.data.data
        this.totalItems = response.data.data.length
        this.footerItem[1] = this.totalItems
      })
    },
  },
  mounted() {
    this.getAllProfesiones()
  },
}
</script>
