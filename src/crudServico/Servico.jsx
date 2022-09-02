import React, {useEffect, useState} from "react";
import './Servico.css';
import axios from "axios";


export default function ServicoFunction() {
 
    const [servico, setServico] = useState({nomeCliente: '', dataInicio:'',dataTermino:'',descricao:'', valorServico:'', valorPago:'', dataPagamento:'', status:''});
       const [servicos, setServicos] = useState([]);
       const [atualizar, setAtualizar] = useState({});
       
       useEffect(()=>{
        // o que será executado
           axios.get("http://localhost:8080/api/servico/").then(result=>{
            //console.log(result.data.content);
            setServicos(result.data.content);
           });
       },[atualizar/**variáveis de alteração*/])
 
    
    function handleChange(event){
        setServico({...servico,[event.target.name]:event.target.value});
    }

    function handleSubmit(event){
        event.preventDefault(); 

        if(servico.id==undefined){
            axios.post("http://localhost:8080/api/servico/", servico).then(result => {
                console.log(result.data);
                setAtualizar(result.data);
                //atualizar a nossa tabela

            }); 
        } else{
            axios.put("http://localhost:8080/api/servico/", servico).then(result => {
                setAtualizar(result.data);
                //atualizar a nossa tabela

            });
        }
        
               
    }
    function limpar(event) {
        setServico({ nomeCliente: '', dataInicio: '', dataTermino: '', descricao: '', valorServico: '', valorPago: '', dataPagamento: '', status: '' });
    }
    function listarTodos(event) {
        axios.post("http://localhost:8080/api/servico/", servico).then(result => {
            setAtualizar(result.data);
            //atualizar a nossa tabela

        });
    }
    function pagamentoPendente(event){
        axios.put("http://localhost:8080/api/servico/buscarPagamentoPendente", servico).then(result => {
            setAtualizar(result.data);
            //atualizar a nossa tabela

        });
    }

    function servicosCancelados(event) {
        axios.put("http://localhost:8080/api/servico/buscarCancelado", servico).then(result => {
            setAtualizar(result.data);
            //atualizar a nossa tabela

        });
    }
    
    function excluir(id){
        axios.delete("http://localhost:8080/api/servico/"+id).then(result => {
            setAtualizar(id);
        });
    }
        return (
            <div>
               <h1>Cadastro de usuário</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">Nome Cliente</label>
                        <input name="nome" className="form-control" value={servico.nomeCliente} onChange={handleChange} type="text" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Data Inicio</label>
                        <input name="email" className="form-control" value={servico.dataInicio} onChange={handleChange} type="date" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Data Término</label>
                        <input name="email" className="form-control" value={servico.dataTermino} onChange={handleChange} type="date" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Descrição</label>
                        <input name="nome" className="form-control" value={servico.descricao} onChange={handleChange} type="text" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Valor Servico</label>
                        <input name="nome" className="form-control" value={servico.valorServico} onChange={handleChange} type="number" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Valor Pago</label>
                        <input name="nome" className="form-control" value={servico.valorPago} onChange={handleChange} type="number" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Data Pagamento</label>
                        <input name="email" className="form-control" value={servico.dataPagamento} onChange={handleChange} type="date" /><br /><br />
                    </div> 
                    <br />
                    
                    <input type="submit" className="btn btn-success" value="Cadastrar" /> &nbsp;&nbsp; <br /> <br />
                    <input type="button" className="btn btn-secondary" value="Listar Todos" onClick={listarTodos} /> &nbsp;&nbsp;
                    <input type="button" className="btn btn-secondary" value="Pagamentos Pendentes" onClick={pagamentoPendente} /> &nbsp;&nbsp;
                    <input type="button" className="btn btn-secondary" value="Serviços Cancelados" onClick={servicosCancelados} /> &nbsp;&nbsp;

               </form>

                <table className="table table-dark" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome Cliente</th>
                            <th>Data Inicio</th>
                            <th>Data Término</th>
                            <th>Descrição</th>
                            <th>Valor Servico</th>
                            <th>Valor Pago</th>
                            <th>Data Pagamento</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       {servicos.map(servico=> 
                           <tr key={servico.id}>
                               <td>{servico.id}</td>
                               <td>{servico.nomeCliente}</td>
                               <td>{servico.dataInicio}</td>
                               <td>{servico.dataTermino}</td>
                               <td>{servico.descricao}</td>
                               <td>{servico.valorServico}</td>
                               <td>{servico.valorPago}</td>
                               <td>{servico.dataPagamento}</td>
                               <td>{servico.status}</td>
                            <td>
                                   <button onClick={() => setServico(servico)} className="btn btn-primary">Alterar</button> &nbsp;&nbsp;
                                   <button onClick={() => excluir(servico.id)} className="btn btn-danger">Excluir</button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                    

                </table>

               <p>
                    {servico.resultado}
               </p>

               
            </div>
        );
    
}