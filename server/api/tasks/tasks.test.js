const supertest = require("supertest");
const { app, server } = require("../../index");

const api = supertest(app);

describe("Creating an issue", () => {
  test("Returns status of 200", async () => {
    const newTask = {
      type: "issue",
      title: "Send Message",
      description: "Let pilots send message to Central",
    };

    await api.post("/tasks").send(newTask).expect(200);
  });
});

describe("Creating a bug", () => {
  const newTask = {
    type: "bug",
    description: "Let pilots send message to Central",
  };

  test("Returns status of 200", async () => {
    await api.post("/tasks").send(newTask).expect(200);
  });

  test("Name starts with 'bug-' ", async () => {
    const {
      body: { name },
    } = await api.post("/tasks").send(newTask);
    expect(name.startsWith("bug-"));
  });
});

describe("Creating a task", () => {
  const newTask = {
    type: "bug",
    title: "Send Message",
    category: "Test",
  };

  test("Returns status of 200", async () => {
    await api.post("/tasks").send(newTask).expect(200);
  });
});

afterAll(() => {
  server.close();
});
