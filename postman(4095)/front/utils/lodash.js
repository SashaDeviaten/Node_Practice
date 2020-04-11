export function get( object, path, defaultVal = '' ){
    const keys = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, '.$2').split('.');
    object = object[keys[0]];

    return object && keys.length > 1
        ? get(object, keys.slice(1), defaultVal)
        : object === undefined
            ? defaultVal
            : object;
}

export function set( object, path, val ){
    const keys = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, '.$2').split('.');
    if( keys.length>1 ){
        object[keys[0]] = object[keys[0]] || {};
        return set( object[keys[0]], keys.slice(1), val );
    }
    object[keys[0]] = val;
}