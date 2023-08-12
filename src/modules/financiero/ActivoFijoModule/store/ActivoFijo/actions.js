import Api from '../../services/FormulacionServices';
import {
	getAyuntamientoId,
	getFiscalYearId,
} from '../../../../../utils/logged-info';

export const getClasificadores = async ({ commit }) => {
	Api.getListarClasificadores().then(() => {
		commit('SET_CLASIFICADORES', []);
	});
};
export const getFuenteEspecifica = async ({ commit }) => {
	Api.getFuenteEspecifica().then((response) => {
		commit('SET_FUENTES_ESPECIFICAS', response.data);
	});
};
export const getListarFuentesFinanciamiento = async ({ commit }) => {
	Api.getListarFuentesFinanciamiento().then((response) => {
		commit('SET_FUENTES_FINANCIAMIENTO', response.data);
	});
};
export const getOrganismos = async ({ commit }) => {
	Api.getListarFinancieroCatalogoOrganismos().then((response) => {
		commit('SET_ORGANISMO', response.data);
	});
};
export const getEstructurasProgramaticas = async ({ commit }) => {
	Api.getListarEstructuraProgramatica().then((response) => {
		commit('SET_ESTRUCTURAS_PROGRAMATICAS', response.data);
	});
};

export const getProyectos = async ({ commit }) => {
	Api.getListarProyecto().then((response) => {
		commit('SET_PROYECTOS', response.data);
	});
};
export const getClasificador = async ({ commit }, clasificador) => {
	Api.getClasificador(clasificador).then((response) => {
		commit('SET_CLASIFICADOR', response.data);
	});
};
export const PostIngreso = async ({ commit }, data) => {
	Api.createIngreso(data).then((response) => {
		commit('SET_INGRESO', response);
	});
};
export const getListarIngresos = async ({ commit }) => {
	Api.getListarIngresos(getAyuntamientoId(), getFiscalYearId()).then(
		(response) => {
			commit('SET_INGRESOS', response.data);
		},
	);
};
