using System;
using System.Collections.Generic;

#nullable disable

namespace SpMedicalGroup.Domains
{
    public partial class Empresa
    {
        public Empresa()
        {
            Medicos = new HashSet<Medico>();
        }

        public short IdEmpresa { get; set; }
        public string Cnpj { get; set; }
        public string NomeFantasia { get; set; }
        public string Endereco { get; set; }

        public virtual ImagemCliente ImagemCliente { get; set; }
        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
