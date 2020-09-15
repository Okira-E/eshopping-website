export interface rootState {
    token: string;
    errorMessage: string;
}

export interface Action {
    type: string;
    value?: any;
}

export const initialState: rootState = {
    token: "",
    errorMessage: "",
};

export const reducer = (
    state: rootState = initialState,
    action: Action
): rootState => {
    switch (action.type) {
        case "AUTHENTICATE_USER":
            return {
                ...state,
                token: action.value,
            };
        case "AUTH_FAIL":
            return {
                ...state,
                errorMessage: action.value,
            };
        default:
            return state;
    }
};
