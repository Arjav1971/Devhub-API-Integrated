import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link,useLocation } from 'react-router-dom';
import wish from '../images/wish.svg';
import wishlist from '../images/wishlist.svg';
import watch from "../images/watch.jpg";
import watch3 from "../images/watch3.jpg";
import watch4 from "../images/watch4.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import prodcompare from "../images/prodcompare.svg";
import {useDispatch,useSelector} from 'react-redux'
import { addToWishlist } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';
const ProductCard = (props) => {
    const {grid,data}=props;
    const navigate=useNavigate();
    let location=useLocation();
    const dispatch=useDispatch()
    const addtoWishlist=(id)=>{
        alert(id);
        dispatch(addToWishlist(id));
    }
  
//    "product/:id"
  return (
    <>
    {
        data?.map((item,index)=>{
            return(
                <div key={index} className={` ${location.pathname=="/product" ? `gr-${grid}`:"col-3"}`}>
                <div 
                // to={`${location.pathname=="/" ? "/product/:id" : location.pathname=="/product/:id" ?"/product/:id" :":id"}`}
                 className="product-card position-relative">
                
                    <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent' onClick={(e)=>{addtoWishlist(item?._id)}}><img src={wish} alt="wishlist"/></button >
                    </div>
                    <div className='product-image'>
                        <img src={item?.images[0]?.url} className='img-fluid  mx-auto ' alt="product image" width={160}/>
                        <img src={watch4} className='img-fluid  mx-auto ' alt="product image" width={160}/>
                    </div>
                    <div className='product-details'>
                        <h6 className='brand'>{item?.brand}</h6>
                        <h5 className='product-title'>
                            {item?.title}
                        </h5>
                        <ReactStars
                        countbutton 
                        size={24}
                        value={Number(item?.totalrating)}
                        edit={false}
                        activeColor="#ffd700"
                        />
                        <p className={`description ${grid === 12 ? "d-block" : "d-none"}`} dangerouslySetInnerHTML={{__html:item?.description}}>
                     
                        </p>
                        <p className='price'>$ {item?.price}</p>
        
                    </div>
                    <div className='action-bar position-absolute'>
                        <div className='d-flex flex-column gap-15'>
                            <button className='border-0 bg-transparent' onClick={() => navigate(`/product/${item?._id}`)}>
                               <img  src={view} alt="view"/>
                            </button >
                            {/* <button className='border-0 bg-transparent'>
                               <img src={prodcompare} alt="compare"/>
                            </button > */}
                            {/* <button className='border-0 bg-transparent'>
                               <img src={addcart} alt="addcart"/>
                            </button > */}
                        </div>
                    </div>
                </div>
            </div>
            )
        })
    }
    {/* <div className={` ${location.pathname=="/product" ? `gr-${grid}`:"col-3"}`}>
        <Link to={`${location.pathname=="/" ? "/product/:id" : location.pathname=="/product/:id" ?"/product/:id" :":id"}`} className="product-card position-relative">
        
            <div className="wishlist-icon position-absolute">
                <button className='border-0 bg-transparent'><img src={wish} alt="wishlist"/></button >
            </div>
            <div className='product-image'>
                <img src={watch3} className='img-fluid' alt="product image"/>
                <img src={watch4} className='img-fluid' alt="product image"/>
            </div>
            <div className='product-details'>
                <h6 className='brand'>Havels</h6>
                <h5 className='product-title'>
                    Kids headphones bulk 10 pack multi colored for students
                </h5>
                <ReactStars
                countbutton 
                size={24}
                value={3}
                edit={false}
                activeColor="#ffd700"
                />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>At vero eos accumus et isusto odio
                bla bla fjebhf fjhfef jfehffk jhwk olejedn dwtdd vhdfd jfbef
                bchejcgf jfhg fhjgf fhjefg...</p>
                <p className='price'>$100.00</p>

            </div>
            <div className='action-bar position-absolute'>
                <div className='d-flex flex-column gap-15'>
                    <button className='border-0 bg-transparent'>
                       <img src={view} alt="view"/>
                    </button >
                    <button className='border-0 bg-transparent'>
                       <img src={prodcompare} alt="compare"/>
                    </button >
                    <button className='border-0 bg-transparent'>
                       <img src={addcart} alt="addcart"/>
                    </button >
                </div>
            </div>
        </Link>
    </div>
    <div className={` ${location.pathname=="/product" ? `gr-${grid}`:"col-3"}`}>
        <Link to={`${location.pathname=="/" ? "/product/:id" : location.pathname=="/product/:id" ?"/product/:id" :":id"}`} className="product-card position-relative">
       
            <div className="wishlist-icon position-absolute">
                <button className='border-0 bg-transparent'><img src={wish} alt="wishlist"/></button >
            </div>
            <div className='product-image'>
                <img src={watch3} className='img-fluid' alt="product image"/>
                <img src={watch4} className='img-fluid' alt="product image"/>
            </div>
            <div className='product-details'>
                <h6 className='brand'>Havels</h6>
                <h5 className='product-title'>
                    Kids headphones bulk 10 pack multi colored for students
                </h5>
                <ReactStars
                count={5}
                size={24}
                value={3}
                edit={false}
                activeColor="#ffd700"
                />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>At vero eos accumus et isusto odio
                bla bla fjebhf fjhfef jfehffk jhwk olejedn dwtdd vhdfd jfbef
                bchejcgf jfhg fhjgf fhjefg...</p>
                <p className='price'>$100.00</p>


            </div>
            <div className='action-bar position-absolute'>
                <div className='d-flex flex-column gap-15'>
                    <button className='border-0 bg-transparent'>
                       <img src={view} alt="view"/>
                    </button >
                    <button className='border-0 bg-transparent'>
                       <img src={prodcompare} alt="compare"/>
                    </button >
                    <button className='border-0 bg-transparent'>
                       <img src={addcart} alt="addcart"/>
                    </button >
                </div>
            </div>
        </Link>
    </div> */}
    </>
    
  )
}

export default ProductCard
