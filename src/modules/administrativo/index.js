import state from './Usuario/store/Administrativo/state';
import * as actions from './actions';
import * as mutations from './Usuario/store/Administrativo/mutations';

const AdministrativoModule = {
	namespaced: true,
	actions,
	mutations,
	state,
};

export default AdministrativoModule;
