import React, { useState, useEffect } from 'react';

import * as ProjectsService from '../api/ProjectsService';

export const ProjectsContext = React.createContext();

const ProjectsProvider = ({ children }) => {
  console.log('projects context');

  //initial state
  const initialState = {
    // set initial state to local storage if defined.
    projects:
      localStorage.getItem('projects') && localStorage.getItem('projects') !== undefined
        ? JSON.parse(localStorage.getItem('projects'))
        : [],
  };

  const [state, setState] = useState(initialState);

  const addProject = (project, callback) => {
    ProjectsService.addProject(project, (response) => {
      if (response.success) {
        const newProjects = [...state.projects, response.project];

        localStorage.setItem('projects', JSON.stringify(newProjects));

        setState({
          projects: newProjects,
        });
        callback && callback(true);
      } else {
        callback && callback(false);
        //TODO: Handle Failure
      }
    });
  };

  const getProjects = (callback) => {
    // call projects services to get projects and save to context/localstorage
    ProjectsService.getProjects((response) => {
      if (response.success) {
        localStorage.setItem('projects', JSON.stringify(response.projects));

        setState({
          projects: response.projects,
        });

        callback && callback(true);
      } else {
        callback && callback(false);
        //TODO: Handle Failure
      }
    });
  };

  const updateProject = (project, callback) => {
    ProjectsService.updateProject(project, (response) => {
      if (response.success) {
        const index = state.projects.findIndex((project) => project._id === response.project._id);
        let newProjects = state.projects;
        newProjects[index] = response.project;

        localStorage.setItem('projects', JSON.stringify(newProjects));

        setState({
          projects: newProjects,
        });
        callback && callback(true);
      } else {
        callback && callback(false);
        //TODO: Handle Failure
      }
    });
  };

  const deleteProject = (project, callback) => {
    ProjectsService.deleteProject(project, (response) => {
      if (response.success) {
        const newProjects = state.projects.filter((item) => {
          return item._id !== project._id;
        });

        localStorage.setItem('projects', JSON.stringify(newProjects));

        setState({
          projects: newProjects,
        });
        callback && callback(true);
      } else {
        callback && callback(false);
        //TODO: Handle Failure
      }
    });
  };

  // on first load, fetch projects and save to state as well as local storage
  useEffect(() => {
    ProjectsService.getProjects((response) => {
      if (response.success) {
        localStorage.setItem('projects', JSON.stringify(response.projects));
        setState({
          projects: response.projects,
        });
      } else {
        //TODO: Handle Failure
      }
    });
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects: state.projects,
        addProject: addProject,
        getProjects: getProjects,
        updateProject: updateProject,
        deleteProject: deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
