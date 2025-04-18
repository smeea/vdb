import { ButtonCloseModal, ButtonFloatClose } from "@/components";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

const Modal = ({
  centered = false,
  children,
  className,
  handleClose,
  initialFocus,
  noBorder = false,
  noClose = false,
  noPadding = false,
  size = "md",
  title,
  withMobileMargin = false,
}) => {
  const widthClass = {
    xs: "min-w-full sm:min-w-[500px] sm:max-w-[500px]",
    sm: "min-w-full sm:min-w-[700px] sm:max-w-[700px]",
    md: "min-w-full sm:min-w-[900px] sm:max-w-[900px]",
    lg: "min-w-full lg:min-w-[1200px] lg:max-w-[1200px]",
    xl: "min-w-full xl:min-w-[1350px] xl:max-w-[1500px]",
    card: "w-full sm:w-[900px]",
  };
  const ref = useRef();

  return (
    <Dialog initialFocus={initialFocus || ref} onClose={handleClose} className="relative z-50" open>
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div
          className={twMerge(
            "flex min-h-full justify-center p-8",
            centered ? "items-center" : "items-start",
            withMobileMargin ? "max-sm:p-2" : "max-sm:p-0",
          )}
        >
          <DialogPanel
            className={twMerge(
              "flex flex-col gap-1 rounded-sm border-bgSecondary bg-bgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark",
              widthClass[size],
              !noBorder && "border",
              !noPadding && "px-5 pt-4 pb-5 max-sm:px-3 max-sm:pt-2 max-sm:pb-3",
              className,
            )}
          >
            {(title || !noClose) && (
              <DialogTitle className="flex items-center justify-between border-none">
                <div
                  className={twMerge(
                    "font-bold text-fgSecondary text-lg dark:text-fgSecondaryDark",
                    noPadding && "px-2 pt-2",
                  )}
                >
                  {title}
                </div>
                <div className={twMerge("flex items-center max-md:hidden", noClose && "hidden")}>
                  <ButtonCloseModal handleClick={handleClose} />
                </div>
              </DialogTitle>
            )}
            <div className={twMerge("max-h-0 max-w-0 opacity-0", noClose && "hidden")}>
              <button type="button" ref={ref} />
            </div>
            {children}
          </DialogPanel>
        </div>
      </div>
      <div className="md:hidden">
        <ButtonFloatClose handleClose={handleClose} />
      </div>
    </Dialog>
  );
};

export default Modal;
