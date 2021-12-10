import { useDispatch } from 'react-redux';
import { beginPhotoEdit, endPhotoEdit, savePhotoEdit, deletePhoto } from './actions';
import { useState } from 'react';

export function Photo(props) {
    let editDate = "";
    const { photo } = props;
    
    const [imgLink, setLink] = useState(photo.imgLink);
    const [imgName, setTitle] = useState(photo.imgName);
    const [imgDesc, setDescription] = useState(photo.imgDesc);
    const [tag, setTag] = useState("Other");

    const dispatch = useDispatch();

    // TODO: Add other fields for a photo

    if (photo.is_editing) {
        const today = new Date();
        editDate = "(" + today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + ")";
        return (
            <>
                <div className="photo-cell">
                    <div>
                        <img className="photo" src={`${photo.imgLink}`} alt={"" + photo.imgName} />
                        <p>Photo Link:</p>
                        <textarea
                            className="link"
                            value={imgLink}
                            onChange={event => setLink(event.target.value)}
                        >{photo.imgLink}</textarea>
                        <i><p>Note: Photos should be provided from a direct link. Here is some information on how to insert from popular media platforms:</p>
                            <ul>
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
                    <button
                        onClick={() => dispatch(savePhotoEdit({...photo, imgName, imgLink, imgDesc, tag}))}
                    >Update</button>
                    <button 
                        onClick={() => dispatch(endPhotoEdit(photo.id))}
                    >Cancel</button>
                    <button
                        onClick={() => dispatch(deletePhoto(photo.id))}
                    >Remove</button>
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
                        <span className="date">{photo.month}/{photo.day}/{photo.year}</span>
                    </div>
                    <button
                        onClick={() => dispatch(beginPhotoEdit(photo.id))}
                    >Edit</button>
                </div>
            </>
        );
    }
}

// TODO: Make Tag into a Component to be used here and App.js?
