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
  SimpleGrid
} from "@chakra-ui/react";

export default function PhotoSlider({photos}) {
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

  return (
    <div className="container">
      <Slider {...settings}>
        {photos.map((photo) => (
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' key={photo.id}>
          <Card maxW='sm'>
            <CardBody>
              <Image alt={photo.title} src={photo.url} boxSize='200px' borderTopRadius="lg" borderBottomRadius="lg" />
              <Stack mt='6' spacing='3'>
                <Heading fontSize='l'>{photo.title}</Heading>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Text mt={4} color='gray.500' fontSize='md' mb={2}>{photo.description}</Text>
            </CardFooter>
          </Card>
          </SimpleGrid>
        ))}
      </Slider>
    </div>
  );
}