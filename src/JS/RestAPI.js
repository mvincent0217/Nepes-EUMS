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

export async function AddEquipment(parentEquipmentID, childEquipmentID){
    var res = await axios.post("http://hayyim-breach:8005/api/EUMS/AddEquipment?parentEquipmentID=" + parentEquipmentID + "&childEquipmentID=" + childEquipmentID);
    return res;
}