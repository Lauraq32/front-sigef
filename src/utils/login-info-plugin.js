import { reactive } from "vue";
import { clearLoggedInfo,  getFiscalYearId, getLoggedInfo, getAyuntamientoId } from "./logged-info";

export function loggedInfo(app) {
    const info = reactive({
        fiscalYearId: getFiscalYearId(),
        ayuntamientoId: getAyuntamientoId(),
        loggedInfo: getLoggedInfo()
    });

    console.log(info);

    app.config.globalProperties.$fiscalYearId = info.fiscalYearId;
    app.config.globalProperties.$ayuntamientoId = info.ayuntamientoId;
    app.config.globalProperties.$loggedInfo = info.loggedInfo;

    
    app.config.globalProperties.$logout = clearLoggedInfo;
}