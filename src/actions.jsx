// Error check response
function assertResponse(response) {
    if (response.status >= 200 || response.status < 300) {
        return response;
    } else {
        throw new Error(`${response.status}:${response.statusText}`);
    }
}

// Thunk creator function which takes month and day URL components as parameters
export function fetchMonth(month, year) {
    return dispatch => {
        dispatch(showLoading());
        fetch(`https://bradfell.me:8443/photos/${month}/${year}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showPhotos(data.results));
                    dispatch(hideLoading());
                } else {
                    console.error(data);
                }
            });
    };
}


// Thunk creator function which takes month and day URL components as parameters
export function fetchAll() {
    return dispatch => {
        dispatch(showLoading());
        fetch(`https://bradfell.me:8443/photos/`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showPhotos(data.results));
                    dispatch(hideLoading());
                } else {
                    console.error(data);
                }
            });
    };
}

// Thunk creator function which takes tag parameters
export function fetchTag(tag) {
    return dispatch => {
        dispatch(showLoading());
        fetch(`https://bradfell.me:8443/tag/${tag}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showPhotos(data.results));
                    dispatch(hideLoading());
                } else {
                    console.error(data);
                }
            });
    };
}

export function addRating(id, rating) {
    return dispatch => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch (`https://bradfell.me:8443/${id}/${rating}`, options)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (!data.ok) {
                    console.error(data);
                }
            }
        );
    };
}

// Thunk creator for saving a photo - needs successful fetch to send photo up to PATCH
export function savePhotoEdit(photo) {
    return dispatch => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photo),
        };
        fetch (`https://bradfell.me:8443/photos/${photo.id}`, options)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(replacePhoto({
                        ...photo,
                        is_editing: false,
                        is_adding: false,
                    }));
                } else {
                    console.error(data);
                }
            }
        );
    };
}

// Add a new photo - blank photo is added to database and provides ID through POST request
export function newPhoto(year, month, day) {
    const photo = {
        year,
        month,
        day,
        "imgName": "",
        "imgLink": "",
        "imgDesc": "",
        "tag": "Other",
    };

    return dispatch => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photo),
        };
        fetch(`https://bradfell.me:8443/photos`, options)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(addPhoto({
                        ...photo,
                        id: data.results,
                        is_editing: true,
                        is_adding: true,
                    }));
                }
            }
        );
    };
}

// Remove a photo - photo is SOFT deleted from database through DELETE request
export function deletePhoto(id) {
    return dispatch => {
        const options = {
            method: 'DELETE',
        };
        fetch(`https://bradfell.me:8443/photos/${id}`, options)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(removePhoto(id));
                }
            }
        );
    };
}



// Action enum
export const Action = Object.freeze({
    ShowPhotos: 'ShowPhotos',
    BeginPhotoEdit: 'BeginPhotoEdit',
    EndPhotoEdit: 'EndPhotoEdit',
    ReplacePhoto: 'ReplacePhoto',
    AddPhoto: 'AddPhoto',
    RemovePhoto: 'RemovePhoto',
    IsLoading: 'IsLoading',
    StopLoading: 'StopLoading',
});
// Action creator - replace current photos with new fetched photos
export function showPhotos(photos) {
    return {type: Action.ShowPhotos, payload: photos};
}
// Edit action creators
export function beginPhotoEdit(id) {
    return {type: Action.BeginPhotoEdit, payload: id};
}
export function endPhotoEdit(id) {
    return {type: Action.EndPhotoEdit, payload: id};
}
export function replacePhoto(photo) {
    return {type: Action.ReplacePhoto, payload: photo}
}
// Add action creator
export function addPhoto(photo) {
    return {type: Action.AddPhoto, payload: photo}
}
// Remove action creator
export function removePhoto(id) {
    return {type: Action.RemovePhoto, payload: id};
}

export function showLoading() {
    return {type: Action.IsLoading, payload: true};
}

export function hideLoading() {
    return {type: Action.StopLoading, payload: false};
}
