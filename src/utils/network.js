import { get } from '../config'

const urlBuild = (url) => {
  const config = get()

  if (!config.apiPrefix) {
    return url
  }

  return `${config.apiPrefix}${url}`
}

export const getSchemes = () => {
  const config = get()

  if (config.ajax) {
    return config.ajax({
      method: 'GET',
      url: urlBuild('/schemas')
    })
  }

  return Promise.reject(new Error('Произошла неизвестная ошибка во время получения списка мнемосхем'))
}

export const storeScheme = ({
  id,
  name,
  data
}) => {
  const config = get()

  if (!name && !id) {
    return Promise.reject(new Error('Не задано имя менмосхемы'))
  }

  if (config.ajax && data) {
    let promise
    if (name) {
      promise = config.ajax({
        method: 'POST',
        url: urlBuild('/schemas'),
        data: {
          title: name,
          content: data,
          createdBy: 'username'
        }
      })
    } else if (id) {
      promise = config.ajax({
        method: 'PUT',
        url: urlBuild(`/schemas/${id}`),
        data: {
          content: data
        }
      })
    }

    if (promise) {
      promise.catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            return Promise.reject(new Error('Мнемосхема не найдена'))
          }
        }
        return Promise.reject(new Error('Не удалось сохранить мнемосхему'))
      })
    }
  }

  return Promise.reject(new Error('Произошла неизвестная ошибка во время сохранения мнемосхемы'))
}

export const getScheme = (id) => {
  const config = get()

  if (config.ajax && id) {
    return config.ajax({
      method: 'GET',
      url: urlBuild(`/schemas/${id}`)
    }).catch(error => {
      if (!error.response) {
        return Promise.reject(new Error('Не удалось загрузить данные'))
      }

      if (error.response.status === 404) {
        return Promise.reject(new Error('Мнемосхема не найдена'))
      }

      return Promise.reject(new Error('Неизвестная ошибка'))
    })
  }

  return Promise.resolve()
}
