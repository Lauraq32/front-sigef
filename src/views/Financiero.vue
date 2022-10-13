<template lang="">
  <div>
    <CRow>
      <CCol :md="2" class="mt-4" style="font-weight: bolder;" >
        <CWidgetStatsD
          @click="gotToPrueba"
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #f5f5f5"
          :values="[{ title: 'Formulacion Presupuesto', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilChartLine" style="50%" size="9xl" />
          </template>
          <template #chart>
            <CChart
              class="position-absolute w-100 h-100"
              type="line"
              :data="{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }"
              :options="options"
            />
          </template>
        </CWidgetStatsD>
      </CCol>
      <CCol :md="2" class="mt-4">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d"
          :values="[{ title: 'Ejecucion Presupuesto', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilFolderOpen"  style="color: #f5f5f5;" size="9xl" />
          </template>
          <template #chart>
            <CChart
              class="position-absolute w-100 h-100"
              type="line"
              :data="{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }"
              :options="options"
            />
          </template>
        </CWidgetStatsD>
      </CCol>
      <CCol :md="2" class="mt-4">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #375b80"
          :values="[{ title: 'Activos fijos', value: '' }]"
        >
          <template #icon>
            <img class="card-img-top" src="../assets/images/ActivosFijos.png"
          /></template>
          <template #chart>
            <CChart
              class="position-absolute w-100 h-100"
              type="line"
              :data="{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }"
              :options="options"
            />
          </template>
        </CWidgetStatsD>
      </CCol>
      <CCol :md="2" class="mt-4">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #375b80"
          :values="[{ title: 'Nomina', value: '' }]"
        >
          <template #icon>
            <img class="card-img-top" src="../assets/images/Nomina.png"
          /></template>
          <template #chart>
            <CChart
              class="position-absolute w-100 h-100"
              type="line"
              :data="{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }"
              :options="options"
            />
          </template>
        </CWidgetStatsD>
      </CCol>
      <CCol :md="2" class="mt-4">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #375b80"
          :values="[{ title: 'Contabilidad', value: '' }]"
        >
          <template #icon>
            <img class="card-img-top" src="../assets/images/Contabilidad.png"
          /></template>
          <template #chart>
            <CChart
              class="position-absolute w-100 h-100"
              type="line"
              :data="{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }"
              :options="options"
            />
          </template>
        </CWidgetStatsD>
      </CCol>
      <CCol :md="2" class="mt-4">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #375b80"
          :values="[{ title: 'Conciliacion bancaria', value: '' }]"
        >
          <template #icon>
            <img
              class="card-img-top"
              src="../assets/images/ConciliacionBancaria.png"
          /></template>
          <template #chart>
            <CChart
              class="position-absolute w-100 h-100"
              type="line"
              :data="{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }"
              :options="options"
            />
          </template>
        </CWidgetStatsD>
      </CCol>
      <CCol :md="2" class="mt-4">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #375b80"
          :values="[{ title: 'Cuentas por pagar', value: '' }]"
        >
          <template #icon>
            <img
              class="card-img-top"
              src="../assets/images/CuentasPorPagar.png"
          /></template>
          <template #chart>
            <CChart
              class="position-absolute w-100 h-100"
              type="line"
              :data="{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }"
              :options="options"
            />
          </template>
        </CWidgetStatsD>
      </CCol>
      <CCol :md="2" class="mt-4">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #375b80"
          :values="[{ title: 'Facturación y cobros', value: '' }]"
        >
          <template #icon>
            <img
              class="card-img-top"
              src="../assets/images/FacturacionYCobro.png"
          /></template>
          <template #chart>
            <CChart
              class="position-absolute w-100 h-100"
              type="line"
              :data="{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    backgroundColor: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [65, 59, 84, 84, 51, 55, 40],
                    fill: true,
                  },
                ],
              }"
              :options="options"
            />
          </template>
        </CWidgetStatsD>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import { CIcon } from '@coreui/icons-vue'
import { cilChartLine, cilFolderOpen } from '@coreui/icons-pro'
export default {
  components: {
    CIcon,
  },
  setup() {
    return {
      cilChartLine,
      cilFolderOpen,
    }
  },
  name: 'Fianciero',
  methods: {
    gotToPrueba() {
      this.$router.push({ name: 'clasificadores' })
    },
  },
}
</script>
<style lang=""></style>
