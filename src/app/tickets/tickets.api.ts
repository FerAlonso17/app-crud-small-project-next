import { Ticket, TicketForm } from "./tickets.interface";

export const getTickets = async ({
        page,
        limit,
        status
    }: {
        page: number;
        limit: number;
        status?: string;
}): Promise<{ tickets: Ticket[], totalPages: number }> => {
    try {

        let url = `${process.env.NEXT_PUBLIC_API_URL}/tickets?page=${page}&limit=${limit}`;
        if (status) {
            url += `&status=${status}`;
        }
        
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
        }
        // Parse the JSON response
        const data = await response.json();
        // Validate the response structure
        if (!data || !Array.isArray(data.tickets)) {
            throw new Error("Invalid response structure");
        }
        // Return the validated data
        return data;
    } catch (error: any) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
}

export const createTicket = async (ticket: TicketForm): Promise<{ message: string }> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${data.error}`);
        }
        return data;
    } catch (error: any) {
        console.error('Error creating ticket:', error);
        throw error;
    }
}

export const deleteTicket = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${data.error}`);
        }
        return data;
    } catch (error: any) {
        console.error('Error deleting ticket:', error);
        throw error;
    }
}

export const getTicketById = async (id: string): Promise<{ ticket: Ticket }> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${id}`)
        const data = await response.json()
        return data
    } catch (error: any) {
        console.error('Error deleting ticket:', error);
        throw error;
    }
}

export const updateTicket = async (id: string, ticket: TicketForm) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${data.error}`);
        }
        return data;
    } catch (error: any) {
        console.error('Error updating ticket:', error);
        throw error;
    }
}