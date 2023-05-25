<template>
  <div>
    <div class="d-flex mt-3 justify-content-center">
      <button @click="imprimir">
        <CIcon icon="cilPrint" size="3xl" />
      </button>
    </div>

    <div class="container-fluid flex-column">
      <div class="text-center justify-content-center">
        <h5>{{ ayuntamiento.descripcion }}</h5>
        <p>Teléfonos {{ empleado.telefono }}</p>
        <h5>Tarjeta del Empleado</h5>
      </div>

      <div class="d-flex justify-content-end">
        <div class="position-relative flex justify-content-center border border-dark" style="height: 150px">
          <img class="h-100" :src="imageUrl" alt="imagen de perfil del empleado" />
        </div>
      </div>

      <div class="row mt-3">
        <h6 class="col-6 text-decoration-underline">Datos Generales:</h6>
        <h6 class="col-6 text-decoration-underline">Datos Laborales:</h6>
      </div>

      <div class="gridy">
        <div class="w-100 h-100 p-3 border border-dark">
          <div class="row" v-for="(data, index) in datosGenerales" :key="index">
            <div class="col-6 fw-bold">
              <label for="datosGenerales"> {{ data.label }}: </label>
            </div>
            <p
              class="col-6 text-truncate"
              id="datosGenerales"
              v-html="lookInfo(data.key)"
            ></p>
          </div>
        </div>

        <div class="w-100 h-100 p-3 border border-dark">
          <div class="row" v-for="(data, index) in datosLaborales" :key="index">
            <div class="col-6 fw-bold">
              <label for="idCampos"> {{ data.label }}: </label>
            </div>
            <p
              class="col-6 text-truncate"
              id="idCampos"
              v-html="lookInfo(data.key)"
            ></p>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <h6 class="col-6 text-decoration-underline">
          En Caso de Emergencia Comunicarse con:
        </h6>
        <h6 class="col-6 text-decoration-underline">
          Niveles de Presión Alterial:
        </h6>
      </div>

      <div class="gridy">
        <div class="w-100 h-100 p-3 border border-dark">
          <div
            class="row"
            v-for="(data, index) in datosEmergencia"
            :key="index"
          >
            <div
              :class="{
                title: data.key === '--',
                'fw-bold': data.key !== '--',
                'col-12': data.key === '--',
                'col-6': data.key !== '--',
              }"
            >
              <label for="idCampos"> {{ data.label }}: </label>
            </div>
            <p
              v-if="data.key !== '--'"
              class="col-6 text-truncate"
              id="idCampos"
              v-html="lookInfo(data.key)"
            ></p>
          </div>
        </div>
        <div class="w-100 h-100 p-3 border border-dark">
          <div
            class="row"
            v-for="(data, index) in datosPresionAlterial"
            :key="index"
          >
            <div
              :class="{
                title: data.key === '--',
                'fw-bold': data.key !== '--',
                'col-12': data.key === '--',
                'col-6': data.key !== '--',
              }"
            >
              <label for="idCampos"> {{ data.label }}: </label>
            </div>
            <p
              v-if="data.key !== '--'"
              class="col-6 text-truncate"
              id="idCampos"
              v-html="lookInfo(data.key)"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils/format'
import { CIcon } from '@coreui/icons-vue'
import ApiFiles from '@/modules/rrhh/RegistroPersonal/services/Files'

export default {
  name: 'EmpleadoReport',

  setup() {
    const route = useRoute()

    return {
      empleadoId: route.params.id,
    }
  },
  data() {
    return {
      formatDate,
      ayuntamiento: {},
      datosLaborales: [
        {
          label: 'Fecha Ingreso',
          key: 'fechaIngreso',
        },

        {
          label: 'Programa',
          key: 'programaDivision.nombre',
        },

        {
          label: 'Área',
          key: 'areaTrabajo.descripcion',
        },

        {
          label: 'Cargo',
          key: 'posicion.nombre',
        },

        {
          label: 'Turno',
          key: 'turno',
        },

        {
          label: 'Tipo Cobro',
          key: 'periodoPago',
        },

        {
          label: 'Tipo Pago',
          key: 'formaPago',
        },

        {
          label: 'Sueldo Bruto',
          key: 'sueldo',
        },
      ],

      datosEmergencia: [
        {
          label: 'Nombres',
          key: 'emergenciaNombre',
        },
        {
          label: 'Teléfonos',
          key: 'emergenciaTelefono',
        },
        {
          label: 'Dirección',
          key: 'emergenciaDireccion',
        },
        {
          label: 'Parentezco',
          key: 'emergenciaParentezco',
        },
        {
          label: 'Información Médico del Empleado',
          key: '--',
        },
        {
          label: 'Tipo de sangre',
          key: 'tipoSangre.nombre',
        },
        {
          label: 'Alérgico a',
          key: 'emergenciaAlergico',
        },
        {
          label: 'Diabético',
          key: 'emergenciaDiabetico',
        },
      ],

      datosPresionAlterial: [
        {
          label: 'Presión Alta',
          key: 'emergenciaPresionAlta',
        },
        {
          label: 'Presión Baja',
          key: 'emergenciaPresionBaja',
        },
        {
          label: 'En tratamiento',
          key: 'emergenciaEnTratamiento',
        },

        {
          label: 'Intervención Quirúrgico (más reciente)',
          key: '--',
        },

        {
          label: 'Diagnóstico',
          key: 'emergenciaDiagnostico',
        },
      ],
      datosGenerales: [
        {
          label: 'Cdo Empleado',
          key: 'codigo',
        },
        {
          label: 'Apellidos',
          key: 'apellidos',
        },
        {
          label: 'Nombres',
          key: 'nombres',
        },
        {
          label: 'Cédula_Pasaporte',
          key: 'codigoIdentidad',
        },
        {
          label: 'Dirección',
          key: 'direccion',
        },
        {
          label: 'Sector',
          key: 'sector.nombre',
        },

        {
          label: 'Teléfonos',
          key: 'telefono',
        },
        {
          label: 'Fecha Nacimiento',
          key: 'fechaNacimiento',
        },
        {
          label: 'Lugar Nacimiento',
          key: 'lugarNacimiento',
        },
        {
          label: 'Est. Civil',
          key: 'estadoCivil',
        },
        {
          label: 'Sexo',
          key: 'sexo',
        },
      ],

      empleado: {},
      imageUrl: null,
    }
  },

  methods: {
    imprimir() {
      window.print()
    },

    getAyuntamientobyId(id) {
      Api.getAyuntamientoById(id).then((response) => {
        this.ayuntamiento = response.data.data
      })
    },

    getEmpleadoById(id) {
      Api.getEmpleadoByID(id).then((response) => {
        this.empleado = response.data.data
        this.empleado.fechaIngreso = this.formatDate(this.empleado.fechaIngreso)
        this.empleado.fechaNacimiento = this.formatDate(
          this.empleado.fechaNacimiento,
        )
        this.imageUrl = `${process.env.VUE_APP_API_URL}/api/files/public/${
        this.empleado.idImagenPerfil ?? -1
      }`
        this.getAyuntamientobyId(response.data.data.ayuntamientoId)
      })
    },
    lookInfo(param) {
      return (
        param.split('.').reduce((acc, item) => acc?.[item], this.empleado) ??
        '&nbsp;'
      )
    },

  },
  mounted() {
    this.getEmpleadoById(this.empleadoId)
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
.title label {
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
  text-decoration: underline;
}
</style>
