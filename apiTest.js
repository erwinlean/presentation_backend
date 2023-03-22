const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Games API", () => {
    // Test the GET endpoint for all users' names
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

    // Test the GET endpoint for all game points
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

    // Test the GET endpoint for all times played
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
});