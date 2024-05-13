"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

// Test
describe("Games API", () => {
    describe("GET /game/allUsersName", () => {
        it("Should get all users' names", (done) => {
            chai.request(app)
                .get("/game/allUsersName")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe("GET /game/allGamePoints", () => {
        it("Should get all game points", (done) => {
            chai.request(app)
                .get("/game/allGamePoints")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe("GET /game/allTimesPlayed", () => {
        it("Should get all times played", (done) => {
            chai.request(app)
                .get("/game/allTimesPlayed")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe("POST /game/user", () => {
        it("Should create a new user's game data", (done) => {
            const user = {
                name: "Jane", // Replace with a unique name
                gamePoints: 0,
                timesPlayed: 0
            };
            chai.request(app)
                .post("/game/user")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(user.name);
                    res.body.should.have.property('gamePoints').eql(user.gamePoints);
                    res.body.should.have.property('timesPlayed').eql(user.timesPlayed);
                    done();
                });
        });
    });
});