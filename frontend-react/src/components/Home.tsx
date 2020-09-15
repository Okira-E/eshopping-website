import React from "react";

import requireAuth from "./requireAuth";

class Home extends React.Component<any, any> {
    render() {
        return <div>Hello</div>;
    }
}

export default requireAuth(Home);
