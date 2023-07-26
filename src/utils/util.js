import configuraciones from './configuraciones';

export async function showReport(params) {
    const fileUrl =  await configuraciones.getReport(params);
    const reportTab = window.open(
        fileUrl,
        "_blank",
        "toolbar=no,menubar=no,scrollbars=yes,resizable=yes,status=no,width=800,height=800,left=100px"
    )

    const keyInterval = setInterval((url) => {
        if (reportTab.closed) {
            URL.revokeObjectURL(url);
            clearInterval(keyInterval);
        }
    }, 20_000, fileUrl);

    return fileUrl;
}