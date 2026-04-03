const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const Topic = require('./models/Topic');
require('dotenv').config();

const topics = [
  { id: 1, title: 'Fetching Data from API', phase: 'ml', folder: '01(Fetching data from api)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/01(Fetching%20data%20from%20api)', order: 1, status: 'published' },
  { id: 2, title: 'Web Scraping', phase: 'ml', folder: '02(Web scraping)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/02(Web%20scraping)', order: 2, status: 'published' },
  { id: 3, title: 'EDA – Univariate', phase: 'ml', folder: '03 EDA(univariate)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/03%20EDA(univariate)', order: 3, status: 'published' },
  { id: 4, title: 'EDA – Multivariate', phase: 'ml', folder: 'EDA(multivariate)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/EDA(multivariate)', order: 4, status: 'published' },
  { id: 5, title: 'Pandas Profiling', phase: 'ml', folder: '05 pandas_profiling', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/05%20pandas_profiling', order: 5, status: 'published' },
  { id: 6, title: 'Feature Engineering', phase: 'ml', folder: '06 Feature Engineering', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/06%20Feature%20Engineering', order: 6, status: 'published' },
  { id: 7, title: 'Simple Regression', phase: 'ml', folder: '07 Simple Regression', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/07%20Simple%20Regression', order: 7, status: 'published' },
  { id: 8, title: 'Logistic Regression', phase: 'ml', folder: '08 Logistic Regression', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/08%20Logistic%20Regression', order: 8, status: 'published' },
  { id: 9, title: 'Decision Trees', phase: 'ml', folder: '09(Decision Trees)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/09(Decision%20Trees)', order: 9, status: 'published' },
  { id: 10, title: 'K-Means Clustering', phase: 'ml', folder: '10(K_means_clustering)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/10(K_means_clustering)', order: 10, status: 'published' },
  { id: 11, title: 'SVM', phase: 'ml', folder: '12(SVM)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/12(SVM)', order: 11, status: 'published' },
  { id: 12, title: 'KNN', phase: 'ml', folder: '13(KNN)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/13(KNN)', order: 12, status: 'published' },
  { id: 13, title: 'PCA', phase: 'ml', folder: '14(PCA)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/14(PCA)', order: 13, status: 'published' },
  { id: 14, title: 'Random Forest', phase: 'ml', folder: '15(Random Forest)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/15(Random%20Forest)', order: 14, status: 'published' },
  { id: 15, title: 'Ensemble Learning', phase: 'ml', folder: '16(Ensemble Learning)', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/16(Ensemble%20Learning)', order: 15, status: 'published' },
  { id: 16, title: 'Project 2', phase: 'proj', folder: 'Project-2', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/Project-2', order: 16, status: 'published' },
  { id: 17, title: 'Project 3', phase: 'proj', folder: 'Project-3', githubUrl: 'https://github.com/QuantumWebber/ML/tree/main/Project-3', order: 17, status: 'published' },
  { id: 18, title: 'Neural Networks', phase: 'dl', folder: 'DL/01_neural_networks', order: 18, status: 'coming_soon' },
  { id: 19, title: 'CNNs', phase: 'dl', folder: 'DL/02_cnn', order: 19, status: 'coming_soon' },
  { id: 20, title: 'RNNs & LSTMs', phase: 'dl', folder: 'DL/03_rnn_lstm', order: 20, status: 'coming_soon' },
  { id: 21, title: 'Transformers', phase: 'dl', folder: 'DL/04_transformers', order: 21, status: 'coming_soon' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Topic.deleteMany({});
  await Topic.insertMany(topics);
  console.log('✅ Database seeded with', topics.length, 'topics!');
  mongoose.disconnect();
}

seed().catch(console.error);