import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default (ChildComponent: any) => {
    class ComposedComponent extends Component<any, any> {
        state = {
            redirect: false,
        };

        // Our component just got rendered
        componentDidMount() {
            this.shouldNavigateAway();
        }
        // Our component just got updated
        // componentDidUpdate() {
        //     this.shouldNavigateAway();
        // }
        shouldNavigateAway = () => {
            if (!this.props.auth) {
                this.setState({ redirect: true });
            }
        };
        render() {
            return (
                <div>
                    <ChildComponent {...this.props} />
                    {this.state.redirect ? <Redirect to="/register" /> : null}
                </div>
            );
        }
    }
    function mapStateToProps(state: any) {
        return { auth: state.token };
    }
    return connect(mapStateToProps)(ComposedComponent);
};
