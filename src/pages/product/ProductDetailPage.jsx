import { ChevronRight, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getData, postData } from "../../apis/axios";
import { useLocation } from "react-router-dom";
import TopBar from "../../components/navbar/TopBar";

function ProductDetailPage() {
  const location = useLocation();
  const [favLoading, setFavLoading] = useState(false);
  const { id } = location.state || {};
  const ram = ["4GB", "8GB", "16GB"];
  const [count, setCount] = useState(1);
  const [data, setData] = useState();
  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    if (count === 1) return;
    setCount(count - 1);
  };
  useEffect(() => {
    getProduct();
  }, [id]);
  const getProduct = async () => {
    const product = await getData(`/products/${id}`);
    console.log(product, "[[[[[[[[");
    setData(product?.data);
  };
  return (
    <>
      <TopBar isHid={true} />
      <div className="px-[24px] md:px-[54px] lg:px-[64px] py-[30px] mt-[100px]">
        <div className="flex items-center">
          {/* navigation */}
          <div className="text-[16px] font-[500] font-poppins flex gap-3">
            Home <ChevronRight />
          </div>
          <div className="text-[16px] font-[500] font-poppins flex gap-3">
            Product details <ChevronRight />
          </div>
        </div>
        {/* productSection */}
        <div className="flex mt-6 gap-3">
          <div className="w-full border border-black/30 rounded-xl flex items-center justify-center p-2">
            <img src={data?.images?.length > 0 && data?.images[0]} alt="" />
          </div>
          {/* 222 */}
          <div className="w-full p-2 font-poppins">
            {/* 1111 */}
            <div className="border-b border-black/30 pb-5 text-[29px] flex flex-col gap-3">
              <h1 className="text-headerColor font-[500] ">{data?.title}</h1>
              <h1 className="font-[600]">
                ${data?.variants?.length > 0 && data?.variants[0]?.price}
              </h1>
              <p className="text-xs md:text-sm flex items-center gap-2">
                Availability :
                <span className="text-[#30BD57] flex items-center gap-2">
                  <svg
                    width="18"
                    height="12"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.08167 8.50001L7.80844 15.2347L21.2857 1.76532"
                      stroke="#30BD57"
                      stroke-width="1.68367"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  In stock
                </span>
              </p>
              <p className="text-[12px] md:text-xs text-[#5D5D5D]">
                {data?.descrption}
              </p>
            </div>
            {/* 2222 */}
            <div className="pb-5 text-[18px] flex flex-col gap-3 mt-12">
              <div className="flex items-center gap-2">
                <p>Ram:</p>{" "}
                {data?.variants?.map((item) => (
                  <div className="p-1 px-2 bg-[#EEEEEE] cursor-pointer">
                    {item?.ram}
                  </div>
                ))}
              </div>
              {/* count */}
              <div className="flex items-center gap-2 mt-3">
                Quantity :
                <div className="flex items-center">
                  <div
                    onClick={decrease}
                    className="p-1 px-2 bg-[#EEEEEE] cursor-pointer border border-black/20"
                  >
                    -
                  </div>
                  <div className="p-1 px-4 bg-[#EEEEEE] border border-black/20">
                    {count}
                  </div>
                  <div
                    onClick={increase}
                    className="p-1 px-2 bg-[#EEEEEE] cursor-pointer border border-black/20"
                  >
                    +
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className="flex w-full gap-4 items-center md:flex-row flex-col mt-6 text-sm md:text-[21px] font-poppins font-[600]">
                <button className="p-2 px-4 flex items-center justify-center rounded-full bg-buttonColor text-white">
                  Edit product
                </button>
                <button className="p-2 px-4 flex items-center justify-center rounded-full bg-buttonColor text-white">
                  Buy it now
                </button>
                <button
                  onClick={() => {
                    setFavLoading(true);
                    try {
                      postData(`/products/favorite/${data?._id}`);
                      getProduct();
                    } catch (err) {
                      console.log(err);
                    } finally {
                      setFavLoading(false);
                    }
                  }}
                  className="bg-[#EEEEEE] flex items-center justify-center p-2 w-[54px] h-[54px] rounded-full"
                >
                  <Heart
                    className={`${favLoading ? "animate-bounce" : ""} ${
                      data?.isFavorite && "text-buttonColor"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* images */}
        <div className="grid grid-cols-4 gap-3 items-center mt-5">
          {data?.images?.length > 0 &&
            data?.images?.map((item) => (
              <div className="w-full border border-black/30 rounded-xl flex items-center justify-center p-2 max-h-[157px] overflow-hidden">
                <img src={item} alt="" />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
