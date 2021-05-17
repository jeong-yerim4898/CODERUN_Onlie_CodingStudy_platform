import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { fetchSearchedVideoList, fetchLoginedSearchedVideoList } from '_api/Video.js';

import { Input } from 'antd';

function NavBarSearch(props) {
    let user = useSelector(state => state.user);
    const history = useHistory();
    const user_id = user?.login?.user?.id;

    const { Search } = Input;
    const [SearchTerm, setSearchTerm] = useState('');

    const onChangeHandler = e => {
        setSearchTerm(e.currentTarget.value);
        // props.refreshFunction(e.currentTarget.value);
    };

    const onSearchHandler = () => {
        if (user_id) {
            console.log(1);
            fetchLoginedSearchedVideoList(user_id, SearchTerm, 1).then(res => {
                console.log(res.data.data);
                history.push({
                    pathname: '/class',
                    state: { playlist: res.data.data, search: SearchTerm },
                });
            });
        } else {
            console.log(2);
            fetchSearchedVideoList(SearchTerm, 1).then(res => {
                console.log(res.data.data);
                history.push({
                    pathname: '/class',
                    state: { playlist: res.data.data, cnt: res.data.page_cnt, search: SearchTerm },
                });
            });
        }
    };

    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={onChangeHandler}
                style={{ width: 200 }}
                value={SearchTerm}
                onSearch={onSearchHandler}
            />
        </div>
    );
}

export default NavBarSearch;
