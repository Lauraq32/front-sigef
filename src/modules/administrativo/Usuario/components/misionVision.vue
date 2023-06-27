<template>
    <div class="app">
        <div class="parent-div pb-4 text-center">
            <h2 class="title">Misión y Visión</h2>

            <div class="child-div mt-4">
                <h5 class="subtitle text-start">Misión</h5>
                <textarea class="form-control" v-model="propuestaDeclaratoria.mision" rows="3"></textarea>
            </div>

            <div class="child-div mt-4">
                <h5 class="subtitle text-start">Visión</h5>
                <textarea class="form-control" v-model="propuestaDeclaratoria.vision" rows="3"></textarea>
            </div>

            <div class="text-end mt-4">
                <button class="btn btn-info me-2" @click="putMisionVision()">Guardar</button>
                <button class="btn btn-secondary">Imprimir</button>
            </div>

        </div>
    </div>
</template>
  
<script>
import Api from '../services/AdministrativoServices'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'

export default {
    name: 'misionVision',

    data: () => {
        return {

            propuestaDeclaratoria: {
                mision: "string",
                vision: "string",
            }
        }
    },
    mounted() {
        this.getMissionVission()

    },

    methods: {
        ...mapActions(useToastStore, ['show']),
        getMissionVission() {
            Api.getMisionVision().then((response) => {
                this.propuestaDeclaratoria = response.data.data
                console.log(this.mision)
            })
        },

        putMisionVision() {
            Api.putMisionVision(this.propuestaDeclaratoria.id, this.propuestaDeclaratoria).then(() => {
                this.show({
                    content: 'Registro actualizado correctamente',
                    closable: true,
                    life: 15000,
                })
            })
        }


    }

}

</script>