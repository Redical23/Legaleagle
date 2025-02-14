import mongoose from 'mongoose';

const constitutionsSchema = new mongoose.Schema({
  applicationNo: {
    type: String,  // Changed from Number to String
    required: true,
    unique: true,
  },
  applicant: {
    type: String,
    required: true,
  },
  courtNo: {
    type: String,  // Changed from Number to String
    required: true,
  },
  oppositeParty: {
    type: String,
    required: true,
  },
  counselForApplicant: {
    type: String,
    required: true,
  }, 
  counselForOppositeParty: {
    type: [String],  // Ensures it can handle arrays
    default: [],     // Prevents errors if no value is provided
  },
  Delivereddate: {
    type: String,
    required: true, // If always present
  },
  "Equivalent citations": {
    type: [String],  // Supports multiple citations
    default: [],     // Prevents errors when missing
  }
});

const Constitution = mongoose.models.Constitution || mongoose.model('Constitution', constitutionsSchema);

export default Constitution;
