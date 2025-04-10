import { TicketStatus } from "@/app/tickets/tickets.interface";
import { prisma } from "@/lib/db";
import { ticketSchema } from "@/lib/schemas/ticket.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
    try {
        const url = await request.url
        const { searchParams } = new URL(url)

        const page = Number(searchParams.get('page') ?? 1)
        const limit = Number(searchParams.get('limit') ?? 4)
        const status = searchParams.get('status') as TicketStatus | undefined

        const count = await prisma.ticket.count({
            where:{
                status: status || undefined
            }
        })
        const totalPages = Math.ceil(count / limit)

        const tickets = await prisma.ticket.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where:{
                status: status || undefined
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({ tickets,totalPages })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json()
        const { title, description, status, assignedTo } = ticketSchema.parse(body)

        await prisma.ticket.create({
            data: {
                title, description, status, assignedTo
            }
        })

        return NextResponse.json({ message: 'Ticket created succesfully' })
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return NextResponse.json({ error: messages }, { status: 400 });
        }
    }
}