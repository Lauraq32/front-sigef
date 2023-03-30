<template>
  <CModal @close="CloseModals" size="lg" :visible="showModals">
    <CModalHeader>
      <CModalTitle>Tipo de Novedad</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CSmartTable
        style="margin-top: 10px"
        class="sticky-top"
        clickableRows
        :tableProps="{
          striped: true,
          hover: true,
        }"
        :tableHeadProps="{}"
        :activePage="1"
        header
        :items="areasTrabajo"
        :columns="columns2"
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

        <template #show_details="{ item }">
          <td class="py-1">
            <CButton
              class="mt-1"
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(item)"
            >
              {{ Boolean(item._toggled) ? 'Hide' : 'Nuevo' }}
            </CButton>

            <CButton
              class="mt-1"
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(item)"
            >
              {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
            </CButton>
            <CButton
              class="mt-1"
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(item)"
            >
              {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
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
    </CModalBody>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>

      <button
        class="btn btn-info btn-block mt-1"
        @click="
          () => {
            lgDemo4 = true
          }
        "
      >
        Nuevo
      </button>
    </div>
  </CModal>

  <CModal
    @close="
      () => {
        lgDemo4 = false
      }
    "
    size="lg"
    :visible="lgDemo4"
  >
    <CModalHeader>
      <CModalTitle>Tipo de Novedad</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <div class="row">
          <div class="col-3">
            <CFormLabel for="validationCustom01">Codigo</CFormLabel>
          </div>
          <div class="col-9 col-md-4">
            <CFormInput />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Descripción</CFormLabel>
          </div>
          <div class="col-9 col-md-4">
            <CFormInput />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <div class="row mt-3">
              <div class="col-9">
                <CFormLabel>Cambiar estatus?</CFormLabel>
              </div>
              <div class="col-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                />
              </div>
            </div>
          </div>
          <div class="col-9">
            <div class="row mt-3 col-9">
              <div class="col-3">
                <CFormLabel>A Estatus:</CFormLabel>
              </div>
              <div class="col-9 col-md-4 mx-3">
                <CFormInput />
              </div>
            </div>
          </div>
        </div>
        <h6 class="mt-2" style="position: relative; left: 198px">
          A = Activo I = Inactivo <br />
          L = Licencia V = Vacaciones
        </h6>
      </CCardBody>
    </CModalBody>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Cancelar
      </button>

      <button class="btn btn-info btn-block mt-1">Guardar</button>
    </div>
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

  data: function () {
    return {
      lgDemo4: false,
      columns2: [
        { key: 'codigo', label: 'Codigo', _style: { width: '5%' } },
        {
          key: 'descripcion',
          label: 'Descripción',
          _style: { width: '20%' },
        },
        {
          key: 'cambiaEstatus',
          label: 'Cambia Estatus',
          _style: { width: '10%' },
        },
        {
          key: 'aEstatus',
          label: 'a Estatus',
          _style: { width: '10%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],

      details: [],
    }
  },

  methods: {
    CloseModals() {
      this.$emit('closeModals', false)
    },
  },

  props: {
    showModals: Boolean,
  },
}
</script>
