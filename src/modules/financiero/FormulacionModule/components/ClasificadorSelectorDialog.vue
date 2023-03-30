<template>
  <CModal
    backdrop="static"
    size="lg"
    :visible="isVisible"
    @close="closeDialog()"
  >
    <CModalBody>
        <CModalHeader>
            <CModalTitle>Clasificadores</CModalTitle>
        </CModalHeader>
      <CCardBody>
        <div v-if="isLoading" class="d-flex p-4 align-items-center justify-content-center w-100">
          <h3>Espere ....</h3>
        </div>
        <CSmartTable
          v-else
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :tableHeadProps="{}"
          :activePage="1"
          tableFilter
          header
          :items="clasificadores"
          :columns="columns"
          itemsPerPageSelect
          :itemsPerPage="10"
          :items-per-page-options="[10, 20, 50, 100, 150]"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
          <template #show_details="{ item }">
            <td class="py-2">
              <div class="d-flex justify-content-around">
                <CButton
                  class="mt-1"
                  color="primary"
                  variant="outline"
                  square
                  size="sm"
                  @click="closeDialog(item)"
                >Seleccionar</CButton>
              </div>
            </td>
          </template>
        </CSmartTable>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script setup>
    import { ref, watchEffect } from 'vue'
    import Api from '../services/FormulacionServices';
    
    import { CSmartTable } from '@coreui/vue-pro';
    import { CModal } from '@coreui/vue';

    const emit = defineEmits(['close']);
    const props = defineProps({
        isVisible: Boolean,
        filtered: {
            default: () => true
        },
        term: {
          default: ''
        }
    });

    const isLoading = ref(true);
    const clasificadores = ref([]);
    const columns = [
    { key: 'clasifica', label: 'Clasificador' },
    { key: 'cControl', label: 'Control' },
    { key: 'nombre', label: 'Detalle', _style: { width: '25%' } },
    {
        key: 'tipo',
        label: 'Tipo',
        filter: false,
        sorter: false,
        _style: { width: '5%' },
    },
    {
        key: 'show_details',
        label: '',
        _style: { width: '10%' },
        filter: false,
        sorter: false,
    },
    ];

    const closeDialog = (data) => {
        emit('close', data);
    }

    watchEffect(() => {
        if (props.isVisible && clasificadores.value.length === 0) {
            Api.getListarClasificadores()
            .then((response) => {
                const data = response.data.data;
                clasificadores.value = data.filter(props.filtered);
                isLoading.value = false;

                const found = clasificadores.value.find((clasificador) => clasificador.clasifica == props.term);
                if (found) {
                  closeDialog(found);
                }
            })
            .catch((error) => {
              console.error(error);
              isLoading.value = false;
            });
        }
    });
</script>
