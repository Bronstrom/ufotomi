import { useDispatch } from 'react-redux';
import { beginPhotoEdit, endPhotoEdit, savePhotoEdit, deletePhoto, addRating } from './actions';
import { useState } from 'react';
import validator from 'validator';

export function Photo(props) {
    let editDate = "";
    const { photo } = props;
    
    const [imgLink, setLink] = useState(photo.imgLink);
    const [imgName, setTitle] = useState(photo.imgName);
    const [imgDesc, setDescription] = useState(photo.imgDesc);
    const [tag, setTag] = useState(photo.tag);
    const [amazing, setAmazing] = useState(photo.amazing);
    const [nice, setNice] = useState(photo.nice);
    const [meh, setMeh] = useState(photo.meh);
    const [boo, setBoo] = useState(photo.boo);

    const [errMsg, setErrMsg] = useState('');
    const [currErr, setCurrErr] = useState(false);

    const validateLink = (url) => {
        setLink(url);
        if (!validator.isURL(url)) {
            setErrMsg('ERROR: Invalid URL provided');
            setCurrErr(true);
        } else {
            setErrMsg('');
            setCurrErr(false);
        }
    }

    const updatePhoto = () => {
        if (!currErr) {
            dispatch(savePhotoEdit({...photo, imgName, imgLink, imgDesc, tag}))
        }
    }

    function updateRating (rating) {
        switch (rating) {
            case "amazing":
                dispatch(addRating(photo.id, "amazing"));
                setAmazing(amazing + 1);
                break;
            case "nice":
                dispatch(addRating(photo.id, "nice"));
                setNice(nice + 1);
                break;
            case "boo":
                dispatch(addRating(photo.id, "boo"));
                setBoo(boo + 1);
                break;
            // In case of error, mehs have the lease outcome on affecting rating
            default:
                dispatch(addRating(photo.id, "meh"));
                setMeh(meh + 1);
                break;
        }
    }

    const dispatch = useDispatch();
    
    
    if (photo.is_adding) {
        const today = new Date();
        return (
            <>
                <div className="photo-cell centering">
                    <div>
                        <img className="photo" src={`${photo.imgLink}`} alt={"" + photo.imgName} />
                        <p>Photo Link:</p>
                        <input
                            type="text"
                            placeholder={`${photo.imgLink}`}
                            onChange={event => validateLink(event.target.value)}
                        ></input>
                        <p className="error-msg">{errMsg}</p>
                        <i><p className="text-left">Note: Photos should be provided from a direct link. Here is some information on how to insert from popular media platforms:</p>
                            <ul className="text-left">
                                <li>Google Drive: Take the "id" (long string of text, numbers and dashes) in a share link URL (must be public) and add it in place in this URL: "https://drive.google.com/uc?export=view&amp;id=[insert id here]"</li>
                            </ul>
                        </i>
                    </div>
                    <div>
                        <p>Title:</p>
                        <textarea
                            className="title"
                            value={imgName}
                            onChange={event => setTitle(event.target.value)}
                        >{photo.imgName}</textarea>
                        <p>Description:</p>
                        <textarea
                            className="imgDesc"
                            value={imgDesc}
                            onChange={event => setDescription(event.target.value)}
                        >{photo.imgDesc}</textarea>
                        <p>Tag:</p>
                        <select
                            className="tag"
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
                    </div>
                    <div>
                        <span className="date">{photo.month}/{photo.day}/{photo.year}</span>
                    </div>
                    <p>
                        <button
                            onClick={() => updatePhoto()}
                        >Add</button>
                        <button 
                            onClick={() => dispatch(deletePhoto(photo.id))}
                        >Cancel</button>
                    </p>
                </div>
            </>
        );
    }
    else if (photo.is_editing) {
        const today = new Date();
        editDate = "(" + today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + ")";
        return (
            <>
                <div className="photo-cell centering">
                    <div>
                        <img className="photo" src={`${photo.imgLink}`} alt={"" + photo.imgName} />
                        <p>Photo Link:</p>
                        <p className="date"><i>{photo.imgLink}</i></p>
                    </div>
                    <div>
                        <p>Title:</p>
                        <textarea
                            className="title"
                            value={imgName}
                            onChange={event => setTitle(event.target.value)}
                        >{photo.imgName}</textarea>
                        <p>Description:</p>
                        <textarea
                            className="imgDesc"
                            value={imgDesc}
                            onChange={event => setDescription(event.target.value)}
                        >{photo.imgDesc}</textarea>
                        <p>Tag:</p>
                        <select
                            className="tag"
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
                    </div>
                    <div>
                        <span className="date">{photo.month}/{photo.day}/{photo.year}</span>
                    </div>
                    <p>
                        <button
                            onClick={() => updatePhoto()}
                        >Update</button>
                        <button 
                            onClick={() => dispatch(endPhotoEdit(photo.id))}
                        >Cancel</button>
                        <button
                            onClick={() => dispatch(deletePhoto(photo.id))}
                        >Delete</button>
                    </p>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="photo-cell">
                    <div>
                        <img src={`${photo.imgLink}`} alt={"" + photo.imgName} className="photo" />
                    </div>
                    <div>
                        <span className="title">{photo.imgName}</span>
                    </div>
                    <div>
                        <span className="imgDesc">{photo.imgDesc}</span>
                    </div>
                    <div>
                        <span className="date">{photo.month + 1}/{photo.day}/{photo.year}</span>
                    </div>
                    <p className="centering">
                        <button 
                            onClick={() => updateRating("amazing")}
                        >Amazing: {amazing}</button>
                        <button
                            onClick={() => updateRating("nice")}
                        >Nice: {nice}</button>
                        <button
                            onClick={() => updateRating("meh")}
                        >Meh: {meh}</button>
                        <button
                            onClick={() => updateRating("boo")}
                        >Boo: {boo}</button>
                    </p>
                    <div className="centering">
                        <button
                            onClick={() => dispatch(beginPhotoEdit(photo.id))}
                        ><img className="icon" src="/img/edit_icon.png" alt="edit icon" /></button>
                    </div>
                </div>
            </>
        );
    }
}
