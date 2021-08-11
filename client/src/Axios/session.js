import axios from 'axios'

let testInstance = axios.create({
    baseURL : 'http://localhost:8080'
})

let productionInstance = axios.create({
    baseURL : 'https://www.iredullc.com'
})

export { testInstance as TestInstance, productionInstance as ProductionInstance }