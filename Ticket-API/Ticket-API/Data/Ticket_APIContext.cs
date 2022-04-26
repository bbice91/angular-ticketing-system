#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ticket_API;

namespace Ticket_API.Data
{
    public class Ticket_APIContext : DbContext
    {
        public Ticket_APIContext (DbContextOptions<Ticket_APIContext> options)
            : base(options)
        {
        }

        public DbSet<Ticket_API.Ticket> Ticket { get; set; }
    }
}
