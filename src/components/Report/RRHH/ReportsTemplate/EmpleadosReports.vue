<template >
  \
  <div class="miPage">
    <div class="text-center">
      <h5>Ayuntamiento Municipal de Altamira</h5>
      <p>Telefono (000)000-0000 Fax (000)000-0000</p>
      <h5>Tarjeta del Empleado</h5>
    </div>

    <div class="d-flex flex-row-reverse">
      <div class="col-2" style="margin-top: 9px; width: 140px; height: 129px">
        <div class="border">
          <img style="width: 120px; height: 100px" src="@/assets/images/Francisco.png" alt="descripción-de-la-imagen" />
        </div>
      </div>
    </div>

    <div class="row mx-4">
      <div class="col-md-6 mt-5 border border-dark ml-2">
        <div class="row">
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
      <div class="col-6 mt-5 border border-dark">
        <div class="row">
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
      <div class="col-6 mt-5 border border-dark">
        <div class="row">
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
      <div class="col-6 mt-5 border border-dark">
        <div class="row">
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
export default {
  name: 'EmpleadoReports',

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

  },
  // mounted() {
  //   window.print()
  // }

  // props: {
  //   showModalRepots: Boolean,
  //   Label: Array,
  // },
}
</script>

<style>
.miPage {
  width: 50%;
  position: relative;
  left: 570px;
}

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
</style>
