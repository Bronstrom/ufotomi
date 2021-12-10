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
        fetch(`https://bradfell.me:8443/photos/${month}/${year}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showPhotos(data.results));
                } else {
                    console.error(data);
                }
            });
    };
}

// Thunk creator function which takes month and day URL components as parameters
export function fetchDay(month, day, year) {
    return dispatch => {
        fetch(`https://bradfell.me:8443/photos/${month}/${day}/${year}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showPhotos(data.results));
                } else {
                    console.error(data);
                }
            });
    };
}

// Thunk creator function which takes tag parameters
export function fetchTag(tag) {
    return dispatch => {
        fetch(`https://bradfell.me:8443/photos/${tag}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showPhotos(data.results));
                } else {
                    console.error(data);
                }
            });
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
                    dispatch(replacePhoto({...photo, is_editing: false}));
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

// TODO: Double check on whether to use SOFT or HARD delete here



// Action enum
export const Action = Object.freeze({
    ShowPhotos: 'ShowPhotos',
    BeginPhotoEdit: 'BeginPhotoEdit',
    EndPhotoEdit: 'EndPhotoEdit',
    ReplacePhoto: 'ReplacePhoto',
    AddPhoto: 'AddPhoto',
    RemovePhoto: 'RemovePhoto',
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



// TODO: "AddPhoto" display error
