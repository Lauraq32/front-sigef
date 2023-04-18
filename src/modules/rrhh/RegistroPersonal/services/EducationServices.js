

import http from '@/Api/http-common'

class EducationServices {

  getEmployeeById(id) {
    return http.get(`employee-education?employeeId=${id}`)
  }
  getEmployeeById(data) {
    return http.post(`employee-education`,data)
  }
  getEmployeeById(id,data) {
    return http.put(`employee-education/${id}`,data)
  }

}

export default new EducationServices()