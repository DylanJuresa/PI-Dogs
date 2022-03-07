import React from "react";
import "./Paginado.css"

export default function Paginado({ dogsPerPage, allDogs, paginado, currentPage, setCurrentPage }) {
    const pageNumbers = []


    for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i + 1);

    }

    return (

        <div>
            <ul className="paginado ">
                {
                    pageNumbers && pageNumbers.map(number => {
                        return (
                            <li className="estilo" onClick={() => paginado(number)}>
                                <a style={{ fontFamily: "cursive" }}>{number}</a>
                            </li>

                        )

                    })
                }
            </ul>
            <div className="paginadoResponsive">
                <button onClick={() => {
                    if (currentPage === pageNumbers[0]) {

                    }
                    else {
                        setCurrentPage(currentPage - 1)
                    }
                }}>{"<"}
                </button>
                <li className="estilo" >
                    <a style={{ fontFamily: "cursive" }}>{currentPage}</a>
                </li>
                <button onClick={() => {
                    if (currentPage === pageNumbers[pageNumbers.length - 1]) {

                    }
                    else {
                        setCurrentPage(currentPage + 1)
                    }
                }} >{">"}</button>

            </div>

        </div>

    )
}