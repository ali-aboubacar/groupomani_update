import { fetchData } from "./fetchService";

export const postService= {
    getAll: async ()=>{
        const result = await fetchData('posts','GET',null,true)
        return result
    },
    create: async (newPost)=>{
        const result = await fetchData('posts','POST',newPost,true,true)
        return result
    },  
    update: async (id,newPost)=>{
        const result = await fetchData('posts/'+id,'PUT',newPost,true,true)
        return result
    },  
    delete: async (id)=>{
        const result = await fetchData('posts/'+id,'DELETE',null,true)
        return result
    },  
    getOne: async (id)=>{
        const result = await fetchData('posts/'+id,'GET',null,true)
        return result
    },
    addLikes: async (id)=>{
        const result = await fetchData('posts/likes/'+id,'GET',null,true)
        return result
    }

};