import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username ist erforderlich"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "E-Mail ist erforderlich"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Passwort ist erforderlich"],
    },

    street: {
      type: String,
      required: [true, "Straße ist erforderlich"],
      trim: true,
    },

    zip: {
      type: String,
      required: [true, "PLZ ist erforderlich"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "Ort ist erforderlich"],
      trim: true,
    },

    // Rolle für den Admin-Bereich (wichtig für die Security)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { 
    timestamps: true,
    // toJSON Transformation für API-Responses
    toJSON: {
      transform: (doc, ret: any) => {
        // Durch den Cast auf 'any' wird der TS2790 Fehler behoben
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexierung für performante Login-Abfragen
UserSchema.index({ email: 1 });

// Export des Modells mit Prüfung auf bestehende Instanz (Hot Reload Safe)
const User = models.User || model("User", UserSchema);

export default User;