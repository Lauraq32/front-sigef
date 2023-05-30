<template>
  <AppActionHeader :actions="pageActions">
    <CButton color="secondary" @click="goToComprobanteIngreso">Ir a Comprobante ingreso</CButton>
  </AppActionHeader>
  <!-- <CButton color="secondary" @click="goToGasto">Ir a Formulaci&oacute;n Gasto</CButton>  -->



  <!-- <CompranteGastoCapturaDialog :showModal="ComprobanteoDialog" />
  <FormularioCodificacionGastoDialog :showModal="FormularioCodificacionGastoDialog" /> -->
</template>
<script>

import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import CompranteGastoCapturaDialog from '../components/dialogs/CompranteGastoCapturaDialog.vue'
import FormularioCodificacionGastoDialog from '../components/dialogs/FormularioCodificacionGastoDialog.vue'
import AppActionHeader from '@/components/AppActionHeader.vue'
import router from '@/router'
export default {
  components: {
    CompranteGastoCapturaDialog,
    FormularioCodificacionGastoDialog,
    AppActionHeader,
  },
  data: function () {
    return {
      ComprobanteoDialog: false,
      FormularioCodificacionGastoDialog: false,
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),

    showComprobanteDialog() {
      this.ComprobanteoDialog = true
    },
    showFormularioCodificacionGastoDialog() {
      this.FormularioCodificacionGastoDialog = true
    },
    funcionVacia() {
      console.log('Prueba')
    },
    goToComprobanteIngreso() {
      router.push({ name: 'comprobanteIngreso' })
    }
  },
  computed: {
    pageActions() {
      const actions = [
        {
          label: 'Imprimir',
          accionHandler: this.funcionVacia(),
          icon: 'cilPrint'
        },
        {
          label: 'Descargar',
          accionHandler: this.funcionVacia(),
          icon: 'cilCloudDownload'
        }
      ];

      if (!this.isFiscalYearApprovedOrClose) {
        actions.push({
          label: 'Importar Ingresos',
          accionHandler: this.funcionVacia(),
          type: 'upload'
        });
      }

      return actions;
    }
  }
}
</script>
  
<style>
.top {
  margin-top: 27px;
}

.left {
  margin-left: 910px;
  margin-top: 15px;
}
</style>
  

<!-- data:{

    "detalle": "detalle ",
  
    "fecha": "2023-05-29",
  
    "etapa": "Devengado",
  
    "codBenefi": 1,
  
    "destGasto": 1,
  
    "bancoId": 1,
  
    "nCheque": "1",
  
    "totalBruto": 1,
  
    "valorNeto": 1,
  
    "fechaResolucion": "2023-05-29",
  
    "nResolucion": "1",
  
    "cantFactCXP": 1,
  
    "totalCXP": 1,
  
    "cantPGrupo": 1,
  
    "totalPGrupo": 1,
  
    "cantRetenci": 1,
  
    "totalRetenciones": 1,
  
    "dtoInicial": 1,
  
    "dtoFinal": 1,
  
    "cantDocto": 1,
  
    "estatus": "1",
  
    "tipoGastoId": 1,
  
    "detalleRegistroGastos": [
  
      {
  
        "fecha": 2,
  
        "bancoId": 1,
  
        "estProg": "100",
  
        "ctgClasificadorId": "211104",
  
        "ctgFuenteId": "10",
  
        "ctgFuenteEspecificaId": "0100",
  
        "ctgOrganismoFinanciadorId": "0101",
  
        "ctgFuncionId": "1102",
  
        "valorBruto": 1000,
  
        "baseImponible": 200,
  
        "retenciones": 1,
  
        "neto":800,
  
        "detaRetencionDto": [
  
          {
  
            "fecha": "2023-05-29",
  
            "beneficiarioId": 1,
  
            "bancoId": 1,
  
            "fAplica": 1,
  
            "retencion": 1,
  
            "ctgMestProgId": "0001000000",
  
            "cuenta": "0115641",
  
            "parteAplica": "1",
  
            "mAplica": 1,
  
            "mAplicado": 1,
  
            "orden": 1,
  
            "estCuenta": "una cuenta",
  
            "ctgFuenteId": "10",
  
            "ctgFuenteEspecificaId": "0100",
  
            "ctgOrganismoFinanciadorId": "0101"
  
          }
  
        ]
  
      }
  
    ]
  
  } -->