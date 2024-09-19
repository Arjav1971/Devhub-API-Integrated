import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  }

  const wishlistState = useSelector((state) => state?.auth?.wishlist);
  const wishlist=wishlistState ? wishlistState.wishlist : [];
  console.log(wishlist);
  const removeFromWishlist=(id)=>{
    dispatch(addToWishlist(id));
    setTimeout(()=>{
        dispatch(getUserProductWishlist());
    },300);
  }

  return (
    <>
      <Meta title={"Wishlist"}/>
      <BreadCrumb title="Wishlist"/>
      <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
        <div className='row'>
            {wishlist && wishlist.length===0 && <div className='text-center fs-3'>No Data</div>

            }
          {wishlist && wishlist?.map((item, index) => (
            <div className='col-3' key={index}>
             <div className='wishlist-card position-relative' style={{height:'260px'}} >
               <img onClick={()=>{removeFromWishlist(item?._id)}} src="images/cross.svg" alt="cross" className='position-absolute cross img-fluid'/>
               <div className='wishlist-card-image bg-white' style={{height:'260px'}}>
                 <img src={item?.images[0]?.url ? item?.images[0].url :"images/watch.jpg"} className="img-fluid d-block mx-auto" alt="watch" width={160} style={{height:'260px'}}/>
               </div>
               <div>
                 <h5 className='title'>
                   {item?.title?.substr(0,40)+'...'}
                 </h5>
                   
                 <h6 className='price'>$ {item?.price}</h6>
               </div>
             </div>
           </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Wishlist;


// 12:00