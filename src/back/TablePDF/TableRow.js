import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",

    },
    description: {
        width: "30%",
        fontSize: "15px",
        borderRight: "1px solid black",
        padding: "13px",
        wordWrap: "break-word",
    },
    xyz: {
        width: "70%",
        fontSize: "13px",
        paddingLeft: "10px"


    },
});

const TableRow = ({ items }) => {
    const rows = items.map((item) => (
        <View style={styles.row} key={item.sr.toString()}>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.xyz}>{item.xyz}</Text>
        </View>
    ));
    return rows;
};

export default TableRow;