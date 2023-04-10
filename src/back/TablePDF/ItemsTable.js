import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";
import { Fragment } from "react";
import { Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        border: "1px solid black",
        width: "80%",
        borderTop: "none"
    },
});

const ItemsTable = ({ data, user, docente, exam }) => (
    <View style={styles.tableContainer}>
        {console.log(exam)}
        {console.log(data)}
        {/*<TableHeader />*/}
        <Fragment>
            <View style={{ borderTop: "1px solid black" }}>
                <TableRow items={user.items} />
            </View>
            <View style={{ borderTop: "1px solid black" }}>
                <TableRow items={docente.items} />
            </View>
            <View style={{ borderTop: "1px solid black" }}>

                <TableRow items={exam.name} />
            </View>
            <View style={{ borderTop: "1px solid black" }}>
                <TableRow items={exam.date} />
            </View>
        </Fragment>

        {/*<TableFooter items={data.items} />*/}
    </View>
);

export default ItemsTable;