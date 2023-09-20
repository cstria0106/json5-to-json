import JSON5 from 'json5';
import toml from '@iarna/toml';
import yaml from 'js-yaml';

export const formats = ['json', 'json5', 'toml', 'yaml'] as const;
export type Format = (typeof formats)[number];

const parsers: Record<Format, (source: string) => any> = {
  json: (s) => JSON.parse(s),
  json5: (s) => JSON5.parse(s),
  toml: (s) => toml.parse(s),
  yaml: (s) => yaml.load(s),
};

const stringifies: Record<Format, (data: any) => string> = {
  json: (o) => JSON.stringify(o, undefined, 2),
  json5: (o) => JSON5.stringify(o, undefined, 2),
  toml: (o) => toml.stringify(o),
  yaml: (o) => yaml.dump(o, { indent: 2 }),
};

export function getParser(format: Format) {
  return parsers[format];
}

export function getStringify(format: Format) {
  return stringifies[format];
}
