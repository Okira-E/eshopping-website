import React, { Dispatch } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./Register.module.css";
import { auth } from "../store/actions/auth";

interface dispatchToProps {
    onRegister: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        callback: any
    ) => any;
}

interface rootState {
    token?: string;
    errorMessage?: string;
}

interface State {
    passwordErrorMessage: string;
    logged: boolean;
}

type Props = dispatchToProps & rootState;

class Register extends React.Component<any, State> {
    state = {
        passwordErrorMessage: "",
        logged: false,
    };

    private onSubmit = (event: any) => {
        event.preventDefault();

        if (event.target.elements.pass.value.length < 8) {
            this.setState({
                passwordErrorMessage:
                    "Password should be at least 8 characters",
            });
            return;
        }

        this.props.onRegister(
            event.target.elements.fname.value,
            event.target.elements.lname.value,
            event.target.elements.email.value,
            event.target.elements.pass.value,
            () => {
                this.setState({ logged: true });
            }
        );
    };

    render() {
        return (
            <div className={styles.page_wrapper}>
                <div className={styles.left_side}>
                    <div className={styles.logo}>Modern Store</div>
                </div>
                <div className={styles.right_side}>
                    <form
                        onSubmit={this.onSubmit}
                        className={styles.register_wrapper}
                    >
                        <h2 id={styles.heading}>Sign Up</h2>
                        {this.props.errorMessage ? (
                            <p className={styles.error_message}>
                                {this.props.errorMessage}
                            </p>
                        ) : null}
                        {this.state.passwordErrorMessage ? (
                            <p className={styles.error_message}>
                                {this.state.passwordErrorMessage}
                            </p>
                        ) : null}
                        <div className={styles.form_input}>
                            <label htmlFor="fname">First Name</label>
                            <input
                                required
                                type="text"
                                name="fname"
                                id="fname"
                                placeholder="Bruce"
                            />
                        </div>
                        <div className={styles.form_input}>
                            <label htmlFor="lname">Last Name</label>
                            <input
                                required
                                type="text"
                                name="lname"
                                id="lname"
                                placeholder="Wayne"
                            />
                        </div>
                        <div className={styles.form_input}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="batman@asylum.com"
                            />
                        </div>
                        <div className={styles.form_input}>
                            <label htmlFor="pass">Password</label>
                            <input
                                required
                                type="password"
                                name="pass"
                                id="pass"
                                placeholder="password should be at least 8 characters"
                            />
                        </div>
                        <button>Submit</button>
                        {this.state.logged ? <Redirect to="/" /> : null}
                        <p>
                            Already joined?{" "}
                            <Link to={{ pathname: "/login" }}>
                                {" "}
                                Sign in here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: rootState) => {
    return { errorMessage: state.errorMessage };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onRegister: (
            firstName: string,
            lastName: string,
            email: string,
            password: string,
            callback: any
        ) => dispatch(auth(firstName, lastName, email, password, callback)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
