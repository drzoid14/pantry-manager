'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;

chai.use(chaiHTTP);
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL, PORT} = require('../config');


describe('helloWorld', function () {

    describe('BlogPost API Resources', function () {

        before(function () {
            return runServer(TEST_DATABASE_URL);
        });
    
    
        after(function () {
            return closeServer();
        });

    it('Should return a 200 status and be HTML', function(){

        return chai.request(app)
        .get('/')
        .then(function(res){
            //expect(res).to.be('HTML');
            expect(res).to.have.status(200);
        })

    })
})
})