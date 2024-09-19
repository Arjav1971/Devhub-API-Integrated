import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";
export const registerUser=createAsyncThunk("auth/register",async(userData,thunkAPI)=>{
    try{
        return await authService.register(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const loginUser=createAsyncThunk("auth/login",async(userData,thunkAPI)=>{
    try{
        return await authService.login(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const getUserProductWishlist=createAsyncThunk("user/wishlist",async(thunkAPI)=>{
    try{
        return await authService.getUserWishlist()
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const addProductToCart=createAsyncThunk("user/cart/add",async(cartData,thunkAPI)=>{
    try{
        return await authService.addToCart(cartData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})
export const getUserCart=createAsyncThunk("user/cart/get",async(thunkAPI)=>{
    try{
        return await authService.getCart()
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const deleteCartProduct=createAsyncThunk("user/cart/product/delete",async(id,thunkAPI)=>{
    try{
        return await authService.removeProductFromCart(id)
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const updateCartProduct=createAsyncThunk("user/cart/product/update",async(cartDetail,thunkAPI)=>{
    try{
        return await authService.updateProductFromCart(cartDetail)
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const createAnOrder=createAsyncThunk("user/cart/create-order",async(orderDetail,thunkAPI)=>{
    try{
        return await authService.createOrder(orderDetail)
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const getOrders=createAsyncThunk("user/order/get",async(thunkAPI)=>{
    try{
        return await authService.getUserOrder()
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const updateProfile=createAsyncThunk("user/profile/update",async(thunkAPI)=>{
    try{
        return await authService.updateUser()
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const forgotPasswordToken=createAsyncThunk("user/password/token",async(userdetail,thunkAPI)=>{
    try{
        return await authService.forgotpassword(userdetail)
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})

export const resetPassword=createAsyncThunk("user/password/reset",async(data,thunkAPI)=>{
    try{
        return await authService.resetpassword(data)
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
})
const getCustomerfromLocalStorage=localStorage.getItem('customer')?JSON.parse(localStorage.getItem('customer')):null;


const initialState={
    user:getCustomerfromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""

}
export const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.createdUser=action.payload;
            if(state.isSuccess===true){
                toast.success("User Created Successfully ")
            }
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
           
            if(state.isError===true){
                // console.log("logging error",action.error.message)
                toast.error("There is an error in registering ")
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.user=action.payload;
            if(state.isSuccess===true){
                localStorage.setItem("token",action.payload.token)
                toast.success("User Logged in Successfully ")
            }
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
           
            if(state.isError===true){
                // console.log("logging error",action.error.message)
                toast.error("There is an error in registering ")
            }
        })
        .addCase(getUserProductWishlist.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUserProductWishlist.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.wishlist=action.payload;
      
        })
        .addCase(getUserProductWishlist.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
    
        })
        .addCase(addProductToCart.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addProductToCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.cartProduct=action.payload;
            if(state.isSuccess===true){
                toast.success("Product Added to Cart ")
            }
      
        })
        .addCase(addProductToCart.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
    
        })
        .addCase(getUserCart.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUserCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.cartProduct=action.payload;
      
      
        })
        .addCase(getUserCart.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
    
        })
        .addCase(deleteCartProduct.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteCartProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.deletedCartProductt=action.payload;
            if(state.isSuccess===true){
                toast.success("Product Deleted From Cart Successfully ")
            }
      
      
        })
        .addCase(deleteCartProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isError===true){
                // console.log("logging error",action.error.message)
                toast.error("Something Went Wrong!")
            }
    
        })
        .addCase(updateCartProduct.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateCartProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.updatedtedCartProductt=action.payload;
            // if(state.isSuccess===true){
            //     toast.success("Product Deleted From Cart Successfully ")
            // }
      
      
        })
        .addCase(updateCartProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            // if(state.isError===true){
            //     // console.log("logging error",action.error.message)
            //     toast.error("Something Went Wrong!")
            // }
    
        })
        .addCase(createAnOrder.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createAnOrder.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.createdOrder=action.payload;
            if(state.isSuccess===true){
                toast.success("Ordered Successfully ")
            }
      
        })
        .addCase(createAnOrder.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
    
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.orderedProducts=action.payload;
 
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
    
        })
        .addCase(updateProfile.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.updatedProfile=action.payload;
            if(state.isSuccess===true){
                toast.success("Profile Update Successfully ")
            }
      
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isError===true){
                // console.log("logging error",action.error.message)
                toast.error("Something Went Wrong!")
            }
    
        })
        .addCase(forgotPasswordToken.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(forgotPasswordToken.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.token=action.payload;
            if(state.isSuccess===true){
                toast.success("Reset Password Email Sent Successfully ")
            }
      
        })
        .addCase(forgotPasswordToken.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isError===true){
                // console.log("logging error",action.error.message)
                toast.error("Something Went Wrong!")
            }
    
        })
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.pass=action.payload;
            if(state.isSuccess===true){
                toast.success("Password Updated Successfully ")
            }
      
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isError===true){
                // console.log("logging error",action.error.message)
                toast.error("Something Went Wrong!")
            }
    
        })
    }

})

export default authSlice.reducer;
