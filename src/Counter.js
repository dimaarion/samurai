import { useSelector, useDispatch } from 'react-redux'
import {incrementCount, decrementCount} from './reduser/counterSlice'


export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(incrementCount())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrementCount())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}