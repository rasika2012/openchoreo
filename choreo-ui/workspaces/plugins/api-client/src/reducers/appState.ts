import {ChoreoApiClient, Component, ComponentList, Project, ProjectList} from "@open-choreo/api-client-lib"


export interface IAppState {
    sharedState: Object | null,
};

export const initialState: IAppState = {
    sharedState: null,
};

export enum ActionType {
    SET_SHARED_STATE = "SET_SHARED_STATE",
}

export type IAppStateAction = {
    type: ActionType.SET_SHARED_STATE;
    payload: Object;
};

export const appStateReducer = (state: IAppState, action: IAppStateAction) => {
    switch (action.type) {
        case ActionType.SET_SHARED_STATE:
            return { ...state, sharedState: action.payload };
        default:
            return state;
    }
}
