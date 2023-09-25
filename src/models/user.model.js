const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    //Campo para usuario
    username: {
      type: String,
      required: true,
      trim: true, // borra los espacios entre el string
    },

    //Campo para email
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // El email es unico
    },
    //Campo para contrasenia
    password: {
      type: String,
      required: true,
      trim: true,
    },
    roles: [
      {
        ref: "Role", // Indicamos los roles
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true, // Agrega campos de fecha 'createdAt' y 'updatedAt'
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
