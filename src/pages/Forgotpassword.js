import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from "react-redux"
import { forgotPasswordToken } from '../features/user/userSlice';

let emailSchema = Yup.object({
  email: Yup.string().email("Email Should be valid").required("Email is Required"),
});

const Forgotpassword = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema:emailSchema,
    onSubmit:(values)=>{
      console.log("Submitting values:", values);
      dispatch(forgotPasswordToken(values))
      // console.log(values);
      // dispatch(loginUser(values));
      // // setTimeout(()=>{
      //   // if(authState.isSuccess){
          // navigate('/')
      // //   }
      // // },300)

    }
  
  });
  return (
    <>
      <Meta title={"Forgot Password"}/>
      <BreadCrumb title="Forgot Password"/>
      <Container class1='login-wrapper py-5 home-wrapper-2'>

            <div className='col-12'>
                <div className='auth-card'>
                    <h3 className='text-center mb-3'>Reset Your Password</h3>
                    <p className='text-center my-2'>We will send you an email to reset your password</p>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                        <CustomInput type="email" name="email" placeholder='Email 'value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}/>
                        <div className='error text-center'>
                          {formik.touched.email && formik.errors.email}
                        </div>
                        <div className='mt-1'>
                            <div className='mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
                                <button className='button border-0' type="submit">Submit</button>
                                <Link to="/login">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

      </Container>
      
    </>
  )
}

export default Forgotpassword
