import React from 'react';
import '../VideoUpload.scss';

function VideoTag(props) {
    const animateButton = e => {
        e.preventDefault();
        //reset animation
        e.target.classList.remove('animate');

        e.target.classList.add('animate');
        setTimeout(function () {
            e.target.classList.remove('animate');
        }, 700);
    };

    var bubblyButtons = document.getElementsByClassName('bubbly-button');

    for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);
    }

    return (
        <div class="videotag-container">
            <button class="bubbly-button" onClick={animateButton}>
                {props.tag}
            </button>
        </div>
    );
}

export default VideoTag;
