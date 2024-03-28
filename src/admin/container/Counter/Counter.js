import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/action/counter.action';

function Counter(props) {
    const counterVal = useSelector(state => state.counter)
    console.log(counterVal);
    const dispatch = useDispatch()
    const handleInc = () => {
        dispatch(increment())
    }

    const handleDec = () => {
        dispatch(decrement())
    }
    return (
        <div>
            <button onClick={handleInc}>+</button>
            {counterVal.count}
            <button onClick={handleDec}>-</button>
        </div>
    );
}

export default Counter;