export const makeApiUrl = (path: string): string => {
  const apiUrl = process.env.API_URL

  return `${apiUrl}${path}`
}
