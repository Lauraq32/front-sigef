import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Registro', () => {
  const registroPersonal = ref([
    {
      id: 0,
      Apellido: 'Carmona Tejeda',
      Nombre: 'Randolph',
      Cédula: '402-3045320-7',
      Código: '7878',
      Programa: 'Programa Prueba',
      'Direccion o Dependencia': 'Dereccion Prueba',
      Cargo: 'Tecnico en Programacion',
      'Fecha de ingreso': 'x/xx/xxxx',
      'Fecha de nacimiento': '10/02/2001',
      Edad: '58',
      Sexo: 'Masculino',
      Sueldo: '$0.00',
    },
  ])

  const is_loading = true
  //const name = ref('Eduardo')
  const getAllPersonal = computed(() => registroPersonal)

  function addPersonal(data) {
    registroPersonal.value.push(data)
  }

  return { registroPersonal, addPersonal, getAllPersonal, is_loading }
})
