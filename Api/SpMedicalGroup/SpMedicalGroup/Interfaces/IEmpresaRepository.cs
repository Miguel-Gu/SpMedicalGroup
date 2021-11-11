using Microsoft.AspNetCore.Http;
using SpMedicalGroup.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Interfaces
{
    interface IEmpresaRepository
    {
        //Create, Read

        void Cadastrar(Empresa novaEmpresa);

        List<Empresa> ListarTodos();

        void SalvarImagemBD(IFormFile foto, byte idEmpresa);

        string ConsultarEmpresaBD(byte idEmpresa);


    }
}
