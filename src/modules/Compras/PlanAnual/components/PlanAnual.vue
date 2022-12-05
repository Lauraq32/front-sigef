<template>
  <h1 style="text-align:center">Plan anual de compras</h1>
  <hr>
  <div class="caja">
    <ol>
      <li style="list-style: none" @click="visible = !visible" aria-current="true">
        <h5 style="
            background-color: rgb(223 223 225 / 68%);
            
            padding: 15px;
            border-radius: 20px;
          ">
          Plan anual de compras liga municipal dominicana(LMD) 2023
        </h5>
      </li>
    </ol>

    <CCollapse class="mt-3 mb-3" :visible="visible">
      <CCard class="mt-3">
        <CCardBody>
          <ol style="">
            <div class="d-flex justify-content-between mt-3">
              <li>
                <a target="blanck"
                  href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir">
                  Proceso de compras 1 </a>

                 


              </li>
              <span>50,000.00RD$</span>


              <CIcon icon="cisCheckCircle" size="lg" />
            </div>
            <div class="d-flex justify-content-between mt-3">
              <li>
                <a target="blanck"
                  href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir">
                  Proceso de compras 2</a>
              </li>

              <CIcon icon="cisCheckCircle" size="lg" />
            </div>

            <div class="d-flex justify-content-between mt-3">
              <li>
                <a target="blanck"
                  href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir">
                  Proceso de compras 3</a>
              </li>

              <CIcon icon="cisCheckCircle" size="lg" />
            </div>
            <div class="d-flex justify-content-between mt-3">
              <li>
                <a target="blanck"
                  href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir">
                  Proceso de compras 4</a>
              </li>

              <CIcon icon="cisCheckCircle" size="lg" />
            </div>
          </ol>
        </CCardBody>
      </CCard>
    </CCollapse>


  </div>
</template>
<script>
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'
export default {
  data() {
    return {
      icon,
      CIcon,
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
    }
  },
}
</script>

<style>
a {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
</style>
