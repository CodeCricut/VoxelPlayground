const objects = [];

export const addObject = (object) => {
  objects.push(object);
};

export const removeObject = (object) => {
  objects.splice(objects.indexOf(object), 1);
};

export { objects };
