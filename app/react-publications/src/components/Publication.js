import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

const Publication = ({ createMode, publication, history, refreshPublications, globalState }) => {
  if (createMode) {
    publication = {
      owner: globalState.login,
      title: '',
      pageCount: null,
      publicationYear: null,
      attachments: [],
      shareList: [],
      links: []
    };
  }

  const orginalPublication = publication;

  const [editMode, setEditMode] = useState(createMode ? true : false);
  const [currentPublication, setCurrentPublication] = useState(orginalPublication);
  const [toAttachList, setToAttachList] = useState([]);
  const [localIdList, setLocalIdList] = useState([]);
  const inputClass = 'form-control' + (!editMode ? ' form-control-plaintext' : '');
  const attachLink = currentPublication.links.find((l) => l.rel === "attachFile");

  // console.log(currentPublication);


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

    const publication = { ...currentPublication };
    publication.attachments = publication.attachments.map(a => { // Clear local id
      if (!localIdList.includes(a.id)) return a;
      else return {
        userName: a.userName,
        fileName: a.fileName
      };
    });

    let selfLink = currentPublication.links.find((l) => l.rel === 'self');
    const response = await fetch(selfLink.href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publication),
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

    const publication = { ...currentPublication };
    if (editMode) // Clear attachment id
      publication.attachments = publication.attachments.map(a => ({
        userName: a.userName,
        fileName: a.fileName
      }));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publication),
    });

    if (!response.ok) {
      alert('Nie udało się utworzyć publikacji');
      return;
    }

    refreshPublications();
    history.push('/publications');
  };

  const detachFile = async (id) => {
    setCurrentPublication({
      ...currentPublication,
      attachments: currentPublication.attachments.filter((a) => a.id !== id)
    });
  };

  const attachFiles = async () => {
    const attachments = [];
    const curretnlyTakenId = [...localIdList]; // Cant use state because it updates async
    for (const fileName of toAttachList) {
      const id = Math.max(...currentPublication.attachments.map((a) => a.id), ...curretnlyTakenId) + 1;
      curretnlyTakenId.push(id);
      attachments.push({
        id: id,
        userName: globalState.login,
        fileName: fileName,
        links: [{ rel: 'detach', href: 'NotYetSaved' }]
      });
    }
    setLocalIdList(curretnlyTakenId);

    setCurrentPublication({
      ...currentPublication,
      attachments: currentPublication.attachments.concat(attachments)
    });

    setToAttachList([]);
  };

  const prepareAttachmentsOptions = () => {
    const attachedFileNames = currentPublication.attachments.map((a) => a.fileName);
    let userFileNames = globalState.userFiles.map((f) => f.fileName);
    userFileNames = userFileNames.filter((f) => (!attachedFileNames.includes(f)));

    return userFileNames.map((f) => ({ value: f, label: f }));
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

              if (downloadLink) { // Fill in template url
                downloadLink.href = downloadLink.href
                  .replace('{appBaseUrl}', globalState.urls.clientBase)
                  .replace('{fileName}', attachment.fileName);
              }
              console.log(downloadLink);

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
                    {detachLink && editMode &&
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

        {editMode && (attachLink || createMode) &&
          <div className="form-group ">
            <label htmlFor="attachments">Dołącz pliki</label>
            <div className="d-flex">
              <Select
                isMulti
                value={toAttachList.map((a) => ({ value: a, label: a }))}
                name="attachments"
                onChange={(selectedOptions) => setToAttachList(selectedOptions.map((o) => o.value))}
                options={prepareAttachmentsOptions()}
                className="basic-multi-select flex-grow-1 mr-2"
                classNamePrefix="select"
              />
              <button onClick={attachFiles} disabled={toAttachList.length === 0} className="btn btn-success" type="button">
                <i className="fas fa-link"></i>
                <span className="d-none d-sm-inline ml-1">Dołącz</span>
              </button>
            </div>
          </div>
        }

        <hr />

        <div className="form-group d-flex justify-content-end">
          {editMode && !createMode &&
            <>
              <span className="d-inline-block" data-tip data-for="save-button">
                <button className="btn btn-success" type="button" disabled={!validatePublication(currentPublication)} onClick={saveChanges}>
                  Zapisz
                </button>
                {!validatePublication(currentPublication) &&
                  <ReactTooltip id='save-button' type='error'>
                    <span>Nieprawidłowe dane publikacji</span>
                  </ReactTooltip>
                }
              </span>

              <button className="btn btn-danger ml-2" type="button"
                onClick={() => { setCurrentPublication(orginalPublication); setToAttachList([]); setEditMode(false); }}>
                Anuluj zmiany
              </button>
            </>
          }

          {!editMode &&
            <button className="btn btn-info" type="button" onClick={() => setEditMode(true)}>
              Edytuj
            </button>
          }

          {createMode &&
            <>
              <span className="d-inline-block" data-tip data-for="create-button">
                <button className="btn btn-success" type="button" disabled={!validatePublication(currentPublication)} onClick={createPublication}>
                  Utwórz pulikację
                </button>
              </span>
              {!validatePublication(currentPublication) &&
                <ReactTooltip id='create-button' type='error'>
                  <span>Nieprawidłowe dane publikacji</span>
                </ReactTooltip>
              }
            </>
          }
        </div>
      </form>
    </section >
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