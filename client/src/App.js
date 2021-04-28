// import logo from './logo.svg';
import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from 'hoc/auth';

import AccountPage from './components/views/Accounts/AccountPage';
import AccountSuccess from './components/views/Accounts/AccountSuccess';
import ClassList from './components/views/ClassPage/ClassList';
import ClassPage from './components/views/ClassPage/ClassPage';
import CommunityPage from './components/views/CommunityPage/CommunityPage';
import Footer from './components/views/Footer/Footer';
import MainPage from './components/views/MainPage/MainPage';
import MyPage from './components/views/MyPage/MyPage';
import NavBar from './components/views/Navbar/NavBar';
import DetailCodeRunCommunity from './components/views/PostCommunity/DetailCodeRunCommunity';
import PostCommunity from './components/views/PostCommunity/PostCommunity';
import VideoUploadPage from './components/views/VideoUpload/VideoUploadPage';
import Playlist from './components/views/WatchPage/Playlist';
import VideoInfo from './components/views/WatchPage/VideoInfo';
import WatchPage from './components/views/WatchPage/WatchPage';
import NotFoundPage from './components/views/NotFoundPage/NotFoundPage';

/* 
     예)  option: null -> 누구나 출입이 가능한 페이지
                 true -> 로그인한 유저만 출입이 가능한 페이지
                 false -> 로그인한 유저가 account 페이지 가려고 하면 막아준다
        Route 할때 /image,/api,/video,/streaming 넣어서 적기 X
  */
function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <NavBar></NavBar>
                <Switch>
                    <Route exact path="/account" component={Auth(AccountPage, false)}></Route>
                    <Route exact path="/" component={Auth(MainPage, null)}></Route>
                    <Route exact path="/account/success" component={AccountSuccess}></Route>
                    <Route exact path="/class" component={Auth(ClassPage, null)}></Route>
                    <Route exact path="/watch/:id" component={Auth(WatchPage, true)}></Route>
                    <Route
                        exact
                        path="/upload/video/"
                        component={Auth(VideoUploadPage, true)}
                    ></Route>

                    <Route exact path="*" component={NotFoundPage} />
                </Switch>
                <Footer></Footer>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
