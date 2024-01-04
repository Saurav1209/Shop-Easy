import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DataContext from '../context/DataContext'
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Badge,
    PopoverFooter,
    useToast
} from '@chakra-ui/react'

function Navbar(props) {
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSearch(searchInput);
    }
    const a = useContext(DataContext);

    const lowToHigh = () => {
        a.productDispatch({ type: 'SORT_LOW_TO_HIGH' })

    }
    const HightoLow = () => {
        a.productDispatch({ type: 'SORT_HIGH_TO_LOW' });

    }
    const toast = useToast();
    const handleLogout = () => {
        localStorage.removeItem('token');
        //   localStorage.removeItem(a.user.userId);
        localStorage.removeItem('id');
        // console.log(a.user.userId)



        navigate('/');
        toast({
            title: 'Logged Out Successfully',
            status: 'success',
            duration: 2000,
            position: 'top-left',
            isClosable: true,
        })
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-black">
            <div className="container-fluid">
                <Link className="navbar-brand" font-type='Bebas Neue' to="/">
                    Shop Easy
                </Link>


                <div className='navHead' style={{ display: 'flex', justifyContent: 'flex-end' }} >

                    <div className='cart' style={{ marginRight: '15px', marginTop: '5px' }}>
                        <Badge variant='solid' position="absolute"  borderRadius='full' colorScheme='purple' marginTop='-12px' marginLeft='15px'>
                            {a.quantity}
                        </Badge>
                        <Popover trigger='hover'>
                            <PopoverTrigger>
                                <ShoppingCartIcon color="warning" />
                            </PopoverTrigger>
                            <PopoverContent width='200px' color='black' bg='ThreeDFace' borderColor='ActiveBorder'>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader fontWeight='semibold'>Total Price</PopoverHeader>
                                <PopoverBody>

                                    Amount Rs. {a.amt}
                                </PopoverBody>
                                <PopoverFooter display='flex' justifyContent='flex-end'>
                                    <Button onClick={a.handleCart} size='sm' colorScheme='red'>Clear Cart</Button>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>

                    </div>


                    <div className="dropdown px-3">
                        <div className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By
                        </div>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><p className="dropdown-item" onClick={lowToHigh} >Low to High Price</p></li>
                            <li><p className="dropdown-item" onClick={HightoLow} >High to Low Price</p></li>
                        </ul>
                    </div>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                        <button className="btn btn-dark" onClick={handleSubmit} type="submit">Search</button>
                    </form>
              
                    <Button colorScheme='red' mx='15px' onClick={handleLogout}>Logout</Button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
