import http from '@/Api/http-common';
import { filter } from '@/utils/validator';
class Administrativo {
	getUsuarioList(params) {
		return http.get(`Users${filter(params)}`);
	}

	getUsuariosById(id) {
		return http.get(`Users/${id}`);
	}

	getAyuntamiento(id) {
		return http.get(`ayuntamientos/${id}`);
	}

	getAllEmpleado(filter = {}) {
		const params = Object.keys(filter).map(
			(key) => `${key}=${filter[key]}`,
		);
		return http.get(
			`empleados${params.length ? '?' + params.join('&') : ''}`,
		);
	}

	getEmpleadoByID(id) {
		return http.get(`empleados/${id}`);
	}

	getDepartamentoById(id) {
		return http.get(`departamentos/${id}`);
	}

	postUsuario(data) {
		return http.post('Users/register', data);
	}

	putUsuario(id, data) {
		return http.put(`Users/${id}`, data);
	}

	putUsuarioPassWord(id, data) {
		return http.put(`Users/${id}/change-password`, data);
	}

	cancelarUsuario(id) {
		return http.patch(`Users/${id}/inactivado`);
	}
	reactivarUsuario(id) {
		return http.patch(`Users/${id}/activado`);
	}
	resetPassWord(id) {
		return http.patch(`Users/${id}/Password`);
	}
}

export default new Administrativo();
