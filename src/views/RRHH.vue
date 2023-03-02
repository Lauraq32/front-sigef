<template lang="">
  <CContainer lg>
    <div>
      <CRow>
        <CCol :md="2" class="mt-4" style="font-weight: bolder">
          <CWidgetStatsD
            @click="gotToPrueba"
            class="mb-4 shadow"
            style="--cui-card-cap-bg: #002e5d; height: 240px"
            :values="[{ title: 'Registro de personal', value: '' }]"
          >
            <template #icon>
              <CIcon :icon="cilSmilePlus" style="color: #f5f5f5" size="9xl"
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
        <CCol :md="2" class="mt-4" style="font-weight: bolder">
          <CWidgetStatsD
            class="mb-4 shadow"
            style="--cui-card-cap-bg: #002e5d; height: 240px"
            :values="[{ title: 'Evaluación de desempeño', value: '' }]"
          >
            <template #icon>
              <CIcon
                :icon="cilCalendarCheck"
                style="color: #f5f5f5"
                size="9xl"
              />
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
            class="mb-4 shadow"
            style="--cui-card-cap-bg: #002e5d; height: 240px"
            :values="[{ title: 'Acciones de personal', value: '' }]"
          >
            <template #icon>
              <CIcon
                :icon="cilChalkboardTeacher"
                style="color: #f5f5f5"
                size="9xl"
              />
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
export default {
  components: {},
  setup() {
    return {}
  },
  methods: {
    gotToPrueba() {
      this.$router.push({ name: 'RegistroEmpleados' })
    },
  },
}
</script>
<style lang=""></style>
