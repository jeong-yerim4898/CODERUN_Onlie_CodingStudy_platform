// import logo from './logo.svg';
import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
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
import VideoUpload from './components/views/VideoUpload/VideoUpload';
import Playlist from './components/views/WatchPage/Playlist';
import VideoInfo from './components/views/WatchPage/VideoInfo';
import WatchPage from './components/views/WatchPage/WatchPage';

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <>
                    <NavBar></NavBar>
                    <Route exact path="/account" component={AccountPage}></Route>
                    <Route exact path="/" component={Auth(MainPage, null)}></Route>
                    {/* <Route exact path="/account" component={AccountPage}></Route> */}
                    <Route exact path="/account/success" component={AccountSuccess}></Route>
                    <Route exact path="/class" component={Auth(ClassPage, null)}></Route>
                    <Route exact path="/watch/:id" component={Auth(WatchPage, true)}></Route>

                    {/* <Route
                    render={() => <div className="error">에러 페이지</div>}
                /> */}

                    <Footer></Footer>
                </>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
