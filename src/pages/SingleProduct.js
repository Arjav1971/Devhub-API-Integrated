import React, { useEffect } from 'react';
import { useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import {TbGitCompare} from 'react-icons/tb';
import {AiOutlineHeart} from 'react-icons/ai';
import Container from '../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { toast } from "react-toastify";
import { addProductToCart, getUserCart } from '../features/user/userSlice';

const SingleProduct = () => {
  const navigate=useNavigate()
  const [color,setColor]=useState(null);
  const [quantity,setQuantity]=useState(1);
  const [alreadyAdded,setAlreadyAdded]=useState(false)
console.log("color",color);
console.log("quantity",quantity);
  const location=useLocation();
  const getProdId=location.pathname.split("/")[2];
  const dispatch=useDispatch();
  const productState=useSelector(state=>state?.product?.product)
  const productsState=useSelector(state=>state?.product?.products)

  const cartState=useSelector(state=>state?.auth?.cartProduct)
  const [star,setStar]=useState(null);
  const [comment,setComment]=useState(null);
  const addProdRatings=()=>{
    if(star===null){
      toast.error("Please add start rating")
      return false
    }
    else if(comment===null){
      toast.error("Please Write Review About the Product.")
      return false
    }
    else {
      dispatch(addRating({star:star,comment:comment,prodId:getProdId}))
      setTimeout(()=>{
        dispatch(getAProduct(getProdId));

      },100)

    }
  }
  console.log("Cart",cartState)
  useEffect(()=>{
    dispatch(getAProduct(getProdId));
    dispatch(getUserCart());
    dispatch(getAllProducts());

  },[])
  useEffect(()=>{

    for(let index=0;index<cartState?.length;index++){

      if(getProdId===cartState[index]?.productId?._id){
        setAlreadyAdded(true);
      }
    }
  },[])
  console.log("Set already added",alreadyAdded)
  // const imageSource =productState?.images[0]?.url
  // const props = {width: 400, height: 400, zoomWidth: 500, img:imageSource };
  const AddtoCart=()=>{
    if(color===null){
      toast.error("Please choose color")
      return false
    }
    else{
      
      dispatch(addProductToCart({productId:productState?._id,quantity,color,price:productState?.price}))
      setTimeout(()=>{
        navigate('/cart')
      })
      
    }
  }
  const [orderedProduct,setorederedProduct]=useState(true);
  const copyToClipboard = (text) => {
    console.log('text', text)
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  const [popularProduct,setPopularProduct]=useState([]);
  useEffect(()=>{
    let data=[];
    for(let index=0;index<productsState?.length;index++){
      const element=productsState[index];
      if(element.tags==='popular'){
        data.push(element);
      }
    }
    setPopularProduct(data);
  },[productsState])
  console.log("pop",popularProduct)
  return (
    <>
      <Meta title={"Product Name"}/>
      <BreadCrumb title={productState?.title}/>
      <Container class1='main-product-wrapper py-5 home-wrapper-2'>

            <div className='row'>
                <div className="col-6">
                  <div className='main-product-image'>
                    <div>
                    <ReactImageZoom  img={productState?.images && productState.images.length > 0 ? productState.images[0].url : '../images/brand-03.png'} />
                    </div>

                  </div>
                  <div className='other-product-images d-flex flex-wrap gap-15'>
                    {productState?.images?.map((item,index)=>{
                      return (  
                      <div>
                        <img src={item?.url} className='img-fluid'/>
                      </div>
                      )
                    
                    })}
                   
                    {/* <div>
                      <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=wood-wristwatch-time-190819.jpg&fm=jpg" className='img-fluid'/>
                    </div>
                    <div>
                      <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=wood-wristwatch-time-190819.jpg&fm=jpg" className='img-fluid'/>
                    </div>
                    <div>
                      <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=wood-wristwatch-time-190819.jpg&fm=jpg" className='img-fluid'/>
                    </div> */}
                  </div>
                </div>
                <div className='col-6'>
                  <div className='main-product-details'>
                    <div className='border-bottom'>
                      <h3 className='title'>{productState?.title}</h3>
                    </div>
                    <div className='border-bottom py-3'>
                      <p className='price'>$ {productState?.price}</p>
                      <div className='d-flex align-items-center gap-10'>
                      <ReactStars
                      count={5}
                      size={24}
                      value={Number(productState?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                      />
                      <p className='mb-0 t-review'>(2 Reviews)</p>

                      </div>
                      <a className='review-btn' href="#review">Write a Review</a>
                    </div>
                    <div className='border-bottom py-3'>
                      <div className='d-flex gap-10 align-items-center my-2'>
                        <h3 className='product-heading'>Type :</h3>
                        <p className='product-data'>Watch</p>
                      </div>
                      <div className='d-flex gap-10 align-items-center my-2'>
                        <h3 className='product-heading'>Brand :</h3>
                        <p className='product-data'>{productState?.brand}</p>
                      </div>
                      <div className='d-flex gap-10 align-items-center my-2'>
                        <h3 className='product-heading'>Category :</h3>
                        <p className='product-data'>{productState?.category}</p>
                      </div>
                      <div className='d-flex gap-10 align-items-center my-2'>
                        <h3 className='product-heading'>Tags :</h3>
                        <p className='product-data'>{productState?.tags && productState.tags.charAt(0).toUpperCase() + productState.tags.slice(1)}</p>

                      </div>
                      <div className='d-flex gap-10 align-items-center my-2'>
                        <h3 className='product-heading'>Availability :</h3>
                        <p className='product-data'>In Stock</p>
                      </div>
                      {/* <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                        <h3 className='product-heading'>Size :</h3>
                        <div className='d-flex flex-wrap gap-15'>
                          <span className='badge border border-1 bg-white text-dark border-secondary'>S</span>
                          <span className='badge border border-1 bg-white text-dark border-secondary'>M</span>
                          <span className='badge border border-1 bg-white text-dark border-secondary'>L</span>
                          <span className='badge border border-1 bg-white text-dark border-secondary'>XL</span>
                        </div>
                      </div> */}
                      {
                        alreadyAdded===false && <>
                          <div className='d-flex gap-10 flex-column my-2'>
                            <h3 className='product-heading'>Color :</h3>
                            <Color setColor={setColor} colorData={productState?.color}/>
                          </div>
                        </>

                      }
                   
                      <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                        {
                          alreadyAdded===false && <>
                          <h3 className='product-heading'>Quantity :</h3>
                          <div className=''>
                            <input type='number' name="" min={1} max={10} className='form-control' style={{width:'70px'}} id="" onChange={(e)=>setQuantity(e.target.value)} value={quantity}/>
                          </div>
                          </>
                        }
                        
                        <div className={alreadyAdded?"ms-0":"ms-5" +'d-flex justify-content-center gap-30 ms-5 align-items-center'}>
                                <button className='button border-0' type="submit"  onClick={()=>{alreadyAdded? navigate('/cart'):AddtoCart()}}>
                                 {alreadyAdded?"Go To Cart" :"Add to Cart"}
                                </button>
                                {/* <button className="button signup">BUY IT NOW</button> */}
                        </div>
                      </div>
                      <div className='d-flex align-items-center gap-15  flex-row '>
                        <div>
                          <a href=""><TbGitCompare className='fs-5 me-2'/>Add to Compare</a>
                        </div>
                        <div>
                          <a href=""><AiOutlineHeart className='fs-5 me-2'/>Add to Wishlist</a>
                        </div>
                      </div>
                      <div className='d-flex gap-10  flex-column my-3'>
                        <h3 className='product-heading'>Shipping & Returns :</h3>
                        <p className='product-data'>
                          Free shipping and returns available on all orders! <br/>
                          We ship all US domestic orders within <b>5-10 business days!</b>
                        </p>
                      </div>
                      <div className='d-flex gap-10 align-items-center my-3'>
                        <h3 className='product-heading'>Product Link:</h3>
                        <a href="javascript:void(0);" onClick={()=>{
                          copyToClipboard(
                            window.location.href
                          );
                        }}
                        >Copy Product Link</a>
                      </div>
                    </div>

                  </div>
                </div>

            </div>
  
      </Container>
      <Container class1='description-wrapper py-5 home-wrapper-2'>

          <div className='row'>
            <div className='col-12'>
              <h4>Description</h4>
              <div className='bg-white p-3'>
                
                <p dangerouslySetInnerHTML={{__html:productState?.description}}>
         
                </p>
              </div>

            </div>
          </div>

      </Container>
      <Container class1='reviews-wrapper py-5 home-wrapper-2'>

          <div className='row'>
            <div className='col-12'>
            <h4 id="review" >Reviews</h4>
              
              <div className='review-inner-wrapper'>
                <div className='review-head d-flex justify-content-between align-items-end'>
                  <div>
                    <h4 className='mb-2'>Customer Reviews</h4>
                    <div className='d-flex gap-10 align-items-center'>
                    <ReactStars
                     count={5}
                     size={24}
                     value='3'
                     edit={false}
                     activeColor="#ffd700"
                    />
                    <p className='mb-0'>Based on 2 Reviews</p>
                    </div>
                  </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}

                </div>
                <div className='review-form py-4'>
                  <h4>Write a Review</h4>
                  {/* <form action='' onSubmit={addProdRatings()} lassName='d-flex flex-column gap-15'> */}
                    <div>
                    <ReactStars
                     count={5}
                     size={24}
                     value='3'
                     edit={true}
                     activeColor="#ffd700"
                     onChange={(e)=>{
                      setStar(e)
                     }}

                    />
                    </div>
                    <div>
                      <textarea name="" id="" cols="30" rows="7" className='w-100 form-control' placeholder='Comments' onChange={(e)=>{setComment(e.target.value)}}/>
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                      <button className='button border-0' type="button" onClick={addProdRatings}>Submit Review</button> 
                    </div>
                  {/* </form> */}
                </div>
                <div className='reviews'>
                  {
                    productState && productState?.ratings?.map((item,index)=>{
                      return (
                        <div className='review'>
                        <div className='d-flex gap-10 align-items-center'>
                          <h6 className='mb-0'>{item?.postedby}</h6>
                          <ReactStars
                           count={5}
                           size={24}
                           value={item?.star}
                           edit={false}
                           activeColor="#ffd700"
                          />
                        </div>
                          <p className='mt-3'>
                            {item?.comment} 
                            
                          </p>
      
                        </div>
                      )
                    })
                  }

                </div>

              </div>

            </div>
          </div>
          

      </Container>
      <Container class1='featured-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              {/* <div className='review-head d-flex justify-content-between align-items-end'>
                <div>
                  
                  
                </div>
              </div> */}
              <h3 className="section-heading">Popular Collection</h3>
            </div>
            <div className='row'>
              <ProductCard data={popularProduct}/>
      

            </div>
          </div>
        </div>
      </Container>
      
    </>
  );

}

export default SingleProduct
