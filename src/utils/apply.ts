export type Application = {
    jobId: string;
    candidateName: string;
    candidateEmail: string;
    resumeBase64: string;
    resumeName: string;
    resumeType: string;
}

import axios from 'axios'

const baseURL = "https://s8snjnbc4e.execute-api.ap-south-1.amazonaws.com"

export const apply = async (application: Application) => {
    try {
        await axios.post(`${baseURL}/application`, application);
        return true;
    } catch (error) {
        console.error(error);
        return false;
        
    }
}
