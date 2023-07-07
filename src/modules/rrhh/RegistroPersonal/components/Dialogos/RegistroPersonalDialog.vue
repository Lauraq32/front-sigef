<template>
  <CModal size="xl" :visible="showModal" @close="closeModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Formulario de empleados</CModalTitle>
    </CModalHeader>

    <CForm novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm" @submit="sendData">
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
                        <CFormInput required ref="name" type="text" class="form-control" v-model="postEmpleado.codigo"
                          id="codigo" :maxlength="9" />
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="tipoDocumento">Tipo de documento</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormSelect v-model="postEmpleado.tipoDocumento" v-on:change="changeDocument()" required
                          id="validationCtipoDocumentoustom05">
                          <option disabled selected value="">Seleccionar</option>
                          <option value="cedula">C&eacute;dula</option>
                          <option value="Pasaporte">Pasaporte</option>
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
                        <CFormInput required v-model="postEmpleado.apellidos" id="apellidos" />
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
                        <CFormSelect v-model="postEmpleado.sectorId" id="sectorId" required>
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
                        <CFormInput v-on:keypress="onlyNumber($event)" v-model="postEmpleado.telefono" id="telefono" maxlength="13"
                          type="text" required />
                      </CCol>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-3">
                      <CFormLabel for="estadoCivil">Estado civil</CFormLabel>
                    </div>
                    <div class="col-9">
                      <CCol :md="12">
                        <CFormSelect v-model="postEmpleado.estadoCivil" id="estadoCivil" aria-placeholder="Estado"
                          required>
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
                        <CFormInput v-model="fechaNacimiento" type="date" id="fechaNacimiento"
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
                        <CFormSelect v-model="postEmpleado.sexo" id="sexo" required>
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
                        <CFormSelect v-model="postEmpleado.discapacidad" id="discapacidad" required>
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
                    <CFormInput @change="validarFechaDesde" v-model="fechaIngreso" type="date" id="fechaIngreso"
                      required />
                    <CFormFeedback invalid :style="{ display: isLowerSelectedInitDate ? 'flex' : 'none' }">

                      La fecha no puede ser mayor a la fecha actual

                    </CFormFeedback>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="Recomendado">Recomendado por</CFormLabel>
                    <CFormInput v-model="postEmpleado.recomendadoPor" required type="text" id="Recomendado"
                      v-on:keypress="onlyLetter($event)" />
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="programaDivisionId">Dirección o dependencia</CFormLabel>
                    <CFormSelect v-model="postEmpleado.programaDivisionId" id="programaDivisionId"
                      @change="getListDepartamento($event)" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="programa in this.programaDivision" :key="programa.id" :value="programa.id">
                        {{ programa.nombre }}
                      </option>
                    </CFormSelect>
                  </CCol>
                  <CCol>
                    <CFormLabel for="departamentoId">Departamento</CFormLabel>
                    <v-select required id="validationCustom03" v-model="selectedDepartamento"
                      :options="departamentoList"></v-select>
                  </CCol>

                  <CCol :md="12">
                    <CFormLabel for="areaTrabajoId">Área de trabajo</CFormLabel>
                    <CFormSelect v-model="postEmpleado.areaTrabajoId" id="areaTrabajoId" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="area in this.areaTrabajo" :key="area.id" :value="area.id">
                        {{ area.descripcion }}
                      </option>
                    </CFormSelect>

                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="posicionId">Cargos</CFormLabel>
                    <CFormSelect v-model="postEmpleado.posicionId" id="posicionId" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="cargo in this.posicionCargo" :key="cargo.id" :value="cargo.id">
                        {{ cargo.nombre }}
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
                      <CFormSelect v-model="postEmpleado.turno" id="turno" required>
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
                    <CCol :md="12">
                      <CFormLabel for="formaPago">Tipo de pago</CFormLabel>
                      <CFormSelect required v-model="postEmpleado.formaPago" id="formaPago">
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

                <div class="col-3">
                  <div class="position-relative flex justify-content-center border-2 border-dark" style="height: 200px">
                    <label class="position-absolute top-50 start-50 translate-middle fs-5 upload-label"
                      style="font-weight: bolder;" for="">Click aqui
                      para agregar imagen</label>
                    <img class="w-75" :src="imageUrl" alt="imagen de perfil del empleado" style="opacity: 0.5;">
                    <input accept="image/png, image/jpeg" type="file" @change="saveFile"
                      class="position-absolute top-50 start-50 translate-middle input-wrapper w-100 h-100 opacity-0" />
                  </div>
                </div>
              </div>
            </CTabPane>

            <CTabPane role="tabpanel" aria-labelledby="contact-tab" :visible="tabPaneActiveKey === 3">
              <div class="row">
                <div class="col-4 border">
                  <CCol>
                    <CFormLabel for="licenciaConducir">Licencia de conducir</CFormLabel>
                    <CFormInput v-model="licenciaConducir" type="date" id="licenciaConducir" />

                  </CCol>
                  <CCol>
                    <CFormLabel for="fechaExpiracionLicencia">Fecha expiraci&oacute;n licencia de conducir</CFormLabel>
                    <CFormInput v-model="fechaExpiracionLicencia" type="date" id="fechaExpiracionLicencia" />

                  </CCol>
                  <CCol>
                    <CFormLabel for="fechaExpitaTarjeta">Fecha expira tarjeta del banco:</CFormLabel>
                    <CFormInput v-model="fechaExpitaTarjeta" type="date" id="fechaExpitaTarjeta" />
                  </CCol>
                </div>
                <div class="col-4 border p-3">
                  <h3>Otros</h3>
                  <CCol>
                    <CFormLabel for="emergenciaTelefono" >Otros</CFormLabel>
                    <CFormInput id="emergenciaTelefono" type="text" v-model="postEmpleado.observacion"/>
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

                    <CFormInput required v-model="postEmpleado.emergenciaNombre" id="emergenciaNombre" />
                  </CCol>
                  <CCol>
                    <CFormLabel for="emergenciaTelefono">Tel&eacute;fono</CFormLabel>
                    <CFormInput v-on:keypress="onlyNumber($event)" v-model="postEmpleado.emergenciaTelefono" id="emergenciaTelefono" type="number" maxlength="13"
                      required />

                  </CCol>
                  <CCol>
                    <CFormLabel for="emergenciaDireccion">Dirección</CFormLabel>
                    <CFormInput v-model="postEmpleado.emergenciaDireccion" id="emergenciaDireccion" required />

                  </CCol>
                  <CCol>
                    <CFormLabel for="emergenciaParentezco">Parentezco</CFormLabel>
                    <CFormSelect required v-model="postEmpleado.emergenciaParentezco" id="emergenciaParentezco">
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
                    <CFormSelect v-model="postEmpleado.tipoSangreId" id="tipoSangreId" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option v-for="sangre in this.tipoSangre" :key="sangre.id" :value="sangre.id">
                        {{ sangre.nombre }}
                      </option>
                    </CFormSelect>
                  </CCol>



                  <CCol>
                    <CFormLabel for="tipoSangreId">Al&eacute;rgico</CFormLabel>
                    <CFormSelect v-model="postEmpleado.emergenciaAlergico" id="emergenciaAlergico" required>
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
                    <CFormSelect v-model="postEmpleado.emergenciaDiabetico" id="emergenciaDiabetico" required>
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
                    <CFormSelect id="emergenciaPresionAlta" v-model="postEmpleado.emergenciaPresionAlta" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option>Normal</option>
                      <option>Alta</option>
                      <option>Baja</option>
                    </CFormSelect>

                  </CCol>


                  <CCol>
                    <CFormLabel for="emergenciaParentezco">En tratamiento</CFormLabel>
                    <CFormSelect v-model="postEmpleado.emergenciaEnTratamiento" id="emergenciaEnTratamiento" required>
                      <option value="" disabled selected>Seleccione</option>
                      <option>Si</option>
                      <option>No</option>

                    </CFormSelect>



                  </CCol>
                  <h3>Intervención quir&uacute;rgica(m&aacute;s reciente)</h3>

                  <CCol>
                    <CFormLabel for="diagnostico">Detalle diagnostico</CFormLabel>
                    <CFormTextarea v-model="postEmpleado.emergenciaDiagnostico" id="diagnostico" />

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
                      <CFormSelect @change="validateNivelEscolar($event)" v-model="postEmpleado.nivelEscolar"
                        id="nivelEscolar" required>
                        <option value="" disabled selected>Seleccione</option>
                        <option v-for="nivelEscolar in this.nivelEscolarList" :key="nivelEscolar.id"
                          :value="nivelEscolar.id">
                          {{ nivelEscolar.configValue }}
                        </option>
                      </CFormSelect>

                    </CCol>
                    <CCol :md="6">
                      <CFormLabel for="areaTematica">&Aacute;rea Tem&aacute;tica</CFormLabel>
                      <CFormSelect :disabled="areaTematicaField" v-model="postEmpleado.areaTematica" id="areaTematica">
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
                    <CFormInput :disabled="tituloField" v-model="postEmpleado.tituloObtenido" id="tituloObtenido" />

                  </CCol>

                  <CCol :md="12">
                    <div class="row">
                      <CCol :md="6">
                        <CFormLabel for="correo1">Correo Electr&oacute;nico 1</CFormLabel>
                        <CFormInput id="correo1" v-model="postEmpleado.correoElectronico" required />

                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="correo1">Correo Electr&oacute;nico 2</CFormLabel>
                        <CFormInput id="correo2" v-model="postEmpleado.correoElectronico2" />

                      </CCol>
                    </div>
                  </CCol>
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
        <input type="submit" value="Guardar" class="btn btn-primary" />
      </div>
    </CForm>

  </CModal>
