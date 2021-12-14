import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTag } from './actions';

export function SearchbarTag() {
    // Tag state
    const [tag, setTag] = useState("Other");

    const dispatch = useDispatch();

    return (
        <div className="searchbar">
            <div className="page-chooser centering">
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
                >Search Tag</button>
            </div>
        </div>
    );
}