import React, { useEffect,useState } from 'react';
import {NavLink,Link, useNavigate} from "react-router-dom";
import  {BsSearch} from 'react-icons/bs'
import { useDispatch,useSelector } from 'react-redux';
import {Typeahead} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/products/productSlice';

const Header = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [totalAmount,setTotalAmount]=useState(null)
    const [paginate, setPaginate] = useState(true);
    const usercartState=useSelector(state=>state?.auth?.cartProduct);
    const productState=useSelector(state=>state?.product?.products);
    const [productOpt,setProductOpt]=useState([]);
    const authState=useSelector(state=>state.auth)
    // const range = (start, end) => {
    //     return Array.from({ length: end - start }, (v, k) => k + start);
    //   };
    // const options = range(0, 1000).map((o) => `Item ${o}`);
      
    useEffect(()=>{
        let sum=0;
        for(let index=0;index<usercartState?.length;index++){
            sum=sum+(Number(usercartState[index].quantity)*Number(usercartState[index].price))
        }
        setTotalAmount(sum);
    },[usercartState])
    useEffect(()=>{
        let data=[];
        for(let index=0;index<productState?.length;index++){
            const element=productState[index];
            data.push({id:index,prod:element?._id,name:element?.title})
        }
        setProductOpt(data);
    },[productState])
    console.log("Prod",productOpt)
    const handleLogout=()=>{
  
        localStorage.clear()
        window.location.reload()
        navigate("/")
    }
  return (
    <>
    <header className="header-top-strip py-3">
        <div className="container-xxl">
            <div className="row">
                <div className="col-6">
                    <p className='text-white mb-0'>Free Shipping Over $100 & Free Returns</p>
                </div>
                <div className="col-6">
                    <p className="text-end text-white mb-0">Hotline:<a className="text-white" href="tel:+91  9301763998">+91 9301763998</a></p>
                </div>
            </div>

        </div>
    </header>
    <header className="header-upper py-3">
        <div className='container-xxl'>
            <div className='row align-items-center'>
                <div className='col-2'>
                    <h1>
                        <Link className="text-white">DevHub</Link>
                    </h1>
                </div>
                <div className='col-5'>
                    <div className="input-group">
                        {/* <input type="text" className="form-control py-2" placeholder="Search Product Here..." aria-label="Search Product Here..." aria-describedby="basic-addon2"/> */}
                        <Typeahead id="pagination-example" onChange={(selected)=>{
                            navigate(`/product/${selected[0]?.prod}`)
                            dispatch(getAProduct(selected[0]?.prod))
                            }} labelKey={"name"} onPaginate={() => console.log('Results paginated')} options={productOpt} paginate={paginate} placeholder="Search for Products here..."/>
                        <span className="input-group-text p-3" id="basic-addon2"><BsSearch className="fs-4"/></span>
                    </div>
                </div>
                <div className='col-5'>
                    <div className="header-upper-links d-flex align-items-center justify-content-between">
                        {/* <div>
                            <Link to="/compare-product" className="d-flex align-items-center gap-10 text-white">
                                <img src="/images/compare.svg" alt="compare"/>
                                <p className="mb-0">
                                    Compare<br/> Products
                                </p>
                            </Link>
                        </div> */}
                        <div>
                            <Link to="/wishlist" className="d-flex align-items-center gap-10 text-white"><img src="/images/wishlist.svg" alt="wishlist"/>
                            <p className="mb-0">Favourite<br/> wishlist</p></Link>
                        </div>
                        <div>
                            <Link to={authState?.user===null ? "/login" :"/my-profile"} className="d-flex align-items-center gap-10 text-white"><img src="/images/user.svg" alt="user"/>
                            {/* <p className="mb-0"> */}
                                {
                                    authState?.user===null ? <p className='mb-0'>
                                        Log in<br/> My Account </p> : <p className='mb-0'>Welcome {authState?.user?.firstname}</p>
                                }
                                {/* Login<br/> My Account */}
                           
                            </Link>
                        </div>
                        <div>
                            <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                                <img src="/images/cart.svg" alt="cart"/>
                                <div className="d-flex flex-column">
                                    <span className="badge bg-white text-dark">{usercartState?.length ? usercartState?.length : 0}</span>
                                    <p className="mb-0">${totalAmount? totalAmount: 0}</p>
                                </div>
                           
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </header>
    <header className="header-bottom py-3">
        <div className='container-xxl'>
            <div className="row">
                <div className="col-12">
                    <div className="menu-bottom d-flex align-items-center gap-30">
                        <div>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                               <img src="images/menu.svg"/> <span className="mes-5 d-inline-block">Shop Categories</span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item text-white" to="">Action</Link></li>
                                <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
                                <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
                            </ul>
                        </div>

                        </div>
                        <div className="menu-links">
                            <div className="d-flex align-items-center gap-15">
                                <NavLink className="text-white" to="/">Home</NavLink>
                                <NavLink className="text-white" to="/product">Our Store</NavLink>
                                <NavLink className="text-white" to="/my-orders">My Orders</NavLink>
                                <NavLink className="text-white" to="/blogs">Blogs</NavLink>
                                <NavLink className="text-white" to="/contact">Contact</NavLink>
                                <button onClick={handleLogout} className='border border-0 bg-transparent text-white text-uppercase'>Logout</button>

                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </header>

    </>
  );
  
}

export default Header
