'use client'

import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { LucideTrash2 } from "lucide-react"
import { deleteTicket } from "@/app/tickets/tickets.api"
import { revalidate } from "@/lib/actions"
import { toast } from "react-toastify"
import { MouseEvent } from "react"
import Link from "next/link"

const TICKET_STATUS_VARIANTS = {
    TODO: "default",
    IN_PROGRESS: "secondary",
    DONE: "destructive",
    REJECTED: "success"
} as const

const getStatusVariant = (status: TicketStatus): "default" | "secondary" | "destructive" | "success" => {
    return TICKET_STATUS_VARIANTS[status] || "default"
}

const getStatusName = (status: TicketStatus): string => {
    switch (status) {
        case "TODO":
            return "To Do"
        case "IN_PROGRESS":
            return "In Progress"
        case "DONE":
            return "Done"
        case "REJECTED":
            return "Rejected"
        default:
            return 'Unknown'
    }
}

export default function TicketCard({ ticket }: { ticket: Ticket }) {

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const response = await deleteTicket(ticket.id)
            await revalidate('/tickets')
            toast.success(response.message)
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    }
    return (
        <Link href={`/tickets/${ticket.id}/edit`} className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {ticket.title}
                        <Button onClick={(e) => handleDelete(e)} size='sm' variant={'ghost'} className="text-red-500 hover:text-red-700 cursor-pointer">
                            <LucideTrash2 />
                        </Button>
                    </CardTitle>
                    <CardDescription>{ticket.description || 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Status: </p>
                    <Badge variant={getStatusVariant(ticket.status)}>{getStatusName(ticket.status)}</Badge>
                </CardContent>
                <CardFooter>
                    <p>Assigned to: {ticket.assignedTo}</p>
                </CardFooter>
            </Card>
        </Link>

    )
}
