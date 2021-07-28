import React, { useState, useRef} from 'react'
import { BrowserRouter } from 'react-router-dom';
import useApi from '../../../helpers/AloneAPI';
import { isLogged, mudarTitulo } from '../../../helpers/AuthHandler';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Footer from '../../../components/Footer';


const Page = () => {

    const api = useApi();
    const logged = isLogged();
    mudarTitulo("Cadastrar Fornecedor");


    const [cnpj, setCnpj] = useState('');
    const [cpf, setCpf] = useState('');
    const [tipo, setTipo] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [status, setStatus] = useState('');
    const [pessoaFisica, setPessoaFisica] = useState(false);
    const [pessoaJuridica, setPessoaJuridica] = useState(false);

    const opcaoStatus = ["Ativo", "Inativo"];

    const handleCadastrar = async () => { 
        if(pessoaFisica && pessoaJuridica){
            alert("Escolha um tipo de Fornecedor!");
            setPessoaFisica(false);
            setPessoaJuridica(false);
            return;
        }
        
        if( pessoaFisica && cnpj){
            alert("Tipo de fornecedor inválidoo!");
            return;
        }

        if(!logged){
            alert("Você não está logado!");
        }else{

            const json = await api.addFornecedor(cnpj, cpf, razaoSocial, tipo, telefone, bairro, cep, status);

            if(json.error){
                alert(JSON.stringify(json.error));
            }else{
               alert("Fornecedor cadastrado com sucesso!")
            }
            setCnpj('');
            setCpf('');
            setRazaoSocial('');
            setTelefone('');
            setCep('');
            setBairro('');
            setStatus('');
            setTipo('');
            setPessoaFisica(false);
            setPessoaJuridica(false);
        }
    }

    const handleLimpar = () => {
        setCnpj('');
        setCpf('');
        setRazaoSocial('');
        setTelefone('');
        setCep('');
        setBairro('');
        setStatus('');
    }    
   
    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
            <div style={{marginTop: 5, marginBottom: 5, marginLeft: 300, borderTopLeftRadius: 5, borderTopRightRadius: 5, border:"1px solid #CCC", width: 1000, height: 560, backgroundColor: "#FFF"}}>
                    <div style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, width: 1000, height: 50, backgroundColor:'rgba(0, 123, 255)', display:"flex", alignItems:"center"}}>
                        <text style={{marginLeft: 20, fontSize: 20, color:"#FFF", fontWeight:"bold"}}>Cadastrar Fornecedor</text>
                    </div>
                    <div style={{padding: 30, marginLeft: 50, display:"flex", flexWrap:"wrap", backgroundColor:"#FFF"}}>
                        
                        <div>
                            {/* Nome do Produto */}
                            <label>CNPJ:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-building" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e)=>{setCnpj(e.target.value.replace(/\D/g, '')
                                        .replace(/(\d{2})(\d)/, '$1.$2')
                                        .replace(/(\d{3})(\d)/, '$1.$2')
                                        .replace(/(\d{3})(\d)/, '$1/$2')
					                    .replace(/(\d{4})(\d)/, '$1-$2')
                                        .replace(/(-\d{2})\d+?$/, '$1')
                                        )}}
                                    /> 
                                </div>
                            </div>    
                        </div>
                        <div class="ml-5">
                            {/* Nome do Produto */}
                            <label>CPF:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="far fa-address-card" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="000.000.000-00" value={cpf} onChange={(e)=>{setCpf(e.target.value.replace(/\D/g, '')
                                        .replace(/(\d{3})(\d)/, '$1.$2')
                                        .replace(/(\d{3})(\d)/, '$1.$2')
                                        .replace(/(\d{3})(\d)/, '$1-$2')					                    
                                        .replace(/(-\d{2})\d+?$/, '$1')
                                        )}}
                                    /> 
                                </div>
                            </div>    
                        </div>

                        <div class="ml-5">
                            {/* Nome do Produto */}
                            <label>Razão Social:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-building" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="Nome" value={razaoSocial} onChange={(e)=>{setRazaoSocial(e.target.value)}} /> 
                                </div>
                            </div>    
                        </div>

                        <div class="mt-4">
                            {/* Nome do Produto */}
                            <label>Telefone:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-phone-square" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="(00) 0 0000-0000" value={telefone} onChange={(e)=>{setTelefone(e.target.value.replace(/\D/g, '')
                                      .replace(/(\d{2})(\d)/, '($1) $2')
                                      .replace(/(\d{4})(\d)/, '$1-$2')
                                      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
                                      .replace(/(-\d{4})\d+?$/, '$1'))}} 
                                    /> 
                                </div>
                            </div>    
                        </div>

                        <div class="mt-4 ml-5">
                            {/* Nome do Produto */}
                            <label>Bairro:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-city" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="Nome" value={bairro} onChange={(e)=>{setBairro(e.target.value)}} /> 
                                </div>
                            </div>    
                        </div>

                        <div class="mt-4 ml-5">
                            {/* Nome do Produto */}
                            <label>CEP:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="00000-000" value={cep} onChange={(e)=>{setCep(e.target.value.replace(/\D/g, '')
                                        .replace(/(\d{5})(\d)/, '$1-$2')
                                        .replace(/(-\d{3})\d+?$/, '$1')
                                        )}}                                         
                                    /> 
                                </div>
                            </div>    
                        </div>

                        <div style={{width: 286}} class="mt-4">
                            <label>Status:</label>
                            <div class="col-md-5">
                                <div style={{width: 238, marginLeft: -8}} class="form-group">
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

                        <div style={{width: 286}} class="mt-4">
                            <label style={{fontSize: 18}}>Pessoa Física:</label>
                            <div>
                                <input type="checkbox" checked={pessoaFisica} onChange={() => setPessoaFisica(!pessoaFisica)} onClick={() => {setTipo("pessoaFisica")}} /> 
                            </div>
                        </div>
                        
                        <div style={{width: 250}} class="mt-4">
                            <label style={{fontSize: 18}}>Pessoa Jurídica:</label>
                            <div>
                                <input type="checkbox" checked={pessoaJuridica} onChange={() => setPessoaJuridica(!pessoaJuridica)} onClick={() => {setTipo("pessoaJuridica")}} /> 
                            </div>
                        </div>
                                                                                                                                          
                        <div style={{marginTop: 20}}>
                            <button type="button" class="btn btn-primary mt-5 mr-5" onClick={() => {handleCadastrar()}} >Cadastrar</button>
                            <button type="button" class="btn btn-primary mt-5 ml-5" onClick={() => {handleLimpar()}} >Cancelar</button>
                        </div>
                    </div>
                    
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;