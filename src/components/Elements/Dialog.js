import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
export function Dialog_app({ open, close, children, size, title }) {
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
      <Dialog open={open} handler={close} size={size}>
        <DialogHeader>
          {title}
          <IconButton
            className="!absolute top-3 right-3 bg-transparent shadow-none p-2"
            onClick={close}
          >
            <XCircleIcon className="w-11" color="orange" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="">{children}</DialogBody>
      </Dialog>
    </>
  );
}

export default Dialog_app;
