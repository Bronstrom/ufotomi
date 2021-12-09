import { useDispatch } from 'react-redux';
import { beginPhotoEdit, endPhotoEdit, savePhotoEdit, deletePhoto } from './actions';
import { useState } from 'react';

export function Photo(props) {
    let editDate = "";
    const { photo } = props;
    
    const [imgLink, setLink] = useState(photo.imgLink);
    const [imgName, setTitle] = useState(photo.imgName);
    const [imgDesc, setDescription] = useState(photo.imgDesc + editDate);

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
                        <p><i>Note: Photos should be provided from a direct link. Here is some information on how to insert from popular media platforms:
                            <ul>
                                <li>Google Drive: Take the "id" (long string of text, numbers and dashes) in a share link URL (must be public) and add it in place in this URL: "https://drive.google.com/uc?export=view&amp;id=[insert id here]"</li>
                            </ul>
                        </i></p>
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
                    </div>
                    <div>
                        <span className="date">{photo.month}/{photo.day}/{photo.year}</span>
                    </div>
                    <button
                        onClick={() => dispatch(savePhotoEdit({...photo, imgName, imgDesc}))}
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
                        <img className="photo" src={`${photo.imgLink}`} alt={"" + photo.imgName} />
                    </div>
                    <div>
                        <span className="title">{photo.imgName}</span>
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