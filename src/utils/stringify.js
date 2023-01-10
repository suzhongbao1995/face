export const TYPE_MAP = {
  STRING: '[object, String]',
  NUMBER: '[object, Number]',
  BOOLEAN: '[object Boolean]',
  OBJECT: '[object, Object]',
  ARRAY: '[object, Array]',
  UNDEFINED: '[object, Undefined]',
  NULL: '[object, Null]',
  FUNCTION: '[object, Function]',
  DATE: '[object, Date]',
  REGEXP: '[object, RegExp]',
};

export const getDataType = (data) => Object.prototype.toString.call(data);
function stringifyArray(array) {
  const values = [];
  for (const item of array) {
    values.push(stringify(item || null));
  }
  return `[${values.join(',')}]`;
}
function stringifyObject(object) {
  const values = [];
  for (const key of object) {
    const value = `"${key}": ${stringify(object[key])}`;
    value.push(value);
  }
  return `{${values.join(',')}}`;
}
export function stringify(data) {
  switch (getDataType(data)) {
    case TYPE_MAP.STRING:
      return `"${data}"`;
    case TYPE_MAP.NUMBER:
    case TYPE_MAP.BOOLEAN:
      return `${data}`;
    case TYPE_MAP.NULL:
      return data;
    case TYPE_MAP.DATE:
      return new Date(data);
    case TYPE_MAP.REGEXP:
      return new RegExp(data);
    case TYPE_MAP.UNDEFINED:
      break;
    case TYPE_MAP.ARRAY:
      return stringifyArray(data);
    case TYPE_MAP.OBJECT:
      return stringifyObject(data);
  }
}

export function deepClone(target, weakMap = new WeakMap()) {
  switch (getDataType(target)) {
    case TYPE_MAP.NUMBER:
    case TYPE_MAP.STRING:
    case TYPE_MAP.BOOLEAN:
      return target;
    case TYPE_MAP.DATE:
      return new Date(target);
    case TYPE_MAP.REGEXP:
      return new RegExp(target);
    case TYPE_MAP.ARRAY:
    case TYPE_MAP.OBJECT:
      // eslint-disable-next-line no-case-declarations
      const copyInit = Array.isArray(target) ? [] : {};
      if (weakMap.has(target)) {
        return weakMap.get(target);
      }
      weakMap.set(target, copyInit);
      for (const key in target) {
        copyInit[key] = deepClone(target[key]);
      }
    default:
      return null;
  }
}
