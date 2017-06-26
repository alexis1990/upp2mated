import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './scenes/Home/index'
import Sign from './scenes/Sign/index'
import Header from './components/Header/index'
import SubHeader from './components/SubHeader/index'

const App = () => (
  <div>
    <Header />
    <SubHeader />
      {/*<Link to="/">Home</Link>
      <Link to="/about-us">About</Link>*/}

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign-in" component={Sign} />
    </main>
  </div>
)

export default App;
