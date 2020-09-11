// 本地存储配置文件可以在该文件添加localStorage、sessionStorage以及IndexDB配置

const getStorage = (name = 'user', stroageType = localStorage) => {
  const  storageData = stroageType.getItem(name);
  if (!storageData) {
    return null
  }
  const data = JSON.parse(storageData)
  return data
}

const getLocalStorage = (name = 'user', stroageType = localStorage) => getStorage(name, stroageType)
const getSessionStorage = (name = 'user', stroageType = sessionStorage) => getStorage(name, stroageType)

const setStorage = (value: string, name = 'user', stroageType = localStorage) => {
  const  storageData = stroageType.getItem(name);
  if (!storageData) {
    return
  }
  let data = JSON.stringify(value)
  stroageType.setItem(name, data)
}

const setLocalStorage = (value: string, name = 'user', stroageType = localStorage) => setStorage(value, name, stroageType)
const setSessionStorage = (value: string, name = 'user', stroageType = sessionStorage) => setStorage(value, name, stroageType)

const removeStorage = (name = 'user', stroageType = localStorage) => {
  stroageType.removeItem(name);
}

const removeLocalStorage = (name = 'user', stroageType = localStorage) => removeStorage(name, stroageType)
const removeSessionStorage = (name = 'user', stroageType = sessionStorage) => removeStorage(name, stroageType)

const removeAll = (stroageType = localStorage) => {
  stroageType.clear();
}

const removeAllLocalStorage = (stroageType = localStorage) => removeAll(stroageType)
const removeAllSessionStorage = (stroageType = sessionStorage) => removeAll(stroageType)

export {
  getStorage,
  getLocalStorage,
  getSessionStorage,
  setStorage,
  setLocalStorage,
  setSessionStorage,
  removeStorage,
  removeLocalStorage,
  removeSessionStorage,
  removeAll,
  removeAllLocalStorage,
  removeAllSessionStorage
}
