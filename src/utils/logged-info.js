const LOCAL_LOGGED_INFO_KEY = "AUTH";
export function getLoggedInfo() {
    const data = localStorage.getItem(LOCAL_LOGGED_INFO_KEY);
    if (data) {
        return JSON.parse(data);
    }
}

export function setLoggedInfo(data) {
    localStorage.setItem(LOCAL_LOGGED_INFO_KEY, JSON.stringify(data));
}

export function clearLoggedInfo() {
    localStorage.removeItem(LOCAL_LOGGED_INFO_KEY);
}

export function getAyuntamientoId() {
    const loggedInfo = getLoggedInfo();
    return Number(loggedInfo?.user?.ayuntamiento?.id) ?? undefined;
}

export function getFiscalYearId() {
    const loggedInfo = getLoggedInfo();
    return  Number(loggedInfo?.currentFiscalYearId) ?? undefined;
}

export function isAuthenticated() {
    return Boolean(getLoggedInfo());
}
