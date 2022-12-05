export const getUsers = (page, count) => {
    const data = fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`)
        .then(response => response.json())
    return data
}

export const getPositions = () => {
    const data = fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        .then(response => response.json())
    return data
}

export const getToken = () => {
    const data = fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        .then(response => response.json())
    return data
}

export const postUser = (token, formData) => {
    const data = fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
        { method: 'POST', body: formData, headers: { 'Token': token }})
        .then(response => response.json())
    return data
}