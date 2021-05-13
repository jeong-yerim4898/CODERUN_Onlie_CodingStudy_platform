import styled from 'styled-components';
import { Input, Button } from 'antd';

const { TextArea } = Input;

export const StyledInput = styled(Input)`
    :focus {
        border-color: #fc8a16;
        box-shadow: 0 0 0 2px #f9dcbe;
    }
    :hover {
        border-color: #fc8a16;
        box-shadow: 0 0 0 2px #f9dcbe;
    }
`;

export const StyledButton = styled(Button)`
    color: palevioletred;
    font-weight: normal;
    :focus {
        color: palevioletred;
        border-color: palevioletred;
    }
    :hover {
        color: palevioletred;
        border-color: palevioletred;
    }
    &.ant-btn-clicked:after {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: -1px;
        right: -1px;
        border-radius: inherit;
        border: 0 solid palevioletred;
        opacity: 0.4;
        -webkit-animation: buttonEffect 0.4s;
        animation: buttonEffect 0.4s;
        display: block;
    }
`;
