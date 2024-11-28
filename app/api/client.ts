import axios from "axios"

const baseURL = 'https://smart-cycle-marketmos.glitch.me'

const client = axios.create({baseURL})

export default client;