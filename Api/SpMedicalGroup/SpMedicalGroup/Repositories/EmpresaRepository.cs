using Microsoft.AspNetCore.Http;
using SpMedicalGroup.Contexts;
using SpMedicalGroup.Domains;
using SpMedicalGroup.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Repositories
{
    public class EmpresaRepository : IEmpresaRepository
    {
        InLockContext ctx = new InLockContext();
        public void Cadastrar(Empresa novaEmpresa)
        {
            ctx.Empresas.Add(novaEmpresa);

            ctx.SaveChanges();
        }

        public string ConsultarEmpresaBD(byte idEmpresa)
        {
            ImagemCliente imagemCliente = new ImagemCliente();
            imagemCliente = ctx.ImagemClientes.FirstOrDefault(i => i.IdEmpresa == idEmpresa);

            //se existe imagem de perfil para o usuario.
            if (imagemCliente != null)
            {
                //Converte o valor de uma matriz de inteiros (byte) em string.
                return Convert.ToBase64String(imagemCliente.Binario);
            }

            return null;
        }

        public List<Empresa> ListarTodos()
        {
            return ctx.Empresas.ToList();
        }

        public void SalvarImagemBD(IFormFile foto, byte idEmpresa)
        {
            ImagemCliente imagemCliente = new();

            using (var ms = new MemoryStream())
            {
                foto.CopyTo(ms);

                imagemCliente.Binario = ms.ToArray();

                imagemCliente.NomeArquivo = foto.FileName;

                imagemCliente.MimeType = foto.FileName.Split('.').Last();

                imagemCliente.IdEmpresa = idEmpresa;
            }

            ImagemCliente imagemExistente = new();
            imagemExistente = ctx.ImagemClientes.FirstOrDefault(i => i.IdEmpresa == idEmpresa);

            if (imagemExistente != null)
            {
                imagemExistente.Binario = imagemCliente.Binario;
                imagemExistente.NomeArquivo = imagemCliente.NomeArquivo;
                imagemExistente.MimeType = imagemCliente.MimeType;

                ctx.ImagemClientes.Update(imagemExistente);
            }
            else
            {
                ctx.ImagemClientes.Add(imagemCliente);
            }

            ctx.SaveChanges();
        }

    }
}
