import { Dispatch } from "react";
import axios from "axios";

import { Action } from "../reducer";

const authStart = (): Action => {
    return {
        type: "AUTH_START",
    };
};

// DEFINE THE TYPE FOR THE PARAMETER WHEN YOU KNOW IT
const authSuccess = (authData: unknown): Action => {
    return {
        type: "AUTH_SUCCESS",
        value: authData,
    };
};

// DEFINE THE TYPE FOR THE PARAMETER WHEN YOU KNOW IT
const authFail = (error: unknown): Action => {
    return {
        type: "AUTH_FAIL",
        value: error,
    };
};

export const auth = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    callback: any
) => {
    return (dispatch: any) => {
        axios
            .post("http://localhost:3200/api/users/register", {
                firstName,
                lastName,
                email,
                password,
            })
            .then(res => {
                dispatch({ type: "AUTHENTICATE_USER", value: res.data });
                callback();
            })
            .catch(err => {
                dispatch({ type: "AUTH_FAIL", value: "Email already exists" });
            });
    };
};
