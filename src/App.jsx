import React, { useState } from "react";
import Details from "./components/Details";
import Table from "./components/Table";
import Header from "./components/Header";

function App() {
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("1");
  const [isCalculated, setIsCalculated] = useState(false);

  const entriesPerPage = 100;

  const totalPages = Math.ceil(prices.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;

  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    setInputPage(newPage.toString());
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newPage);
    setInputPage(newPage.toString());
  };

  return (
    <div className="w-screen min-h-screen bg-slate-300">
      <Header />
      <div className="flex flex-col gap-5 h-full w-full px-2 lg:px-10 pb-10">
        <div className="w-full flex justify-center">
          <Details
            isLoading={isLoading}
            setPrices={setPrices}
            setIsLoading={setIsLoading}
            isUpload={isUpload}
            setIsUpload={setIsUpload}
            setCurrentPage={setCurrentPage}
            setInputPage={setInputPage}
            entriesPerPage={entriesPerPage}
            setIsCalculated={setIsCalculated}
          />
        </div>
        {prices.length > 0 && (
          <div>
            <h1 className="text-center my-2 text-lg">{`Showing entries between ${
              startIndex + 1
            } to ${startIndex + 100}`}</h1>
          </div>
        )}
        <div className="w-full flex justify-start lg:justify-center overflow-x-auto">
          <div className={`${prices ? "" : "border-2 border-black p-5"}`}>
            <Table
              prices={prices}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              isCalculated={isCalculated}
            />
          </div>
        </div>
        {prices.length > 0 && (
          <div>
            <div className="hidden md:block">
              <div className="flex justify-center w-full">
                <div className="flex w-full lg:w-1/2 justify-between items-center mt-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-lg border-2 border-black ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-400 hover:bg-green-500"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="flex items-center">
                    Page
                    <input
                      type="number"
                      value={inputPage}
                      onChange={(e) => setInputPage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const pageNumber = parseInt(inputPage, 10);
                          if (
                            !isNaN(pageNumber) &&
                            pageNumber >= 1 &&
                            pageNumber <= totalPages
                          ) {
                            setCurrentPage(pageNumber);
                          } else {
                            setInputPage(currentPage.toString());
                          }
                        }
                      }}
                      className="border focus:outline-none border-black rounded-md p-1 mx-2 w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min="1"
                      max={totalPages}
                    />
                    of {totalPages}
                    <button
                      onClick={() => {
                        const pageNumber = parseInt(inputPage, 10);
                        if (
                          !isNaN(pageNumber) &&
                          pageNumber >= 1 &&
                          pageNumber <= totalPages
                        ) {
                          setCurrentPage(pageNumber);
                        } else {
                          setInputPage(currentPage.toString());
                        }
                      }}
                      className="ml-2 px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 text-white"
                    >
                      Go
                    </button>
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-lg border-2 border-black ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-400 hover:bg-green-500"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className="block md:hidden">
              <div className="flex justify-center w-full">
                <div className="flex flex-col gap-5 items-center mt-4">
                  <span className="flex items-center">
                    Page
                    <input
                      type="number"
                      value={inputPage}
                      onChange={(e) => setInputPage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const pageNumber = parseInt(inputPage, 10);
                          if (
                            !isNaN(pageNumber) &&
                            pageNumber >= 1 &&
                            pageNumber <= totalPages
                          ) {
                            setCurrentPage(pageNumber);
                          } else {
                            setInputPage(currentPage.toString());
                          }
                        }
                      }}
                      className="border focus:outline-none border-black rounded-md p-1 mx-2 w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min="1"
                      max={totalPages}
                    />
                    of {totalPages}
                    <button
                      onClick={() => {
                        const pageNumber = parseInt(inputPage, 10);
                        if (
                          !isNaN(pageNumber) &&
                          pageNumber >= 1 &&
                          pageNumber <= totalPages
                        ) {
                          setCurrentPage(pageNumber);
                        } else {
                          setInputPage(currentPage.toString());
                        }
                      }}
                      className="ml-2 px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 text-white"
                    >
                      Go
                    </button>
                  </span>
                  <div className="flex justify-between w-full">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-lg border-2 border-black ${
                        currentPage === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-400 hover:bg-green-500"
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-lg border-2 border-black ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-400 hover:bg-green-500"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
