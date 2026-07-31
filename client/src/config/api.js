const getEnvValue = (key, fallback = '') => {
    if (typeof window !== 'undefined' && window.__ENV__) {
        return window.__ENV__[key] || fallback
    }

    return process.env[key] || fallback
}

const getDefaultApiBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000'
    }

    return ''
}

export const getApiUrl = (path = '') => {
    const baseUrl = getEnvValue('REACT_APP_API_URL', getDefaultApiBaseUrl())

    if (!baseUrl) {
        return path.startsWith('/') ? path : `/${path}`
    }

    const normalizedBase = baseUrl.replace(/\/$/, '')
    const normalizedPath = path.startsWith('/') ? path : `/${path}`

    return `${normalizedBase}${normalizedPath}`
}

export const getAssetUrl = (value) => {
    if (!value) return ''

    if (typeof value === 'string' && value.startsWith('http')) {
        return value
    }

    const baseUrl = getEnvValue('REACT_APP_API_URL', '')

    if (!baseUrl) {
        return value.startsWith('/') ? value : `/${value}`
    }

    return `${baseUrl.replace(/\/$/, '')}${value.startsWith('/') ? value : `/${value}`}`
}

export const getClientUrl = (path = '') => {
    const baseUrl = getEnvValue('REACT_APP_CLIENT_URL', window.location.origin)
    const normalizedBase = baseUrl.replace(/\/$/, '')
    const normalizedPath = path.startsWith('/') ? path : `/${path}`

    return `${normalizedBase}${normalizedPath}`
}
