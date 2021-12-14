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
    [Route("api/[controller]")]
    [ApiController]
    public class LocalizacaoController : ControllerBase
    {
        private ILocalizacaoRepository _localizacaoRepository { get; set; }

        public LocalizacaoController()
        {
            _localizacaoRepository = new LocalizacaoRepository();
        }

        [HttpGet("ListarTodas")]
        public IActionResult ListarTodas()
        {
            List<Localizacao> lista = _localizacaoRepository.ListarTodas();

            return Ok(lista);
        }
    }
}
