import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('blogapp-c12')
const blogPosts = db.collection('blog-posts')

client.connect()
console.log('Connected to Mongo')

app.get('/', async (req, res) => {
	const allPosts = await blogPosts.find().toArray()
	console.log('allPosts -> ', allPosts)
	res.send(allPosts)
})

app.post('/', async (req, res) => {
	const newBlogPost = { title: req.body.title, content: req.body.content }
	await blogPosts.insertOne(newBlogPost)

	const allPosts = await blogPosts.find().toArray()
	res.send(allPosts)
})

app.listen('8080', () => console.log('Api listening on port 8080 😎'))
