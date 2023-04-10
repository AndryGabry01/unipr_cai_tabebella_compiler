import logo from '../media/logo.png'; // with import

function Header() {
    return (
        <div className="card-header">
                <img src={logo}></img>
                <h1>Creatore di Schede Richiesta di Esame Personalizzato</h1>
               {/* <p>Compila i seguenti campi per generare il pdf da inviare al Docente</p>*/}
        </div>
    )
}
export default Header;