<template>
    <CModal @close="closeModalGenerarNomina" size="xl" :visible="modalGenerarNomina">
        <CModalHeader>
            <CModalTitle>Acción de Personal</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow>
                <CCol xs="7" class="d-flex flex-column gap-3">
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label" for="programa">Programa:</label>
                        <CFormSelect id="programa">
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
                    </div>
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label" for="departamento">Departamento:</label>
                        <CFormSelect id="departamento">
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
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="form-label col-auto col-form-label">PNAP:</span>
                        <span class="form-label col-auto col-form-label">C&oacute;digo del Departamento:</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="form-label col-auto col-form-label">Programa:</span>
                        <span class="form-label col-auto col-form-label">Sub-Programa:</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="form-label col-auto col-form-label">Proyecto:</span>
                        <span class="form-label col-auto col-form-label">Actividad/obra:</span>
                    </div>
                    <div>
                        <span class="form-label col-auto col-form-label">Clasificado:</span>
                    </div>
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label" for="descClasificador">Desc. Clasificador:</label>
                        <CFormSelect id="descClasificador">
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
                    </div>
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label" for="descClasificador">Fecha de la nomina:</label>
                        <CFormInput type="date" v-model="fechaNomina" />
                    </div>
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label" for="tipoPago">Tipo de Pago:</label>
                        <CFormSelect id="tipoPago">
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
                    </div>
                    <div class="d-flex gap-3">
                        <CFormCheck label="Nomina Regal&iacute;a?" />
                        <CFormCheck label="Permitir Duplicada en Nomina?" />
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <label class="form-label col-auto col-form-label" for="nota">Nota (Encabezado Nomina)</label>
                        <CFormTextarea id="nota" />
                    </div>
                    <div class="d-flex gap-3 align-items-center">
                        <CButton color="light">Generar Nomina</CButton>
                        <CFormCheck label="(Todas x Tipo de Pago)" />
                    </div>
                    <div class="d-flex">
                        <CButton color="light">Imprimir Nomina</CButton>
                    </div>
                    <div class="d-flex">
                        <CButton color="light">Emp. con descuentos Mayor a % del sueldo, seg&uacute;n ley</CButton>
                    </div>
                </CCol>
                <CCol xs="5">
                    <CNav variant="tabs" role="tablist">
                        <CNavItem>
                            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1"
                                @click="() => { tabPaneActiveKey = 1 }">
                                Retenciones
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 2"
                                @click="() => { tabPaneActiveKey = 2 }">
                                Ingresos
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                    <CTabContent>
                        <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
                            Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown
                            aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan
                            helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh
                            mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan
                            aliquip quis cardigan american apparel, butcher voluptate nisi qui.
                        </CTabPane>
                        <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
                            Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.
                            Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan
                            four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft
                            beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic,
                            assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero
                            magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit,
                            sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party
                            scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
                        </CTabPane>
                    </CTabContent>
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter></CModalFooter>
    </CModal>
</template>
<script>
import { CModal } from '@coreui/vue'
import { CFormInput, CModalFooter, CRow } from '@coreui/vue-pro';
export default {
    name: 'ModalGenerarNomina',
    components: {
        CModal,
        CModalFooter,
        CRow,
        CFormInput
    },
    props: {
        modalGenerarNomina: Boolean,
    },
    methods: {
        closeModalGenerarNomina() {
            this.$emit('changeValueModal', false);
        }
    },
    data: function () {
        return {
            fechaNomina: null,
            tabPaneActiveKey: 1
        }
    },
    computed: {
        fechaNomina: {
            get() {
                if (
                    this.fechaNomina !== null &&
                    this.fechaNomina?.toString() !== 'Invalid Date'
                ) {
                    let date = this.fechaNomina
                    if (typeof this.fechaNomina === 'string') {
                        date = new Date(this.fechaNomina)
                        return date.toISOString().split('T')[0]
                    }
                }
            },
            set(value) {
                return (this.fechaNomina = new Date(
                    `${value}T00:00:00`,
                ))
            },
        }
    }
}
</script>