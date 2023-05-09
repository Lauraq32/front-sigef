const LOCAL_LOGGED_INFO_KEY = "AUTH";
export function getLoggedInfo() {
    const data = sessionStorage.getItem(LOCAL_LOGGED_INFO_KEY);
    if (data) {
        return JSON.parse(data);
    }
}

export function setLoggedInfo(data) {
    sessionStorage.setItem(LOCAL_LOGGED_INFO_KEY, JSON.stringify(data));
}

export function clearLoggedInfo() {
    sessionStorage.removeItem(LOCAL_LOGGED_INFO_KEY);
}

export function getAyuntamientoId() {
    const loggedInfo = getLoggedInfo();
    return Number(loggedInfo?.user?.ayuntamiento?.id) ?? undefined;
}

export function getFiscalYearId() {
    const loggedInfo = getLoggedInfo();
    return  Number(loggedInfo?.currentFiscalYearId) ?? undefined;
}

export function fiscalYearInfo() {
    const fiscalYearId = getFiscalYearId();
    const loggedInfo = getLoggedInfo();
    return loggedInfo.fiscalListYears.find(fy => fy.id === fiscalYearId);
}

export function isAuthenticated() {
    return Boolean(getLoggedInfo());
}
