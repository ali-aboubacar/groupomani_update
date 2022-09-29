import { fetchData } from "./fetchService";
export const postService= {
    getAll: async ()=>{
        const result = await fetchData('posts','GET',null,true)
        return result
    },
    create: async (newPost)=>{
        const result = await fetchData('posts','POST',newPost,true)
        return result
    },  
    getOne: async (id)=>{
        const result = await fetchData('posts/'+id,'GET',null,true)
        return result
    },

};