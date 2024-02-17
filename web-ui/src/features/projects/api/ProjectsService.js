const apiDomain = window.REACT_APP_API_DOMAIN;

// Get all Projects
export const getProjects = (callback) => {
  fetch(`https://${apiDomain}/projects`)
    .then((response) => response.json())
    .then((data) => {
      data.success = true;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback({
        success: false,
        msg: 'Error calling api.',
        status: error.response && error.response.status ? error.response.status : 'Invalid status',
      });
    });
};

// Add a new project
export const addProject = (project, callback) => {
  fetch(`https://${apiDomain}/projects`, {
    method: 'POST',
    body: JSON.stringify({
      title: project,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      data.success = true;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback({
        success: false,
        msg: 'Error calling api.',
        status: error.response && error.response.status ? error.response.status : 'Invalid status',
      });
    });
};

// Update a project
export const updateProject = (project, callback) => {
  fetch(`https://${apiDomain}/projects/${project._id}`, {
    method: 'POST',
    body: JSON.stringify(project),
  })
    .then((response) => response.json())
    .then((data) => {
      data.success = true;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback({
        success: false,
        msg: 'Error calling api.',
        status: error.response && error.response.status ? error.response.status : 'Invalid status',
      });
    });
};

// delete a project
export const deleteProject = (project, callback) => {
  fetch(`https://${apiDomain}/projects/${project._id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      data.success = true;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback({
        success: false,
        msg: 'Error calling api.',
        status: error.response && error.response.status ? error.response.status : 'Invalid status',
      });
    });
};
