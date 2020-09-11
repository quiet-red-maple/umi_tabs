import React from 'react';
import { history } from 'umi';
import BasicLayout from './BasicLayout';
import LoginLayout from './LoginLayout';
import { getLocalStorage, getSessionStorage } from '@/untils/stroge';

interface Props {
  location: Location;
}

const Layouts: React.FC<Props> = props => {
  const { children, location } = props;

  const storageData = getSessionStorage() || getLocalStorage();

  let nowPathname = location.pathname.split('/');

  if (!storageData || nowPathname[1] === 'user') {
    history.push('/user/login');
    return <LoginLayout children={children} />;
  }

  return <BasicLayout children={children} pageProps={props} />;
};

export default Layouts;
