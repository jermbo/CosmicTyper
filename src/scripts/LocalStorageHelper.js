export function getLsItem(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function setLsItem(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
  return getLsItem(name);
}

export function clearLsItem(name) {
  localStorage.clear(name);
}
