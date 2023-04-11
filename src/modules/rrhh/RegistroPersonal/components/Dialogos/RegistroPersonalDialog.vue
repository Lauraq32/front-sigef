<template>
  <CModal size="xl" :visible="showModal">
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
          <CNavItem>
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 5" @click="
              () => {
                tabPaneActiveKey = 5
              }
            ">
              Otras Informaciones
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
                    <CFormLabel for="validationCustom01">C&oacute;digo de Empleado</CFormLabel>
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
                        <option>C&eacute;dula</option>
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
                    <CFormLabel for="validationCustom02">Documento</CFormLabel>
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
                        v-model="postEmpleado.fechaNacimiento" type="date" id="validationCustom01"
                        @change="validateAge($event)" />
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
                        <option>Masculino</option>
                        <option>Femenino</option>
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
                  <CFormLabel for="validationCustom05">Recomendado por</CFormLabel>
                  <CFormInput type="text" id="validationCustom02" />
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
                  <CCol :md="12">
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

                <CCol :md="12">
                  <CFormLabel for="validationCustom02">Sueldo actual</CFormLabel>
                  <CFormInput v-model="postEmpleado.sueldo" id="validationCustom02" required />
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
                <CCol>
                  <CFormLabel for="validationCustom02">Otros</CFormLabel>
                  <CFormInput v-model="postEmpleado.emergenciaTelefono" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
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
                  <CFormInput v-model="postEmpleado.emergenciaTelefono" id="validationCustom02" required />
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
                  <CFormTextarea v-model="postEmpleado.telefono" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 5">
            <div class="row">
              <h3>En caso de emergencia comunicarse con</h3>
              <hr />
              <CCol :md="8">


                <CCol :md="6">
                  <CFormLabel for="validationCustom02">Nivel Escolar</CFormLabel>
                  <CFormSelect id="validationCustom05">
                    <option>01 - Sin Datos.</option>
                    <option>01 - No Alfabetizado</option>
                    <option>01 - Alfabetizado</option>
                    <option>01 - Inicial</option>
                    <option>01 - Basica</option>
                    <option>01 - Diplomado</option>
                    <option>01 - Media</option>
                    <option>01 - Tecnico Superior</option>
                    <option>01 - Grado</option>
                    <option>01 - Postgrado Esp.</option>
                    <option>01 - Postgrado Maest.</option>
                    <option>01 - Postgrado Foct</option>


                  </CFormSelect>
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="6">
                  <CFormLabel for="validationCustom02">Area Tematica</CFormLabel>
                  <CFormSelect id="validationCustom05">
                    <option>01 - Ciencia Juridical y Pol.</option>
                    <option>02 - Tecnologia de la inf.</option>
                    <option>03 - Ingenieria y Arquit.</option>
                    <option>04 - Ciencias de la Salud.</option>
                    <option>05 - Ciencia Econ. y Soc.</option>
                    <option>06 - No Clasificado.</option>
                    <option>07 - Ciencias Basicas</option>
                    <option>08 - Agronomia y Vet</option>
                    <option>09 - Artes y Humanidades</option>
                  </CFormSelect>
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom02">Titulo obtenido</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom02">Correo electronico 1 y 2</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol class="mt-2">
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <h5>Datos de Evaluacion de Desenpe&ntilde;o</h5>
                <CCol :md="12">
                  <CFormLabel for="validationCustom02">Fecha Inicial Evaluaci&oacute;n</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom02">Fecha Inicial Evaluaci&oacute;n</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom02">Nota Final</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </CCol>
              <CCol :md="4">
                <div class="border" style="width: 100%; height: 40%;">

                </div>
                <button class="btn btn-primary mt-3">Guardar imagen</button>
              </CCol>
            </div>
          </CTabPane>
        </CTabContent>
      </div>
    </CModalBody>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
      <button type="button" class="btn btn-primary" v-on:click="saveRegistroPersonal">
        Guardar
      </button>
    </div>

  </CModal>
</template>

<script>

import { CModal } from '@coreui/vue'
import moment from 'moment'
export default {
  name: 'RegistroPersonalDialog',
  components: {
    CModal,
    moment,
  },
  data: function () {
    return {
      tabPaneActiveKey: 1,
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
    }
  },

  computed: {
  },

  methods: {
    saveRegistroPersonal() {
      this.$emit('post-personal', {
        ...this.solicitudEmpleo
      })
    },
  },
  computed: {
  },

  mounted() {
  },

  props: {
    showModal: Boolean,
  }
}
</script>
