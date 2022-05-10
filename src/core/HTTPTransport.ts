// eslint-disable-next-line no-shadow
enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type TOptions = {
  method: METHOD
  headers?: Record<string, string>
  responseType?: 'json' | 'text' | 'blob' | 'document' | 'arraybuffer' | ''
  timeout?: number
  data?: Record<string, any> | {} | null
  includeCredentials: boolean
}

type OptionsWithoutMethod = Omit<TOptions, 'method'>

function queryStringify(data: any) {
  if (!data) {
    return ''
  }
  return Object.entries(data).reduce((acc, cur, index, array) => {
    const isLast = array.length - 1 === index
    const isAmpersand = isLast ? '' : '&'
    return acc + cur.join('=') + isAmpersand
  }, '?')
}

export default class HTTPTransport {
  url: string

  constructor(url: string) {
    this.url = url
  }

  get(url: string, options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(`${process.env.API_ENDPOINT}/${this.url}/${url}`, {
      ...options,
      method: METHOD.GET,
    })
  }

  post(url: string, options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(`${process.env.API_ENDPOINT}/${this.url}/${url}`, {
      ...options,
      method: METHOD.POST,
    })
  }

  put(url: string, options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(`${process.env.API_ENDPOINT}/${this.url}/${url}`, {
      ...options,
      method: METHOD.PUT,
    })
  }

  patch(url: string, options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(`${process.env.API_ENDPOINT}/${this.url}/${url}`, {
      ...options,
      method: METHOD.PATCH,
    })
  }

  delete(url: string, options: OptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(`${process.env.API_ENDPOINT}/${this.url}/${url}`, {
      ...options,
      method: METHOD.DELETE,
    })
  }

  request(
    url: string,
    options: TOptions,
    timeout: number = 5000,
    responseType = 'json',
  ): Promise<XMLHttpRequest> {
    const {
      method, data, headers, includeCredentials,
    } = options
    const isGet = method === METHOD.GET
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, isGet ? `${url}${queryStringify(data)}` : url)
      xhr.withCredentials = includeCredentials

      xhr.responseType = responseType as XMLHttpRequestResponseType
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value as string)
        })
      }
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response)
        } else {
          resolve(xhr.response)
        }
      }
      xhr.onabort = () => {
        reject(xhr.response)
      }
      xhr.onerror = () => {
        reject(xhr.response)
      }
      xhr.timeout = timeout
      xhr.ontimeout = () => {
        reject(xhr.response)
      }

      if (isGet) {
        xhr.send()
      } else {
        xhr.send(data as any)
      }
    })
  }
}
