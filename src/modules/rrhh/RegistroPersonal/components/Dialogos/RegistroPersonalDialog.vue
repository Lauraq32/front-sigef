<template>
  <CModal size="xl" :visible="showModal" @close="closeModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Formulario de empleados</CModalTitle>
    </CModalHeader>

    <CForm novalidate :validated="isFormEventTypeValidated" ref="employeeForm">
      <CModalBody>
        <div class="row">
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1" @click="() => {
                tabPaneActiveKey = 1
              }
                ">
                General
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 3" @click="() => {
                tabPaneActiveKey = 3
              }
                ">
                Observaci&oacute;n
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 4" @click="() => {
                tabPaneActiveKey = 4
              }
                ">
                Historial Cl&iacute;nico
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 5" @click="() => {
                tabPaneActiveKey = 5
              }
                ">
                Otras Informaciones
              </CNavLink>
            </CNavItem>
            <CNavItem v-if="isNomina">
              <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 6" @click="() => {
                tabPaneActiveKey = 6
              }
                ">
                Ingresos y Retenciones
              </CNavLink>
            </CNavItem>
            <CNavItem v-if="isNomina">
              <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 7" @click="() => {
                tabPaneActiveKey = 7
              }
                ">
                Acumulado Anual
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
              <div class="row">
                <div class="col-5 border p-3">
                  <h3>Datos generales</h3>
                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="codigo">C&oacute;digo</CFormLabel>
                    </div>
                    <div class="col-4">
                      <CCol :md="12">
                        <CFormInput required ref="name" type="text" class="form-control" v-model="postEmpleado.codigo"
                          id="codigo" :maxlength="9" :disabled="postEmpleado.id" />
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="tipoDocumento">Documento</CFormLabel>
                    </div>
                    <div class="col-4">
                      <CFormSelect :disabled="isNomina" v-model="postEmpleado.tipoDocumento"
                        v-on:change="changeDocument()" required id="validationCtipoDocumentoustom05">
                        <option disabled selected value="">Seleccionar</option>
                        <option value="cedula">C&eacute;dula</option>
                        <option value="Pasaporte">Pasaporte</option>
                      </CFormSelect>
                    </div>
                    <div class="col-5">
                      <CFormInput :disabled="isNomina" v-model="postEmpleado.codigoIdentidad" :maxlength="cedulaMax"
                        id="codigoIdentidad" v-on:keypress="checkDocument($event)" required />
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="nombres">Nombre</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormInput :disabled="isNomina" v-model="postEmpleado.nombre" id="nombres" required
                          v-on:keypress="onlyLetter($event)" maxlength="30" />
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="apellidos">Apellidos</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormInput :disabled="isNomina" required v-model="postEmpleado.apellido" id="apellidos"
                          v-on:keypress="onlyLetter($event)" maxlength="30" />
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="sexo">Sexo</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormSelect :disabled="isNomina" v-model="postEmpleado.sexo" id="sexo" required>
                          <option disabled selected value="">
                            Seleccionar
                          </option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                        </CFormSelect>
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="direccion">Dirección</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormInput :disabled="isNomina" v-model="postEmpleado.direccion" id="direccion" required
                          maxlength="50" />
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="sectorId">Sector</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormSelect :disabled="isNomina" v-model="postEmpleado.sectorId" id="sectorId" required>
                          <option value="" disabled selected>Seleccione</option>
                          <option v-for="sect in this.sector" :key="sect.id" :value="sect.id">
                            {{ sect.nombre }}
                          </option>
                        </CFormSelect>
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="telefono">Tel&eacute;fono</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormInput :disabled="isNomina" v-on:keypress="onlyNumber($event)"
                          v-model="postEmpleado.telefono" id="telefono" maxlength="13" />
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="estadoCivil">Estado civil</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormSelect :disabled="isNomina" v-model="postEmpleado.estadoCivil" id="estadoCivil"
                          aria-placeholder="Estado" required>
                          <option disabled selected value="">
                            Seleccionar
                          </option>
                          <option>Soltero/a</option>
                          <option>Casado/a</option>
                        </CFormSelect>
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="fechaNacimiento">Fecha
                        <span title="Nacimiento">nacto.</span>
                      </CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <AppDateField :disabled="isNomina" class="form-control" v-model="postEmpleado.fechaNacimiento" />
                        <CFormFeedback invalid :style="{
                          display: !isEmployeeAdult ? 'flex' : 'none',
                        }">
                          El empleado no cumple la mayor&iacute;a de edad
                        </CFormFeedback>
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="lugarNacimiento">Lugar
                        <span title="Nacimiento">nacto.</span>
                      </CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormInput :disabled="isNomina" v-model="postEmpleado.lugarNacimiento" id="lugarNacimiento"
                          v-on:keypress="onlyLetter($event)" maxlength="20" />
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="dependientes">Dependientes</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CFormInput :disabled="isNomina" v-model="postEmpleado.dependientes"
                        v-on:keypress="onlyNumber($event)" id="dependientes" required maxlength="3" />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="discapacidad">Discapacidad</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CFormSelect :disabled="isNomina" v-model="postEmpleado.discapacidad" id="discapacidad" required>
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="discapacidad in this.discapacidadList" :key="discapacidad.id"
                          :value="discapacidad.id">
                          {{ discapacidad.configValue }}
                        </option>
                      </CFormSelect>
                    </div>
                  </div>
                </div>
                <div class="col-4 border p-3">
                  <h3>Datos laborales</h3>
                  <div class="row">
                    <CCol :md="6">
                      <CFormLabel for="fechaIngreso">Fecha ingreso</CFormLabel>
                      <AppDateField :disabled="isNomina" required @change="validarFechaDesde" class="form-control"
                        v-model="postEmpleado.fechaIngreso" />
                      <CFormFeedback invalid :style="{
                        display: isLowerSelectedInitDate ? 'flex' : 'none',
                      }">
                        La fecha no puede ser mayor a la fecha actual
                      </CFormFeedback>
                    </CCol>
                    <CCol v-if="isNomina" :md="6" class="d-flex align-items-end">
                      <div>
                        <CBadge color="warning">
                          <CFormCheck id="flexCheckIndeterminate" label="Activo en Nómina?" class="formcheck fw-bold"
                            v-model="postEmpleado.estaEnNomina" />
                        </CBadge>
                      </div>
                    </CCol>
                  </div>

                  <CCol :md="12">
                    <CFormLabel for="Recomendado">Recomendado por</CFormLabel>
                    <CFormInput :disabled="isNomina" v-model="postEmpleado.recomendadoPor" type="text" id="Recomendado"
                      v-on:keypress="onlyLetter($event)" maxlength="50" />
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="programaDivisionId">Dirección o dependencia</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.programaDivisionId" id="programaDivisionId"
                      @change="getListDepartamento($event)" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="programa in this.programaDivision" :key="programa.id" :value="programa.id">
                        {{ programa.nombre }}
                      </option>
                    </CFormSelect>
                  </CCol>
                  <CCol>
                    <CFormLabel for="departamentoId">Departamento</CFormLabel>
                    <v-select :disabled="isNomina" required id="validationCustom03" v-model="selectedDepartamento"
                      :options="departamentoList"></v-select>
                  </CCol>

                  <CCol :md="12">
                    <CFormLabel for="areaTrabajoId">Área de trabajo</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.areaTrabajoId" id="areaTrabajoId" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="area in this.areaTrabajo" :key="area.id" :value="area.id">
                        {{ area.descripcion }}
                      </option>
                    </CFormSelect>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="posicionId">Cargos</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.posicionId" id="posicionId" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="cargo in this.posicionCargo" :key="cargo.id" :value="cargo.id">
                        {{ cargo.nombre }}
                      </option>
                    </CFormSelect>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="posicionId">Grupo Ocupaci&oacute;n</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.grupoOcupacional" id="posicionId" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="ocupacion in this.grupoOcupacion" :key="ocupacion.configKey"
                        :value="ocupacion.configKey">
                        {{ ocupacion.configValue }}
                      </option>
                    </CFormSelect>
                  </CCol>

                  <div class="row">
                    <CCol :md="6">
                      <CFormLabel for="tipoContrato">Tipo de contrato</CFormLabel>
                      <CFormSelect v-model="postEmpleado.tipoContrato" id="tipoContrato" required>
                        <option disabled selected value="">Seleccionar</option>
                        <option>Temporal</option>
                        <option>Fijo</option>
                      </CFormSelect>
                    </CCol>
                    <CCol :md="6">
                      <CFormLabel for="turno">Turno</CFormLabel>
                      <CFormSelect :disabled="isNomina" v-model="postEmpleado.turno" id="turno" required>
                        <option disabled selected value="">Seleccionar</option>
                        <option>DIURNO</option>
                        <option>NOCTURNO</option>
                        <option>ROTATIVO</option>
                      </CFormSelect>
                    </CCol>
                  </div>

                  <div class="row">
                    <CCol :md="6">
                      <CFormLabel for="periodoPago">Tipo cobro</CFormLabel>
                      <CFormSelect v-model="postEmpleado.periodoPago" id="periodoPago" required>
                        <option disabled selected value="">Seleccionar</option>
                        <option>MENSUAL</option>
                        <option>QUINCENAL</option>
                      </CFormSelect>
                    </CCol>
                    <CCol :md="6">
                      <CFormLabel for="formaPago">Tipo de pago</CFormLabel>
                      <CFormSelect required v-model="postEmpleado.formaPago" id="formaPago" @change="() =>
                        postEmpleado.formaPago === 'BANCO'
                          ? (postEmpleado.numeroCuenta = '')
                          : ''
                        ">
                        <option disabled selected value="">Seleccionar</option>
                        <option>BANCO</option>
                        <option>CHEQUE</option>
                      </CFormSelect>
                    </CCol>
                  </div>
                  <div class="row ">
                    <CCol :class="{ 'col-md-6': postEmpleado.formaPago === 'BANCO' }">
                      <CFormLabel for="sueldo">Sueldo actual</CFormLabel>
                      <CurrencyInput id="sueldo" v-model="postEmpleado.sueldo" class="text-end" required :options="{
                        locale: 'en-US',
                        currency: 'DOP',
                        precision: 2,
                        currencyDisplay: 'hidden',
                      }" />
                    </CCol>

                    <CCol :md="6" v-if="postEmpleado.formaPago === 'BANCO'">
                      <CFormLabel for="cuentaBanco">No. Cuenta</CFormLabel>
                      <CFormInput v-on:keypress="onlyNumber($event)" type="text" v-model="postEmpleado.numeroCuenta"
                        id="cuentaBanco" required />
                    </CCol>
                  </div>
                </div>

                <div class="col-3 mb-5">
                  <div class="position-relative flex justify-content-center border border-dark w-100 mt-4"
                    style="height: 200px">
                    <label class="position-absolute top-50 start-50 translate-middle fs-5 upload-label"
                      style="font-weight: bolder" for="employeeProfileImage" v-if="empleado.id" v-show="!isNomina">Click
                      aqu&iacute; para
                      agregar imagen</label>
                    <img loading="lazy" v-if="empleado.id" class="h-100" :src="imageUrl"
                      alt="imagen de perfil del empleado" style="opacity: 0.8" />
                    <input :disabled="isNomina" v-if="empleado.id" id="employeeProfileImage"
                      accept="image/png, image/jpeg" type="file" @change="saveFile"
                      class="position-absolute top-50 start-50 translate-middle input-wrapper w-100 h-100 opacity-0" />
                  </div>
                  <div class="mt-4">
                    <h3 v-show="false">Retenciones de Ley</h3>

                    <CCol>
                      <CFormLabel for="estado">Estatus</CFormLabel>
                      <CFormSelect required v-model="postEmpleado.estado" id="estado"
                        :disabled="!postEmpleado.id || isNomina">
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="liquidado">Liquidado</option>
                        <option value="vacaciones">Vacaciones</option>
                      </CFormSelect>
                    </CCol>
                    <div v-show="false">
                      <CCol>
                        <CFormLabel for="Impuesto S.R.">ISR</CFormLabel>
                        <CFormInput id="Impuesto S.R." v-on:keypress="onlyNumber($event)" />
                      </CCol>

                      <div class="row mt-2">
                        <CCol :md="6">
                          <CFormLabel for="arsInput">ARS</CFormLabel>
                          <CFormInput :disabled="postEmpleado.arsCalculado" id="arsInput"
                            v-on:keypress="onlyNumber($event)" />
                        </CCol>
                        <CCol :md="6" class="d-flex justify-content-center align-items-end">
                          <CFormCheck v-model="postEmpleado.arsCalculado" id="flexCheckIndeterminate"
                            label="Automático?" />
                        </CCol>
                      </div>
                      <div class="row">
                        <CCol :md="6">
                          <CFormLabel for="afpinput">AFP</CFormLabel>
                          <CFormInput :disabled="postEmpleado.afpCalculado" id="afpinput"
                            v-on:keypress="onlyNumber($event)" />
                        </CCol>
                        <CCol :md="6" class="d-flex justify-content-center align-items-end">
                          <CFormCheck v-model="postEmpleado.afpCalculado" id="flexCheckIndeterminate"
                            label="Automático?" />
                        </CCol>
                      </div>
                    </div>
                    <CCol>
                      <CFormLabel for="F.Reingreso">F.Reingreso</CFormLabel>
                      <AppDateField disabled class="form-control" v-model="postEmpleado.fechaReingreso" />
                    </CCol>
                  </div>
                </div>
              </div>
            </CTabPane>

            <CTabPane role="tabpanel" aria-labelledby="contact-tab" :visible="tabPaneActiveKey === 3">
              <div class="row">
                <div class="col-4 border">
                  <CCol>
                    <CFormLabel for="licenciaConducir">Licencia de conducir</CFormLabel>
                    <CFormInput :disabled="isNomina" v-model="postEmpleado.licenciaConducir" maxlength="12"
                      id="licenciaConducir" v-on:keypress="onlyNumber($event)" />
                  </CCol>
                  <CCol>
                    <CFormLabel for="fechaExpiracionLicencia">Fecha expiraci&oacute;n licencia de conducir</CFormLabel>
                    <AppDateField :disabled="isNomina" class="form-control"
                      v-model="postEmpleado.fechaExpiracionLicencia" />
                  </CCol>
                  <CCol>
                    <CFormLabel for="fechaExpitaTarjeta">Fecha expira tarjeta del banco:</CFormLabel>
                    <AppDateField :disabled="isNomina" class="form-control" v-model="postEmpleado.fechaExpitaTarjeta" />
                  </CCol>
                </div>
                <div class="col-4 border p-3">
                  <h3>Otros</h3>
                  <CCol>
                    <CFormLabel for="emergenciaTelefono">Otros</CFormLabel>
                    <CFormInput :disabled="isNomina" id="emergenciaTelefono" type="text"
                      v-model="postEmpleado.observacion" :maxlength="100" />
                  </CCol>
                </div>
              </div>
            </CTabPane>

            <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 4">
              <div class="row">
                <div class="col-6 border p-3">
                  <h3>En caso de emergencia comunicarse con</h3>
                  <hr />

                  <CCol>
                    <CFormLabel for="emergenciaNombre">Nombres</CFormLabel>
                    <CFormInput :disabled="isNomina" v-model="postEmpleado.emergenciaNombre" id="emergenciaNombre"
                      :maxlength="40" />
                  </CCol>
                  <CCol>
                    <CFormLabel for="emergenciaTelefono">Tel&eacute;fono</CFormLabel>
                    <CFormInput :disabled="isNomina" v-on:keypress="onlyNumber($event)"
                      v-model="postEmpleado.emergenciaTelefono" id="emergenciaTelefono" maxlength="13" />
                  </CCol>
                  <CCol>
                    <CFormLabel for="emergenciaDireccion">Dirección</CFormLabel>
                    <CFormInput :disabled="isNomina" v-model="postEmpleado.emergenciaDireccion" id="emergenciaDireccion"
                      :maxlength="40" />
                  </CCol>
                  <CCol>
                    <CFormLabel for="emergenciaParentezco">Parentezco</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.emergenciaParentezco"
                      id="emergenciaParentezco">
                      <option value="" disabled selected>Seleccione</option>
                      <option>Padre</option>
                      <option>Madre</option>
                      <option>Hermano/a</option>
                      <option>Esposo/a</option>
                      <option>Amigo/a</option>
                    </CFormSelect>
                  </CCol>
                </div>
                <div class="col-6 border p-3">
                  <h3>Informaci&oacute;n m&eacute;dica del empleado</h3>
                  <hr />

                  <CCol>
                    <CFormLabel for="tipoSangreId">Tipo Sangre</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.tipoSangreId" id="tipoSangreId">
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="sangre in this.tipoSangre" :key="sangre.id" :value="sangre.id">
                        {{ sangre.nombre }}
                      </option>
                    </CFormSelect>
                  </CCol>

                  <CCol>
                    <CFormLabel for="tipoSangreId">Al&eacute;rgico</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.emergenciaAlergico" id="emergenciaAlergico">
                      <option value="" disabled selected>Seleccione</option>
                      <option>Si</option>
                      <option>No</option>
                    </CFormSelect>
                  </CCol>

                  <CCol>
                    <CFormLabel for="tipoSangreId">Diab&eacute;tico</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.emergenciaDiabetico" id="emergenciaDiabetico">
                      <option value="" disabled selected>Seleccione</option>
                      <option>Si</option>
                      <option>No</option>
                    </CFormSelect>
                  </CCol>
                  <CCol>
                    <CFormLabel for="tipoSangreId">Insulino Dependiente</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.emergenciaInsodepend"
                      id="emergenciaInsodepend">
                      <option value="" disabled selected>Seleccione</option>
                      <option>Si</option>
                      <option>No</option>
                    </CFormSelect>
                  </CCol>

                  <CCol>
                    <CFormLabel for="presión">Nivel de presi&oacute;n</CFormLabel>
                    <CFormSelect :disabled="isNomina" id="emergenciaPresionAlta"
                      v-model="postEmpleado.emergenciaPresionAlta">
                      <option value="" disabled selected>Seleccione</option>
                      <option>Normal</option>
                      <option>Alta</option>
                      <option>Baja</option>
                    </CFormSelect>
                  </CCol>

                  <CCol>
                    <CFormLabel for="emergenciaParentezco">En tratamiento</CFormLabel>
                    <CFormSelect :disabled="isNomina" v-model="postEmpleado.emergenciaEnTratamiento"
                      id="emergenciaEnTratamiento">
                      <option value="" disabled selected>Seleccione</option>
                      <option>Si</option>
                      <option>No</option>
                    </CFormSelect>
                  </CCol>
                  <h3>Intervención quir&uacute;rgica(m&aacute;s reciente)</h3>

                  <CCol>
                    <CFormLabel for="diagnostico">Detalle diagnostico</CFormLabel>
                    <CFormTextarea :disabled="isNomina" v-model="postEmpleado.emergenciaDiagnostico" id="diagnostico" />
                  </CCol>
                </div>
              </div>
            </CTabPane>

            <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 5">
              <div class="row">
                <CCol :md="12">
                  <div class="row">
                    <CCol :md="6">
                      <CFormLabel for="nivelEscolar">Nivel Escolar</CFormLabel>
                      <CFormSelect :disabled="isNomina" @change="validateNivelEscolar($event)"
                        v-model="postEmpleado.nivelEscolar" id="nivelEscolar">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="nivelEscolar in this.nivelEscolarList" :key="nivelEscolar.id"
                          :value="nivelEscolar.id">
                          {{ nivelEscolar.configValue }}
                        </option>
                      </CFormSelect>
                    </CCol>
                    <CCol :md="6">
                      <CFormLabel for="areaTematica">&Aacute;rea Tem&aacute;tica</CFormLabel>
                      <CFormSelect :disabled="areaTematicaField || isNomina" v-model="postEmpleado.areaTematica"
                        id="areaTematica">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="areaTematica in this.areaTematicaList" :key="areaTematica.id"
                          :value="areaTematica.id">
                          {{ areaTematica.configValue }}
                        </option>
                      </CFormSelect>
                    </CCol>
                  </div>
                  <CCol :md="12">
                    <CFormLabel for="tituloObtenido">T&iacute;tulo Obtenido</CFormLabel>
                    <CFormInput :disabled="tituloField || isNomina" v-model="postEmpleado.tituloObtenido"
                      id="tituloObtenido" />
                  </CCol>

                  <CCol :md="12">
                    <div class="row">
                      <CCol :md="6">
                        <CFormLabel for="correo1">Correo Electr&oacute;nico 1</CFormLabel>
                        <CFormInput :disabled="isNomina" id="correo1" v-model="postEmpleado.correoElectronico"
                          pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" :maxlength="40" />
                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="correo1">Correo Electr&oacute;nico 2</CFormLabel>
                        <CFormInput :disabled="isNomina" id="correo2" v-model="postEmpleado.correoElectronico2"
                          pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" :maxlength="40" />
                      </CCol>
                    </div>
                  </CCol>
                </CCol>
              </div>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 6">
              <div>
                <div class="row">
                  <div class="col-6">
                    <CSmartTable clickableRows :tableProps="{
                      striped: true,
                      hover: true,
                    }" :tableHeadProps="{}" :activePage="1" header :items="dataConfiguracionNominaIngresos"
                      :columns="tableConfiguracionNominaIngresos" :sorterValue="{ column: 'status', state: 'asc' }"
                      pagination>
                      <template #checked="{ item }">
                        <td>
                          <div class="row">
                            <div class="col-7">
                              <CFormCheck :disabled="!item.esNovedad" :checked="item.checked || item.monto > 0"
                                v-model="item.checked" name="flexRadioDefault" id="flexRadioDefault1" />
                              {{ item.nombre }}
                            </div>
                            <div class="col-5">
                              <CurrencyInput id="sueldo" :disabled="!item.esNovedad" v-model="item.monto" class="text-end"
                                :options="{
                                  locale: 'en-US',
                                  currency: 'DOP',
                                  precision: 2,
                                  currencyDisplay: 'hidden',
                                }" />
                            </div>
                          </div>
                        </td>
                      </template>
                    </CSmartTable>
                  </div>

                  <div class="col-6">
                    <CSmartTable clickableRows :tableProps="{
                      striped: true,
                      hover: true,
                    }" :tableHeadProps="{}" :activePage="1" header :items="dataConfiguracionNomina"
                      :columns="tableConfiguracionNominaRetencion" :sorterValue="{ column: 'status', state: 'asc' }"
                      pagination>

                      <template #checked="{ item }">
                        <td>
                          <div class="row">
                            <div class="col-7">
                              <CFormCheck :disabled="item.isLey" :checked="item.checked || item.monto > 0"
                                v-model="item.checked" name="flexRadioDefault" id="flexRadioDefault1" />
                              {{ item.nombre }}
                            </div>
                            <div class="col-5">
                              <CurrencyInput id="sueldo" class="text-end " :disabled="item.isLey" v-model="item.monto"
                                :options="{
                                  locale: 'en-US',
                                  currency: 'DOP',
                                  precision: 2,
                                  currencyDisplay: 'hidden',
                                }" />
                            </div>
                          </div>
                        </td>
                      </template>
                    </CSmartTable>
                  </div>
                </div>
              </div>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 7">
              <div class="container mt-4">
                <div class="row">
                  <div class="col-3"></div>
                  <div class="col-6">
                    <h2 class="text-center mb-4">Listado de Sueldos</h2>
                    <ul class="list-group">
                      <li v-for="datosSueldo in pagoNominas"
                        class="list-group-item d-flex justify-content-between align-items-center">
                        <span>{{ datosSueldo.month }}</span>
                        <span>Sueldo: <b>{{ formatPrice(datosSueldo.sueldo) }}</b> </span>
                      </li>
                    </ul>
                  </div>
                  <div class="col-3"></div>
                </div>
              </div>
            </CTabPane>
          </CTabContent>
        </div>
      </CModalBody>
    </CForm>
    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">Cerrar</CButton>
      <CButton color="info" @click="sendData">Guardar</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import moment from 'moment'
