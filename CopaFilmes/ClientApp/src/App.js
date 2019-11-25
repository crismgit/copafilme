import React, { Component } from 'react';
import TableRow from './components/TableRow';
import axios from 'axios';
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copaFilmes: [],
            selected: {},
            count: 0,
            disabled: false,
            filme:[],
            arrayVencedor: [],
            filmeVencedor: [],
            modalVisible: false
        };
        this.lockCheck = this.lockCheck.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        axios
            ({
                method: 'get',
                url: 'https://copadosfilmes.azurewebsites.net/api/filmes',

            })
            .then(response => response.data)
            .then((data) => {
                this.setState({ copaFilmes: data })
            })
    };

    //Aumentar contador
    incrementCount = (e) => {
       let count = this.state.count;
        if (count < 0) {
            count = 0;
            this.setState({ count });
        } else {
            this.setState({
                count: count + 1
            });
        }
    }

    //Diminuir contador
    decrementCount = (e) => {
        let count = this.state.count;
        if (count <= 0) {
            count = 0;
            this.setState({count});
        } else { 
        this.setState({
            count: count - 1
            });
        }
    }

    //Desabilitar checkbox
    lockCheck() {
        let count = this.state.count;
        let disabled = this.state.disabled;

        if (count >= 5) {
            disabled = true;
            this.setState({ disabled });
        } else {
            disabled = false;
            this.setState({ disabled });}
    }

    //Zerar o contador. Falta realizar o uncheck dos filmes!!
    delCount = (e) => {
        let count = this.state.count;
        let disabled = this.state.disabled;
        let checkArFilme = this.state.checkArFilme;
        let idCheckFilme = this.state.idCheckFilme;
        let uncheckArFilme = this.state.uncheckArFilme;
        let idUncheckFilme = this.state.idUncheckFilme;

        count = 0;
        this.setState({ count });

        disabled = false;
        this.setState({ disabled });

        checkArFilme = null;
        idCheckFilme = null;
        uncheckArFilme = null;
        idUncheckFilme = null;

        this.setState(checkArFilme);
        this.setState(idCheckFilme);
        this.setState(uncheckArFilme);
        this.setState(idUncheckFilme);
      }
                    

    //Selecionar os filmes clicados
    handleSelect = (e) => {
        let selected = this.state.selected;
        const copaFilmes = this.state.copaFilmes;
        let filme = this.state.filme;

        //[object Object]: {tt3606756: true}
        selected[e.target.name] = e.target.checked;
        this.setState({ selected });

        if (e.target.checked === true) {
            let checkArFilme = [];
            let idCheckFilme = {};

            checkArFilme = Object.keys(selected).filter(function (key) {
                return selected[key] === true;
            });
            
            checkArFilme.forEach((item) => {
                idCheckFilme = item;
                console.log("id Check" + idCheckFilme);
            });

            let posCheck = copaFilmes.findIndex(x => x.id === idCheckFilme);

            filme.push(copaFilmes[posCheck]);
            filme = filme.filter((elem, index, filme) => {
                return filme.indexOf(elem) === index;
            });

            this.incrementCount();

            console.log("check");                       
            checkArFilme = null;
            idCheckFilme = null;
            this.setState(checkArFilme);
            this.setState(idCheckFilme);

        }
        else if (e.target.checked === false) {
            let uncheckArFilme = [];
            let idUncheckFilme = {};

            uncheckArFilme = Object.keys(selected).filter(function (key) {
                return selected[key] === false;
            });
            
            uncheckArFilme.forEach((item) => {
                idUncheckFilme = item;
                console.log("id Uncheck" + idUncheckFilme);
            });

            var removeIndex = filme.map((item) => { return item.id; }).indexOf(idUncheckFilme);

            // remove object
            filme.splice(removeIndex, 1);

            this.decrementCount();

            console.log("uncheck");
            uncheckArFilme = null;
            idUncheckFilme = null;
            this.setState(uncheckArFilme);
            this.setState(idUncheckFilme);
        }
        
        
        this.setState(filme);
        this.lockCheck();
        console.log(JSON.stringify(filme));
    
    }
       

    //Enviar os filmes selecionados para o backend
    handleSubmit = (e) => {
        let filme = this.state.filme;

        axios
            ({
                method: 'post',
                url: 'api/filme/test',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: JSON.stringify(filme),
            })

            .then(response => console.log(response))

            .catch(error => console.log(error))
    }
       
    //Trazer o filme vencedor para o frontend
    handleWinner = (e) => {

        axios
            ({
                method: 'get',
                url: '/api/filme',

            })
            .then(response => response.data)
            .then((data) => {
                this.setState({ arrayVencedor: data })
            })
    };

            
    //Abrir o modal com o filme vencedor. Precisa clicar 2x no Edge para enviar. 
    openModal = (e) => {
        const modalVisible = !this.state.modalVisible;
        this.setState({ modalVisible });
        this.handleSubmit();
        this.handleWinner();
        let arrayVencedor = this.state.arrayVencedor;
        console.log(JSON.stringify(arrayVencedor));
        let filmeVencedor = this.state.filmeVencedor;
        filmeVencedor = arrayVencedor.map(item => {
            return item.titulo;
        })
        this.setState(filmeVencedor);
        console.log(JSON.stringify(filmeVencedor));
    }

     //Fechar o modal
    closeModal = (e) => {
        const modalVisible = !this.state.modalVisible;
        this.setState({ modalVisible });
    }
   

    render() {
        const copaFilmes = this.state.copaFilmes;

        let styles = this.state.modalVisible
            ? { display: "block" }
            : { display: "none" };  

        let filmeVencedor = this.state.filmeVencedor;
           

        return (
            <div>
                <h1>Copa dos Filmes</h1>
                <p>Escolha seus 6 filmes favoritos e clique para conhecer o vencedor:</p>
                <p>Total: <strong>{this.state.count}</strong></p>
                <div id="btnDelCount">
                <button type="button" onClick={this.delCount} className="btn btn-info">Escolha novamente</button>
                </div>
                <div>
                <button type="button" onClick={this.openModal} className="btn btn-info" data-toggle="modal" data-target="#myModal" >Vencedor!</button>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Titulo</th>
                            <th>Ano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            copaFilmes.map(copaFilme => {
                                return (
                                    <TableRow
                                        key={copaFilme.id}
                                        id={copaFilme.id}
                                        titulo={copaFilme.titulo}
                                        ano={copaFilme.ano}
                                        selected={this.state.selected[copaFilme.id]}
                                        disabled={this.state.disabled}
                                        handleSelect={this.handleSelect}
                                    />
                                )
                            })
                        }

                    </tbody>
                </table>

               
                <div className="modal" id="myModal" role="dialog" style={styles} >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Copa de Filmes</h5>
                            </div>
                            <div className="modal-body">
                                <p>Vencedor: {filmeVencedor}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                

             
               
            </div>
            );

        };
    }

export default App;


