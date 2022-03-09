import React, { useState } from "react";
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import s from "./Detail.module.css"


export default function Detail() {


    const data = useSelector((state) => state.detailedDog)
    const [dogInfo, setDogInfo] = useState([])



    useEffect(() => {
        setDogInfo(data)

    }, [dogInfo, data])



    return (
        <div className={s.container}>
            {dogInfo.length !== 0 ?
                <div className={s.estiloContainer}>
                    <img src={dogInfo[0].img} alt="A" width="200px" height="250px" />
                    <div className={s.info}>
                        <h5>Nombre: {dogInfo[0].name}</h5>
                        <h5>Peso: {`${dogInfo[0].weight} Kgs`}</h5>
                        <h5>Altura: {`${dogInfo[0].height} cm`}</h5>
                        <h5>Temperamentos: {dogInfo[0].temperamentos.toString()}</h5>
                        <h5>Años de vida:  {`${dogInfo[0].yearsLife} `}</h5>
                        <Link to="/dogs">Volver a Home</Link>
                    </div>

                  

                </div> : false}

        </div>

    )




}




