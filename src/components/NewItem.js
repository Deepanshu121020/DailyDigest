import React from 'react';

const NewItem = (props) => {
        const {title, description, imageUrl, newsUrl, author, date} = props;
        return (
            <div>
                <div className="card my-3">
                    <img src={imageUrl?imageUrl:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'>By {author?author:"unknown"} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} target='blank' className="btn btn-sm btn-dark btn-primary">Read more</a> 
                    </div>
                </div>
            </div>
        )
    }

export default NewItem;