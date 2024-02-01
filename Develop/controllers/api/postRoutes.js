// Imports
const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new blog post
