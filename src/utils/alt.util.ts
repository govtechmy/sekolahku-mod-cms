export function getAltFromFilename(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.')

  return lastDotIndex > 0 ? filename.slice(0, lastDotIndex) : filename
}
