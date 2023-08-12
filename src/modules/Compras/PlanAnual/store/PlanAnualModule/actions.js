import Api from '../../services/FormulacionServices';

export const getUsuarios = async ({ commit }) => {
	Api.getUsuarioList().then((response) => {
		commit('SET_USUARIOS', response.data);
	});
};
