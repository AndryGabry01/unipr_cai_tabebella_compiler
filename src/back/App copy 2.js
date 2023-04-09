import React, { useState, useTransition } from "react";
import { FiSquare } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { saveAs } from 'file-saver';

import './App.css';
import mezzi_compensativi from './mezzi_compensativi.json'
import logo from './media/logo.png'; // with import

import PdfGen from "./component/PDFGEN/PdfGen";
import { Page, Text, View, Image, Document, pdf, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Table from "./component/TablePDF/Table"; //https://kags.me.ke/post/generate-dynamic-pdf-incoice-using-react-pdf/

function App() {
  const [checkedList, setCheckedList] = useState([]);
  const [showDownload, setShowDL] = useState(false);
  const [userData, setuserData] = useState({ nomecognome: "", matricola: 0, corso: "", annocorso: 0 });
  const [examData, setexamData] = useState({ nomedocente: "", nomeinsegamento: "", isParziale: false, isOrale: false, dataesame: "" });
  /*const listData = [
    { id: "1", value: "Tempo aggiuntivo (30% o 50% nel caso di disabilità)" },
    { id: "2", value: "Tempo maggiore per riflettere sulla risposta durante l’orale" },
    { id: "3", value: "Uso del PC" },
    { id: "4", value: "Lettura vicariata (tutor lettore)" },
    { id: "5", value: "Uso della calcolatrice" },
    { id: "6", value: "Consultazione di mappe concettuali/mentali (solo parole-chiave)" },
    { id: "7", value: "Consultazione di schemi (solo parole-chiave)" },
    { id: "8", value: "Consultazione di formulari (solo formule)" },
    { id: "9", value: "Consultazione di Dizionari/Codici/Normative" },
    { id: "10", value: "Conversione dello scritto in orale" },
    { id: "11", value: "Conversione dell’orale in scritto" },
    { id: "12", value: "Divisione dell’esame in più prove parziali" },
    { id: "13", value: "Variazione della tipologia di prova (ad es. domande aperte invece di test a scelta multipla)" },
    { id: "14", value: "Valutazione dei contenuti più che della forma" },
    { id: "15", value: "Valutazione dei procedimenti più che dei risultati" },
    { id: "16", value: "Interrogazione per primo o ultimo (in caso di esame orale)" },
    { id: "17", value: "Interrogazione senza uditori (in caso di esame orale)" },
    { id: "18", value: "Scrivere domande e/o risposte in stampatello" },
    { id: "19", value: "Testo dell’esame Ingrandito" },
    { id: "20", value: "Tenere fogli bianchi e una penna per le prove" },
    { id: "21", value: "Se possibile niente doppie negazioni all’interno delle domande" },
    { id: "22", value: "Informare il/la docente delle difficoltà nello scritto e/o nell’orale" }
  ];*/

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      //Add checked item into checkList
      setCheckedList([...checkedList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };
  const handle_input = (event) => {
    const userd_temp = userData
    const exam_temp = examData
    switch (event.target.dataset.name) {
      case "nomecognome":
        userd_temp.nomecognome = event.target.value;
        break;
      case "matricola":
        userd_temp.matricola = event.target.value;
        break;
      case "corso":
        userd_temp.corso = event.target.value;
        break;
      case "annocorso":
        userd_temp.annocorso = event.target.value;

        break;
      /** Esame */
      case "nomedocente":
        exam_temp.corso = event.target.value;
        break;
      case "nomeinsegnamento":
        exam_temp.annocorso = event.target.value;

        break;
      case "isParziale":
        console.log(event.target.checked)
        exam_temp.isParziale = event.target.checked;
        //!exam_temp.isParziale = event.target.value;
        console.log("miao")

        break;
      case "isOrale":
        console.log(event.target.checked)
        exam_temp.isOrale = event.target.checked;
        break;
      case "dataEsame":
        exam_temp.dataesame = event.target.value;
        break;
      default:
        break;
    }
    setuserData(userd_temp);
    setexamData(exam_temp)
  }

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      display: "flex",
      flexDirection: "column"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  // Create Document Component
  const data = {
    id: "5df3180a09ea16dc4b95f910",
    items: [
      {
        sr: 1,
        desc: "desc1",
        xyz: 5,
      },
      {
        sr: 2,
        desc: "desc2",
        xyz: 6,
      },
    ],
  };
  const compilaHandle = () => {
    setShowDL(true);
    console.log("2jdhjh")
  }
  const DownloadButton = () => {

    const pdf_data = {
      user: userData,
      exam: examData,
      listaMezziComp: {
        mezzi: mezzi_compensativi,
        mezzi_scelti: checkedList
      }
    }
    return <PdfGen data={pdf_data} />
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <img src={logo}></img>
          <h1>Creatore di Schede Richiesta di Esame Personalizzato</h1>
          <p>Compila i seguenti campi per generare il pdf da inviare al Docente</p>
        </div>
        <div className="Informazioni_studente">
          <h3>Le tue informazioni</h3>
          <input type="text" placeholder="Nome e Cognome" onInput={handle_input} data-name="nomecognome"></input>
          <input type="number" placeholder="Matricola" data-name="matricola" onInput={handle_input} ></input>
          <input type="text" placeholder="Corso di laurea (Es: 3061 INGEGNERIA DELLE TECNOLOGIE INFORMATICHE)" data-name="corso" onInput={handle_input} ></input>
          <input type="number" placeholder="Anno di Corso" data-name="annocorso" onInput={handle_input} ></input>
        </div>

        <div className="Informazioni_esame">
          {/*Continuare FUNZIONE HANDLE EXAM CHE FA SI CHE GLI INPUT VENGANO Salvati IN UNO*/}

          <h3>informazioni sull'Esame</h3>
          <input type="number" placeholder="Nome del Docente" onInput={handle_input} data-name="nomedocente"></input>
          <input type="number" placeholder="Nome dell'insegnamento" onInput={handle_input} data-name="nomeinsegnamento"></input>
          <div className="checkbox-container la">
            <label><input type="checkbox" onChange={handle_input} data-name="isParziale"></input>È un parziale?</label>
          </div>
          <div className="checkbox-containInput={handle_input} ner la">
            <label><input type="checkbox" data-name="isOrale"></input>È un orale?</label>
          </div>
          <span>Data dell'Esame</span>
          <input type="date" onInput={handle_input} data-name="dataEsame"></input>
        </div>

        <div className="mezzi_comp">
          <h3>Mezzi Compensativi</h3>
          <div className="list">

            {mezzi_compensativi.map((item, index) => {
              return (
                <div key={item.id} className="checkbox-container">
                  <label><input
                    type="checkbox"
                    name="languages"
                    value={item.value}
                    onChange={handleSelect}
                  />
                    {item.value}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mezzi_comp_select">
          <h3>Mezzi Compensativi Selezionati</h3>
          <div className="list">
            {checkedList.map((item, index) => {
              return (
                <div className="chip">
                  <p className="chip-label">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="Download">
          {<DownloadButton />}

        </div>

      </div>


    </div >
  );
}
/**
 *  La lista dei mezzi compensativi si aggiorna
 * TODO: far si che i campi come nomme cognome ed etc vengano inseriti tramaite gli input
 * ! questo comando seve per scaricare il pdf, pero il problema è che se pre incluso fa laggare tutto poi che ad ogni modifica crasha.
    <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
 
 */
export default App;