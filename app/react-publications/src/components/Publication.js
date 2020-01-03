import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Publication = ({ publication }) => {
  const [editMode, setEditMode] = useState(false);
  const inputClass = 'form-control' + (!editMode ? ' form-control-plaintext' : '');

  return (
    <section className="container mt-3">
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="title">Tytuł</label>
          <div className="col-sm-10">
            <input className={inputClass} name="title" type="text" readOnly={!editMode} value="Zalety pracy z drzewami" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="pageCount">Liczba stron</label>
          <div className="col-sm-10">
            <input className={inputClass} readOnly={!editMode} name="pageCount" type="number" min={0} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="publicationYear">Rok wydania</label>
          <div className="col-sm-10">
            <input className={inputClass} readOnly={!editMode} name="publicationYer" type="number" min={1500} max={2200} />
          </div>
        </div>

        <hr />

        <div className="form-group d-flex justify-content-end">
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
  publication: PropTypes.object.isRequired
};

export default Publication;