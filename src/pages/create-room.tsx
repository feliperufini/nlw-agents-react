import { useQuery } from '@tanstack/react-query'
import { ChevronRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type GetRoomsApiResponse = Array<{
  id: string
  name: string
}>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsApiResponse = await response.json()

      return result
    },
  })
  return (
    <div className="p-8 grid gap-8">
      <div className="flex items-center justify-center gap-4">
        <h2 className="text-xl font-medium">Lista de Salas</h2>
        <Button>Create Room</Button>
      </div>

      {isLoading && <p>Carregando...</p>}

      <ul>
        {data?.map((room) => {
          return (
            <div className="my-2 flex items-center gap-2" key={room.id}>
              <Link to={`/room/${room.id}`}>
                <Button size="icon">
                  <ChevronRightIcon />
                </Button>
              </Link>
              <li>{room.name}</li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
