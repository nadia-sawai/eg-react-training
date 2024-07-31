import { useState } from 'react';
import { LoginContext } from '../context/LoginContext';

const LoginProvider = (props:{
  children: React.ReactNode}
) => {
  const {children} = props
  const [isLogin, setIsLogin] = useState(false)

  const toggleLogin = () => {
    setIsLogin(prev => !prev)
  }

  return (
    <LoginContext.Provider value={{isLogin, toggleLogin}}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider
