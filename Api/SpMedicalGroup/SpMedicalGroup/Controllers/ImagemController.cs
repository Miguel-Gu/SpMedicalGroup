using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.Interfaces;
using SpMedicalGroup.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagemController : ControllerBase
    {
        private IEmpresaRepository _empresaRepository { get; set; }

        public ImagemController()
        {
            _empresaRepository = new EmpresaRepository();
        }

        [Authorize(Roles = "3")]
        [HttpPost("imagem/bd/{idEmpresa}")]
        public IActionResult postBD(IFormFile arquivo, byte idEmpresa)
        {
            try
            {
                if (arquivo.Length > 500000)
                    return BadRequest(new { mensagem = "O tamanho máximo da imagem foi atingido." });

                string extensao = arquivo.FileName.Split('.').Last();

                if (extensao != "png")
                {
                    return BadRequest(new { mensangem = "Apenas arquivos .png são permitidos" });
                }


                _empresaRepository.SalvarImagemBD(arquivo, idEmpresa);

                return Ok();


            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("imagem/bd/{idEmpresa}")]
        public IActionResult getbd(byte idEmpresa)
        {
            try
            {

                string base64 = _empresaRepository.ConsultarEmpresaBD(idEmpresa);

                return Ok(base64);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
