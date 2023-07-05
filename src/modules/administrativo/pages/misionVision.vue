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
                <button class="btn btn-secondary" @click="printReportMisionVision">Imprimir</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import Api from '../services/AdministrativoServices'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import { showReport } from '@/utils/util'

export default {
    name: 'misionVision',
    data: () => {
        return {
            propuestaDeclaratoria: {
                mision: "",
                vision: "",
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
                if(response.data.data){
                    this.propuestaDeclaratoria = response.data.data
                }
            })
        },
        putMisionVision() {
            if (this.propuestaDeclaratoria.id) {
                Api.putMisionVision(this.propuestaDeclaratoria.id, this.propuestaDeclaratoria).then(() => {
                    this.show({
                        content: 'Registro actualizado correctamente',
                        closable: true,
                        life: 15000,
                    })
                }).catch((error) => {
                    this.show({
                        content: error.response.data,
                        closable: true,
                        color: 'danger',
                        class: 'text-white',
                    })
                })
            }
            else {
                Api.postMisionVision(this.propuestaDeclaratoria).then(() => {
                    this.show({
                        content: 'Registro agregado correctamente',
                        closable: true,
                        life: 15000,
                    })
                }).catch((error) => {
                    this.show({
                        content: error.response.data,
                        closable: true,
                        color: 'danger',
                        class: 'text-white',
                    })
                })
            }
        },

        async printReportMisionVision(item) {
            try {
                await showReport({
                    folderName: 'fep',
                    reportName: 'Rep_FP01_Mision_y_Vision',
                    params: [
                        {
                            name: 'ANO',
                            value: "fiscalYear",
                        },
                        {
                            name: 'CAPITULO_AYTO',
                            value: 'majorityId',
                        },
                    ],
                })
            }
            catch (error) {
                this.show({
                    content: error,
                    closable: true,
                    color: 'danger',
                    class: 'text-white',
                })
            }
        },
    }
}

</script>