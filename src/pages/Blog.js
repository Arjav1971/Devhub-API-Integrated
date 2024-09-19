import React,{useEffect} from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import moment from "moment";
const Blog = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    getBlogs();
  },[])
  const getBlogs=()=>{
    dispatch(getAllBlogs());
  }
  const blogState=useSelector((state)=>state?.blog);
  const blogList=blogState ? blogState.blog :[];
  console.log("blogList",blogList);
  
  return (
    <>
      <Meta title={"Blogs"}/>
      <BreadCrumb title="Blogs"/>
      <Container class1='blog-wrapper home-wrapper-2 py-5'>
      <div className='row'>
                <div className='col-3'>
                <div className='filter-card mb-3'>
                <h3 className='filter-title'>
                  Find By Categories
                </h3>
                <div>
                  <ul className='ps-0'>
                     <li>Watch</li>
                    <li>Camera</li>
                    <li>TV</li>
                    <li>Laptops</li>
                  </ul>
                </div>
              </div>
                </div>
                <div className='col-9'>
                    <div className='row'>
                      
                      {blogList &&
                        blogList?.map((item,index)=>{
                          return (
                            <div className='col-6 mb-3' key={index}>
                              <BlogCard id={item?._id}  
                              description={item?.description} 
                              image={item?.image}
                              date={moment(item?.created_at).format("MMMM Do YYYY, h:mm a")}
                              />

                            </div> 

                          )
                        })
                      }
 
                    </div>
                </div>
        </div>

      </Container>
 
    </>
  )
}

export default Blog
