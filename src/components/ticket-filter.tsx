'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function TicketFilter({status}:{status?:string}) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handleStatus =(status:string = "ALL")=>{
        const newSearchParams = new URLSearchParams(searchParams)
        if (status === 'ALL') {
            newSearchParams.delete('status')
        } else {
            newSearchParams.set('status',status.toString())
        }
        newSearchParams.set('page', '1')
        // newSearchParams.set('limit', '4')

        router.replace(`${pathname}?${newSearchParams.toString()}`)
    }

    return (
        <Tabs value={status} onValueChange={handleStatus} className="mb-4">
            <TabsList>
                <TabsTrigger value="ALL">All</TabsTrigger>
                <TabsTrigger value="TODO">TODO</TabsTrigger>
                <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
                <TabsTrigger value="DONE">Done</TabsTrigger>
                <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
            </TabsList>
        </Tabs>

    )
}

