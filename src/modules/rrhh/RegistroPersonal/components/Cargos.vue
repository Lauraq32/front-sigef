<template>
  <h3 class="text-center">Posiciones o cargos</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            cargoModal = true
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
    header
    :items="cargos"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
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
          <CDropdownToggle color="primary" variant="outline"
            >Acciones</CDropdownToggle
          >
          <CDropdownMenu>
            <CDropdownItem @click="getCargosById(item)">Editar</CDropdownItem>
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
  <CargosModal
    :showCargoModal="cargoModal"
    @close-modal="closeModal"
    @post-cargo="saveCargo"
    :cargosId="cargosId"
  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import CargosModal from '../Dialogos/CargosModal.vue'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import { useToastStore } from '@/store/toast'
export default {
  components: {
    CSmartTable,
    CModal,
    CargosModal,
  },
  data: () => {
    return {
      cargosId: null,
      cargos: [],
      cargoModal: false,
      validatedCustom01: null,
      lgDemo: false,
      columns: [
        {
          key: 'posicion',
          label: 'Posicion o cargo',
          _style: { width: '40%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      details: [],
    }
  },
  watch: {
    Cargos() {
      this.getAllCargo()
    },
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal(payload) {
      this.cargoModal = payload
    },
    getCargosById(item) {
      this.cargosId = item.id
      this.cargoModal = true
    },
    saveCargo(payload) {
      if (this.cargosId != null) {
        Api.updateCargo(this.cargosId, payload)
          .then((response) => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllCargo(), 200)
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
        Api.addCargos(payload)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllCargo(), 200)
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
    getAllCargo() {
      Api.getAllCargos().then((response) => {
        this.cargos = response.data.data
      })
    },
  },
  mounted() {
    this.getAllCargo()
  },
}
</script>
