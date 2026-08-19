const Div1 = () => {
    return React.createElement(
        "div",
        { id: "div1" },
        [
            React.createElement("i", {
                className: "fa-solid fa-bars nav-icon"
            }),

            React.createElement(
                "div",
                { id: "logo-section" },
                [
                    React.createElement("i", {
                        className: "fa-brands fa-youtube yt-logo"
                    }),
                    React.createElement("span", {
                        className: "nav-title"
                    }, "YouTube")
                ]
            )
        ]
    );
};

export default Div1;