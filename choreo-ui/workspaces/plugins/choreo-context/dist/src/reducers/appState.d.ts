export interface IAppState {
    colorMode: "light" | "dark";
}
export declare const initialState: IAppState;
export declare enum ActionType {
    SET_COLOR_MODE = "SET_COLOR_MODE"
}
export type IAppStateAction = {
    type: ActionType.SET_COLOR_MODE;
    payload: "light" | "dark";
};
export declare const appStateReducer: (state: IAppState, action: IAppStateAction) => IAppState;
