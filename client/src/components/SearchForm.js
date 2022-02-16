// import { useEffect, useState } from "react";
// import pokemon from "pokemontcgsdk";
// import { Card } from "@material-ui/core";
// import PokemonCard from "./PokemonCard";
// import { cardClasses } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import { Button } from "@mui/material";
// import Box from "@mui/material/Box";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import { withRouter } from "react-router-dom";
// import { EventRepeat } from "@mui/icons-material";
// const MySwal = withReactContent(Swal)
// const fieldArray = ["name", "types", "number"];
// const rarity = [
//   "Amazing Rare",
//   "Common",
//   "LEGEND",
//   "Promo",
//   "Rare",
//   "Rare ACE",
//   "Rare BREAK",
//   "Rare Holo",
//   "Rare Holo EX",
//   "Rare Holo GX",
//   "Rare Holo LV.X",
//   "Rare Holo Star",
//   "Rare Holo V",
//   "Rare Holo VMAX",
//   "Rare Prime",
//   "Rare Prism Star",
//   "Rare Rainbow",
//   "Rare Secret",
//   "Rare Shining",
//   "Rare Shiny",
//   "Rare Shiny GX",
//   "Rare Ultra",
//   "Uncommon",
// ];
// const superTypes = ["Energy", "Pokémon", "Trainer"];

// const subTypes = [
//   "BREAK",
//   "Baby",
//   "Basic",
//   "EX",
//   "GX",
//   "Goldenrod Game Corner",
//   "Item",
//   "LEGEND",
//   "Level-Up",
//   "MEGA",
//   "Pokémon Tool",
//   "Pokémon Tool F",
//   "Rapid Strike",
//   "Restored",
//   "Rocket's Secret Machine",
//   "Single Strike",
//   "Special",
//   "Stadium",
//   "Stage 1",
//   "Stage 2",
//   "Supporter",
//   "TAG TEAM",
//   "Technical Machine",
//   "V",
//   "VMAX",
// ];
// let searchQuery = "";
// function SearchForm() {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubType, setSelectedSubType] = useState("");
//   const [selectedSuperType, setSelectedSuperType] = useState("");
//   const [selectedRarity, setSelectedRarity] = useState("");
//   const [query, setQuery] = useState("");
//   const [pokemonCards, setPokemonCards] = useState([]);

//   const handleChange = (event) => {
//     switch (event.target.name) {
//       case "Category":
//         setSelectedCategory(event.target.value);
//         console.log("category handle change", event.target.value);
//         break;
//       case "FilterOne":
//         setSelectedSubType(event.target.value);
//         console.log("filterOne handle change", event.target.value);
//         break;
//       case "FilterTwo":
//         setSelectedSuperType(event.target.value);
//         console.log("filterTwo handle change", event.target.value);
//         break;
//       case "FilterThree":
//         setSelectedRarity(event.target.value);
//         console.log("filterThree handle change", event.target.value);
//         break;
//       case "Query":
//         setQuery(event.target.value);
//         console.log("query handle change", event.target.value);
//         break;
//       default:
//         console.log("invalid input");
//         break;
//     }
//   };

//   const handleSubmit = (event) => {
//     queryBuilder();
//     console.log("in subit with query", searchQuery);
//     pokemon.card.where({ q: `${searchQuery}` }).then((cards) => {
//       console.log("card", cards.data);
//       if(cards.data <= 0 ){
//         MySwal.fire({
//             title: <p>Search Error</p>,
//             footer: 'Copyright 2018',
//             didOpen: () => {
//               MySwal.clickConfirm()
//             }
//           }).then(() => {
//             return MySwal.fire(<p>Sorry, there are no cards matching your search</p>)
//           })
//       }
//       setPokemonCards(cards.data);
      
//     });
//   };

//   const queryBuilder = () => {
//     let queryPlatform = `${selectedCategory}:${query}`;
//     let subTypeQuery = "";
//     let superTypeQuery = "";
//     let rarityQuery = "";

//     if (selectedSubType) {
//       subTypeQuery = `subtypes:${selectedSubType}`;
//     }
//     if (selectedSuperType) {
//       superTypeQuery = `supertype:${selectedSuperType}`;
//     }
//     if (selectedRarity) {
//       rarityQuery = `rarity:${selectedRarity}`;
//     }
//     searchQuery =
//       queryPlatform +
//       " " +
//       subTypeQuery +
//       " " +
//       superTypeQuery +
//       " " +
//       rarityQuery;
//     console.log("end of query builder with query: ", searchQuery);
//   };

//   const handleClear = () => {
//     setQuery("");
//     setPokemonCards([]);
//     setSelectedCategory("name");
//     setSelectedSubType("");
//     setSelectedSuperType("");
//     setSelectedRarity("");
//   };

//   return (
//     <>
//       <Box
//         component="form"
//         sx={{
//           "& .MuiTextField-root": { m: 1, width: "50ch" },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <div>
//           <TextField
//             required
//             id="outlined-required"
//             label="Required"
//             value={query}
//             name="Query"
//             onChange={handleChange}
//             helperText="Please select enter search query"
//           />
//         </div>
//         <div>
//           <FormControl
//           required>
//             <FormLabel id="demo-row-radio-buttons-group-label">
//               Search Category
//             </FormLabel>
//             <RadioGroup
//               row
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="Category"
//               onChange={handleChange}
//             >
//               <FormControlLabel
//                 type="radio"
//                 onChange={handleChange}
//                 value="name"
//                 control={<Radio />}
//                 label="Name"
//               />
//               <FormControlLabel
//                 type="radio"
//                 onChange={handleChange}
//                 value="types"
//                 control={<Radio />}
//                 label="Type"
//               />
//               <FormControlLabel
//                 type="radio"
//                 onChange={handleChange}
//                 value="number"
//                 control={<Radio />}
//                 label="Number"
//               />
//                <FormControlLabel
//                 type="radio"
//                 onChange={handleChange}
//                 value="id"
//                 control={<Radio />}
//                 label="Id"
//               />
//             </RadioGroup>
//           </FormControl>
//         </div>
//         <div>
//           <FormControl>
//             <FormLabel id="filter-menu">Filter By:</FormLabel>
//             <TextField
//               id="outlined-select-field"
//               select
//               label="Select"
//               name="FilterOne"
//               value={selectedSubType}
//               onChange={handleChange}
//               helperText="Please select desired Sub Type"
//             >
//               {subTypes.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//             <TextField
//               id="outlined-select-field"
//               select
//               label="Select"
//               name="FilterTwo"
//               value={selectedSuperType}
//               onChange={handleChange}
//               helperText="Please select desired SuperType"
//             >
//               {superTypes.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//             <TextField
//               id="outlined-select-field"
//               select
//               label="Select"
//               name="FilterThree"
//               value={selectedRarity}
//               onChange={handleChange}
//               helperText="Please select Rarity"
//             >
//               {rarity.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </FormControl>
//         </div>
//         <div>
//           <Button variant="outlined" onClick={() => handleSubmit()}>
//             {" "}
//             Search{" "}
//           </Button>
//           <Button variant="outlined" onClick={() => handleClear()}>
//             {" "}
//             Clear Search{" "}
//           </Button>
//         </div>
//       </Box>
//       <div className="row row-cols-md-3 g-2">
//         {pokemonCards.map((card) => (
//           <div key={card.id} className="col">
//             <PokemonCard card={card} />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default withRouter(SearchForm);
