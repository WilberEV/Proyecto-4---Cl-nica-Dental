import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
    },
      { versionKey: false, timestamps: false }
    );
    
    const Treatment = mongoose.model("Treatment", TreatmentSchema);
    
    export default Treatment;
    