<template>
  <h3 class="text-center">Mantenimientos Empleados</h3>

  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            lgDemo = true
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    clickableRows
    :tableProps="{
      striped: false,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    header
    :items="registroPersonal"
    :columns="columns"
    columnFilter
    tableFilter
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item, index)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
        </CButton>
      </td>
    </template>
    <template #details="{ item }">
      <CCollapse :visible="this.details.includes(item._id)">
        <CCardBody>
          <h4>
            {{ item.username }}
          </h4>
          <p class="text-muted">User since: {{ item.registered }}</p>
          <CButton size="sm" color="info" class=""> User Settings </CButton>
          <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
        </CCardBody>
      </CCollapse>
    </template>
  </CSmartTable>
  <CModal
    size="xl"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Formulario de empleados</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 1"
              @click="
                () => {
                  tabPaneActiveKey = 1
                }
              "
            >
              General
            </CNavLink>
          </CNavItem>
          <!-- <CNavItem>
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 2" @click="
              () => {
                tabPaneActiveKey = 2
              }
            ">
              Otros ingresos
            </CNavLink>
          </CNavItem> -->
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 3"
              @click="
                () => {
                  tabPaneActiveKey = 3
                }
              "
            >
              Observación
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 4"
              @click="
                () => {
                  tabPaneActiveKey = 4
                }
              "
            >
              Historial clínico
            </CNavLink>
          </CNavItem>
          <!-- <CNavItem>
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 5" @click="
              () => {
                tabPaneActiveKey = 5
              }
            ">
              Acumulado anual
            </CNavLink>
          </CNavItem> -->
        </CNav>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="home-tab"
            :visible="tabPaneActiveKey === 1"
          >
            <div class="row">
              <div class="col-4 border p-3">
                <h3>Datos generales</h3>
                <!-- <CCol>
                  <CFormLabel for="validationCustom01">Código</CFormLabel>
                  <CFormInput  v-model="postEmpleado.codigo" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol> -->
                <CCol>
                  <CFormLabel for="validationCustom02">Cédula</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.cedula"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Nombre</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.nombres"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Apellidos</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.apellidos"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Dirección</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.direccion"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Sector</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.sectorId"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Ciudad</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Teléfono</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.telefono"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom05"
                    >Tipo de documento</CFormLabel
                  >
                  <CFormSelect
                    v-model="postEmpleado.tipoDocumento"
                    id="validationCustom05"
                  >
                    <option>Tipo1</option>
                    <option>Tipo2</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Fecha nacimiento</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.fechaNacimiento"
                    type="date"
                    id="validationCustom01"
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Lugar de nacimiento</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.lugarNacimiento"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom05">Sexo</CFormLabel>
                  <CFormSelect
                    v-model="postEmpleado.sexo"
                    id="validationCustom05"
                  >
                    <option>M</option>
                    <option>F</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Dependientes</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.dependientes"
                    type="number"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Datos laborales</h3>
                <CCol :md="12">
                  <CFormLabel for="validationCustom01"
                    >Fecha ingreso</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.fechaIngreso"
                    type="date"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Programa</CFormLabel>
                  <CFormSelect id="validationCustom05">
                    <option>Programa 1</option>
                    <option>Programa 2</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05"
                    >Dirección o dependencia</CFormLabel
                  >
                  <CFormSelect id="validationCustom05">
                    <option>Dirección o dependencia 1</option>
                    <option>Dirección o dependencia 2</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05"
                    >Área de trabajo</CFormLabel
                  >
                  <CFormSelect
                    v-model="postEmpleado.areaTrabajoId"
                    id="validationCustom05"
                  >
                    <option>Área de trabajo 1</option>
                    <option>Área de trabajo 2</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Cargo</CFormLabel>
                  <CFormSelect
                    v-model="postEmpleado.posicionId"
                    id="validationCustom05"
                  >
                    <option>Cargo 1</option>
                    <option>Cargo 2</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <div class="row">
                  <CCol :md="6">
                    <CFormLabel for="validationCustom05"
                      >Tipo de contrato</CFormLabel
                    >
                    <CFormSelect
                      v-model="postEmpleado.tipoContrato"
                      id="validationCustom05"
                    >
                      <option>Tipo de contrato 1</option>
                      <option>Tipo de contrato 2</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">Turno</CFormLabel>
                    <CFormSelect
                      v-model="postEmpleado.turno"
                      id="validationCustom05"
                    >
                      <option>Turno 1</option>
                      <option>Turno 2</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">Tipo cobro</CFormLabel>
                    <CFormSelect id="validationCustom05">
                      <option>Tipo cobro 1</option>
                      <option>Tipo cobro 2</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>

                <CCol>
                  <CFormLabel for="validationCustom05">Tipo de pago</CFormLabel>
                  <CFormSelect
                    v-model="postEmpleado.formaPago"
                    id="validationCustom05"
                  >
                    <option>Tipo de pago 1</option>
                    <option>Tipo de pago 2</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Sueldo actual</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.sueldo"
                    type="number"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <!-- <h4>Retenciones de Ley</h4>

                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Impuestos S.R</CFormLabel
                  >
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">ARS</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">AFP</CFormLabel>
                  <CFormInput type="number" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol> -->
              </div>

              <div class="col-4 border p-3">
                <div class="border" style="height: 40%"></div>
                <h4>RUTA\34354.JPG</h4>
                <h4>Guardar Imagen</h4>
                <h4>Abrir Carpeta</h4>
              </div>
            </div>
          </CTabPane>
          <!-- <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
            <div class="row">
              <div class="col-4 border p-3">
                <h3>Ingresos</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01">Sueldo fijo:</CFormLabel>
                  <CFormInput disabled id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Horas extras:</CFormLabel
                  >
                  <CFormInput disabled id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Serv. Especiales:</CFormLabel
                  >
                  <CFormInput disabled id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Gastos de rep</CFormLabel
                  >
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Vacaciones</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Retenciones</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01">SFS ADIC.</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">SFS COMP:</CFormLabel>
                  <CFormInput disabled id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">COOPADOMU</CFormLabel>
                  <CFormInput disabled id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">IMRESCONDO</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Inf sobre el movimiento del registro</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Fecha adiciona</CFormLabel
                  >
                  <CFormInput type="date" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Usuario adiciona:</CFormLabel
                  >
                  <CFormInput disabled id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Fecha modifica:</CFormLabel
                  >
                  <CFormInput disabled id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Usuario modifica</CFormLabel
                  >
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Valores anteriores</CFormLabel
                  >
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
          </CTabPane> -->
          <CTabPane
            role="tabpanel"
            aria-labelledby="contact-tab"
            :visible="tabPaneActiveKey === 3"
          >
            <div class="row">
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Licencia de conducir</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.licenciaConducir"
                    type="date"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Fecha expiraci licencia de conducir</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.fechaExpiracionLicencia"
                    type="date"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Fecha expira tarjeta del banco:</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.fechaExpitaTarjeta"
                    typeof="date"
                    id="validationCustom01"
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Otros</h3>
              </div>
            </div>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="profile-tab"
            :visible="tabPaneActiveKey === 4"
          >
            <div class="row">
              <div class="col-4 border p-3">
                <h3>En caso de emergencia comunicarse con</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01">Nombres</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.emergenciaNombre"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Teléfono</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.emergenciaTelefono"
                    disabled
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Dirección</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.emergenciaDireccion"
                    id="validationCustom01"
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom05">Parentezco</CFormLabel>
                  <CFormSelect
                    v-model="postEmpleado.emergenciaParentezco"
                    id="validationCustom05"
                  >
                    <option>Padre</option>
                    <option>Madre</option>
                    <option>Hermano/a</option>
                    <option>Esposo/a</option>
                    <option>Amigo/a</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Información medica del empleado</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01">Alta</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Teléfonos</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.telefono"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Dirección</CFormLabel>
                  <CFormInput id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Parentesco</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Parentesco</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom05"
                    >Nivel de presión</CFormLabel
                  >
                  <CFormSelect id="validationCustom05">
                    <option>Alta</option>
                    <option>Baja</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Inf sobre el movimiento del registro</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Fecha adiciona</CFormLabel
                  >
                  <CFormInput type="date" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Usuario adiciona:</CFormLabel
                  >
                  <CFormInput disabled id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Fecha modifica:</CFormLabel
                  >
                  <CFormInput disabled id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Usuario modifica</CFormLabel
                  >
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Valores anteriores</CFormLabel
                  >
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <h3>Intervención quirurgica(más reciente)</h3>

                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Detalle diagnostico</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.telefono"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
          </CTabPane>

          <!-- <CTabPane role="tabpanel" aria-labelledby="contact-tab" :visible="tabPaneActiveKey === 5">
            <div class="row">
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Enero</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Febrero</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Marzo</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Abril</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Mayo</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Junio</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Julio</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Agosto</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Septiembre</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Octubre</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Noviembre</CFormLabel>
                  <CFormInput id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Diciembre</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Valor regalia</CFormLabel
                  >
                  <CFormInput disabled id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Meses trabajados</CFormLabel
                  >
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
          </CTabPane> -->
        </CTabContent>
      </div>
    </CModalBody>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
      <button type="button" class="btn btn-primary" v-on:click="submitForm">
        Guardar
      </button>
    </div>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/RegistroPersonal/Empleados'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      postEmpleado: {
        //General
        // codigo: null,
        // nombres:null,
        // apellidos:null,
        // tipoDocumento:null,
        // cedula:null,
        // direccion:null,
        // sectorId:0,
        // telefono:"",
        // fechaNacimiento:new Date(Date.now()),
        // lugarNacimiento:"",
        // estadoCivil:"",
        // sexo:0,
        // dependientes:0,
        // fechaIngreso:new Date(Date.now()),
        // programaDivisionId:0,
        // areaTrabajoId:0,
        // posicionId:0,
        // tipoContrato:"",
        // turno:"",
        // formaPago:"",
        // sueldo:0,
        // impuestoSobreRenta:0,
        // arsFijo:0,
        // afpfijo:0,

        // //Observacion
        // licenciaConducir:"",
        // fechaExpiracionLicencia:new Date(Date.now()),
        // fechaExpitaTarjeta:new Date(Date.now()),
        // //HistorialClinico
        // emergenciaNombre:"",
        // emergenciaTelefono:"",
        // emergenciaDireccion:"",
        // emergenciaParentezco:"",

        // //Acumulado anual
        // eneroIngreso:0,
        // febreroIngreso:0,
        // marzoIngreso:0,
        // abrilIngreso:0,
        // mayoIngreso:0,
        // junioIngreso:0,
        // julioIngreso:0,
        // agostoIngreso:0,
        // septiembreIngreso:0,
        // octubreIngreso:0,
        // noviembreIngreso:0,
        // diciembreIngreso:0,

        //---------------------------------
        // id: 0,
        // ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        // codigo: null,
        // nombres: null,
        // apellidos: null,
        // tipoDocumento: null,
        // cedula: '402338292541',
        // direccion: null,
        // sectorId: 1,
        // telefono: null,
        // celular: null,
        // fechaNacimiento: new Date(Date.now()),
        // lugarNacimiento: null,
        // estadoCivil: null,
        // sexo: "M",
        // dependientes: 0,
        // fechaIngreso: new Date(Date.now()),
        // fechaSalida: new Date(Date.now()),
        // razonSalida: null,
        // reemplear: true,
        // fechaReingreso: new Date(Date.now()),
        // departamentoId: 0,
        // areaTrabajoId: 0,
        // posicionId: 0,
        // grupoOcupacional: null,
        // tipoContrato: null,
        // fechaInicioContrato: new Date(Date.now()),
        // fechaFinContrato: new Date(Date.now()),
        // turno: null,
        // periodoPago: null,
        // formaPago: null,
        // numeroCuenta: null,
        // fechaExpitaTarjeta: new Date(Date.now()),
        // estatus: true,
        // sueldo: 0,
        // sueldoAnterior: 0,
        // fechaSueldoAnterior: new Date(Date.now()),
        // fechaUltimaNomina: new Date(Date.now()),
        // inicioVacaciones: new Date(Date.now()),
        // finVacaciones: new Date(Date.now()),
        // activoNomina: true,
        // ingreso2: 0,
        // ingreso3: 0,
        // ingreso4: 0,
        // ingreso5: 0,
        // ingreso6: 0,
        // ingreso7: 0,
        // ingreso8: 0,
        // ingreso9: 0,
        // ingreso10: 0,
        // impuestoSobreRenta: 0,
        // arsCalculado: true,
        // arsFijo: 0,
        // afpCalculado: true,
        // afpFijo: 0,
        // egresos4: 0,
        // egresos5: 0,
        // egresos6: 0,
        // egresos7: 0,
        // egresos8: 0,
        // egresos9: 0,
        // egresos10: 0,
        // eneroIngreso: 0,
        // febreroIngreso: 0,
        // marzoIngreso: 0,
        // abrilIngreso: 0,
        // mayoIngreso: 0,
        // junioIngreso: 0,
        // julioIngreso: 0,
        // agostoIngreso: 0,
        // septiembreIngreso: 0,
        // octubreIngreso: 0,
        // noviembreIngreso: 0,
        // diciembreIngreso: 0,
        // observacion: null,
        // discapacidad: null,
        // emergenciaNombre: null,
        // emergenciaTelefono: null,
        // emergenciaTelefono2: null,
        // emergenciaDireccion: null,
        // emergenciaParentezco: null,
        // tipoSangreId: 0,
        // emergenciaAlergico: null,
        // emergenciaDiabetico: null,
        // emergenciaInsodepend: null,
        // emergenciaPresionAlta: null,
        // emergenciaPresionBaja: null,
        // emergenciaEnTratamiento: null,
        // emergenciaDiagnostico: null,
        // licenciaConducir: null,
        // fechaExpiracionLicencia: null,
        // aplicaSasp: true,
        // nivelEscolar: null,
        // tituloObtenido: null,
        // correoElectronico: null,
        // correoElectronico2: null,
        // recomendadoPor: null,

        ayuntamientoId: 1,
        codigo: '215328',
        nombres: 'Juan Ernesto',
        apellidos: 'pepe Villar',
        tipoDocumento: 'Cedula',
        cedula: '402561238452',
        direccion: 'Av. Independencia',
        sectorId: 1,
        telefono: '',
        celular: '84912353499',
        fechaNacimiento: '1999-07-12',
        lugarNacimiento: 'Santo Domingo',
        estadoCivil: 'Soltero',
        sexo: 'M',
        dependientes: 0,
        fechaIngreso: '2022-12-06',
        fechaSalida: '2022-12-06',
        razonSalida: '',
        reemplear: false,
        fechaReingreso: '2022-12-06',
        programaDivisionId: 1,
        departamentoId: 1,
        areaTrabajoId: 2,
        posicionId: 1,
        grupoOcupacional: '',
        tipoContrato: '',
        fechaInicioContrato: '2022-12-06',
        fechaFinContrato: '2022-12-06',
        turno: '',
        periodoPago: '',
        formaPago: '',
        numeroCuenta: '',
        fechaExpitaTarjeta: '2022-12-06',
        estatus: true,
        sueldo: 0,
        sueldoAnterior: 0,
        fechaSueldoAnterior: '2022-12-06',
        fechaUltimaNomina: '2022-12-06',
        inicioVacaciones: '2022-12-06',
        finVacaciones: '2022-12-06',
        activoNomina: true,
        ingreso2: 0,
        ingreso3: 0,
        ingreso4: 0,
        ingreso5: 0,
        ingreso6: 0,
        ingreso7: 0,
        ingreso8: 0,
        ingreso9: 0,
        ingreso10: 0,
        impuestoSobreRenta: 0,
        arsCalculado: true,
        arsFijo: 0,
        afpCalculado: true,
        afpFijo: 0,
        egresos4: 0,
        egresos5: 0,
        egresos6: 0,
        egresos7: 0,
        egresos8: 0,
        egresos9: 0,
        egresos10: 0,
        eneroIngreso: 0,
        febreroIngreso: 0,
        marzoIngreso: 0,
        abrilIngreso: 0,
        mayoIngreso: 0,
        junioIngreso: 0,
        julioIngreso: 0,
        agostoIngreso: 0,
        septiembreIngreso: 0,
        octubreIngreso: 0,
        noviembreIngreso: 0,
        diciembreIngreso: 0,
        observacion: '',
        discapacidad: '',
        emergenciaNombre: '',
        emergenciaTelefono: '',
        emergenciaTelefono2: '',
        emergenciaDireccion: '',
        emergenciaParentezco: '',
        tipoSangreId: 1,
        emergenciaAlergico: '',
        emergenciaDiabetico: '',
        emergenciaInsodepend: '',
        emergenciaPresionAlta: '',
        emergenciaPresionBaja: '',
        emergenciaEnTratamiento: '',
        emergenciaDiagnostico: '',
        licenciaConducir: '',
        fechaExpiracionLicencia: '2022-12-06',
        aplicaSasp: true,
        nivelEscolar: '',
        areaTematica: '',
        tituloObtenido: '',
        correoElectronico: '',
        correoElectronico2: '',
        recomendadoPor: '',
      },

      tabPaneActiveKey: 1,
      columns: [
        { key: 'apellidos', label: 'Apellido', _style: { width: '40%' } },
        { key: 'nombres', label: 'Nombre', _style: { width: '40%' } },
        { key: 'cedula', label: 'Cédula', _style: { width: '40%' } },
        {
          key: 'programaDivisionId',
          label: 'Programa',
          _style: { width: '40%' },
        },
        {
          key: 'Direccion o Dependencia',
          label: 'Direccion o Dependencia',
          _style: { width: '40%' },
        },
        { key: 'Cargo', label: 'Cargo', _style: { width: '40%' } },
        {
          key: 'fechaIngreso',
          label: 'Fecha ingreso',
          _style: { width: '40%' },
        },
        { key: 'formaPago', label: 'Fecha Nacim.', _style: { width: '40%' } },
        { key: 'sexo', label: 'Sexo', _style: { width: '40%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],

      details: [],

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['registroPersonal']),
  },

  methods: {
    ...mapActions(useRegistroStore, [
      'getRegistroPersonal',
      'addRegistroPersonal',
    ]),

    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },

    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          'primary'
      }
    },

    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },

    submitForm() {
      this.addRegistroPersonal(this.postEmpleado)
    },
  },

  mounted() {
    this.getRegistroPersonal()
  },
}
</script>

