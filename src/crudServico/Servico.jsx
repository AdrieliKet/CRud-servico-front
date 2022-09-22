import React, {useEffect, useState} from "react";
import './Servico.css';
import axios from "axios";


export default function ServicoFunction() {
 
    const [servico, setServico] = useState({nomeCliente: '', dataInicio:'',dataTermino:'',descricao:'', valorServico:'', valorPago:'', dataPagamento:'', status:''});
       const [servicos, setServicos] = useState([]); // lista
       const [atualizar, setAtualizar] = useState({});
       
       useEffect(()=>{
        // o que será executado
           listarTodos();
       },[atualizar/**variáveis de alteração*/])
 
    
    function handleChange(event){ // função para atualizar variável sempre que o valor for passado no campo
        setServico({...servico,[event.target.name]:event.target.value});
    }

    function handleSubmit(event){ // quando o formulário for submetido
        event.preventDefault(); 

        if(servico.id==undefined){
            axios.post("http://localhost:8080/api/servico/", servico).then(result => {
                console.log(result);
                setAtualizar(result);
                //atualizar a nossa tabela

            }); 
        } else{
            axios.put("http://localhost:8080/api/servico/", servico).then(result => {
                setAtualizar(result);
                //atualizar a nossa tabela

            });
        }
        limpar();  
    }
    function limpar(event) {
        setServico({ nomeCliente: '', dataInicio: '', dataTermino: '', descricao: '', valorServico: '', valorPago: '', dataPagamento: '', status: '' });
    }
    function listarTodos(event) {
        axios.get("http://localhost:8080/api/servico/").then(result=>{
            //console.log(result.data);
            setServicos(result.data);
           });
    }
    function pagamentoPendente(event){
        axios.get("http://localhost:8080/api/servico/buscarPagamentoPendente").then(result=>{
            //console.log(result.data);
            setServicos(result.data);
           });
    }

    function servicosCancelados(event) {
        axios.get("http://localhost:8080/api/servico/buscarCancelado").then(result=>{
            //console.log(result.data);
            setServicos(result.data);
           });
    }
    
    function excluir(id){
        axios.delete("http://localhost:8080/api/servico/"+id).then(result => {
            setAtualizar(id);
        });
    }

    function cancelar(id){
        axios.put("http://localhost:8080/api/servico/cancelarServico/"+id).then(result => {
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
                        <input name="email" className="form-control" value={servico.dataInicio || ''} onChange={handleChange} type="date" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Data Término</label>
                        <input name="email" className="form-control" value={servico.dataTermino || ''} onChange={handleChange} type="date" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Descrição</label>
                        <input name="nome" className="form-control" value={servico.descricao || ''} onChange={handleChange} type="text" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Valor Servico</label>
                        <input name="nome" className="form-control" value={servico.valorServico || ''} onChange={handleChange} type="number" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Valor Pago</label>
                        <input name="nome" className="form-control" value={servico.valorPago || ''} onChange={handleChange} type="number" /><br /><br />
                    </div> 
                    <div>
                        <label className="form-label">Data Pagamento</label>
                        <input name="email" className="form-control" value={servico.dataPagamento || ''} onChange={handleChange} type="date" /><br /><br />
                    </div> 
                    <br />
                    
                    <input type="submit" className="btn btn-success" value="Cadastrar" /> &nbsp;&nbsp; 
                    <input type="button" className="btn btn-primary" value="Limpar" onClick={limpar} /> &nbsp;&nbsp; <br /> <br />
                    <input type="button" className="btn btn-secondary" value="Listar Todos" onClick={listarTodos} /> &nbsp;&nbsp;
                    <input type="button" className="btn btn-primary" value="Pagamentos Pendentes" onClick={pagamentoPendente} /> &nbsp;&nbsp;
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
                                    {servico.status!='cancelado' &&
                                   <button onClick={() => setServico(servico)} className="btn btn-primary">Alterar</button> 
                                    } &nbsp;&nbsp;
                                     {servico.status!='cancelado' &&
                                   <button onClick={() => excluir(servico.id)} className="btn btn-danger">Excluir</button> 
                                     } &nbsp;&nbsp;
                                   <button onClick={() => cancelar(servico.id)} className="btn btn-warning">Excluir</button> 
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