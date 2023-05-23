export const load = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return null
    }
}

export const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const remove = (key, value) => {
  localStorage.removeItem(key, JSON.stringify(value))
}