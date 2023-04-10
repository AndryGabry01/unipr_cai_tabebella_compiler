import React, { Fragment } from "react";
import { Page, Document, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";
import { saveAs } from 'file-saver';

import square from '../media/square.png'; // with import
import cross from '../media/close.png'; // with import
import logoPDF from '../media/logopdf.png'; // with import
function PdfGen({ data }) {   
    return <LazyDownloadPDFButton data={data} />
    // return <MyDocument user={user} exam={exam} docente={docente} listData={data.listaMezziComp} />
}

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

async function getProps(data) {

    const pdf_dat = {
        user: {
            id: "5df3180a09ea16dc4b95f910",
            items: [{
                sr: 1,
                desc: "Cognome e Nome",
                xyz: data.user.nomecognome,
            },
            {
                sr: 2,
                desc: "Numero di Matricola",
                xyz: data.user.matricola,
            }, {
                sr: 3,
                desc: "Corso di Laurea",
                xyz: data.user.corso,
            }, {
                sr: 4,
                desc: "Anno di Corso",
                xyz: data.user.annocorso,
            },]
        }, docente: {
            id: "5df3180a09ea16dc4b95f910",
            items: [{
                sr: 1,
                desc: "Nome e Cognome Docente",
                xyz: data.exam.nomedocente,
            }]
        }, exam: {
            id: "5df3180a09ea16dc4b95f910",
            name: [{
                sr: 1,
                desc: "Nome Esame",
                xyz: data.exam.nomeesame,
            }],
            date: [{
                sr: 1,
                desc: "Giorno ed orario dell’esame: (se ancora non li conosci indica il mese o la sessione",
                xyz: data.exam.dataesame+" "+data.exam.oraesame,
            }],
        }, listaMezziComp: data.listaMezziComp

    }
    console.log(pdf_dat)
    await delay(100);
    return pdf_dat;
}

const LazyDownloadPDFButton = ({ data }) => (
    < button

        onClick={async () => {
            const props = await getProps(data);
            { console.log(props.exam.name[0].xyz) }

            const doc = <MyDocument user={props.user} exam={props.exam} docente={props.docente} listData={props.listaMezziComp} />;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            saveAs(blob, 'SCHEDA DI RICHIESTA DI ESAME PERSONALIZZATO_'+props.user.items[0].xyz+'_'+props.user.items[0].xyz+'_'+props.exam.name[0].xyz+'_'+props.exam.date[0].xyz+'.pdf');
        }}
    >
        Download PDF
    </button >
);

const MyDocument = ({ user, docente, exam, listData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px", marginBottom: "20px" }}>
                <Image src={logoPDF} style={{ width: "250px" }} />
            </View>
            <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
                <Text style={{ width: "100%", marginTop: "10px", display: "flex", textAlign: "center", fontWeight: "ultrabold", justifyContent: "center", fontSize: "15px", marginBottom: "10px" }}>SCHEDA RICHIESTA DI ESAME PERSONALIZZATO</Text>
            </View>
            <View style={{ width: "100%", display: "flex", alignItems: "center", paddingLeft: "40px", paddingRight: "40px", paddingBottom: "20px" }}>
                <Text style={{ display: "flex", justifyContent: "center", fontSize: "16px", }}>Inviare al docente titolare dell’insegnamento e in cc al Referente di Dipartimento e al Centro Accoglienza e Inclusione almeno 10 giorni lavorativi prima della data prevista per l’esame, pena l’impossibilità di accedere al servizio.</Text>
            </View>
            <View style={{ width: "100%", display: "flex", alignItems: "center", paddingLeft: "20px", paddingRight: "20px" }}>
                <Text style={{ display: "flex", justifyContent: "center", fontSize: "16px", marginBottom: "20px" }}>INFORMATIVA: Trattamento dei dati ai sensi dell’art. 13 d.lgs. 196/2003 e Regolamento UE 2016/679 e D.Lgs. 101/2018.</Text>
            </View>
            <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
                <Table user={user} docente={docente} exam={exam} />
            </View>
            <View style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <Text style={{ display: "flex", justifyContent: "center", fontSize: "14px" }}>Centro Accoglienza e Inclusione</Text>
                <Text style={{ display: "flex", justifyContent: "center", fontSize: "14px" }}>www.cai.unipr.it</Text>
            </View>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "40px" }}>
                <View style={{ width: "80%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", border: "1px solid black" }}>
                    <View style={{ width: "30%", display: "flex", alignItems: "center", padding: "10px", }}>
                        <Text style={{ display: "flex", justifyContent: "center", fontSize: "16px", }}>Quale misura compensativa/ dispensativa chiedi?</Text>
                    </View>
                    <View style={{ width: "70%", display: "flex", alignItems: "center", padding: "20px", borderLeft: "1px solid black" }}>
                        <ListaMezziComp listData={listData} />
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);



const ListaMezziComp = ({ listData }) => {
    console.log(listData)
    const rows = listData.mezzi.map((item) => (
        <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "left", alignItems: "left", marginBottom: "10px" }} key={0}>
            <Text style={{ fontSize: "11px" }}>{listData.mezzi_scelti.includes(item.value) ? <Image style={{ width: "20px" }} src={cross} /> : <Image style={{ width: "20px" }} src={square} />}</Text>
            <Text style={{ fontSize: "11px" }}>{item.value}</Text>
        </View>
    ));
    return rows;
};
//https://stackoverflow.com/questions/56373850/how-can-i-create-a-table-using-the-react-pdf-library-for-generation-pdf-report


const styles = StyleSheet.create({
    TableRow: {
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


        }
    },
    ItemsTable: {
        tableContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            border: "1px solid black",
            width: "80%",
            borderTop: "none"
        }
    },
    Table: {
        page: {
            fontSize: 11,
            flexDirection: "column",
        }
    }

});

const ItemsTable = ({ user, docente, exam }) => (
    <View style={styles.ItemsTable.tableContainer}>
        {console.log(exam)}
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



const Table = ({ user, docente, exam }) => (
    <ItemsTable user={user} docente={docente} exam={exam} />
);


const TableRow = ({ items }) => {
    const rows = items.map((item) => (
        <View style={styles.TableRow.row} key={item.sr.toString()}>
            <Text style={styles.TableRow.description}>{item.desc}</Text>
            <Text style={styles.TableRow.xyz}>{item.xyz}</Text>
        </View>
    ));
    return rows;
};

export default PdfGen