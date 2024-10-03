import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const register=async(userData)=>{
    const response=await axios.post(`${base_url}/user/register`,userData);
    if(response.data){
        localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data;

    }

}

const login=async(userData)=>{
    const response=await axios.post(`${base_url}/user/login`,userData);
    if(response.data){
        console.log(response)
        localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data;


    }

}

const getUserWishlist=async()=>{
    const response=await axios.get(`${base_url}/user/wishlist`,config);
    // console.log(config)
    if(response.data){
        return response.data;

    }
}


const addToCart=async(cartData)=>{
    const response=await axios.post(`${base_url}/user/cart`,cartData,config);
    if(response.data){
        // localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data;


    }

}

const getCart=async()=>{
    const response=await axios.get(`${base_url}/user/cart`,config);
    if(response.data){
        // localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data;


    }

}

const removeProductFromCart=async(id)=>{
    const response=await axios.delete(`${base_url}/user/delete-product-cart/${id}`,config);
    if(response.data){
        // localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data;


    }

}

const updateProductFromCart=async(cartDetail)=>{

    // console.log("logging config",config);
    const response=await axios.delete(`${base_url}/user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,config);
    if(response.data){
        // localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data; 


    }

}

const createOrder=async(orderDetail)=>{
    const response=await axios.post(`${base_url}/user/cart/create-order`,orderDetail,config)
    if(response.data){
        // localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data; 


    }
}

const getUserOrder=async(orderDetail)=>{
    const response=await axios.get(`${base_url}/user/getmyorders`,config)
    if(response.data){
        // localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data; 


    }
}

const updateUser=async(userDetail)=>{
    const response=await axios.put(`${base_url}/user/edit-user`,userDetail,config)
    if(response.data){
        // localStorage.setItem("customer",JSON.stringify(response.data));
        return response.data; 


    }
}

const forgotpassword = async (userDetail) => {
    try {
      const response = await axios.post(`${base_url}/user/forgot-password-token`, userDetail);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
  
  const resetpassword = async (data) => {
    try {
        console.log("data",data);
      const response = await axios.put(`${base_url}/user/reset-password/${data.token}`,{password:data?.password});
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
  
export  const authService={
    register,login,getUserWishlist,addToCart,getCart,removeProductFromCart,updateProductFromCart,createOrder,getUserOrder,updateUser,forgotpassword,resetpassword
}