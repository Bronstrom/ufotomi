import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMonth } from './actions';

export function SearchbarMonth() {
    // Month & Year state
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const dispatch = useDispatch();

    return (
        <div className="searchbar">
            <div className="page-chooser">
                <select 
                    value={month}
                    onChange={event => setMonth(parseInt(event.target.value))}
                >
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>
                <input
                    type="number"
                    min="0"
                    max={`${today.getFullYear()}`}
                    value={year}
                    onChange={event => setYear(parseInt(event.target.value))}
                >
                </input>
                <button
                    onClick={() => dispatch(fetchMonth(month, year))}
                >Search Month</button>
            </div>
        </div>
    );
}