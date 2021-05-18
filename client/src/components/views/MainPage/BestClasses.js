import React, { useState } from 'react';
import Slider from 'react-slick';
import './BestClasses.css';

function BestClasses(props) {
    const tmp_url =
        'https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    const [bests, setBests] = useState([
        [tmp_url, 'Best 1', 'NickName 1'],
        [tmp_url, 'Best 2', 'NickName 2'],
        [tmp_url, 'Best 3', 'NickName 3'],
        [tmp_url, 'Best 4', 'NickName 4'],
        [tmp_url, 'Best 5', 'NickName 5'],
    ]);
    const gotoVideoPage = function (item) {
        // 여기 변경
        props.history.push('/class');
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: true,
    };
    return (
        <div className="bestClasses">
            <h2 className="bestClassesTitle"> Best Classes </h2>
            <Slider {...settings}>
                {bests.length > 0 &&
                    bests.map((item, idx) => (
                        <div className="bestClassCard" onClick={() => gotoVideoPage(item)}>
                            <img
                                src={item[0]}
                                className="BestClassImage"
                                alt="thumbnail is gone...."
                            />
                            <h3 className="bestClassTitle">{item[1]}</h3>
                            <h4 className="bestClassNickname">{item[2]}</h4>
                        </div>
                    ))}
            </Slider>
        </div>
    );
}

export default BestClasses;
