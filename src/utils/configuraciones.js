import http from '@/Api/http-common';
class configuraciones {
	grupos = {
		nivelEscolar: 3,
		areaTematica: 4,
		Discapacidad: 5,
		Ocupacion: 10,
	};

	getGroupConfiguration(grupoId) {
		return http.get(`grupos/${grupoId}/configuraciones`);
	}

	getReport(params) {
		return http
			.post(`reports`, params, { responseType: 'blob' })
			.then((response) => {
				return URL.createObjectURL(response.data);
			})
			.catch(async ({ response: { data } }) => {
				throw JSON.parse(await data.text());
			});
	}
}

export default new configuraciones();
