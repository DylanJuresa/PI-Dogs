import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../actions";
import s from "./SearchBar.module.css"




export default function SearchBar() {

    const dispatch = useDispatch()


    const [input, setInput] = useState("")

    function handleInput(e) {
        e.preventDefault()
        setInput(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault(e)
        dispatch(getDogByName(input))

    }

    return (

        <div className={s.estilo}>
            <input type="text"
                placeholder="Inserte nombre a buscar"
                onChange={e => handleInput(e)}
            />
            <button style={{borderRadius: "10px" }} onClick={e => handleSubmit(e)} >Buscar</button>
        </div>

    )
}