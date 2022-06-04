import React from 'react'

import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

import propTypes from 'prop-types';

function ShowCase({ products, onClick }) {

 return (
  <StyleRoot>
   <Coverflow
    className={"coverflow"}
    displayQuantityOfSide={2}
    navigation
    enableHeading
    media={{
     '@media (max-width: 900px)': {
      width: '600px',
      height: '300px'
     },
     '@media (min-width: 900px)': {
      width: '960px',
      height: '400px'
     }
    }}
   >
    {
     products.map((product, index) => <img onClick={() => {
      onClick(product)
     }} src={product.image} alt='' />)
    }



    {/* <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc" /> */}

   </Coverflow>
  </StyleRoot>
 )
}

ShowCase.propTypes = {
 products: propTypes.array.isRequired,
 onClick: propTypes.func.isRequired,
}
export default ShowCase
