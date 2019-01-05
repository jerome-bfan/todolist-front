export function isConnected() {

    if(localStorage.getItem("identityId") != null) {
        return true;
    }
    else {
        return false;
    }
}