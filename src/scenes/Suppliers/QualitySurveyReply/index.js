import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getQualitySurvey } from '../actions';
import { RestrictedRouteHeader } from '../../../components/RestrictedRouteHeader/';
import ManageQualitySurvey from '../components/ManageQualitySurvey';

class QualitySurveyReply extends Component {
  componentWillMount() {
    const { getQualitySurvey, match } = this.props;
    const { supplierId, templateId } = match.params;
    getQualitySurvey(supplierId, templateId);
  }

  render() {
    return (
      <div>
        <RestrictedRouteHeader />
        <ManageQualitySurvey />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = () => dispatch => bindActionCreators({
  getQualitySurvey,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QualitySurveyReply));
