<template >
  <div class="container flex-column">
    <div class="text-center justify-content-center">
      <h5>Ayuntamiento Municipal de {{ empleadosObjects.ayuntamientoId }}</h5>
      <p>Telefono {{ empleadosObjects.telefono }} Fax (000)000-0000</p>
      <h5>Tarjeta del Empleado</h5>
    </div>

    <div class="d-flex align-self-end">
      <div class="col-2 me-4" style="width: 140px; height: 140px">
        <div class="border">
          <img src="@/assets/images/Francisco.png" alt="Imagen del emplead" class="mr-4" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 mt-5">
        <div class="row w-100 p-3 border border-dark">
          <div class="col-6 fw-bold">
            <div v-for="(datosGenerales, index) in datosGenerales" :key="index">

              <label for="idCampos"> {{ datosGenerales.label }}: </label>
            </div>
          </div>
          <div class="col-6">
            <p id="idCampos" v-for="(data, index) in datosGenerales" :key="index" v-html="lookInfo(data.key)">
            </p>
          </div>
        </div>
      </div>
      <div class="col-6 mt-5 ">
        <div class="row w-100 h-100 p-3 border border-dark">
          <div class="col-6 fw-bold">
            <div v-for="(datosLaborales, index) in datosLaborales" :key="index">
              <label for="idCampos"> {{ datosLaborales.label }}: </label>
            </div>
          </div>
          <div class="col-6">
            <p id="idCampos" v-for="(data, index) in datosLaborales" :key="index" v-html="lookInfo(data.key)">

            </p>
          </div>
        </div>
      </div>

      <div class="col-6 mt-5 ">
        <div class="row w-100 p-3 border border-dark">
          <div class="col-6 fw-bold">
            <div v-for="(datosEmergencia, index) in datosEmergencia" :key="index">
              <label for="idCampos"> {{ datosEmergencia.label }}: </label>
            </div>
          </div>
          <div class="col-6">
            <p id="idCampos" v-for="(data, index) in datosEmergencia" :key="index" v-html="lookInfo(data.key)">

            </p>
          </div>
        </div>
      </div>
      <div class="col-6 mt-5 ">
        <div class="row w-100 h-100 p-3 border border-dark">
          <div class="col-6 fw-bold">
            <div v-for="(datosPresionAlterial, index) in datosPresionAlterial" :key="index">
              <label for="idCampos"> {{ datosPresionAlterial.label }}: </label>
            </div>
          </div>
          <div class="col-6">
            <p id="idCampos" v-for="(data, index) in datosPresionAlterial" :key="index" v-html="lookInfo(data.key)">
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices';
import { useRoute } from 'vue-router';

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
      datosLaborales: [
        {
          label: 'F.Ingreso',
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

    getEmpleadoById(id) {
      Api.getEmpleadoByID(id).then((response) => {
        this.empleadosObjects = response.data.data
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-6 {
  flex-basis: 50%;
}

label {
  margin-right: 10px;
}

p {
  margin: 0;
}

img {
  max-width: 100%;
  object-fit: contain;
}
</style>
