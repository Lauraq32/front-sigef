<template lang="">
  <CContainer lg>
    <div>
      <CRow>
        <CCol :md="2"></CCol>
        <CCol :md="2" class="mt-4" style="font-weight: bolder">
          <CWidgetStatsD
            @click="gotToPrueba"
            class="mb-4 shadow"
            style="--cui-card-cap-bg: #002e5d; height: 240px"
            :values="[{ title: 'Financiero', value: '' }]"
          >
            <template #icon>
              <CIcon :icon="cilBank" style="color: #f5f5f5" size="9xl" />
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
        <CCol :md="2" class="mt-4" style="font-weight: bolder">
          <CWidgetStatsD
            @click="gotToPrueba"
            class="mb-4 shadow"
            style="--cui-card-cap-bg: #002e5d; height: 240px"
            :values="[{ title: 'Compras', value: '' }]"
          >
            <template #icon>
              <CIcon :icon="cilCart" style="color: #f5f5f5" size="9xl" />
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
        <CCol :md="2" class="mt-4" style="font-weight: bolder">
          <CWidgetStatsD
            @click="gotToPrueba"
            class="mb-4 shadow"
            style="--cui-card-cap-bg: #002e5d; height: 240px"
            :values="[{ title: 'RRHH', value: '' }]"
          >
            <template #icon>
              <CIcon :icon="cilWc" style="color: #f5f5f5" size="9xl" />
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
        <CCol :md="2" class="mt-4" style="font-weight: bolder">
          <CWidgetStatsD
            @click="gotToPrueba"
            class="mb-4 shadow"
            style="--cui-card-cap-bg: #002e5d; height: 240px"
            :values="[{ title: 'Administrativo', value: '' }]"
          >
            <template #icon>
              <CIcon :icon="cilContact" style="color: #f5f5f5" size="9xl" />
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
  </CContainer>
</template>
<script>
import { CIcon } from '@coreui/icons-vue'
import {
  cilBarChart,
  cilFolderOpen,
  cilGarage,
  cilMoney,
  cilBuildingBusiness,
  cilAddressBook,
  cilDonate,
  cilBank,
  cilContact,
  cilCreditCard,
  cilWc,
  cilCart,
  cilDollar,
} from '@coreui/icons-pro'
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
      cilWc,
      cilContact,
      cilCart,
      cilCreditCard,
      cilDollar,
      cilMoney,
      cilGarage,
    }
  },
  name: 'Fianciero',
  methods: {
    gotToPrueba() {
      this.$router.push({ name: 'Formulación Ingreso' })
    },
    gotToPrueba1() {
      this.$router.push({ name: 'categorias' })
    },
    gotToPrueba2() {
      this.$router.push({ name: 'ejecucionIngreso' })
    },
    gotToPrueba3() {
      this.$router.push({ name: 'nominas' })
    },
    gotToPrueba4() {
      this.$router.push({ name: 'cuentasContables' })
    },
    gotToPrueba5() {
      this.$router.push({ name: 'CuentasDebanco' })
    },
    gotToPrueba6() {
      this.$router.push({ name: 'documentosPorPagar' })
    },
    gotToPrueba7() {
      this.$router.push({ name: 'Sectores' })
    },
  },
}
</script>
<style lang=""></style>
