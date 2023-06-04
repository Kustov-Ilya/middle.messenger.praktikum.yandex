export default function queryStringify(data: Record<string, unknown> = {}) {
  const pairs: string[] = [];

  Object.keys(data).forEach((key) => {
    pairs.push(`${key}=${data[key]}`);
  });
  return pairs.length ? "?" + pairs.join("&") : "";
}
