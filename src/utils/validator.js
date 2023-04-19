export function onlyLetter(event) {
    if(!(/[a-z]+/i.test(event.key))) {
        event.preventDefault();
        return false;
    }
}

export function onlyNumber(event) {
    if(!(/[0-9]+/.test(event.key))) {
        event.preventDefault();
        return false;
    }
}

export function onlyDecimal(event) {
    const value = !event.target.value ? event.key : `${event.target.value}${event.key}`;
    if(!(/^[0-9]+\.?\d*?$/.test(value)) || (event.key === '.' && event.target.value.indexOf('.') > -1)) {
        event.preventDefault();
        return false;
    }
}

export function maxLength(maxLen, callback) {
    return (event) => {
        if (event.target.value.length > maxLen) {
            return false;
        }

        return callback(event);
    };
}