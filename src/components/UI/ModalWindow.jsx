import { GrClose } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";

const ModalWindow = ({ modalIsOpen, setModal, deleteMovie }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="modal-1"
        exit={{opacity:0, transition: {delay: 1}}}
        className={`bg-black/50 flex items-center justify-center w-full h-screen z-[999] ${
          modalIsOpen ? "fixed left-0 top-0" : "hidden"
        }`}
      >
        {/* text-body */}
        <AnimatePresence>
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: -150 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                delay: 0.2,
                type: "spring",
                damping: 7,
                stiffness: 300,
              },
            }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="shadow-black/70 bg-white relative shadow-md rounded-md p-4"
          >
            <span
              onClick={setModal}
              className="absolute right-3 top-2.5 cursor-pointer"
            >
              <GrClose size={20} />
            </span>
            <div className="p-4">
              <div className="text-black">
                <p className="text-center text-2xl mb-4">Are you sure?</p>
                <p>
                  Do you really want to delete this item? <br />
                </p>
                <p className="text-center">This process cannot be undone</p>
              </div>

              <div className="flex items-center justify-center gap-x-4 mt-4">
                <button
                  onClick={deleteMovie}
                  className="bg-red-500 text-white hover:brightness-75 px-4 py-2 duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={setModal}
                  className="bg-blue-500 text-white hover:brightness-75 duration-200 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalWindow;
