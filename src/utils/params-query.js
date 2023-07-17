export function CreateQueryParam(params) {
    const paramsArray = Object.keys(params).reduce((array, key) => {
        if(!params[key]) return array;
        array.push(`${key}=${params[key]}`);
        return array;
    }, []);
    return paramsArray.join("&");
}