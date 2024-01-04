import React, { useContext } from 'react'
import { Card, CardBody, Stack, Heading, Text, Button,Divider ,Badge} from '@chakra-ui/react'
import Rating from '@mui/material/Rating';
import './Itemcard.css';
import DataContext from '../context/DataContext'
import ImageCarousel from './ImageCarousel';

export default function Itemcard(props) {
    const a = useContext(DataContext);
    return (
        <div className='cards'>
            <Card boxShadow='md' maxW='md' borderRadius='xl'mt='5' >
              
                <Badge position="absolute" top="0" right="0" borderRadius='full' px='2' colorScheme='linkedin' zIndex='1'>
                {props.category}
                </Badge>
                <CardBody>

                    <Stack mt='3' spacing='1'>
                        <div className='top'>
                            <Heading size='md' alignContent='left' >{props.title}</Heading>
                            {/* <Heading size='sm' alignContent='right' >{props.brand}</Heading> */}

                        </div>
                        <Divider colorScheme='linkedin'/>
                        <center>
                            <div className='image1' >
                                {/* <Image
                                    //  boxSize='250px'
                                    height='250px'
                                    width='400px'
                                    border=' 0.1px solid '
                                    src={props.img}
                                    // src={ `../uploads/${props.image}`}
                                    alt='Item Image'
                                    borderRadius='lg'
                                /> */}
                                <ImageCarousel images={props.images}  />
                            </div>
                        </center>
                        <div className='d-flex flex-row' style={{ justifyContent: 'flex-start' }}>
                            <Text noOfLines={[1, 2, 3]} >
                                {props.description}
                            </Text>

                        </div>
                        <div>
                            <Rating value={props.rating} precision={0.5} readOnly />

                        </div>

                    </Stack>


                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Text fontSize='xl' color='tomato'>${props.price} ({props.discount}% off)</Text>
                        <Button variant='solid' colorScheme='green' pl='5' onClick={() => a.handleclick(props.item)} >
                            <div> Add to Cart</div>
                        </Button>
                    </div>
                </CardBody>

            </Card>
        </div>
    )
}
