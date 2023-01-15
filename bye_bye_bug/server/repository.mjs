import {Sequelize,  DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db',
});

const Account = sequelize.define('account', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    projectName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Proiect = sequelize.define('proiect', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    repoLink: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idList: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bugList: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

const Bug = sequelize.define('bug', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    }, 
    bugName:{
        type: DataTypes.STRING
    },
    accountEmail:{
        type: DataTypes.STRING
    },
   projectName: {
    type: DataTypes.STRING,
   },
   whoToSolve: {
    type: DataTypes.STRING
   },
   isSolved: {
    type: DataTypes.STRING
   },
   severity: {
    type: DataTypes.STRING
   },
   priority: {
    type: DataTypes.INTEGER
    // validate: {
    //     min: 1,
    //     max: 10
    // }
   },
   description: {
    type: DataTypes.STRING
   },
   commitLink: {
    type: DataTypes.STRING
   }
});

// Proiect.hasMany(Bug);

// Account.hasOne(Proiect, {foreignKey: 'accountId'});


async function initialize() {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
}

export {
    initialize,
    Account, Proiect, Bug
}