import React, { useState } from 'react';
import { Input } from 'antd';

function NavBarSearch(props) {
    const { Search } = Input;
    const [SearchTerm, setSearchTerm] = useState('');

    const searchHandler = e => {
        setSearchTerm(e.currentTarget.value);
        props.refreshFunction(e.currentTarget.value);
    };

    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={searchHandler}
                style={{ width: 200 }}
                value={SearchTerm}
            />
        </div>
    );
}

export default NavBarSearch;
