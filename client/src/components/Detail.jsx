import React from "react";
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDogById } from "../actions";
import s from "./Detail.module.css"


export default function Detail() {


    const { id } = useParams();
    const dispatch = useDispatch();

    const dogInfo = useSelector((state) => state.detailedDog)


    useEffect(() => {
        dispatch(getDogById(id))
    }, [dispatch])

    if (dogInfo.length && dogInfo[0].createdInDb === false) {
        return (

            <div className={s.estiloDiv}>
                <img src={dogInfo[0].img} alt="A" width="200px" height="250px" />
                <h4>Nombre: {dogInfo[0].name}</h4>
                <h5>Peso: {`${dogInfo[0].weight} Kgs`}</h5>
                <h5>Altura: {`${dogInfo[0].height} cm`}</h5>
                <h5>Temperamentos: {dogInfo[0].temperamentos.toString()}</h5>
                <h5>Años de vida:  {`${dogInfo[0].yearsLife} `}</h5>
                <Link to="/dogs">Volver a Home</Link>

            </div>

        )

    }
    if (dogInfo.length && dogInfo[0].createdInDb === true){
        return (

            <div className={s.estiloDiv}>
                <img src={dogInfo[0].imagen} alt="A" width="200px" height="250px" />
                <h4>Nombre: {dogInfo[0].name}</h4>
                <h5>Peso: {`${dogInfo[0].weight} Kgs`}</h5>
                <h5>Altura: {`${dogInfo[0].height} cm`}</h5>
                <h5>Temperamentos: {dogInfo[0].temperamentos.toString()}</h5>
                <h5>Años de vida:  {`${dogInfo[0].yearsLife} `}</h5>
                <Link to="/dogs">Volver a Home</Link>

            </div>

        )

    }
    else return null



}




