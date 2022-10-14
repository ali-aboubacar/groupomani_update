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
    getOne: async (id)=>{
        const result = await fetchData('posts/'+id,'GET',null,true)
        return result
    },
    addLikes: async (PostId)=>{
        const result = await fetchData('posts/likes','POST',PostId,true)
        return result
    }

};