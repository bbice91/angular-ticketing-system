using System.Collections.Generic;
using Ticket_API.Services;

namespace Ticket_API.Services
{
    public interface ITicketContext : IAddTicket, IDeleteTicket, IGetTicket, IGetTickets, IUpdateTicket
    {
    }

    public interface IAddTicket
    {
        Ticket AddTicket(Ticket ticket);
    }

    public interface IDeleteTicket
    {
        Ticket DeleteTicket(int id);
    }

    public interface IGetTicket
    {
        Ticket GetTicket(int id);
    }

    public interface IGetTickets
    {
        IEnumerable<Ticket> GetTickets();
    }

    public interface IUpdateTicket
    {
        Ticket UpdateTicket(int id, Ticket ticket);
    }
}
