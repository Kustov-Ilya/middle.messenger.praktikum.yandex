//TODO delete unused

type Indexed<T = unknown> = {
  [key in string]: T;
};

export function isType<T extends Record<string, string>>(
  obj: Record<string, string>,
  keys: Readonly<Array<string>>
): obj is T {
  return keys.every((key) => obj[key]);
}

export function trim(str: string, symbols = "\\s"): string {
  const regexLeft = new RegExp(`^[${symbols}]*`, "g");
  const regexRight = new RegExp(`[${symbols}]*$`, "g");
  return str.replace(regexLeft, "").replace(regexRight, "");
}

export function isObject(item: unknown): item is object {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

export function isArray<T = unknown>(item: unknown): item is T[] {
  return Array.isArray(item);
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const stack = [[lhs, rhs]];
  while (stack.length) {
    const [target, source] = stack.pop() as Indexed[];
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        stack.push([target[key] as Indexed, source[key] as Indexed]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return lhs;
}
export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (!isObject(object) || object === null) return object;
  if (typeof path !== "string") throw new Error("path must be string");
  const p = path.split(".");
  const lastIndex = p.length - 1;

  p.reduce((acc, i, index) => {
    if (lastIndex == index) {
      Object.assign(acc, { [i]: value });
    } else {
      if (!acc[i]) Object.assign(acc, { [i]: {} });
    }
    return acc[i] as Indexed;
  }, object as Indexed);
  return object;
}

export function isEqual(x: unknown, y: unknown): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stack: any = [[x, y]];
  while (stack.length) {
    const [a, b] = stack.pop();

    if (typeof a == "object" && a && typeof b == "object" && b) {
      if (Object.keys(a).length != Object.keys(b).length) return false;

      for (const prop in a) {
        if (Object.hasOwnProperty.call(b, prop)) {
          stack.push([a[prop], b[prop]]);
        } else return false;
      }
    } else if (a !== b) {
      return false;
    }
  }
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cloneDeep(obj: { [key: string]: any }): unknown {
  if (obj === null) return null;
  const clone = Object.assign({}, obj);
  for (const key in clone) {
    clone[key] = typeof obj[key] === "object" ? cloneDeep(obj[key]) : obj[key];
  }
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone as []);
  }
  return clone as unknown;
}

export default function queryStringify(data: Record<string, unknown> = {}) {
  const pairs: string[] = [];

  Object.keys(data).forEach((key) => {
    pairs.push(`${key}=${data[key]}`);
  });
  return pairs.length ? "?" + pairs.join("&") : "";
}

export function dateFormat(date: Date | string): string {
  if (!date) return "";
  const formatedDate = new Date(date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatedDate.slice(0, formatedDate.length - 3);
}

export function timeFormat(date: Date | string): string {
  return new Date(date).toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });
}
