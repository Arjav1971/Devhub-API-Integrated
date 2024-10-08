import React,{useEffect} from 'react';

import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services } from '../utils/Data';
import {useDispatch,useSelector} from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import moment from "moment";
import { getAllProducts } from '../features/products/productSlice';
const Home = () => {
  const dispatch=useDispatch();

  const blogState=useSelector((state)=>state?.blog);
  const productState=useSelector((state)=>state?.product.products);
console.log(productState);
  const blogList=blogState ? blogState.blog :[];
  useEffect(()=>{
    getBlogs();
    getProducts();
    
  },[])

  // useEffect(()=>{
    
    
  // },[])
  const getBlogs=()=>{
    dispatch(getAllBlogs());
  }


  const getProducts=()=>{
    dispatch(getAllProducts());
  }

  
  return (
    <>
    <Container class1='home-wrapper-1 py-5'>
    <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img src="images/main-banner-1.jpg" className="img-fluid rounded-3" alt="main banner" />
                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 or $41.62/mo.</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div> {/* Close col-6 */}
            <div className='col-6'>
              <div className='d-flex flex-wrap gap-10 justify-content-between align-items-center'>
                <div className="small-banner position-relative">
                  <img src="images/catbanner-01.jpg" className="img-fluid rounded-3" alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sale</h4>
                    <h5>Laptops Max</h5>
                    <p>From $1699.00 <br/>or $64.62/mo.</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img src="images/catbanner-03.jpg" className="img-fluid rounded-3" alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>Buy IPad Air</h5>
                    <p>From $599.00 <br/>or $41.91/mo. for 12 mo.</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img src="images/catbanner-02.jpg" className="img-fluid rounded-3" alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>15% OFF</h4>
                    <h5>Smartwatch 7</h5>
                    <p>Shop the latest band<br/>styles and colors</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img src="images/catbanner-04.jpg" className="img-fluid rounded-3" alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>FREE ENGRAVING</h4>
                    <h5>AirPods Max</h5>
                    <p>High-fidelity playback &<br/>ultra-low distortion</p>
                  </div>
                </div>
              </div>
            </div> {/* Close col-6 */}
          </div>

    </Container>
    <Container class1="home-wrapper-2 py-5">
    <div className="row">
            <div className="col-12">
              <div className='services d-flex align-items-center justify-content-between'>{
                services?.map((i,j)=>{
                  return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services"/>
                  <div>
                    <h5>{i.title}</h5>
                    <p className="mb-0">{i.tagline}</p>
                  </div>
                </div> 
                  );
                })

                
              }
              </div>
            </div>
          </div>
    </Container>
    <Container class1="home-wrapper-2 py-5">
    <div className="row">
            <div className='col-12'>
              <div className="categories d-flex justify-content-between align-items-center flex-wrap">
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h5>Cameras</h5>
                    <p>10 Items</p>

                  </div>
                  <img src="images/camera.jpg" alt="camera"/>
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h5>Smart Tv</h5>
                    <p>10 Items</p>

                  </div>
                  <img src="images/tv.jpg" alt="camera"/>
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h5>Smart Watches</h5>
                    <p>10 Items</p>

                  </div>
                  <img src="images/tv.jpg" alt="camera"/>
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h5>Cameras</h5>
                    <p>10 Items</p>

                  </div>
                  <img src="images/headphone.jpg" alt="camera"/>
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h5>Cameras</h5>
                    <p>10 Items</p>

                  </div>
                  <img src="images/camera.jpg" alt="camera"/>
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h5>Smart Tv</h5>
                    <p>10 Items</p>

                  </div>
                  <img src="images/tv.jpg" alt="camera"/>
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h5>Smart Watches</h5>
                    <p>10 Items</p>

                  </div>
                  <img src="images/tv.jpg" alt="camera"/>
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h5>Cameras</h5>
                    <p>10 Items</p>

                  </div>
                  <img src="images/headphone.jpg" alt="camera"/>
                </div>

              </div>
            </div>
            
          </div>

    </Container>
    <Container class1="featured-wrapper py-5 home-wrapper-2">
      <div className='row'>
            <div className='col-12'>
              <h3 className="section-heading">Featured Collection</h3>
            </div>
            
            <div className='row'>
              {/* {productState && productState?.map((item,index)=>{
               
                  if(item.tags==="popular"){ */}
                 <ProductCard data={productState?.filter(p => p.tags === "featured")} />

         
          
          
{/*               
              <SpecialProduct/>
              <SpecialProduct/>
              <SpecialProduct/> */}

            </div>
            
         <div className='col-3'>
              <div className='famous-card position-relative'>
                <img src="images/famous15.jpg" className="img-fluid" alt="famous"/>
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 or $16.62/mo. for 24 mo.*</p>
                </div>
              </div>

            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img src="images/famous13.jpg" className="img-fluid" alt="famous"/>
                <div className='famous-content position-absolute'>
                  <h5 >STUDIO DISPLAY</h5>
                  <h6>600 nits of brightness.</h6>
                  <p>27-inch 5K Retina display</p>
                </div>
              </div>

            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img src="images/famous14.jpg" className="img-fluid" alt="famous"/>
                <div className='famous-content position-absolute'>
                  <h5>SMARTPHONES</h5>
                  <h6>Smartphone 13 pro. </h6>
                  <p>27-inch 5K Retina display</p>
                </div>
              </div>

            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img src="images/famous12.jpg" className="img-fluid" alt="famous"/>
                <div className='famous-content position-absolute'>
                  <h5>HOME SPEAKERS</h5>
                  <h6>Room-filling sound.</h6>
                  <p>From $699 or $116.58/mo for 12 mo.*</p>
                </div>
              </div>

            </div> 
      </div>

    </Container>
    <Container class1="special-wrapper py-5 home-wrapper-2">
    <div className='row'>
            <div className='col-12'>
              <h3 className="section-heading">Special Products</h3>
            </div>
            <div className='row'>
              {productState && productState?.map((item,index)=>{
                  if(item.tags==="special"){
                  return <SpecialProduct id={item?._id} key={index} brand={item?.brand} title={item?.title} totalrating={item?.totalrating} price={item?.price} sold={item?.sold} quantity={item?.quantity}/>

                  }
          
              })}
{/*               
              <SpecialProduct/>
              <SpecialProduct/>
              <SpecialProduct/> */}

            </div>

          </div>
    </Container>
    <Container class1="famous-wrapper py-5 home-wrapper-2">
    <div className='row'>
           <div className='col-12'>
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
      
            <div className='row'>
              {/* {productState && productState?.map((item,index)=>{
               
                  if(item.tags==="popular"){ */}
                 <ProductCard data={productState?.filter(p => p.tags === "popular")} />

         
          
          
{/*               
              <SpecialProduct/>
              <SpecialProduct/>
              <SpecialProduct/> */}

            </div>
           
           


          </div>
    </Container>
    <Container class1="marque-wrapper home-wrapper-2 py-5">
    <div className="row">
            <div className='col-12'>
              <div className='marquee-inner-wrapper card-wrapper'>
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png"  alt="brand"/>
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png"  alt="brand"/>
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png"  alt="brand"/>
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png"  alt="brand"/>
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand"/>
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png"  alt="brand"/>
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand"/>
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand"/>
                </div>
              </Marquee>
              </div>
            </div>
          </div>

    </Container>
    <Container class1="blog-wrapper py-5 home-wrapper-2">
    
          <div className='row'>
            <div className='col-12'>
              <h3 className="section-heading">Our Latest Blogs</h3>
            </div>
          </div>
          <div className='row'>
            {blogList &&
            blogList?.map((item,index)=>{
              if(index<3){
                return (
                  <div className='col-3' key={index}>
                    <BlogCard id={item?._id}  
                    description={item?.description} 
                    image={item?.image}
                    date={moment(item?.created_at).format("MMMM Do YYYY, h:mm a")}
                    />

                  </div> 

                );
              }
              })
              }
          
              
          

          </div>
        
    </Container>
      <section className='blog-wrapper py-5 home-wrapper-2'>

      </section>

    </>
  );
}

export default Home;
