import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getQualitySurvey } from '../actions'
import { RestrictedRouteHeader } from '../../../components/RestrictedRouteHeader/'
import ManageQualitySurvey from '../components/ManageQualitySurvey'
import { withRouter } from 'react-router-dom'

class QualitySurveyReply extends Component {
    componentWillMount() {
        const { getQualitySurvey, match } = this.props;
        const supplierId = match.params.supplier;
        const templateId = match.params.id;
        getQualitySurvey(supplierId, templateId);
    }
    render () {
        return (
            <div>
                <RestrictedRouteHeader />
                <ManageQualitySurvey />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps() {
    return (dispatch) => bindActionCreators({getQualitySurvey}, dispatch);
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (QualitySurveyReply));