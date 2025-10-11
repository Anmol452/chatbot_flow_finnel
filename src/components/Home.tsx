import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { Grid } from "@mui/material";
import Flow from './flow/Flow';
import Menu from './side-navbar/Menu';


const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.background.level1,
    }),
}));


export default function Home() {
  return (
    <div>
      <Grid container spacing={{ lg: 2, xs: 6 }} sx={{ flexGrow: 1 }}>
                  <Grid size={12}> 
                      <Item sx={{}}> header </Item>
                  </Grid>
      
      
                  <Grid size={3}>
                      <Item> <Menu /></Item>
                  </Grid>
      
                   <Grid size={9}>
                      <Item><Flow></Flow></Item>
                  </Grid>
      
                  
                 
              </Grid>
    </div>
  )
}
