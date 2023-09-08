import  { useContext } from 'react'

import { useLocation } from 'react-router-dom';
import {AuthContext} from '../../context/Auth/AuthProvider';


export default function RequireAuthLogic() {
    const {myinfo:{role}} = useContext(AuthContext);
    
  
   
    const location = useLocation();
    return {
        location ,role
  }
}

