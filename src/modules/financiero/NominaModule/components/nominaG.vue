<template>
  <h3 class="text-center">Nomina general</h3>
  <div class="row my-5">
    <div class="col-9">
      <div class="row">
        <div class="col-3">
          <div class="row">
            <div class="col-6">
              <CCol :md="9">
                <CFormLabel for="validationCustom01">Año</CFormLabel>
                <CFormInput type="number" min="1900" max="2099" step="1" value="2023" v-model="nominaGneral.Anio"
                  id="validationCustom01" />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid>
                  Favor agregar el campo
                </CFormFeedback>
              </CCol>
            </div>
            <div class="col-6" style=" position: relative; left: -42px;">
              <CCol :md="9">
                <CFormLabel for="validationCustom01">Mes</CFormLabel>
                <CFormSelect v-model="nominaGneral.Mes" id="validationCustom05">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </CFormSelect>
              </CCol>
            </div>
          </div>
        </div>
        <div class="col-3" style=" position: relative; left: -84px;">
          <CCol :md="9">
            <CFormLabel for="validationCustom01">Tipo de contracto</CFormLabel>
            <CFormSelect v-model="nominaGneral.TipoContrato" id="validationCustom05">
              <option>Tipo de contrato 1</option>
              <option>Tipo de contrato 2</option>
            </CFormSelect>
          </CCol>
        </div>
        <div class="col-3" style="position: relative; left: -175px;">
          <CCol :md="9">
            <CFormLabel for="validationCustom01">Forma de pago</CFormLabel>
            <CFormSelect v-model="nominaGneral.FormaPago" id="validationCustom05">
              <option>BANCO</option>
              <option>CHEQUE</option>
            </CFormSelect>
          </CCol>
        </div>
        <div class="col-3">
          <CButton style="font-weight: bold; position: relative; top: 31px; left: -265px;" color="info"
            @click="() => { getNominaGeneral() }">Filtrar</CButton>
        </div>
      </div>
    </div>
    <div class="col-3" style="position: relative; top: 16px">
      <div>
        <div class="d-inline p-2">
          <CButton style="font-weight: bold" color="info" @click="() => { showImprimirModal = true }">Imprimir Todos
          </CButton>
        </div>
        <div class="d-inline p-2">
          <CButton style="font-weight: bold" class="ml-5" color="info" @click="() => {
            klk()
            clearModal1()
            lgDemo1 = true
          }
            ">Generar Nomina</CButton>
        </div>
        <div class="d-inline p-2">
          <CButton style="font-weight: bold" @click="volver" color="info">Volver</CButton>
        </div>
      </div>
    </div>
  </div>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,

  }" :tableHeadProps="{}" :activePage="1" header :items="nominag" :columns="columns" columnFilter itemsPerPageSelect
    :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #posicion="{ item }">
      <td>
        {{ item.posicion.nombre }}
      </td>
    </template>

    <template #departamento="{ item }">
      <td>
        {{ item.departamento.nombre }}
      </td>
    </template>
    <template #programaDivision="{ item }">
      <td>
        {{ item.departamento.programaDivision.nombre }}
      </td>
    </template>

    <template #fecha="{ item }">
      <td>
        {{ formatDate(item.fecha) }}
      </td>
    </template>
    <template #totalsueldos="{ item }">
      <td class="text-end">
        {{ item.totalsueldos }}
      </td>
    </template>
    <template #totalAPagar="{ item }">
      <td class="text-end">
        {{ item.totalAPagar }}
      </td>
    </template>
    <template #show_details="{ item }">
      
      <td class="py-1">
        <CButton @click="toggleDetail2()" class="mt-1" color="primary" variant="outline" square size="sm">
          {{ Boolean(item._toggled) ? 'Hide' : 'Imprimir' }}
        </CButton>
      </td>
      <td class="py-1">
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="() => {
          clearModal2()
          reportes = true
          toggleDetail2(item)
        }
          ">
          {{ Boolean(item._toggled) ? 'Hide' : 'Cons/Nomina' }}
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

  <CModal size="xl" :visible="lgDemo" @close="() => {
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
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1" @click="() => {
              tabPaneActiveKey = 1
            }
              ">
              General
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 2" @click="() => {
              tabPaneActiveKey = 2
            }
              ">
              Otros ingresos
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 5" @click="() => {
              tabPaneActiveKey = 5
            }
              ">
              Acumulado anual
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
            <div class="row">
              <div class="col-4 border p-3">
                <h3>Datos generales</h3>

                <CCol>
                  <CFormLabel disabled for="validationCustom01">Código</CFormLabel>
                  <input disabled autofocus="1" type="text" class="form-control" aria-describedby="basic-addon1"
                    v-model="postEmpleado.codigo" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom01">Cedula</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.cedula" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Nombre</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.nombres" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom01">Apellidos</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.apellidos" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Dirección</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.direccion" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Sectores</CFormLabel>
                  <CFormSelect disabled v-model="sector.id" id="validationCustom05">
                    <option v-for="sect in this.sector" :key="sect.id" :value="sect.id">
                      {{ sect.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Teléfono</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.telefono" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom05">Tipo de documento</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.tipoDocumento" id="validationCustom01" />
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Fecha nacimiento</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.fechaNacimiento" type="date" id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Lugar de nacimiento</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.lugarNacimiento" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Sexo</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.sexo" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Dependientes</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.dependientes" type="number" id="validationCustom02"
                    required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border p-3">
                <h3>Datos laborales</h3>
                <CCol :md="12">
                  <CFormLabel for="validationCustom01">Fecha ingreso</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.fechaIngreso" type="date" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Programa</CFormLabel>
                  <CFormSelect disabled v-model="postGenerarNomina.programaDivisionId" id="validationCustom05">
                    <option v-for="programa in this.programaDivision" :key="programa.id" :value="programa.id">
                      {{ programa.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Departamento</CFormLabel>
                  <CFormSelect disabled v-model="postEmpleado.departamentoId" id="validationCustom05">
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
                  <CFormLabel for="validationCustom05">Area de trabajo</CFormLabel>
                  <CFormSelect disabled v-model="areaTrabajo.id" id="validationCustom05">
                    <option v-for="area in this.areaTrabajo" :key="area.id" :value="area.id">
                      {{ area.area }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="validationCustom05">Cargo</CFormLabel>
                  <CFormSelect disabled v-model="posicionCargo.id" id="validationCustom05">
                    <option v-for="posicion in this.posicionCargo" :key="posicion.id" :value="posicion.id">
                      {{ posicion.nombre }}
                    </option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <div class="row">
                  <CCol>
                    <CFormLabel for="validationCustom02">Tipo de contrato</CFormLabel>
                    <CFormInput disabled v-model="postEmpleado.tipoContrato" id="validationCustom02" required />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol>
                    <CFormLabel for="validationCustom02">Turno</CFormLabel>
                    <CFormInput disabled v-model="postEmpleado.turno" id="validationCustom02" required />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <CCol :md="6">
                  <CFormLabel for="validationCustom05">Dias trabajando</CFormLabel>
                  <CFormInput v-model="postEmpleado.sueldo" type="date" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Tipo de cobro</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.periodoPago" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom05">Tipo de pago</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.formaPago" id="validationCustom02" required />
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom02">Sueldo actual</CFormLabel>
                  <CFormInput disabled v-model="postEmpleado.sueldo" type="number" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <h4>Retenciones de Ley</h4>

                <CCol>
                  <CFormLabel for="validationCustom02">Impuestos S.R</CFormLabel>
                  <CFormInput v-model="postEmpleado.impuestoSobreRenta" id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <div class="row">
                  <div class="col-6">
                    <CCol>
                      <CFormLabel for="validationCustom02">ARS</CFormLabel>
                      <CFormInput v-model="postEmpleado.arsFijo" id="validationCustom02" required
                        :disabled="postEmpleado.arsCalculado" />
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
                      <input class="form-check-input" type="checkbox" v-model="postEmpleado.arsCalculado" value="true"
                        id="flexCheckDefault" v-on:click="arsCalculado" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <CCol>
                      <CFormLabel for="validationCustom02">AFP</CFormLabel>
                      <CFormInput v-model="postEmpleado.afpFijo" type="number" id="validationCustom02" required
                        :disabled="postEmpleado.afpCalculado" />
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
                      <input class="form-check-input" type="checkbox" value="true" v-model="postEmpleado.afpCalculado"
                        v-on:click="afpCalculado" id="flexCheckDefault" />
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
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
            <div class="row">
              <div class="col-4 border p-3">
                <h3>Ingresos</h3>
                <hr />
                <CCol>
                  <CFormLabel for="validationCustom01">Sueldo fijo:</CFormLabel>
                  <CFormInput v-model="postEmpleado.sueldo" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Horas extras:</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Serv. Especiales:</CFormLabel>
                  <CFormInput id="validationCustom01" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Gastos de rep</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Vacaciones</CFormLabel>
                  <CFormInput type="date" v-model="postEmpleado.inicioVacaciones" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>

              <div class="col-4 border p-3">
                <div class="row">
                  <div class="col-4">
                    <h3>Retenciones</h3>
                  </div>
                  <div class="col-4" style="margin-top: 9px; margin-left: 116px">
                    <a style="padding: 40px" @click.prevent="addField(prueba)" href="">
                      <!-- <CIcon
                        style="color: #33a133 position: relative; left: 200px"
                        icon="cilPlus"
                        size="lg"
                      /> -->
                    </a>
                  </div>
                </div>
                <hr />

                <!-- <div
                  v-for="(input, index) in prueba"
                  :key="`phoneInput-${index}`"
                >
                  <div class="row">
                    <div class="col-8">
                      <CCol :md="18">
                        <CFormLabel for="validationCustom02"
                          >SFS ADIC.</CFormLabel
                        >
                        <CFormInput id="validationCustom02" required />
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="col-4" style="margin-top: 14px">
                      <br />

                      <a @click.prevent="deleteField(index, prueba)" href="">
                        <CIcon
                          style="color: #33a133 position: relative; left: 200px"
                          icon="cilMinus"
                          size="lg"
                        />
                      </a>
                    </div> -->

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion1Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion2Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion3Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion4Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion5Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion6Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion7Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion8Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion9Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="18">
                  <CFormInput style="border: 0" placeholder="Nombre Retencion" id="validationCustom02" required />

                  <CFormInput v-model="postConfiguracionNomina.retencion10Id" class="mt-2" id="validationCustom02"
                    required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <!-- </div> -->
              <!-- </div> -->

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
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Fecha modifica:</CFormLabel>
                  <CFormInput id="validationCustom01" />
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
                  <CFormInput v-model="postEmpleado.fechaExpiracionLicencia" type="date" id="validationCustom02"
                    required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Fecha expira tarjeta del banco:</CFormLabel>
                  <CFormInput v-model="postEmpleado.fechaExpitaTarjeta" typeof="date" id="validationCustom01" />
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
                  <CFormLabel for="validationCustom02">Usuario adiciona:</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Fecha modifica:</CFormLabel>
                  <CFormInput id="validationCustom01" />
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

          <CTabPane role="tabpanel" aria-labelledby="contact-tab" :visible="tabPaneActiveKey === 5">
            <div class="row">
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Enero</CFormLabel>
                  <CFormInput v-model="postEmpleado.eneroIngreso" id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Febrero</CFormLabel>
                  <CFormInput v-model="postEmpleado.febreroIngreso" id="validationCustom02" required
                    v-on:change="sumaIngresos" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Marzo</CFormLabel>
                  <CFormInput v-model="postEmpleado.marzoIngreso" id="validationCustom01" v-on:change="sumaIngresos" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Abril</CFormLabel>
                  <CFormInput v-model="postEmpleado.abrilIngreso" id="validationCustom02" required
                    v-on:change="sumaIngresos" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Mayo</CFormLabel>
                  <CFormInput v-model="postEmpleado.mayoIngreso" id="validationCustom01" v-on:change="sumaIngresos" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Junio</CFormLabel>
                  <CFormInput v-model="postEmpleado.junioIngreso" id="validationCustom02" required
                    v-on:change="sumaIngresos" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Julio</CFormLabel>
                  <CFormInput v-model="postEmpleado.julioIngreso" id="validationCustom01" v-on:change="sumaIngresos" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Agosto</CFormLabel>
                  <CFormInput v-model="postEmpleado.agostoIngreso" id="validationCustom02" required
                    v-on:change="sumaIngresos" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4 border">
                <CCol>
                  <CFormLabel for="validationCustom01">Septiembre</CFormLabel>
                  <CFormInput v-model="postEmpleado.septiembreIngreso" id="validationCustom01"
                    v-on:change="sumaIngresos" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Octubre</CFormLabel>
                  <CFormInput v-model="postEmpleado.octubreIngreso" id="validationCustom02" required
                    v-on:change="sumaIngresos" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom01">Noviembre</CFormLabel>
                  <CFormInput v-model="postEmpleado.noviembreIngreso" id="validationCustom01"
                    v-on:change="sumaIngresos" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Diciembre</CFormLabel>
                  <CFormInput v-model="postEmpleado.diciembreIngreso" id="validationCustom02" required
                    v-on:change="sumaIngresos" />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol>
                  <CFormLabel for="validationCustom01">Valor regalia</CFormLabel>
                  <CFormInput v-model="ingresos.total" disabled id="validationCustom01" />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <CFormLabel for="validationCustom02">Meses trabajados</CFormLabel>
                  <CFormInput disabled v-model="ingresos.cantidadIngreso" type="number" id="validationCustom02"
                    required />
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
  <CModal size="xl" :visible="lgDemo1" @close="() => {
    lgDemo1 = false
  }
    ">
    <CModalHeader>
      <CModalTitle>Generar Nomina</CModalTitle>
    </CModalHeader>
    <CModalBody class="mt-2">
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01">
          <div class="row">
            <div class="col-7">
              <div class="col-11">
                <CCol>
                  <CFormLabel for="validationCustom05">Programa</CFormLabel>
                  <CFormSelect v-model="postGenerarNomina.ProgramaDivision" id="validationCustom05"
                    v-on:change="changePrograma($event)">
                    <option v-for="prog in this.programa" :key="prog.id" :value="prog.id">
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
                  <CFormSelect v-model="postGenerarNomina.DepartamentoId" id="validationCustom05"
                    v-on:change="changeDepartamento($event)">
                    <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">
                      {{ departamento.nombre }}
                    </option>
                  </CFormSelect>

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>

              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
                  <CFormInput ref="name" v-model="clasificador" id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Estructura</CFormLabel>
                  <CFormInput v-model="estructuras" id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom01">Fecha de la Nomina</CFormLabel>
                  <CFormInput type="date" v-model="postGenerarNomina.fecha" id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom02">Tipo de contrato</CFormLabel>
                  <CFormSelect v-model="postGenerarNomina.TipoContrato" id="validationCustom05">
                    <option>Tipo de contrato 1</option>
                    <option>Tipo de contrato 2</option>
                  </CFormSelect>
                </CCol>
              </div>

              <CCol :md="6">
                <CFormLabel for="validationCustom05">Forma de pago</CFormLabel>
                <CFormSelect v-model="postGenerarNomina.FormaPago" id="validationCustom05">
                  <option>CHEQUE</option>
                  <option>BANCO</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                  Nomina de Regalia?
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                  Permitir Duplicidad en Nomina?
                </label>
              </div>

              <hr />

              <div class="mt-5">
                <p class="font-weight-bold">Nota (Encabezado Nomina):</p>
                <CCol :md="18">
                  <CFormInput id="validationCustom01" required
                    placeholder="NOMINA DE PAGO DEL MES DE NOVIEMBRE DEL 2022" />
                </CCol>
                <CCol :md="18">
                  <input class="mt-2 form-control form-control-lg" type="text" aria-label=".form-control-lg example" />
                </CCol>
                <div class="row">
                  <div class="col-7">
                    <button type="button" class="mt-2 btn btn-outline-dark">
                      Procesar Nomina
                    </button>
                  </div>

                  <div class="form-check col-5 mt-2">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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

            <div class="col-5">
              <CNav variant="tabs" role="tablist">
                <CNavItem>
                  <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1" @click="() => {
                    tabPaneActiveKey = 1
                  }
                    ">
                    Retenciones
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 2" @click="() => {
                    tabPaneActiveKey = 2
                  }
                    ">
                    Profile
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent class="border p-3">
                <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
                  <div class="row">
                    <CCol :md="6">
                      <div>
                        <CFormLabel for="validationCustom01">Retenciones:</CFormLabel>
                        <CFormInput disabled v-model="postConfiguracionNomina.textoEgr1" id="validationCustom01" required
                          value="Imp/Renta" />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01">Dividir</CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg01"
                        id="validationCustom01" required />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01">Cod.Ejec/Pres</CFormLabel>
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
                        <CFormInput value="ARS" disabled v-model="postConfiguracionNomina.textoEgr2"
                          id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg02"
                        id="validationCustom01" required />

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
                        <CFormInput value="AFP" disabled v-model="postConfiguracionNomina.textoEgr3"
                          id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg03"
                        id="validationCustom01" required />

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
                        <CFormInput v-model="postConfiguracionNomina.textoEgr4" id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg04"
                        id="validationCustom01" required />

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
                        <CFormInput v-model="postConfiguracionNomina.textoEgr5" id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg05"
                        id="validationCustom01" required />

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
                        <CFormInput v-model="postConfiguracionNomina.textoEgr6" id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg06"
                        id="validationCustom01" required />

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
                        <CFormInput v-model="postConfiguracionNomina.textoEgr7" id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg07"
                        id="validationCustom01" required />

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
                        <CFormInput v-model="postConfiguracionNomina.textoEgr8" id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg08"
                        id="validationCustom01" required />

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
                        <CFormInput v-model="postConfiguracionNomina.textoEgr9" id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg09"
                        id="validationCustom01" required />

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
                        <CFormInput v-model="postConfiguracionNomina.textoEgr10" id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </CCol>

                    <CCol :md="3">
                      <CFormLabel for="validationCustom01"></CFormLabel>
                      <CFormInput type="number" v-model="postConfiguracionNomina.factorDivicionEg010"
                        id="validationCustom01" required />

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
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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
                <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
                  Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                  single-origin coffee squid. Exercitation +1 labore velit,
                </CTabPane>
              </CTabContent>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closes">
              Close
            </button>
            <button v-on:click="submiFormConf" type="button" class="btn btn-primary">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>

  <CModal @close="() => {
    reportes = false
  }
    " size="xl" :backdrop="false" :keyboard="false" :visible="reportes">
    <CModalHeader>
      <CModalTitle>Consultar Nomina</CModalTitle>
    </CModalHeader>
    <CModalBody>



      <div class="row">
        <div class="col-6">
          <CCol :md="7">
            <CFormLabel for="validationCustom01">Fecha</CFormLabel>
            <CFormInput disabled v-model="getFiltro.fecha" id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </div>

        <div class="col-6" style="position: relative;
      left: -218px;">

          <CCol :md="7">
            <CFormLabel for="validationCustom05">ProgramaDivicion</CFormLabel>
            <CFormSelect disabled v-model="getFiltro.programaDivisionId" id="validationCustom05">
              <option v-for="programa in this.programaDivision" :key="programa.id" :value="programa.id">
                {{ programa.nombre }}
              </option>
            </CFormSelect>
            <CFormFeedback invalid>
              Favor agregar el campo
            </CFormFeedback>
          </CCol>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <CCol :md="7">
            <CFormLabel for="validationCustom01">Tipo de contrato</CFormLabel>
            <CFormInput disabled v-model="getFiltro.tipoContrato" id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </div>

        <div class="col-6" style="position: relative;left: -218px;">

          <CCol :md="7">
            <CFormLabel for="validationCustom01">Departamento</CFormLabel>
            <CFormSelect disabled v-model="getFiltro.departamentoId" id="validationCustom05">
              <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">
                {{ departamento.nombre }}
              </option>
            </CFormSelect>

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid>
              Favor agregar el campo
            </CFormFeedback>
          </CCol>

        </div>

      </div>

      <div class="row">
        <div class="col-6">
          <CCol :md="7">
            <CFormLabel for="validationCustom01">Forma de pago</CFormLabel>

            <CFormInput disabled v-model="getFiltro.formaPago" id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>

          </CCol>
        </div>
      </div>

      <CButton class="mt-3" style="background-color: #375b80;" color="primary" @click="imprimriPorDep">Imprimir Nomina
      </CButton>


    </CModalBody>
    <CModalFooter>

    </CModalFooter>
    <CSmartTable class="sticky-top" clickableRows :tableProps="{
      striped: true,
      hover: true,

    }" :tableHeadProps="{}" :activePage="1" header :items="getEmpleadosDep" :columns="columns2" itemsPerPageSelect
      :itemsPerPage="5" columnSorter columnFilter :sorterValue="{ column: 'status', state: 'asc' }" pagination
      :backdrop="false">


      <template #pocision="{ item }">
        <td>
          {{ item.posicion.nombre }}
        </td>
      </template>


      <template #fecha="{ item }">
        <td>
          {{ formatDate(item.fechaIngreso) }}
        </td>
      </template>

      <template #show_details="{ item, index }">


        <td class="py-1">
        <td class="py-1">
        <td class="py-1">
        <td class="py-1">
          <CButton color="primary" variant="outline" square size="sm" @click="() => {
            toggleDetail3(item, index)
            reportes = false
            consulEmple = true
          }
            ">
            {{ Boolean(item._toggled) ? 'Hide' : 'Cons/Nom Empleado' }}
          </CButton>
        </td>
        </td>
        <td class="py-1">
          <CButton color="primary" variant="outline" square size="sm">
            {{ Boolean(item._toggled) ? 'Hide' : 'Imprimir volante' }}
          </CButton>
        </td>
        </td>
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
    <CModalFooter class="mt-3">
      <CButton @click="closess" color="secondary">Close</CButton>
    </CModalFooter>
  </CModal>

  <CModal @close="() => {

    consulEmple = false
  }
    " size="xl" :backdrop="false" :keyboard="false" :visible="consulEmple">
    <CModalHeader>
      <CModalTitle>Consultas de Nominas del empleado</CModalTitle>
    </CModalHeader>
    <CModalBody>

    </CModalBody>

    <CSmartTable class="sticky-top" clickableRows :tableProps="{
      striped: true,
      hover: true,

    }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header :items="getEmpleadosDep1" :columns="columns3"
      itemsPerPageSelect :itemsPerPage="5" columnSorter columnFilter :sorterValue="{ column: 'status', state: 'asc' }"
      pagination :backdrop="false">




      <template #fecha="{ item }">
        <td>
          {{ formatDate(item.fecha) }}
        </td>
      </template>

      <template #show_details="{ item, index }">
        <td class="py-1">

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
    <CModalFooter class="mt-3">
      <CButton color="secondary" @click="cerrar">Close</CButton>
    </CModalFooter>
  </CModal>
  <ModalImprimirNomina :showModal="showImprimirModal" />
