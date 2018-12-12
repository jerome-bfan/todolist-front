export function isConnected() {

    if(localStorage.getItem("identityId") != null) {
        console.log("je suis connecté")
        return true;
    }
    else {
        console.log("je suis deconnecté")
        return false;
    }
}