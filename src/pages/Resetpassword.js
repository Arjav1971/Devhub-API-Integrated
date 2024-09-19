import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useLocation, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from "react-redux"
import { resetPassword } from '../features/user/userSlice';

let resetSchema = Yup.object({
  password: Yup.string().required("Password is Required"),

});
const Resetpassword = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const getToken=location.pathname.split("/")[2];
  const formik = useFormik({
    initialValues: {
      password:""
    },
    validationSchema:resetSchema,
    onSubmit:(values)=>{
      console.log(values);
      dispatch(resetPassword({token:getToken,password:values.password}));
      setTimeout(()=>{
        // if(authState.isSuccess){
          navigate('/login')
        // } 
        // 1:25
      },300)

    }
  
  });
  return (
    <>
    <Meta title={"Reset Password"}/>
      <BreadCrumb title="Reset Password"/>
      <Container class1='login-wrapper py-5 home-wrapper-2'>

        <div className='row'>
            <div className='col-12'>
                <div className='auth-card'>
                    <h3 className='text-center mb-3'>Reset Password</h3>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                      <CustomInput type="password" name="password" placeholder='Password' value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")}/>
                      <div className='error'>
                          {formik.touched.password && formik.errors.password}
                      </div>
                      {/* <CustomInput type="password" name="confpassword" placeholder='Confirm Password'/> */}
                      
                        <div>
                            <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                <button className='button border-0'>Submit</button>
                                
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

export default Resetpassword
