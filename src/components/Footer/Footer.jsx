import React from 'react'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='grid container'>
        <div className='g_items'>
          {/* <p> <img src="/images/mainlogo.png" alt="" /> </p> */}
          <h3>logo</h3>
          <ul>
            <li>Our aim is to provide high quality, easy to use,  <br /> fastest and affordable Website.</li>
            <li className='phone'><b>Phone : 9807865665</b></li>
            <li className='email'><b>Email : anielthakur1921@gmail.com</b></li>
          </ul>
        </div>

        <div className='gridChild'>
          <div className='gridSibling'>
            <h3>INFORMATION</h3>
            <p>Latest News</p>
            <p>Careers</p>
            <p>My Account</p>
            <p>My Cart</p>
            <p>Orders & Returns</p>
            <p>Contact Us</p>
          </div>
          <div className='gridSibling'>
            <h3>POPULAR COLLECTIONS</h3>
            <p>Laptop & Computer</p>
            <p>Audio Accessories</p>
            <p>Smartphones & Tablets</p>
            <p>Video Games</p>
            <p>Orders & Returns</p>
            <p>LED TVs</p>
          </div>
          <div className='gridSibling'>
            <h3>CUSTOMER SERVICE</h3>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Shipping & Returns</p>
            <p>Help & FAQs</p>
            <p>Refund Policy</p>
            <p>Customer Service</p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer