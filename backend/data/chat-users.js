const chat_users = [];

export const addUser = ({ id, name, room }) => {
  console.log("name,room", name, room);
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUserCheck = chat_users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUserCheck) {
    return { error: "Username is already taken" };
  }

  const user = { id, name, room };
  chat_users.push(user);

  return { user };
};

export const removeUser = (id) => {
  const index = chat_users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return chat_users.splice(index, 1)[0];
  }
};

export const getUser = (id) => {
  return chat_users.find((user) => user.id === id);
};

export const getUsersOfRoom = (room) =>
  chat_users.filter((user) => user.room === room);
