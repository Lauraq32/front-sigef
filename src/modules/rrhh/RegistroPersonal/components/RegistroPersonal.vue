<template>
  <h3 class="text-center">Mantenimientos Empleados</h3>
  <AccionPersonalDialog :showModal="lgDemo4" @custom-event="closeModal"
  />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
          openModal()
          clearModal1()
        }
      ">Agregar</CButton>
      <ContenedorArchivosRRHH :showModal="showModalDoc" :empleado="selectedEmployee" @custom-event="closeModal"/>

      <div class="d-inline p-2">
        <CButton color="info" @click="
          () => {
            reportes = true
          }
        ">Imprimir Reporte</CButton>
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
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="registroPersonal" :columns="columns" columnFilter
    itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #sexo="{ item }">
      <td>
        {{ item.sexo == 'M' ? 'Masculino' : 'Femenino' }}
      </td>
    </template>
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
      <CDropdown>
        <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem @click="toggleDetails(item)">Editar</CDropdownItem>
          <CDropdownItem @click="deleteEmp(item)">Eliminar</CDropdownItem>

          <CDropdownItem @click="
            () => {
              lgDemo4 = true
            }
          ">Evaluación</CDropdownItem>
          <CDropdownItem>Eventualidad</CDropdownItem>
          <CDropdownItem @click="selectedEmployee = item; showModalDoc = true">Ver Documentos</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
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
  <CModal size="xl" :visible="lgDemo" @close="
    () => {
      lgDemo = false
    }
  ">
    <CModalHeader>
      <CModalTitle>Formulario de empleados</CModalTitle>
    </CModalHeader>

    <CModalBody>
      <div class="row">
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1" @click="
              () => {
                tabPaneActiveKey = 1
              }
            ">
              General
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 3" @click="
              () => {
                tabPaneActiveKey = 3
              }
            ">
              Observación
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 4" @click="
              () => {
                tabPaneActiveKey = 4
              }
            ">
              Historial clínico
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
            <div class="row">
              <div class="col-5 border p-3">
                <h3>Datos generales</h3>
                <div class="row mt-3">
                  <div class="col-6">
                    <CFormLabel for="validationCustom01">Código</CFormLabel>
                  </div>
                  <div class="col-6">
                    <CCol :md="5">
                      <input style="position: relative; left: -62px" ref="name" type="text" class="form-control"
                        v-model="postEmpleado.codigo" id="exampleInputEmail1" />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-6">
                    <CFormLabel for="validationCustom05">Tipo de documento</CFormLabel>
                  </div>
                  <div class="col-6">
                    <CCol :md="10">
                      <CFormSelect style="position: relative; left: -62px" v-model="postEmpleado.tipoDocumento"
                        id="validationCustom05">
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
                      <CFormInput style="position: relative; left: -62px" v-model="postEmpleado.cedula"
                        id="validationCustom02" required />
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
                      <CFormInput style="position: relative; right: -52px" v-model="postEmpleado.nombres"
                        id="validationCustom02" required />
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
                      <CFormInput style="position: relative; right: -52px" v-model="postEmpleado.apellidos"
                        id="validationCustom01" />

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
                      <CFormInput style="position: relative; right: -52px" v-model="postEmpleado.direccion"
                        id="validationCustom02" required />
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
                      <CFormSelect style="position: relative; right: -52px" v-model="postEmpleado.sectorId"
                        id="validationCustom05">
                        <option v-for="sect in this.sector" :key="sect.id" :value="sect.id">
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
                      <CFormInput style="position: relative; right: -52px" v-model="postEmpleado.telefono"
                        id="validationCustom02" required />
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="validationCustom05">Estado civil</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormSelect style="position: relative; right: -52px" v-model="postEmpleado.estadoCivil"
                        id="validationCustom05">
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
                    <CFormLabel for="validationCustom01">Fecha nacimiento</CFormLabel>
                  </div>
                  <div class="col-8">
                    <CCol :md="11">
                      <CFormInput style="position: relative; right: -13px; width: 267px"
                        v-model="postEmpleado.fechaNacimiento" type="date" id="validationCustom01" />
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-4">
                    <CFormLabel for="validationCustom02">Lugar nacimiento</CFormLabel>
                  </div>
                  <div class="col-8">
                    <CCol :md="11">
                      <CFormInput style="position: relative; right: -13px; width: 267px"
                        v-model="postEmpleado.lugarNacimiento" id="validationCustom02" required />
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
                      <CFormSelect style="position: relative; right: -52px" v-model="postEmpleado.sexo"
                        id="validationCustom05">
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
                    <CFormLabel for="validationCustom02">Dependientes</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="10">
                      <CFormInput style="position: relative; right: -52px" v-model="postEmpleado.dependientes"
                        type="number" id="validationCustom02" required />
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
                  <CFormLabel for="validationCustom01">Fecha ingreso</CFormLabel>
                  <CFormInput v-model="postEmpleado.fechaIngreso" type="date" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Dirección o dependencia</CFormLabel>
                  <CFormSelect v-model="postEmpleado.programaDivisionId" id="validationCustom05"
                    v-on:change="changePrograma($event)">
                    <option v-for="programa in this.programaDivision" :key="programa.id" :value="programa.id">
                      {{ programa.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom01">Departamento</CFormLabel>
                  <CFormSelect v-model="postEmpleado.departamentoId" id="validationCustom05">
                    <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">
                      {{ departamento.nombre }}
                    </option>
                  </CFormSelect>

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Área de trabajo</CFormLabel>
                  <CFormSelect v-model="postEmpleado.areaTrabajoId" id="validationCustom05">
                    <option v-for="area in this.areaTrabajo" :key="area.id" :value="area.id">
                      {{ area.area }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Cargos</CFormLabel>
                  <CFormSelect v-model="postEmpleado.posicionId" id="validationCustom05">
                    <option v-for="cargo in this.posicionCargo" :key="cargo.id" :value="cargo.id">
                      {{ cargo.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Tipo Sangre</CFormLabel>
                  <CFormSelect v-model="postEmpleado.tipoSangreId" id="validationCustom05">
                    <option v-for="sangre in this.tipoSangre" :key="sangre.id" :value="sangre.id">
                      {{ sangre.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <div class="row">
                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">Tipo de contrato</CFormLabel>
                    <CFormSelect v-model="postEmpleado.tipoContrato" id="validationCustom05">
                      <option>Tipo de contrato 1</option>
                      <option>Tipo de contrato 2</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">Turno</CFormLabel>
                    <CFormSelect v-model="postEmpleado.turno" id="validationCustom05">
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
                    <CFormSelect v-model="postEmpleado.periodoPago" id="validationCustom05">
                      <option>MENSUAL</option>
                      <option>QUINCENAL</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol style="width: 159px">
                    <CFormLabel for="validationCustom05">Tipo de pago</CFormLabel>
                    <CFormSelect v-model="postEmpleado.formaPago" id="validationCustom05">
                      <option>BANCO</option>
                      <option>CHEQUE</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>

                <CCol>
                  <CFormLabel for="validationCustom02">Sueldo actual</CFormLabel>
                  <CFormInput style="width: 159px" v-model="postEmpleado.sueldo" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>

              <div class="col-2" style="margin-top: 9px; width: 264px; height: 500px">
                <div class="border" style="height: 40%"></div>
                <h4>Guardar Imagen</h4>
                <h4>Abrir Carpeta</h4>
              </div>
            </div>
          </CTabPane>

          <CTabPane role="tabpanel" aria-labelledby="contact-tab" :visible="tabPaneActiveKey === 3">
            <div class="row">
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Licencia de conducir</CFormLabel>
                  <CFormInput v-model="postEmpleado.licenciaConducir" type="date" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Fecha expiraci licencia de conducir</CFormLabel>
                  <CFormInput v-model="postEmpleado.fechaExpiracionLicencia" type="date" id="validationCustom02" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Fecha expira tarjeta del banco:</CFormLabel>
                  <CFormInput v-model="postEmpleado.fechaExpitaTarjeta" type="date" id="validationCustom01" />
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
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 4">
            <div class="row">
              <div class="col-4 border p-3">
                <h3>En caso de emergencia comunicarse con</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01">Nombres</CFormLabel>

                  <CFormInput v-model="postEmpleado.emergenciaNombre" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Teléfono</CFormLabel>
                  <CFormInput v-model="postEmpleado.emergenciaTelefono" disabled id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Dirección</CFormLabel>
                  <CFormInput v-model="postEmpleado.emergenciaDireccion" id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom05">Parentezco</CFormLabel>
                  <CFormSelect v-model="postEmpleado.emergenciaParentezco" id="validationCustom05">
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
                  <CFormInput v-model="postEmpleado.telefono" id="validationCustom02" required />
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
                  <CFormLabel for="validationCustom05">Nivel de presión</CFormLabel>
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
                  <CFormLabel for="validationCustom01">Fecha adiciona</CFormLabel>
                  <CFormInput type="date" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Usuario adiciona:</CFormLabel>
                  <CFormInput disabled id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Fecha modifica:</CFormLabel>
                  <CFormInput disabled id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Usuario modifica</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Valores anteriores</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <h3>Intervención quirurgica(más reciente)</h3>

                <CCol>
                  <CFormLabel for="validationCustom02">Detalle diagnostico</CFormLabel>
                  <CFormInput v-model="postEmpleado.telefono" id="validationCustom02" required />
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
</template>

<script>
import { useAuthStore } from '@/store/AuthStore'
import { useRegistroStore } from '../store/RegistroPersonal/Empleados'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import apiSectores from '../../../financiero/NominaModule/services/NominaServices'
import moment from 'moment'
import { useToastStore } from '@/store/toast'
import AccionPersonalDialog from '../../RegistroPersonal/components/Dialogos/AccionPersonal.vue'
import ContenedorArchivosRRHH from './ContenedorArchivosRRHH.vue'


export default {
  components: {
    CSmartTable,
    CModal,
    moment,
    AccionPersonalDialog,
    ContenedorArchivosRRHH,
  },
  data: function () {
    return {
      selectedEmployee:{},
      filedata: {},
      userid: null,
      status: false,
      showModalDoc: false,
      lgDemo4: false,
      cambiar: false,
      registroPersonal: [],
      horaActual: '',
      toasts: [],
      code: null,
      noEnviado: false,
      Error: '',
      status: null,
      liveExampleVisible: false,
      reporteDepto: 1,
      reportes: false,
      posicionCargo: [{}],
      tipoSangre: [{}],

      areaTrabajo: [{}],
      programaDivision: [{}],
      sector: [{}],
      departamentos: [],
      postFile: {

      },
      postEmpleado: {
        ayuntamientoId: null,
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
        { key: 'codigo', label: 'Código', _style: { width: '10%' } },
        {
          key: 'programaDivision',
          label: 'Programa',
          _style: { width: '20%' },
        },
        { key: 'posicion', label: 'Cargo', _style: { width: '10%' } },
        {
          key: 'fechaIngreso',
          label: 'Fecha ingreso',
          _style: { width: '15%' },
        },

        { key: 'sexo', label: 'Sexo', _style: { width: '2%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '20%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },
      ],

      details: [],

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore, useToastStore),
    ...mapState(useRegistroStore, ['registroPersonal', 'posicionCargo']),
  },

  methods: {
    ...mapActions(useRegistroStore, [
      'getRegistroPersonal',
      'addRegistroPersonal',
      'getPosicion',
    ]),
    ...mapActions(useToastStore, ['show']),

    imprimirReporte() {
      if (this.reporteDepto.split('-')[0] == 1) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Nombre&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 2) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Apellidos&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 3) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Cargo&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 4) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Departamentos&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      }
    },

    // focusInput() {
    //   this.$refs.name.focus()
    //   this.$refs.klk.focus()
    // },

    // unaVez() {
    //   this.focusInput()
    // },
    openModal() {
      this.lgDemo = true
      setTimeout(this.unaVez, 200)
    },
    closeModal(payload) {
      this.showModalDoc = payload
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
    onFileChange(event) {

      event.target.files


      this.filedata = event.target.files





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

    clearModal1() {
      this.id = null
      this.postEmpleado = {
        ayuntamientoId: this.$ayuntamientoId,
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
      if (this.id != null) {
        Api.putEmpleado(this.id, this.postEmpleado).then((response) => {
          this.lgDemo = false
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })

          setTimeout(this.getRegistroPersonal, 500)
          this.postEmpleado = {
            ayuntamientoId: this.authInfo.ayuntamiento.id,
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
        this.postEmpleados()
        this.lgDemo = true
        setTimeout(this.getRegistroPersonal, 500)
          ; (this.postEmpleado = {
            id: 0,
            ayuntamientoId: this.$ayuntamientoId,
            nombre: null,
          }),
            (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getRegistroPersonal, 500)
      }
    },
    postEmpleados() {
      Api.postEmpleado(this.postEmpleado).then((response) => {
        if(response.status == 200){

          const formData = new FormData();
          formData.append('userid', 1);
          formData.append('file', this.filedata);


          Api.postFiles(formData)
        }

        this.show({
          content: 'Registro añadido correctamente',
          closable: true,

        })
      }).catch((error) => {
          this.show({
            content: 'Error al enviar el formulario',
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })

    },

    deleteEmp(item) {
      setTimeout(this.getRegistroPersonal, 500)
      Api.deleteEmpleado(item.id)
        .then((response) => {
          this.show({
            content: response.data.message,
            closable: true,
            color: 'inherit',
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
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['authInfo']),
  },

  mounted() {
    setInterval(() => {
      this.horaActual = moment().format('HH:mm')
    }, 1000)

    Api.getAllEmpleado().then((response) => {
      this.registroPersonal = response.data.data
    })

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
<style scoped>
.file-select>.select-button {
  padding: 0.5rem;
  line-height: 1.5;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.file-select>input[type='file'] {
  display: none;
}
</style>
