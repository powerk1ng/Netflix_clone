import { GrClose } from "react-icons/gr";

const ModalWindow = ({ modalIsOpen, setModal, deleteMovie }) => {
  return (
    <div
      className={`bg-black/50 z-[999] w-full h-screen flex items-center justify-center ${
        modalIsOpen ? "fixed left-0 top-0" : "hidden"
      }`}
    >
      {/* text-body */}
      <div className="relative p-4 bg-white rounded-md shadow-md shadow-black/70">
        <span onClick={setModal} className="absolute right-3 top-2.5 cursor-pointer">
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

          <div className="flex items-center gap-x-4 justify-center mt-4">
            <button 
                onClick={deleteMovie}
                className="bg-red-500 text-white px-4 py-2 hover:brightness-75 duration-200">
                
              Delete
            </button>
            <button
              onClick={setModal}
              className="bg-blue-500 text-white px-4 py-2 hover:brightness-75 duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
