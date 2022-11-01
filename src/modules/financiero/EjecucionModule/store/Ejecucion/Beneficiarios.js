/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/EjecucionServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Beneficiarios', () => {
    const Beneficiarios = ref([

    ])


    //const name = ref('Eduardo')
    const getBeneficiario = computed(() => Beneficiarios)

    function getBeneficiarios() {
        Api.getBeneficiarios().then((response) => {
            Beneficiarios.value = response.data
        })
    }

    function addBeneficiarios(data) {
        Api.postBeneficiarios(data).then((response) => {
            console.log(response)
        })
    }

    function putBeneficiarios(data) {
        Api.putBeneficiarios(data).then((response) => {
            console.log(response)
        })
    }

    return { Beneficiarios, getBeneficiario, getBeneficiarios, addBeneficiarios, putBeneficiarios }
})