import { Button } from '@/components/ui/button'
import { LucidePlusCircle } from 'lucide-react'
import React from 'react'
import TicketCard from '@/components/ticket-card'
import { getTickets } from './tickets.api'
import Link from 'next/link'
import { TicketPagination } from '@/components/ticket-pagination'
import TicketFilter from '@/components/ticket-filter'

type Params = {
    searchParams?: Promise<{ page: number, limit: number, status: string }>
}
export default async function TicketsPage({searchParams}:Params) {

    const page = Number((await searchParams)?.page || 1)
    const limit = Number ((await searchParams)?.limit || 4)
    const status = (await searchParams)?.status || undefined
    // const tickets: Ticket[] = [
    //     {
    //         id: '1',
    //         title: 'Ticket 1',
    //         description: 'Description for ticket 1',
    //         status: 'TODO',
    //         assignedTo: 'John Doe',
    //     },
    //     {
    //         id: '2',
    //         title: 'Ticket 2',
    //         description: 'Description for ticket 2',
    //         status: 'IN_PROGRESS',
    //         assignedTo: 'Jane Smith'
    //     },
    //     {
    //         id: '3',
    //         title: 'Ticket 3',
    //         description: 'Description for ticket 3',
    //         status: 'DONE',
    //         assignedTo: 'Alice Johnson'
    //     },
    //     {
    //         id: '4',
    //         title: 'Ticket 4',
    //         description: 'Description for ticket 4',
    //         status: 'REJECTED',
    //         assignedTo: 'Bob Brown'
    //     }
    // ]
    const {tickets,totalPages} = await getTickets({page, limit, status})

    return (
        <div className='max-w-screen-lg mx-auto p-8'>
            <header className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold'>Tickets</h1>
                <Button asChild>
                    <Link href='tickets/new'>
                        Add new ticket <LucidePlusCircle />
                    </Link>
                </Button>
            </header>
            <div>
                <TicketFilter status={status}/>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
            <div className='mt-8 flex justify-center'>
                <TicketPagination currentPage={page} totalPages={totalPages} limit={limit}/>
            </div>
        </div>
    )
}
