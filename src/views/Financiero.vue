<template lang="">
  <div>
    <CRow>
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          @click="gotToPrueba"
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d; height: 240px;"
          :values="[{ title: 'Formulacion Presupuesto', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilDonate" style="color: #f5f5f5;" size="9xl" />
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
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d; height: 240px;"
          :values="[{ title: 'Ejecucion Presupuesto', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilMoney" style="color: #f5f5f5;" size="9xl" />
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
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d; height: 240px;"
          :values="[{ title: 'Activos fijos', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilGarage" style="color: #f5f5f5;" size="9xl" />
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
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d; height: 240px;"
          :values="[{ title: 'Nomina', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilAddressBook" style="color: #f5f5f5;" size="9xl" /> 
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
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d; height: 240px;"
          :values="[{ title: 'Contabilidad', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilDonate" style="color: #f5f5f5;" size="9xl" /> 
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
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d; height: 240px;"
          :values="[{ title: 'Conciliacion bancaria', value: '' }]"
        >
          <template #icon>
              <CIcon :icon="cilBank" style="color: #f5f5f5;" size="9xl" />
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
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d; height: 240px;"
          :values="[{ title: 'Cuentas por pagar', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilCreditCard" style="color: #f5f5f5;" size="9xl" />
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
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d; height: 240px;"
          :values="[{ title: 'Facturación y cobros', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilDollar" style="color: #f5f5f5;" size="9xl" />
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
    </CRow>
  </div>
</template>
<script>
import { CIcon } from '@coreui/icons-vue'
import { cilBarChart, cilFolderOpen, cilGarage, cilMoney, cilBuildingBusiness, cilAddressBook, cilDonate, cilBank, cilCreditCard, cilDollar } from '@coreui/icons-pro'
export default {
  components: {
    CIcon,
  },
  setup() {
    return {
      cilBarChart,
      cilFolderOpen,
      cilBuildingBusiness,
      cilAddressBook,
      cilDonate,
      cilBank,
      cilCreditCard,
      cilDollar,
      cilMoney,
      cilGarage
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
