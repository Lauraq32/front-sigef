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
              COMPRAS POR DEBAJO DEL UMBRAL
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
                      LMD-UC-CD-2022-0041 CONFECCIÓN DE LETREROS, BROCHUR Y
                      SELLO OAI.pdf</a
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
                      LMD-UC-CD-2022-0053 HERRAMIENTAS DE TRABAJO.pdf</a
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
                      LMD-UC-CD-2022-0054 SELLO LIGA MUNICIPAL.pdf</a
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
                      LMD-UC-CD-2022-0055 ALMUERZO 20 PERSONAS LMD Y
                      FEDOMU.pdf</a
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
              COMPRAS MENORES
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
                      LMD-DAF-CM-2022-0015 MOBILIARIOS Y ENSERES.pdf</a
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
                      LMD-DAF-CM-2022-0013 UNIFORMES.pdf</a
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
                      LMD-DAF-CM-2022-0014 (CANCELADO) CABLEADO
                      STRUCTURADO.pdf</a
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
          <li @click="visible2 = !visible2">
            <h5
              style="
                background-color: rgb(223 223 225 / 68%);

                padding: 15px;
                border-radius: 20px;
              "
            >
              COMPARACION DE PRECIOS
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
                      LMD-CCC-CP-2022-0008 CAMION COMPACTADOR.pdf</a
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
                      LMD-CCC-CP-2022-0010 AQUIPOS FOTOGRAFICOS.pdf</a
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
                      LMD-CCC-CP-2022-0011 DESIERTO TICKETS DE
                      COMBUSTIBLE.pdf</a
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
                      LMD-CCC-CP-2022-0001 ADECUACION Y REMODELACION DE LA
                      PALANTA FISICA LMD.pdf</a
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
          <li @click="visible3 = !visible3">
            <h5
              style="
                background-color: rgb(223 223 225 / 68%);

                padding: 15px;
                border-radius: 20px;
              "
            >
              LICITACION PUBLICA NACIONAL
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
                      LMD-CCC-LPN-2022-0007 ADQUISICION EQUIPOS
                      TECNOLOGICOS.pdf</a
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
                      LMD-CCC-LPN-2022-0003 ADQUISION DE DOS VEHICULOS TIPO
                      JEEP.pdf</a
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
                      LMD-LPN-2022-0001 CANCELADA COMPRA E INSTALACION DE
                      PANELES.pdf</a
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
                      LMD-CCC-LPN-2022-0006 ADQUISICION DE VEHICULOS.pdf</a
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
              PROCESOS EXCEPCION
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
                      LMD-CCC-PEPU-2022-0002 SEMANA SANTA.pdf</a
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
                      LMD-CCC-PEEX-2022-0009 CONFERENCIA MAGISTRAL.docx</a
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
                      LMD-CCC-PEEX-2022-0010 AUDIOVIDEO.pdf</a
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
                      LMD-CCC-PEEX-2022-0001 MAESTRIA DE CEREMONIA.docx</a
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
          <li @click="visible6 = !visible6">
            <h5
              style="
                background-color: rgb(223 223 225 / 68%);

                padding: 15px;
                border-radius: 20px;
              "
            >
              PROCESO DE URGENCIA
            </h5>
          </li>
        </ul>
        <CCollapse class="mt-3 mb-3" :visible="visible6">
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
      visible5: false,
      visible6: false,
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
