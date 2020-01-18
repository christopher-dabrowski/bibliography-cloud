import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const PublicationsList = ({ label, publications, match, refreshPublications, globalState }) => {
  return (
    <section className="container">
      <h2>{label}</h2>
      <ul className="list-group">
        {publications.map((publication) => {
          const selfLink = publication.links.find((l) => l.rel === 'self');
          const deleteLink = publication.links.find((l) => l.rel === 'delete');

          const deletePublication = async () => {
            // Send SSE
            let url = globalState.urls.clientBase + '/api/publicationMessage';
            url = new URL(url);
            url.searchParams.set('publication', publication.title);
            url.searchParams.set('action', 'deleted');
            fetch(url);

            await fetch(deleteLink.href, {
              method: 'DELETE',
            });
            refreshPublications();
          };

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
                  <button className="btn btn-danger mr-2" onClick={deletePublication}>
                    <i className="fas fa-trash"></i>
                    <span className="d-none d-sm-inline ml-1">Usuń</span>
                  </button>
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
  match: PropTypes.object.isRequired,
  refreshPublications: PropTypes.func
};

export default withRouter(PublicationsList);