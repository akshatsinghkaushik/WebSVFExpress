const e = require('express');
const mongoose = require('mongoose');
const { findOneAndUpdate } = require('../models/Users');
const User = mongoose.model('users');
const Project = mongoose.model('project');

const userSchema = require('../models/Users');

module.exports = (app) => {
  app.post('/', async (req, res) => {
    //console.log(req.body);

    const find = await userSchema.findOne({
      googleID: 'abcd',
      'projects.projectID': 'abc',
    });

    const findFile = await userSchema.findOne({
      googleID: 'abcd',
      'projects.projectID': 'abc',
      'projects.userCode.fileName': 'test1',
    });

    if (find === null) {
      res.status('404').send({
        message: 'Not Found',
      });
    } else {
      if (findFile !== null) {
        const projectIndex = findFile.projects.findIndex((project) => {
          return project.projectID === 'abc';
        });
        const codeFileIndex = findFile.projects[
          projectIndex
        ].userCode.findIndex((code) => {
          return code.fileName === 'test1';
        });
        //console.log(findFile.projects[projectIndex].userCode[codeFileIndex]);
        console.log(
          Number(
            findFile.projects[projectIndex].userCode[codeFileIndex].version
          )
        );

        const newVersion =
          Number(
            findFile.projects[projectIndex].userCode[codeFileIndex].version
          ) + 0.1;

        await userSchema.findOneAndUpdate(
          {
            googleID: 'abcd',
            'projects.projectID': 'abc',
            'projects.userCode.fileName': req.body.fileName,
          },
          {
            $set: {
              'projects.$.userCode': {
                fileName: req.body.fileName,
                version: newVersion,
                fileID: 'xyz',
                content: req.body.code,
              },
            },
          }
        );

        res.status('201').send({
          data: req.body.code,
          message: 'code updated in database',
        });
      } else {
        await userSchema.findOneAndUpdate(
          {
            googleID: 'abcd',
            'projects.projectID': 'abc',
          },
          {
            $addToSet: {
              'projects.$.userCode': {
                fileName: req.body.fileName,
                version: '1.0',
                fileID: 'xyz',
                content: req.body.code,
              },
            },
          }
        );

        res.status('201').send({
          data: req.body.code,
          message: 'code added to database',
        });
      }
    }
  });
};
