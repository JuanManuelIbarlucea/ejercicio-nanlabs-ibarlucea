const Tasks = require('./tasks.model')

exports.createTask = async (req, res, next) => {
  try {
    const newCard = await Tasks.createCard(req.body); 
    res.send(newCard);
  } catch (error) {
    next(error);
  }
};
