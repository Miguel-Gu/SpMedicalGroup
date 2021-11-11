using SpMedicalGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Interfaces
{
    interface IConsultumRepository
    {
        /// <summary>
        /// Cria uma nova consulta
        /// </summary>
        /// <param name="novaConsulta">Objeto com as informações da consulta</param>
        void Cadastrar(Consultum novaConsulta);

        List<Consultum> ListarTodos();

        /// <summary>
        /// Atualiza uma consulta existente
        /// </summary>
        /// <param name="id">Id da consulta a ser atualizado</param>
        /// <param name="consultaAtt">Consulta com as informações atualizadas</param>
        void Atualizar(byte id, Consultum consultaAtt);

        /// <summary>
        /// Deleta uma consulta existente
        /// </summary>
        /// <param name="id">Id da consulta a ser deletada</param>
        void Deletar(byte id);

        Consultum BuscarPorId(byte id);


        /// <summary>
        /// Lista todos as consulta que um determinado médico participa
        /// </summary>
        /// <param name="idMedico">ID do médico que participa das consultas listadas</param>
        /// <returns>Uma lista de consultas</returns>
        List<Consultum> LerTodasDoMedico(int idMedico);


        /// <summary>
        /// Lista todos as consulta que um determinado paciente participa
        /// </summary>
        /// <param name="idPaciente">ID do paciente que participa das consultas listadas</param>
        /// <returns>Uma lista de consultas</returns>
        List<Consultum> LerTodasDoPaciente(int idPaciente);


        /// <summary>
        /// Cancela uma consulta
        /// </summary>
        /// <param name="id">ID da consulta que será cancelada</param>
        void CancelarConsulta(byte id);


        /// <summary>
        /// Inclui descrição em uma consulta
        /// </summary>
        /// <param name="id">ID da consulta que terá a descrição alterada</param>
        /// <param name="descricao">Nova descrição da consulta</param>
        void IncluirDescricao(byte id, byte idMedico,string descricao);
    }
}
