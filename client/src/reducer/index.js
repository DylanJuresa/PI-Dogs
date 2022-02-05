
const InitialState = {
    dogs: [],
    allDogs: [],
    detailedDog: [],
    temperaments: []

}


function rootReducer(state = InitialState, action) {
    switch (action.type) {
        case "GET_DOGS":

            action.payload.filter(el => el.createdInDb === true).forEach(e => e.temperamentos = e.temperamentos.map(el => el.name))

            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }


        case "GET_DOG_BY_NAME":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case "GET_DOG_BY_ID":
            let dogById = action.payload

            if (dogById[0].createdInDb === true) {
                dogById.forEach(e => e.temperamentos = e.temperamentos.map(el => el.name))

            }
            return {
                ...state,
                detailedDog: dogById
            }


        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }


        case "ORDER_BY_NAME":
            let sortArray;

            if (action.payload === "asc") {
                sortArray = state.allDogs.slice().sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0
                })

            }
            if (action.payload === "dsc") {

                sortArray = state.allDogs.slice().sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0
                });
            }


            if (action.payload === "Sin Ordenar") {
                sortArray = state.dogs

            }


            return {
                ...state,
                allDogs: sortArray
            }

        case "ORDER_BY_WEIGHT":

            let filterDogs = state.allDogs.filter(el => el.weight.length === 2)

            let dogsWeight



            if (action.payload === "max") {
                dogsWeight = filterDogs.slice().sort(function (a, b) {
                    if ((a.weight[1] - b.weight)[1] < 0) {
                        return 1
                    }
                    if ((a.weight[1] - b.weight[1]) > 0) {
                        return -1;
                    }
                    return 0
                })

            }
            if (action.payload === "min") {

                dogsWeight = filterDogs.slice().sort(function (a, b) {
                    if ((a.weight[0] - b.weight[0]) > 0) {
                        return 1
                    }
                    if ((a.weight[0] - b.weight[0]) < 0) {
                        return -1;
                    }
                    return 0
                })
            }

            if (action.payload === "Sin Ordenar") {

                dogsWeight = state.dogs

            }

            return {
                ...state,
                allDogs: dogsWeight
            }

        case "FILTER":

            let tempFiltered

            let { temps, type } = action.payload


            if (temps !== "Sin Filtrar" && type === "Todos") {
                tempFiltered = (state.allDogs).filter(el => el.temperamentos?.includes(temps))

            }

            if (temps !== "Sin Filtrar" && type === "Db") {
                tempFiltered = (state.allDogs).filter(el => el.temperamentos?.includes(temps) && el.createdInDb === true)

            }

            if (temps == "Sin Filtrar" && type === "Todos") {
                tempFiltered = state.dogs

            }
            if (temps === "Sin Filtrar" && type === "Db") {

                tempFiltered = state.dogs.filter(el => el.createdInDb === true)

            }

            return {
                ...state,
                allDogs: tempFiltered
            }



        case "POST_DOG":
            return {
                ...state
            }




        default: return state;
    }

}
export default rootReducer;