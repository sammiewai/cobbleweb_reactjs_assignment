import {Grid, GridItem} from '@chakra-ui/react'
import { Outlet } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'

function RouteLayout() {
  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
        gridTemplateRows={'60px 1fr 30px'}
        gridTemplateColumns={'17% 1fr'}
        gap='1'
      >
        <GridItem area={'header'}>
          <Header />
        </GridItem>
        <GridItem area={'main'} minH='720px'>
          <Outlet />
        </GridItem>
        <GridItem area={'footer'}>
          <Footer />
        </GridItem>
      </Grid>
    </>
  )
}

export default RouteLayout