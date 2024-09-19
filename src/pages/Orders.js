import React, { useEffect } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import {useDispatch, useSelector} from 'react-redux'
import { getOrders } from '../features/user/userSlice'
const Orders = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getOrders())
  },[])
  const orderState=useSelector(state=>state?.auth?.orderedProducts?.orders)
  console.log(orderState);
  return (
  <>
    <BreadCrumb title="My Orders"/>
    <Container class1='cart-wrapper home-wrapper-2 py-5'>
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-3'>
              <h5>Order Id</h5>
            </div>
            <div className='col-3'>
              <h5>Total Amount</h5>
            </div>
            <div className='col-3'>
              <h5>Total Amount after Discount </h5>
            </div>
            <div className='col-3'>
              <h5>Status</h5>
            </div>
          </div>
        </div>
        <div className='col-12'>
          {
            orderState && orderState?.map((item,index)=>{
              return(
                <div style={{backgroundColor:"#febd69"}} className='row my-3 pt-4 ' key={index}>
                <div className='col-3'>
                  <p>{item?._id}</p>
                </div>
                <div className='col-3'>
                  <p>{item?.totalPrice}</p>
                </div>
                <div className='col-3'>
                  <p>{item?.totalPriceAfterDiscount} </p>
                </div>
                <div className='col-3'>
                  <p>{item?.orderStatus}</p>
                </div>
                <div className='col-12 mt-3' style={{backgroundColor:"#131921"}}>
                  <div className='row p-3' style={{backgroundColor:"#131921"}}>
                    <div className='col-3'>
                      <h5 className='text-white'>Product Name</h5>
                    </div>
                    <div className='col-3'>
                      <h5 className='text-white'>Quantity</h5>
                    </div>
                    <div className='col-3'>
                      <h5 className='text-white'>Price</h5>
                    </div>
                    <div className='col-3'>
                      <h5 className='text-white'>Color</h5>
                    </div>
                    {
                    item?.orderItems?.map((i,index)=>{
                    return (
                    <div className='col-12 mt-3'>
                    <div className='row ' style={{backgroundColor:"#131921"}}>
                    <div className='col-3'>
                      <p className='text-white'>{i?.product?.title}</p>
                    </div>
                    <div className='col-3'>
                      <p className='text-white'>{i?.product?.quantity}</p>
                    </div>
                    <div className='col-3'>
                      <p className='text-white'>{i?.price}</p>
                    </div>
                    <div className='col-3'>
                      <ul className='colors ps-0'>
                      <li style={{backgroundColor:item?.color?.title}}></li>
                      </ul>
                    </div>
                    </div>
                    </div>
                    )
                    })
                    }
           
                  </div>
                </div>
              </div>
              )
            })
          }
        </div>
      </div>
    </Container>
  </>
  )
}

export default Orders


