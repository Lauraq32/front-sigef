<template>
  <CModal size="xl" :visible="showModal" @close="closeModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Formulario de empleados</CModalTitle>
    </CModalHeader>

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
              Observación
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
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
            <div class="row">
              <div class="col-5 border p-3">
                <h3>Datos generales</h3>
                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="codigo">C&oacute;digo de Empleado</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormInput ref="name" type="text" class="form-control" v-model="postEmpleado.codigo" id="codigo" :maxlength="9"/>
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="tipoDocumento">Tipo de documento</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormSelect v-model="postEmpleado.tipoDocumento" v-on:change="changeDocument()"
                        id="validationCtipoDocumentoustom05">
                        <option disabled selected value="">Seleccionar</option>
                        <option value="cedula">C&eacute;dula</option>
                        <option value="pasaporte">Pasaporte</option>
                      </CFormSelect>
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="codigoIdentidad">Documento</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormInput v-model="postEmpleado.codigoIdentidad" :maxlength="cedulaMax" id="codigoIdentidad"
                        v-on:keypress="checkDocument($event)" required />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="nombres">Nombre</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormInput v-model="postEmpleado.nombres" id="nombres" required />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="apellidos">Apellidos</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormInput v-model="postEmpleado.apellidos" id="apellidos" />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="direccion">Dirección</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormInput v-model="postEmpleado.direccion" id="direccion" required />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="sectorId">Sectores</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormSelect v-model="postEmpleado.sectorId" id="sectorId">
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
                      <CFormInput v-model="postEmpleado.telefono" id="telefono" type="number" required />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="estadoCivil">Estado civil</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormSelect v-model="postEmpleado.estadoCivil" id="estadoCivil" aria-placeholder="Estado">
                        <option disabled selected value="">Seleccionar</option>
                        <option>Soltero/a</option>
                        <option>Casado/a</option>
                      </CFormSelect>

                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="fechaNacimiento">Fecha nacimiento</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormInput v-model="postEmpleado.fechaNacimiento" type="date" id="fechaNacimiento"
                        @change="validateAge($event)" />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="lugarNacimiento">Lugar nacimiento</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormInput v-model="postEmpleado.lugarNacimiento" id="lugarNacimiento" required
                        v-on:keypress="onlyLetter($event)" />
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="sexo">Sexo</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormSelect v-model="postEmpleado.sexo" id="sexo">
                        <option disabled selected value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </CFormSelect>
                    </CCol>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="dependientes">Dependientes</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormInput v-model="postEmpleado.dependientes" type="number" id="dependientes" required />
                    </CCol>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-3">
                    <CFormLabel for="discapacidad">Discapacidades</CFormLabel>
                  </div>
                  <div class="col-9">
                    <CCol :md="12">
                      <CFormSelect v-model="postEmpleado.discapacidad" id="discapacidad">
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="discapacidad in this.discapacidadList" :key="discapacidad.id"
                          :value="discapacidad.id">
                          {{ discapacidad.configValue }}
                        </option>
                      </CFormSelect>

                    </CCol>
                  </div>
                </div>
              </div>
              <div class="col-4 border p-3">
                <h3>Datos laborales</h3>
                <CCol :md="12">
                  <CFormLabel for="fechaIngreso">Fecha ingreso</CFormLabel>
                  <CFormInput v-model="postEmpleado.fechaIngreso" type="date" id="fechaIngreso" />


                </CCol>
                <CCol :md="12">
                  <CFormLabel for="Recomendado">Recomendado por</CFormLabel>
                  <CFormInput type="text" id="Recomendado" v-on:keypress="onlyLetter($event)" />

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="programaDivisionId">Dirección o dependencia</CFormLabel>
                  <CFormSelect v-model="postEmpleado.programaDivisionId" id="programaDivisionId">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="programa in this.programaDivision" :key="programa.id" :value="programa.id">
                      {{ programa.nombre }}
                    </option>
                  </CFormSelect>

                </CCol>





                <CCol>
                  <CFormLabel for="departamentoId">Departamento</CFormLabel>
                  <CFormSelect v-model="postEmpleado.departamentoId" id="departamentoId">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="departamento in departamentoList" :key="departamento.id" :value="departamento.id">
                      {{ departamento.nombre }}
                    </option>
                  </CFormSelect>

                </CCol>

                <CCol :md="12">
                  <CFormLabel for="areaTrabajoId">Área de trabajo</CFormLabel>
                  <CFormSelect v-model="postEmpleado.areaTrabajoId" id="areaTrabajoId">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="area in this.areaTrabajo" :key="area.id" :value="area.id">
                      {{ area.descripcion }}
                    </option>
                  </CFormSelect>

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="posicionId">Cargos</CFormLabel>
                  <CFormSelect v-model="postEmpleado.posicionId" id="posicionId">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="cargo in this.posicionCargo" :key="cargo.id" :value="cargo.id">
                      {{ cargo.nombre }}
                    </option>
                  </CFormSelect>
                </CCol>



                <div class="row">
                  <CCol :md="6">
                    <CFormLabel for="tipoContrato">Tipo de contrato</CFormLabel>
                    <CFormSelect v-model="postEmpleado.tipoContrato" id="tipoContrato">
                      <option disabled selected value="">Seleccionar</option>
                      <option>Tipo de contrato 1</option>
                      <option>Tipo de contrato 2</option>
                    </CFormSelect>

                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="turno">Turno</CFormLabel>
                    <CFormSelect v-model="postEmpleado.turno" id="turno">
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
                    <CFormSelect v-model="postEmpleado.periodoPago" id="periodoPago">
                      <option disabled selected value="">Seleccionar</option>
                      <option>MENSUAL</option>
                      <option>QUINCENAL</option>
                    </CFormSelect>

                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="formaPago">Tipo de pago</CFormLabel>
                    <CFormSelect v-model="postEmpleado.formaPago" id="formaPago">
                      <option disabled selected value="">Seleccionar</option>
                      <option>BANCO</option>
                      <option>CHEQUE</option>
                    </CFormSelect>
                  </CCol>
                </div>

                <CCol :md="12">
                  <CFormLabel for="sueldo">Sueldo actual</CFormLabel>
                  <CFormInput type="number" v-model="postEmpleado.sueldo" id="sueldo" required />

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
                  <CFormLabel for="licenciaConducir">Licencia de conducir</CFormLabel>
                  <CFormInput v-model="postEmpleado.licenciaConducir" type="date" id="licenciaConducir" />

                </CCol>
                <CCol>
                  <CFormLabel for="fechaExpiracionLicencia">Fecha expiraci&oacute;n licencia de conducir</CFormLabel>
                  <CFormInput v-model="postEmpleado.fechaExpiracionLicencia" type="date" id="fechaExpiracionLicencia" />

                </CCol>
                <CCol>
                  <CFormLabel for="fechaExpitaTarjeta">Fecha expira tarjeta del banco:</CFormLabel>
                  <CFormInput v-model="postEmpleado.fechaExpitaTarjeta" type="date" id="fechaExpitaTarjeta" />
                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Otros</h3>
                <CCol>
                  <CFormLabel for="emergenciaTelefono">Otros</CFormLabel>
                  <CFormInput id="emergenciaTelefono" type="text" required />
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
                  <CFormLabel for="emergenciaNombre">Nombres</CFormLabel>

                  <CFormInput v-model="postEmpleado.emergenciaNombre" id="emergenciaNombre" />
                </CCol>
                <CCol>
                  <CFormLabel for="emergenciaTelefono">Tel&eacute;fono</CFormLabel>
                  <CFormInput v-model="postEmpleado.emergenciaTelefono" id="emergenciaTelefono" type="number" required />

                </CCol>
                <CCol>
                  <CFormLabel for="emergenciaDireccion">Dirección</CFormLabel>
                  <CFormInput v-model="postEmpleado.emergenciaDireccion" id="emergenciaDireccion" />

                </CCol>
                <CCol>
                  <CFormLabel for="emergenciaParentezco">Parentezco</CFormLabel>
                  <CFormSelect v-model="postEmpleado.emergenciaParentezco" id="emergenciaParentezco">
                    <option value="" disabled selected>Seleccione</option>
                    <option>Padre</option>
                    <option>Madre</option>
                    <option>Hermano/a</option>
                    <option>Esposo/a</option>
                    <option>Amigo/a</option>
                  </CFormSelect>

                </CCol>

              </div>
              <div class="col-4 border p-3">
                <h3>Informaci&oacute;n m&eacute;dica del empleado</h3>
                <hr />

                <CCol>
                  <CFormLabel for="tipoSangreId">Tipo Sangre</CFormLabel>
                  <CFormSelect v-model="postEmpleado.tipoSangreId" id="tipoSangreId">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="sangre in this.tipoSangre" :key="sangre.id" :value="sangre.id">
                      {{ sangre.nombre }}
                    </option>
                  </CFormSelect>
                </CCol>



                <CCol>
                  <CFormLabel for="tipoSangreId">Al&eacute;rgico</CFormLabel>
                  <CFormSelect v-model="postEmpleado.emergenciaAlergico" id="emergenciaAlergico">
                    <option value="" disabled selected>Seleccione</option>
                    <option>
                      Si
                    </option>
                    <option>
                      No
                    </option>
                  </CFormSelect>
                </CCol>

                <CCol>
                  <CFormLabel for="tipoSangreId">Diab&eacute;tico</CFormLabel>
                  <CFormSelect v-model="postEmpleado.emergenciaDiabetico" id="emergenciaDiabetico">
                    <option value="" disabled selected>Seleccione</option>
                    <option>
                      Si
                    </option>
                    <option>
                      No
                    </option>
                  </CFormSelect>
                </CCol>

                <CCol>
                  <CFormLabel for="presión">Nivel de presi&oacute;n</CFormLabel>
                  <CFormSelect id="emergenciaPresionAlta" v-model="postEmpleado.emergenciaPresionAlta">
                    <option value="" disabled selected>Seleccione</option>
                    <option>Normal</option>
                    <option>Alta</option>
                    <option>Baja</option>
                  </CFormSelect>

                </CCol>


                <CCol>
                  <CFormLabel for="emergenciaParentezco">En tratamiento</CFormLabel>
                  <CFormSelect v-model="postEmpleado.emergenciaEnTratamiento" id="emergenciaEnTratamiento">
                    <option value="" disabled selected>Seleccione</option>
                    <option>Si</option>
                    <option>No</option>

                  </CFormSelect>



                </CCol>
                <h3>Intervención quir&uacute;rgica(m&aacute;s reciente)</h3>

                <CCol>
                  <CFormLabel for="diagnostico">Detalle diagnostico</CFormLabel>
                  <CFormTextarea id="diagnostico" required />

                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Inf sobre el movimiento del registro</h3>
                <hr />
                <CCol>
                  <CFormLabel for="FechaAdiciona">Fecha adiciona</CFormLabel>
                  <CFormInput type="date" id="FechaAdiciona" />

                </CCol>

                <CCol>
                  <CFormLabel for="usuario">Usuario modifica</CFormLabel>
                  <CFormInput id="usuario" required />

                </CCol>
                <CCol>
                  <CFormLabel for="valorAnterior">Valores anteriores</CFormLabel>
                  <CFormInput id="valorAnterior" required />

                </CCol>


              </div>
            </div>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 5">
            <div class="row">
              <CCol :md="8">


                <CCol :md="6">
                  <CFormLabel for="nivelEscolar">Nivel Escolar</CFormLabel>
                  <CFormSelect v-model="postEmpleado.nivelEscolar" id="nivelEscolar">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="nivelEscolar in this.nivelEscolarList" :key="nivelEscolar.id" :value="nivelEscolar.id">
                      {{ nivelEscolar.configValue }}
                    </option>
                  </CFormSelect>

                </CCol>
                <CCol :md="6">
                  <CFormLabel for="areaTematica">&Aacute;rea Tem&aacute;tica</CFormLabel>
                  <CFormSelect id="areaTematica">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="areaTematica in this.areaTematicaList" :key="areaTematica.id" :value="areaTematica.id">
                      {{ areaTematica.configValue }}
                    </option>
                  </CFormSelect>

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="tituloObtenido">T&iacute;tulo Obtenido</CFormLabel>
                  <CFormInput id="tituloObtenido" required />

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="correo1">Correo Electr&oacute;nico 1 y 2</CFormLabel>
                  <CFormInput id="correo1" v-model="postEmpleado.correoElectronico" required />

                </CCol>
                <CCol class="mt-2">
                  <CFormInput id="correo2" v-model="postEmpleado.correoElectronico2" required />

                </CCol>
                <h5>Datos de Evaluaci&oacute;n de Desempe&ntilde;o</h5>
                <CCol :md="12">
                  <CFormLabel for="FechaInicial">Fecha Inicial Evaluaci&oacute;n</CFormLabel>
                  <CFormInput id="FechaInicial" type="date" required />

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="fechaFinal">Fecha Final Evaluaci&oacute;n</CFormLabel>
                  <CFormInput id="fechaFinal" type="date" required />

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="notaFinal">Nota Final</CFormLabel>
                  <CFormInput id="notaFinal" required />

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
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
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
import Api from '../../services/RegistroPersonalServices'
import apiSectores from '../../../../financiero/NominaModule/services/NominaServices'
import configuraciones from '@/utils/configuraciones'
import {onlyLetter,onlyNumber } from '@/utils/validator'
export default {
  name: 'RegistroPersonalDialog',
  components: {
    CModal,
    moment,
  },
  data: function () {
    return {
      discapacidadList: [],
      departamentoList: [],
      nivelEscolarList: [],
      areaTematicaList: [],
      posicionCargo: [],
      tipoSangre: [],
      registroEmpleadoId: null,
      areaTrabajo: [],
      programaDivision: [],
      sector: [],
      cedulaMax: null,
      tabPaneActiveKey: 1,
      postEmpleado: {
        codigo: null,
        nombres: null,
        apellidos: null,
        tipoDocumento: '',
        codigoIdentidad: null,
        direccion: null,
        sectorId: '',
        telefono: null,
        celular: null,
        fechaNacimiento: new Date(Date.now()),
        lugarNacimiento: null,
        estadoCivil: '',
        sexo: '',
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
        emergenciaAlergico: '',
        emergenciaDiabetico: '',
        emergenciaInsodepend: 'st',
        emergenciaPresionAlta: null,
        emergenciaPresionBaja: null,
        emergenciaEnTratamiento: 'Si',
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

  methods: {
    checkDocument(e) {
      if (this.postEmpleado.tipoDocumento === 'cedula') {
        onlyNumber(e)
        this.cedulaMax = 11
      }
    },
    changeDocument() {
      this.postEmpleado.codigoIdentidad = null
      this.cedulaMax = null
    },

    cargaInformacionRequerida() {
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
      configuraciones.getGroupConfiguration(configuraciones.grupos.Discapacidad).then(response => {
        this.discapacidadList = response.data.data

      })
      configuraciones.getGroupConfiguration(configuraciones.grupos.nivelEscolar).then(response => {
        this.nivelEscolarList = response.data.data

      })
      configuraciones.getGroupConfiguration(configuraciones.grupos.areaTematica).then(response => {
        this.areaTematicaList = response.data.data

      })
      Api.listDepartamento().then(response => {
        this.departamentoList = response.data.data

      })
    },
    saveRegistroPersonal() {
      this.$emit('post-personal', {
        ...this.postEmpleado
      })
    },
    getRegistroPersonal(id) {
      Api.getEmpleadoByID(id).then((response) => {
        this.postEmpleado = { ...response.data.data }
      })
    },

    closeModal() {
      this.$emit('close-modal')
      this.clearModal()
    },
    clearModal() {
      this.empleadoId = null
      this.postEmpleado = {
        ayuntamientoId: this.$ayuntamientoId,
        codigo: null,
        nombres: null,
        apellidos: null,
        tipoDocumento: 'Cédula',
        codigoIdentidad: null,
        direccion: null,
        sectorId: 0,
        telefono: null,
        celular: null,
        fechaNacimiento: new Date(Date.now()),
        lugarNacimiento: null,
        estadoCivil: '',
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
        emergenciaAlergico: 'Si',
        emergenciaDiabetico: 'Si',
        emergenciaInsodepend: 'st',
        emergenciaPresionAlta: null,
        emergenciaPresionBaja: null,
        emergenciaEnTratamiento: 'Si',
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
    }

  },

  mounted() {
    this.cargaInformacionRequerida()
  },

  watch: {
    empleadoId(newId) {
      if (newId) {
        this.getRegistroPersonal(newId)
      }
    },
  },

  props: {
    showModal: Boolean,
    empleadoId: null
  }
}
</script>
