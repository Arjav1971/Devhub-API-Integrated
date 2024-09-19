import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from "react-redux"
import { registerUser } from '../features/user/userSlice';
let signupSchema = Yup.object({
  firstname:Yup.string().required("First Name is required"),
  lastname:Yup.string().required("Last Name is required"),
  email: Yup.string().email("Email Should be valid").required("Email is Required"),
  mobile:Yup.string().required("Mobile No is required"),
  password: Yup.string().required("Password is Required"),
});
const Signup = () => {
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile:"",
      password:""
    },
    validationSchema:signupSchema,
    onSubmit:(values)=>{
      console.log(values);
      dispatch(registerUser(values));
    }
  
  });
  return (
    <>
      <Meta title={"Sign Up"}/>
      <BreadCrumb title="Sign Up"/>
      <Container class1='login-wrapper py-5 home-wrapper-2'>

        <div className='row'>
            <div className='col-12'>
                <div className='auth-card'>
                    <h3 className='text-center mb-3'>Create Account</h3>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                        <CustomInput type="text" name="firstname" placeholder='First Name' value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")}/>
                        <div className='error'>
                          {formik.touched.firstname && formik.errors.firstname}
                        </div>
                        <CustomInput type="text" name="lastname" placeholder='Last Name' value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}/>
                        <div className='error'>
                          {formik.touched.lastname && formik.errors.lastname}
                        </div>

                        <CustomInput type="email" name="email" placeholder='Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}/>
                        <div className='error'>
                          {formik.touched.email && formik.errors.email}
                        </div>
                        <CustomInput type="tel" name="mobile" placeholder='Mobile Number' value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")}/>
                        <div className='error'>
                          {formik.touched.mobile && formik.errors.mobile}
                        </div>
                        <CustomInput type="password" name="password" placeholder='Password' value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")}/>
                        <div className='error'>
                          {formik.touched.password && formik.errors.password}
                        </div>
                        <div className='mt-1'>
                            <div className='d-flex justify-content-center gap-15 align-items-center'>
                                <button className='button border-0'>Sign Up</button>
                                
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

      </Container>
    </>
  )
}

export default Signup
