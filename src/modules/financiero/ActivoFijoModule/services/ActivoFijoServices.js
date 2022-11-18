import http from '@/Api/http-common'

class ActivoFijoServices {
  //get
  getAllCategoria() {
    return http.get('Categoria')
  }

  getCategoriaByID(id) {
    return http.get(`Categoria/${id}`)
  }

  getAllMarca() {
    return http.get('Marca')
  }

  getMarcaByID(id) {
    return http.get(`Marca/${id}`)
  }

  getAllArea() {
    return http.get('Area')
  }

  getAreaByID(id) {
    return http.get(`Area/${id}`)
  }
  //post

  postCategoria(data) {
    return http.post('Categoria', data)
  }

  postMarca(data) {
    return http.post('Marca', data)
  }

  postArea(data) {
    return http.post('Area', data)
  }

  //put
  editCategoria(id, data) {
    return http.put(`Categoria/${id}`, data)
  }

  putMarca(id,data) {
    return http.put(`Marca/${id}`,data)
  }

  putArea(id, data) {
    return http.put(`Area/${id}`, data)
  }
}

export default new ActivoFijoServices()
