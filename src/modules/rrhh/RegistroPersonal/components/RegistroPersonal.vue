<template>
  <h3 class="text-center">Mantenimientos Empleados</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            openModal()
            clearModal1()
          }
        "
        >Agregar</CButton
      >

      <div class="d-inline p-2">
        <CButton
          color="info"
          @click="
            () => {
              reportes = true
            }
          "
          >Imprimir Reporte</CButton
        >
      </div>
    </div>
  </div>
 
  <CModal :backdrop="false" :keyboard="false" :visible="reportes">
    <CModalHeader>
      <CModalTitle>Imprimir Reporte</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CFormSelect v-model="reporteDepto" id="validationCustom05">
        <option>1-Reporte empleados por nombre</option>
        <option>2-Reporte empleados por apellido</option>
        <option>3-Reporte empleados por cargo</option>
        <option>4-Reporte empleados por departamento</option>
      </CFormSelect>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary">Close</CButton>
      <CButton color="primary" @click="imprimirReporte">Imprimir</CButton>
    </CModalFooter>
  </CModal>
  <CSmartTable
    clickableRows
    :tableProps="{
      striped: false,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    
    header
    :items="registroPersonal"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #posicion="{ item }">
      <td>
        {{ item.posicion.nombre }}
      </td>
    </template>
    <template #programaDivision="{ item }">
      <td>
        {{ item.programaDivision.nombre }}
      </td>
    </template>

    <template #fechaIngreso="{ item }">
      <td>
        {{ formatDate(item.fechaIngreso) }}
      </td>
    </template>
    <template #fechaNacimiento="{ item }">
      <td>
        {{ formatDate(item.fechaNacimiento) }}
      </td>
    </template>

    <template #formaPago="{ item }">
      <td>
        {{ formatDate(item.formaPago) }}
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
          @click="toggleDetails(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
      <td class="py-1">
        <CButton
          class="mt-1"
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="deleteEmp(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
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
              <div class="col-5 border p-3">
                <h3>Datos generales</h3>
                <div class="row mt-3">
                  <div class="col-6">
                    <CFormLabel for="validationCustom01">Código</CFormLabel>
                  </div>
                  <div class="col-6">
                    <CCol :md="5">
                      <input
                        style="position: relative; left: -62px"
                        ref="name"
                        type="text"
                        class="form-control"
                        v-model="postEmpleado.codigo"
                        id="exampleInputEmail1"
                      />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-6">
                    <CFormLabel for="validationCustom05"
                      >Tipo de documento</CFormLabel
                    >
                  </div>
                  <div class="col-6">
                    <CCol :md="10">
                      <CFormSelect
                        style="position: relative; left: -62px"
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
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-6">
                    <CFormLabel for="validationCustom02">Cédula</CFormLabel>
                  </div>
                  <div class="col-6">
                    <CCol :md="10">
                      <CFormInput
                        style="position: relative; left: -62px"
                        v-model="postEmpleado.cedula"
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

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom02">Nombre</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormInput
                        style="position: relative; right: -52px"
                        v-model="postEmpleado.nombres"
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

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom01">Apellidos</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormInput
                        style="position: relative; right: -52px"
                        v-model="postEmpleado.apellidos"
                        id="validationCustom01"
                      />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom02">Dirección</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormInput
                        style="position: relative; right: -52px"
                        v-model="postEmpleado.direccion"
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

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom05">Sectores</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormSelect
                        style="position: relative; right: -52px"
                        v-model="postEmpleado.sectorId"
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
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom02">Teléfono</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormInput
                        style="position: relative; right: -52px"
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

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom05"
                      >Estado civil</CFormLabel
                    >
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormSelect
                        style="position: relative; right: -52px"
                        v-model="postEmpleado.estadoCivil"
                        id="validationCustom05"
                      >
                        <option>Soltero/a</option>
                        <option>Casado/a</option>
                      </CFormSelect>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-4">
                    <CFormLabel for="validationCustom01"
                      >Fecha nacimiento</CFormLabel
                    >
                  </div>
                  <div class="col-8">
                    <CCol :md="11">
                      <CFormInput
                        style="position: relative; right: -13px; width: 267px"
                        v-model="postEmpleado.fechaNacimiento"
                        type="date"
                        id="validationCustom01"
                      />
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-4">
                    <CFormLabel for="validationCustom02"
                      >Lugar nacimiento</CFormLabel
                    >
                  </div>
                  <div class="col-8">
                    <CCol :md="11">
                      <CFormInput
                        style="position: relative; right: -13px; width: 267px"
                        v-model="postEmpleado.lugarNacimiento"
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

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom05">Sexo</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormSelect
                        style="position: relative; right: -52px"
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
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom02"
                      >Dependientes</CFormLabel
                    >
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormInput
                        style="position: relative; right: -52px"
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
                </div>
              </div>
              <div class="col-4 border p-3">
                <h3>Datos laborales</h3>
                <CCol :md="5">
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
                  <CFormLabel for="validationCustom05"
                    >Dirección o dependencia</CFormLabel
                  >
                  <CFormSelect
                    v-model="postEmpleado.programaDivisionId"
                    id="validationCustom05"
                    v-on:change="changePrograma($event)"
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
                  <CFormLabel for="validationCustom01">Departamento</CFormLabel>
                  <CFormSelect
                    v-model="postEmpleado.departamentoId"
                    id="validationCustom05"
                  >
                    <option
                      v-for="departamento in departamentos"
                      :key="departamento.id"
                      :value="departamento.id"
                    >
                      {{ departamento.nombre }}
                    </option>
                  </CFormSelect>

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <!--                  
                <CCol>
                  <CFormLabel for="validationCustom05">Programa</CFormLabel>
                  <CFormSelect
                    v-model="programaId"
                    id="validationCustom05"
                    v-on:change="changePrograma($event)"
                  >
                    <option
                      v-for="prog in this.programa"
                      :key="prog.id"
                      :value="prog.id"
                    >
                      {{ prog.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-11">
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Departamento</CFormLabel>
                  <CFormSelect
                    v-model="postEmpleado.departamentoId"
                    id="validationCustom05"
                    v-on:change="changeDepartamento($event)"
                  >
                    <option
                      v-for="departamento in departamentos"
                      :key="departamento.id"
                      :value="departamento.id"
                    >
                      {{ departamento.id }}
                    </option>
                  </CFormSelect>

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol> -->

                <CCol :md="12">
                  <CFormLabel for="validationCustom05"
                    >Área de trabajo</CFormLabel
                  >
                  <CFormSelect
                    v-model="postEmpleado.areaTrabajoId"
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
                  <CFormLabel for="validationCustom05">Cargos</CFormLabel>
                  <CFormSelect
                    v-model="postEmpleado.posicionId"
                    id="validationCustom05"
                  >
                    <option
                      v-for="cargo in this.posicionCargo"
                      :key="cargo.id"
                      :value="cargo.id"
                    >
                      {{ cargo.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Tipo Sangre</CFormLabel>
                  <CFormSelect
                    v-model="postEmpleado.tipoSangreId"
                    id="validationCustom05"
                  >
                    <option
                      v-for="sangre in this.tipoSangre"
                      :key="sangre.id"
                      :value="sangre.id"
                    >
                      {{ sangre.nombre }}
                    </option>
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
                      <option>DIURNO</option>
                      <option>NOCTURNO</option>
                      <option>ROTATIVO</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>

                <div class="row">
                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">Tipo cobro</CFormLabel>
                    <CFormSelect
                      v-model="postEmpleado.periodoPago"
                      id="validationCustom05"
                    >
                      <option>MENSUAL</option>
                      <option>QUINCENAL</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol style="width: 159px">
                    <CFormLabel for="validationCustom05"
                      >Tipo de pago</CFormLabel
                    >
                    <CFormSelect
                      v-model="postEmpleado.formaPago"
                      id="validationCustom05"
                    >
                      <option>BANCO</option>
                      <option>CHEQUE</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>

                <CCol>
                  <CFormLabel for="validationCustom02"
                    >Sueldo actual</CFormLabel
                  >
                  <CFormInput
                    style="width: 159px"
                    v-model="postEmpleado.sueldo"
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

              <!-- <div class="col-4 border p-3">
                <div class="border" style="height: 40%"></div>
                <h4>Guardar Imagen</h4>
                <h4>Abrir Carpeta</h4>
              </div> -->

              <div
                class="col-2"
                style="margin-top: 9px; width: 264px; height: 500px"
              >
                <div class="border" style="height: 40%"></div>
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
                    type="date"
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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../services/RegistroPersonalServices'
import apiSectores from '../../../financiero/NominaModule/services/NominaServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      reporteDepto: 1,
      reportes: false,
      posicionCargo: [{}],
      tipoSangre: [{}],

      areaTrabajo: [{}],
      programaDivision: [{}],
      sector: [{}],
      departamentos: [],
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

        // ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        // codigo: null,
        // nombres: null,
        // apellidos: null,
        // tipoDocumento: null,
        // cedula: null,
        // direccion: null,
        // sectorId: 0,
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
        // departamentoId: 1,
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

        // ----------------------------------------

        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        codigo: null,
        nombres: null,
        apellidos: null,
        tipoDocumento: null,
        cedula: null,
        direccion: null,
        sectorId: 1,
        telefono: null,
        celular: null,
        fechaNacimiento: new Date(Date.now()),
        lugarNacimiento: null,
        estadoCivil: 'Soltero',
        sexo: 'M',
        dependientes: 0,
        fechaIngreso: new Date(),
        fechaSalida: new Date(Date.now()),
        razonSalida: null,
        reemplear: true,
        fechaReingreso: new Date(Date.now()),
        programaDivisionId: 0,
        departamentoId: 0,
        areaTrabajoId: 0,
        posicionId: 0,
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
        sueldo: 0.0,
        sueldoAnterior: 0.0,
        fechaSueldoAnterior: new Date(Date.now()),
        fechaUltimaNomina: new Date(Date.now()),
        inicioVacaciones: new Date(Date.now()),
        finVacaciones: new Date(Date.now()),
        activoNomina: true,
        ingreso2: 0.0,
        ingreso3: 0.0,
        ingreso4: 0.0,
        ingreso5: 0.0,
        ingreso6: 0.0,
        ingreso7: 0.0,
        ingreso8: 0.0,
        ingreso9: 0.0,
        ingreso10: 0.0,
        impuestoSobreRenta: 0.0,
        arsCalculado: true,
        arsFijo: 0.0,
        afpCalculado: true,
        afpFijo: 0.0,
        egresos4: 0.0,
        egresos5: 0.0,
        egresos6: 0.0,
        egresos7: 0.0,
        egresos8: 0.0,
        egresos9: 0.0,
        egresos10: 0.0,
        eneroIngreso: 0.0,
        febreroIngreso: 0.0,
        marzoIngreso: 0.0,
        abrilIngreso: 0.0,
        mayoIngreso: 0.0,
        junioIngreso: 0.0,
        julioIngreso: 0.0,
        agostoIngreso: 0.0,
        septiembreIngreso: 0.0,
        octubreIngreso: 0.0,
        noviembreIngreso: 0.0,
        diciembreIngreso: 0.0,
        observacion: null,
        discapacidad: null,
        emergenciaNombre: null,
        emergenciaTelefono: null,
        emergenciaTelefono2: null,
        emergenciaDireccion: null,
        emergenciaParentezco: null,
        tipoSangreId: 0,
        emergenciaAlergico: null,
        emergenciaDiabetico: 'sT',
        emergenciaInsodepend: 'st',
        emergenciaPresionAlta: null,
        emergenciaPresionBaja: null,
        emergenciaEnTratamiento: 'st',
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

      tabPaneActiveKey: 1,
      columns: [
        { key: 'apellidos', label: 'Apellido', _style: { width: '15%' } },
        { key: 'nombres', label: 'Nombre', _style: { width: '15%' } },
        { key: 'cedula', label: 'Cédula', _style: { width: '10%' } },
        {
          key: 'programaDivision',
          label: 'Programa',
          _style: { width: '20%' },
        },
        // {
        //   key: 'Direccion o Dependencia',
        //   label: 'Direccion o Dependencia',
        //   _style: { width: '40%' },
        // },
        { key: 'posicion', label: 'Cargo', _style: { width: '10%' } },
        {
          key: 'fechaIngreso',
          label: 'Fecha ingreso',
          _style: { width: '15%' },
        },
        {
          key: 'fechaNacimiento',
          label: 'Fecha Nacim.',
          _style: { width: '20%' },
        },
        { key: 'sexo', label: 'Sexo', _style: { width: '2%' } },

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
    ...mapState(useRegistroStore, ['registroPersonal', 'posicionCargo']),
  },

  methods: {
    ...mapActions(useRegistroStore, [
      'getRegistroPersonal',
      'addRegistroPersonal',
      'getPosicion',
    ]),

    imprimirReporte() {
      if (this.reporteDepto.split('-')[0] == 1) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Nombre&rs:Command=Render&ID_AYUNTAMIENTO=${localStorage.getItem(
              'id_Ayuntamiento',
            )}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 2) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Apellidos&rs:Command=Render&ID_AYUNTAMIENTO=${localStorage.getItem(
              'id_Ayuntamiento',
            )}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 3) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Cargo&rs:Command=Render&ID_AYUNTAMIENTO=${localStorage.getItem(
              'id_Ayuntamiento',
            )}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 4) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Departamentos&rs:Command=Render&ID_AYUNTAMIENTO=${localStorage.getItem(
              'id_Ayuntamiento',
            )}`,
            '_blank',
          )
          .focus()
      }
    },

    focusInput() {
      this.$refs.name.focus()
      this.$refs.klk.focus()
    },

    unaVez() {
      // if (!this.runOnce) {
      this.focusInput()
      // this.runOnce = true
      // }
    },
    openModal() {
      this.lgDemo = true
      setTimeout(this.unaVez, 200)
    },

    changePrograma(e) {
      Api.getDepartamentoByProgramaId(e.target.value).then((response) => {
        this.departamentos = response.data.data
      })
    },
    formatDate(fechaIngreso) {
      return new Date(fechaIngreso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },

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
      if (item.empleados !== 0 || item.variacion !== 0) {
        this.empleadoValue = true
      } else {
        this.empleadoValue = false
      }
      this.edit = true
      this.lgDemo = true
      Api.getEmpleadoByID(item.id).then((response) => {
        this.id = item.id
        this.postEmpleado = response.data.data
      })
    },

    // deleteItem(item){
    //   Api.delete
    // },

    clearModal1() {
      this.postEmpleado = {
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
        estadoCivil: 'M',
        sexo: 'M',
        dependientes: 0,
        fechaIngreso: new Date(Date.now()),
        fechaSalida: new Date(Date.now()),
        razonSalida: null,
        reemplear: true,
        fechaReingreso: new Date(Date.now()),
        programaDivisionId: 0,
        departamentoId: 0,
        areaTrabajoId: 0,
        posicionId: 0,
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
        sueldo: 0.0,
        sueldoAnterior: 0.0,
        fechaSueldoAnterior: new Date(Date.now()),
        fechaUltimaNomina: new Date(Date.now()),
        inicioVacaciones: new Date(Date.now()),
        finVacaciones: new Date(Date.now()),
        activoNomina: true,
        ingreso2: 0.0,
        ingreso3: 0.0,
        ingreso4: 0.0,
        ingreso5: 0.0,
        ingreso6: 0.0,
        ingreso7: 0.0,
        ingreso8: 0.0,
        ingreso9: 0.0,
        ingreso10: 0.0,
        impuestoSobreRenta: 0.0,
        arsCalculado: true,
        arsFijo: 0.0,
        afpCalculado: true,
        afpFijo: 0.0,
        egresos4: 0.0,
        egresos5: 0.0,
        egresos6: 0.0,
        egresos7: 0.0,
        egresos8: 0.0,
        egresos9: 0.0,
        egresos10: 0.0,
        eneroIngreso: 0.0,
        febreroIngreso: 0.0,
        marzoIngreso: 0.0,
        abrilIngreso: 0.0,
        mayoIngreso: 0.0,
        junioIngreso: 0.0,
        julioIngreso: 0.0,
        agostoIngreso: 0.0,
        septiembreIngreso: 0.0,
        octubreIngreso: 0.0,
        noviembreIngreso: 0.0,
        diciembreIngreso: 0.0,
        observacion: null,
        discapacidad: null,
        emergenciaNombre: null,
        emergenciaTelefono: null,
        emergenciaTelefono2: null,
        emergenciaDireccion: null,
        emergenciaParentezco: null,
        tipoSangreId: 0,
        emergenciaAlergico: null,
        emergenciaDiabetico: 'sT',
        emergenciaInsodepend: 'st',
        emergenciaPresionAlta: null,
        emergenciaPresionBaja: null,
        emergenciaEnTratamiento: 'st',
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
      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
        this.postEmpleado.programaDivisionId = this.programaDivision[0].id
      })

      Api.getPosicion().then((response) => {
        this.posicionCargo = response.data.data
        this.postEmpleado.posicionId = this.posicionCargo[0].id
      })

      Api.getAreaTrabajo().then((response) => {
        this.areaTrabajo = response.data.data
        this.postEmpleado.areaTrabajoId = this.areaTrabajo[0].id
      })

      apiSectores.getSectores().then((response) => {
        this.sector = response.data.data
        this.postEmpleado.sectorId = this.sector[0].id
      })

      Api.getAllTipoSangre().then((response) => {
        this.tipoSangre = response.data.data
        this.postEmpleado.tipoSangreId = this.tipoSangre[0].id
      })

      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
        this.postEmpleado.programaDivisionId = this.programaDivision[0].id
        Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
          (response) => {
            this.departamentos = response.data.data
            this.postEmpleado.departamentoId = this.departamentos[0].id
          },
        )
      })
    },
    submitForm() {
      if (this.id) {
        Api.putEmpleado(this.id, this.postEmpleado).then((response) => {
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(this.getRegistroPersonal, 500)
          this.postEmpleado = {
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
            estadoCivil: 'M',
            sexo: null,
            dependientes: 0,
            fechaIngreso: new Date(Date.now()),
            fechaSalida: new Date(Date.now()),
            razonSalida: null,
            reemplear: true,
            fechaReingreso: new Date(Date.now()),
            programaDivisionId: 0,
            departamentoId: 0,
            areaTrabajoId: 0,
            posicionId: 0,
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
            sueldo: 0.0,
            sueldoAnterior: 0.0,
            fechaSueldoAnterior: new Date(Date.now()),
            fechaUltimaNomina: new Date(Date.now()),
            inicioVacaciones: new Date(Date.now()),
            finVacaciones: new Date(Date.now()),
            activoNomina: true,
            ingreso2: 0.0,
            ingreso3: 0.0,
            ingreso4: 0.0,
            ingreso5: 0.0,
            ingreso6: 0.0,
            ingreso7: 0.0,
            ingreso8: 0.0,
            ingreso9: 0.0,
            ingreso10: 0.0,
            impuestoSobreRenta: 0.0,
            arsCalculado: true,
            arsFijo: 0.0,
            afpCalculado: true,
            afpFijo: 0.0,
            egresos4: 0.0,
            egresos5: 0.0,
            egresos6: 0.0,
            egresos7: 0.0,
            egresos8: 0.0,
            egresos9: 0.0,
            egresos10: 0.0,
            eneroIngreso: 0.0,
            febreroIngreso: 0.0,
            marzoIngreso: 0.0,
            abrilIngreso: 0.0,
            mayoIngreso: 0.0,
            junioIngreso: 0.0,
            julioIngreso: 0.0,
            agostoIngreso: 0.0,
            septiembreIngreso: 0.0,
            octubreIngreso: 0.0,
            noviembreIngreso: 0.0,
            diciembreIngreso: 0.0,
            observacion: null,
            discapacidad: null,
            emergenciaNombre: null,
            emergenciaTelefono: null,
            emergenciaTelefono2: null,
            emergenciaDireccion: null,
            emergenciaParentezco: null,
            tipoSangreId: 0,
            emergenciaAlergico: null,
            emergenciaDiabetico: 'sT',
            emergenciaInsodepend: 'st',
            emergenciaPresionAlta: null,
            emergenciaPresionBaja: null,
            emergenciaEnTratamiento: 'st',
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
        setTimeout(this.getRegistroPersonal, 500)
      } else {
        setTimeout(this.getRegistroPersonal, 500)
        this.addRegistroPersonal(this.postEmpleado)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
        setTimeout(this.getRegistroPersonal, 500)
        //const form = event.currentTarget
        this.lgDemo = true
        setTimeout(this.getRegistroPersonal, 500)
        ;(this.postEmpleado = {
          id: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          nombre: null,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getRegistroPersonal, 500)
      }
    },

    deleteEmp(item) {
      setTimeout(this.getRegistroPersonal, 500)
      Api.deleteEmpleado(item.id)
        .then((response) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(this.getRegistroPersonal, 500)
        })
        .catch((error) => {
          this.$swal({
            position: 'top-end',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          })
        })
    },
  },

  mounted() {
    this.getRegistroPersonal()
    Api.getPosicion().then((response) => {
      this.posicionCargo = response.data.data
      this.postEmpleado.posicionId = this.posicionCargo[0].id
    }),
      Api.getAreaTrabajo().then((response) => {
        this.areaTrabajo = response.data.data
        this.postEmpleado.areaTrabajoId = this.areaTrabajo[0].id
      })

    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
      this.postEmpleado.programaDivisionId = this.programaDivision[0].id
      Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
        (response) => {
          this.departamentos = response.data.data
          this.postEmpleado.departamentoId = this.departamentos[0].id
        },
      )
    })

    apiSectores.getSectores().then((response) => {
      this.sector = response.data.data
      this.postEmpleado.sectorId = this.sector[0].id
    })

    Api.getAllTipoSangre().then((response) => {
      this.tipoSangre = response.data.data
      this.postEmpleado.tipoSangreId = this.tipoSangre[0].id
    })
  },
}
</script>
