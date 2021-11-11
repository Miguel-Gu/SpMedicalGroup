using SpMedicalGroup.Contexts;
using SpMedicalGroup.Domains;
using SpMedicalGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Repositories
{
    public class TipoMedicoRepository : ITipoMedicoRepository
    {
        InLockContext ctx = new InLockContext();
        public List<TipoMedico> ListarTodos()
        {
            return ctx.TipoMedicos.ToList();
        }
    }
}
