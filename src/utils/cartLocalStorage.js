export const storeInLocalStorage = (item, key, value) => {
  let data = localStorage.getItem(item);

  data = data ? JSON.parse(data) : [];

  data.push(value);

  localStorage.setItem(item, JSON.stringify(data));
};
