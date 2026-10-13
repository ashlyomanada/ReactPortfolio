import { q as getQuery } from '../nitro/nitro.mjs';

function getEventQuery(event) {
  return getQuery(event.path);
}

const PROBE_ORIGIN = "http://og-image.invalid";
const RE_PERCENT_ESCAPE = /%[\da-f]{2}/i;
const RE_ENCODED_SEPARATOR = /%(?:2f|5c)/i;
function hasReservedPathChar(input) {
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    if (code <= 31 || code === 127 || code === 92 || code === 63 || code === 35)
      return true;
  }
  return false;
}
function err(reason) {
  return { _tag: "Err", reason };
}
function parseSameOriginPath(input) {
  if (typeof input !== "string" || input[0] !== "/" || input[1] === "/")
    return err("The path must start with a single /.");
  if (RE_ENCODED_SEPARATOR.test(input))
    return err("The path must not encode a / or \\.");
  let decoded;
  try {
    decoded = decodeURIComponent(input);
  } catch {
    return err("The path has an invalid percent-encoding.");
  }
  if (RE_PERCENT_ESCAPE.test(decoded))
    return err("The path must be percent-encoded once.");
  if (hasReservedPathChar(decoded))
    return err("The path must not contain ?, #, \\ or control characters.");
  if (decoded.split("/").some((segment) => segment === "." || segment === ".."))
    return err("The path must not contain . or .. segments.");
  let resolved;
  try {
    resolved = new URL(input, PROBE_ORIGIN);
  } catch {
    return err("The path is not a valid URL path.");
  }
  if (resolved.origin !== PROBE_ORIGIN || resolved.search || resolved.hash)
    return err("The path must stay on the same origin.");
  return { _tag: "Ok", value: resolved.pathname };
}

export { getEventQuery as g, parseSameOriginPath as p };
//# sourceMappingURL=ssrf.mjs.map
