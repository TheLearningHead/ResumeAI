import axios from 'axios'

const DEFAULT_BACKEND_URL = 'https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com'
const baseURL = "https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com"

export const createJob = async (companyId: string, title: string, description: string, numShortlist: number) => {
    if (!baseURL) throw new Error('BACKEND_URL is not defined')
    try {
       const response = await axios.post(`${baseURL}/job`, {
            companyId,
            title,
            description,
            numShortlist
        })
        return response.data.link as string
    } catch (err: unknown) {
        console.error(
            'Login error:',
            axios.isAxiosError(err) ? err.response?.data ?? err.message : String(err)
        )
        return null
    }
}
