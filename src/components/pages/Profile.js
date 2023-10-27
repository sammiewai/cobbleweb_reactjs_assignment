import {
  Box,
  VStack,
  Avatar,
  Heading
} from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import PhotoSlider from "../layouts/PhotoSlider"
import { MakeApiCall } from "../../helpers/MakeApiCall";

function Profile() {
  const [userData, setUserData] = useState({})
  const fetchUserData = async () => { // TODO: Get access token on successful login
    try {
      const userResp = await MakeApiCall({
        url: 'api/users/me',
        method: 'GET',
        headers: { "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY5ODM4MDgxOCwiZXhwIjoxNjk4Mzg0NDE4fQ.fRt6KHRT7n7dJDtHneRJughUNV87dUxPSzo2BQnj458" }
      });

      if (userResp.success) {
        setUserData(userResp)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  // User data
  const firstName = userData?.data?.firstName || ""
  const lastName = userData?.data?.lastName || ""
  const fullName = `${firstName} ${lastName}`
  const role = userData?.data?.role || "user"
  const avatar = userData?.data?.client?.avatar || "https://i.pravatar.cc/200"
  const photos = userData?.data?.client?.photos || [];

  let userPhotos = []
  if (photos.length > 0) {
    const photosBaseUrl = '/uploads/';

    userPhotos = photos.map((val, idx) => {
      return {
        id: idx,
        url: photosBaseUrl + val.slice(14, val.length),
        title: val.slice(14, val.length - 4),
        description: `${fullName} image ${(idx + 1)}`
      }
    })
  }

  return (
    <Box
      pt={20}
      h={900}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#2A4365"
    >
      <VStack spacing={4}>
        <Avatar size='2xl' name={fullName} src={avatar} />
        <Heading as="h4" size='xl'>
          {fullName}
        </Heading>
        <Heading as="h1" size='sm'>
          {role}
        </Heading>
      </VStack>
      <PhotoSlider photos = {userPhotos}/>
    </Box>
  )
}

export default Profile