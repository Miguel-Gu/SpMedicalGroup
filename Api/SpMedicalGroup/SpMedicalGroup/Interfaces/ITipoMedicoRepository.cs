using SpMedicalGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Interfaces
{
    interface ITipoMedicoRepository
    {
        List<TipoMedico> ListarTodos();
    }
}
