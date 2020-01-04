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

  const saveChanges = async () => {
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

  const validatePublication = (publication) => {
    return (
      publication.title.length > 0 &&
      publication.pageCount > 0 &&
      publication.publicationYear > 0
    );
  };

  const createPublication = async () => {
    if (!validatePublication(currentPublication))
      alert('Niepoprawne dane');

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