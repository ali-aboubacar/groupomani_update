import { storageService } from "./storageService";

export const  fetchData = async (url,method="GET",body,hasAuth=false)=>{
try{
    const reqInit = {method};
    const headers = {};
    if(body){
        headers ['Content-Type'] = "application/json"
        reqInit.body = JSON.stringify(body);
    }
    if(hasAuth){
        headers ['Authorization'] = 'Bearer '+storageService.get("token");
    }
    reqInit.headers = headers ;
    const res= await fetch('http://localhost:4000/api/'+url,reqInit)
    const result = await res.json();
    return {data:result}
}catch(err){
    return err
}
};