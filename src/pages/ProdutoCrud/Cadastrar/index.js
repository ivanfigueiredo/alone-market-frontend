import React, { useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Footer from '../../../components/Footer';
import useApi from '../../../helpers/AloneAPI';
import { mudarTitulo, isLogged } from '../../../helpers/AuthHandler';

const Page = () => {

    const api = useApi();
    const logged = isLogged();
    mudarTitulo("Cadastrar Produto");

    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState();
    const [valorVenda, setValorVenda] = useState();
    const [unidadeDeMedida, setUnidadeDeMedida] = useState();
    const [pesoVolume, setPesoVolume] = useState();
    const [fabricante, setFabricante] = useState();
    const [fornecedor, setFornecedor] = useState();
    const [status, setStatus] = useState('');
    const [listaMedidas, setListaMedidas] = useState([]);
    const [listaFornecedores, setListaFornecedores] = useState([]);

    const opcaoStatus = ["Ativo", "Inativo"];

    useEffect(()=>{
        const getMedidas = async () => {
            const ulist = await api.getMedidas();
            setListaMedidas(ulist);
        }

        const listFornecedor = async () => {
            const fList = await api.listarTodosFornecedores();            
            setListaFornecedores(fList.filter((forn) => forn.status.includes("Ativo")));
        }
        listFornecedor();
        getMedidas();
    }, []);

    const handleCadastrar = async () => {
        
        if(!logged){
            alert("Você não está logado!");
        }else{            
            const json = await api.addAction(codigo, nome, preco, valorVenda, unidadeDeMedida, pesoVolume, fabricante, fornecedor, status);

            if(json.error){
                alert(JSON.stringify(json.error));
            }else{
                alert("Produto cadastrado com sucesso!");
                
            }

            setCodigo('');
            setNome('');
            setPreco('');
            setValorVenda('');
            setPesoVolume('');
            setUnidadeDeMedida('');
            setFabricante('');
            setFornecedor('');
            setStatus('');
        }

    }

    const handleLimpar = () => {
        setCodigo('');
        setNome('');
        setPreco('');
        setValorVenda('');
        setUnidadeDeMedida('');
        setPesoVolume('');
        setFabricante('');
        setFornecedor('');
        setStatus('');
        
    }

    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
                <div style={{marginTop: 5, marginBottom: 5, marginLeft: 300, borderTopLeftRadius: 5, borderTopRightRadius: 5, border:"1px solid #CCC", width: 1000, height: 560, backgroundColor: "#FFF"}}>
                    <div style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, width: 1000, height: 50, backgroundColor:'rgba(0, 123, 255)', display:"flex", alignItems:"center"}}>
                        <text style={{marginLeft: 20, fontSize: 20, color:"#FFF"}}>Cadastrar Produto</text>
                    </div>
                    <div style={{padding: 30, marginLeft: 40, display:"flex", flexWrap:"wrap"}}>
                        
                        <div>
                            {/* Nome do Produto */}
                            <label>Código do Produto:</label>
                            <div style={{backgroundColor: "#FFF", width: 400}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fab fa-product-hunt" />
                                    </div>
                                    <input style={{wdith: 300}} type="text" className="form-control" placeholder="Codigo" value={codigo} onChange={(e)=>{setCodigo(e.target.value.replace(/\D/g, ''))}} />
                                </div>
                            </div>    
                        </div>
                        <div class="ml-5">
                            {/* Nome do Produto */}
                            <label>Nome do Produto:</label>
                            <br />
                            <div style={{width: 400, backgroundColor: "#FFF"}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fab fa-product-hunt" />
                                    </div>
                                    <input style={{wdith: 300}} type="text" className="form-control" placeholder="Produto" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
                                </div>
                            </div>    
                        </div>                        

                        <div class="mt-2">
                            {/*Lista de Unidade de Medidas*/}
                            <label>Fornecedor:</label>
                            <div style={{width: 400}} class="col-md-5">
                                <div class="form-group" style={{marginLeft: -8, width: 400}}>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fas fa-shipping-fast" />
                                        </div>
                                        <select className="form-control" value={fornecedor} onChange={e=>{setFornecedor(e.target.value)}}>
                                            <option></option>
                                            {listaFornecedores.map((item, index) => {
                                                return(
                                                    <option key={index}>{item.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <div class="ml-5 mt-2">
                            {/* Fabricante */}
                            <label>Fabricante:</label>
                            <div style={{width: 400, backgroundColor: "#FFF"}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-building" />
                                    </div>
                                    <input style={{wdith: 300}} type="text" className="form-control" placeholder="fabricante" value={fabricante} onChange={(e)=>{setFabricante(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 mr-5">
                            {/*Preço do Produto*/}
                            <label>Preço:</label>
                            <div style={{width: 250, backgroundColor: "#FFF"}} className="form-group mb-1">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-dollar-sign" />
                                    </div>
                                    <input type="text" style={{width: 139}} className="form-control" placeholder="Preco" value={preco} onChange={(e)=>{setPreco(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div class="ml-4 mt-2 mr-5">
                            {/*Peso ou Volume*/}
                            <label>Valor da Venda:</label>
                            <div style={{width: 250, backgroundColor: "#FFF"}} className="form-group mb-1">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-dollar-sign" />
                                    </div>
                                    <input type="text" style={{width: 139}} className="form-control" placeholder="Valor" value={valorVenda} onChange={(e)=>{setValorVenda(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div class="ml-5 mt-2">
                            {/*Peso ou Volume*/}
                            <label>Peso/Volume:</label>
                            <div style={{width: 170, backgroundColor: "#FFF"}} className="form-group mb-1">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-weight-hanging" />
                                    </div>
                                    <input type="text" style={{width: 139}} className="form-control" value={pesoVolume} onChange={(e)=>{setPesoVolume(e.target.value.replace(/\D/, ''))}}/>
                                </div>
                            </div>
                        </div>                        
                        <div class="mt-3 mr-3">
                            {/*Lista de Unidade de Medidas*/}
                            <label>Unidade de Medidas:</label>
                            <div style={{width: 420}} class="col-md-5">
                                <div class="form-group" style={{marginLeft: -8, width: 177}}>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fas fa-ruler-vertical" />
                                        </div>
                                        <select className="form-control" style={{width: 300}} value={unidadeDeMedida} onChange={e=>{setUnidadeDeMedida(e.target.value)}}>
                                            <option></option>
                                            {listaMedidas.map((item, index) => {
                                                return(
                                                    <option key={index}>{item.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{width: 397}} class="mt-3 ml-3">
                            <label style={{marginLeft: 219}}>Status:</label>
                            <div class="col-md-5">
                                <div style={{marginLeft: 210, width: 177}} class="form-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fas fa-question-circle" />
                                        </div>
                                        <select className="form-control" style={{width: 250}} value={status} onChange={e=>{setStatus(e.target.value)}}>
                                            <option></option>
                                            {opcaoStatus.map((item, index) => {
                                                return(
                                                    <option key={index}>{item}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: -20}}>
                            <button type="button" class="btn btn-primary mt-5 mr-5"  onClick={handleCadastrar}>Cadastrar</button>
                            <button type="button" class="btn btn-primary mt-5 ml-5"  onClick={handleLimpar}>Cancelar</button>
                        </div>
                    </div>
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;