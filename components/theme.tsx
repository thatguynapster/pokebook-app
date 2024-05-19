"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, ReactNode, useState } from "react";
import { classNames } from "@/libs";
import { useStore } from "@/hooks";
import { clash } from "@/fonts";

export const Theme = ({
  children,
}: {
  children: (props: { proceed: () => void }) => ReactNode;
}) => {
  const { store, setStore } = useStore();
  const [open, setOpen] = useState(false);

  const themes = ["232, 83, 130", "57, 186, 223", "225, 167, 37"];

  return (
    <>
      {children({ proceed: () => setOpen(true) })}
      <Transition show={open} as={Fragment}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden shadow-xl transition-all w-full max-w-sm">
                  <div className="flex flex-col">
                    <div
                      className={classNames(
                        "bg-white text-center py-4",
                        "rounded-t-[32px]",
                        "shadow-md"
                      )}
                    >
                      <p
                        className={classNames(
                          "font-semibold text-2xl",
                          clash.className
                        )}
                      >
                        Choose Theme
                      </p>
                    </div>

                    <div
                      className={classNames(
                        "rounded-b-[32px]",
                        "bg-neutral-200",
                        "w-full py-16",
                        "flex justify-center gap-4"
                      )}
                    >
                      {themes.map((theme, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setStore({ ...store, theme });
                          }}
                          className={"justify-end gap-x-4 lg:gap-x-6"}
                        >
                          <div
                            className={classNames(
                              theme === (store.theme ?? themes[0]) &&
                                "border border-black",
                              "flex items-center justify-center",
                              "w-[88px] h-[88px] rounded-full"
                            )}
                          >
                            <div
                              className={classNames(
                                "w-[74px] h-[74px]",
                                "rounded-full"
                              )}
                              style={{ backgroundColor: `rgb(${theme})` }}
                            ></div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
