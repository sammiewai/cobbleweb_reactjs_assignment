import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
  Stack,
  Text,
  Heading,
  Card,
  CardBody,
  Divider,
  Image,
  CardFooter,
  ButtonGroup,
  Button,
  SimpleGrid
} from "@chakra-ui/react";

export default function PhotoSlider() {
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  const hotelCards = [
    {
      imageSrc:
        'https://via.placeholder.com/150/0000FF/808080 ?Text=PAKAINFO.com',
      title: 'Studio Room',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 50/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      imageSrc:
        'https://via.placeholder.com/150/FF0000/FFFFFF?Text=yttags.com',
      title: 'Deluxe Room',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 80/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      imageSrc:
        'https://via.placeholder.com/150/FFFF00/000000?Text=google.com',
      title: 'King Deluxe Room',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 150/Day',
      features: ['Free Wifi', 'Free breakfast'],
    },
    {
      imageSrc:
        'https://via.placeholder.com/150/000000/FFFFFF/?text=y2meta.com',
      title: 'Royal Suite',
      description: 'Lorem ipsum dolor sit amet, consectur dolori',
      pricingText: 'USD 299/Day',
      features: [
        'Free Wifi',
        'Free breakfast'
      ],
    },
  ]
  return (
    <div className="container">
      <Slider {...settings}>
        {hotelCards.map((card, index) => (
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          <Card maxW='sm' key={index}>
            <CardBody>
              <Image alt={card.title} src={card.imageSrc} boxSize='200px' borderTopRadius="lg" borderBottomRadius="lg" />
              <Stack mt='6' spacing='3'>
                <Heading fontSize='l'>{card.title}</Heading>
                <Text mt={4} color='gray.500' fontSize='md' mb={2}>{card.description}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              {card.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
              <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue'>
                  Buy now
                </Button>
                <Button variant='ghost' colorScheme='blue'>
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
          </SimpleGrid>
        ))}
      </Slider>
    </div>
  );
}