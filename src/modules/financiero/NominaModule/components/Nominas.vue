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

    <CButton
      color="info"
      @click="
        () => {
          lgDemo1 = true
        }
      "
      >Generar Nomina</CButton
    >
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
    :items="Empleado"
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
    <template #show_details="{ item }">
      <td class="py-1">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetail2(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
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
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 2"
              @click="
                () => {
                  tabPaneActiveKey = 2
                }
              "
            >
              Otros ingresos
            </CNavLink>
          </CNavItem>
          <!-- <CNavItem>
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
          </CNavItem> -->
          <!-- <CNavItem>
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
          </CNavItem> -->
          <CNavItem>
            <CNavLink
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 5"
              @click="
                () => {
                  tabPaneActiveKey = 5
                }
              "
            >
              Acumulado anual
            </CNavLink>
          </CNavItem>
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
                <CCol>
                  <CFormLabel disabled for="validationCustom01"
                    >Código</CFormLabel
                  >
                  <CFormInput
                    disabled
                    v-model="postEmpleado.codigo"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom01">Cedula</CFormLabel>
                  <CFormInput
                    disabled
                    v-model="postEmpleado.cedula"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Nombre</CFormLabel>
                  <CFormInput
                    disabled
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
                    disabled
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
                    disabled
                    v-model="postEmpleado.direccion"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Sectores</CFormLabel>
                  <CFormSelect
                    disabled
                    v-model="sector.id"
                    id="validationCustom05"
                  >
                    <option
                      v-for="sect in this.sector"
                      :key="sect.id"
                      :value="sect.id"
                    >
                      {{ sect.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Ciudad</CFormLabel>
                  <CFormInput disabled id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Teléfono</CFormLabel>
                  <CFormInput
                    disabled
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
                    disabled
                    v-model="postEmpleado.tipoDocumento"
                    id="validationCustom05"
                  >
                    <option>Cedula</option>
                    <option>Pasaporte</option>
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
                    disabled
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
                    disabled
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
                  <CFormLabel for="validationCustom02">Sexo</CFormLabel>
                  <CFormInput
                    disabled
                    v-model="postEmpleado.sexo"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Dependientes</CFormLabel>
                  <CFormInput
                    disabled
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
                    disabled
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
                  <CFormSelect
                    disabled
                    v-model="programaDivision.id"
                    id="validationCustom05"
                  >
                    <option
                      v-for="programa in this.programaDivision"
                      :key="programa.id"
                      :value="programa.id"
                    >
                      {{ programa.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Direccion o Dependencia</CFormLabel
                  >
                  <CFormInput
                    disabled
                    v-model="postEmpleado"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05"
                    >Area de trabajo</CFormLabel
                  >
                  <CFormSelect
                    disabled
                    v-model="areaTrabajo.id"
                    id="validationCustom05"
                  >
                    <option
                      v-for="area in this.areaTrabajo"
                      :key="area.id"
                      :value="area.id"
                    >
                      {{ area.area }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Cargo</CFormLabel>
                  <CFormSelect
                    disabled
                    v-model="posicionCargo.id"
                    id="validationCustom05"
                  >
                    <option
                      v-for="posicion in this.posicionCargo"
                      :key="posicion.id"
                      :value="posicion.id"
                    >
                      {{ posicion.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <div class="row">
                  <CCol>
                    <CFormLabel for="validationCustom02"
                      >Tipo de contrato</CFormLabel
                    >
                    <CFormInput
                      disabled
                      v-model="postEmpleado.tipoContrato"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol>
                    <CFormLabel for="validationCustom02">Turno</CFormLabel>
                    <CFormInput
                      disabled
                      v-model="postEmpleado.turno"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom05"
                      >Dias trabajando</CFormLabel
                    >
                    <CFormInput
                      v-model="postEmpleado.sueldo"
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
                    <CFormLabel for="validationCustom02"
                      >Tipo de cobro</CFormLabel
                    >
                    <CFormInput
                      disabled
                      v-model="postEmpleado.tipoCobro"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>

                <CCol>
                  <CFormLabel for="validationCustom05">Tipo de pago</CFormLabel>
                  <CFormSelect
                    disabled
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
                    disabled
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

                <h4>Retenciones de Ley</h4>

                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Impuestos S.R</CFormLabel
                  >
                  <CFormInput
                    v-model="postEmpleado.impuestoSobreRenta"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <div class="row">
                  <div class="col-6">
                    <CCol>
                      <CFormLabel for="validationCustom02">ARS</CFormLabel>
                      <CFormInput
                        v-model="postEmpleado.arsFijo"
                        id="validationCustom02"
                        required
                      />
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>

                  <div class="col-6">
                    <div class="form-check" style="margin-top: 39px">
                      <label class="form-check-label" for="flexCheckDefault">
                        ARS AUTOMATICO
                      </label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="postEmpleado.arsCalculado"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <CCol>
                      <CFormLabel for="validationCustom02">AFP</CFormLabel>
                      <CFormInput
                        v-model="postEmpleado.afpFijo"
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

                  <div class="col-6">
                    <div class="form-check mt-5">
                      <label class="form-check-label" for="flexCheckDefault">
                        AFP AUTOMATICO
                      </label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="postEmpleado.afpCalculado"
                        id="flexCheckDefault"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-4 border p-3">
                <div class="border" style="height: 40%"></div>
                <h4>RUTA\34354.JPG</h4>
                <h4>Guardar Imagen</h4>
                <h4>Abrir Carpeta</h4>
              </div>
            </div>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="profile-tab"
            :visible="tabPaneActiveKey === 2"
          >
            <div class="row">
              <div class="col-4 border p-3">
                <h3>Ingresos</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01">Sueldo fijo:</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.sueldo"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Horas extras:</CFormLabel
                  >
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Serv. Especiales:</CFormLabel
                  >
                  <CFormInput id="validationCustom01" />
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
                  <CFormInput
                    type="date"
                    v-model="postEmpleado.inicioVacaciones"
                    id="validationCustom01"
                  />

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
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">COOPADOMU</CFormLabel>
                  <CFormInput id="validationCustom01" />
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
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Fecha modifica:</CFormLabel
                  >
                  <CFormInput id="validationCustom01" />
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
          </CTabPane>
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
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01"
                    >Fecha modifica:</CFormLabel
                  >
                  <CFormInput id="validationCustom01" />
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

          <CTabPane
            role="tabpanel"
            aria-labelledby="contact-tab"
            :visible="tabPaneActiveKey === 5"
          >
            <div class="row">
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Enero</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.eneroIngreso"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Febrero</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.febreroIngreso"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Marzo</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.marzoIngreso"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Abril</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.abrilIngreso"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Mayo</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.mayoIngreso"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Junio</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.junioIngreso"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Julio</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.julioIngreso"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Agosto</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.agostoIngreso"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Septiembre</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.septiembreIngreso"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Octubre</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.octubreIngreso"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Noviembre</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.noviembreIngreso"
                    id="validationCustom01"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Diciembre</CFormLabel>
                  <CFormInput
                    v-model="postEmpleado.diciembreIngreso"
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
                    >Valor regalia</CFormLabel
                  >
                  <CFormInput id="validationCustom01" />

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
          </CTabPane>
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
  <CModal
    size="xl"
    :visible="lgDemo1"
    @close="
      () => {
        lgDemo1 = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Sectores</CModalTitle>
    </CModalHeader>
    <CModalBody class="mt-2">
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
        >
          <div class="row">
            <div class="col-7">
              <div class="col-11">
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Programa</CFormLabel>
                  <CFormInput
                    v-model="postNomina"
                    id="validationCustom01"
                    required
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-11">
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Departamento</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">PNAP</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel
                    v-model="postNomina.programaDivisionId"
                    for="validationCustom01"
                    >Programa</CFormLabel
                  >
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Sub-Programa</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Proyecto</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Actividad</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="8">
                  <CFormLabel for="validationCustom01"
                    >Desc.Clasificador</CFormLabel
                  >
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom01"
                    >Fecha de la Nomina</CFormLabel
                  >
                  <CFormInput
                    v-model="postNomina.fecha"
                    id="validationCustom01"
                    required
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom02">Tipo de Pago</CFormLabel>
                  <CFormInput
                    v-model="postNomina.tipoPago"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Nomina de Regalia?
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Permitir Duplicidad en Nomina?
                </label>
              </div>
            </div>

            <div class="col-5">
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
                    Home
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="tabPaneActiveKey === 2"
                    @click="
                      () => {
                        tabPaneActiveKey = 2
                      }
                    "
                  >
                    Profile
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent class="border p-3">
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="tabPaneActiveKey === 1"
                >
                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01"
                          >Retenciones:</CFormLabel
                        >
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01">Dividir</CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"
                        >Cod.Ejec/Pres</CFormLabel
                      >
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>

                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>
                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>

                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>

                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>

                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>

                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>

                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>

                  <hr />
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Nomina con Retenciones?
                    </label>
                  </div>
                  <hr />
                  <div>
                    <button type="button" class="btn btn-outline-dark">
                      Consultar Empleados
                    </button>
                  </div>
                  <div class="mt-3 mb-2">
                    <button type="button" class="btn btn-outline-dark">
                      Consultar Departamentos
                    </button>
                  </div>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  :visible="tabPaneActiveKey === 2"
                >
                  Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                  single-origin coffee squid. Exercitation +1 labore velit,
                </CTabPane>
              </CTabContent>
            </div>
          </div>

          <hr />
          <div>
            <p class="font-weight-bold">Nota (Encabezado Nomina):</p>
            <CCol :md="7">
              <CFormInput
                id="validationCustom01"
                required
                placeholder="NOMINA DE PAGO DEL MES DE NOVIEMBRE DEL 2022"
              />
            </CCol>
            <CCol :md="7">
              <input
                class="mt-2 form-control form-control-lg"
                type="text"
                aria-label=".form-control-lg example"
              />
            </CCol>
            <div class="row">
              <div class="col-3">
                <button type="button" class="mt-2 btn btn-outline-dark">
                  Procesar Nomina
                </button>
              </div>

              <div class="form-check col-9 mt-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Nomina de Regalia?
                </label>
              </div>
            </div>

            <div class="mt-3">
              <button type="button" class="btn btn-outline-dark">
                Imprimir Nomina
              </button>
            </div>

            <div class="mt-3">
              <button type="button" class="btn btn-outline-dark">
                Emp. con descuento MAYOR a % del sueldo, segun Ley
              </button>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="close"
            >
              Close
            </button>
            <button
              v-on:click="submitForm"
              type="button"
              class="btn btn-primary"
            >
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/Nomina/nomina'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../services/NominaServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      posicionCargo: [{}],
      areaTrabajo: [{}],
      programaDivision: [{ nombre: null }],
      sector: [{}],

      postEmpleado: {
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        codigo: null,
        nombres: null,
        apellidos: null,
        tipoDocumento: null,
        cedula: null,
        direccion: null,
        sectorId: 0,
        telefono: null,
        celular: null,
        fechaNacimiento: new Date(Date.now()),
        lugarNacimiento: null,
        estadoCivil: null,
        sexo: null,
        dependientes: 0,
        fechaIngreso: new Date(Date.now()),
        fechaSalida: new Date(Date.now()),
        razonSalida: null,
        reemplear: false,
        fechaReingreso: new Date(Date.now()),
        programaDivisionId: 1,
        departamentoId: 1,
        areaTrabajoId: 2,
        posicionId: 1,
        grupoOcupacional: null,
        tipoContrato: null,
        fechaInicioContrato: new Date(Date.now()),
        fechaFinContrato: new Date(Date.now()),
        turno: null,
        periodoPago: null,
        formaPago: null,
        numeroCuenta: null,
        fechaExpitaTarjeta: new Date(Date.now()),
        estatus: true,
        sueldo: 0,
        sueldoAnterior: 0,
        fechaSueldoAnterior: new Date(Date.now()),
        fechaUltimaNomina: new Date(Date.now()),
        inicioVacaciones: new Date(Date.now()),
        finVacaciones: new Date(Date.now()),
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
        observacion: null,
        discapacidad: null,
        emergenciaNombre: null,
        emergenciaTelefono: null,
        emergenciaTelefono2: null,
        emergenciaDireccion: null,
        emergenciaParentezco: null,
        tipoSangreId: 1,
        emergenciaAlergico: null,
        emergenciaDiabetico: null,
        emergenciaInsodepend: null,
        emergenciaPresionAlta: null,
        emergenciaPresionBaja: null,
        emergenciaEnTratamiento: null,
        emergenciaDiagnostico: null,
        licenciaConducir: null,
        fechaExpiracionLicencia: new Date(Date.now()),
        aplicaSasp: true,
        nivelEscolar: null,
        areaTematica: null,
        tituloObtenido: null,
        correoElectronico: null,
        correoElectronico2: null,
        recomendadoPor: null,
      },
      postNomina: {
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        departamentoId: 0,
        afpMonto: 0,
        fecha: new Date(Date.now()),
        tipoCobro: null,
        tipoPago: null,
        empleadoId: 0,
        programaDivisionId: 0,
        estatus: 0,
        grupoNom: null,
        codEmpl: null,
        nombreEmpleado: null,
        posicionId: 0,
        descCargo: null,
        sectorId: 0,
        sueldo: 0,
        ing2: 0,
        ing3: 0,
        ing4: 0,
        ing5: 0,
        ing6: 0,
        ing7: 0,
        ing8: 0,
        ing9: 0,
        ing10: 0,
        impSR: 0,
        arsMonto: 0,
        egr4: 0,
        egr5: 0,
        egr6: 0,
        egr7: 0,
        egr8: 0,
        egr9: 0,
        egr10: 0,
        cantDiasTrabanulldos: null,
        valorDias: 0,
        nota: null,
        noCheque: 0,
        finiContrato: 0,
        ffinContrato: 0,
        id: 0,
        variacion: 0,
      },

      tabPaneActiveKey: 1,
      columns: [
        { key: 'apellidos', label: 'Apellidos', _style: { width: '20%' } },
        {
          key: 'nombres',
          label: 'Nombres',
          _style: { width: '20%' },
        },

        {
          key: 'cedula',
          label: 'Cedula',
          _style: { width: '10%' },
        },
        { key: 'codigo', label: 'Codigo', _style: { width: '5%' } },
        {
          key: 'programaDivisionId',
          label: 'Programa',
          _style: { width: '15%' },
        },
        {
          key: 'Direccion o Dependencia',
          label: 'Direccion o Dependencia',
          _style: { width: '15%' },
        },
        { key: 'posicionId', label: 'Cargo', _style: { width: '15%' } },
        {
          key: 'fechaIngreso',
          label: 'Fecha Ingreso',
          _style: { width: '15%' },
        },
        { key: 'sueldo', label: 'Sueldo', _style: { width: '15%' } },
        { key: 'sexo', label: 'Sexo', _style: { width: '15%' } },
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
      lgDemo1: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['Nomina', 'Empleado']),
  },

  methods: {
    ...mapActions(useRegistroStore, [
      'getNomina',
      'addNomina',
      'getEmpleado',
      'addEmpleado',
    ]),
    submitForm() {
      if (this.id) {
        Api.putEmpleado(this.id, this.postEmpleado).then((response) => {
          console.log(response.data)
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(this.getEmpleado, 500)
          this.postEmpleado = {
            id: 0,
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            codigo: null,
            nombres: null,
            apellidos: null,
            tipoDocumento: null,
            cedula: null,
            direccion: null,
            sectorId: 0,
            telefono: null,
            celular: null,
            fechaNacimiento: new Date(Date.now()),
            lugarNacimiento: null,
            estadoCivil: null,
            sexo: null,
            dependientes: 0,
            fechaIngreso: new Date(Date.now()),
            fechaSalida: new Date(Date.now()),
            razonSalida: null,
            reemplear: false,
            fechaReingreso: new Date(Date.now()),
            programaDivisionId: 1,
            departamentoId: 1,
            areaTrabajoId: 2,
            posicionId: 1,
            grupoOcupacional: null,
            tipoContrato: null,
            fechaInicioContrato: new Date(Date.now()),
            fechaFinContrato: new Date(Date.now()),
            turno: null,
            periodoPago: null,
            formaPago: null,
            numeroCuenta: null,
            fechaExpitaTarjeta: new Date(Date.now()),
            estatus: true,
            sueldo: 0,
            sueldoAnterior: 0,
            fechaSueldoAnterior: new Date(Date.now()),
            fechaUltimaNomina: new Date(Date.now()),
            inicioVacaciones: new Date(Date.now()),
            finVacaciones: new Date(Date.now()),
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
            observacion: null,
            discapacidad: null,
            emergenciaNombre: null,
            emergenciaTelefono: null,
            emergenciaTelefono2: null,
            emergenciaDireccion: null,
            emergenciaParentezco: null,
            tipoSangreId: 1,
            emergenciaAlergico: null,
            emergenciaDiabetico: null,
            emergenciaInsodepend: null,
            emergenciaPresionAlta: null,
            emergenciaPresionBaja: null,
            emergenciaEnTratamiento: null,
            emergenciaDiagnostico: null,
            licenciaConducir: null,
            fechaExpiracionLicencia: new Date(Date.now()),
            aplicaSasp: true,
            nivelEscolar: null,
            areaTematica: null,
            tituloObtenido: null,
            correoElectronico: null,
            correoElectronico2: null,
            recomendadoPor: null,
          }
        })
        setTimeout(this.getEmpleado, 500)
      } else {
        this.addEmpleado(this.postEmpleado)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
        //const form = event.currentTarget
        this.lgDemo = true
        setTimeout(this.getEmpleado, 500)
        ;(this.postEmpleado = {
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          codigo: null,
          nombres: null,
          apellidos: null,
          tipoDocumento: null,
          cedula: null,
          direccion: null,
          sectorId: 0,
          telefono: null,
          celular: null,
          fechaNacimiento: new Date(Date.now()),
          lugarNacimiento: null,
          estadoCivil: null,
          sexo: null,
          dependientes: 0,
          fechaIngreso: new Date(Date.now()),
          fechaSalida: new Date(Date.now()),
          razonSalida: null,
          reemplear: false,
          fechaReingreso: new Date(Date.now()),
          programaDivisionId: 1,
          departamentoId: 1,
          areaTrabajoId: 2,
          posicionId: 1,
          grupoOcupacional: null,
          tipoContrato: null,
          fechaInicioContrato: new Date(Date.now()),
          fechaFinContrato: new Date(Date.now()),
          turno: null,
          periodoPago: null,
          formaPago: null,
          numeroCuenta: null,
          fechaExpitaTarjeta: new Date(Date.now()),
          estatus: true,
          sueldo: 0,
          sueldoAnterior: 0,
          fechaSueldoAnterior: new Date(Date.now()),
          fechaUltimaNomina: new Date(Date.now()),
          inicioVacaciones: new Date(Date.now()),
          finVacaciones: new Date(Date.now()),
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
          observacion: null,
          discapacidad: null,
          emergenciaNombre: null,
          emergenciaTelefono: null,
          emergenciaTelefono2: null,
          emergenciaDireccion: null,
          emergenciaParentezco: null,
          tipoSangreId: 1,
          emergenciaAlergico: null,
          emergenciaDiabetico: null,
          emergenciaInsodepend: null,
          emergenciaPresionAlta: null,
          emergenciaPresionBaja: null,
          emergenciaEnTratamiento: null,
          emergenciaDiagnostico: null,
          licenciaConducir: null,
          fechaExpiracionLicencia: new Date(Date.now()),
          aplicaSasp: true,
          nivelEscolar: null,
          areaTematica: null,
          tituloObtenido: null,
          correoElectronico: null,
          correoElectronico2: null,
          recomendadoPor: null,
          id: 0,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getEmpleado, 500)
      }
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },
    close() {
      this.lgDemo = false
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

    // toggleDetails(item) {
    //   if (this.details.includes(item._id)) {
    //     this.details = this.details.filter((_item) => _item !== item._id)
    //     return
    //   }
    //   this.details.push(item._id)
    // },

    toggleDetails(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(item)
      if (item.Nomina !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      console.log(item.id)
      Api.getEmpleadoById(item.id).then((response) => {
        this.postNomina = response.data.data
        console.log(response)
        this.id = item.id
        //this.postIngreso = response.data.data
      })
    },

    toggleDetail2(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(item)
      if (item.Empleado !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      console.log(item.id)
      Api.getEmpleadoById(item.id).then((response) => {
        this.postEmpleado = response.data.data
        console.log(response.data.data)
        this.id = item.id
        //this.postIngreso = response.data.data
      })
    },
  },

  mounted() {
    this.getEmpleado()
    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
    }),
      Api.getSectores().then((response) => {
        this.sector = response.data.data
      }),
      Api.getPocision().then((response) => {
        this.posicionCargo = response.data.data
      }),
      Api.getAreaTrabajo().then((response) => {
        this.areaTrabajo = response.data.data
      })
  },
}
</script>

<!-- <template>
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
    :items="Nomina"
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
      <CModalTitle>Sectores</CModalTitle>
    </CModalHeader>
    <CModalBody class="mt-2">
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row">
            <div class="col-7">
              <div class="col-11">
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Programa</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-11">
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Departamento</CFormLabel>
                  <CFormInput
                    v-model="postNomina.departamentoId"
                    id="validationCustom01"
                    required
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">PNAP</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Programa</CFormLabel>
                  <CFormInput
                    v-model="postNomina.programaDivnullionId"
                    id="validationCustom01"
                    required
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Sub-Programa</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Proyecto</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Actividad</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="8">
                  <CFormLabel for="validationCustom01"
                    >Desc.Clasificador</CFormLabel
                  >
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom01"
                    >Fecha de la Nomina</CFormLabel
                  >
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom02">Tipo de Pago</CFormLabel>
                  <CFormInput
                    v-model="postNomina.tipoPago"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Nomina de Regalia?
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Permitir Duplicidad en Nomina?
                </label>
              </div>
            </div>

            <div class="col-5">
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
                      Home
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      href="javascript:void(0);"
                      :active="tabPaneActiveKey === 2"
                      @click="
                        () => {
                          tabPaneActiveKey = 2
                        }
                      "
                    >
                      Profile
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent class="border p-3">
                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    :visible="tabPaneActiveKey === 1"
                  >
                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"
                            >Retenciones:</CFormLabel
                          >
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"
                          >Dividir</CFormLabel
                        >
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"
                          >Cod.Ejec/Pres</CFormLabel
                        >
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>
                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <hr />
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Nomina con Retenciones?
                      </label>
                    </div>
                    <hr />
                    <div>
                      <button type="button" class="btn btn-outline-dark">
                        Consultar Empleados
                      </button>
                    </div>
                    <div class="mt-3 mb-2">
                      <button type="button" class="btn btn-outline-dark">
                        Consultar Departamentos
                      </button>
                    </div>
                  </CTabPane>
                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                    :visible="tabPaneActiveKey === 2"
                  >
                    Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                    single-origin coffee squid. Exercitation +1 labore velit,
                  </CTabPane>
                </CTabContent>
              </div>
            </div>
            <hr />
            <div>
              <p class="font-weight-bold">Nota (Encabezado Nomina):</p>
              <CCol :md="7">
                <CFormInput
                  id="validationCustom01"
                  required
                  placeholder="NOMINA DE PAGO DEL MES DE NOVIEMBRE DEL 2022"
                />
              </CCol>
              <CCol :md="7">
                <input
                  class="mt-2 form-control form-control-lg"
                  type="text"
                  aria-label=".form-control-lg example"
                />
              </CCol>
              <div class="row">
                <div class="col-3">
                  <button type="button" class="mt-2 btn btn-outline-dark">
                    Procesar Nomina
                  </button>
                </div>

                <div class="form-check col-9 mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Nomina de Regalia?
                  </label>
                </div>
              </div>

              <div class="mt-3">
                <button type="button" class="btn btn-outline-dark">
                  Imprimir Nomina
                </button>
              </div>

              <div class="mt-3">
                <button type="button" class="btn btn-outline-dark">
                  Emp. con descuento MAYOR a % del sueldo, segun Ley
                </button>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button v-on:click="submitForm" class="btn btn-info btn-block mt-1">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/Nomina/nomina'
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
      postNomina: {
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        fecha: null,
        tipoCobro: null,
        tipoPago: null,
        empleadoId: null,
        programaDivnullionId: null,
        departamentoId: null,
        grupoNom: null,
        codEmpl: null,
        nombreEmpleadnull: null,
        posicionId: null,
        descCargo: null,
        estatus: null,
        sectorId: null,
        sueldo: null,
        ing2: 0,
        ing3: 0,
        ing4: 0,
        ing5: 0,
        ing6: 0,
        ing7: 0,
        ing8: 0,
        ing9: 0,
        ing10: 0,
        impSR: 0,
        arsMonto: null,
        afpMonto: null,
        egr4: 0,
        egr5: 0,
        egr6: 0,
        egr7: 0,
        egr8: 0,
        egr9: 0,
        egr10: 0,
        cantDiasTrabanulldos: null,
        valorDias: null,
        nota: null,
        noCheque: null,
        finiContrato: null,
        ffinContrato: null,
        tabPaneActiveKey: null,
      },
      columns: [
        { key: 'Fecha', label: 'Fecha', _style: { width: '40%' } },
        {
          key: 'Departamento',
          label: 'Departamento',
          _style: { width: '40%' },
        },

        { key: 'Programa', label: 'Programa', _style: { width: '40%' } },
        { key: 'Est.Pro', label: 'Est.Pro', _style: { width: '40%' } },
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: 'Empleado', label: 'Empleado', _style: { width: '40%' } },
        { key: 'Total Bruto', label: 'Total Bruto', _style: { width: '40%' } },
        { key: 'Total Neto', label: 'Total Neto', _style: { width: '40%' } },
        { key: 'T/Pago', label: 'T/Pago', _style: { width: '40%' } },
        { key: 'Comprobante', label: 'Comprobante', _style: { width: '40%' } },
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
    ...mapState(useRegistroStore, ['Nomina']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getNomina']),

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
      this.addNomina(this.postNomina)
    },
  },

  mounted() {
    this.getNomina()
    // this.getListarIngresos(
    //   localStorage.getItem('id_Ayuntamiento'),
    //   localStorage.getItem('ano'),
    // )
  },
}
</script> -->
