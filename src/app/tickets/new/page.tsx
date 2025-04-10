import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormTicket } from "@/components/ticket-form";
import { Ticket } from "../tickets.interface";
import { getTicketById } from "../tickets.api";

type NewTicketProps={
    params:Promise<{
        id:string
    }>
} 

export default async function NewTicket({params}:NewTicketProps) {

    const id = (await params)?.id
    let data: {ticket: Ticket} | undefined
    if(id) {
        data = await getTicketById(id)
    }
    return (
        <div className="mt-4 w-full max-w-[600px] mx-auto">
            <Card className='p-8'>
                <CardHeader className='flex justify-between items-center mb-2'>
                    <CardTitle className='text-3xl font-bold'>New Ticket</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <FormTicket ticket={data?.ticket}/>
                </CardContent>
            </Card>
        </div>
    )
}
