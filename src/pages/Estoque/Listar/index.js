import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Footer from '../../../components/Footer';
import useApi from '../../../helpers/AloneAPI';
import {mudarTitulo, isLogged} from '../../../helpers/AuthHandler';

import {ExportCSV} from './ExportCSV';

import { useReactToPrint } from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './Impressao';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const Page = () => {

    let api = useApi();
    let logged = isLogged();
    mudarTitulo("Listar Estoque");

    const componentRef = useRef(0);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    const fileName = "ListarEstoque";


    const [estoqueLista, setEstoqueLista] = useState([]);
    const [id, setId] = useState('');    
    const [produto, setProduto] = useState('');
    const [qtdMinima, setQtdMinima] = useState('');       
    const [qtd, setQtd] = useState('');
    const [dataDeValidade, setDataDeValidade] = useState('');                
    const [busca, setBusca] = useState('');

    useEffect(()=>{
        const getListEstoque = async () => {
            const estoque = await api.getListaEstoque();
            setEstoqueLista(estoque);
        }
        getListEstoque();
    }, []);

    const handleGerarDocumento = async () => {
        const classeImpressao = new Impressao(estoqueLista);
        const documento = await classeImpressao.PreparaDocumento();
        pdfMake.createPdf(documento).open();
    }

    const handleAlterar = async () => {
        
        if(!logged){
            alert("Você não está logado!");
        }
        if(qtd === estoqueLista[handlePosicao(id)].qtd &&
           dataDeValidade === estoqueLista[handlePosicao(id)].dataValidade &&
           qtdMinima === estoqueLista[handlePosicao(id)].qtdMinima)
           {
                alert("Ao menos um campo precisa ser alterado antes de ser enviado!");
           }    
        else{
        
            const json = await api.editEstoque(id, dataDeValidade, qtd, qtdMinima);

            if(json.error){
                alert(JSON.stringify(json.error));
            }else{
                alert("O estoque foi alterado com sucesso!");
                
            }

            setId('');            
            setQtd('');
            setQtdMinima('');
            setDataDeValidade(''); 
            setProduto('');          
            window.location.reload("/estoqueLista");
        }

    }


    const handlePosicao = (n) => {
        for(let i in estoqueLista){
            if(estoqueLista[i]._id === n){
                return i;
            }
        }
    }

    const handleEditar = (index) => {
        setId(estoqueLista[handlePosicao(index)]._id);        
        setQtd(estoqueLista[handlePosicao(index)].qtd);
        setQtdMinima(estoqueLista[handlePosicao(index)].qtdMinima);
        setProduto(estoqueLista[handlePosicao(index)].name);
        setDataDeValidade(estoqueLista[handlePosicao(index)].dataValidade);        
    }
    
    const estoqueFiltro = estoqueLista.filter((estok)=> estok.name.toLowerCase().includes(busca.toLowerCase()) || 
    estok.dataValidade.toLowerCase().includes(busca.toLowerCase()) ||
    estok.dataCadastro.toLowerCase().includes(busca.toLowerCase()) ||
    estok.fabricante.toLowerCase().includes(busca.toLowerCase()) ||
    estok.fornecedor.toLowerCase().includes(busca.toLowerCase()) ||
    estok.unidadeDeMedida.toLowerCase().includes(busca.toLowerCase()) ||
    estok.codigoDeBarras.includes(busca));

    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
            <div class="content-wrapper">
                    {/* Main content */}
                    <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-12">
                            <div className="card card-primary mt-1">
                                <div className="card-header">
                                    <h3 className="card-title">Listar Estoque</h3>
                                    
                                </div>

                                {/* /.card-header */}
                                <div className="card-body"> 
                                    <div class="card">
                                        <div className="card-body table-responsive pad d-flex flex-wrapper">
                                            <div className="btn-group ">
                                                <ExportCSV csvData={estoqueLista} fileName={fileName} />

                                                <button type="button" className="btn btn-success" onClick={()=>{handleGerarDocumento()}}>
                                                    PDF
                                                </button>
                                                <div style={{ display: "none" }}>
                                                    <ComponentToPrint dadosParaImpressao={estoqueLista} ref={componentRef} />                                                    
                                                </div>
                                                <button type="button" className="btn btn-success" onClick={handlePrint}>Print</button>
                                                
                                                                                
                                            </div>
                                            
                                            <div style={{marginLeft: 600}}>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-search" />
                                                        </div>
                                                        <input style={{wdith: 198}} type="text" className="form-control" value={busca} onChange={(e) => {setBusca(e.target.value)}}/>
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <table style={{fontSize: 12}} className="table table-bordered table-hover">
                                        <thead>
                                            <tr class="text-center">
                                                <th>Código</th>
                                                <th>Produto</th>
                                                <th>Fornecedor</th>
                                                <th>Fabricante</th>
                                                <th>Quant.</th>
                                                <th>Quant. Minima</th>
                                                <th>Preço</th>
                                                <th>Valor Em Estoque</th>
                                                <th>Data de Cadastro</th>
                                                <th>Data de Validade</th>
                                                <th>Peso/Volume</th>
                                                <th>Unidade de Medida</th>
                                                <th>Alterar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {estoqueFiltro.map(( item ) => {
                                                return(
                                                    <tr className="text-left" key={item}>
                                                        <td>{item.codigoDeBarras}</td>    
                                                        <td>{item.name}</td>
                                                        <td>{item.fornecedor}</td>
                                                        <td>{item.fabricante}</td>
                                                        <td class="text-center">{item.qtd}</td>
                                                        <td class="text-center">{item.qtdMinima}</td>
                                                        <td>{"R$ " + item.preco}</td>
                                                        <td>{"R$ " + (parseFloat(item.preco) * item.qtd).toFixed(2)}</td>                                                        
                                                        <td class="text-center">{item.dataCadastro}</td>
                                                        <td class="text-center">{item.dataValidade}</td>
                                                        <td class="text-center">{item.pesoVolume}</td>
                                                        <td class="text-center">{item.unidadeDeMedida}</td>
                                                        <td>
                                                            <ul className="navbar-nav ml-auto text-center">
                                                                <li data-toggle="modal" data-target="#modal-xl"  onClick={() => {handleEditar(item._id)}} className="nav-item dropdown">
                                                                    <a className="nav-link">
                                                                        <i className="far fa-edit" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>                                                    
                                                    </tr>                                                   
                                                );
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr class="text-center">
                                            <th>Código</th>
                                                <th>Produto</th>
                                                <th>Fornecedor</th>
                                                <th>Fabricante</th>
                                                <th>Quant.</th>
                                                <th>Quant. Minima</th>
                                                <th>Preço</th>
                                                <th>Valor Em Estoque</th>
                                                <th>Data de Cadastro</th>
                                                <th>Data de Validade</th>
                                                <th>Peso/Volume</th>
                                                <th>Unidade de Medida</th>
                                                <th>Alterar</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {/* /.card-body */}
                            </div>
                            
                        </div>
                        {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                        <div className="modal fade" id="modal-xl">
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Alterar valores de estoque</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div style={{padding: 30, marginLeft: 40, display:"flex", flexWrap:"wrap"}}>
                                            <div >
                                                {/* Nome do Produto */}
                                                <label>Produto:</label>
                                                <div style={{width: 190}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fab fa-product-hunt" />
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Codigo" value={produto} disabled />
                                                    </div>
                                                </div>    
                                            </div>
                                            <div class="ml-5">                            
                                                <label>Nova Validade:</label>
                                                <div style={{width: 190}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="far fa-calendar-alt" />
                                                        </div>
                                                        <input type="text"  className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask value={dataDeValidade} onKeyUp={(e) => {setDataDeValidade(e.target.value)}} />
                                                    </div>
                                                </div>
                                                {/* /.input group */}                            
                                            </div>
                                            <div class="ml-5">
                                                {/* Fornecedor */}
                                                <label>Nova Quantidade:</label>
                                                <div style={{width: 190}} className="form-group mb-1">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-shipping-fast" />
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Qtd" value={qtd} onChange={(e) => {setQtd(e.target.value)}} />
                                                    </div>
                                                </div>
                                            </div>
                                    
                                            <div class="ml-5">
                                                {/* Fabricante */}
                                                <label>Novo Estoque Mínimo:</label>
                                                <div style={{width: 190}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-building" />
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Qtd Mínima" value={qtdMinima} onChange={(e) => {setQtdMinima(e.target.value)}} />
                                                    </div>
                                                </div>
                                            </div>
                                                                                        
                                            </div>
                                        </div>
                                            <div className="modal-footer justify-content-between">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
                                                <button type="button" className="btn btn-primary" onClick={() => {handleAlterar()}}>Salvar</button>
                                            </div>
                                </div>
                                {/* /.modal-content */}
                            </div>
                            {/* /.modal-dialog */}
                        </div>
                    </section>
                    {/* /.content */}
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;