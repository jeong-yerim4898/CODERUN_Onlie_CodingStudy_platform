import React from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';

function VideoImgUpoload(props) {
    return (
        <div>
            <h1>비디오</h1>
            <Dropzone>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300,
                                height: 200,
                                border: '1px solid lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </Dropzone>
            {/* <div>
                <h1>썸네일</h1>
                <Dropzone>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div
                                style={{
                                    width: 300,
                                    height: 200,
                                    border: '1px solid lightgray',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div> */}
        </div>
    );
}

export default VideoImgUpoload;
