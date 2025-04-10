export type  TicketStatus = "TODO" | "IN_PROGRESS" | "DONE" | "REJECTED"

export interface Ticket {
    id:string
    title:string
    description?:string
    status: TicketStatus
    assignedTo: string
}

export type TicketForm = Pick<Ticket, "title" | "description" | "status" | "assignedTo">