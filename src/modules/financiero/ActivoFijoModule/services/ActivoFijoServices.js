import http from '@/Api/http-common'

class ActivoFijoServices {
  //get

  getAllActivo() {
    return http.get('Activo')
  }

  getActivoByID(id) {
    return http.get(`Activo/${id}`)
  }

  getAllCategoria() {
    return http.get('Categoria')
  }

  getCategoriaByID(id) {
    return http.get(`Categoria/${id}`)
  }

  getDepreciacion() {
    return http.get('Depreciacion')
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

  postActivo(data) {
    return http.post('Activo', data)
  }

  postCategoria(data) {
    return http.post('Categoria', data)
  }

  postDepreciacion(data) {
    return http.post('Depreciacion', data)
  }

  postMarca(data) {
    return http.post('Marca', data)
  }

  postArea(data) {
    return http.post('Area', data)
  }

  //put
  editCategoria(id) {
    return http.put(`Categoria/${id}`)
  }

  putMarca(id, data) {
    return http.put(`Marca/${id}`, data)
  }

  putArea(id, data) {
    return http.put(`Area/${id}`, data)
  }

  putActivo(id, data) {
    return http.put(`Activo/${id}`, data)
  }
}

export default new ActivoFijoServices()
