import axios from 'axios'

const DEFAULT_BACKEND_URL = 'https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com'
const baseURL = "https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com"

export const login = async (username: string, password: string) => {
    if (!baseURL) throw new Error('BACKEND_URL is not defined')
    try {
        const u = encodeURIComponent(username)
        const p = encodeURIComponent(password)
        const url = `${baseURL}/company/login/${u}?password=${p}`
         await axios.get(url)
        return true
    } catch (err: unknown) {
        console.error(
            'Login error:',
            axios.isAxiosError(err) ? err.response?.data ?? err.message : String(err)
        )
        return false
    }
}
