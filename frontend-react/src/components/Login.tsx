import React from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";

interface Props {}
interface State {
    errorMessage: string;
}

export default class Login extends React.Component<Props, State> {
    state = {
        errorMessage: "",
    };

    onLogin = (event: any) => {
        event.preventDefault();

        if (event.target.elements.pass.value.length < 8) {
            this.setState({
                errorMessage: "Password should be at least 8 characters",
            });
            return;
        }
    };

    render() {
        return (
            <div className={styles.page_wrapper}>
                <div className={styles.left_side}>
                    <div className={styles.logo}>Modern Store</div>
                </div>
                <div className={styles.right_side}>
                    <form
                        onSubmit={this.onLogin}
                        className={styles.register_wrapper}
                    >
                        <h2 id={styles.heading}>Sign In</h2>
                        {this.state.errorMessage ? (
                            <p className={styles.error_message}>
                                {this.state.errorMessage}
                            </p>
                        ) : null}
                        <div className={styles.form_input}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@email.com"
                            />
                        </div>
                        <div className={styles.form_input}>
                            <label htmlFor="pass">Password</label>
                            <input
                                required
                                type="password"
                                name="pass"
                                id="pass"
                                placeholder="********"
                            />
                        </div>
                        <button>Submit</button>
                        <p>
                            Not joined yet?{" "}
                            <Link to={{ pathname: "/register" }}>
                                {" "}
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
