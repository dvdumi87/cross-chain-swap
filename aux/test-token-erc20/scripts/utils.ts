import { readFileSync, writeFileSync } from 'fs';

export const updateEnvFile = (newRecords: Record<string, string>) => {
  let existingContent = '';
  try {
    existingContent = readFileSync('.env', 'utf8');
  } catch {
    // no problem if the file doesn't exist
  }

  // process existing content
  const processedKeys = new Set<string>();
  const updatedLines = existingContent.split('\n').map(line => {
    if (line.trim().startsWith('#') || line.trim() === '') {
      return line;
    }
    const [key] = line.split('=');
    if (!key) return line;
    const trimmedKey = key.trim();
    if (newRecords[trimmedKey] !== undefined) {
      processedKeys.add(trimmedKey);
      return `${trimmedKey}=${newRecords[trimmedKey]}`;
    }
    return line;
  });
  updatedLines.push('');

  // add new keys
  Object.entries(newRecords).forEach(([key, value]) => {
    if (!processedKeys.has(key)) {
      updatedLines.push(`${key}=${value}`);
    }
  });
  writeFileSync('.env', updatedLines.join('\n') + '\n');
};
