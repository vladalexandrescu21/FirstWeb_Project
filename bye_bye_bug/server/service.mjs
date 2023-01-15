import { Sequelize } from "sequelize";
function valid(Model, payload) {
    console.log("bun");
    return Object.entries(Model.tableAttributes).reduce((valid, [name, field]) => {
        if(valid && !field._autoGenerated && !field.primaryKey && !payload[name]) {
            valid = false;
        }
        return valid;
    }, true)
}

async function searchBugs(Model, request, response){
    try{
        var bugList = await Model.findAll({where: {accountEmail: request.query.accountEmail}});
        if(bugList){
            response.status(200).json(bugList);
        }
        else{
            response.status(404).send({message: "no bugs"});
        }
        
    }
    catch(error){
        response.status(500).json(error);
    }
}

async function getIdList(Model, request, response) {
    try{
        console.log("name", request.query.name);
        var idList = await Model.findOne({where: {projectName: request.query.name}});
        response.status(200).send({id: idList});
    }
    catch(error){
        response.status(500).json(error);
    }
}

async function checkLogin(Model, request, response){
    try{
        // let sql = `SELECT * FROM accounts WHERE (username = "${request.body.username}" AND password = "${request.body.password}")`;
        // db.all(sql, function(err, rows) {
        //     rows.forEach(function(row){
        //         if(row.username == request.body.username && row.password == request.body.password){
        //             response.status(201).send();
        //         }
        //         else{
        //             response.status(404).send();
        //         }
        //     })
        // })
        console.log(request.query)
        var user = await Model.findOne({where: {email: request.query.email, password: request.query.password}});
        console.log(user);
        if(user === null){
            response.status(404).send({message: "User not found"});
        }
        else{
            response.status(201).send(user);
        }
    }catch(error){
        response.status(500).json(error);
    }
}

async function checkProject(Model, request, response){
    try{
        var project = await Model.findOne({where: {name: request.query.projectName}});
        console.log(project);
        if(project === null){
            response.status(404).send({message: "Project not found"});
        }
        else{
            console.log("inside else");
            response.status(201).send(project);
        }
    }
    catch(error){
        console.log(error);
        response.status(500).json(error);
    }
}

async function getRecords(Model, request, response){
    try{
        console.log("before record");
        let records = await Model.findAll();
        console.log("records");
        if(records.length > 0){
            response.status(200).json(records);
        }
        else{
            response.status(204).send(); //status no content
        }
    }catch(error){
        response.status(500).json(error);
    }
}

async function postRecord(Model, request, response){
    try{
        console.log("postRecord");
        //valid(Model, request.body)
        if(1 == 1){
            console.log("validare buna");
            let record = await Model.create(request.body);
            console.log("record created");
            response.status(201) // status created
            //.location(`http://${request.headers.host}${request.baseUrl}${request.url}${request.url.endsWith('/') ? '' : '/'}${record.id}`)
            .location(`${record.id}`)
            .send();
        }else{
            response.status(400).send(); //status bad request
        }
    }catch(error){
        response.status(500).json(error);
    }
}

async function deleteRecords(Model, request, response){
    try{
        await Model.truncate();
        response.status(204).send();
    }catch(error){
        response.status(500).json(error);
    }
}

async function getRecord(Model, request, response){
    try{
        console.log("inside get");
        let record = await Model.findByPk(request.params.id);
        if(record){
            response.status(200).json(record);
        }else{
            response.status(404).send();
        }
    }catch(error){
        response.status(500).json(error);
    }
}

async function putRecord(Model, request, response){
    console.log("before record");
    try{
        console.log("before record");
        let record = await Model.findOne({where: {name: request.params.id}});
        console.log("record", record);
        console.log("body", request.body)
        if(record){
            // if(valid(Model, request.body)){
                await record.update(request.body);
                console.log("record after update", record);
                response.status(204).send();
            // }else{
            //     response.status(400).send();
            // }
        }else{
            response.status(404).send();
        }
    }catch(error){
        console.log(request.params);
        console.log(error);
        response.status(500).json(error);
    }
}

async function headRecord(Model, request, response){
    try{
        response.status(await Model.findByPk(request.params.id) ? 204 : 404).send();
    }catch(error){
        response.status(500).json(error);
    }
}

async function patchRecord(Model, request, response){
    try{
        console.log("inside patch");
        let record = await Model.findByPk(request.params.id);
        if(record){
            Object.entries(request.body).forEach(([name, value]) => record[name] = value);

            await record.save();
            response.status(204).send();
        }else{
            response.status(404).send();
        }
    }catch(error){
        response.status(500).json(error);
    }
}

async function deleteRecord(Model, request, response){
    try{
        let record = await Model.findByPk(request.params.id);
        if(record){
           await record.destroy();
           response.status(204).send();
        }else{
            response.status(404).send();
        }
    }catch(error){
        response.status(500).json(error);
    }
}






export {
    getRecords, postRecord, deleteRecords, getRecord, putRecord, headRecord, patchRecord,
     deleteRecord, checkLogin, checkProject,getIdList,searchBugs
}