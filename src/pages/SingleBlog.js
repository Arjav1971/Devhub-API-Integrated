import React,{useEffect} from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi';
import { Link,useLocation } from 'react-router-dom';
import blog from "../images/blog-1.jpg";
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux';
import { getABlog } from '../features/blogs/blogSlice';
const SingleBlog = () => {
  const dispatch=useDispatch();
  const location=useLocation();
  const getBlogId=location.pathname.split("/")[2];
  useEffect(()=>{
    getBlog();
  },[])
  const getBlog=()=>{

    dispatch(getABlog(getBlogId));
  }
  const blogState=useSelector((state)=>state?.blog?.singleBlog);
  const blog=blogState ? blogState.getBlog :{};
  
  console.log("blogList",blog);
  return (
    <>
      <Meta title={blog?.title}/>
      <BreadCrumb title={blog?.title}/>
      <Container class1='blog-wrapper home-wrapper-2 py-5'>

            <div className='row'>
                <div className='col-12'>
                    <div className='single-blog-card'>
                        <Link to="/blogs" className='d-flex align-items-center gap-10'><HiOutlineArrowNarrowLeft className='fs-5'/>Go back to Blogs</Link>
                        <h4 className='title'>{blog?.title}</h4>
                        <img
                        className='img-fluid w-100 my-4' src={blog?.image} alt="blog"/>
                        <p dangerouslySetInnerHTML={{__html:blog?.description}}></p>


                    </div>
                </div>
            </div>

      </Container>
    </>
  )
}

export default SingleBlog
