import Treatment from "./model.js";

export const treatmentDetails = async (ID) =>{

    return await Treatment.find({ name: ID });
}