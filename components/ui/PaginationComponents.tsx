import React from 'react';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className='mt-2 flex justify-center'>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`mx-2 rounded-full px-4 py-2 ${
            currentPage === index + 1
              ? 'bg-orange-500 text-white'
              : 'bg-gray-300'
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
