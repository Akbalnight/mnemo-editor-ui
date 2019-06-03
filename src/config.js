let config = {
  apiPrefix: null,
  ajax: null
}

export const get = () => config
export const set = (newConfig) => {
  config = {
    ...config,
    ...newConfig
  }
}
