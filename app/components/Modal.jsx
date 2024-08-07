import Image from 'next/image';

const Modal = ({ isOpen, onClose, imageSrc, alt }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center">
        <button
          className="absolute top-4 right-4 text-white text-2xl z-10"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="relative w-full h-full max-w-full max-h-full">
          <Image
            src={imageSrc}
            alt={alt}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
