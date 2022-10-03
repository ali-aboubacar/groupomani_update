const key = "groupomania_ab_token"
export const storageService = {
    get:(propName)=>{
        let data = window.localStorage.getItem(key)
        if(!data){
            return data
        }else{
            return JSON.parse(data)[propName];
        }
        
    },
    set:(propName,newData)=>{
        let data = window.localStorage.getItem(key)
        if(!data){
          data = {};
        }else{
          data = JSON.parse(data);
        }
        data[propName] = newData;
        window.localStorage.setItem(key, JSON.stringify(data))
    },
    remove: ()=>{
        window.localStorage.removeItem(key)
    }
};
