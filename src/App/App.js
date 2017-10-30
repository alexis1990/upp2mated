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
import Supplier from '../scenes/Suppliers/Supplier/index'
import ManageSupplier from '../scenes/Suppliers/ManageSupplier/index'
import Administration from '../scenes/Administration/index'
import EditTeam from '../scenes/Administration/components/Teams/EditTeam/'
import CreateTeam from '../scenes/Administration/components/Teams/CreateTeam/'
import TeamView from '../scenes/Administration/components/Teams/Team/'
import User from '../scenes/Administration/components/Users/User/'
import CreateUser from '../scenes/Administration/components/Users/CreateUser/'
import ManageRoles from '../scenes/Administration/components/Roles/components/ManageRoles/index'
import Authorizations from '../scenes/Administration/components/Roles/components/Authorizations/index'
import QualitySurvey from '../scenes/Administration/components/QualitySurvey'
import KitUi from '../scenes/KitUi/index'
import Header from '../components/Header/index'
import SubHeader from '../components/SubHeader/index'
import Modal from '../components/Modal/index'
import 'react-datasheet/lib/react-datasheet.css';

const steps = {
  wizard: {
    stepsRFI: [
      { id: 1, component: <Identification />, title: "Identification" },
      { id: 2, component: <Team />, title: "Equipe" },
      { id: 3, component: <CommercialFrame />, title: "Trame commerciale" },
      { id: 4, component: <Providers />, title: "Fournisseurs" },
      { id: 5, component: <Documentation />, title: "Documentation" },
      { id: 6, component: <Summary />, title: "Récapitulatif" },
      { id: 7, component: <Confirmation />, title: 'Confirmation' },
    ]
  }
}

const App = ({ isAuthenticated }) => (
  <div>
    {isAuthenticated ?
      <div>
        <Header />
        <SubHeader />
      </div>
      :
      null
    }
    <main>
      <Switch>
        <Route exact path="/" component={Authentication} />
        <Route path="/consultations" component={({ match }) => (
          <div>
            <Route path={`${match.url}/:stepId`} component={requireAuthentication(({ match }) => (
              <Consultations match={match} stepId={match.params.stepId} steps={steps.wizard.stepsRFI} />))
            } />
            <Route exact path={match.url} render={() => (
              <h3>Please select a topic.</h3>
            )} />
          </div>
        )} />
        <Route exact path="/suppliers" component={requireAuthentication(Suppliers)} />
        <Route exact path="/suppliers/:id" component={requireAuthentication(Supplier)} />
        <Route exact path="/suppliers/supplier/new" component={requireAuthentication(ManageSupplier)} />
        <Route exact path="/suppliers/supplier/edit/:id" component={requireAuthentication(ManageSupplier)} />
        <Route exact path="/administration" component={requireAuthentication(Administration)} />
        <Route exact path="/administration/teams/:id" component={requireAuthentication(TeamView)} />
        <Route exact path="/administration/teams/team/new" component={requireAuthentication(CreateTeam)} />
        <Route exact path="/administration/teams/team/edit/:id" component={requireAuthentication(EditTeam)} />
        <Route exact path="/administration/users/:id" component={requireAuthentication(User)} />
        <Route exact path="/administration/users/user/new" component={requireAuthentication(CreateUser)} />
        <Route exact path="/administration/roles/:id" component={requireAuthentication(ManageRoles)} />
        <Route exact path="/administration/roles/role/new" component={requireAuthentication(ManageRoles)} />
        <Route exact path="/administration/roles/role/edit/:id" component={requireAuthentication(ManageRoles)} />
        <Route exact path="/administration/roles/manage/authorizations" component={requireAuthentication(Authorizations)} />
        <Route exact path="/administration/quality-survey" component={requireAuthentication(QualitySurvey)} />
        <Route exact path="/sign-in" component={requireAuthentication(Sign)} />
        <Route exact path="/kitui" component={KitUi} />
      </Switch>
    </main>
  </div>
)

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isLogged,
    actualStep: state.wizard.actualStep
  };
}

function mapDispatchToProps() {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
