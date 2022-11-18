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

<<<<<<< HEAD
  getDepreciacion() {
    return http.get('Depreciacion')
=======
  getAllConduce() {
    return http.get('Conduce')
  }

  getConduceByID(id) {
    return http.get(`Conduce/${id}`)
>>>>>>> alfredo/T-Condensado
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

<<<<<<< HEAD
  postDepreciacion(data) {
    return http.post('Depreciacion', data)
=======
  postConduce(data) {
    return http.post('Conduce', data)
>>>>>>> alfredo/T-Condensado
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

  putMarca(id, data) {
    return http.put(`Marca/${id}`, data)
  }

  putArea(id, data) {
    return http.put(`Area/${id}`, data)
  }

<<<<<<< HEAD
  putActivo(id, data) {
    return http.put(`Activo/${id}`, data)
=======
  putConduce(id, data) {
    return http.put(`Conduce/${id}`, data)
>>>>>>> alfredo/T-Condensado
  }
}

export default new ActivoFijoServices()
