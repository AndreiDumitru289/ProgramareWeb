import ProjectList from '../ProjectList';

function Projects() {
  return (
    <section className="page-section">
      <h2>Proiectele mele</h2>
      <p className="page-text">
        Administreaza proiectele salvate in MongoDB direct din interfata React.
      </p>
      <ProjectList />
    </section>
  );
}

export default Projects;
