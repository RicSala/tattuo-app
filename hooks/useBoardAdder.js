import { useCallback } from "react";

export function useBoardAdder(title, tattoo) {
  const onBoardSelect = useCallback((tattoo, board) => {
    // add the tattoo to the board
    axios
      .post(`/boards/${board.id}/tattoos`, { tattooId: tattoo.id })
      .then((res) => {
        console.log("response data:", res.data);
        toast({
          variant: "success",
          title: `Tutuaje añadido a ${board.title}`,
          description: "Puedes seguir añadiendo más tatuajes",
        });
      })
      .catch((err) => {
        console.log("ERROR - TattooCard", err);
        toast({
          variant: "destructive",
          title: `No ha sido posible añadir el tatuaje a ${board.title}`,
          description: `${err.response.data.error}`,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBoardCreate = useCallback(
    (title) => {
      return axios
        .post("/boards", { title: title })
        .then((res) => {
          toast({
            variant: "success",
            title: `Tablero ${title} creado`,
            description:
              "Hemos añadido el tatuaje a tu tablero. ¡Sigue añadiendo más tatuajes!",
          });
          router.refresh();
          console.log("response", res);
          return res.data;
        })
        .catch((err) => {
          // toast.error('Something went wrong')
        });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [router],
  );

  return {
    onBoardSelect,
    onBoardCreate,
  };
}
