using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.Domains;
using SpMedicalGroup.Interfaces;
using SpMedicalGroup.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultumController : ControllerBase
    {
        private IConsultumRepository _consultumRepository { get; set; }

        public ConsultumController()
        {
            _consultumRepository = new ConsultumRepository();
        }

        [Authorize(Roles = "3")]
        [HttpPatch("atualizar/{id}")]
        public IActionResult Atualizar(byte id, Consultum consultaAtt)
        {
            _consultumRepository.Atualizar(id, consultaAtt);

            return StatusCode(204);

        }

        [Authorize(Roles = "3")]
        [HttpPost("cadastrar")]
        public IActionResult Cadastrar(Consultum novaConsulta)
        {
            _consultumRepository.Cadastrar(novaConsulta);

            return StatusCode(201);
        }

        [Authorize(Roles = "3")]
        [HttpPost("cancelar/{id}")]
        public IActionResult CancelarConsulta(byte id)
        {
            _consultumRepository.CancelarConsulta(id);
            return StatusCode(204);
        }

        [Authorize(Roles = "3")]
        [HttpDelete("deletar/{id}")]
        public IActionResult Deletar(byte id)
        {
            _consultumRepository.Deletar(id);
            return StatusCode(204);
        }

        [Authorize(Roles = "2")]
        [HttpPost("incluir/{id}/{descricao}")]
        public IActionResult IncluirDescricao(byte id, string descricao)
        {
            byte idMedico = Convert.ToByte(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
            _consultumRepository.IncluirDescricao(id, idMedico, descricao);
            try
            {
                return StatusCode(204);
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Você não pode incluir descrição em consultas que não são suas",
                    error
                });
            }

        }

        [Authorize(Roles = "2")]
        [HttpPatch("todosMedico")]
        public IActionResult LerTodasDoMedico()
        {
            try
            {
                int idMedico = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_consultumRepository.LerTodasDoMedico(idMedico));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Você não tem autorização para essa requisição",
                    error
                });
            }
        }

        [Authorize(Roles = "1")]
        [HttpPatch("todosPaciente")]
        public IActionResult LerTodasDoPaciente()
        {
            try
            {
                int idPaciente = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_consultumRepository.LerTodasDoPaciente(idPaciente));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Você não tem autorização para essa requisição",
                    error
                });

                throw;
            }

        }

        [Authorize(Roles = "3")]
        [HttpGet("ListarTodos")]
        public IActionResult ListarTodos()
        {
            List<Consultum> lista = _consultumRepository.ListarTodos();

            return Ok(lista);
        }
    }
}
