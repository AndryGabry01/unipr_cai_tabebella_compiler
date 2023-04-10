import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";

const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: "column",
    },
});

const Table = ({ data, user, docente, exam }) => (

    <ItemsTable data={data} user={user} docente={docente} exam={exam}/>
);

export default Table;