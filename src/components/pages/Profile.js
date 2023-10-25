import {
  Box,
  VStack,
  Avatar,
  Heading
} from "@chakra-ui/react";

function Profile() {
  return (
    <Box
      pt={20}
      h={720}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#2A4365"
    >
      <VStack
        spacing={4}
      >
        <Avatar size='2xl' name='Pete' src='https://i.pravatar.cc/150?img=7' />{' '}
        <Heading as="h4" size='xl'>
          Samuel Wainaina
        </Heading>
        <Heading as="h1" size='sm'>
          User
        </Heading>
      </VStack>
    </Box>
  )
}

export default Profile