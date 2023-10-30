import {
  Box,
  VStack,
  Avatar,
  Heading,
  Divider
} from "@chakra-ui/react";
import PhotoSlider from "../layouts/PhotoSlider"
import { useLocation } from "react-router-dom";

function Profile() {
  const {state} = useLocation(); // Get passed profile from route
  const userData = state.profile; // TODO: disable access when null

  // User data
  const firstName = userData?.data?.firstName || ""
  const lastName = userData?.data?.lastName || ""
  const fullName = `${firstName} ${lastName}`
  const role = userData?.data?.role || "user"
  const avatar = userData?.data?.client?.avatar || "https://i.pravatar.cc/200"
  const photos = userData?.data?.client?.photos || [];

  let userPhotos = []
  if (photos.length > 0) {
    userPhotos = photos.map((val, idx) => {
      let parsedData = JSON.parse(val)
      return {
        id: idx,
        url: (parsedData.path).slice(87),
        title: (parsedData.name).slice(0, -4),
        description: `${fullName} image ${(idx + 1)}`
      }
    })
  }

  return (
    <Box
      pt={10}
      h={900}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#2A4365"
    >
      <VStack spacing={4}>
        <Avatar size='2xl' name={fullName} src={avatar} />
        <Heading as="h4" size='xl'>
          Hello, I am {fullName}
        </Heading>
        <Heading as="h1" size='sm'>
          Role: {role}
        </Heading>
        <Divider />
        <PhotoSlider photos = {userPhotos}/>
      </VStack>
    </Box>
  )
}

export default Profile