import {before, describe, it} from "mocha"
import {expect} from "chai"
import request from "supertest"
import {app} from "../server"
describe('BLOG', () => {
    describe('POST /blog', () => {
        it("Status check", (done) => {
            request(app).post("/blog")
            .send({nickname: "John", title: 'John Wick', content: "Some dummy content for Mr Wick"})
            .end((err, res) => {
                expect(res.statusCode).is.equal(200)
                done()
            })
        })
        it("Post a blog", (done) => {
            request(app).post("/blog")
            .send({nickname: "John", title: 'John Wick', content: "Some dummy content for Mr Wick"})
            .end((err, res) => {
                expect(res.body).is.an.instanceOf(Object)
                expect(res.body).haveOwnPropertyDescriptor("data")

                expect(res.body.data).haveOwnPropertyDescriptor("id")
                expect(res.body.data).haveOwnPropertyDescriptor("nickname")
                expect(res.body.data).haveOwnPropertyDescriptor("title")
                expect(res.body.data).haveOwnPropertyDescriptor("content")
                expect(res.body.data).haveOwnPropertyDescriptor("createdAt")
                done()
            })
        })
    })
    describe('GET /blog', () => {
        it("Status check", (done) => {
            request(app).get("/blog")
            .end((err, res) => {
                expect(res.statusCode).is.equal(200)
                done()
            })
        })
        it("Get list of all blogs ", (done) => {
            request(app).get("/blog")
            .end((err, res) => {
                expect(res.body).is.an.instanceOf(Object)
                expect(res.body).haveOwnPropertyDescriptor("data")
                expect(res.body).haveOwnPropertyDescriptor("metadata")
                done()
            })
        })
    })
    describe('GET /blog/:id', () => {
        it("Status check", (done) => {
            request(app).get("/blog/1")
            .end((err, res) => {
                expect(res.statusCode).is.equal(200)
                done()
            })
        })
        it("Get blog detail", (done) => {
            request(app).get("/blog/1")
            .end((err, res) => {
                expect(res.body).is.an.instanceOf(Object)
                expect(res.body).haveOwnPropertyDescriptor("data")

                expect(res.body.data).is.an.instanceOf(Object)
                expect(res.body.data).haveOwnPropertyDescriptor("id")
                expect(res.body.data).haveOwnPropertyDescriptor("nickname")
                expect(res.body.data).haveOwnPropertyDescriptor("title")
                expect(res.body.data).haveOwnPropertyDescriptor("content")
                expect(res.body.data).haveOwnPropertyDescriptor("createdAt")
                done()
            })
        })
    })
})

describe('COMMENT', () => {
    describe('POST /comment', () => {
        it("Status check", (done) => {
            request(app).post("/comment")
            .send({nickname: "John Wick", blog_id: 1, content: "Some dummy comment for testing"})
            .end((err, res) => {
                expect(res.statusCode).is.equal(200)
                done()
            })
        })
        it("Post a comment", (done) => {
            request(app).post("/comment")
            .send({nickname: "John Wick", blog_id: 1, content: "Some dummy comment for testing"})
            .end((err, res) => {
                expect(res.body).is.an.instanceOf(Object)
                expect(res.body).haveOwnPropertyDescriptor("data")

                expect(res.body.data).haveOwnPropertyDescriptor("id")
                expect(res.body.data).haveOwnPropertyDescriptor("nickname")
                expect(res.body.data).haveOwnPropertyDescriptor("blog_id")
                expect(res.body.data).haveOwnPropertyDescriptor("content")
                expect(res.body.data).haveOwnPropertyDescriptor("parent_id")
                expect(res.body.data).haveOwnPropertyDescriptor("createdAt")
                done()
            })
        })
    })
    describe('GET /comment/blog/:id', () => {
        it("Status check", (done) => {
            request(app).get("/comment/blog/1")
            .end((err, res) => {
                expect(res.statusCode).is.equal(200)
                done()
            })
        })
        it("Get blog comments", (done) => {
            request(app).get("/comment/blog/1")
            .end((err, res) => {
                expect(res.body).is.an.instanceOf(Object)
                expect(res.body).haveOwnPropertyDescriptor("data")
                expect(res.body.data).is.an.instanceOf(Array)
                done()
            })
        })
    })
})