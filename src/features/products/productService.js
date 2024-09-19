import axios from "axios";
import { base_url } from "../../utils/base_url";
import {config} from "../../utils/axiosConfig"


const getProducts = async (data) => {
    console.log("log", data);
    const queryParams = [];

    if (data?.brand) queryParams.push(`brand=${data.brand}`);
    if (data?.tag) queryParams.push(`tags=${data.tag}`);
    if (data?.category) queryParams.push(`category=${data.category}`);
    if (data?.minPrice) queryParams.push(`price[gte]=${data.minPrice}`);
    if (data?.maxPrice) queryParams.push(`price[lte]=${data.maxPrice}`);
    if (data?.sort) queryParams.push(`sort=${data.sort}`);


    const queryString = queryParams.join('&');
    const response = await axios.get(`${base_url}/product?${queryString}`, config);

    if (response.data) {
        return response.data;
    }
};

const getSingleProduct=async(prodId)=>{
    const response=await axios.get(`${base_url}/product/${prodId}`);
    // console.log("config",config);

    if(response.data){
        return response.data
    }
    
}

const addToWishlist=async(prodId)=>{
    const response=await axios.put(`${base_url}/product/wishlist`,{prodId},config);
    if(response.data){
        return response.data
    }
    
}

const rateProduct=async(data)=>{
    console.log(config);
    const response=await axios.put(`${base_url}/product/rating`,data,config);
    if(response.data){
        return response.data
    }
    
}

export const productService={
    getProducts,addToWishlist,getSingleProduct,rateProduct
}