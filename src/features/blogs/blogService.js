import axios from "axios";
import { base_url } from "../../utils/base_url";
import {config} from "../../utils/axiosConfig"


const getBlogs=async(userData)=>{
    const response=await axios.get(`${base_url}/blog`);
    // console.log("config",config);

    if(response.data){
        return response.data
    }
    
}

const getBlog=async(id)=>{
    const response=await axios.get(`${base_url}/blog/${id}`);
    // console.log("config",config);

    if(response.data){
        return response.data
    }
    
}
export const blogService={
    getBlogs,getBlog
}