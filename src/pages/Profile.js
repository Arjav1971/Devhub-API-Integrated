import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import { FiEdit } from "react-icons/fi";
let profileSchema = Yup.object({
    firstname: Yup.string().required("First name is Required"),
    lastname: Yup.string().required("Last name is Required"),
    email: Yup.string().email("Email Should be valid").required("Email is Required"),
    mobile:Yup.string().required("Mobile No is required"),
  });
const Profile = () => {
    const dispatch=useDispatch();
    const userState=useSelector(state=>state.auth.user);
    const [edit,setEdit]=useState(true)
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
          firstname: userState.firstname,
          lastname: userState.lastname,
          email: userState.email,
          mobile:userState.mobile,
       
        },
        validationSchema:profileSchema,
        onSubmit:(values)=>{
          console.log(values);
          dispatch(updateProfile(values));
          setEdit(true);
        }
      
      });
  return (
    <>
     <BreadCrumb title="My Profile"/>
     <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
            <div className='col-12'>
                <div className='d-flex justify-content-between'>
                    <h3 className='my-3'>Update Profile</h3>
                    <FiEdit className='fs-3' onClick={()=>setEdit(false)}/>
                </div>
            </div>
            <div className='col-12'>
            <form onSubmit={formik.handleSubmit}>
                <div class="form-group mb-3">
                    <label htmlFor="example1">First Name</label>
                    <input type="text" name='firstname' disabled={edit} class="form-control" id="example1" aria-describedby="emailHelp" placeholder="First Name" value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")}/>
                    <div className='error'>
                          {formik.touched.firstname && formik.errors.firstname}
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label htmlFor="example2">Last Name</label>
                    <input type="text" name='lastname' disabled={edit} class="form-control" id="example2" aria-describedby="emailHelp" placeholder="Last Name"  value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}/>
                    <div className='error'>
                          {formik.touched.lastname && formik.errors.lastname}
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" name='email' disabled={edit} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}/>
                    <div className='error'>
                          {formik.touched.email && formik.errors.email}
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label htmlFor="example12">Mobile No</label>
                    <input type="number" name="mobile" disabled={edit} class="form-control" id="example12" aria-describedby="emailHelp" placeholder="Mobile Number" value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")}/>
                    <div className='error'>
                          {formik.touched.mobile && formik.errors.mobile}
                    </div>
                </div>
                {/* <div class="form-check mb-3">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                {!edit  && <button type="submit" class="btn btn-primary">Submit</button>}
            </form>   
            </div>
        </div>
     </Container>

    </>
  )
}

export default Profile
