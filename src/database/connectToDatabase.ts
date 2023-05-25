import mongoose from "mongoose";

const connectToDatabase = async (mongodbUrl: string) => {
  mongoose.set("debug", true);
  mongoose.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      delete ret._id;
    },
  });

  await mongoose.connect(mongodbUrl);
};

export default connectToDatabase;
