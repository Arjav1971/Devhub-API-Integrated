import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import watch from '../images/watch.jpg';
import {AiFillDelete} from 'react-icons/ai';
import { Link } from 'react-router-dom';
// import { Container } from '@mui/material';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice';
const Cart = () => {
    const dispatch=useDispatch();
    const [productUpdateDetail,setProductUpdateDetail]=useState(null)
    const [totalAmount,setTotalAmount]=useState(null)
    // console.log(quantity)
    const usercartState=useSelector(state=>state.auth.cartProduct);
    console.log(usercartState);

    // there is an error dont follow
    useEffect(()=>{
        dispatch(getUserCart());
    },[])
    useEffect(()=>{

      if(productUpdateDetail!==null){
        dispatch(updateCartProduct({cartItemId:productUpdateDetail?.cartItemId,quantity:productUpdateDetail?.quantity}))
        setProductUpdateDetail(null);
        
        setTimeout(()=>{
            dispatch(getUserCart());

            

        },10)

      }


    },[productUpdateDetail])
    const deleteACartProduct=(id)=>{
        dispatch(deleteCartProduct(id))
        setTimeout(()=>{
            dispatch(getUserCart());

        },200)
    }


    useEffect(()=>{
        let sum=0;
        for(let index=0;index<usercartState?.length;index++){
            sum=sum+(Number(usercartState[index].quantity)*usercartState[index].price)
            
        }
        setTotalAmount(sum)
    },[usercartState])
  return (
    <>
      <Meta title={"Contact Us"}/>
      <BreadCrumb title="Contact Us"/>
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
      <div className='row'>
                <div className='col-12'>
                    <div className='cart-header d-flex justify-content-between align-items-center'>
                        <h4 className='cart-col-1'>Product</h4>
                        <h4 className='cart-col-2'>Price</h4>
                        <h4 className='cart-col-3'>Quantity</h4>
                        <h4 className='cart-col-4'>Total</h4>
                    </div>
                    {
                        Array.isArray(usercartState) && usercartState?.map((item,index)=>{
                            return (
                                <div key={index} className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
                                <div className='cart-col-1 gap-15 d-flex align-items-center'>
                                    <div className='w-25'>
                                        <img className="img-fluid" src={watch} alt="product image"/>
                                    </div>
                                    <div className='w-75'>
                                        <p>{item?.productId?.title}</p>
                                        <p className='d-flex gap-3'>
                                            Color:<ul className='colors ps-0'>
                                            <li style={{backgroundColor:item?.color?.title}}></li></ul>
                                        </p>
                                        {/* <p>jbfc</p> */}
                                    </div>
        
                                </div>
                                <div className='cart-col-2'>
                                    <h5 className='price'>$ {item?.price}</h5>
                                </div>
                                <div className='cart-col-3 d-flex align-items-center gap-15'>
                                    <div>
                                        <input className='form-control' type="number" name="" min={1} max={10} id="" value={productUpdateDetail?.quantity ? productUpdateDetail?.quantity :item?.quantity} onChange={(e)=>{setProductUpdateDetail({cartItemId:item?._id,quantity:e.target.value})}}/>
                                    </div>
                                    <div>
                                        <AiFillDelete className='text-danger' onClick={()=>deleteACartProduct(item?._id)}/>
                                    </div>
                                </div>
        
                                <div className='cart-col-4'>
                                    <h5 className='price'>$ {item?.quantity * item?.price}</h5>
                                </div>
                            </div>
                            )

                        
                        })
                    }
                    {/* <div className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
                        <div className='cart-col-1 gap-15 d-flex align-items-center'>
                            <div className='w-25'>
                                <img className="img-fluid" src={watch} alt="product image"/>
                            </div>
                            <div className='w-75'>
                                <p>gfdhg</p>
                                <p>vbdj</p>
                                <p>jbfc</p>
                            </div>

                        </div>
                        <div className='cart-col-2'>
                            <h5 className='price'>$ 1000</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                            <div>
                                <input className='form-control' type="number" name="" min={1} max={10} id=""/>
                            </div>
                            <div>
                                <AiFillDelete className='text-danger'/>
                            </div>
                        </div>

                        <div className='cart-col-4'>
                            <h5 className='price'>$ 1000</h5>
                        </div>
                    </div>
                    <div className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
                        <div className='cart-col-1 gap-15 d-flex align-items-center'>
                            <div className='w-25'>
                                <img className="img-fluid" src={watch} alt="product image"/>
                            </div>
                            <div className='w-75'>
                                <p>gfdhg</p>
                                <p>vbdj</p>
                                <p>jbfc</p>
                            </div>

                        </div>
                        <div className='cart-col-2'>
                            <h5 className='price'>$ 1000</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                            <div>
                                <input className='form-control' type="number" name="" min={1} max={10} id=""/>
                            </div>
                            <div>
                                <AiFillDelete className='text-danger'/>
                            </div>
                        </div>

                        <div className='cart-col-4'>
                            <h5 className='price'>$ 1000</h5>
                        </div>
                    </div> */}
                    <div className='col-12 py-2 mt-4'>
                        <div className='d-flex justify-content-between'>
                        <Link to="/product" className="button">Continue To Shopping</Link>
                        </div>
                        {
                            (totalAmount!==null || totalAmount!==0) &&
                            <div className='d-flex flex-column align-items-end align-baseline'>
                            <h4>SubTotal: $ {totalAmount}</h4>
                            <p>Taxes and shipping at checkout</p>
                            <Link to="/checkout" className='button'>
                                Checkout
                            </Link>
                        </div>
                        }
                    </div>
                </div>
            </div>
      </Container>
     
    </>
  )
}

export default Cart
