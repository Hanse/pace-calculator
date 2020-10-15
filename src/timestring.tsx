const CONVERSION = {
  ms: 0.001,
  s: 1,
  m: 60,
  h: 3600,
};

const UNITS = {
  s: /^(s|sec|secs|second|seconds)(.+)?$/i,
  m: /^(m|min|mins|minute|minutes)(.+)?$/i,
  h: /^(h|ho|hou|hour|hours|hr|hrs)(.+)?$/i,
};

export default function parse(input: string) {
  const groups = input
    .toLowerCase()
    .replace(/[^.\w+-]+/g, '')
    .match(/[-+]?[0-9.]+[a-z]+/g);

  if (groups == null) {
    return 0;
  }

  return groups.reduce((totalSeconds, group) => {
    const [, value, unit] = group.match(/([\d.]+)(\w+)/) || [];

    const unitKey = getUnitKey(unit);

    return (
      totalSeconds + (unitKey ? parseFloat(value) * CONVERSION[unitKey] : 0)
    );
  }, 0);
}

function getUnitKey(unit: string) {
  for (const key of Object.keys(UNITS)) {
    if (UNITS[key as keyof typeof UNITS].test(unit)) {
      return key as keyof typeof UNITS;
    }
  }

  return null;
}
