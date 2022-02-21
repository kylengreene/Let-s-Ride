import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { cardClasses } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { withRouter } from "react-router-dom";
import { EventRepeat } from "@mui/icons-material";
import ClubCard from "./ClubCard"
const MySwal = withReactContent(Swal)
const fieldArray = ["name", "types", "number"];

const rarity = [
  "Amazing Rare",
  "Common",
  "LEGEND",
  "Promo",
  "Rare",
  "Rare ACE",
  "Rare BREAK",
  "Rare Holo",
  "Rare Holo EX",
  "Rare Holo GX",
  "Rare Holo LV.X",
  "Rare Holo Star",
  "Rare Holo V",
  "Rare Holo VMAX",
  "Rare Prime",
  "Rare Prism Star",
  "Rare Rainbow",
  "Rare Secret",
  "Rare Shining",
  "Rare Shiny",
  "Rare Shiny GX",
  "Rare Ultra",
  "Uncommon",
];
const superTypes = ["Energy", "Pokémon", "Trainer"];

const subTypes = [
  "BREAK",
  "Baby",
  "Basic",
  "EX",
  "GX",
  "Goldenrod Game Corner",
  "Item",
  "LEGEND",
  "Level-Up",
  "MEGA",
  "Pokémon Tool",
  "Pokémon Tool F",
  "Rapid Strike",
  "Restored",
  "Rocket's Secret Machine",
  "Single Strike",
  "Special",
  "Stadium",
  "Stage 1",
  "Stage 2",
  "Supporter",
  "TAG TEAM",
  "Technical Machine",
  "V",
  "VMAX",
];
let searchQuery = "";
function SearchForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [selectedSuperType, setSelectedSuperType] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [query, setQuery] = useState("");
  const [clubCards, setClubCards] = useState([]);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "Category":
        setSelectedCategory(event.target.value);
        console.log("category handle change", event.target.value);
        break;
      case "FilterOne":
        setSelectedSubType(event.target.value);
        console.log("filterOne handle change", event.target.value);
        break;
      case "FilterTwo":
        setSelectedSuperType(event.target.value);
        console.log("filterTwo handle change", event.target.value);
        break;
      case "FilterThree":
        setSelectedRarity(event.target.value);
        console.log("filterThree handle change", event.target.value);
        break;
      case "Query":
        setQuery(event.target.value);
        console.log("query handle change", event.target.value);
        break;
      default:
        console.log("invalid input");
        break;
    }
  };

  function HandleSubmit(event){
    queryBuilder();
    console.log("in subit with query", searchQuery);
    useEffect(() => {
        fetch('http://localhost:8080/api/movie')
            .then(response => {
                if (response.status === 200) {

                    return response.json();
                }
            
                return Promise.reject("Unexpected response from the server.");
            }) 
            .then(data => {
                // set(data);
                console.log("data", data);
            })
            .catch(error => {
                console.log(error);
            }); 
    },
    [] 
);
  };

  const queryBuilder = () => {
    let queryPlatform = `${selectedCategory}:${query}`;
    let subTypeQuery = "";
    let superTypeQuery = "";
    let rarityQuery = "";

    if (selectedSubType) {
      subTypeQuery = `subtypes:${selectedSubType}`;
    }
    if (selectedSuperType) {
      superTypeQuery = `supertype:${selectedSuperType}`;
    }
    if (selectedRarity) {
      rarityQuery = `rarity:${selectedRarity}`;
    }
    searchQuery =
      queryPlatform +
      " " +
      subTypeQuery +
      " " +
      superTypeQuery +
      " " +
      rarityQuery;
    console.log("end of query builder with query: ", searchQuery);
  };

  const handleClear = () => {
    setQuery("");
    setClubCards([]);
    setSelectedCategory("name");
    setSelectedSubType("");
    setSelectedSuperType("");
    setSelectedRarity("");
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={query}
            name="Query"
            onChange={handleChange}
            helperText="Please enter search query"
          />
        </div>
        <div>
          <FormControl
          required>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Search Category
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="Category"
              onChange={handleChange}
            >
              <FormControlLabel
                type="radio"
                onChange={handleChange}
                value="clubName"
                control={<Radio />}
                label="Name"
              />
              <FormControlLabel
                type="radio"
                onChange={handleChange}
                value="clubPostalCode"
                control={<Radio />}
                label="Postal Code"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel id="filter-menu">Filter By:</FormLabel>
            <TextField
              id="outlined-select-field"
              select
              label="Select"
              name="FilterOne"
              value={selectedSubType}
              onChange={handleChange}
              helperText="Please select desired Sub Type"
            >
              {subTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>
        <div>
          <Button variant="outlined" onClick={() => HandleSubmit()}>
            {" "}
            Search{" "}
          </Button>
          <Button variant="outlined" onClick={() => handleClear()}>
            {" "}
            Clear Search{" "}
          </Button>
        </div>
      </Box>
      <div className="row row-cols-md-3 g-2">
        {clubCards.map((card) => (
          <div key={card.id} className="col">
            <ClubCard card={card} />
          </div>
        ))}
      </div>
    </>
  );
}

export default withRouter(SearchForm);
