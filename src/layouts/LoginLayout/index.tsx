import React from 'react';
import Footer from '@/components/Footer';
import BackgroundDOM from './Background';
import './loginLayout.less';

interface Props {
  children: React.ReactNode;
}

const LoginLayout:React.FC<Props> = (props) => {

  const { children } = props;
  return (
    <div className="layout_login">
      <BackgroundDOM/>
      {children}
      <Footer/>
    </div>
  )
}

export default LoginLayout
