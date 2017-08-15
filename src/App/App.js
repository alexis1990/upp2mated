import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import requireAuthentication from '../routes/restrictedRoutes/index'
import { connect } from 'react-redux'
import Identification from '../scenes/Consultations/identification/index'
import Authentication from '../scenes/Authentication/index'
import Consultations from '../scenes/Consultations/'
import Team from '../scenes/Consultations/team/index'
import Providers from '../scenes/Consultations/providers/index'
import Documentation from '../scenes/Consultations/documentation/index'
import Confirmation from '../scenes/Consultations/confirmation/index'
import Summary from '../scenes/Consultations/summary/index'
import CommercialFrame from '../scenes/Consultations/commercialFrame/index'
import Sign from '../scenes/Sign/index'
import Suppliers from '../scenes/Suppliers/index'
import KitUi from '../scenes/KitUi/index'
import Header from '../components/Header/index'
import SubHeader from '../components/SubHeader/index'
import Modal from '../components/Modal/index'
import 'react-datasheet/lib/react-datasheet.css';

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
    ]
  }
}

const App = ({isAuthenticated}) => (
  <div>
    { isAuthenticated ?
      <div>
        <Header />
        <SubHeader />
      </div>
      :
      null
    }
    <main>
      <Switch>
          <Route exact path="/" component={Authentication}/>
          <Route path="/consultations" component={({ match }) => (
            <div>
              <Route path={`${match.url}/:stepId`} component={ requireAuthentication(({match}) =>(
                <Consultations match={match} stepId={match.params.stepId} steps={steps.wizard.stepsRFI} />))
              }/>
              <Route exact path={match.url} render={() => (
                <h3>Please select a topic.</h3>
              )}/>
            </div>
          )}/>
          <Route exact path="/suppliers" component={requireAuthentication(Suppliers)} />
          <Route exact path="/sign-in" component={requireAuthentication(Sign)} />
          <Route exact path="/kitui" component={KitUi} />
      </Switch>
    </main>
  </div>
)


// class App extends PureComponent {

//   componentDidMount() {
//       window.addEventListener('scroll', this.fixedSubHeader);
//   }

//   componentWillUnmount() {
//       window.removeEventListener('scroll', this.fixedSubHeader);
//   }

//   fixedSubHeader(event) {
//       const scroll = event.srcElement.body.scrollTop;
//       var html = document.documentElement;
//       if(html.offsetHeight > 800 && scroll > 50) {
//         var subheader = document.querySelectorAll(".subheader");
//         [].forEach.call(subheader, function(el) {
//             if (!document.querySelector('.subheader.fixed')) {
//                 subheader[0].className += " fixed";
//             }
//         });
//       } else {
//         var subheader = document.querySelectorAll(".subheader");
//         [].forEach.call(subheader, function(el) {
//             el.classList.remove("fixed");
//         });
//       }
//   }

//   render () {
//     const steps = {
//       wizard:{
//           stepsRFI: [
//           { id: 1, component: <Identification/>, title: "Identification" },
//           { id: 2, component: <Team/> , title: "Equipe" },
//           { id: 3, component: <CommercialFrame/> , title: "Trame commerciale" },
//           { id: 4, component: <Providers/> , title: "Fournisseurs" },
//           { id: 5, component: <Documentation/> , title: "Documentation" },
//           { id: 6, component: <Summary/> , title: "Récapitulatif" },
//           { id: 7, component: <Confirmation/>, title: 'Confirmation' },
//         ]
//       }
//     }
//     const { isAuthenticated } = this.props;
//     return (
//       <div>
//           { isAuthenticated ?
//             <div>
//               <Header />
//               <SubHeader />
//             </div>
//             :
//             null
//           }
//           <main>
//             <Switch>
//                 <Route exact path="/" component={Authentication}/>
//                 <Route path="/consultations" component={({ match }) => (
//                   <div>
//                     <Route path={`${match.url}/:stepId`} component={ requireAuthentication(({match}) =>(
//                       <Consultations match={match} stepId={match.params.stepId} steps={steps.wizard.stepsRFI} />))
//                     }/>
//                     <Route exact path={match.url} render={() => (
//                       <h3>Please select a topic.</h3>
//                     )}/>
//                   </div>
//                 )}/>
//                 <Route exact path="/sign-in" component={requireAuthentication(Sign)} />
//                 <Route exact path="/kitui" component={KitUi} />
//             </Switch>
//           </main>
//       </div>
//     )
//   }
// }

function mapStateToProps(state, ownProps){
  return {
    isAuthenticated : state.auth.isLogged,
    actualStep: state.wizard.actualStep
  };
}

function mapDispatchToProps(){
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
