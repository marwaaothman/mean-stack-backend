const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    nom: { type: String },
    prenom: { type: String },
    poste: { type: String },
    experience: { type: Number },
    type_contrat: { type: String },
    date_entree: { type: Date },
    stack_principale: [{type: String }],
    stack_secondaire: [{ type: String }],
    
    
    email: { 
        type: String, 
        required: true, 
        unique: true
      },
      password: {
       type: String, 
       required: true
      },
      is_verified: {
        type: Boolean, 
        default: false
      },
      role: {
        type: String,
        enum: ["MANAGER", "WORKER", "ADMIN"],
        required: true
        },
});
// Custom validation for email
userSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

userSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});


const User= mongoose.model("User", userSchema);
module.exports = User;