import {
    decrement,
    increment,
    incrementByAmount,
} from "@/features/counter/counterSlice";
import { selectCount } from "@/features/counter/selectors";
import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    test();
    
    return (
        <div>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <span>{count}</span>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
            <button
                aria-label="+5"
                onClick={() => dispatch(incrementByAmount(5))}
            >
                +5
            </button>
        </div>
    );
}
