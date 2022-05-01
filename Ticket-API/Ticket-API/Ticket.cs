namespace Ticket_API
{
    public class Ticket
    {
        public int Id { get; set; }
        public string? Title { get; set; } = null;
        public string? UserName { get; set; } = null;
        public string? ResolvedBy { get; set; } = null;
        public string? UserEmail { get; set; } = null;
        public string? Resolution { get; set; } = null;

    }
}