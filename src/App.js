import React from 'react';
import {
  ChakraProvider,
  extendTheme
} from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Landing from './components/pages/Landing';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Landing/>}/>
      <Route path="register" element={<Register />}/>
      <Route path="login" element={<Login />}/>
      <Route path="profile" element={<Profile />}/>
    </Route>
  ) 
)

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#000",
        fontFamily: '"Rubik", sans-serif'
      },
    }),
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
        <RouterProvider router={router}/>
    </ChakraProvider>
  );
}

export default App;
