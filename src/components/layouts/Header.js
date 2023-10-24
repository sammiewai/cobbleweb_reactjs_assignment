import {
    Box,
    HStack,
    Text
} from "@chakra-ui/react";
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <Box
            color="white"
            pl='15px'
            pr='15px'
            bg="#1a1c24"
            h='70px'
        >
            <Box>
                <HStack
                    py={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text fontSize='2xl'><NavLink to="/">LOGO</NavLink></Text>
                    <nav>
                        <HStack spacing={8}>
                            <NavLink to="register">
                                Register
                            </NavLink>
                            <NavLink to="login">
                                Login
                            </NavLink>
                        </HStack>
                    </nav>
                </HStack>
            </Box>
        </Box>
    );
};

export default Header;