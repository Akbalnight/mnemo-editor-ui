import { get } from '../config'

const urlBuild = (url) => {
  const config = get()

  if (!config.apiPrefix) {
    return url
  }

  return `${config.apiPrefix}${url}`
}

const defaultErrors = {
  500: 'Непредвиденная ошибка сервера, свяжитесь с администратором'
}

const catchError = (errors = {}) => (error) => {
  const e = {
    ...defaultErrors,
    ...errors
  }

  if (error.response && error.response.status) {
    if (error.response.status >= 200 && error.response.status < 300) {
      return
    }

    if (e[error.response.status]) {
      return Promise.reject(new Error(e[error.response.status]))
    }
  }

  return Promise.reject(new Error(defaultErrors[500]))
}

export const getSchemes = () => {
  const config = get()

  if (config.ajax) {
    return config.ajax({
      method: 'GET',
      url: urlBuild('/schemas')
    })
      .then(data => {
        if (!Array.isArray(data)) {
          return Promise.reject(new Error('Не удалось загрузить список мнемосхем'))
        }
        return data
      })
      .catch(catchError())
  }

  return Promise.reject(new Error('Произошла неизвестная ошибка во время получения списка мнемосхем'))
}

export const storeScheme = ({
  id,
  name,
  data,
  isProduction
}) => {
  const config = get()

  if (!name && !id) {
    return Promise.reject(new Error('Не задано имя менмосхемы'))
  }

  if (config.ajax && data) {
    const saveData = {
      title: name,
      schemaType: isProduction ? 'prod' : 'dev',
      createdBy: 'username',
      content: data
    }

    const url = id ? urlBuild(`/schemas/${id}`) : urlBuild(`/schemas`)
    const method = id ? 'PUT' : 'POST'

    return config.ajax({
      method: method,
      url: url,
      data: saveData
    }).catch(catchError({
      404: 'Мнемосхема не найдена',
      500: 'Не удалось сохранить мнемосхему'
    }))
  }

  return Promise.reject(new Error('Произошла неизвестная ошибка во время сохранения мнемосхемы'))
}

export const getScheme = (id) => {
  const config = get()

  if (config.ajax && id) {
    return config.ajax({
      method: 'GET',
      url: urlBuild(`/schemas/${id}`)
    })
      .then(data => (data && {
        id: data.id,
        name: data.title,
        isProduction: data.schemaType === 'prod',
        data: data.content
      }))
      .catch(catchError({
        404: 'Мнемосхема не найдена'
      }))
  }

  return Promise.reject(new Error('Произошла неизвестная ошибка во время загрузки мнемосхемы'))
}

export const removeScheme = (id) => {
  const config = get()

  if (config.ajax && id) {
    return config.ajax({
      method: 'DELETE',
      url: urlBuild(`/schemas/${id}`)
    })
      .catch(catchError())
  }

  return Promise.reject(new Error('Произошла неизвестная ошибка во время удаления мнемосхемы'))
}
