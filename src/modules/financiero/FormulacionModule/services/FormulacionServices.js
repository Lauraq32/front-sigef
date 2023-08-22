import http from '@/Api/http-common';
import { getAyuntamientoId, getFiscalYearId } from '@/utils/logged-info';

class FormulacionApi {
	downloadIngreso() {
		return http.get(`export-file/ingresos-formulacion`);
	}

	//-----------------------------CLASIFICADORES---------------------------------------//
	//Obtener listado de Clasificadores
	getListarClasificadores(origin) {
		let promise = null;
		if (origin === 'gastos') {
			promise = http.get('/CtgClasificador/presupuesto-gastos');
		} else if (origin === 'ingresos') {
			promise = http.get('/CtgClasificador/presupuesto-ingresos');
		} else {
			promise = http.get('/CtgClasificador');
		}

		return promise.then((res) => {
			if (res.data.data.length > 0) {
				return res;
			}

			return Promise.reject('No clasificadores found');
		});
	}
	getListarOrganismo() {
		return http.get('/CtgOrganismoFinanciador');
	}
	getListarInsOtorgante() {
		return http.get('/instituciones-otorgantes');
	}

	getEstProgramatica() {
		return http.get('CtgMestProg');
	}

	deleteIngreso(id) {
		return http.delete(`PresIngreso/${id}`);
	}

	getClasificador(Clasificador) {
		return http.get(`PresIngreso/GetClasificadorById/${Clasificador}`);
	}
	getPresIngresoById(item) {
		return http.get(
			`/PresIngreso/${item.id}?anio=${item.anioFiscalId}&ayuntamientoId=${item.ayuntamientoId}`,
		);
	}

	editPresIngreso(id, data) {
		return http.put(`/PresIngreso/${id}`, data);
	}

	postFormulacionIngreso(data) {
		return http.post('PresIngreso', data);
	}

	getAllFormulacionIngreso(anioFiscal, ayuntamientoId) {
		return http.get(
			`PresIngreso?anio=${anioFiscal}&AyuntamientoId=${ayuntamientoId}`,
		);
	}

	updateFormulacion(id, data) {
		return http.put(`PresGasto/${id}`, data);
	}

	updateFormulacionDetalle(id, data) {
		return http.put(`PresGasto/Detalle/${id}`, data);
	}

	getDetalle(id) {
		return http.get(
			`PresGasto/Detalle/${id}?anio=${getFiscalYearId()}&ayuntamientoId=${getAyuntamientoId()}`,
		);
	}

	getTotalIngresos(ano_fiscal, id_ayuntamiento) {
		return http.get(
			`/PresIngreso/GetTotal?anio=${ano_fiscal}&ayuntamientoId=${id_ayuntamiento}`,
		);
	}

	getListarEstructuraProgramatica() {
		return http.get('/Financiero/ListarProgramatico');
	}

	getFuenteEspecifica() {
		return http.get('/CtgFuente');
	}

	getFuente() {
		return http.get('/CtgFuenteEspecifica');
	}

	getListarFuentesFinanciamiento() {
		return http.get('/Financiero/ListarFuentes');
	}

	getListarFinancieroCatalogoOrganismos() {
		return http.get('/Financiero/ListarFinancieroCatalogoOrganismos');
	}

	getListarProyecto(id_ayuntamiento, ano_fiscal) {
		return http.get(
			`/Financiero/ListarProyecto/?ano=${ano_fiscal}&id=${id_ayuntamiento}`,
		);
	}

	getListarIngresos(id_ayuntamiento, ano_fiscal) {
		return http.get(
			`PresIngreso?anio=${ano_fiscal}&ayuntamientoId=${id_ayuntamiento}`,
		);
	}

	getListarCatalogo() {
		return http.get('/Financiero/ListarCatalogoFunciones');
	}

	getListarGastos() {
		return http.get(
			`PresGasto?anio=${getFiscalYearId()}&ayuntamientoId=${getAyuntamientoId()}`,
		);
	}

	getListarGastosById(id) {
		return http.get(
			`PresGasto/${id}?anio=${getFiscalYearId()}&ayuntamientoId=${getAyuntamientoId()}`,
		);
	}
	getFileById(id) {
		return http.get(`file/${id}`);
	}

	postGastos(post) {
		return http.post(`PresGasto`, post);
	}

	postCargaMasiva(post) {
		return http.post(`UploadFile/PresIngreso`, post);
	}

	postCargaMasivaCabecera(post) {
		return http.post(`UploadFile/PresGasto`, post);
	}

	postCargaMasivaDetalle(post) {
		return http.post(`UploadFile/PresGasto/Detalle`, post);
	}

	cargarEstructuras() {
		return http.post(
			`PresGasto/InsertPresGasto?anio=${getFiscalYearId()}&ayuntamientoId=${getAyuntamientoId()}`,
		);
	}

	postDetalleGasto(post) {
		return http.post(`PresGasto/Detalle`, post);
	}

	getEstruturaProgramaticaById(value) {
		return http.get(`CtgMestProg/${value}`);
	}

	validarEstructuraPresupuestada(
		estructuraProgramatica,
		clasificador,
		fuenteFinanciador,
		fuenteEspecifica,
		organismoFinanciador,
	) {
		return http.get(
			`PresGasto/${estructuraProgramatica}/${clasificador}/${fuenteFinanciador}/${fuenteEspecifica}/${organismoFinanciador}`,
		);
	}
}

export default new FormulacionApi();
