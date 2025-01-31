
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { MyContext } from "../../App";

const HomeBanner = (props) => {

    const context = useContext(MyContext);
    const data = props.data || []; 
    return (
        <div className="container mt-3">
            <div className="homeBannerSection">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation={context.windowWidth>992 ? true : false}
                    loop={true}
                    speed={500}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                >
                     {data.length !== 0 && data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="item">
                                <img src={item?.images[0]} className="w-100" alt={`Slide ${index}`} />
                            </div>
                        </SwiperSlide>
                    ))}


                </Swiper>
            </div>
        </div>
    )
}

export default HomeBanner;