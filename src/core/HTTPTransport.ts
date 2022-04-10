enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
  }
  
  type Options = {
    method: METHOD;
    data?: any;
  };
  
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
  
  // Тип Omit принимает два аргумента: первый — тип, второй — строка
  // и удаляет из первого типа ключ, переданный вторым аргументом
  type OptionsWithoutMethod = Omit<Options, 'method'>;
  // Этот тип эквивалентен следующему:
  // type OptionsWithoutMethod = { data?: any };
  
  export default class HTTPTransport {
    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
      return this.request(url, {...options, method: METHOD.GET})
    };
  
    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
      return this.request(url, {...options, method: METHOD.POST})
    };
  
    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
      return this.request(url, {...options, method: METHOD.PUT})
    };
  
    patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
      return this.request(url, {...options, method: METHOD.PATCH})
    };
  
    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
      return this.request(url, {...options, method: METHOD.DELETE})
    };
  
  
    request(url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> {
      const {method, data} = options
      const isGet = method === METHOD.GET
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
  
        xhr.open(method, isGet ? `${url}${queryStringify(data)}` : url)
  
        xhr.onload = function () {
          resolve(xhr)
        }
        xhr.onabort = reject
        xhr.onerror = reject
        xhr.timeout = timeout
        xhr.ontimeout = reject
  
        if (isGet) {
          xhr.send()
        } else {
          const json = JSON.stringify(data)
          xhr.send(json)
        }
      })
    }
  }