'use client'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import Link from 'next/link'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { createTicket, updateTicket } from '@/app/tickets/tickets.api'
import { Ticket, TicketForm, TicketStatus } from '@/app/tickets/tickets.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const FormTicket = ({ticket}:{ticket?:Ticket}) => {

    const router =useRouter()
    const {register,handleSubmit,setValue,formState:{errors}} = useForm<TicketForm>({
        defaultValues:{
            title: ticket?.title,
            description: ticket?.description,
            assignedTo: ticket?.assignedTo,
            status: ticket?.status 
        }
    })

    const handleChange =(status:string)=>{
        setValue("status",status as TicketStatus)
    }

    const handleForm:SubmitHandler<TicketForm> = async (data)=> {
        try {
            let response: {message:string}
            if (ticket?.id) {
                response = await updateTicket(ticket.id, {
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    assignedTo: data.assignedTo
                })
            } else {
                response = await createTicket({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    assignedTo: data.assignedTo
                })    
            }
            
            toast.success(response.message)
            router.push("/tickets")
        } catch (error) {
            console.error("Error creating ticket:", error);
        }
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleForm)}>
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" type="text" placeholder="Ticket Title" className="mt-2"
                    {...register("title", { required: "Field required" })}
                />
                {errors.title && <p className="text-red-500 text-xs">{errors.title.message}!!!</p>}
            </div>

            <div>
                <Label htmlFor="assigned">Assigned to</Label>
                <Input id="assigned" type="text" className="mt-2"
                    {...register("assignedTo", { required: "Field required" })}
                    placeholder="Assigned to"
                />
                {errors.assignedTo && <p className="text-red-500 text-xs">{errors.assignedTo.message}!!!</p>}
            </div>

            <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select
                    onValueChange={handleChange}
                    defaultValue={ticket?.status}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="TODO">TODO</SelectItem>
                        <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                        <SelectItem value="DONE">DONE</SelectItem>
                        <SelectItem value="REJECTED">REJECTED</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" className="mt-2" placeholder="Ticket Description" rows={4}
                    {...register("description", { required: "Field required" })}
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}!!!</p>}
            </div>

            <div className="flex justify-around items-center mt-4">
                <Button type="submit" className="cursor-pointer">{ticket?.id ? 'Edit ticket':'Create Ticket'}</Button>
                <Button asChild variant='secondary'>
                    <Link href={"/tickets"} className="cursor-pointer">Back</Link>
                </Button>
            </div>
        </form>
    )
}
