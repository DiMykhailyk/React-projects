export const useCallApi = (url = '', data = {}) => {
  let storage = localStorage.getItem('tokenData')
  const storageRef = localStorage.getItem('refreshTokenData')

  const reqBody = {
    method: data.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storage}`,
      'X-Refresh-Token': storageRef,
    },
  }

  if (data.method !== 'GET' && data.method !== 'OPTIONS') {
    reqBody.body = JSON.stringify(data)
  }

  return fetch(url, reqBody).then((res) => {
    if (res.status === 400) {
      fetch('http://localhost:3001/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${storage}`,
          'X-Refresh-Token': storageRef,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          }
        })
        .then((data) => {
          if (!data) {
            throw new Error('unauthed')
          } else {
            storage = data.token
            localStorage.setItem('tokenData', storage)
            fetch(url, reqBody).then((res) => {
              if (res.status !== 200) {
                return res
              }
              return res.json()
            })
          }
        })
    } else {
      return res.json()
    }
  })
}