</template>

<script>

import { CModal } from '@coreui/vue'
import moment from 'moment'
import Api from '../../services/RegistroPersonalServices'
import apiSectores from '../../../../financiero/NominaModule/services/NominaServices'
import configuraciones from '@/utils/configuraciones'
import { onlyLetter, onlyNumber } from '@/utils/validator'
import vSelect from 'vue-select'
import fileApi from '../../services/Files'
import 'vue-select/dist/vue-select.css'
import { useToastStore } from '@/store/toast'
import { mapActions, mapStores } from 'pinia'

export default {
  name: 'RegistroPersonalDialog',
  components: {
    CModal,
    moment,
    vSelect
  },
  data: function () {
    return {
      isLowerSelectedInitDate:false,
      areaTematicaField: true,
      tituloField: true,
      imageId: null,
      isFormEventTypeValidated: false,
      onlyNumber,
      profilePhoto: null,
      imageUrl: null,
      discapacidadList: [],
      departamentoList: [{
        code: 0,
        label: 'Seleccionar',
      }],
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
        fechaNacimiento: new Date(),
        lugarNacimiento: null,
        estadoCivil: '',
        sexo: '',
        dependientes: 0,
        fechaIngreso: null,
        fechaSalida: new Date(),
        razonSalida: null,
        reemplear: true,
        fechaReingreso: new Date(),
        programaDivisionId: 0,
        departamentoId: 0,
        areaTrabajoId: 0,
        posicionId: 0,
        grupoOcupacional: null,
        tipoContrato: null,
        fechaInicioContrato: new Date(),
        fechaFinContrato: new Date(),
        turno: null,
        periodoPago: null,
        formaPago: null,
        numeroCuenta: null,
        fechaExpitaTarjeta: new Date(),
        estatus: true,
        sueldo: 0.0,
        sueldoAnterior: 0.0,
        fechaSueldoAnterior: new Date(),
        fechaUltimaNomina: new Date(),
        inicioVacaciones: new Date(),
        finVacaciones: new Date(),
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
        fechaExpiracionLicencia: new Date(),
        aplicaSasp: true,
        nivelEscolar: null,
        areaTematica: null,
        tituloObtenido: null,
        correoElectronico: null,
        correoElectronico2: null,
        recomendadoPor: null,
        idImagenPerfil: undefined
      },
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    validarFechaDesde() {
      const fechaDesde = new Date(this.postEmpleado.fechaIngreso)
      fechaDesde.setHours(0, 0, 0, 0)
      const fechaActual = new Date()
      fechaActual.setHours(0, 0, 0, 0)
      if (fechaDesde > fechaActual) {
        this.isLowerSelectedInitDate = true
        this.fechaIngreso = new Date()
      } else {
        this.isLowerSelectedInitDate = false
      }
    },
    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.saveRegistroPersonal()
      }
      this.isFormEventTypeValidated = true
    },

    saveFile(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader();
        this.profilePhoto = file;
        reader.onload = (evt) => {
          this.imageUrl = evt.target.result
          const formData = new FormData()
          formData.append('file', file)
          formData.append('empleadoId', this.empleadoId)
          formData.append('profileImage', 1)
          formData.append('public', true)
          fileApi.saveFile(formData).then(response => {
            this.postEmpleado.idImagenPerfil = response.data.data[0].id
            this.imageId = response.data.data[0].id;
          }).catch(console.log)
        };
        reader.readAsDataURL(file);
      }
    },

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

    getListDepartamento(event) {
      Api.listDepartamento(event.target.value).then(({ data: { data } }) => {
        this.departamentoList = data.map((elem) => ({
          code: elem.id,
          label: `(${elem.id})  ${elem.nombre}`,
        }))
        this.departamentoList.unshift({
          code: 0,
          label: 'Seleccionar',
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
    },

    saveRegistroPersonal() {
      this.$emit('post-personal', {
        ...this.postEmpleado
      })
    },

    getRegistroPersonal(id) {
      Api.getEmpleadoByID(id).then((response) => {
        this.postEmpleado = { ...response.data.data }
        this.imageId = this.postEmpleado.idImagenPerfil
        this.imageUrl = `${process.env.VUE_APP_API_URL}/api/files/public/${this.imageId ?? -1}`
      })
    },

    closeModal() {
      this.$emit('close-modal')
      this.clearModal()
    },

    clearModal() {
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
        fechaNacimiento: new Date(),
        lugarNacimiento: null,
        estadoCivil: '',
        sexo: 'M',
        dependientes: 0,
        fechaIngreso: null,
        fechaSalida: new Date(),
        razonSalida: null,
        reemplear: true,
        fechaReingreso: new Date(),
        programaDivisionId: 0,
        departamentoId: 0,
        areaTrabajoId: 0,
        posicionId: 0,
        grupoOcupacional: null,
        tipoContrato: null,
        fechaInicioContrato: new Date(),
        fechaFinContrato: new Date(),
        turno: null,
        periodoPago: null,
        formaPago: null,
        numeroCuenta: null,
        fechaExpitaTarjeta: new Date(),
        estatus: true,
        sueldo: 0.0,
        sueldoAnterior: 0.0,
        fechaSueldoAnterior: new Date(),
        fechaUltimaNomina: new Date(),
        inicioVacaciones: new Date(),
        finVacaciones: new Date(),
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
        fechaExpiracionLicencia: new Date(),
        aplicaSasp: true,
        nivelEscolar: null,
        areaTematica: null,
        tituloObtenido: null,
        correoElectronico: null,
        correoElectronico2: null,
        recomendadoPor: null,
        idImagenPerfil: undefined
      }
    },

    validateDate(event) {
      if (new Date(event.target.value) > new Date()) {
        return true
      }
    }
  },

  mounted() {
    this.cargaInformacionRequerida()
  },

  computed: {
    ...mapStores(useToastStore),

    fechaIngreso: {
      get() {
        let date = new Date()
        if (
          this.postEmpleado.fechaIngreso !== null &&
          this.postEmpleado.fechaIngreso?.toString() !== 'Invalid Date'
        ) {
          date = this.postEmpleado.fechaIngreso
          if (typeof this.postEmpleado.fechaIngreso === 'string') {
            date = new Date(this.postEmpleado.fechaIngreso)
            return date.toISOString().split('T')[0]
          }
        }
        if (this.postEmpleado.fechaIngreso == null) {
          return null
        } else {
          return date.toISOString().split('T')[0]
        }

      },
      set(value) {
        return (this.postEmpleado.fechaIngreso = value == null ? null : new Date(`${value}T00:00:00`))
      },
    },

    fechaNacimiento: {
      get() {
        let date = new Date()
        if (
          this.postEmpleado.fechaNacimiento !== null &&
          this.postEmpleado.fechaNacimiento?.toString() !== 'Invalid Date'
        ) {
          date = this.postEmpleado.fechaNacimiento
          if (typeof this.postEmpleado.fechaNacimiento === 'string') {
            date = new Date(this.postEmpleado.fechaNacimiento)
            return date.toISOString().split('T')[0]
          }
        }
        return date.toISOString().split('T')[0]
      },
      set(value) {
        return (this.postEmpleado.fechaNacimiento = new Date(`${value}T00:00:00`))
      },
    },

    selectedDepartamento: {
      get() {
        return this.departamentoList.find((x) => x.code == this.postEmpleado.departamentoId)
      },
      set(util) {
        this.postEmpleado.departamentoId = Number(util.code)
      },
    },
  },

  watch: {
    empleadoId(newId) {
      if (newId) {
        this.getRegistroPersonal(newId)

      }
    },
    showModal(newValue) {
      if (!newValue) {
        this.clearModal()
      }
    }
  },

  props: {
    showModal: Boolean,
    empleadoId: null
  }
}
</script>
<style>
input::file-selector-button {
  font-weight: bold;
  color: black;
  padding: 0.5em;
  border: thin solid grey;
  border-radius: 6px;
}

input[type="file"]:focus+label {
  outline: 2px solid;
  /* example focus style */
}

input-wrapper {
  opacity: 0;
  font-size: 12px;
  border: 1px solid rgb(0, 0, 0);
  padding: 4px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;
}

upload-label {
  text-shadow: 0 0 1px black;
}
</style>
