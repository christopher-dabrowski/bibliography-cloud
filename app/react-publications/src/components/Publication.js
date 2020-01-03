import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Publication = ({ publication, history, location }) => {
  const orginalPublication = publication;
  const [editMode, setEditMode] = useState(false);
  const [currentPublication, setCurrentPublication] = useState(orginalPublication);
  const inputClass = 'form-control' + (!editMode ? ' form-control-plaintext' : '');

  console.log(orginalPublication);

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
          {editMode &&
            <>
              <button className="btn btn-success" type="button">Zapisz</button>
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
        </div>
      </form>
    </section>
  );
};

Publication.propTypes = {
  publication: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Publication);