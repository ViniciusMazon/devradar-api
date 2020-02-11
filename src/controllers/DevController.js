const axios = require('axios');
const Dev = require('../model/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res) {

    const devs = await Dev.find();
    return res.status(200).json(devs);
  },

  async store(req, res) {

    const { github_username, techs, latitude, longitude } = req.body;
    let dev = await Dev.findOne({ github_username });

    if (!dev) {

      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      const response = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = response.data;

      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.status(201).json(dev);
  },

  async update(req, res) {

    await Dev.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.send();
  },

  async destroy(req, res) {

    await Dev.findByIdAndRemove(req.params.id);
    return res.send();
  }
}