<!-- <template>
  <h3 class="text-center">Registro Personal</h3>
  zxb <noframes></noframes>
  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            lgDemo = true
          }
        "
        >Agregar</CButton
      >
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    clickableRows
    :tableProps="{
      striped: false,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    header
    :items="Personal"
    :columns="columns"
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    pagination
  >
    <template #status="{}">
      <td>{item.Nombre}</td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item, index)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
        </CButton>
      </td>
    </template>
    <template #details="{ item }">
      <CCollapse :visible="this.details.includes(item._id)">
        <CCardBody>
          <h4>
            {{ item.username }}
          </h4>
          <p class="text-muted">User since: {{ item.registered }}</p>
          <CButton size="sm" color="info" class=""> User Settings </CButton>
          <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
        </CCardBody>
      </CCollapse>
    </template>
  </CSmartTable>
  <CModal
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Formulación gasto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="2">
            <CFormLabel for="validationCustom01">Apellido</CFormLabel>
            <CFormInput
              v-model="postPersonal.Apellido"
              id="validationCustom01"
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Nombre</CFormLabel>
            <CFormInput
              v-model="postPersonal.Nombre"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustomUsername">Cédula</CFormLabel>
            <CFormInput
              v-model="postPersonal.Cédula"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom03">Código</CFormLabel>
            <CFormInput
              v-model="postPersonal.Código"
              id="validationCustom03"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Programa</CFormLabel>
            <CFormInput v-model="postPersonal.Programa" id="validationCustom04">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"
              >Direccion o Dependencia</CFormLabel
            >
            <CFormInput
              v-model="postPersonal.Direccion"
              id="validationCustom05"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Cargo</CFormLabel>
            <CFormInput v-model="postPersonal.Cargo" id="validationCustom04">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Fecha de ingreso</CFormLabel>
            <CFormInput
              v-model="postPersonal.FechaIngreso"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04"
              >Fecha de nacimiento</CFormLabel
            >
            <CFormInput
              v-model="postPersonal.FechaNacimiento"
              id="validationCustom04"
            ></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Edad</CFormLabel>
            <CFormInput
              v-model="postPersonal.Edad"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Sexo</CFormLabel>
            <CFormInput
              v-model="postPersonal.Sexo"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Sueldo</CFormLabel>
            <CFormInput
              v-model="postPersonal.Sueldo"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1">Guardar</button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
