import React from 'react';

const PublicationsList = ({ publications }) => {
    return (
        <section className="container">
            <h2>Twoje publikacje</h2>
            <ul className="list-group">
                {publications.map((publication) => {
                    const selfLink = publication.links.find((l) => l.rel === 'self');
                    const deleteLink = publication.links.find((l) => l.rel === 'delete');

                    return (
                        <li className="list-group-item d-inline-flex align-items-center">
                            <span className="flex-grow-1">{publication.title}</span>
                            <div className="buttons">
                                {selfLink &&
                                    <a className="btn btn-info mr-2" href={selfLink.href}>
                                        <i class="fas fa-info-circle"></i>
                                        <span className="d-none d-sm-inline ml-1">Szczegóły</span>
                                    </a>
                                }
                                {deleteLink &&
                                    <a className="btn btn-danger mr-2" href={deleteLink.href}>
                                        <i class="fas fa-trash"></i>
                                        <span className="d-none d-sm-inline ml-1">Usuń</span>
                                    </a>
                                }
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}

export default PublicationsList;