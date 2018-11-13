import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return <div className="test">App runs!</div>;
};

ReactDOM.render(<App className="test"/>, document.getElementById("App"))