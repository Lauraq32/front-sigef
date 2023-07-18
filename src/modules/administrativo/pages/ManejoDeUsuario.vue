<template>
  <h3 class="text-center mb-4">Usuarios</h3>
  <CCard class="mb-4">
    <CCardBody class="table-headers justify-content-between">
      <div class="d-inline-flex gap-3 align-items-center">
        <CFormLabel class="form-label col-auto col-form-label"
          >Filtro:</CFormLabel
        >
        <CFormSelect
          id="userStatusSelect"
          @change="handleFilterUserByStatus"
          aria-label="Selecionar estatus del usuario"
          :options="filtroOption"
        />
      </div>

      <div>
        <div class="d-flex gap-1">
          <CButton color="info" @click="showModalManejoDeUsuario = true"
            >Agregar</CButton
          >
        </div>
      </div>
    </CCardBody>
  </CCard>

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
    :items="listUsuarios"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'nombre', state: 'asc' }"
    pagination
  >
    <template #show_details="{ item }">
      <td v-if="filterValue === 'true'">
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline"
            >Acciones</CDropdownToggle
          >
          <CDropdownMenu>
            <CDropdownItem
              v-for="action in actionTable"
              @click="action.clickHandler && action.clickHandler(item)"
              >{{ action.label }}</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
      </td>
      <td v-else>
        <CButton
          color="success"
          variant="outline"
          @click="() => activarUsuario(item)"
        >
          Reactivar
        </CButton>
      </td>
    </template>
  </CSmartTable>

  <modalManejoDeUsuario
    :usuarioModal="showModalManejoDeUsuario"
    :usuarioToUpdate="usuarioToUpdate"
    @close-modal="closeModal"
    @post-usuario="sumitUsuario"
  />
</template>

<script>
import Api from '@/modules/administrativo/Usuario/services/AdministrativoServices'
import { CSmartTable, CButton } from '@coreui/vue-pro'
import modalManejoDeUsuario from '../components/modal/modalManejoUsuario.vue'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  name: 'manejoDeUsuario',
  components: {
    CSmartTable,
    modalManejoDeUsuario,
    CButton,
  },

  data: function () {
    return {
      showModalManejoDeUsuario: false,
      usuarioToUpdate: {},
      listUsuarios: [],
      filterValue: 'true',
      filtroOption: [
        { label: 'Activo', value: 'true' },
        { label: 'Inactivo', value: 'false' },
      ],
      columns: [
        { key: 'nombre', label: 'Nombre', _style: { width: '20%' } },
        { key: 'userName', label: 'Usuario', _style: { width: '10%' } },
        { key: 'email', label: 'Email', _style: { width: '25%' } },
        { key: 'rolId', label: 'Rol', _style: { width: '10%' } },
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
            colspan: 5,
            style: 'font-weight:bold;',
          },
        },
      ],
      actionTable: [
        {
          label: 'Editar',
          clickHandler: (item) => {
            this.showModalManejoDeUsuario = true
            this.usuarioToUpdate = { ...item }
          },
        },
        {
          label: 'Resetear contraseña',
          clickHandler: (value) => {
            this.resetPassword(value)
          },
        },
        {
          label: 'Cancelar usuario',
          clickHandler: (item) => {
            this.cancelarUsuario(item)
          },
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    sumitUsuario(payload) {
      if (payload.id) {
        Api.putUsuario(payload.id, payload)
          .then((response) => {
            this.show({
              content: response.data,
              closable: true,
              color: 'inherit',
            })
            setTimeout(this.getUsuarios, 500)
            this.usuarioToUpdate = {}
          })
          .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        Api.postUsuario(payload)
          .then((response) => {
            this.show({
              content: response.data,
              closable: true,
              color: 'inherit',
            })
            setTimeout(this.getUsuarios, 500)
            this.usuarioToUpdate = {}
          })
          .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      }
    },

    getUsuarios(target) {
      Api.getUsuarioList(target).then((response) => {
        this.listUsuarios = response.data.data
        this.footerItem[0].label = `Total Items: ${response.data.data.length}`
      })
    },

    closeModal() {
      this.showModalManejoDeUsuario = false
    },

    handleFilterUserByStatus({ target }) {
      this.getUsuarios({
        estado: target.value,
      })
      this.filterValue = target.value
    },

    resetPassword(item) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Está usted seguro que quieres resetear la clave de este usuario?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'btns',
      }).then((answer) => {
        if (answer.isConfirmed) {
          Api.resetPassWord(item.id)
            .then((response) => {
              this.show({
                content: response.data,
                closable: true,
                color: 'inherit',
              })
              setTimeout(this.getUsuarios, 500)
            })
            .catch((error) => {
              this.show({
                content: error.response.data,
                closable: true,
                color: 'danger',
                class: 'text-white',
              })
            })
        }
      })
    },
    cancelarUsuario(item) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Está usted seguro que quieres cancelar este usuario?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'btns',
      }).then((answer) => {
        if (answer.isConfirmed) {
          Api.cancelarUsuario(item.id)
            .then((response) => {
              this.show({
                content: response.data,
                closable: true,
                color: 'inherit',
              })
              setTimeout(
                () =>
                  this.handleFilterUserByStatus({ target: { value: 'true' } }),
                500,
              )
            })
            .catch((error) => {
              this.show({
                content: error.response.data,
                closable: true,
                color: 'danger',
                class: 'text-white',
              })
            })
        }
      })
    },
    activarUsuario(item) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Está usted seguro que quieres re-activar este usuario?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'btns',
      }).then((answer) => {
        if (answer.isConfirmed) {
          Api.reactivarUsuario(item.id)
            .then((response) => {
              this.show({
                content: response.data.message,
                closable: true,
                color: 'inherit',
              })
              setTimeout(
                () =>
                  this.handleFilterUserByStatus({ target: { value: 'false' } }),
                500,
              )
            })
            .catch((error) => {
              this.show({
                content: error.response.data,
                closable: true,
                color: 'danger',
                class: 'text-white',
              })
            })
        }
      })
    },
  },

  mounted() {
    this.getUsuarios()
  },
}
</script>
