import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast, FormControl, Input

} from '@chakra-ui/react'
import styles from "./home.module.css"


export default function Login({ userAuthType }) {
    const toast = useToast()

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    if (userAuthType === "login") {
        if (!isOpen) {
            onOpen();
        }
    }
    else {
        if (isOpen) {
            onClose();
        }
    }
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  

    const handleSubmit = (e) => {
        e.preventDefault();

    }
  
    const handleApi = (e) => {
        e.preventDefault();

        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                username: name,
                password: password,

            })
        })
            .then(response => {
                if (!response.ok) {
                    toast({
                        title: 'Error..!!',
                        description: "Invalid Login Credentials",
                        status: 'error',
                        duration: 1000,
                        position: 'top-left',
                        isClosable: true,
                    })
                    throw new Error(`Network response was not ok, status: ${response.status}`);

                }
                return response.json();
            })
            .then(parsedResponse => {
                if (parsedResponse !== undefined) {
                    const data = parsedResponse;
                    // console.log(data);
                 
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('id', data.id)

                    toast({
                        title: 'Logged in Successfully',
                        status: 'success',
                        duration: 2000,
                        position: 'top-bottom',
                        isClosable: true,
                    })
                    navigate('/home')
                    onClose();

                } else {
                    console.error('Parsed response is undefined.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }
    return (
        <div className={styles.loginbtn}>
            <Link to="/?userAuthType=login"> Login</Link>

            <Modal isOpen={isOpen} onClose={() => {
                onClose();
                navigate("/")
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Login</ModalHeader>
                    <ModalCloseButton onClick={() => navigate("/")} />

                    <ModalBody pb={6}>
                        <FormControl onSubmit={handleSubmit}>
                            {/* <FormLabel>First name</FormLabel> */}
                            <Input type="text" placeholder="name"
                                value={name}
                                autoComplete="username"
                                onChange={(event) => setName(event.target.value)} />
                        </FormControl>

                        <FormControl mt={4} >
                            {/* <FormLabel>Last name</FormLabel> */}
                            <Input type="password" placeholder="Password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter style={{ justifyContent: 'center', marginBottomBottom: '5' }} >

                        <Button colorScheme='blue' mr={3} onClick={handleApi} >

                            Login
                        </Button>
                    </ModalFooter>
                    {/* <div className={styles.revert}>
                        <h6>
                            <Link to="/?userAuthType=signup">Don't have an account ?</Link>
                        </h6>
                    </div> */}

                </ModalContent>
            </Modal>
           

        </div>
    )
}
