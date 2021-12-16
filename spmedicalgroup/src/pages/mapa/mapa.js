import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { Component } from "react";
import Cabeçalho from "../../components/cabecalho/cabecalho";
import axios from "axios";

class Localizacao extends Component{
    constructor(props){
        super(props)
        this.state={
            listaLocalizacoes: [],
            showingInfoWindow: false,
            marcadorAtivo: {},
            local: {}
        }
    };

    BuscarLocalizacoees = () =>{
        axios("http://localhost:5000/api/Localizacao/ListarTodas")
            .then(resposta => {
                this.setState({listaLocalizacoes: resposta.data})
            })
            .catch(error => console.log(error))
    };

    cliqueMarcador = (props, marker, e) =>
    this.setState({
        local: props,
        marcadorAtivo: marker,
        showingInfoWindow: true
    });

    componentDidMount(){
        this.BuscarLocalizacoees();
    }

    render(){
        return(
            <div>
                <header>
                    <Cabeçalho/>
                </header>
                <main>
                    <Map google={this.props.google} zoom={12}
                        initialCenter={{
                            lat:-23.53620139908343,
                            lng: -46.64622506172682
                        }}>
                            {
                                this.state.listaLocalizacoes.map((item) => {
                                    return(
                                        <Marker onClick={this.cliqueMarcador}
                                            id={item.id}
                                            title={item.id}
                                            name={item.latitude + ", " + item.longitude}
                                            position={{
                                                lat: item.latitude,
                                                lng: item.longitude
                                            }}
                                        />
                                    )
                                })
                            }

                            <InfoWindow
                                marker={this.state.marcadorAtivo}
                                visible={this.state.showingInfoWindow}
                            >
                                <div>
                                    <h1>{this.state.local.name}</h1>
                                </div>
                            </InfoWindow>
                    </Map>
                </main>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey:("AIzaSyA9kmhtDelGqE4rMI1lQQGKf_j6EX2epVE")
})(Localizacao)