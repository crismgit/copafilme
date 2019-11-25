using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CopaFilmes.Models;
using Newtonsoft.Json;


namespace CopaFilmes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmeController : ControllerBase
    {
        //Esta versao está incompleta. Não foram realizadas eliminatórias.
        //Apenas para verificar se post e get funcionam com o frontend React,
        // trazer array pelo post, salvar no banco de dados e enviar com get para o front.
        //Post e get não estão funcionando, ambos mostram array vazia.
        //Será que a array de objetos não é salva no banco de dados por causa do UseInMemoryDatabase?

        private readonly FilmeContext _context;

        public FilmeController(FilmeContext context)
        {
            _context = context;
        }

        [HttpPost("test")]
        public async Task<IActionResult> Test(string filme)
        {
            if (filme == null)
            {
                return Ok();
            }
            Filme obj = JsonConvert.DeserializeObject<Filme>(filme);
            _context.Filmes.Add(obj);
            await _context.SaveChangesAsync();
            CreatedAtAction("GetFilme", new { id = obj.Id }, obj);
            return Ok($"Post funcionou");
        }

      

        // GET: api/Filme
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filme>>> GetFilmes()
        {
            return await _context.Filmes
             .Include(i => i.Filmes)
             .ToListAsync();
          
        }

        // GET: api/Filme/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Filme>> GetFilme(string filme)
        {
                
            var film = await _context.Filmes.FindAsync(filme);

            if (film == null)
            {
                return NotFound();
            }
         
            return film;

        }


    }
}
