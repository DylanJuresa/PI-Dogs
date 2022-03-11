import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemperaments, postDog } from "../actions";
import { Link } from "react-router-dom";
import s from "./DogCreation.module.css"
import { BiArrowBack } from "react-icons/bi";


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
                imagen: e.target.value

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
            alert("No se pudo crear la raza, complete los campos!" + JSON.stringify(errors))
        }

    }

    return (

        <div className={s.estiloDiv}>

            <form className={s.estiloForm} onSubmit={e => handleSubmit(e)}>
                <button type="button" style={{ alignSelf: "flex-start" }}><Link to={"/dogs"} ><BiArrowBack /></Link></button>
                <div className={s.estiloContainer} onChange={e => handleInput(e)}>
                    <div >
                        <p >Nombre</p>
                        <input type="text" name="nombre" />

                    </div>

                    <div >

                        <p >Peso</p>
                        <input placeholder="Min Weight" type="text" name="pesoMin" />

                        <input placeholder="Max Weight" type="text" name="pesoMax" />


                    </div>

                    <div  >
                        <p >Altura</p>
                        <input placeholder="Min Height" type="text" name="alturaMin" />
                        <input placeholder="Max Height" type="text" name="alturaMax" />

                    </div>

                    <div  >
                        <p>Expectativa de vida</p>
                        <input placeholder="Min LifeSpan" type="text" name="añosDeVidaMin" />
                        <input placeholder="Max LifeSpan" type="text" name="añosDeVidaMax" />
                    </div>

                    <div >
                        <p>Link de imagen</p>
                        <input type="text" placeholder="URL" name="imagen" />
                    </div>
                </div>

                <div className={s.estiloContainer} >
                    <h3>Temperamentos</h3>
                    <div>
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

                        <button className={s.estilobutton} onClick={e => handleDelete(e)}>Borrar eleccion</button>
                    </div>



                    <ul>{input.temperamentos?.map(el => el + ", ")}

                    </ul>

                </div>

                <button type="submit" className={s.estilobutton} style={{ padding: "10px" }}>Crear raza</button>


            </form>
        </div>






    )

}