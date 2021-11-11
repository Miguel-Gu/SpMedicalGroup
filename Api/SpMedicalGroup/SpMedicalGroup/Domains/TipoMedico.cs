using System;
using System.Collections.Generic;

#nullable disable

namespace SpMedicalGroup.Domains
{
    public partial class TipoMedico
    {
        public TipoMedico()
        {
            Medicos = new HashSet<Medico>();
        }

        public short IdTipoMedico { get; set; }
        public string NomeTipoMedico { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
