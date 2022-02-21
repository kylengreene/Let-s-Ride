import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useContext } from "react";
import { withRouter } from "react-router-dom";

function ClubCard({card}){
     function MakeFavorite(card){
         let dbcard = {
             id:`${card.id}`,
             rating: 2,
             comment: '',
             imageUrl:`${card.images.large}` 
         }
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dbcard)
        };
        // useEffect(() => {
        fetch("http://localhost:8080/pcg", init)
            .then(response => {
                if (response.status === 201) {
                    // history.push("/");
                    console.log("success");
                } else {
                    return response.json();
                }
            }).then(result => {
                if (result) {
                   console.log("error result of", result);
                }
            }).catch(console.error)
        
        // }, []);
     }
    
    return(
    <div className="card" >
        <h1>Club Card Here</h1>
    {/* {card.images.large && <img src={card.images.large} className="card-img-top" alt={card.name}></img>} */}
    <div className="card-body">
        {/* <h5 className="card-title">{card.name}</h5> */}
        {/* <h6 className="card-subtitle">{card.types[0]}</h6> */}
    </div>
     <div className="card-footer text-center">
        <button className="btn btn-info me-2" onClick = {() => MakeFavorite(card)}>Favorite</button>
    </div>
</div>
    )
}

export default withRouter(ClubCard);

