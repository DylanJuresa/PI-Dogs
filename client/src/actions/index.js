import axios from "axios"

export function getDogs() {
    return async function (dispatch) {
        var info = await axios.get(`http://${process.env.REACT_APP_IP}:3001/dogs`, {});
        return dispatch({
            type: "GET_DOGS",
            payload: info.data
        })
    }
}



export function getDogByName(name) {
    return async function (dispatch) {
        var info = await axios.get(`http://${process.env.REACT_APP_IP}:3001/dogs?name=` + name)
        return dispatch({
            type: "GET_DOG_BY_NAME",
            payload: info.data
        })

    }

}

export function getDogById(id) {
    return async function (dispatch) {
        var info = await axios.get(`http://${process.env.REACT_APP_IP}:3001/dogs/` + id)
        return dispatch({
            type: "GET_DOG_BY_ID",
            payload: info.data
        })

    }

}



export function getTemperaments() {
    return async function (dispatch) {
        var info = await axios.get(`http://${process.env.REACT_APP_IP}:3001/dogs`, {});
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: info.data
        })
    }
}



export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }

}

export function orderByWeight(payload) {
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }

}

export function postDog(payload) {


    let infoPost = {
        name: payload.nombre,
        height: payload.alturaMin + " - " + payload.alturaMax,
        weight: [payload.pesoMin, payload.pesoMax],
        yearsLife: payload.añosDeVidaMin + " - " + payload.añosDeVidaMax,
        temperamentos: payload.temperamentos,
        imagen: payload.imagen

    }

    return async function () {
        await axios.post(`http://${process.env.REACT_APP_IP}:3001/dogs`, { infoPost });
        return {
            type: "POST_DOG"
        }
    }



}

export function filter(payload) {
    return {
        type: "FILTER",
        payload

    }

}