export const initState = {
    count: 0,
    // state: 0,
    // state: 0,
    // state: 0,
    // state: 0,
};

export default function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return {
                ...state,
                count: state.count + 1,
            };
        case "decrement":
            return {
                ...state,
                count: state.count - 1,
            };
        case "incrementByAmount":
            return {
                ...state,
                count: state.count + action.payload,
            };
        default:
            throw new Error(`Action type ${action.type} invalid`);
    }
}
