import * as React from 'react';
import useApi from "../hooks/useApi"
import { useParams } from "react-router-dom"
import { URL } from "../components/utils/constants"
import { Grid, Typography, Container} from "@mui/material"
import Image from "mui-image"
import StarIcon from '@mui/icons-material/Star';
import { Booking } from '../components/UI/Booking';
import MetaObjects from '../components/UI/MetaObjects';

const Venue = () => {

    const {id} = useParams()

    const { data, isLoading, isError } = useApi(URL + "/" + id);
    console.log(data.meta);
    const metaData = data.meta

    if (isLoading) {
        return <span className="visually-hidden">Loading...</span>;   
    };
      if (isError) {
        return <div>Error</div>;
      };

    function CheckMediaLength() {

        const mediaArray = data.media
        const firstElement = Array.from(mediaArray)[0];
        console.log(firstElement);

        if (data.media.length === 2) {
            return(
                <Grid container wrap='nowrap' columnSpacing={1}>
                    {mediaArray.map((item, index) => (
                    <Grid item xs={12} key={index}>
                     <Image
                        src={item}
                        srcSet={item}
                        alt={data.title}
                        variant="rounded"
                        loading="lazy"
                        duration={1000}
                        height="45vh"
                        width="100%"
                        sx={{ 
                            borderRadius: index < 1 ? "10px 0 0 10px" : "0 10px 10px 0",
                        }}

                    />
                    </Grid>
                  ))}
                </Grid>
              );
          }
        
        if (data.media.length > 2) {
            return(
                <Grid container wrap='nowrap' columnSpacing={1}>
                <Grid item xs={12}>
                    <Image
                    src={firstElement}
                    srcSet={firstElement}
                    alt={data.title}
                    variant="rounded"
                    loading="lazy"
                    duration={1000}
                    height="100%"
                    width="100%"
                    sx={{
                        borderRadius:"10px 0 0 10px",
                    }}
                    />
                </Grid>
                <Grid container item direction="row" rowSpacing={1} sx={{
                    display: { xs: 'none', sm: 'inline' }
                }}>
                  {mediaArray.slice(1-3).map((item, index) => (
                    <Grid item xs={12} key={index}>
                     <Image
                        src={item}
                        srcSet={item}
                        alt={data.title}
                        variant="rounded"
                        loading="lazy"
                        duration={1000}
                        height="25vh"
                        width="100%"
                        sx={{ 
                            borderRadius: index < 1 ? "0 10px 0 0" : "0 0 10px 0",
                        }}

                    />
                    </Grid>
                  ))}
                </Grid>
                </Grid>
              );
          }
          
          else {
            return (
                <Image
                src={`${data.media[0]}`}
                srcSet={`${data.media[0]}`}
                alt={data.title}
                variant="rounded"
                loading="lazy"
                duration={1000}
                height="45vh"
                width="100%"
                sx={{
                    borderRadius:"5px"
                }}
            />
            )
          }
    }

    return(
       <Container sx={{ 
            pt:"20px",
            maxWidth: {md:'950px'},
            margin: 'auto'}}
        > 
            <Grid container columnSpacing={2}>
                <Grid item xs={10}>
                    <Typography component="h1" variant="h4">{data.name}</Typography>
                    <Typography variant="subtitle1">{data.location.city}</Typography>
                    <Typography component="h6" fontWeight={600}>${data.price}</Typography>
                </Grid>
                <Grid item xs={2} sx={{
                    textAlign: "right"
                }}>
                    <Typography component="h6"><StarIcon color='warning'/> {data.rating}</Typography>
                </Grid>
                <Grid item xs={12} paddingBottom={2}>
                    <CheckMediaLength/>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Typography variant="body" sx={{ whiteSpace: "break-spaces"}}>{data.description}</Typography>
                    <MetaObjects items={metaData} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Booking/>
                </Grid>
            </Grid>
       </Container>
    )
}

export default Venue