</template>

<script>
import { useRegistroStore } from '../store/Nomina/nomina'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import ModalImprimirNomina from './dialogos/ModalImprimirTodosNomina.vue'
import { useToastStore } from '@/store/toast'
import Api from '../services/NominaServices'
import router from '@/router'

export default {
  components: {
    CSmartTable,
    CModal,
    ModalImprimirNomina
  },


  data: function () {
    return {
      showImprimirModal: false,
      consulEmple: false,
      nominag: [],
      reportes: false,
      arsCheck: false,
      afpCheck: false,
      estructuras: null,
      getEmpleado: 0,
      getEmpleadosDep: [{ id: 0, DepartamentoId: 0, }],
      getEmpleadosDep1: [],
      programaDivision: [],
      idDep: 0,

      empleadosklk: [],

      departamento: [],

      getFiltro: {
        fecha: new Date(Date.now()),
        departamentoId: 0,
        programaDivisionId: 0,
        tipoContrato: null,
        formaPago: null
      },
      getByIdNominaGeneral: {
        DepartamentoId: 0,
      },
      nominaGneral: {
        AyuntamientoId: this.$ayuntamientoId,
        Anio: 2023,
        Mes: 1,
        // DepartamentoId: 0,
        TipoContrato: 'Tipo de contrato 1',
        // ProgramaDivision: 0,
        FormaPago: 'CHEQUE',
      },

      clasificador: null,
      programid1: null,

      departamentos: [],
      departamentosId: null,
      programaId: null,
      programa: [{}],
      posicionCargo: [{}],
      areaTrabajo: [{}],
      programaDivision: [{ nombre: null }],
      sector: [{}],
      id: 0,
      Acumulado: [],
      confNomina: [{}],

      postGenerarNomina: {
        AyuntamientoId: this.$ayuntamientoId,
        fecha: new Date(Date.now()),
        DepartamentoId: 0,
        TipoContrato: 'Tipo de contrato 2',
        ProgramaDivision: 0,
        FormaPago: 'BANCO',
      },

      postConfiguracionNomina: {
        id: 0,
        ayuntamientoId: this.$ayuntamientoId,
        textoIng1: null,
        textoIng2: null,
        textoIng3: null,
        textoIng4: null,
        textoIng5: null,
        textoIng6: null,
        textoIng7: null,
        textoIng8: null,
        textoIng9: null,
        textoEgr1: 'Imp/Renta',
        textoEgr2: 'ARS',
        textoEgr3: 'AFP',
        textoEgr4: null,
        textoEgr5: null,
        textoEgr6: null,
        textoEgr7: null,
        textoEgr8: null,
        textoEgr9: null,
        textoEgr10: null,
        retencion1Id: 100,
        retencion2Id: 0,
        retencion3Id: 0,
        retencion4Id: 0,
        retencion5Id: 0,
        retencion6Id: 0,
        retencion7Id: 0,
        retencion8Id: 0,
        retencion9Id: 0,
        retencion10Id: 0,
        sue: 0,
        factorDivicionIg02: 0,
        factorDivicionIg03: 0,
        factorDivicionIg04: 0,
        factorDivicionIg05: 0,
        factorDivicionIg06: 0,
        factorDivicionIg07: 0,
        factorDivicionIg08: 0,
        factorDivicionIg01: 0,
        factorDivicionIg09: 0,
        factorDivicionIg010: 0,
        factorDivicionEg01: 0,
        factorDivicionEg02: 0,
        factorDivicionEg03: 0,
        factorDivicionEg04: 0,
        factorDivicionEg05: 0,
        factorDivicionEg06: 0,
        factorDivicionEg07: 0,
        factorDivicionEg08: 0,
        factorDivicionEg09: 0,
        factorDivicionEg010: 0,
        porcRetencAfp: 0,
        porcRetencAfpPatron: 0,
        porcRetencArs: 0,
        porcRetencArsPatron: 0,
        sueldoTopoTss: 0,
        porcRetencArlPatron: 0,
        porcLimiteRetenc: 0,
      },
      prueba: [{ prueba: '' }],

      focus: false,
      unionIngresos: 0,
      resultadoIngresos: 0,
      increments: 0,
      incrementar: 0,

      ingresos: [{ total: 0, cantidadIngreso: 0 }],

      postEmpleado: {
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
        anioFiscalId: this.$fiscalYearId,
        ayuntamientoId: this.$ayuntamientoId,
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
        { key: 'fecha', label: 'Fecha', _style: { width: '4%' } },
        {
          key: 'programaDivision',
          label: 'ProgramaDivision',
          _style: { width: '4%' },
        },

        {
          key: 'departamento',
          label: 'Departamento',
          _style: { width: '4%' },
        },
        {
          key: 'estProgram',
          label: 'Est/Program',
          _style: { width: '1%' },
        },
        {
          key: 'clasificador',
          label: 'Clasificador',
          _style: { width: '5%' },
        },

        {
          key: 'cantidadEmpleados',
          label: 'cantidad Empleados',
          _style: { width: '5%' },
        },
        {
          key: 'totalsueldos',
          label: 'Total Sueldos',
          _style: { width: '2%' },
        },
        {
          key: 'total retenciones',
          label: 'T/Retenciones',
          _style: { width: '1%' },
        },

        {
          key: 'totalAPagar',
          label: 'T/Pagar',
          _style: { width: '1%' },
        },

        {
          key: 'formaPago',
          label: 'F/Pago',
          _style: { width: '1%' },
        },
        { key: 'comprobante', label: 'Comprobante', _style: { width: '1%' } },
        // { key: 'Lote/B', label: 'Lote/B', _style: { width: '1%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          // filter: false,
          sorter: false,

        },
      ],

      columns2: [

        {
          key: 'id',
          label: 'codigo',
          _style: { width: '4%' },
        },
        {
          key: 'apellidos',
          label: 'Apellido',
          _style: { width: '4%' },
        },
        {
          key: 'nombres',
          label: 'Nombre',
          _style: { width: '4%' },
        },
        {
          key: 'cedula',
          label: 'Cedula',
          _style: { width: '4%' },
        },

        {
          key: 'pocision',
          label: 'Cargo',
          _style: { width: '5%' },
        },

        {
          key: 'fecha',
          label: 'Fecha Ingreso',
          _style: { width: '2%' },
        },

        {
          key: 'sueldo',
          label: 'Sueldo bruto',
          _style: { width: '4%' },
        },
        { key: 'retenciones', label: 'Retenciones', _style: { width: '1%' } },
        {
          key: 'noCheque',
          label: '#CK',
          _style: { width: '5%' },
        },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },

          sorter: false,

        },
      ],

      columns3: [

        {
          key: 'fecha',
          label: 'Fecha Nomina',
          _style: { width: '4%' },
        },
        {
          key: 'codEmpl',
          label: 'Cod/Empleado',
          _style: { width: '4%' },
        },

        {
          key: 'nombreEmpleado',
          label: 'Nombre del empleado',
          _style: { width: '5%' },
        },
        {
          key: 'formaPago',
          label: 'Forma de pago',
          _style: { width: '4%' },
        },
        {
          key: 'tipoContrato',
          label: 'Tipo de contrato',
          _style: { width: '4%' },
        },

        {
          key: 'nombreEmpleado',
          label: 'Nombre del empleado',
          _style: { width: '5%' },
        },

        {
          key: 'sueldo',
          label: 'Sueldo bruto',
          _style: { width: '2%' },
        },


        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
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
      lgDemo1: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['Nomina', 'Empleado', 'nominag']),
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    getNominaGeneral() {
      Api.getnominaGeneral(this.nominaGneral).then((response) => {
        this.nominag = response.data.data

      })
    },

    getEmpleadoPorDepartamento(departamento) {
      Api.getEmpleadosPorDepartamentos(departamento).then((response) => {
        this.getEmpleadosDep = response.data.data
      })

    },
    arsCalculado() {
      // this.postEmpleado.arsCalculado = false
      if (this.postEmpleado.arsCalculado == false) {
        this.postEmpleado.arsFijo = 3.04

      } else {
        this.postEmpleado.arsFijo = 0
      }
    },
    afpCalculado() {
      // this.postEmpleado.arsCalculado = false
      if (this.postEmpleado.afpCalculado == false) {
        this.postEmpleado.afpFijo = 2.87

      } else {
        this.postEmpleado.afpFijo = 0
      }
    },
    clearModal2() {
      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
        this.nominaGneral.ProgramaDivision = this.programaDivision[0].id


        Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
          (response) => {
            this.departamentos = response.data.data
            this.nominaGneral.DepartamentoId = this.departamentos[0].id
            this.getEmpleado = this.departamentos[0].id

          },
        )

      })
    },

    volver() {
      router.push({ name: 'nominas' })

    },

    clearModal1() {
      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
        this.postGenerarNomina.ProgramaDivision = this.programaDivision[0].id


        Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
          (response) => {
            this.departamentos = response.data.data
            this.postGenerarNomina.DepartamentoId = this.departamentos[0].id

          },
        )

      })
    },

    imprimriPorTPago() {
      window
        .open(
          `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Nomina_Tipo_Pago&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}&ANO=2022&FORMA_PAGO=${this.nominaGneral.FormaPago}`,
          '_blank',
        )
        .focus()
      // http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Nomina_Tipo_Pago&rs:Command=Render&ID_AYUNTAMIENTO=1&ANO=2022&FORMA_PAGO=CHEQUE
    },

    imprimriPorDep() {
      window
        .open(
          `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Nomina_Departamento&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}&ANO=2022&ID_DEPARTAMENTO=${this.idDep}`,
          '_blank',
        )
        .focus()
      // http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Nomina_Departamento&rs:Command=Render&ID_AYUNTAMIENTO=1&ANO=2022&ID_DEPARTAMENTO=3
    },
    IngresoReport() {
      window
        .open(
          `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Nomina_General&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}&ANO=2022`,
          '_blank',
        )
        .focus()
    },

    changePrograma(e) {
      Api.getDepartamentoByProgramaId(e.target.value).then((response) => {
        this.departamentos = response.data.data

      })

    },
    klk() {
      Api.getDepartamentoById(2).then((response) => {
        this.clasificador = response.data.data.ctgClasificadorId
        this.programid1 = response.data.data.programaDivisionId
        this.estructuras = response.data.data.estructura
      })
    },
    changeDepartamento(e) {
      this.departamentosId = e.target.value
      Api.getDepartamentoById(e.target.value).then((response) => {
        this.clasificador = response.data.data.ctgClasificadorId
        this.programid1 = response.data.data.programaDivisionId
        this.estructuras = response.data.data.estructura
      })
    },
    addField(prueba) {
      prueba.push({})
    },

    deleteField(index, prueba) {
      prueba.splice(index, 1)
    },
    formatDate(fechaIngreso) {
      return new Date(fechaIngreso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    cerrar() {
      this.consulEmple = false
      this.AbrirToggle()
    },
    formatDate1(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    focusInput() {
      this.$refs.name.$el.focus()
    },
    focusInput1() {
      if (!this.focus) {
        this.focusInput()
      }
    },
    close() {
      this.lgDemo = false
    },
    closes() {
      this.lgDemo1 = false
    },
    closess() {
      this.reportes = false
    },
    sumaIngresos() {
      this.Acumulado = [
        parseInt(this.postEmpleado.eneroIngreso),
        parseInt(this.postEmpleado.febreroIngreso),
        parseInt(this.postEmpleado.marzoIngreso),
        parseInt(this.postEmpleado.abrilIngreso),
        parseInt(this.postEmpleado.mayoIngreso),
        parseInt(this.postEmpleado.junioIngreso),
        parseInt(this.postEmpleado.julioIngreso),
        parseInt(this.postEmpleado.agostoIngreso),
        parseInt(this.postEmpleado.septiembreIngreso),
        parseInt(this.postEmpleado.octubreIngreso),
        parseInt(this.postEmpleado.noviembreIngreso),
        parseInt(this.postEmpleado.diciembreIngreso),
      ]
      this.unionIngresos = this.Acumulado.reduce((a, b) => {
        return a + b
      })
      this.resultadoIngresos = this.unionIngresos / 12
    },
    ...mapActions(useRegistroStore, [
      'getNomina',
      'addNomina',
      'getEmpleado',
      'addEmpleado',
      'getnominag',
    ]),
    submiNomina() {
      Api.postNomina(this.postNomina).then((response) => {
        this.postNomina.afpMonto = this.postEmpleado.afpFijo
      })
    },
    submiGeneraNomina() {
      Api.postnominaGeneral(
        this.$ayuntamientoId,
        this.postGenerarNomina.fecha,
        this.postGenerarNomina.DepartamentoId,
        this.postGenerarNomina.ProgramaDivision,
        this.postGenerarNomina.FormaPago,
        this.postGenerarNomina.TipoContrato,
      ).then((response) => {
      })
    },
    submiFormConf() {
      this.submiGeneraNomina()
      if (this.id) {
        Api.putConfiguracionNomina(this.id, this.postConfiguracionNomina).then(
          (response) => {
            this.lgDemo = false
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            this.postConfiguracionNomina = {
              id: 0,
              ayuntamientoId: this.$ayuntamientoId,
              textoIng1: null,
              textoIng2: null,
              textoIng3: null,
              textoIng4: null,
              textoIng5: null,
              textoIng6: null,
              textoIng7: null,
              textoIng8: null,
              textoIng9: null,
              textoEgr1: null,
              textoEgr2: null,
              textoEgr3: null,
              textoEgr4: null,
              textoEgr5: null,
              textoEgr6: null,
              textoEgr7: null,
              textoEgr8: null,
              textoEgr9: null,
              textoEgr10: null,
              retencion1Id: 0,
              retencion2Id: 0,
              retencion3Id: 0,
              retencion4Id: 0,
              retencion5Id: 0,
              retencion6Id: 0,
              retencion7Id: 0,
              retencion8Id: 0,
              retencion9Id: 0,
              retencion10Id: 0,
              sue: 0,
              factorDivicionIg02: 0,
              factorDivicionIg03: 0,
              factorDivicionIg04: 0,
              factorDivicionIg05: 0,
              factorDivicionIg06: 0,
              factorDivicionIg07: 0,
              factorDivicionIg08: 0,
              factorDivicionIg01: 0,
              factorDivicionIg09: 0,
              factorDivicionIg010: 0,
              factorDivicionEg01: 0,
              factorDivicionEg02: 0,
              factorDivicionEg03: 0,
              factorDivicionEg04: 0,
              factorDivicionEg05: 0,
              factorDivicionEg06: 0,
              factorDivicionEg07: 0,
              factorDivicionEg08: 0,
              factorDivicionEg09: 0,
              factorDivicionEg010: 0,
              porcRetencAfp: 0,
              porcRetencAfpPatron: 0,
              porcRetencArs: 0,
              porcRetencArsPatron: 0,
              sueldoTopoTss: 0,
              porcRetencArlPatron: 0,
              porcLimiteRetenc: 0,
            }
          },
        )
      } else {
        Api.postConfiguracionNomina(this.postConfiguracionNomina).then((response) => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
        })
          .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
        this.lgDemo = true
          // setTimeout(this.getEmpleado, 500)
          ; (this.postConfiguracionNomina = {
            ayuntamientoId: this.$ayuntamientoId,
            textoIng1: null,
            textoIng2: null,
            textoIng3: null,
            textoIng4: null,
            textoIng5: null,
            textoIng6: null,
            textoIng7: null,
            textoIng8: null,
            textoIng9: null,
            textoEgr1: null,
            textoEgr2: null,
            textoEgr3: null,
            textoEgr4: null,
            textoEgr5: null,
            textoEgr6: null,
            textoEgr7: null,
            textoEgr8: null,
            textoEgr9: null,
            textoEgr10: null,
            retencion1Id: 0,
            retencion2Id: 0,
            retencion3Id: 0,
            retencion4Id: 0,
            retencion5Id: 0,
            retencion6Id: 0,
            retencion7Id: 0,
            retencion8Id: 0,
            retencion9Id: 0,
            retencion10Id: 0,
            sue: 0,
            factorDivicionIg02: 0,
            factorDivicionIg03: 0,
            factorDivicionIg04: 0,
            factorDivicionIg05: 0,
            factorDivicionIg06: 0,
            factorDivicionIg07: 0,
            factorDivicionIg08: 0,
            factorDivicionIg01: 0,
            factorDivicionIg09: 0,
            factorDivicionIg010: 0,
            factorDivicionEg01: 0,
            factorDivicionEg02: 0,
            factorDivicionEg03: 0,
            factorDivicionEg04: 0,
            factorDivicionEg05: 0,
            factorDivicionEg06: 0,
            factorDivicionEg07: 0,
            factorDivicionEg08: 0,
            factorDivicionEg09: 0,
            factorDivicionEg010: 0,
            porcRetencAfp: 0,
            porcRetencAfpPatron: 0,
            porcRetencArs: 0,
            porcRetencArsPatron: 0,
            sueldoTopoTss: 0,
            porcRetencArlPatron: 0,
            porcLimiteRetenc: 0,
            id: 0,
          }),
            (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
      }
    },


    submitForm() {
      if (this.id) {
        Api.putEmpleado(this.id, this.postEmpleado).then((response) => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
          this.lgDemo = false
          setTimeout(this.getEmpleado, 500)
          this.postEmpleado = {
            id: 0,
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
        Api.postEmpleado(this.postEmpleado).then((response) => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
        })
          .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
        Api.postConfiguracionNomina(this.postConfiguracionNomina).then((response) => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
        })
          .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })

        this.lgDemo = true
        setTimeout(this.getEmpleado, 500)
          ; (this.postEmpleado = {
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
            arsCalculado: false,
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
      if (item.postConfiguracionNomina !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      Api.getConfiguracionNominabyid(item.id).then((response) => {
        this.postConfiguracionNomina = response.data.data
        this.id = item.id
      })
    },
    AbrirToggle() {
      if (this.consulEmple == false) {
        this.reportes = true
      }
    },
    toggleDetail2(item) {
      Api.getNominaGeneralById(item.id).then((response) => {
        this.idDep = item.departamentoId
        this.getFiltro = response.data.data
        Api.getNominaByDepartamento(item.id).then((response) => {
          this.getEmpleadosDep = response.data.data
        })
      })
    },
    toggleDetail3(item) {
      Api.getNominaGeneralById(item.id).then((response) => {
        this.idDep = item.departamentoId
        this.getFiltro = response.data.data
        Api.getNominaPorEmpleado(item.id).then((response) => {
          this.getEmpleadosDep1 = response.data.data
        })
      })
    },
  },
  mounted() {
    Api.getPocision().then((response) => {
      pocision = response.data.data
    })
    Api.getDepartamento().then((response) => {
      departamento = response.data.data
    })
    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
    })
    Api.getnominaGeneral(this.nominaGneral).then((response) => {
      this.nominag = response.data.data
    })
    Api.getEmpleadosPorDepartamentos(this.getEmpleado).then((response) => {
      this.getEmpleadosDep = response.data.data
    })
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
      }),
      Api.getConfiguracionNomina().then((response) => {
        this.confNomina = response.data.data
      })
    Api.getProgramaDivision().then((response) => {
      this.programa = response.data.data
    })
    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
      this.postGenerarNomina.ProgramaDivision = this.programaDivision[0].id
      Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
        (response) => {
          this.departamentos = response.data.data
          this.postGenerarNomina.DepartamentoId = this.departamentos[0].id
        },
      )
    })
  },
}
</script>
