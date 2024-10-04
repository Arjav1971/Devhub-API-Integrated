import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';
import watch from "../images/watch.jpg";
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux';
import {useFormik} from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { config } from '../utils/axiosConfig';
import { createActionCreatorInvariantMiddleware } from '@reduxjs/toolkit';
import { createAnOrder } from '../features/user/userSlice';
import { base_url } from '../utils/base_url';
let shippingSchema = Yup.object({
    firstName:Yup.string().required("First Name is Required"),
    lastName:Yup.string().required("Last Name is Required"),
    address:Yup.string().required("Address is Required"),
    state:Yup.string().required("State is Required"),
    country:Yup.string().required("Country is Required"),
    city:Yup.string().required("City is Required"),
    other:Yup.string().required("Others is Required"),
    pincode:Yup.number().required("Pincode is Required")

  });
const Checkout = () => {
    const dispatch=useDispatch()
    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          address:"",
          state:"",
          country:"",
          city:"",
          pincode:"",
          other:"",
        },
        validationSchema:shippingSchema,
        onSubmit:(values)=>{
            // alert(JSON.stringify(values))
            setShippingInfo(values)
            setTimeout(()=>{
                checkOutHandler()
            },300)
       
    
        }
      
      });
    const cartState=useSelector(state=>state.auth.cartProduct)
    const [totalAmount,setTotalAmount]=useState(null);
    const [shippingInfo,setShippingInfo]=useState(null);
    const [paymentInfo,setPaymentInfo]=useState({razorpayPaymentId:"",razorpayOrderId:""})
    const[cartProductState,setCartProductState]=useState([])
    console.log(paymentInfo,shippingInfo);
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    useEffect(()=>{
        let items=[];
        for(let index=0;index<cartState?.length;index++){
            items.push({product:cartState[index].productId._id,quantity:cartState[index].quantity,color:cartState[index].color._id,price:cartState[index].price}) 
        }
        setCartProductState(items)
    },[])
    console.log("CartProduct",cartProductState)
    const checkOutHandler = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to Load");
            return;
        }
        const result = await axios.post(`${base_url}/user/order/checkout`, { amount: totalAmount + 5 }, config);
        if (!result) {
            alert("Something Went Wrong");
            return;
        }
        const { amount, id: order_id, currency } = result.data.order;
    
        const options = {
            key: "rzp_test_BcjUMgUEAV6tpq", 
            amount: amount,
            currency: currency,
            name: "Devhub.",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
    
                const paymentResult = await axios.post(`${base_url}/user/order/paymentVerification`, data, config);
    
                if (paymentResult.data.success) {
                    // Update the paymentInfo after successful payment
                    setPaymentInfo({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                    });
    
                    // Ensure paymentInfo is updated, then call createAnOrder
                    setTimeout(() => {
                        dispatch(createAnOrder({
                            totalPrice: totalAmount,
                            totalPriceAfterDiscount: totalAmount,
                            orderItems: cartProductState,
                            paymentInfo: {
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                            },
                            shippingInfo:shippingInfo,
                        }));
                    }, 500);
                }
            },
            prefill: {
                name: "Devhub",
                email: "devhub@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Devhub Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    
    console.log("cart",cartState)
    useEffect(()=>{
        let sum=0;
        for(let index=0;index<cartState?.length;index++){
            sum=sum+(Number(cartState[index].quantity)*cartState[index].price)
            
        }
        setTotalAmount(sum)
    },[cartState])
    // 13
  return (
    <>
     <Container class1='checkout-wrapper py-5 home-wrapper-2'>
            <div className='row'>
                <div className='col-7'>
                    <div className='checkout-left-data'>
                        <h3 className='website-name'>DevHub</h3>
                        <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item total-price">
                                    <Link className="text-dark" to="/cart">Cart</Link>
                                </li>
                                &nbsp;/
                                <li class="breadcrumb-item active total-price" aria-current="page">
                                    Information
                                </li>
                                &nbsp;/
                                <li class="breadcrumb-item active total-price">Shipping</li>
                                &nbsp;/
                                <li class="breadcrumb-item active total-price" aria-current="page">
                                    Payment
                                </li>
                            </ol>
                        </nav>
                        <h4 className='title total mb-0'>Contact Information</h4>
                        <p className='user-details total'>
                            Arjav Barya (arjav@gmail.com)
                        </p>
                        <h4 className='mb-3'>Shipping Address</h4>
                        <form onSubmit={formik.handleSubmit} onaction='' className='d-flex gap-15 flex-wrap justify-content-between'>
                            <div className='w-100'>
                                <select name="" className='form-control form-select' id="" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")}>
                                    <option value="" disabled>
                                        Select Country
                                    </option>
                                    <option value="India" >
                                        India
                                    </option>
                                </select>
                                <div className='error ms-2 my-1'>
                                    {formik.touched.country && formik.errors.country}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input type="text" placeholder="First Name" className='form-control' value={formik.values.firstName} onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")}/>
                                <div className='error'>
                                    {formik.touched.firstName && formik.errors.firstName}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input type="text" placeholder="Last Name" className='form-control'  value={formik.values.lastName} onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")}/>
                                <div className='error'>
                                    {formik.touched.lastName && formik.errors.lastName}
                                </div>
                            </div>
                            <div className='w-100'>
                                <input type="text" placeholder="Address" className='form-control' value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")}/>
                                <div className='error'>
                                    {formik.touched.address && formik.errors.address}
                                </div>
                            </div>
                            <div className='w-100'>
                                <input type="text" placeholder="Apartment, Suite,etc" className='form-control' value={formik.values.other} onChange={formik.handleChange("other")} onBlur={formik.handleBlur("other")}/>
                                <div className='error'>
                                    {formik.touched.other && formik.errors.other}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input type="text" placeholder="City" className='form-control' value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur("city")}/>
                                <div className='error'>
                                    {formik.touched.city && formik.errors.city}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <select name="" className='form-control form-select' id="" value={formik.values.state} onChange={formik.handleChange("state")} onBlur={formik.handleBlur("state")}>
                                    <option value="" selected disabled>
                                        Select State
                                    </option>
                                    <option value="Madhya Pradesh" >
                                        Madhya Pradesh
                                    </option>
                                </select>
                                <div className='error'>
                                    {formik.touched.state && formik.errors.state}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input name="" placeholder="ZipCode" className='form-control' id="" value={formik.values.pincode} onChange={formik.handleChange("pincode")} onBlur={formik.handleBlur("pincode")}/>
                                <div className='error'>
                                    {formik.touched.pincode && formik.errors.pincode}
                                </div>

                                {/* </input> */}
                            </div>
                            <div className='w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Link to="/cart" className="text-dark">
                                        <BiArrowBack className='me-2'/>
                                        Return to Cart
                                    </Link>
                                    <Link to="/cart" className="button">
                                        Continue to Shipping
                                    </Link>
                                    <button className='button' type="submit" >Place Order</button>
                                </div>
                            </div>
                            
                            
                        </form>
                    </div>

                </div>
                <div className='col-5'>
                    <div className='border-bottom py-4'>
                        {
                            cartState && cartState?.map((item,index)=>{
                                return (
                                    <div key={index} className='d-flex align-items-center gap-10 mb-2'>
                                    <div className='w-75 d-flex gap-10'>
                                       <div className='w-25 position-relative'>
                                           <span style={{top:"-10px", right:"2px"}} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>
                                               {item?.quantity}
                                           </span>
                                           <img wisth={100} height={100} src={item?.productId?.images[0]?.url} alt="product"/>
                                       </div>
                                       <div>
                                           <h5 className='title'>{item?.productId?.title}</h5>
                                           <p className="total-price">{item?.productId?.color?.title}</p>
                                       </div>
           
                                    </div>
                                   <div className='flex-grow-1'>
                                       <h5 className="total-price">$ {item?.price * item?.quantity}</h5>
                                   </div>
                                  </div>
                                )
                            })
                        }
                       {/* <div className='d-flex align-items-center gap-10 mb-2'>
                         <div className='w-75 d-flex gap-10'>
                            <div className='w-25 position-relative'>
                                <span style={{top:"-10px", right:"2px"}} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>
                                    1
                                </span>
                                <img className="img-fluid" src={watch} alt="product"/>
                            </div>
                            <div>
                                <h5 className='title'>shfjfhf</h5>
                                <p className="total-price">/dfjkjoiejfij</p>
                            </div>

                         </div>
                        <div className='flex-grow-1'>
                            <h5 className="total-price">$ 100</h5>
                        </div>
                       </div> */}

                    </div>
                    <div className='border-bottom py-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='total'>Subtotal</p>
                            <p className='total-price'>$ {totalAmount? totalAmount :"0"}</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='total mb-0'>Shipping</p>
                            <p className='total-price mb-0'>$ 5</p>
                        </div>
                    </div>
                    
                    <div className='d-flex justify-content-between align-items-center mt-4'>
                        <h4 className='total'>Total</h4>
                        <h5 className='total-price'>$ {totalAmount? totalAmount+5 :"0"}</h5>
                    </div> 
                </div>
            </div>

     </Container> 
    </>
  )
}

export default Checkout
// 8:56