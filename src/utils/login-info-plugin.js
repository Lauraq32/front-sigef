import { inject, reactive } from "vue";
import { clearLoggedInfo,  getFiscalYearId, getLoggedInfo, getAyuntamientoId, fiscalYearInfo } from "./logged-info";

export function loggedInfo(app) {
    const info = reactive({
        get fiscalYearId() {
            return getFiscalYearId()
        },
        get ayuntamientoId() {
            return getAyuntamientoId()
        },
        get loggedInfo() {
            return getLoggedInfo()
        },
        get isFiscalYearCloseOrApproved() {
            const data = fiscalYearInfo();
            return /cerrado/i.test(data?.estatus) || data?.esAprobado;
        },
        get isFiscalYearClosed() {
            const data = fiscalYearInfo();
            return /cerrado/i.test(data?.estatus);
        }
    });

    app.config.globalProperties.$fiscalYearId = info.fiscalYearId;
    app.config.globalProperties.$ayuntamientoId = info.ayuntamientoId;
    app.config.globalProperties.$loggedInfo = info.loggedInfo;

    
    app.config.globalProperties.$logout = clearLoggedInfo;

    app.provide('LoginInfo', info);
}

export function useLoginInfo() {
   return inject('LoginInfo');
}