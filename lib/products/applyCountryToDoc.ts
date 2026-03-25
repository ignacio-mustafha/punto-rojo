import type { CountryCode } from "@/lib/country-context";
import type { ProductDocResponse } from "@/lib/types/product-doc";

const replaceJsonCountry = (input: string, target: CountryCode) =>
  input.replace(/("country"\s*:\s*")CO(")/g, `$1${target}$2`);

const replaceQueryCountry = (input: string, target: CountryCode) =>
  input.replace(/\bcountry=CO\b/g, `country=${target}`);

const replaceHyphenCountrySuffix = (input: string, target: CountryCode) =>
  input.replace(/-CO\b/g, `-${target}`);

const replaceCurrency = (input: string, target: CountryCode) => {
  if (target === "MX") return input.replace(/"currency"\s*:\s*"COP"/g, `"currency": "MXN"`);
  return input;
};

export function applyCountryToDoc(
  doc: ProductDocResponse,
  target: CountryCode
): ProductDocResponse {
  if (target === "CO") return doc;

  const transform = (s: string | null | undefined): string | null | undefined => {
    if (!s) return s;

    let out = s;
    out = replaceJsonCountry(out, target);
    out = replaceQueryCountry(out, target);
    out = replaceHyphenCountrySuffix(out, target);
    out = replaceCurrency(out, target);
    return out;
  };

  const snippets = doc.snippets
    ? {
        curl: transform(doc.snippets.curl),
        javascript: transform(doc.snippets.javascript),
        python: transform(doc.snippets.python),
      }
    : null;

  return {
    ...doc,
    snippets,
    responseExample: transform(doc.responseExample) ?? doc.responseExample,
  };
}
