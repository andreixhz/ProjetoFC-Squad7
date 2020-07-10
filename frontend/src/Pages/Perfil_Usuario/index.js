import React, { useEffect, useState }  from 'react';
import SelecionarFoto from "../../assets/img/AdicionarFoto.png";
import api from '../../services/api';


function PerfilUsuario() {
   
    const token = localStorage.getItem('token')
   
    const [Perfil, setPerfil] = useState([])
    const [selectedFile, setSelectedFile] = useState();
    const [formData, setFormData] = useState({});

    useEffect(() => {
     const res = api.get('profile', {
        headers: {
            'auth-token': token 
        },
    }) .then(res => {
        setPerfil(res.data);
    })}, []);
    
    const handleUploadFile = event => setSelectedFile(event.target.files[0])

    async function handleUpdateProfile(event) {
        event.preventDefault()
        
        try {
            const image = new FormData();
            image.append('file', selectedFile)

            await api.put('update/profile/image', image, {
               headers: {
                    'auth-token': token,   
                },
            }).then( res => {
                alert('Upload deu certo!')
            })
        } catch(err) {
            alert('Erro no upload!')
        }                 
    }
    
    return (
        <div>
            <div className="fundo-cadastro">
                <div className="">
                    <div className="fundo-loja col-9">
                        <div className="foto-usuario">
                        {Perfil.map(Perfil =>
                            <img src={'http://localhost:3333/uploads/' + Perfil.ImagemUsuario} 
                            className="rounded-circle" width='220' height='200'></img>
                        )}
                        </div>
                        <form encType="multipart/form-data" method='put'>
                        <div className="botao-cadastro">
                            <input className="files" type="file" id="profileImage" onChange={handleUploadFile}></input>
                            <button type="submit" className="btn btn-primary" onClick={handleUpdateProfile}>Alterar Dados</button>
                        </div>
                        
                            {Perfil.map(Perfil => 
                            <div className="form-div">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputNome">Nome Completo</label>
                                    <input className="form-control" id="inputEmail4" placeholder="Nome" value={Perfil.Nome}>
                                    </input>
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input type="text" className="form-control" id="inputEmail4" placeholder="E-mail" 
                                    value={Perfil.Email} disabled/>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputData">Data de Nascimento</label>
                                    <input type="date" className="form-control" id="inputData" value={Perfil.DataNascimento}/>
                                </div>
                                <div className="form-group col-md-7">
                                    <label htmlFor="inputGenero">Gênero</label>
                                    <input type="text" className="form-control" id="inputGenero" value={Perfil.Genero} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCPF">CPF</label>
                                    <input type="text" className="form-control" placeholder="123.456.789-01" id="inputCPF" 
                                    value={Perfil.CPFouCNPF} disabled/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCEP">CEP</label>
                                    <input type="text" className="form-control" id="inputCep" placeholder="08888-000" value={Perfil.Cep} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEnderco">Endereço</label>
                                    <input type="text" className="form-control" id="inputEndereco" value={Perfil.Rua}/>
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputNumero">Número</label>
                                    <input type="text" className="form-control" id="inputNumero" value={Perfil.Numero} />
                                </div>
                                <div className="form-group col-md-7">
                                    <label htmlFor="inputComplemento">Complemento</label>
                                    <input type="text" className="form-control" id="inputComplemento" value={Perfil.Complemento} />
                                </div>
                                <div className="form-group col-md-10">
                                    <label htmlFor="inputPassword">Bairro</label>
                                    <input type="text" className="form-control" id="inputBairro" value={Perfil.Bairro}/>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputData">Estado</label>
                                    <input type="text" className="form-control" id="inputNumero" value={Perfil.EstadoNome} />
                                </div>
                                <div className="form-group col-md-9">
                                    <label htmlFor="inputPassword">Cidade</label>
                                    <input type="text" className="form-control" id="inputComplemento" value={Perfil.CidadeNome} />
                                </div>
                                                          
                                <div className="botao-cadastro">
                                    <button type="submit" className="btn btn-primary">Crie uma loja</button>
                                    <button type="submit" className="btn btn-primary">Editar Loja</button>
                                </div>
                            </div>
                            )}
                        </form>
                        <hr></hr>
                        <div className="mini-footer">
                            <p className="subtitulo">Revise seus dados Antes de Confirmar</p>
                        </div>

                    </div>
                    <p>Ao se cadastrar você concorda com os <a className="redirect">Termos de Uso  </a> e a <a className="redirect">Política de Privacidade</a> de BFriend.</p>
                </div>
            </div>
        </div>
    )
} export default PerfilUsuario