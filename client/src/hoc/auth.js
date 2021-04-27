import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
/* 
     예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                 true -> 로그인한 유저만 출입이 가능한 페이지
                 false -> 로그인한 유저는 출입이 불가능한 페이지
  */
export default function (SpecificComponent, option) {
    const AuthenticationCheck = props => {
        let user = useSelector(state => state.user);
        let isAuth = localStorage.getItem('token');

        //Not Loggined in Status
        if (isAuth === null) {
            if (option) {
                props.history.push('/account');
            }
            //Loggined in Status
        } else {
            if (option === false) {
                props.history.push('/main');
            }
            if (option === true) {
                props.history.push('/account');
            }
        }

        return <SpecificComponent {...props} user={user} />;
    };
    return AuthenticationCheck;
}
