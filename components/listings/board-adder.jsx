'use client'

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/pop-over"
import { Button } from "../ui/button"
import { LayoutDashboard } from "lucide-react"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import useProtect from "@/hooks/useProtect"
import { useToast } from "../ui/use-toast"
import { UiContext } from "@/providers/ui/ui-provider"

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function BoardAdder({
    tattoo,
    boards,
    className,
    onBoardCreate,
    onBoardSelect,
    currentUser,
}) {


    const [isOpen, setIsOpen] = React.useState(false);
    const [showCreateForm, setShowCreateForm] = React.useState(false);
    const { toast } = useToast()
    const { setLoginModalOpen } = React.useContext(UiContext)



    return (

        <Popover
            // open={isOpen}
            onMouseLeave={() => { console.log("leave") }}
        >
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn(`
                            gap-2
                            flex
                            `,
                    className
                )}
                    onClick={() => {
                        if (!currentUser) {
                            toast({
                                title: "Accede a tu cuenta",
                                description: "Debes estar conectado para esta acción",
                                variant: "destructive"
                            })
                            setLoginModalOpen(true)
                            return
                        }
                        setIsOpen((prev) => !prev)
                    }}

                >
                    <LayoutDashboard />
                    Añadir a tablero
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80"
                onMouseLeave={
                    () => {
                        setIsOpen(() => false)
                    }
                }
            >
                <ScrollArea className={cn(`h-72 w-full p-0 
                transition-all`, //TODO:  How can I make this trasition?
                    showCreateForm && `h-36`)}>

                    {
                        !showCreateForm ?
                            <BoardList
                                tattoo={tattoo}
                                boards={boards}
                                onCreate={() => setShowCreateForm(true)}
                                onBoardSelect={onBoardSelect}
                            /> :
                            <BoardCreationForm onBoardCreate={
                                async (title) => {
                                    await onBoardCreate(title)
                                    setShowCreateForm(false)
                                }
                            } />
                    }
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}


const BoardList = (
    {
        tattoo,
        boards,
        onCreate,
        onBoardSelect,
    }
) => {

    console.log("function", onCreate)
    return (
        <div className="">
            <h4>
                Tus tableros
            </h4>
            <Separator className="mt-3 mb-2" />
            {boards.map((board) => (
                <div key={board.id}
                    onClick={
                        // TODO: Review. Could we avoid passing tattoo?
                        () => { onBoardSelect(tattoo, board) }
                    }
                >
                    <div className="text-sm hover:bg-muted cursor-pointer p-2 rounded">
                        <p>{board.title}</p>
                    </div>
                    <Separator className="my-2" />
                </div>
            ))}

            <Button size="sm"
                onClick={() => {
                    onCreate(true)
                }}
            >
                Crear tablero
            </Button>
        </div>
    )
}

const BoardCreationForm = ({
    onBoardCreate
}) => {

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm({
        defaultValues: {
            title: ''
        }
    });

    React.useEffect(() => {
        setFocus('title')
    }, [setFocus]);

    const onSubmit = async (data) => {
        // if (!currentUser) return onOpenLoginModal()
        // Optimistic update -> we add the board to the user before the request is done
        // const temporaryBoard = { ...data, id: Date.now() }
        // setBoards([...boards, temporaryBoard])
        // We send the request to the server to create the board in the database after we have added it to the user
        onBoardCreate(data.title)
            .then((newBoard) => {
                // onBoardSelect(tattoo, newBoard)
            })
            .catch((error) => {
                console.log("ERROR - TattooBoardAdder", error)
            })
    }


    return (


        <div className="board-adder-input my-auto">
            <form onSubmit={handleSubmit(onSubmit)}
                onClick={(event) => {
                    event.stopPropagation()
                }
                }
            >
                <div className="
flex flex-col gap-2
">
                    <h3>Crea un nuevo tablero</h3>
                    <Input
                        id={`title`}
                        // id is like this to avoid the same id for all the boards. We have to separate them in the endpo
                        label="New Board"
                        placeholder="Nombre"
                        type="text"
                        errors={errors}
                        {
                        ...register("title", {
                            required: {
                                value: true,
                                message: "Title is required",
                            },
                        })

                        }
                    />
                    <div className="flex flex-row justify-between">
                        <Button variant="ghost"
                            // TODO: make it go back when clicked...
                            onClick={() => { }}
                        >Cancelar</Button>
                        <Button size="lg" type="submit">Crear</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}