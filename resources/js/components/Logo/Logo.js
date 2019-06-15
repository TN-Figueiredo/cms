import React from 'react';
import ImgLogo from "../../../assets/images/logo.png"

const Logo = props => {
  return (
      <img src={ImgLogo} style={{height: props.height}} alt="Logo"></img>
  )
}

export default Logo