import Api from '../../services/RegistroPersonalServices'
import apiSectores from '../../../../financiero/NominaModule/services/NominaServices'
import configuraciones from '@/utils/configuraciones'
import { onlyLetter, onlyNumber, calculateAge, } from '@/utils/validator'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { useToastStore } from '@/store/toast'
import { mapActions, mapStores } from 'pinia'
import { CCol } from '@coreui/vue-pro'
import CurrencyInput from '@/utils/CurrencyInput.vue'
import { formatPrice } from '@/utils/format'
import AppDateField from '@/components/AppDateField.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  name: 'RegistroPersonalDialog',
  components: {
    CModal,
    moment,
    vSelect,
    CCol,
    CurrencyInput,
    CSmartTable,
    AppDateField
  },
  emits: ['close-modal', 'post-personal'],
  data: function () {
    const currentDate = new Date()
    currentDate.setFullYear(currentDate.getFullYear() - 19)

    return {
      formatPrice,
      dataConfiguracionNominaIngresos: [],
      dataConfiguracionNomina: [],
      isLowerSelectedInitDate: false,
      areaTematicaField: true,
      tituloField: true,
      isFormEventTypeValidated: false,
      onlyNumber,
      calculateAge,
      onlyLetter,
      profilePhoto: null,
      imageUrl: null,
      discapacidadList: [],
      departamentoList: [],
      nivelEscolarList: [],
      areaTematicaList: [],
      posicionCargo: [],
      grupoOcupacion: [],
      tipoSangre: [],
      registroEmpleadoId: null,
      areaTrabajo: [],
      programaDivision: [],
      sector: [],
      cedulaMax: 11,
      tabPaneActiveKey: 1,
      postEmpleado: {
        codigo: null,
        nombre: null,
        apellido: null,
        tipoDocumento: 'cedula',
        codigoIdentidad: null,
        direccion: null,
        sectorId: '',
        telefono: null,
        celular: null,
        fechaNacimiento: currentDate,
        lugarNacimiento: null,
        estadoCivil: '',
        sexo: '',
        dependientes: 0,
        fechaIngreso: null,
        fechaSalida: '1970-01-01T00:00:00',
        razonSalida: null,
        reemplear: true,
        fechaReingreso: '1970-01-01T00:00:00',
        programaDivisionId: 0,
        departamentoId: 0,
        areaTrabajoId: 0,
        posicionId: 0,
        grupoOcupacional: null,
        tipoContrato: 'Fijo',
        fechaInicioContrato: '1970-01-01T00:00:00',
        fechaFinContrato: '1970-01-01T00:00:00',
        turno: 'DIURNO',
        periodoPago: 'MENSUAL',
        formaPago: 'CHEQUE',
        numeroCuenta: null,
        fechaExpitaTarjeta: '1970-01-01T00:00:00',
        estatus: true,
        sueldo: 0.0,
        sueldoAnterior: 0.0,
        fechaSueldoAnterior: '1970-01-01T00:00:00',
        fechaUltimaNomina: '1970-01-01T00:00:00',
        inicioVacaciones: '1970-01-01T00:00:00',
        finVacaciones: '1970-01-01T00:00:00',
        activoNomina: true,
        retencionList: [],
        ingresoList: [],
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
        discapacidad: '30',
        emergenciaNombre: null,
        emergenciaTelefono: null,
        emergenciaTelefono2: null,
        emergenciaDireccion: null,
        emergenciaParentezco: null,
        tipoSangreId: 0,
        emergenciaAlergico: '',
        emergenciaDiabetico: '',
        emergenciaInsodepend: '',
        emergenciaPresionAlta: null,
        emergenciaPresionBaja: null,
        emergenciaEnTratamiento: '',
        emergenciaDiagnostico: null,
        licenciaConducir: null,
        fechaExpiracionLicencia: '1970-01-01T00:00:00',
        aplicaSasp: true,
        nivelEscolar: '8',
        areaTematica: null,
        tituloObtenido: null,
        correoElectronico: null,
        correoElectronico2: null,
        recomendadoPor: null,
        idImagenPerfil: undefined,
        estaEnNomina: false,
      },
      ingresoEmpleados: [],
      retencionesEmpleados: [],

      tableConfiguracionNominaRetencion: [
        {
          key: 'checked',
          label: 'Retenciones',
          _style: { width: '100%' },
        },
      ],

      tableConfiguracionNominaIngresos: [
        {
          key: 'checked',
          label: 'Ingresos',
          _style: { width: '100%' },
        },
      ],

      pagoNominas: []
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    async getAllRetenciones() {
      const [configuracionNomina, retencionesEmpleado, ingresosEmpleado] = await Promise.all([
        Api.getConfiguracionNomina().then(resp => resp.data.data),
        Api.getRentencionesByEmpleado(this.empleado?.id ?? 0).then(resp => resp.data.data),
        Api.getIngresosByEmpleado(this.empleado?.id ?? 0).then(resp => resp.data.data)
      ]);
      this.dataConfiguracionNomina = configuracionNomina.retencion.map((data) => {
        const retencionEmpleado = retencionesEmpleado.find((re) => re.retencion.id === data.id)
        return ({
          id: 0,
          checked: Boolean(retencionEmpleado) || data.categoriaRetencion === 'LEY',
          isLey: data.categoriaRetencion === 'LEY',
          monto: retencionEmpleado?.montoFijo ?? data.monto,
          esFijo: retencionEmpleado?.esFijo || data.esPorcentage,
          nombre: data.nombre,
          retencionId: Boolean(data.id) ? data.id : 0
        });
      });
      this.dataConfiguracionNominaIngresos = configuracionNomina.tipoIngreso.map((data) => {
        const ingresoEmpleado = ingresosEmpleado.find((re) => re.tipoIngreso.id === data.id)
        return ({
          id: 0,
          checked: !data.esNovedad,
          esNovedad: data.esNovedad,
          monto: ingresoEmpleado?.monto ?? 0,
          nombre: data.nombre,
          tipoIngresoId: Boolean(data.id) ? data.id : 0
        });
      });
      this.dataConfiguracionNominaIngresos.unshift(
        {
          id: 0,
          opcional: true,
          checked: true,
          esNovedad: false,
          monto: this.empleado.sueldo,
          nombre: 'Sueldo',
        }
      )
    },

    getPagoNomina() {
      Api.getIngresosByPagosnomina(this.empleado.id).then((response) => {
        this.pagoNominas = response.data.data.map((data) => {
          return {
            month: data.month,
            sueldo: data.finalAcount
          }
        })
      })
    },

    validarFechaDesde() {
      const fechaDesde = new Date(this.postEmpleado.fechaIngreso)
      fechaDesde.setHours(0, 0, 0, 0)
      const fechaActual = new Date()
      fechaActual.setHours(0, 0, 0, 0)
      if (fechaDesde > fechaActual) {
        this.isLowerSelectedInitDate = true
      } else {
        this.isLowerSelectedInitDate = false
      }
    },
    sendData() {
      this.isFormEventTypeValidated = false
      if (this.isNomina && this.postEmpleado.estaEnNomina == false) {
        Swal.fire({
          title: 'El empleado no esta en nómina, desea activarlo?',
          showDenyButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.postEmpleado.estaEnNomina = true
            this.confirmData()
          } else if (result.isDenied) {
            this.postEmpleado.estaEnNomina = false
            this.confirmData()
          }
        })
        return
      }
      this.confirmData()
    },

    confirmData() {
      if (
        this.$refs.employeeForm.$el.checkValidity() &&
        this.isEmployeeAdult &&
        !this.isLowerSelectedInitDate
      ) {
        return this.saveRegistroPersonal()
      }
      this.isFormEventTypeValidated = true
      this.show({
        content:
          'Informaci&oacute;n incorrecta. Por favor revisar la informaci&oacute;n del formulario',
        closable: true,
        color: 'danger',
        class: 'text-white',
      })
    },

    saveFile(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        this.profilePhoto = file
        reader.onload = (evt) => {
          this.imageUrl = evt.target.result
        }
        reader.readAsDataURL(file)
      }
    },

    checkDocument(e) {
      if (this.postEmpleado.tipoDocumento === 'cedula') {
        this.cedulaMax = 11
        return onlyNumber(e)
      }
    },

    changeDocument() {
      this.cedulaMax = this.postEmpleado.tipoDocumento === 'cedula' ? 11 : 15
    },

    getListDepartamento(event) {
      if (!event.target.value) {
        return
      }
      Api.listDepartamento(event.target.value).then(({ data: { data } }) => {
        this.departamentoList = data.map((elem) => ({
          code: elem.id,
          label: `(${elem.id})  ${elem.nombre}`,
        }))
        this.departamentoList.unshift({
          code: '',
          label: 'Seleccione',
        })
      })
    },

    validateNivelEscolar(event) {
      const educationLevels = [8, 9, 10, 11, 12]
      this.areaTematicaField = false
      this.tituloField = false
      if (educationLevels.includes(Number(event.target.value))) {
        this.areaTematicaField = true
        this.tituloField = true
      }
    },

    cargaInformacionRequerida() {
      configuraciones
        .getGroupConfiguration(configuraciones.grupos.Ocupacion)
        .then((response) => {
          this.grupoOcupacion = response.data.data
        })

      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
      })

      Api.getPosicion().then((response) => {
        this.posicionCargo = response.data.data
      })

      Api.getAreaTrabajo().then((response) => {
        this.areaTrabajo = response.data.data
      })

      apiSectores.getSectores().then((response) => {
        this.sector = response.data.data
      })

      Api.tipoSangreList().then((response) => {
        this.tipoSangre = response.data.data
      })

      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
      })
      configuraciones
        .getGroupConfiguration(configuraciones.grupos.Discapacidad)
        .then((response) => {
          this.discapacidadList = response.data.data
        })
      configuraciones
        .getGroupConfiguration(configuraciones.grupos.nivelEscolar)
        .then((response) => {
          this.nivelEscolarList = response.data.data
        })
      configuraciones
        .getGroupConfiguration(configuraciones.grupos.areaTematica)
        .then((response) => {
          this.areaTematicaList = response.data.data
        })
    },

    saveRegistroPersonal() {
      if (!this.postEmpleado.idImagenPerfil) {
        delete this.postEmpleado.idImagenPerfil
      }
      if (!this.postEmpleado.tipoSangreId) {
        delete this.postEmpleado.tipoSangreId
      }

      if (!this.postEmpleado.diasTrabajado) {
        delete this.postEmpleado.diasTrabajado
      }

      this.$emit('post-personal', {
        payload: {
          ...this.postEmpleado,
          retencionList: this.dataConfiguracionNomina.filter(x => x.checked),
          ingresoList: this.dataConfiguracionNominaIngresos.filter(x => x.checked && !x.opcional)
        },
        profilePhoto: this.profilePhoto,
      })
    },

    closeModal() {
      this.$emit('close-modal')
    },

    clearModal() {
      this.isLowerSelectedInitDate = false
      const currentDate = new Date()
      currentDate.setFullYear(currentDate.getFullYear() - 19)
      this.tabPaneActiveKey = 1
      this.postEmpleado = {
        codigo: null,
        nombre: null,
        apellido: null,
        tipoDocumento: 'cedula',
        codigoIdentidad: null,
        direccion: null,
        sectorId: '',
        telefono: null,
        celular: null,
        fechaNacimiento: currentDate,
        lugarNacimiento: null,
        estadoCivil: '',
        sexo: '',
        dependientes: 0,
        fechaIngreso: null,
        fechaSalida: '1970-01-01T00:00:00',
        razonSalida: null,
        reemplear: true,
        fechaReingreso: '1970-01-01T00:00:00',
        programaDivisionId: 0,
        departamentoId: 0,
        areaTrabajoId: 0,
        posicionId: 0,
        grupoOcupacional: null,
        tipoContrato: 'Fijo',
        fechaInicioContrato: '1970-01-01T00:00:00',
        fechaFinContrato: '1970-01-01T00:00:00',
        turno: 'DIURNO',
        periodoPago: 'MENSUAL',
        formaPago: 'CHEQUE',
        numeroCuenta: null,
        fechaExpitaTarjeta: '1970-01-01T00:00:00',
        estatus: true,
        sueldo: 0.0,
        sueldoAnterior: 0.0,
        fechaSueldoAnterior: '1970-01-01T00:00:00',
        fechaUltimaNomina: '1970-01-01T00:00:00',
        inicioVacaciones: '1970-01-01T00:00:00',
        finVacaciones: '1970-01-01T00:00:00',
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
        discapacidad: '30',
        emergenciaNombre: null,
        emergenciaTelefono: null,
        emergenciaTelefono2: null,
        emergenciaDireccion: null,
        emergenciaParentezco: null,
        tipoSangreId: 0,
        emergenciaAlergico: '',
        emergenciaDiabetico: '',
        emergenciaInsodepend: '',
        emergenciaPresionAlta: null,
        emergenciaPresionBaja: null,
        emergenciaEnTratamiento: '',
        emergenciaDiagnostico: null,
        licenciaConducir: null,
        fechaExpiracionLicencia: '1970-01-01T00:00:00',
        aplicaSasp: true,
        nivelEscolar: '8',
        areaTematica: null,
        tituloObtenido: null,
        correoElectronico: null,
        correoElectronico2: null,
        recomendadoPor: null,
        idImagenPerfil: undefined,
      }
    },

    validateDate(event) {
      if (new Date(event.target.value) > null) {
        return true
      }
    },
    loadData() {
      this.clearModal()
      if (Object.keys(this.empleado).length && this.showModal) {
        this.postEmpleado = { ...this.empleado }
        this.imageUrl = this.empleado.idImagenPerfil
          ? `${process.env.VUE_APP_API_URL}/api/files/public/${this.empleado.idImagenPerfil ?? -1
          }`
          : ''

        if (this.empleado.programaDivisionId) {
          this.getListDepartamento({
            target: {
              value: this.empleado.programaDivisionId,
            },
          })
        }
      }
    },
  },

  mounted() {
    this.cargaInformacionRequerida()
    this.getAllRetenciones()
  },

  computed: {
    ...mapStores(useToastStore),

    selectedDepartamento: {
      get() {
        return this.departamentoList.find(
          (x) => x.code === this.postEmpleado.departamentoId,
        )
      },
      set(util) {
        this.postEmpleado.departamentoId = Number(util.code)
      },
    },

    isEmployeeAdult() {
      return this.calculateAge(this.postEmpleado.fechaNacimiento) >= 18
    },
  },

  watch: {
    'postEmpleado.sueldo'(value) {
      this.dataConfiguracionNominaIngresos.forEach(x => {
        if (!x.esNovedad && x.nombre === 'Sueldo') {
          x.monto = value
        }
      });

      this.dataConfiguracionNominaIngresos = [...this.dataConfiguracionNominaIngresos]
    },

    empleado(newData) {
      this.getAllRetenciones()
      this.getPagoNomina()
      if (newData) {
        this.loadData()

      }

    },
    showModal(newData) {
      if (newData) {
        this.loadData()
      }
    },
  },

  props: {
    showModal: Boolean,
    isNomina: {
      type: Boolean,
      default: false,
    },
    empleado: Object,
  },
}
</script>
<style>
.formcheck {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 2px;
}

.formcheck label {
  margin: 0;
}

input::file-selector-button {
  font-weight: bold;
  color: black;
  padding: 0.5em;
  border: thin solid grey;
  border-radius: 6px;
}

input[type='file']:focus+label {
  outline: 2px solid;
  /* example focus style */
}

.input-wrapper {
  opacity: 0;
  font-size: 12px;
  border: 1px solid rgb(0, 0, 0);
  padding: 4px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}

.upload-label {
  text-shadow: 0 0 1px black;
}
</style>
