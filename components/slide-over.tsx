"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export const SlideOver = ({
  children,
  show,
  onHide,
  title,
}: {
  show: boolean;
  children: ReactNode;
  onHide: () => void;
  title?: string;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={onHide}>
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col gap-6 overflow-y-scroll overflow-x-hidden bg-white dark:bg-neutral-gray shadow-xl relative">
                      <div className="absolute top-7 left-7 bg-white shadow-[0px_4px_4px_0px_#0000001A] rounded-lg z-10">
                        <div className="flex items-start justify-between">
                          <button
                            type="button"
                            className="p-4 relative rounded-md focus:outline-none"
                            onClick={onHide}
                          >
                            <span className="sr-only">Close panel</span>
                            <ArrowLeftIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>

                      {/* Your content */}
                      {children}
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
