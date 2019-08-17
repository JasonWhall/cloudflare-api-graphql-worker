// Unfortunately Cloudflare do not return LogPull data in a valid JSON Array.
export const transformLogData = async response => {

  const responseText = await response.text()

  const strToObjArray = string => {
    const strArr = string.trim().split("\n")

    return strArr.map(obj => {
      try {
        return JSON.parse(obj)
      }
      catch (e) {
        console.error(e)
      }
    })
  }

  // Handle Error responses from API
  return response.status >= 400
    ? new Error(responseText)
    : strToObjArray(responseText)
    
}
