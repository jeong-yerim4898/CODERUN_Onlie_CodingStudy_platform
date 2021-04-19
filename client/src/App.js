// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from './components/views/Accounts/LoginPage'
import SignupPage from './components/views/Accounts/SignupPage'
import ClassList from './components/views/ClassPage/ClassList'
import ClassPage from './components/views/ClassPage/ClassPage'
import CommunityPage from './components/views/CommunityPage/CommunityPage'
import Footer from './components/views/Footer/Footer'
import MainPage from './components/views/MainPage/MainPage'
import MyPage from './components/views/MyPage/MyPage'
import Navbar from './components/views/Navbar/Navbar'
import DetailCodeRunCommunity from './components/views/PostCommunity/DetailCodeRunCommunity'
import PostCommunity from './components/views/PostCommunity/PostCommunity'
import VideoUpload from './components/views/VideoUpload/VideoUpload'
import Playlist from './components/views/WatchPage/Playlist'
import VideoInfo from './components/views/WatchPage/VideoInfo'
import WatchPage from './components/views/WatchPage/WatchPage'

function App() {
  return (
    <BrowserRouter>
        {/* <NavBar></NavBar> */}
        <Switch>
          <Route exact path="/" component={MainPage}></Route>
          <Route exact path="/signup" component={SignupPage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/classlist" component={ClassList}></Route>


          <Route render={() => <div className='error'>에러 페이지</div>} />
        </Switch>
        {/* <Footer></Footer> */}
    </BrowserRouter>
  );
}

export default App;
