import React, { useState } from 'react';
import { Button } from 'antd';

function LanguageBox(props) {
    const [Checked, setChecked] = useState([]);

    const handleToggle = value => {
        //누른 것의 Index를 구하고
        const currentIndex = Checked.indexOf(value);
        console.log(value);
        //전체 Checked된 State에서  현재 누른 Checkbox가 이미 있다면
        const newChecked = [...Checked];
        // State 넣어준다.
        if (currentIndex === -1) {
            newChecked.push(value);
            // 빼주고
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
    };

    const renderCheckboxLists = () =>
        props.list &&
        props.list.map((value, index) => (
            <React.Fragment key={index}>
                <Button
                    // onClick={handleToggle(value.id)}
                    // checked={Checked.indexOf(value._id) === -1 ? false : true}
                    style={{ margin: 5 }}
                    type="primary"
                >
                    <span>{value.name}</span>
                </Button>
            </React.Fragment>
        ));

    return <div>{renderCheckboxLists()}</div>;
}

export default LanguageBox;
