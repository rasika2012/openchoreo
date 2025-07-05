export const initialState = {
    colorMode: "light",
};
export var ActionType;
(function (ActionType) {
    ActionType["SET_COLOR_MODE"] = "SET_COLOR_MODE";
})(ActionType || (ActionType = {}));
export const appStateReducer = (state, action) => {
    switch (action.type) {
        case ActionType.SET_COLOR_MODE:
            return { ...state, colorMode: action.payload };
        default:
            return state;
    }
};
//# sourceMappingURL=appState.js.map