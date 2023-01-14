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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    bugList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
   project: {
    type: DataTypes.STRING,
   },
   whoToSolve: {
    type: DataTypes.UUID
   },
   isSolved: {
    type: DataTypes.BOOLEAN
   },
   severity: {
    type: DataTypes.STRING
   },
   priority: {
    type: DataTypes.INTEGER,
    validate: {
        min: 1,
        max: 10
    }
   },
   description: {
    type: DataTypes.STRING
   },
   commitLink: {
    type: DataTypes.STRING
   }
});

Proiect.hasMany(Bug, {foreignKey: 'proiectId'});
Bug.belongsTo(Proiect, {foreignKey: 'proiectId'});

Account.hasMany(Proiect, {foreignKey: 'accountId'});
Proiect.belongsTo(Account, {foreignKey: 'accountId'});

async function initialize() {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
}

export {
    initialize,
    Account, Proiect, Bug
}