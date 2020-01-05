import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Publication = ({ createMode, publication, history, refreshPublications, globalState }) => {
  if (createMode) {
    publication = {
      owner: globalState.login,
      title: '',
      pageCount: null,
      publicationYear: null,
      attachments: [],
      shareList: []
    };
  }

  const orginalPublication = publication;
  console.log(orginalPublication);

  const [editMode, setEditMode] = useState(createMode ? true : false);
  const [currentPublication, setCurrentPublication] = useState(orginalPublication);
  const inputClass = 'form-control' + (!editMode ? ' form-control-plaintext' : '');

  const validatePublication = (publication) => {
    return (
      publication.title.length > 0 &&
      publication.pageCount > 0 &&
      publication.publicationYear > 0
    );
  };

  const saveChanges = async () => {
    if (!validatePublication(currentPublication)) {
      alert('Niepoprawne dane');
      return;
    }

    let selfLink = currentPublication.links.find((l) => l.rel === 'self');
    const response = await fetch(selfLink.href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentPublication),
    });

    if (!response.ok) {
      alert('Nie udało się zapisać zmian');
      return;
    }

    refreshPublications();
    history.push('/publications');
  };

  const createPublication = async () => {
    if (!validatePublication(currentPublication)) {
      alert('Niepoprawne dane');
      return;
    }

    const baseUrl = globalState.urls.publicationsApi;
    let url = baseUrl + globalState.actions['publication.create'].href;
    url = url.replace('{user}', globalState.login);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentPublication),
    });

    if (!response.ok) {
      alert('Nie udało się utworzyć publikacji');
      return;
    }

    refreshPublications();
    history.push('/publications');
  };

  const detachFile = async (id) => {
    const attachment = currentPublication.attachments.find((a) => a.id === id);
    const url = attachment.links.find((l) => l.rel === 'detach').href;

    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      alert('Nie udało się odłączyć pliku');
      return;
    }

    setCurrentPublication({
      ...currentPublication,
      attachments: currentPublication.attachments.filter((a) => a.id !== id)
    });
    refreshPublications();
  };

  return (
    <section className="container mt-3">
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="title">Tytuł</label>
          <div className="col-sm-10">
            <input className={inputClass} name="title" type="text" readOnly={!editMode}
              value={currentPublication.title}
              onChange={
                (e) => { setCurrentPublication({ ...currentPublication, title: e.target.value }); }
              }
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="pageCount">Liczba stron</label>
          <div className="col-sm-10">
            <input className={inputClass} readOnly={!editMode} name="pageCount" type="number" min={0}
              value={currentPublication.pageCount}
              onChange={
                (e) => { setCurrentPublication({ ...currentPublication, pageCount: e.target.value }); }
              }
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="publicationYear">Rok wydania</label>
          <div className="col-sm-10">
            <input className={inputClass} readOnly={!editMode} name="publicationYer" type="number"
              min={1200} max={2200} value={currentPublication.publicationYear}
              onChange={
                (e) => { setCurrentPublication({ ...currentPublication, publicationYear: e.target.value }); }
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label className="font-weight-bolder">Załączone pliki</label>
          <ul className="list-group">
            {currentPublication.attachments.map((attachment) => {
              const downloadLink = attachment.links.find((l) => l.rel === 'download');
              const detachLink = attachment.links.find((l) => l.rel === 'detach');

              return (
                <li key={attachment.id} className="list-group-item d-inline-flex align-items-center">
                  <span className="flex-grow-1">{attachment.fileName}</span>
                  <div className="buttons">
                    {downloadLink &&
                      <a href={downloadLink.href} className="btn btn-primary mr-2" type="button">
                        <i className="fas fa-cloud-download-alt"></i>
                        <span className="d-none d-sm-inline ml-1">Pobierz</span>
                      </a>
                    }
                    {detachLink &&
                      <button onClick={() => detachFile(attachment.id)} className="btn btn-warning mr-2" type="button">
                        <i className="fas fa-unlink"></i>
                        <span className="d-none d-sm-inline ml-1">Odłącz</span>
                      </button>
                    }
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <hr />

        <div className="form-group d-flex justify-content-end">
          {editMode && !createMode &&
            <>
              <button className="btn btn-success" type="button" onClick={saveChanges}>Zapisz</button>
              <button className="btn btn-danger ml-2" type="button"
                onClick={() => { setCurrentPublication(orginalPublication); setEditMode(false); }}>
                Anuluj zmiany
              </button>
            </>
          }

          {!editMode &&
            <button className="btn btn-primary" type="button" onClick={() => setEditMode(true)}>
              Edytuj
            </button>
          }

          {createMode &&
            <button className="btn btn-success" type="button" onClick={createPublication}>Utwórz pulikację</button>
          }
        </div>
      </form>
    </section>
  );
};

Publication.propTypes = {
  createMode: PropTypes.bool,
  publication: PropTypes.object,
  history: PropTypes.object.isRequired,
  refreshPublications: PropTypes.func.isRequired,
  globalState: PropTypes.object
};

export default withRouter(Publication);