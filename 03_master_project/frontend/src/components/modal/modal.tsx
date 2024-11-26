"use client";

import { useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  openModal?: boolean;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({
  title,
  description,
  children,
  overlayClassName,
  contentClassName,
  openModal = true,
  setOpenModal,
}: ModalProps) => {
  // this router is needed so that we can handle whenever the user
  // clicks the close button or clicks somewhere outside the modal range
  // since we are on a different route, we need to use the router to handle this
  const router = useRouter();

  const handleOpenChange = () => {
    if (setOpenModal) {
      setOpenModal(false);
    } else {
      // here we tell the router to go back in the router history by one
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={openModal} open={openModal} onOpenChange={handleOpenChange}>
      <DialogOverlay className={overlayClassName}>
        <DialogContent className={contentClassName}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {/* here we pass the children inside the modal, because this is the modal body  */}
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
