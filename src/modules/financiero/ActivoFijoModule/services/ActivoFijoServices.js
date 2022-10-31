import http from '@/Api/http-common'

class ActivoFijoServices {

    //CATEGORIA
    getAllCategoria() {
        return http.get('Categoria')
    }
    postCategoria(data) {
        return http.post('Categoria',data)
    }
    getCategoriaByID(id) {
        return http.get(`Categoria/${id}`)
    }
    editCategoria(id) {
        return http.put(`Categoria/${id}`)
    }

  

}

export default new ActivoFijoServices()
