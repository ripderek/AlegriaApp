import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
export function SimpleDialog({ open, close, body, title }) {
  return (
    <>
      {/*
      sizes:
          lg
          md
          sm
          xl
          xs
          xxl
      */}
      <Dialog open={open} handler={() => close(false)} size={"md"}>
        <DialogHeader>
          {title}
          <IconButton
            className="!absolute top-3 right-3 bg-transparent shadow-none p-2"
            onClick={() => close(false)}
          >
            <XCircleIcon className="w-11" color="orange" />
          </IconButton>
        </DialogHeader>

        <DialogBody>{body}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => close(false)}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => close(true)}>
            <span>Aceptar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default SimpleDialog;
