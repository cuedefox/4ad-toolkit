import React from "react";
import { Link } from "react-router-dom";

const TableItem = ({item}) => {
    const cargarImagen = require.context("../assets/img/tables-items", true);
    return <Link to={`/table/${item.id}`}>
        <div className="table-item">
            <img src={cargarImagen(`./${item.img}`)} alt={`${item.name}`} />
            <h5>{item.name}</h5>
        </div>
    </Link>
}

export default TableItem;