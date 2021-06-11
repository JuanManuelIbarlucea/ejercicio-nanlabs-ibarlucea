const API = require("axios").create({ baseURL: `https://api.trello.com/1` });
const randomWords = require("random-words");

const API_PARAMS = {
  params: {
    key: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_API_TOKEN,
  },
};

const CardType = {
  issue: {
    createCard: (name, desc, category) => createIssue(name, desc),
  },
  bug: {
    createCard: (name, desc, category) => createBug(desc),
  },
  task: {
    createCard: (name, desc, category) => createTask(name, category),
  },
};

const generateBugName = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  const word = randomWords();

  return `bug-${word}-${num}`;
};

const getRandomMember = async () => {
  const { data: members } = await API.get(
    `/boards/${process.env.TRELLO_BOARD_ID}/members`,
    API_PARAMS
  );

  return members[Math.floor(Math.random() * members.length)].id;
};

const getLabelId = async (labelName) => {
  const { data: labels } = await API.get(
    `/boards/${process.env.TRELLO_BOARD_ID}/labels`,
    API_PARAMS
  );
  const label = labels.find((label) => label.name === labelName);
  return label.id;
};

const getListId = async (listName) => {
  const { data: lists } = await API.get(
    `/boards/${process.env.TRELLO_BOARD_ID}/lists`,
    API_PARAMS
  );
  const list = lists.find((list) => list.name === listName);
  return list.id;
};

const createBug = async (desc) => {
  const name = generateBugName();
  const idMembers = await getRandomMember();
  const idLabels = await getLabelId("Bug");
  const idList = await getListId("To Do");

  const newParams = {
    params: { ...API_PARAMS.params, name, desc, idMembers, idLabels, idList },
  };

  try {
    const { data } = await API.post(`/cards`, null, newParams);
    return data;
  } catch (error) {
    return error;
  }
};

const createIssue = async (name, desc) => {
  const idList = await getListId("To Do");

  const newParams = {
    params: { ...API_PARAMS.params, name, desc, idList },
  };

  try {
    const { data } = await API.post(`/cards`, null, newParams);
    return data;
  } catch (error) {
    return error;
  }
};


const createTask = async (name, category) => {
  const idLabels = await getLabelId(category);
  const idList = await getListId("To Do");

  const newParams = {
    params: { ...API_PARAMS.params, name, idLabels, idList },
  };

  try {
    const { data } = await API.post(`/cards`, null, newParams);
    return data;
  } catch (error) {
    return error;
  }
};

exports.createCard = ({ type, title, description, category }) => {
  const card = CardType[type].createCard(title, description, category);

  return card;
};
