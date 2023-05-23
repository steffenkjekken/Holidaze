import List from "../components/UI/List";
import { useState } from "react";
import { TextField } from "@mui/material";

const Venues = () => {
    const [searchField, setSearchField] = useState("");
    let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setSearchField(lowerCase);
    };

    return( 
        <>
        <TextField
            type="search"
            onChange={inputHandler}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
        <List input={searchField}/>
        </>
    )}

export default Venues