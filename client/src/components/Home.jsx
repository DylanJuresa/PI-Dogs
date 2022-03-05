import React from "react";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDogs, getTemperaments, orderByName, orderByWeight, filter } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado.jsx";
import SearchBar from "./SearchBar";
import s from "./Home.module.css";
import { useMediaQuery } from 'react-responsive'
import { AiOutlineMenu } from "react-icons/ai";



export default function Home() {

    const dispatch = useDispatch();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(max-width: 1365px)'
    })
    const isMobileOrTablet = useMediaQuery({
        query: '(max-width: 665px)'
    })

    //// VARIABLES CON ACCESO AL ESTADO GLOBAL REDUX

    const allDogs = useSelector((state) => state.allDogs)
    const allTemps = useSelector((state) => state.temperaments)

    //// ESTADOS LOCALES

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const [filtersOn, setFiltersOn] = useState({

        temps: "Sin Filtrar",
        type: "Todos"

    })
    const [isResponsive, setIsResponsive] = useState(false);

    //// PAGINADO
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    //// EFFECTS
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    //// HANDLERS
    function handleClick(ev) {
        ev.preventDefault()
        dispatch(getDogs())
    }

    function handleAlphabeticSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
    }
    function handleWeightSort(e) {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)

    }

    function handleFilters(e) {
        e.preventDefault()

        if (e.target.value === "Todos" || e.target.value === "Db") {
            setFiltersOn({
                ...filtersOn,
                type: e.target.value

            })
        }
        else {
            setFiltersOn({
                ...filtersOn,
                temps: e.target.value
            })
        }

    }

    function handleFiltersOn(e) {
        dispatch(filter(filtersOn))

    }


    return (
        <div className={s.container}>

            <nav className={s.estiloNav}>
                <Link to="/dogs/creation" >Crear Raza</Link>


                <div className={isResponsive&&isDesktopOrLaptop ? s.estiloFiltrosResponsive : s.estiloFiltros}>


                    {isMobileOrTablet?<SearchBar/>:false}
                    {/* ÓRDEN ALFABETICO */}

                    <select onChange={e => handleAlphabeticSort(e)} >
                        <option value="asc">A-Z</option>
                        <option value="dsc">Z-A</option>

                    </select>

                    {/* ÓRDEN POR PESO MAXIMO Y MINIMO */}

                    <select onChange={e => handleWeightSort(e)} >
                        <option value="Sin Ordenar" selected >Peso maximo o minimo</option>
                        <option value="max">Peso Maximo</option>
                        <option value="min">Peso Minimo</option>
                    </select>



                    {/* FILTRO ---> TEMPERAMENTOS */}

                    <select onChange={e => handleFilters(e)} >

                        <option value="Sin Filtrar" selected >Temperamento</option>
                        {
                            allTemps && allTemps.map(el => {
                                return (
                                    <option value={el.name}>{el.name}</option>
                                )

                            })
                        }

                    </select>

                    {/* FILTRO --> CREADO EN DB O TRAIDO DE API */}

                    <select onChange={e => handleFilters(e)}>

                        <option value="Todos" selected>Todos</option>
                        <option value="Db" >Creadas en DB</option>


                    </select>

                    <button onClick={e => handleFiltersOn(e)} style={{ fontFamily: "cursive", borderRadius: "10px" }}>Filtrar</button>




                </div>



                {isMobileOrTablet?false:<SearchBar />}

                {isDesktopOrLaptop ? <button onClick={() => setIsResponsive(!isResponsive)} style={{ fontSize: "20px", backgroundColor: "slateblue" }}><AiOutlineMenu></AiOutlineMenu></button> : false}






            </nav>




            <div className={s.cards}>
                {
                    currentDogs?.map(el => {
                        return (

                            <Card id={el.id} name={el.name} img={el.img} temperamentos={el.temperamentos} weight={el.weight} createdInDb={el.createdInDb} />

                        )
                    })

                }

            </div>

            <div className={s.estiloButtonReload}>
                <button style={{ fontFamily: "cursive", borderRadius: "10px" }} onClick={e => { handleClick(e) }}>
                    Volver a cargar todos los perros
                </button>

            </div>



            <Paginado

                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />


        </div >


    )



}