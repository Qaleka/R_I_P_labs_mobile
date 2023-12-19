import axios from 'axios';
import { recipients, draft_notification } from './MockData';

const ip = '111.111.111.97'
const apiPort = '80'
const imagesPort = '9000'
export const imageBaseURL = `http://${ip}:${imagesPort}/images`
export const imagePlaceholder = require(`../assets/placeholder.jpg`)

export const axiosAPI = axios.create({ baseURL: `http://${ip}:${apiPort}/api/`, timeout: 1000 });
export const axiosImage = axios.create({ baseURL: `http://${ip}:${imagesPort}/images/`, timeout: 500 });

export async function getAllRecipients(filter) {
    let url = 'recipients'
    if (filter !== undefined) {
        url += `?fio=${filter}`
    }
    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => fromMock(filter))
}

function fromMock(filter) {
    let filteredRecipients = Array.from(recipients.values())
    if (filter !== undefined) {
        let fio = filter.toLowerCase()
        filteredRecipients = filteredRecipients.filter(
            (recipient) => recipient.fio.toLowerCase().includes(fio)
        )
    }
    return { draft_notification, recipients: filteredRecipients }
}

export async function getRecipient(recipientId) {
    if (recipientId === undefined) {
        return undefined
    }
    let url = 'recipients/' + recipientId
    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => recipients.get(recipientId))
}