import express, {json} from 'express';
import cors from "cors";
import {initialize} from './repository.mjs';
import routes from './routes.mjs';

const application = express();
application.use(cors());
application.use(json());
application.use('/api', routes);

application.listen(8080, async () => {
    try{
        await initialize();
    }catch(error){
        console.error(error);
    }
})