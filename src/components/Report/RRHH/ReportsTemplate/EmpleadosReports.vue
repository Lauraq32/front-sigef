<template >
  <div>
    <div class="d-flex mt-3 justify-content-center">
      <button @click="imprimir">
        <CIcon icon="cilPrint" size="3xl" />
      </button>
    </div>

    <div class="container-fluid flex-column">
      <div class="text-center justify-content-center">
        <h5>Ayuntamiento Municipal de {{ empleadosObjects.ayuntamientoId }}</h5>
        <p>Telefono {{ empleadosObjects.telefono }} </p>
        <h5>Tarjeta del Empleado</h5>
      </div>

      <div class="d-flex w-100 justify-content-end">
        <div class="border" style="width: 150px;">
          <img src="@/assets/images/Francisco.png" alt="Imagen del emplead" />
        </div>
      </div>

      <div class="mt-1 gridy">
        <div class="w-100 h-100 p-3 border border-dark">
          <div class="row" v-for="(data, index) in datosGenerales" :key="index">
            <div class="col-6 fw-bold">
              <label for="datosGenerales"> {{ data.label }}: </label>
            </div>
            <p class="col-6 text-truncate" id="datosGenerales" v-html="lookInfo(data.key)"></p>
          </div>
        </div>

        <div class="w-100 h-100 p-3 border border-dark">
          <div class="row" v-for="(data, index) in datosLaborales" :key="index">
            <div class="col-6 fw-bold">
              <label for="idCampos"> {{ data.label }}: </label>
            </div>
            <p class="col-6 text-truncate" id="idCampos" v-html="lookInfo(data.key)"></p>
          </div>
        </div>
      </div>

      <div class="mt-1 gridy">
        <div class="w-100 h-100 p-3 border border-dark">
          <div class="row" v-for="(data, index) in datosEmergencia" :key="index">
            <div class="col-6 fw-bold">
              <label for="idCampos"> {{ data.label }}: </label>
            </div>
            <p class="col-6 text-truncate" id="idCampos" v-html="lookInfo(data.key)"></p>
          </div>
        </div>
        <div class="w-100 h-100 p-3 border border-dark">
          <div class="row" v-for="(data, index) in datosPresionAlterial" :key="index">
            <div class="col-6 fw-bold">
              <label for="idCampos"> {{ data.label }}: </label>
            </div>
            <p class="col-6 text-truncate" id="idCampos" v-html="lookInfo(data.key)"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils/format'
import { CIcon } from '@coreui/icons-vue'
import * as icon from '@coreui/icons'

export default {
  name: 'EmpleadoReport',

  setup() {
    const route = useRoute();

    return {
      empleadoId: route.params.id
    }
  },
  data() {
    return {
      formatDate,
      datosLaborales: [
        {
          label: 'Fecha Ingreso',
          key: 'fechaIngreso'
        },

        {
          label: 'Programa',
          key: 'programaDivision.nombre'
        },

        {
          label: 'Area',
          key: 'areaTrabajo.descripcion'
        },
        {
          label: 'Turno',
          key: 'turno'
        },
        {
          label: 'Tipo Cobro',
          key: 'formaPago'
        },
        {
          label: 'Sueldo Bruto',
          key: 'sueldo'
        },

      ],

      datosEmergencia: [
        {
          label: 'Nombres',
          key: 'emergenciaNombre'
        },
        {
          label: 'Telefonos',
          key: 'emergenciaTelefono'
        },
        {
          label: 'Direccion',
          key: 'emergenciaDireccion'
        },
        {
          label: 'Parentezco',
          key: 'emergenciaParentezco'
        },
        {
          label: 'Tipo de sangre',
          key: 'tipoSangre.nombre'
        },
        {
          label: 'Alergico a',
          key: 'emergenciaAlergico'
        },
        {
          label: 'Diabetico',
          key: 'emergenciaDiabetico'
        },
        {
          label: 'Insulino Dependiente',
          key: 'emergenciaInsodepend'
        },

      ],

      datosPresionAlterial: [
        {
          label: 'Presion Alta',
          key: 'emergenciaPresionAlta'
        },
        {
          label: 'Presion Baja',
          key: 'emergenciaPresionBaja'
        },
        {
          label: 'En tratamiento',
          key: 'emergenciaEnTratamiento'
        },
        {
          label: 'Diagnostico',
          key: 'emergenciaDiagnostico'
        },
        {
          label: 'Fecha',
          key: 'fechaIngreso'
        },
        {
          label: 'Lugar',
          key: 'emergenciaDireccion'
        },
        {
          label: 'Otros',
          key: 'codigo'
        },

      ],
      datosGenerales: [
        {
          label: 'Cdo Empleado',
          key: 'codigo'
        },
        {
          label: 'Apellidos',
          key: 'apellidos'
        },
        {
          label: 'Nombres',
          key: 'nombres'
        },
        {
          label: 'Cedula',
          key: 'cedula'
        },
        {
          label: 'Dirrecion',
          key: 'direccion'
        },
        {
          label: 'Sector',
          key: 'sector.nombre'
        },

        {
          label: 'Telefono',
          key: 'telefono'
        },
        {
          label: 'Fecha Nacimiento',
          key: 'fechaNacimiento'
        },
        {
          label: 'Lugar Nacimiento',
          key: 'lugarNacimient'
        },
        {
          label: 'Est. Civil',
          key: 'estadoCivil'
        },
        {
          label: 'Sexo',
          key: 'sexo'
        },

      ],

      empleadosObjects: {},
    }
  },


  methods: {
    onClick() {
      this.$emit('closeModalReports', false)
    },

    imprimir() {
      window.print();
    },

    getEmpleadoById(id) {
      Api.getEmpleadoByID(id).then((response) => {
        this.empleadosObjects = response.data.data
        this.empleadosObjects.fechaIngreso = this.formatDate(this.empleadosObjects.fechaIngreso)
        this.empleadosObjects.fechaNacimiento = this.formatDate(this.empleadosObjects.fechaNacimiento)
      })
    },
    lookInfo(param) {
      return param.split(".").reduce((acc, item) => acc?.[item], this.empleadosObjects) ?? '&nbsp;'
    }

  },
  mounted() {
    this.getEmpleadoById(this.empleadoId);
  },

  watch: {
    empleado() {
      this.getEmpleadoById(this.empleadoId)
    }
  },


  props: {
    empleados: Array,
  },
}
</script>

<style>
@media print {
  button {
    display: none;
  }
}

p {
  margin: 0;
  padding: 1px;
}

img {
  max-width: 100%;
  object-fit: contain;
}

.gridy {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
</style>
