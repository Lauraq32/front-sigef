<template lang="">
  <div>
    <CRow>
      <CCol :md="3">
        <CCard style="width: 18rem" class="mt-4">
          <CCardImage orientation="top" src="/images/vue.jpg" />
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText
              >Some quick example text to build on the card title and make up
              the bulk of the card's content.</CCardText
            >
            <CButton href="#">Go somewhere</CButton>
          </CCardBody>
        </CCard>
      </CCol>
     
    </CRow>
  </div>
</template>
<script>
export default {
  name: 'Fianciero',
}
</script>
<style lang=""></style>
