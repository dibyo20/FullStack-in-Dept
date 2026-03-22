const Div2 = () => {
    return React.createElement(
        "div",
        { id: "div2" },
        React.createElement(
            "div",
            { id: "search-container" },
            [
                React.createElement(
                    "div",
                    { id: "search-box" },
                    [
                        React.createElement("input", {
                            type: "text",
                            placeholder: "Search",
                            id: "search-input"
                        }),

                        React.createElement(
                            "button",
                            { id: "search-btn" },
                            React.createElement("i", {
                                className: "fa-solid fa-magnifying-glass"
                            })
                        )
                    ]
                ),
                React.createElement(
                    "button",
                    { id: "mic-btn" },
                    React.createElement("i", {
                        className: "fa-solid fa-microphone"
                    })
                )
            ]
        )
    );
};

export default Div2;