import {findRidesByAddress} from "../api/ride-api";

export default function TestApiFuncs() {

    let s = document.querySelector('#s'), p = document.querySelector('#p'), st = document.querySelector('#st'), c = document.querySelector('#c');


    return (
        <>
        <div>
        <input id="s" name="street" type="text" />
        <input id="p" name="postal" type="text" />
        <input id="st" name="state" type="text" />
        <input id="c" name="country" type="text" />
        <input type="button" onClick={() => findRidesByAddress(`${c.value}`)} />
        </div>
        </>
    )
}
