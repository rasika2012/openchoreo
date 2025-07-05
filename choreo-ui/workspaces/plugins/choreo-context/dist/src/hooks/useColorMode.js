import { useGlobalState } from "./useGlobleState";
import { ActionType } from "../reducers/appState";
// import { GlobalStateContext } from "src/providers/GlobleStateProvider";
export const useColorMode = () => {
    const { appState: { colorMode }, dispatch, } = useGlobalState();
    const setColorMode = (colorMode) => {
        dispatch({ type: ActionType.SET_COLOR_MODE, payload: colorMode });
    };
    return { colorMode, setColorMode };
};
//# sourceMappingURL=useColorMode.js.map