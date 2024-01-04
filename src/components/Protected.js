import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useToast
} from '@chakra-ui/react'

const Protected = ({children}) => {
    const toast = useToast();
    const token = localStorage.getItem('token');
    const nav = useNavigate();
  
    useEffect(() => {
      if (!token) {
        console.log("hello");
        toast({
          title: 'Error..!!',
          description: "Please Login to continue",
          status: 'error',
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        });
        nav('/');
      }
    }, [token, toast, nav]);
  
    return token ? children : null;

}

export default Protected