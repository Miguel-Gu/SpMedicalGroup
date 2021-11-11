using SpMedicalGroup.Contexts;
using SpMedicalGroup.Domains;
using SpMedicalGroup.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace SpMedicalGroup.Repositories
{
    public class ConsultumRepository : IConsultumRepository
    {
        InLockContext ctx = new InLockContext();
        public void Atualizar(byte id, Consultum consultaAtt)
        {
            Consultum consultaBuscada = BuscarPorId(id);

                if (consultaAtt.IdMedico != null || consultaAtt.IdPaciente != null || consultaAtt.Descricao != null || consultaAtt.Situacao != null)
                {
                    consultaBuscada.IdMedico = consultaAtt.IdMedico;
                    consultaBuscada.IdPaciente = consultaAtt.IdPaciente;
                    consultaBuscada.DataConsulta = consultaAtt.DataConsulta;
                    consultaBuscada.Descricao = consultaAtt.Descricao;
                    consultaBuscada.Situacao = consultaAtt.Situacao;

                    ctx.Consulta.Update(consultaBuscada);
                    ctx.SaveChanges();
                }
        }

        public void Cadastrar(Consultum novaConsulta)
        {
            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();
        }

        public void CancelarConsulta(byte id)
        {
            Consultum consultaBuscada = BuscarPorId(id);

            consultaBuscada.Descricao = "Consulta cancelada";
            consultaBuscada.Situacao = "Cancelada";

            ctx.Consulta.Update(consultaBuscada);
            ctx.SaveChanges();
            
        }

        public Consultum BuscarPorId(byte id)
        {
            return ctx.Consulta.FirstOrDefault(e => e.IdConsulta == id);
        }

        public void Deletar(byte id)
        {
            ctx.Consulta.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public void IncluirDescricao(byte id, byte idMedico, string descricao)
        {
            Consultum consultaBuscada = BuscarPorId(id);

            if (consultaBuscada.IdMedico == idMedico)
            {
                if (descricao != null)
                {
                    consultaBuscada.Descricao = descricao;

                    ctx.Consulta.Update(consultaBuscada);
                    ctx.SaveChanges();
                }
            }
        }

        public List<Consultum> LerTodasDoMedico(int idMedico)
        {
            return ctx.Consulta
                .Where(m => m.IdMedico == idMedico)
                .ToList();
        }

        public List<Consultum> LerTodasDoPaciente(int idPaciente)
        {
            return ctx.Consulta
                .Where(c => c.IdPaciente == idPaciente)
                .ToList();
        }

        public List<Consultum> ListarTodos()
        {
            return ctx.Consulta
                .Select(p => new Consultum()
                {
                    DataConsulta = p.DataConsulta,
                    IdConsulta = p.IdConsulta,
                    IdMedicoNavigation = new Medico()
                    {
                        IdUsuarioNavigation= new Usuario()
                        {
                            NomeUsuario = p.IdMedicoNavigation.IdUsuarioNavigation.NomeUsuario
                        }
                    },
                    IdPacienteNavigation = new Paciente()
                    {
                        IdUsuarioNavigation = new Usuario()
                        {
                            NomeUsuario = p.IdPacienteNavigation.IdUsuarioNavigation.NomeUsuario
                        }
                    },
                    Descricao = p.Descricao,
                    Situacao = p.Situacao
                    
                })
                .ToList();
        }
    }
}
