using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace CopaFilmes.Models
{
    public class Filme
    {
        
        public string Id { get; set; }
        public string Titulo { get; set; }
        public int Ano { get; set; }
        public decimal Nota { get; set; }

        public IList<Filme> Filmes { get; set; }

     }










}

