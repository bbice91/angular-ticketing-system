import { Favorite } from "./favorite";

export interface Ticket {
    id: number;
    title: string;
    resolvedBy: string;
    userName: string;
    userEmail: string;
    resolution: string;
    favorite: Favorite;
}