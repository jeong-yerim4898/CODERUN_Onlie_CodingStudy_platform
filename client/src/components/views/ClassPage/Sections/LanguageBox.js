import React, { useState, useEffect } from 'react';
import { getLanguageTag } from '_api/Class.js';
import { Button } from 'antd';

function LanguageBox() {
    const [languages, setlanguages] = useState([]);

    useEffect(() => {
        getLanguageTag().then(res => {
            // console.log(res.data.data);
            const languageTag = res.data.data;
            // console.log(languageTag);
            setlanguages(languageTag);
        });
    }, []);

    const renderButton = languages.map((languagetag, index) => {
        return <Button key={index}>{languagetag.language_name}</Button>;
    });
    return <div>{renderButton}</div>;
}

export default LanguageBox;
