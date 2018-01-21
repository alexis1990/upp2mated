import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { displayToastr } from './actions'
import './styles/style.css'

class Toastr extends Component {
    constructor() {
        super();
        this.state = {
            display: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ display : nextProps.display})
    }

    closeToastr() {
        const { displayToastr } = this.props;
        displayToastr(false, '', '');
        this.setState({ display: false });
    }

    render() {
        const { displayToastr, message, status } = this.props;
        const {display} = this.state;

        return (
            display ?
            <div className={`toast ${status}`} onClick={this.closeToastr.bind(this)}>
                <p className="toast__content">
                    { message }
                </p>
            </div>
            :
            null
        )
    }
}

function mapStateToProps(state) {
    console.log('displaydisplaydisplay', state)
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