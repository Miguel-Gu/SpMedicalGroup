using System;
using System.Collections.Generic;

#nullable disable

namespace SpMedicalGroup.Domains
{
    public partial class ImagemCliente
    {
        public int Id { get; set; }
        public short IdEmpresa { get; set; }
        public byte[] Binario { get; set; }
        public string MimeType { get; set; }
        public string NomeArquivo { get; set; }
        public DateTime? DataInclusao { get; set; }

        public virtual Empresa IdEmpresaNavigation { get; set; }
    }
}
