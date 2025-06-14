import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';

// Interface untuk properti User
export interface IUser extends Document {
  email: string;
  password?: string; // `?` menandakan opsional karena tidak selalu kita ambil
  name?: string; // Tambahkan field lain jika perlu
  role?: 'admin' | 'editor';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        trim: true,
    },
    password: { 
        type: String, 
        required: true, 
        select: false, 
    },
    name: { type: String },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
  },
  { timestamps: true }
);

// Middleware (hook) yang berjalan sebelum dokumen disimpan (`.save()`)
UserSchema.pre<IUser>('save', async function (next) {
  // Hanya hash password jika field ini baru atau diubah
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

// Method untuk membandingkan password yang diinput dengan yang ada di database
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;