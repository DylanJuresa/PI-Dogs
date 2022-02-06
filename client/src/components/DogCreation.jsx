import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemperaments, postDog } from "../actions";
import { Link } from "react-router-dom";
import s from "./DogCreation.module.css"


export default function DogCreation() {

    const dispatch = useDispatch()
    const allTemps = useSelector(state => state.temperaments)

    function validation(input) {
        let error1 = "Se requiere especificar un intervalo!"
        let error2 = "Solo se pueden ingresar numeros!"
        let error3 = "Valor minimo tiene que ser menor al max!"


        let errors = {}

        if (!/(.*[a-z]){3}/i.test(input.nombre)) {
            errors.nombre = "Se requiere un nombre de al menos 3 caracteres!"
        }

        if (!input.pesoMin || !input.pesoMax) {
            errors.peso = error1
        }
        else if (isNaN(input.pesoMin) === true || isNaN(input.pesoMax) === true) {
            errors.peso = error2
        }
        else if (parseInt(input.pesoMin) > parseInt(input.pesoMax)) {
            errors.peso = error3
        }
        else if (input.pesoMin < 0 || input.pesoMax < 0) {
            errors.peso = "Solo numeros positivos"
        }


        if (!input.alturaMin || !input.alturaMax) {
            errors.altura = error1
        }
        else if (isNaN(input.alturaMin) === true || isNaN(input.alturaMax) === true) {
            errors.altura = error2
        }
        else if (parseInt(input.alturaMin) > parseInt(input.alturaMax)) {
            errors.altura = error3
        }
        else if (input.alturaoMin < 0 || input.alturaMax < 0) {
            errors.altura = "Solo numeros positivos"
        }

        return errors
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const [input, setInput] = useState({
        nombre: "",
        alturaMin: "",
        alturaMax: "",
        pesoMin: "",
        pesoMax: "",
        añosDeVidaMin: "",
        añosDeVidaMax: "",
        temperamentos: [],
        imagen: ""

    })

    const [errors, setErrors] = useState({})



    function handleInput(e) {

        if (e.target.name === "temperamentos" && !input.temperamentos.includes(e.target.value) && e.target.value !== "temps") {

            setInput({
                ...input,
                temperamentos: [...input.temperamentos, e.target.value]
            })
        }
        if (e.target.name !== "temperamentos") {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })

        }
        if (e.target.name === "imagen") {
            setInput({
                ...input,
                imagen:e.target.value

            })

        }
        setErrors(validation({
            ...input,
            [e.target.name]: e.target.value
        }))

    }
    function handleDelete(e) {

        e.preventDefault()
        setInput({
            ...input,
            temperamentos: []

        })

    }

    function handleSubmit(e) {

        if (!Object.keys(errors).length && ![input.nombre, input.alturaMin, input.alturaMax, input.pesoMin, input.pesoMax].includes("")) {
            dispatch(postDog(input), [dispatch])
            alert("Se ha creado la raza")
        }
        else {
            e.preventDefault()
            alert("No se pudo crear la raza, complete los campos!")
        }

    }

    return (

        <div className={s.estiloDiv}>
            <form className={s.estiloForm} onSubmit={e => handleSubmit(e)}>

                <div >

                    <label onChange={e => handleInput(e)}>
                        <p >Nombre</p>
                        <input type="text" name="nombre" onChange={e => handleInput(e)} />
                    </label >

                    {errors.nombre && (
                        <p>{errors.nombre}</p>
                    )}
                </div>

                <div >
                    <label onChange={e => handleInput(e)}>
                        <p >Peso</p>
                        <input placeholder="Min Weight" type="text" name="pesoMin" />
                        <input placeholder="Max Weight" type="text" name="pesoMax" />
                    </label>
                    {errors.peso && (
                        <p>{errors.peso}</p>
                    )}

                </div>

                <div >
                    <label onChange={e => handleInput(e)}>
                        <p >Altura</p>
                        <input placeholder="Min Height" type="text" name="alturaMin" />
                        <input placeholder="Max Altura" type="text" name="alturaMax" />
                    </label>
                    {errors.altura && (
                        <p>{errors.altura}</p>
                    )}

                </div>

                <div >
                    <label onChange={e => handleInput(e)} >
                        <p>Expectativa de vida</p>
                        <input placeholder="Min LifeSpan" type="text" name="añosDeVidaMin" />
                        <input placeholder="Max LifeSpan" type="text" name="añosDeVidaMax" />
                    </label>


                </div>

                <div>
                    <label onChange={e => handleInput(e)}>
                        <p>Link de imagen</p>
                        <input type="text" placeholder="Ingrese Url"  name="imagen" />
                    </label>
                </div>

                <div>Temperamentos


                    <select name="temperamentos" onClick={e => handleInput(e)}>

                        <option value="temps" selected="Temperamentos">Temperamentos</option>

                        {
                            allTemps && allTemps.map(el => {
                                return (
                                    <option value={el.name}>{el.name}</option>
                                )

                            })

                        }
                    </select>

                </div>


                <ul>{input.temperamentos?.map(el => el + ", ")}
                    <button className={s.estilobutton} onClick={e => handleDelete(e)}>Borrar eleccion</button>
                </ul>



                <button className={s.estilobutton} type="submit">Crear raza</button>


                <Link to={"/dogs"} style={{ position: "absolute", left: "10%" }}>Volver al home</Link>





            </form>




        </div>

    )

}