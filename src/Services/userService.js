import { fetchData } from "./fetchService";
import { storageService } from "./storageService";
export const userService= {
    login: async ({email,password})=>{
        const result = await fetchData('auth/login','POST',{email,password},false)
        storageService.set("token",result.data.token)
        storageService.set("userId",result.data.userId)
        return result
    },
    signup: async ({firstName,lastName,email,password})=>{
        const result = await fetchData('auth/signup','POST',{firstName,lastName,email,password},false)
        return result
    },
    logout: async ()=>{
        const clearStorage = storageService.remove("token","userId");
        return clearStorage;
    },
    getCurrentUser: async (id)=>{
        const result = await fetchData('auth/user/'+id,'GET',null,true)
        return result
    },


};