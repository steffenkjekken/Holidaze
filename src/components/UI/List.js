import useApi from "../../hooks/useApi"
import { URL, SortByCreated } from "../utils/constants"
import { Item } from "./Item";
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';


const List = (props) => {
    const { data, isLoading, isError } = useApi(URL + SortByCreated);
    
    if (isLoading) {
      return< CircularProgress color="secondary" />;
    }
  
    if (isError) {
      return <div>Error</div>;
    }

    //console.log(data);

    const filterVenues = data.filter((el) => {
     
      if (props.input === '') {
          return el;
      }
      
      else {
          return el.name.toLowerCase().includes(props.input)
      }
    })

    return (
        <Grid container spacing={2} sx={{ 
            pt:"20px",
            px: {xs:"15px", md:"10px"},
            maxWidth: '950px',
            margin: 'auto'}}>   
            {data ? filterVenues.map((venue, id)=>{
                return <Grid xs={12} sm={6} md={4} key={id} alignItems="center" justifyContent="center"><Item venue={venue}/></Grid>;
            }): "data not found"}
        </Grid>
    )
}

export default List