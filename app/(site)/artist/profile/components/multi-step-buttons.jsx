import Spinner from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import { Check, Redo, Save, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MultiStepButtons({
  form,
  selectedTab,
  setSelectedTab,
  // scrollToTabList,
  loadingStatus,
  STEPS,
}) {
  const { isDirty, isSubmitted, isSubmitting, isValidating } = form.formState;

  const router = useRouter();

  useEffect(() => {
    //   Prevent enter from submitting the form
    const handleKeyDown = (event) => {
      if (
        event.key === "Enter" &&
        //   and is not the last step
        selectedTab !== STEPS.length - 1
      ) {
        event.preventDefault();
        form.trigger(STEPS[selectedTab].validations).then((isValid) => {
          if (isValid) {
            setSelectedTab((prev) => prev + 1);
            // scrollToTabList ? scrollToTabList() : null;
          }
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [STEPS, STEPS.length, form, selectedTab, setSelectedTab]);

  return (
    <div className="mt-5 flex flex-row justify-between">
      <Button
        type="button"
        variant="outline"
        className="flex flex-row items-center gap-2"
        onClick={() => {
          if (selectedTab === 0) return router.back();
          setSelectedTab((prev) => prev - 1);
          // scrollToTabList ? scrollToTabList() : null;
        }}
      >
        <Undo />
        {selectedTab === 0 ? "Cancelar" : "Anterior"}
      </Button>
      {
        <>
          <Button
            type="button"
            className={`relative flex flex-row items-center gap-2
                    ${selectedTab === STEPS.length - 1 ? `hidden` : null}`}
            onClick={(event) => {
              form.trigger(STEPS[selectedTab].validations).then((isValid) => {
                if (isValid) {
                  setSelectedTab((prev) => prev + 1);
                  // scrollToTabList ? scrollToTabList() : null;
                }
              });
            }}
            disabled={
              isSubmitting || isValidating
              // ||
              // Object.keys(form.formState.errors).length !== 0
            }
          >
            Siguiente
            <Redo />
            {Object.keys(form.formState.errors).length !== 0 && (
              <p className="absolute -top-4 text-xs text-destructive">
                Revisa el formulario
              </p>
            )}
          </Button>

          <Button
            // TODO: this should work with isSubmitting...somehow it doesn't!
            disabled={loadingStatus === "loading"}
            type="submit"
            className={`relative flex flex-row items-center gap-2
                        ${selectedTab !== STEPS.length - 1 ? `hidden` : null}`}
          >
            {loadingStatus === "loading" ? (
              <div className="flex flex-row gap-2">
                Guardando
                <Spinner />
              </div>
            ) : isSubmitted && !isDirty ? (
              <>
                Guardado
                <Check color="green" />
              </>
            ) : (
              <>
                Guardar
                <Save />
                {Object.keys(form.formState.errors).length !== 0 && (
                  <p className="absolute -top-4 text-xs text-destructive">
                    Revisa el formulario
                  </p>
                )}
              </>
            )}
          </Button>
        </>
      }
    </div>
  );
}
