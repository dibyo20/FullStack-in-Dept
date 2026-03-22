const Div3 = () => {
    return React.createElement(
        "div",
        { id: "div3" },
        [
            React.createElement(
                "button",
                { id: "create-btn" },
                [
                    React.createElement("i", {
                        className: "fa-solid fa-plus"
                    }),
                    React.createElement("span", null, "Create")
                ]
            ),
            React.createElement(
                "div",
                { id: "notification" },
                [
                    React.createElement("i", {
                        className: "fa-regular fa-bell"
                    }),
                ]
            ),
            React.createElement("div", { id: "profile" }, "D")
        ]
    );
};

export default Div3;