import React, { useState, useRef, useEffect } from "react";

const Table = ({
  prices,
  isLoading,
  currentPage,
  startIndex,
  isCalculated,
}) => {
  const entriesPerPage = 100;
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const currentPrices = prices.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {prices.length > 0 && (
        <div>
          <div
            className="relative overflow-x-auto h-96 "
            ref={containerRef}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="sticky top-0 bg-green-500 text-black">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credit Score
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credit Lines
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Masked Phone Number
                  </th>
                  {isCalculated && (
                    <th scope="col" className="px-6 py-3">
                      Subscription Price
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentPrices.map((data, index) => {
                  return (
                    <tr key={index} className="border-b bg-white text-black">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        {data.Email}
                      </th>
                      <td className="px-6 py-4">{data.Name}</td>
                      <td className="px-6 py-4">{data.CreditScore}</td>
                      <td className="px-6 py-4">{data.CreditLines}</td>
                      <td className="px-6 py-4">{data.MaskedPhoneNumber}</td>
                      {isCalculated && (
                        <td className="px-6 py-4">{data.SubscriptionPrice}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
