export function isConnected() {
  if (localStorage.getItem("token") != null) {
    return true;
  } else {
    return false;
  }
}
  
export function colorRole(defaultColor) {
  if (localStorage.getItem("roleAdmin")) {
    return "red";
  } else if (localStorage.getItem("rolePro")) {
    return "blue";
  } else if (localStorage.getItem("roleUser")) {
    return "black";
  }
  return defaultColor;
}
