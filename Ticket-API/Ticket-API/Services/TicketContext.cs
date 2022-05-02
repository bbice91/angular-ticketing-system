using Ticket_API.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Ticket_API.Services
{
    public class TicketContext : DbContext, ITicketContext
    {
        public DbSet<Ticket> Tickets { get; set; }

        public Ticket AddTicket(Ticket ticket)
        {
            var ticketEntity = Tickets.Add(ticket).Entity;
            SaveChanges();
            return ticketEntity;
        }

        public Ticket DeleteTicket(int id)
        {
            var dbTicket = Tickets.Find(id);

            if (dbTicket != null)
            {
                var entity = Tickets.Remove(dbTicket).Entity;
                SaveChanges();
                return entity;
            }

            return null;
        }

        public Ticket GetTicket(int id)
        {
            var dbTicket = Tickets.Find(id);

            return dbTicket;
        }

        public IEnumerable<Ticket> GetTickets()
        {
            return Tickets;
        }

        public Ticket UpdateTicket(int id, Ticket ticket)
        {
            var dbTicket = Tickets.Find(id);

            if (dbTicket != null)
            {
                dbTicket.Resolution = ticket.Resolution;
                dbTicket.ResolvedBy = ticket.ResolvedBy;

                var entityTicket = Tickets.Update(dbTicket).Entity;
                SaveChanges();
                return entityTicket;
            }

            return null;
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer()
        //}
        
    }

}
