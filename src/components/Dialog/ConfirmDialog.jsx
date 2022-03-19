import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ConfirmDialog = (props) => {
  const {
    title,
    message,
    isConfirmDialogOpen,
    onClickSubmit,
    onClickCancel,
    onClose,
  } = props;

  return (
    <>
      <Transition appear show={isConfirmDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClickCancel}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 sm:mt-64 mb-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-md rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-center leading-6 text-black font-bold mb-2"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2 mb-8">
                  <p className="text-sm text-black">{message}</p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center w-32 px-2 py-3 text-sm font-bold text-black bg-slate-100 border border-transparent rounded-full hover:bg-blue-200 focus:outline-none focus-visible:none"
                    onClick={onClickCancel}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-32 px-4 py-3 text-sm font-bold text-white bg-red-500 border border-transparent rounded-full hover:bg-blue-200 focus:outline-none focus-visible:none"
                    onClick={onClickSubmit}
                  >
                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ConfirmDialog;
