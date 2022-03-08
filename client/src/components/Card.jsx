import { React } from "react"
import { Link } from "react-router-dom"
import s from "./Card.module.css";



export default function Card({ id, name, img, temperamentos, weight, createdInDb }) {




    if (createdInDb) {
        return (
            <div className={s.card} >
                <Link to={`/dogs/${id}`}><h3 style={{ color: "black" }}>{name}</h3></Link>
                <img src={"https://cdn.pixabay.com/photo/2020/02/12/05/16/dog-cartoon-4841703_960_720.jpg"} alt="A" width="200px" height="150px" />
                <div>
                    <h4>Temperamentos</h4>
                    <h4>{temperamentos?.toString()}</h4>
                </div>

                <h5>{`${weight.join("-")} Kgs`}</h5>
            </div>

        )

    }
    else {
        return (
            <div className={s.card} >
                <Link to={`/dogs/${id}`}><h3 style={{ color: "black" }}>{name}</h3></Link>
                <img src={img} alt="A" width="200px" height="150px" />
                <div>
                    <h4>Temperamentos</h4>
                    <h4>{temperamentos?.toString()}</h4>
                </div>

                <h5>{`${weight.join("-")} Kgs`}</h5>
            </div>

        )

    }







}

