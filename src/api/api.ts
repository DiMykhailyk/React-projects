import {instance} from "./axiosInstance";

export type GglServerData = {
    status: string,
    token: string
}

export type RegisterData = {
    name: string
    email: string
    password: string
    shop_token: string
    google_token: string
}

export interface ShopifyData {
    shop_logo_url: string,
    shop_name: string,
    token: string,
    status: string,
}

export const getShopifyToken = async (name: string) => {
    const {data} = await instance.get(`/shopify?name=${name}`)
    return data
}
export const getGoogleToken = async () => {
    const {data} = await instance.get<GglServerData>('/google')
    return data
}
export const sendRegisterData = async (userData: RegisterData) => {
    const {data} = await instance.post('/register', userData)
    return data
}