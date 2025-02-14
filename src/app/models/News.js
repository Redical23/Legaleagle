import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  featured: { Boolean}
  ,
  category: {
    type: String,
    required: true
  }
});


const News = mongoose.models.News || mongoose.model('News', NewsSchema );

export default News;
