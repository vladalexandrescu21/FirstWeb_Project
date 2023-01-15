import express from 'express';
import { Account, Proiect, Bug } from './repository.mjs';
import {
    getRecords, postRecord, deleteRecords, getRecord, putRecord, headRecord, patchRecord, deleteRecord, checkLogin, checkProject,searchBugs
} from './service.mjs'
//import App from './src/App.js'

const router = express.Router();

router.route('/projectBugs').get((req, res) => { searchBugs(Bug,req, res)});

router.route('/createProject').get((req, res) => { getIdList(Account,req, res)});

router.route('/register').get((req, res) => { checkProject(Proiect, req, res)});

router.route('/login').get((req, res) => checkLogin(Account, req, res));

router.route('/accounts')
    .get((req, res) =>  getRecords(Account, req, res))
    .post((req, res) =>  postRecord(Account, req, res))
    .delete((req, res) =>  deleteRecords(Account, req, res))

router.route('/accounts/:id')
    .get((req, res) =>  getRecord(Account, req, res))
    .head((req, res) =>  headRecord(Account, req, res))
    .put((req, res) =>  putRecord(Account, req, res))
    .patch((req, res) =>  patchRecord(Account, req, res))
    .delete((req, res) =>  deleteRecord(Account, req, res))


router.route('/proiects')
    .get((req, res) =>  getRecords(Proiect, req, res))
    .head((req, res) => headRecord(Proiect, req,res))
    .post((req, res) =>  postRecord(Proiect, req, res))
    .delete((req, res) =>  deleteRecords(Proiect, req, res))
    .put((req, res) =>{
        console.log("inside put pe proiects");
        putRecord(Proiect, req,res)} )

router.route('/proiects/:id')
    .get((req, res) =>  getRecord(Proiect, req, res))
    .head((req, res) =>  headRecord(Proiect, req, res))
    .put((req, res) =>  {
        console.log("inside proiects put");
        putRecord(Proiect, req, res);
    })
    .patch((req, res) =>  patchRecord(Proiect, req, res))
    .delete((req, res) =>  deleteRecord(Proiect, req, res))

router.route('/bugs')
    .get((req, res) =>  {
        console.log("inside bugs get");
        getRecords(Bug, req, res)})
    .post((req, res) =>  postRecord(Bug, req, res))
    .delete((req, res) =>  deleteRecords(Bug, req, res))

router.route('/bugs/:id')
    .get((req, res) =>  getRecord(Bug, req, res))
    .head((req, res) =>  headRecord(Bug, req, res))
    .put((req, res) =>  putRecord(Bug, req, res))
    .patch((req, res) =>  patchRecord(Bug, req, res))
    .delete((req, res) =>  deleteRecord(Bug, req, res))

export default router;