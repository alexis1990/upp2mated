import React, { PureComponent, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux' 
import Identification from '../scenes/Consultations/identification/index'
import Consultations from '../scenes/Consultations/'
import Team from '../scenes/Consultations/team/index'
import Providers from '../scenes/Consultations/providers/index'
import Documentation from '../scenes/Consultations/documentation/index'
import Confirmation from '../scenes/Consultations/confirmation/index'
import Summary from '../scenes/Consultations/summary/index'
import CommercialFrame from '../scenes/Consultations/commercialFrame/index'
import Sign from '../scenes/Sign/index'
import KitUi from '../scenes/KitUi/index'
import Header from '../components/Header/index'
import SubHeader from '../components/SubHeader/index'
import Modal from '../components/Modal/index'
import 'react-datasheet/lib/react-datasheet.css';


class App extends PureComponent {
  
  componentDidMount() {
      window.addEventListener('scroll', this.fixedSubHeader);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.fixedSubHeader);
  }

  fixedSubHeader(event) {
      const scroll = event.srcElement.body.scrollTop;
      var html = document.documentElement;
      if(html.offsetHeight > 800 && scroll > 50) {
        var subheader = document.querySelectorAll(".subheader");
        [].forEach.call(subheader, function(el) {
            if (!document.querySelector('.subheader.fixed')) {
                subheader[0].className += " fixed";
            }
        });
      } else {
        var subheader = document.querySelectorAll(".subheader");
        [].forEach.call(subheader, function(el) {
            el.classList.remove("fixed");
        });
      }
  }

  render () {
    const steps = {
      wizard:{
          stepsRFI: [
          { id: 1, component: <Identification/>, title: "Identification" },
          { id: 2, component: <Team/> , title: "Equipe" },
          { id: 3, component: <CommercialFrame/> , title: "Trame commerciale" },
          { id: 4, component: <Providers/> , title: "Fournisseurs" },
          { id: 5, component: <Documentation/> , title: "Documentation" },
          { id: 6, component: <Summary/> , title: "Récapitulatif" },
          { id: 7, component: <Confirmation/>, title: 'Confirmation' },
          // { id: 4, component:, title: 'Documentation' },
          // { id: 5, component:, title: 'Récapitulatif' },
          // { id: 6, component:, title: 'Confirmation' }
        ]
      }
    }
    return (
      <div>
        <Header />
        <SubHeader />
          {/*<Link to="/">Home</Link>
          <Link to="/about-us">About</Link>*/}
          <main>
            <Router>
              <div>
                <Route path="/consultations" component={({ match }) => (
                  <div>
                    <Route path={`${match.url}/:stepId`} component={ ({match}) =>(
                      <Consultations match={match} stepId={match.params.stepId} steps={steps.wizard.stepsRFI} />)
                    }/>
                    <Route exact path={match.url} render={() => (
                      <h3>Please select a topic.</h3>
                    )}/>
                  </div>
                )}/>
                <Route exact path="/sign-in" component={Sign} />
                <Route exact path="/kitui" component={KitUi} />
              </div>
            </Router>
          </main>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  console.log('STATEEE', state)
  return {};
}

function mapDispatchToProps(){
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
