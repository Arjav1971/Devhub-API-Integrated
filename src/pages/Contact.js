import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import {AiOutlineHome} from 'react-icons/ai';
import {BiPhoneCall} from 'react-icons/bi';
import {AiOutlineMail} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import Container from '../components/Container';
import * as Yup from 'yup';
import {useDispatch,useSelector} from "react-redux"

import {useFormik} from 'formik'
import { createQuery } from '../features/contact/contactSlice';

let contactSchema = Yup.object({
  name:Yup.string().required("Name is Required"),
  email: Yup.string().email("Email Should be valid").required("Email is Required"),
  mobile:Yup.string().required("Mobile No is required"),
  comment: Yup.string().required("Comment is Required"),
});
const Contact = () => {
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      mobile:"",
      comment:""
    },
    validationSchema:contactSchema,
    onSubmit:(values)=>{
      console.log(values);
      dispatch(createQuery(values));

    }
  
  });
  return (
    <>
      <Meta title={"Contact Us"}/>
      <BreadCrumb title="Contact Us"/>
      <Container class1='contact-wrapper py-5 home-wrapper-2'>

          <div className='row'>
            <div className='col-12'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6707.259947118187!2d74.88711590000001!3d32.8020693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e814c66911587%3A0x315bac25dddbfc0c!2sIIT%20Jammu%20North%20Block!5e0!3m2!1sen!2sin!4v1697778334334!5m2!1sen!2sin" width="600" height="450" className="border-0 w-100" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='col-12 mt-5'>
              <div className='contact-inner-wrapper d-flex justify-content-between'>
                <div>
                  <h3 className='contact-title mb-4'>Contact</h3>
                  <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                    <div>
                      <input type="text" className='form-control' placeholder='Name' name="name" onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} value={formik.values.name}/>
                      <div className='error'>
                          {formik.touched.name && formik.errors.name}
                        </div>
                    </div>
                    <div>
                      <input type="text" className='form-control' name="email" placeholder='Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}/>
                      <div className='error'>
                          {formik.touched.email && formik.errors.email}
                        </div>
                    </div>
                    <div>
                      <input type="text" className='form-control' placeholder='Mobile Number' value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")}/>
                        <div className='error'>
                          {formik.touched.mobile && formik.errors.mobile}
                        </div>
                   
                    </div>
                    <div>
                      <textarea name="" id="" cols="30" rows="10" className='w-100 form-control' placeholder='Comment' value={formik.values.comment} onChange={formik.handleChange("comment")} onBlur={formik.handleBlur("comment")}/>
                      <div className='error'>
                          {formik.touched.comment && formik.errors.comment}
                      </div>
                    </div>
                    <div>
                      <button className='button'>Submit</button> 
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className='contact-title'>Get in touch with Us</h3>
                  <div>
                    <ul className='ps-0'>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                         <AiOutlineHome className='fs-5'/>
                         <address className='mb-0'>
                            GS : 850 Near Yamuna River Front,
                            Noida, Uttar Pradesh
                            Pin Code: 131103
                          </address>
                         
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BiPhoneCall className='fs-5'/>
                        <a href="tel:+91 9301763998">+91 9301763998</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineMail className='fs-5'/>
                        <a href="mailto:arjav@gmail.com">
                          arjav@gmail.com
                        </a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BsInfoCircle className='fs-5'/>
                        <p className='mb-0'>Monday - Friday 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>

      </Container>
    </>
  )
}

export default Contact

