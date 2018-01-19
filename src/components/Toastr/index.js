import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { displayToastr } from './actions'
import './styles/style.css'

class Toastr extends Component {
    closeToastr() {
        const { displayToastr } = this.props;
        displayToastr(false, '', '');
    }
    render() {
        const { displayToastr, message, display, status } = this.props;
        return (
            <div className={`toast ${status} ${display ? 'show' : 'hide'}`}>
                <p className="toast__content" onClick={this.closeToastr.bind(this)}>
                    { message }
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        display: state.toastr.display,
        message: state.toastr.message,
        status: state.toastr.status,
    }
}

function mapDispatchToProps() {
    return (dispatch) => bindActionCreators({ displayToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (Toastr);