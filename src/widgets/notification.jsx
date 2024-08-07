import { Alert, IconButton } from "@material-tailwind/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
export function Notification({ mensaje, abrir, cerrar, color }) {
  return (
    <Alert
      color={color}
      //icon={<CheckCircleIcon className="h-10" />}
      className="fixed bottom-1 right-8 z-40 w-auto"
      onClose={cerrar}
      open={abrir}
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    >
      {mensaje}
    </Alert>
  );
}

export default Notification;
