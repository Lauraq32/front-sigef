<template lang="">
  <div>
    <CRow>
      <CCol :md="2" class="mt-4" style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d"
          :values="[{ title: 'Plan anual de compras', value: '' }]"
        >
          <template #icon>
            <CIcon :icon="cilWallet" style="color: #f5f5f5;" size="9xl" />
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
      <CCol :md="2" class="mt-4"  style="font-weight: bolder;">
        <CWidgetStatsD
          class="mb-4 shadow"
          style="--cui-card-cap-bg: #002e5d"
          :values="[{ title: 'Proceso de compras', value: '' }]"
      >
          <template #icon>
            <CIcon :icon="cilCart" style="color: #f5f5f5;" size="9xl" /> 
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
import { cilWallet, cilCart } from '@coreui/icons-pro'
export default {
  components: {
    CIcon,
  },
  setup() {
    return {
      cilWallet,
      cilCart
    }
  },
  name: 'Fianciero',
}
</script>
<style lang=""></style>