//import store from '@/store'
import { useRegistroStore } from '../store/RegistroPersonal/Empleados'
import { computed } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  components: { CSmartTable },

  setup() {
    onMounted(() => {
      console.log('klk')
      getRegistroPersonal()
    })
    function toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    }

    const validatedCustom01 = null
    const lgDemo = false

    const postPersonal = {
      id: 34,
      Apellido: 'JIMENEZ CORDERO',
      Nombre: 'EDWING FRANCISCO',
      Cédula: '001-0004972-5',
      Código: '377',
      Programa: '16-DIR. DE CAP. Y FORM',
      Direccion: '',
      Cargo: '',
      FechaIngreso: '01/01/1999',
      FechaNacimiento: '28/10/1963',
      Edad: '58',
      Sexo: 'MASCULINO',
      Sueldo: '25,000.00 RD$',
    }

    const store = useRegistroStore()
    function submit() {
      this.addPersonal(postPersonal)
    }
    const columns = [
      { key: 'Apellido', label: 'Apellido', _style: { width: '40%' } },
      { key: 'Nombre', label: 'Nombre', _style: { width: '40%' } },
      { key: 'Cédula', label: 'Cédula', _style: { width: '40%' } },
      { key: 'Código', label: 'Código', _style: { width: '40%' } },
      { key: 'Programa', label: 'Programa', _style: { width: '40%' } },
      {
        key: 'Direccion o Dependencia',
        label: 'Direccion o Dependencia',
        _style: { width: '40%' },
      },
      { key: 'Cargo', label: 'Cargo', _style: { width: '40%' } },
      {
        key: 'Fecha de ingreso',
        label: 'Fecha de ingreso',
        _style: { width: '40%' },
      },
      {
        key: 'Fecha de nacimiento',
        label: 'Fecha de nacimiento',
        _style: { width: '40%' },
      },
      { key: 'Edad', label: 'Edad', _style: { width: '40%' } },
      { key: 'Sexo', label: 'Sexo', _style: { width: '40%' } },
      { key: 'Sueldo', label: 'Sueldo', _style: { width: '40%' } },

      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
        // _props: { color: 'primary', class: 'fw-semibold'}
      },
    ]
    const details = []
    const {
      registroPersonal,
      getRegistroPersonal,
      addPersonal,
      getAllPersonal,
      is_loading,
    } = store

    return {
      // you can return the whole store instance to use it in the template
      store,
      CModal,
      CSmartTable,
      registroPersonal,
      addPersonal,
      getAllPersonal,
      toggleDetails,
      details,
      validatedCustom01,
      lgDemo,
      columns,
      submit,
      is_loading,
      getRegistroPersonal,
      Personal: computed(() => store.registroPersonal),
    }
  },
}
</script> -->
