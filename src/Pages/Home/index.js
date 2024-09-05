import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [selectedCat, setSelectedCat] = useState();
    const [filterData, setFilterData] = useState([]);
    const [homeSlides, setHomeSlides] = useState([]);

    const [value, setValue] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const selectCat = (cat) => {
        setSelectedCat(cat);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const firstCategoryName = context.categoryData?.[0]?.name || '';
        setSelectedCat(firstCategoryName);
        //setSelectedCat(context.categoryData[0]?.name);

        const location = localStorage.getItem("location");

        if (location) {
            fetchDataFromApi(`/api/products/featured?location=${location}`).then((res) => {
                // Ensure response is an array
                setFeaturedProducts(Array.isArray(res) ? res : []);
            });

            fetchDataFromApi(`/api/products?page=1&perPage=8&location=${location}`).then((res) => {
                // Ensure response is an array
                setProductsData(Array.isArray(res.products) ? res.products : []);
            });
        }

        fetchDataFromApi("/api/homeBanner").then((res) => {
            // Ensure response is an array
            setHomeSlides(Array.isArray(res) ? res : []);
        });
    }, [context.categoryData]);

    useEffect(() => {
        if (selectedCat !== undefined) {
            setIsLoading(true);
            const location = localStorage.getItem("location");
            fetchDataFromApi(`/api/products?catName=${selectedCat}&location=${location}`).then((res) => {
                setFilterData(Array.isArray(res.products) ? res.products : []);
                setIsLoading(false);
            });
        }
    }, [selectedCat]);

    return (
        <>
            {homeSlides?.length > 0 && <HomeBanner data={homeSlides} />}

            {context.categoryData?.length > 0 && (
                <HomeCat catData={context.categoryData} />
            )}

            <section className="homeProducts">
                <div className="container">
                    <div className="row homeProductsRow">
                        <div className="col-md-3">
                            <div className="sticky">
                                <div className="banner">
                                    <img src={banner1} className="cursor w-100" />
                                </div>

                                <div className="banner mt-4">
                                    <img src={banner2} className="cursor w-100" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9 productRow">
                            <div className="d-flex align-items-center res-flex-column">
                                <div className="info" style={{ width: "35%" }}>
                                    <h3 className="mb-0 hd">Popular Products</h3>
                                    <p className="text-light text-sml mb-0">
                                        Do not miss the current offers until the end of March.
                                    </p>
                                </div>

                                <div className="ml-auto d-flex align-items-center justify-content-end res-full" style={{ width: "65%" }}>
                                    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" className="filterTabs">
                                        {context.categoryData?.map((item, index) => (
                                            <Tab
                                                className="item"
                                                label={item.name}
                                                onClick={() => selectCat(item.name)}
                                                key={index}
                                            />
                                        ))}
                                    </Tabs>
                                </div>
                            </div>

                            <div className="product_row w-100 mt-2" style={{ opacity: isLoading ? "0.5" : "1" }}>
                                {context.windowWidth > 992 ? (
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={0}
                                        navigation={true}
                                        slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                                        modules={[Navigation]}
                                        className="mySwiper"
                                        breakpoints={{
                                            300: { slidesPerView: 1, spaceBetween: 5 },
                                            400: { slidesPerView: 2, spaceBetween: 5 },
                                            600: { slidesPerView: 3, spaceBetween: 5 },
                                            750: { slidesPerView: 4, spaceBetween: 5 },
                                        }}
                                    >
                                        {Array.isArray(filterData) && filterData.length > 0 &&
                                            filterData.slice(0).reverse().map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <ProductItem item={item} />
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                ) : (
                                    <div className="productScroller">
                                        {Array.isArray(filterData) && filterData.length > 0 &&
                                            filterData.slice(0).reverse().map((item, index) => (
                                                <ProductItem key={index} item={item} />
                                            ))}
                                    </div>
                                )}
                            </div>

                            <div className="d-flex mt-4 mb-3 bannerSec">
                                <div className="banner">
                                    <img src={banner3} className="cursor w-100" />
                                </div>

                                <div className="banner">
                                    <img src={banner4} className="cursor w-100" />
                                </div>

                                <div className="banner">
                                    <img src={banner4} className="cursor w-100" />
                                </div>
                            </div>

                            <div className="d-flex align-items-center mt-4">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                                    <p className="text-light text-sml mb-0">
                                        New products with updated stocks.
                                    </p>
                                </div>
                            </div>

                            <div className="product_row productRow2 w-100 mt-4 d-flex productScroller">
                                {Array.isArray(productsData.products) && productsData.products.length > 0 &&
                                    productsData.products.slice(0).reverse().map((item, index) => (
                                        <ProductItem key={index} item={item} />
                                    ))}
                            </div>

                            <div className="d-flex align-items-center mt-4">
                                <div className="info">
                                    <h3 className="mb-0 hd">Featured Products</h3>
                                    <p className="text-light text-sml mb-0">
                                        Do not miss the current offers until the end of March.
                                    </p>
                                </div>
                            </div>

                            <div className="product_row w-100 mt-2">
                                {context.windowWidth > 992 ? (
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={0}
                                        navigation={true}
                                        slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                                        modules={[Navigation]}
                                        className="mySwiper"
                                        breakpoints={{
                                            300: { slidesPerView: 1, spaceBetween: 5 },
                                            400: { slidesPerView: 2, spaceBetween: 5 },
                                            600: { slidesPerView: 3, spaceBetween: 5 },
                                            750: { slidesPerView: 4, spaceBetween: 5 },
                                        }}
                                    >
                                        {Array.isArray(featuredProducts) && featuredProducts.length > 0 &&
                                            featuredProducts.slice(0).reverse().map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <ProductItem item={item} />
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                ) : (
                                    <div className="productScroller">
                                        {Array.isArray(featuredProducts) && featuredProducts.length > 0 &&
                                            featuredProducts.slice(0).reverse().map((item, index) => (
                                                <ProductItem key={index} item={item} />
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
