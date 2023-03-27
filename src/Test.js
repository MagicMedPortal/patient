import { getImageSnap } from "./PatientInfo";

let image = getImageSnap(); 
console.log(getImageSnap()); 

export default function Test() { 
    return(<div><img src={image}/></div>)
}