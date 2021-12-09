import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMonth, fetchTag, newPhoto } from './actions';

export function Toolbar() {
    // Month & Year state
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    // Tag state
    const [tag, setTag] = useState("Other");

    const dispatch = useDispatch();

    return (
        <div className="toolbar">
            <button
                onClick={() => dispatch(newPhoto(year, month, today.getDate()))}
            >New Photo</button>
            <div className="month-chooser">
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
                >Search by Month</button>
            </div>
            <div className="tag-chooser">
                <select
                    value={tag}
                    onChange={event => setTag(event.target.value)}
                >
                    <option value="Other">Other</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Arts">Arts</option>
                    <option value="Animals">Animals</option>
                    <option value="Athletics">Athletics</option>
                    <option value="Business">Business</option>
                    <option value="City">City</option>
                    <option value="Culture">Culture</option>
                    <option value="Experimental">Experimental</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Food">Food</option>
                    <option value="History">History</option>
                    <option value="Nature">Nature</option>
                    <option value="Portraits">Portraits</option>
                    <option value="Science">Science</option>
                    <option value="Textures">Textures</option>
                </select>
                <button
                    onClick={() => dispatch(fetchTag(tag))}
                >Search by Tag</button>
            </div>
        </div>
    );
}