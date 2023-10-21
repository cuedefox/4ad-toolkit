import React from "react";
import tables from "../db/tables.json";
import TableItem from "../components/TableItem";

const TablesContainer = () => {
    return <div className="tables-container">
        <h1>Lista de tablas</h1>
        <div className="tables">
            {
                tables.map(item => <TableItem item={item} key={item.id} />)
            }
        </div>
    </div>
}

export default TablesContainer;