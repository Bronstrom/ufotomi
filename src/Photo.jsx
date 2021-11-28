export function Photo(props) {
    const { photo } = props;

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
            </div>
        </>
    );
}