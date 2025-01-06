import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  idDocument: String,
  email: String,
  country: {
    name: String,
    isoCode: String,
  },
  province: {
    name: String,
    isoCode: String,
  },
  canton: String,
  streetAddress: String,
  phone: String,
});

export default addressSchema