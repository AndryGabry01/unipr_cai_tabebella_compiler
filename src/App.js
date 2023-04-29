
//TODO
/**
 * Sistemare css
 * implementare ora e data
 * 
 * Riordinare il progetto
 */
import React, { useState } from "react";
import moment from 'moment';
import './App.css';
import Header from "./component/Header";
import mezzi_compensativi from './mezzi_compensativi.json'

import PdfGen from "./component/PdfGen";
//import Table from "./component/TablePDF/Table"; //https://kags.me.ke/post/generate-dynamic-pdf-incoice-using-react-pdf/
import WebFont from 'webfontloader';
document.title = "CAI - Tabella";
//!INSERIRE FAVICON

//LOADING FONT
WebFont.load({
  google: {
    families: ['Open Sans:300,400,700', 'sans-serif']
  }
});
function App() {

  const [updateforce, setUpdateforce] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const [userData, setuserData] = useState({ nomecognome: "", matricola: 0, corso: "", annocorso: 0 });
  const [examData, setexamData] = useState({ nomedocente: "", nomeesame: "", isParziale: false, isOrale: false, dataesame: "", oraesame: "" });
  //const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  /*
  TODO: ADD COOKIE TO SAVE CHECK SELECTION AND INPUT FOR FUTURE VISIT 
  TODO: const [cookies, setCookie, removeCookie] = useCookies(['unipr_cai_list']);
  TODO https://www.npmjs.com/package/react-cookie
  */

  /**Mezzi compensativi */
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
  /** Input text, data e ora */
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
        exam_temp.nomedocente = event.target.value;
        break;
      case "nomeesame":
        exam_temp.nomeesame = event.target.value + " ";

        break;
      case "isParziale":
        exam_temp.isParziale = event.target.checked;
        break;
      case "isOrale":
        exam_temp.isOrale = event.target.checked;
        break;
      case "dataEsame":
        exam_temp.dataesame = moment(new Date(event.target.value)).format('DD/MM/YYYY');
        break;
      case "oraesame":
        exam_temp.oraesame = moment(event.target.value, "HH:mm").format('HH:mm');
        break;
      default:
        break;
    }
    //Update exam and user data
    setuserData(userd_temp);
    setexamData(exam_temp);
    //Forza l'update, server per far si che il pulsante di download si aggiorni
    setUpdateforce(updateforce + 1)
    /*-First--*/
    console.log("first")

    console.log(userData, examData, updateforce)
  }
  /**Prepara i dati da mandare al componente del pulsante Download */
  const DownloadButton = () => {
    const exam = examData;
    const pdf_data = {
      user: userData,
      exam: examData,
      listaMezziComp: {
        mezzi: mezzi_compensativi,
        mezzi_scelti: checkedList
      },
      update: updateforce
    }
    /*-Sec--*/
    console.log("sec")
    console.log(userData, exam, updateforce, pdf_data)

    return <PdfGen data={pdf_data} />
  }

  return (
    <div className="card">
      <Header />

      <div className="Informazioni_studente">
        <h2>Informazioni</h2>
        <input type="text" placeholder="Nome e Cognome" onInput={handle_input} data-name="nomecognome"></input>
        <input type="number" placeholder="Matricola" data-name="matricola" onInput={handle_input} ></input>
        <input type="text" placeholder="Corso di laurea (Es: 3061 INGEGNERIA DELLE TECNOLOGIE INFORMATICHE)" data-name="corso" onInput={handle_input} ></input>
        <input type="number" placeholder="Anno di Corso" data-name="annocorso" onInput={handle_input} ></input>
        <input type="text" placeholder="Nome del Docente" onInput={handle_input} data-name="nomedocente"></input>
        <input type="text" placeholder="Nome dell'insegnamento" onInput={handle_input} data-name="nomeesame"></input>
        <div className="switchs">
          <label class="switch">
            <input type="checkbox" data-name="isParziale" onChange={handle_input} ></input>
            <span class="slider">Parziale</span>
          </label>
          <label class="switch">
            <input type="checkbox" data-name="isOrale" onChange={handle_input} ></input>
            <span class="slider">Orale</span>
          </label>
        </div>
        <div className="switchs">
          <input type="date" placeholder="dd-mm-yyyy" onInput={handle_input} data-name="dataEsame"></input>
          <input type="time" onInput={handle_input} data-name="oraesame"></input>
        </div>
        <span id='datepickerId'></span>


      </div>

      <div className="mezzi_comp">
        <h2>Richiesta</h2>
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
        <h2>Mezzi Richiesti</h2>
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
      <span className="Designer">Designed by <a target="_blank" href="https://wandry.it">Andrea Gabriele</a>&<a target="_blank" href="https://urlshortener.at/agr38">SSU</a></span>
    <script>
      
    </script>
    </div>
  );
}
//https://urlshortener.at/total-of-clicks.php?u=urlshortener.at%2Fagr38 ssu link counter
/**
 *  La lista dei mezzi compensativi si aggiorna
 * ! questo comando seve per scaricare il pdf, pero il problema è che se pre incluso fa laggare tutto poi che ad ogni modifica crasha.
    <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
 
 */
export default App;