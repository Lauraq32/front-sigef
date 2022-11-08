/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/RegistroPersonalServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('RegistroPersonal', () => {
    const registroPersonal = ref([

    ])


    //const name = ref('Eduardo')
    const getRegistroPersonals = computed(() => registroPersonal)

    function getRegistroPersonal() {
        Api.getAllEmpleado().then((response) => {
            registroPersonal.value = response.data.data
        })
    }

    function addRegistroPersonal(data) {
        Api.postEmpleado(data).then((response) => {
            console.log(response)
        })
    }

    function putRegistroPersonal(data) {
        Api.putEmpleado(data).then((response) => {
            console.log(response)
        })
    }

    return { registroPersonal, getRegistroPersonal, getRegistroPersonals, addRegistroPersonal, putRegistroPersonal }
})