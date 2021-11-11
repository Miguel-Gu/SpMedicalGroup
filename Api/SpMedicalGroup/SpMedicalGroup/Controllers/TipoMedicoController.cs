using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.Domains;
using SpMedicalGroup.Interfaces;
using SpMedicalGroup.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TipoMedicoController : ControllerBase
    {
        private ITipoMedicoRepository _tipoMedicoRepository { get; set; }

        public TipoMedicoController()
        {
            _tipoMedicoRepository = new TipoMedicoRepository();
        }

        [Authorize(Roles = "1, 2, 3")]
        [HttpGet("ListarTodos")]
        public IActionResult ListarTodos()
        {
            List<TipoMedico> lista = _tipoMedicoRepository.ListarTodos();

            return Ok(lista);
        }
    }
}
