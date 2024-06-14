import React, { useState } from "react";

import axios from "axios";

const Details = ({
  setIsLoading,
  setPrices,
  isUpload,
  setIsUpload,
  setIsCalculated,
  setCurrentPage,
  setInputPage,
}) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [basePrice, setBasePrice] = useState();
  const [pricePerCreditLine, setPricePerCreditLine] = useState();
  const [pricePerCreditScorePoint, setPricePerCreditScorePoint] = useState();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsCalculated(false);
      setIsLoading(true);
      setCurrentPage(1);
      setInputPage("1");
      setPrices([]);
      const response = await axios.post(
        "https://subscription-pricing-calculator-api.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrices(response.data);
      setData(response.data);
      setIsLoading(false);
      setIsUpload(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCalculate = async () => {
    setIsLoading(true);
    setPrices([]);
    const payload = {
      data: Object.keys(data).map((key) => data[key]),
      BasePrice: parseFloat(basePrice),
      PricePerCreditLine: parseFloat(pricePerCreditLine),
      PricePerCreditScorePoint: parseFloat(pricePerCreditScorePoint),
    };
    try {
      const response = await axios.post(
        "https://subscription-pricing-calculator-api.onrender.com/calculate",
        payload
      );
      setPrices(response.data);
      setIsLoading(false);
      setIsCalculated(true);
    } catch (error) {
      console.error("Error calculating prices:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="my-5 flex flex-col lg:flex-row justify-center">
        <div className="border-2 border-black px-1 md:px-5 py-2 rounded-xl flex flex-col gap-5">
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              className="text-center"
            />
          </div>
          <button
            className="bg-green-500 px-2 py-1 border-2 border-black rounded-xl"
            onClick={handleUpload}
          >
            Upload CSV
          </button>
        </div>
      </div>
      <div>
        <div className="">
          <h2 className="text-xl my-5 md:text-2xl font-bold text-center">
            Pricing Calculator
          </h2>
          <div className="mb-6 h-fit">
            <label
              htmlFor="baseprice"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Base Price (Default Value: 0)
            </label>
            <input
              type="number"
              htmlFor="baseprice"
              autoComplete="false"
              value={basePrice}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setBasePrice(e.target.value);
                } else {
                  setBasePrice(0);
                }
              }}
              placeholder="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px w-full-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="pricePerCreditLine"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Price per credit line (Default Value: 0)
            </label>
            <input
              type="number"
              value={pricePerCreditLine}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setPricePerCreditLine(e.target.value);
                } else {
                  setPricePerCreditLine(0);
                }
              }}
              placeholder="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px w-full-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Price per credit score point (Default Value: 0)
            </label>
            <input
              type="number"
              value={pricePerCreditScorePoint}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setPricePerCreditScorePoint(e.target.value);
                } else {
                  setPricePerCreditScorePoint(0);
                }
              }}
              placeholder="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px w-full-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="flex flex-col gap-5 justify-center">
            {!isUpload && (
              <button
                className="px-2 py-1 text-lg bg-green-400 rounded-xl hover:bg-green-500 shadow-xl disabled opacity-50 cursor-not-allowed"
                onClick={handleCalculate}
                disabled={file === null}
              >
                Please upload CSV file first
              </button>
            )}
            {isUpload && (
              <button
                className="px-2 py-1 text-lg bg-green-400 rounded-xl hover:bg-green-500 shadow-xl"
                onClick={handleCalculate}
                disabled={file === null}
              >
                Calculate Subscription Prices
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
