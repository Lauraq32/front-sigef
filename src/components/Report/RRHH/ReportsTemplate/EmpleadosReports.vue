<template >
  <div class="container flex-column">
    <div class="text-center justify-content-center">
      <h5>Ayuntamiento Municipal de Altamira</h5>
      <p>Telefono (000)000-0000 Fax (000)000-0000</p>
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
              <label for="idCampos"> {{ datosGenerales }}: </label>
            </div>
          </div>
          <div class="col-6">
            <p id="idCampos" v-for="(empleadoList, index) in empleadoList" :key="index">
              {{ empleadoList }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-6 mt-5 ">
        <div class="row w-100 h-100 p-3 border border-dark">
          <div class="col-6 fw-bold">
            <div v-for="(datosLaborales, index) in datosLaborales" :key="index">
              <label for="idCampos"> {{ datosLaborales }}: </label>
            </div>
          </div>
          <div class="col-6">
            <p id="idCampos" v-for="(empleadoList, index) in empleadoList" :key="index">
              {{ empleadoList }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-6 mt-5 ">
        <div class="row w-100 p-3 border border-dark">
          <div class="col-6 fw-bold">
            <div v-for="(datosEmergencia, index) in datosEmergencia" :key="index">
              <label for="idCampos"> {{ datosEmergencia }}: </label>
            </div>
          </div>
          <div class="col-6">
            <p id="idCampos" v-for="(empleadoList, index) in empleadoList" :key="index">
              {{ empleadoList }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-6 mt-5 ">
        <div class="row w-100 p-3 border border-dark">
          <div class="col-6 fw-bold">
            <div v-for="(datosPresionAlterial, index) in datosPresionAlterial" :key="index">
              <label for="idCampos"> {{ datosPresionAlterial }}: </label>
            </div>
          </div>
          <div class="col-6">
            <p id="idCampos" v-for="(empleadoList, index) in empleadoList" :key="index">
              {{ empleadoList }}
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
        'Fecha Ingreso',
        'Programa',
        'Dirrecion o dep.',
        'Area',
        'Cargo',
        'turno',
        'Tipo Cobro',
        'Tipo Cobro',
        'Sueldo Bruto',
      ],

      datosEmergencia: [
        'Nombres',
        'Telefonos',
        'Direccion',
        'Parentezco',
        'Tipo de sangre',
        'Alergico a',
        'Diabetico',
        'Insulino Dependiente',
      ],

      datosPresionAlterial: [
        'Presion Alta',
        'Presion Baja',
        'En tratamiento',
        'Diagnostico',
        'Fecha',
        'Lugar',
        'Otros',
      ],
      datosGenerales: [
        'Codigo Empleado',
        'Apellidos',
        'Nombres',
        'Cedula',
        'Dirrecion',
        'Sector',
        'Ciudad',
        'Telefono',
        'Fecha Nacimiento',
        'Lugar Nacimiento',
        'Est. Civil',
        'Sexo',
      ],
      empleadoList: [
        '123456',
        'García',
        'Alfredo',
        '40230212660',
        'Santiago',
        'Villa Mella',
        'Villa Faro',
        '8097500537',
        '10/23/2000',
        'Santo Domingo',
        'Soltero',
        'Masculino',
      ],

      empleadosObject: {

      }
    }
  },
  // created() {
  //   this.respuestas = [
  //     '123456',
  //     'García',
  //     'Alfredo',
  //     '40230212660',
  //     'Santiago',
  //     'Villa Mella',
  //     'Villa Faro',
  //     '8097500537',
  //     '10/23/2000',
  //     'Santo Domingo',
  //     'Soltero',
  //     'Masculino',
  //   ]
  // },

  methods: {
    onClick() {
      this.$emit('closeModalReports', false)
    },

    getEmpleadoById() {
      Api.getEmpleadoByID(this.empleadoId).then((response) => {
        this.empleadosObject = response.data.data
        console.log('kdkd')
      })
    }

  },
  // mounted() {
  //   window.print()
  // },

  // watch: {
  //   empleado() {
  //     this.getEmpleadoById(this.empleados.id)
  //   }
  // },

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
