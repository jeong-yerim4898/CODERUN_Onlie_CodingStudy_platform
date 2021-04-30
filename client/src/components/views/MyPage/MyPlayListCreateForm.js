import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createPlaylist } from '_api/Playlist.js';

function MyPlayListCreateForm(props) {
    const history = useHistory();
    const [Title, setTitle] = useState('');

    const titleChangeHandler = e => {
        setTitle(e.currentTarget.value);
    };

    const submitHandler = event => {
        event.preventDefault();
        console.log(Title);
        if (!Title) {
            return alert('제목을 입력해 주셔야 합니다.');
        }
        const body = {
            title: Title,
        };
        createPlaylist(body)
            .then(res => {
                console.log(res);
                console.log('success');
                props.history.push('/profile');
            })
            .catch(err => console.log(err));
    };
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    onChange={titleChangeHandler}
                    value={Title}
                    placeholder="My Playlist"
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" type="submit" onClick={submitHandler}>
                        Button
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
}

export default MyPlayListCreateForm;
