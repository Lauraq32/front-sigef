<template>
  <div class="caja">
    <ol>
      <li>
        <ol>
          <li
            style="list-style: none"
            @click="visible = !visible"
            aria-current="true"
          >
            <h5
              style="
                background-color: rgb(223 223 225 / 68%);

                padding: 15px;
                border-radius: 20px;
              "
            >
              ADQUISICION DE EQUIPO DE LIMPIEZA
            </h5>
          </li>
        </ol>

        <CCollapse class="mt-3 mb-3" :visible="visible">
          <CCard class="mt-3">
            <CCardBody>
              <ol style="">
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0002 - Pliego de condiciones -ADQUISICION
                      DE EQUIPOS DE LIMPIEZA.pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0002-CONVOCATORIA-ADQUISICION DE EQUIPOS
                      DE LIMPIEZA.pdf</a
                    >
                  </li>

                  <CIcon style="color: red" icon="cilXCircle" size="lg" />
                </div>

                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0002-SOLICITUD DE COMPRAS.pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0000-REQ-71170.pdf</a
                    >
                  </li>

                  <CIcon style="color: red" icon="cilXCircle" size="lg" />
                </div>
              </ol>
            </CCardBody>
          </CCard>
        </CCollapse>
      </li>

      <li>
        <ul style="list-style: none" class="list">
          <li @click="visible1 = !visible1">
            <h5
              style="
                background-color: rgb(223 223 225 / 68%);

                padding: 15px;
                border-radius: 20px;
              "
            >
              SUMINISTRO Y COLOCACIÓN DE HORMIGÓN
            </h5>
          </li>
        </ul>
        <CCollapse class="mt-3 mb-3" :visible="visible1">
          <CCard class="mt-3">
            <CCardBody>
              <ol style="">
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      Apropiacion de Fondos.pdf</a
                    >
                  </li>

                  <CIcon style="color: red" icon="cilXCircle" size="lg" />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      Solicitud de Compra.pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>

                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      Suministro de Hormigon Convocatoria.pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      Suministro de Hormigon Pliego de Condiciones
                      Especificas.pdf</a
                    >
                  </li>

                  <CIcon style="color: red" icon="ccilXCircle" size="lg" />
                </div>
              </ol>
            </CCardBody>
          </CCard>
        </CCollapse>
      </li>
      <li>
        <ul style="list-style: none" class="list">
          <li @click="visible2 = !visible2">
            <h5
              style="
                background-color: rgb(223 223 225 / 68%);

                padding: 15px;
                border-radius: 20px;
              "
            >
              ADQUISICION DE BOMBA DE SUCCION PARA SER UTILIZADA EN CAMION
              SUCCIONADOR
            </h5>
          </li>
        </ul>
        <CCollapse class="mt-3 mb-3" :visible="visible2">
          <CCard class="mt-3">
            <CCardBody>
              <ol style="">
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0007-CERTIFICACION DE FONDOS.pdf</a
                    >
                  </li>

                  <CIcon style="color: red" icon="cilXCircle" size="lg" />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0007-REQUERIMIENTO 71322.pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>

                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0007-SOLICITUD DE COMPRAS.pdf</a
                    >
                  </li>

                  <CIcon style="color: red" icon="cilXCircle" size="lg" />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0007-Pliego de condiciones-Adquisicion de
                      Bomba de Succion (1).pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
              </ol>
            </CCardBody>
          </CCard>
        </CCollapse>
      </li>
      <li>
        <ul style="list-style: none" class="list">
          <li @click="visible3 = !visible3">
            <h5
              style="
                background-color: rgb(223 223 225 / 68%);

                padding: 15px;
                border-radius: 20px;
              "
            >
              RECONSTRUCCIÓN DE CANCHA EN SECTOR LOS PERALEJOS
            </h5>
          </li>
        </ul>
        <CCollapse class="mt-3 mb-3" :visible="visible3">
          <CCard class="mt-3">
            <CCardBody>
              <ol style="">
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      Cancha Los Peralejos Convocatoria.pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      SNCC_C026_Contrato_Ejecucion_de_Obras.docx</a
                    >
                  </li>

                  <CIcon style="color: red" icon="cilXCircle" size="lg" />
                </div>

                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      Cancha Los Peralejos Pliego de Condiciones.pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      SNCC_F034_Presentacion_de_Oferta.docx</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
              </ol>
            </CCardBody>
          </CCard>
        </CCollapse>
      </li>
      <li>
        <ul style="list-style: none" class="list">
          <li @click="visible4 = !visible4">
            <h5
              style="
                background-color: rgb(223 223 225 / 68%);

                padding: 15px;
                border-radius: 20px;
              "
            >
              ADQUISICION DE TINTAS PARA IMPRESORAS (TONERS Y CARTUCHOS)
            </h5>
          </li>
        </ul>
        <CCollapse class="mt-3 mb-3" :visible="visible4">
          <CCard class="mt-3">
            <CCardBody>
              <ol style="">
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0043 - Pliego de condiciones - ADQUISICION
                      DE TINTAS PARA IMPRESORAS.pdf</a
                    >
                  </li>

                  <CIcon style="color: red" icon="cilXCircle" size="lg" />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0043-CONVOCATORIA.pdf</a
                    >
                  </li>

                  <CIcon style="color: red" icon="cilXCircle" size="lg" />
                </div>

                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      ADN-DAF-CM-2022-0047 SOLICITUD DE COMPRAS.pdf</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <li>
                    <a
                      target="blanck"
                      href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidl4-sj9n7AhWWmWoFHSE_Di8QFnoECAoQAQ&url=https%3A%2F%2Fwww.digepres.gob.do%2Fwp-content%2Fuploads%2F2019%2F08%2FLey-87-01-que-crea-el-Sistema-Nacional-de-Seguridad-Social.pdf&usg=AOvVaw3emafIdFoY1w09QQ3UwKir"
                    >
                      SNCC_F042_Informacion_Oferente.docx</a
                    >
                  </li>

                  <CIcon
                    style="color: #33a133"
                    icon="cisCheckCircle"
                    size="lg"
                  />
                </div>
              </ol>
            </CCardBody>
          </CCard>
        </CCollapse>
      </li>
    </ol>
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
