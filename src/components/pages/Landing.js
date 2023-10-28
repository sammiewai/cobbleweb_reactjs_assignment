import {
  Box,
  Heading,
  VStack,
  ButtonGroup,
  Button,
  Avatar,
  WrapItem
} from "@chakra-ui/react";
import { NavLink } from 'react-router-dom'

function Landing() {
  return (
    <Box
      pt={10}
      h={700}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#2A4365"
    >

      <VStack spacing={4}>
        <WrapItem mb={5}>
          <Avatar src='/diamond.png' name='Icon' size='xl' />
        </WrapItem>
        <Heading as='h1' size='4xl' noOfLines={1} fontFamily='Cursive'>
          Cobbleweb Profile Portal
        </Heading>
        <Heading as='h1' size='lg' noOfLines={1} fontFamily='Brush Script MT'>
          Register, login and automatically access your profile
        </Heading>
        <ButtonGroup variant='outline' spacing='6' mt='20'>
          <NavLink to="register">
            <Button colorScheme='blue'>Register</Button>
          </NavLink>
          <NavLink to="login">
            <Button colorScheme='facebook'>Login</Button>
          </NavLink>
        </ButtonGroup>
      </VStack>
    </Box>
  )
}

export default Landing