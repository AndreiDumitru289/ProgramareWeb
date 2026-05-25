import { useEffect, useState } from 'react';
import { API } from './api';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingId, setEditingId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editTech, setEditTech] = useState('');

  useEffect(function () {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API + '/api/projects');

      if (!response.ok) {
        throw new Error('Nu s-au putut incarca proiectele.');
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError('Eroare: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProject(event) {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(API + '/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          tech: tech,
        }),
      });

      if (!response.ok) {
        throw new Error('Proiectul nu a putut fi adaugat.');
      }

      const newProject = await response.json();
      setProjects(function (currentProjects) {
        return currentProjects.concat(newProject);
      });
      setTitle('');
      setTech('');
    } catch (err) {
      setError('Eroare: ' + err.message);
    }
  }

  async function handleDeleteProject(id) {
    const confirmed = window.confirm('Sigur doriti sa stergeti acest proiect?');

    if (!confirmed) {
      return;
    }

    setError('');

    try {
      const response = await fetch(API + '/api/projects/' + id, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Proiectul nu a putut fi sters.');
      }

      setProjects(function (currentProjects) {
        return currentProjects.filter(function (project) {
          return project._id !== id;
        });
      });
    } catch (err) {
      setError('Eroare: ' + err.message);
    }
  }

  async function handleToggleStatus(project) {
    setError('');

    try {
      const response = await fetch(API + '/api/projects/' + project._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          done: !project.done,
        }),
      });

      if (!response.ok) {
        throw new Error('Statusul nu a putut fi actualizat.');
      }

      const updatedProject = await response.json();

      setProjects(function (currentProjects) {
        return currentProjects.map(function (currentProject) {
          if (currentProject._id === updatedProject._id) {
            return updatedProject;
          }

          return currentProject;
        });
      });
    } catch (err) {
      setError('Eroare: ' + err.message);
    }
  }

  function startEditing(project) {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditTech(project.tech);
  }

  function cancelEditing() {
    setEditingId('');
    setEditTitle('');
    setEditTech('');
  }

  async function handleSaveEdit(id) {
    setError('');

    try {
      const response = await fetch(API + '/api/projects/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          tech: editTech,
        }),
      });

      if (!response.ok) {
        throw new Error('Proiectul nu a putut fi actualizat.');
      }

      const updatedProject = await response.json();

      setProjects(function (currentProjects) {
        return currentProjects.map(function (currentProject) {
          if (currentProject._id === updatedProject._id) {
            return updatedProject;
          }

          return currentProject;
        });
      });

      cancelEditing();
    } catch (err) {
      setError('Eroare: ' + err.message);
    }
  }

  function sortProjectsByDate(projectList) {
    return [...projectList].sort(function (firstProject, secondProject) {
      return firstProject._id.localeCompare(secondProject._id);
    });
  }

  function filterProjects(projectList) {
    return projectList.filter(function (project) {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.tech.toLowerCase().includes(search.toLowerCase());

      let matchesStatus = true;

      if (statusFilter === 'done') {
        matchesStatus = project.done === true;
      }

      if (statusFilter === 'progress') {
        matchesStatus = project.done === false;
      }

      return matchesSearch && matchesStatus;
    });
  }

  const visibleProjects = sortProjectsByDate(filterProjects(projects));
  const doneCount = projects.filter(function (project) {
    return project.done;
  }).length;

  if (loading) {
    return <p className="message">Se incarca proiectele...</p>;
  }

  return (
    <section className="projects-section">
      <div className="section-header">
        <div>
          <h3>Lista proiectelor</h3>
          <p>Adauga, modifica si gestioneaza proiectele direct din baza de date.</p>
        </div>
      </div>

      <form className="project-form" onSubmit={handleAddProject}>
        <input
          type="text"
          placeholder="Titlu proiect"
          value={title}
          onChange={function (event) {
            setTitle(event.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Tehnologii folosite"
          value={tech}
          onChange={function (event) {
            setTech(event.target.value);
          }}
          required
        />
        <button type="submit" className="button button-primary">
          Adauga proiect
        </button>
      </form>

      <div className="project-toolbar">
        <input
          type="text"
          placeholder="Cauta dupa titlu sau tehnologie"
          value={search}
          onChange={function (event) {
            setSearch(event.target.value);
          }}
        />

        <select
          value={statusFilter}
          onChange={function (event) {
            setStatusFilter(event.target.value);
          }}
        >
          <option value="all">Toate</option>
          <option value="done">Finalizate</option>
          <option value="progress">In lucru</option>
        </select>
      </div>

      {error ? <p className="message error-message">{error}</p> : null}

      <div className="stats-row">
        <div className="mini-stat">
          <strong>{projects.length}</strong>
          <span>Total</span>
        </div>
        <div className="mini-stat">
          <strong>{doneCount}</strong>
          <span>Finalizate</span>
        </div>
        <div className="mini-stat">
          <strong>{projects.length - doneCount}</strong>
          <span>In lucru</span>
        </div>
      </div>

      <div className="project-grid">
        {visibleProjects.length === 0 ? (
          <p className="message">Nu exista proiecte care sa corespunda filtrului.</p>
        ) : (
          visibleProjects.map(function (project) {
            const isEditing = editingId === project._id;

            return (
              <article
                key={project._id}
                className={
                  project.done ? 'project-card done-card' : 'project-card progress-card'
                }
              >
                <div className="project-status">
                  {project.done ? 'Finalizat' : 'In lucru'}
                </div>

                {isEditing ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={function (event) {
                        setEditTitle(event.target.value);
                      }}
                    />
                    <input
                      type="text"
                      value={editTech}
                      onChange={function (event) {
                        setEditTech(event.target.value);
                      }}
                    />
                    <div className="actions">
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={function () {
                          handleSaveEdit(project._id);
                        }}
                      >
                        Salveaza
                      </button>
                      <button
                        type="button"
                        className="button button-muted"
                        onClick={cancelEditing}
                      >
                        Anuleaza
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.tech}</p>
                    <div className="actions">
                      <button
                        type="button"
                        className="button button-edit"
                        onClick={function () {
                          startEditing(project);
                        }}
                      >
                        Editeaza
                      </button>
                      <button
                        type="button"
                        className="button button-success"
                        onClick={function () {
                          handleToggleStatus(project);
                        }}
                      >
                        {project.done ? 'Marcheaza in lucru' : 'Finalizeaza'}
                      </button>
                      <button
                        type="button"
                        className="button button-danger"
                        onClick={function () {
                          handleDeleteProject(project._id);
                        }}
                      >
                        Sterge
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default ProjectList;
