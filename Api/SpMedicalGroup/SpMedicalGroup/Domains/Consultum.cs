using System;
using System.Collections.Generic;

#nullable disable

namespace SpMedicalGroup.Domains
{
    public partial class Consultum
    {
        public short IdConsulta { get; set; }
        public short? IdMedico { get; set; }
        public short? IdPaciente { get; set; }
        public DateTime DataConsulta { get; set; }
        public string Descricao { get; set; }
        public string Situacao { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
    }
}
