import { useDispatch } from 'react-redux';
import { beginPhotoEdit, endPhotoEdit, savePhotoEdit, deletePhoto } from './actions';
import { useState } from 'react';

export function Photo(props) {
    const { photo } = props;

    const [title, setTitle] = useState(photo.title);

    const dispatch = useDispatch();

    if (photo.is_editing) {
        return (
            <>
                <div className="photo-cell">
                    <div>
                        <img className="photo" src={`${photo.imgLink}`} alt={"" + photo.imgName} />
                    </div>
                    <div>
                        <textarea
                            className="title"
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        >{photo.imgName}</textarea>
                    </div>
                    <div>
                        <span className="date">{photo.month}/{photo.day}/{photo.year}</span>
                    </div>
                    <button
                        onClick={() => dispatch(savePhotoEdit({...photo, entry}))}
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