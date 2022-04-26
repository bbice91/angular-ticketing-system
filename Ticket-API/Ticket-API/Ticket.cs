namespace Ticket_API
{
    public class Ticket
    {
        public int Id { get; set; }
        public string CreatedBy { get; set; }
        public string UserName { get; set; }
        public string ResolvedBy { get; set; }
        public string UserEmail { get; set; }
    }
}