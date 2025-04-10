import { z } from "zod";

export const ticketSchema = z.object({
    title: z.string().min(1,'Title required'),
    description: z.string().optional(),
    status: z.enum(['TODO','IN_PROGRESS','DONE','REJECTED']),
    assignedTo: z.string().min(1,'User required')
})