import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const PublicationsList = ({ label, publications, match }) => {
  return (
    <section className="container">
      <h2>{label}</h2>
      <ul className="list-group">
        {publications.map((publication) => {
          const selfLink = publication.links.find((l) => l.rel === 'self');
          const deleteLink = publication.links.find((l) => l.rel === 'delete');

          return (
            <li key={publication.id} className="list-group-item d-inline-flex align-items-center">
              <span className="flex-grow-1">{publication.title}</span>
              <div className="buttons">
                {selfLink &&
                  <Link to={`${match.url}/${publication.id}`}>
                    <button className="btn btn-info mr-2" type="button">
                      <i className="fas fa-info-circle"></i>
                      <span className="d-none d-sm-inline ml-1">Szczegóły</span>
                    </button>
                  </Link>
                }
                {deleteLink &&
                  <a className="btn btn-danger mr-2" href={deleteLink.href}>
                    <i className="fas fa-trash"></i>
                    <span className="d-none d-sm-inline ml-1">Usuń</span>
                  </a>
                }
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

PublicationsList.propTypes = {
  label: PropTypes.string,
  publications: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(PublicationsList);