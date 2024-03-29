import axios from "axios";
export async function GetAPI(url){
    var res = await axios.post(url);
    return res;
}
export async function PostAPI(url, payload){
    var res = await axios.post(url, { payload });
    return res;
}
export async function GetEquipmentID(equipmentID){
    var res = await axios.post('http://hayyim-breach:8005/api/EUMS/GetEquipment?equipmentID=' + equipmentID);
    return res;
}
export async function GetAllEquipments(){
    var res = await axios.post('http://hayyim-breach:8005/api/EUMS/GetEquipments');
    return res;
}

export async function GetProductivityStates(){
    var res = await axios.post('http://hayyim-breach:8005/api/EUMS/GetProductivityStates');
    return res;
}

export async function AuthenticateUser(userID,password){
    var res = await axios.post('http://hayyim-breach:8005/api/EUMS/AuthenticateUser?userID=' + userID + '&password=' + password);
    return res;
}

export async function AddEquipment(parentEquipmentID, childEquipmentID, userID){
    var res = await axios.post("http://hayyim-breach:8005/api/EUMS/AddEquipment?parentEquipmentID=" + parentEquipmentID + "&childEquipmentID=" + childEquipmentID + "&UserID=" + userID);
    return res;
}
export async function RemoveEquipment(parentEquipmentID, childEquipmentID, userID){
    var res = await axios.post("http://hayyim-breach:8005/api/EUMS/RemoveEquipment?parentEquipmentID=" + parentEquipmentID + "&childEquipmentID=" + childEquipmentID + "&UserID=" + userID);
    return res;
}
export async function ApplicableEquipments(parentEquipmentID){
    var res = await axios.post("http://hayyim-breach:8005/api/EUMS/GetApplicableEquipmentIDs?parentEquipmentID=" + parentEquipmentID);
    return res;
}

export async function GetAllActiveSessions(){
    var res = await axios.post("http://hayyim-breach:8005/api/EUMS/GetAllActiveSessions?userID=*");
    return res;
}

export async function AddSession(userID, sessionID, expiryDate){
    var res = await axios.post("http://hayyim-breach:8005/api/EUMS/AddSession?userID=" + userID + "&sessionID=" + sessionID + "&expiryDate=" + expiryDate);
    return res;
}

export async function UpdateSession(userID, expiryDate){
    var res = await axios.post("http://hayyim-breach:8005/api/EUMS/UpdateSession?userID=" + userID + "&expiryDate=" + expiryDate);
    return res;
}

export async function DeleteSession(userID){
    var res = await axios.post("http://hayyim-breach:8005/api/EUMS/DeleteSession?userID=" + userID );
    return res;
}