import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SpecialProduct = (props) => {
    const {id,title,brand,totalrating,price,sold,quantity}=props;
    const navigate=useNavigate();
  
  return (
    <div className='col-6 mb-3'>
        <div className='special-product-card'>
            <div className='d-flex justify-content-between'>
                <div>
                    <img src="images/watch.jpg" className="img-fluid" alt="watch"/>
                </div>
                <div clasName="special-product-content">
                    <h5 className='brand'>{brand}</h5>
                    <h6 className='title'>
                        {title}
                    </h6>
                    <ReactStars
                    count={5}
                    size={24}
                    value={Number(totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                    />
                    <p className='price'>
                        <span className='red-p'>$ {price}</span>&nbsp;
                        {/* <strike>$200</strike> */}
                    </p>
                    <div className='discount-till d-flex align-items-center gap-10'>
                        <p className="mb-0">
                            <b>5 </b>Days 
                        </p>
                        <div className='d-flex gap-10 align-items-center'>
                            <span className='badge rounded-circle p-2 bg-danger'>1</span>: 
                            <span className='badge rounded-circle p-2 bg-danger'>1</span>:
                            <span className='badge rounded-circle p-2 bg-danger'>1</span>:
                        </div>
                    </div>
                    <div className="prod-count my-3">
                            <p>Products: {quantity}</p>
                            <div 
                            class="progress" 
                            // role="progressbar" 
                            // aria-label="Basic example" 
                            // aria-valuenow="25" 
                            // aria-valuemin="0" 
                            // aria-valuemax="100"
                            >
                            <div class="progress-bar" 
                                role="progressbar" 
                                aria-label="Basic example" 
                                aria-valuenow={((quantity)/(quantity+sold))*100}
                                aria-valuemin={quantity}
                                aria-valuemax={sold+quantity}
                                style={{width: ((quantity)/(quantity+sold))*100 +"%"}}></div>
                            </div>
                            
                        </div>
                    <button  className='button' onClick={() => navigate(`/product/${id}`)}>View</button>
                </div>

            </div>
            

        </div>
      
    </div>
  )
}

export default SpecialProduct
