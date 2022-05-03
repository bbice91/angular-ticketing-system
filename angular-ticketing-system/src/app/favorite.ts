
import { Ticket } from "./ticket";

export interface Favorite {
    id: number;
    userId: number;
    ticketId: number;
    ticket: Ticket[];
}