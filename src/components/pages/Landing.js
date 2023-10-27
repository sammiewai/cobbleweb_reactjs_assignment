import {
  Box,
  Text,
  Center
} from "@chakra-ui/react";

function Landing() {
  return (
    <Box
      pt={20}
      h={900}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#2A4365"
    >
      <Center>
        <Text>Landing Page</Text>
      </Center>
    </Box>
  )
}

export default Landing