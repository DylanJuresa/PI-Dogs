import { React } from "react"
import { Link } from "react-router-dom"
import { getDogById } from "../actions";
import s from "./Card.module.css";
import { useDispatch } from "react-redux";





export default function Card({ id, name, img, temperamentos, weight, createdInDb }) {


    const dispatch = useDispatch();
    function dogId() {
        dispatch(getDogById(id));
    }


    return (
        <div className={s.card} >
            <Link onClick={() => dogId()} to={`/dogs/${id}`} ><h3 style={{ color: "black" }}>{name}</h3></Link>
            {createdInDb ? <img src={"https://cdn.pixabay.com/photo/2020/02/12/05/16/dog-cartoon-4841703_960_720.jpg"} alt="A" width="200px" height="150px" /> : <img src={img} alt="A" width="200px" height="150px" />}
            <div>
                <h4>Temperamentos</h4>
                <h4>{temperamentos?.toString()}</h4>
            </div>

            <h5>{`${weight.join("-")} Kgs`}</h5>
        </div>

    )

}








