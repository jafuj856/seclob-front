import React, { useEffect, useState } from "react";
import TopBar from "../../components/navbar/TopBar";
import { ChevronRight, Heart } from "lucide-react";
import SideBar from "./SideBar";
import CustomPagination from "../../components/pageNation/CustomPagination";
import { useNavigate } from "react-router-dom";
import ProductAdd from "../product/ProductAdd";
import AddSub from "../product/AddSub";
import AddCategory from "../product/AddCategory";
import { getData } from "../../apis/axios";

function Home() {
  const navigate = useNavigate();
  const [prodectAddOpen, setProductAddOpen] = useState(false);
  const [selectedSubItems, setSelectedSubItems] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getProducts();
  }, [search, page, selectedSubItems]);
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getData(
        `/products?search=${search ?? ""}&subCategory=${
          selectedSubItems ?? ""
        }&limit=12&page=${page ?? 1}`
      );
      console.log(data);
      setProduct(data?.data?.products);
      setTotalPage(data?.data?.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const [addSub, setAddSub] = useState(false);
  const [AddCtg, setAddCtg] = useState(false);
  // const product = [
  //   {
  //     name: "HP AMD Ryzen 3",
  //     price: "$ 32000",
  //     img: "/lap.jpg",
  //     star: 3,
  //     isFavorite: true,
  //   },
  //   {
  //     name: "HP AMD Ryzen 3",
  //     price: "$ 62000",
  //     img: "/lap.jpg",
  //     star: 5,
  //     isFavorite: false,
  //   },
  //   {
  //     name: "HP AMD Ryzen 3",
  //     price: "$ 32000",
  //     img: "/lap.jpg",
  //     star: 3,
  //     isFavorite: true,
  //   },
  //   {
  //     name: "HP AMD Ryzen 3",
  //     price: "$ 32000",
  //     img: "/lap.jpg",
  //     star: 3,
  //     isFavorite: true,
  //   },
  //   {
  //     name: "HP AMD Ryzen 3",
  //     price: "$ 32000",
  //     img: "/lap.jpg",
  //     star: 3,
  //     isFavorite: true,
  //   },
  //   {
  //     name: "HP AMD Ryzen 3",
  //     price: "$ 32000",
  //     img: "/lap.jpg",
  //     star: 3,
  //     isFavorite: true,
  //   },
  // ];

  return (
    <>
      <TopBar search={search} setSearch={setSearch} />
      <ProductAdd
        isOpen={prodectAddOpen}
        setIsOpen={setProductAddOpen}
        getProducts={getProducts}
      />
      <AddSub handleClose={() => setAddSub(false)} isOpen={addSub} />
      <AddCategory handleClose={() => setAddCtg(false)} isOpen={AddCtg} />
      <div className="px-[24px] md:px-[54px] lg:px-[64px] py-[30px] mt-[100px]">
        {/* buttons */}
        <div className="flex items-center md:justify-between justify-center md:flex-row flex-col ">
          {/* navigation */}
          <div className="text-[16px] font-[500] font-poppins flex gap-3">
            Home <ChevronRight />
          </div>
          {/* buttons */}
          <div className="flex items-center justify-center md:flex-row flex-col gap-3 font-[600] font-poppins text-[14px] text-white">
            <button
              onClick={() => setAddCtg(true)}
              className="bg-buttonColor min-w-[132px] p-2 px-4 rounded-xl "
            >
              Add category
            </button>
            <button
              onClick={() => setAddSub(true)}
              className="bg-buttonColor min-w-[132px] p-2 px-4 rounded-xl "
            >
              Add sub category
            </button>
            <button
              onClick={() => setProductAddOpen(true)}
              className="bg-buttonColor min-w-[132px] p-2 px-4 rounded-xl "
            >
              Add product
            </button>
          </div>
        </div>
        {/* buttons */}
        {/* contents */}
        <div className="flex mt-[40px] gap-2">
          <SideBar
            selectedSubItems={selectedSubItems}
            setSelectedSubItems={setSelectedSubItems}
          />
          <div className="w-full">
            {!isLoading && product?.length > 0 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {product.map((item) => (
                  <div
                    onClick={() =>
                      navigate("/productDetail", { state: { id: item?._id } })
                    }
                    className="p-4 cursor-pointer rounded-lg border border-black/70 w-full relative"
                  >
                    <div className="h-[27px] absolute right-5 top-4 w-[27px] rounded-full bg-[#B3D4E5] flex items-center justify-center p-1">
                      <Heart
                        className={` ${
                          item?.isFavorite ? "text-buttonColor" : ""
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-center w-full ">
                      {item?.images?.length > 0 && (
                        <img
                          src={item?.images[0]}
                          alt=""
                          className="max-w-[282px] max-h-[168px]"
                        />
                      )}
                    </div>
                    <div className="mt-3 font-poppins text-[17px]">
                      <h1 className="text-headerColor font-[500]">
                        {item?.title}
                      </h1>
                      <h1 className="mt-4 font-[600]">
                        ${item?.variants[0]?.price}
                      </h1>
                      <div className="flex items-center gap-2 mt-2">
                        {Array.from({ length: item?.star }).map(() => (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.20317 1.41659L10.5014 4.01313C10.6785 4.36721 11.1506 4.72128 11.544 4.78029L13.8946 5.17371C15.3995 5.42943 15.7535 6.51132 14.6716 7.59321L12.8423 9.43242C12.5374 9.73732 12.3603 10.3373 12.4587 10.77L12.98 13.042C13.393 14.832 12.439 15.5304 10.8555 14.596L8.65239 13.2879C8.24914 13.0518 7.6 13.0518 7.19675 13.2879L4.98379 14.5862C3.4003 15.5205 2.44627 14.8222 2.85935 13.0322L3.38063 10.7602C3.47898 10.3373 3.30195 9.73732 2.99705 9.42259L1.1775 7.60304C0.0956134 6.52115 0.449687 5.42943 1.9545 5.18354L4.30515 4.79013C4.69857 4.72128 5.17067 4.37704 5.3477 4.02297L6.64597 1.42643C7.34428 0.0101353 8.50486 0.0101352 9.20317 1.41659Z"
                              fill="#ACACAC"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="flex items-center justify-center h-10 w-full text-blue-600">
                Loading....
              </div>
            )}
            {product?.length === 0 && !isLoading && (
              <div className="flex items-center w-full h-30 text-red-500">
                No data found
              </div>
            )}
            {totalPage > 1 && (
              <div className="w-full flex items-center justify-center mt-4 mb-7">
                <CustomPagination
                  count={totalPage}
                  onChange={(page) => setPage(page)}
                  page={page}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
