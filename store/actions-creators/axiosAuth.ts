import { AxiosResponse } from "axios";
import $api from "../../http";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
    
}