

import http from '@/Api/http-common'

class EducationServices {

  getEmployeeById(id) {
    return http.get(`employee-education?employeeId=${id}`)
  }
  postEmployee(data) {
    return http.post(`employee-education`,data)
  }
  putEmployee(data,id) {
    return http.put(`employee-education/${id}`,data)
  }

}

export default new EducationServices()