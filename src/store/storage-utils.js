export function getLsItem(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function setLsItem(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
  return getLsItem(name);
}

export function removeLsItem(name) {
  localStorage.removeItem(name);
}

export function clearAll() {
  localStorage.clear();
}
