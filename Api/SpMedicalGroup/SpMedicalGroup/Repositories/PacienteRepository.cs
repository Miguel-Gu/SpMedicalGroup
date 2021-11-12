using SpMedicalGroup.Contexts;
using SpMedicalGroup.Domains;
using SpMedicalGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        InLockContext ctx = new InLockContext();
        public List<Paciente> ListarTodos()
        {
            return ctx.Pacientes
                 .Select(m => new Paciente()
                {
                    IdPaciente = m.IdPaciente,
                    IdUsuarioNavigation = new Usuario()
                    {
                        NomeUsuario = m.IdUsuarioNavigation.NomeUsuario
                    }
                })
                .ToList();
        }
    }
}
