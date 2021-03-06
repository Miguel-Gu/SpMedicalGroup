using SpMedicalGroup.Contexts;
using SpMedicalGroup.Domains;
using SpMedicalGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        InLockContext ctx = new InLockContext();
        public List<Medico> ListarTodos()
        {
            return ctx.Medicos
                .Select(m => new Medico()
                {
                    IdMedico = m.IdMedico,
                    IdUsuarioNavigation = new Usuario()
                    {
                        NomeUsuario = m.IdUsuarioNavigation.NomeUsuario
                    }
                })
                .ToList();
        }
    }
}
