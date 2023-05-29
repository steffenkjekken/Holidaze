import List from "../components/UI/List";
import { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import HeaderPhoto from "../assets/images/HeaderPhoto.jpg"
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const Venues = () => {
    const [searchField, setSearchField] = useState("");
    let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setSearchField(lowerCase);
    };

    return( 
        <>
        <Box sx={{
            width:"100%",
            backgroundColor:"#F64A4A",
            backgroundImage:{xs:"red", sm:`url(${HeaderPhoto})`},
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: "center",
            py:{xs:2, sm:5},
            margin: "auto",
            mt: {xs:0, sm:0, md:0},
        }}>
        <Typography variant="h5" sx={{
            color:"white",
            textShadow: {xs:"none", sm:"#485E60 1px 0 10px"},
            pb:2,
            fontSize:{xs:"1.4rem", sm:"2rem"},
            fontFamily:"Fugaz One"
        }}>Find your next destination</Typography>
        <TextField
            type="search"
            onChange={inputHandler}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
              }}
            sx={{
                backgroundColor:"white",
                borderRadius: "10px"
            }}
            />
        </Box>
        <List input={searchField}/>
        </>
    )}

export default Venues