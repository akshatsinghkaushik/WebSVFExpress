const mongoose = require('mongoose');
const { Schema } = mongoose;
//require('./Projects');

const userCodeFileSchema = new Schema({
  fileName: String,
  version: String,
  fileID: String,
  content: String,
});
mongoose.model('userCodeFile', userCodeFileSchema);

const userCodeSchema = new Schema({
  files: [userCodeFileSchema],
});
mongoose.model('userCode', userCodeSchema);

const projectSchema = new Schema({
  projectID: String,
  userCode: [userCodeFileSchema],
});
mongoose.model('project', projectSchema);

const userSchema = new Schema({
  googleID: String,
  projects: [projectSchema],
});

mongoose.model('users', userSchema);

module.exports = mongoose.model('users', userSchema);
