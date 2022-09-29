import { fetchData } from "./fetchService";
import { storageService } from "./storageService";
export const userService= {
    login: async ({email,password})=>{
        const result = await fetchData('auth/login','POST',{email,password},false)
        storageService.set("token",result.data.token)
        return result
    },
    signup: async ({firstName,lastName,email,password})=>{
        const result = await fetchData('auth/signup','POST',{firstName,lastName,email,password},false)
        return result
    }

};