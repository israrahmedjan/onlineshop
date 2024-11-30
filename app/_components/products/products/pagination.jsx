import React from 'react'

function Pagination({paginationData={},pageNumberHandle}) {

  //const { page, pageCount } = paginationData1;
  const {page,pageCount} = paginationData;
  const myname = "israr";

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      //onPageChange(newPage);
      pageNumberHandle(newPage);
    }
  };


   
  return (
  <>


  <div className="flex items-center justify-end  space-x-2 mt-4">
      {/* Prev Button */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: pageCount }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 border rounded ${
            page === index + 1 ? 'bg-secondary text-white' : ''
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pageCount}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>

  
  </>
  )
}

export default Pagination