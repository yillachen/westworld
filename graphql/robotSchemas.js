var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var RobotModel = require("../models").Robot;
// const defaultRobot = require("../public/images/default.png");

var robotType = new GraphQLObjectType({
  name: "robot",
  fields: function () {
    return {
      id: {
        type: GraphQLInt,
      },
      name: {
        type: GraphQLString,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      fuelType: {
        type: GraphQLString,
        defaultValue: "Electric",
      },
      fuelLevel: {
        type: GraphQLInt,
        defaultValue: 100,
        validate: {
          min: 0,
          max: 100,
        },
      },
      imageUrl: {
        type: GraphQLString,
        // defaultValue: defaultRobot,
      },
    };
  },
});

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      robots: {
        type: new GraphQLList(robotType),
        resolve: function () {
          const robots = robotModel.findAll({
            order: [["id"]],
          });
          if (!robots) {
            throw new Error("Error");
          }
          return robots;
        },
      },
      robot: {
        type: robotType,
        args: {
          id: {
            name: "id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const robotDetails = robotModel.findByPk(params.id).exec();
          if (!robotDetails) {
            throw new Error("Error");
          }
          return robotDetails;
        },
      },
    };
  },
});

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addRobot: {
        type: robotType,
        args: {
          name: {
            type: GraphQLString,
            allowNull: false,
            validate: {
              notEmpty: false,
            },
          },
          fuelType: {
            type: GraphQLString,
            defaultValue: "Electric",
          },
          fuelLevel: {
            type: GraphQLInt,
            defaultValue: 100,
            validate: {
              min: 0,
              max: 100,
            },
          },
          imageUrl: {
            type: GraphQLString,
            // defaultValue: defaultRobot,
          },
        },
        resolve: function (root, params) {
          const robotModel = new robotModel(params);
          const newRobot = robotModel.save();
          if (!newRobot) {
            throw new Error("Error");
          }
          return newRobot;
        },
      },
      updateRobot: {
        type: robotType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLInt),
          },
          name: {
            type: GraphQLString,
            allowNull: false,
            validate: {
              notEmpty: false,
            },
          },
          fuelType: {
            type: GraphQLString,
            defaultValue: "Electric",
          },
          fuelLevel: {
            type: GraphQLInt,
            defaultValue: 100,
            validate: {
              min: 0,
              max: 100,
            },
          },
          imageUrl: {
            type: GraphQLString,
            // defaultValue: defaultRobot,
          },
        },
        resolve(root, params) {
          return robotModel
            .findByPk(params.id)
            .then((robot) => {
              if (!robot) {
                throw new Error("Not found");
              }
              return robot
                .update({
                  name: params.name || robot.name,
                  fuelLevel: params.fuelLevel || robot.fuelLevel,
                  fuelType: params.fuelType || robot.fuelType,
                  imageUrl: params.imageUrl || robot.imageUrl,
                })
                .then(() => {
                  return robot;
                })
                .catch((error) => {
                  throw new Error(error);
                });
            })
            .catch((error) => {
              throw new Error(error);
            });
        },
      },
      removeRobot: {
        type: robotType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(root, params) {
          return robotModel
            .findByPk(params.id)
            .then((robot) => {
              if (!robot) {
                throw new Error("Not found");
              }
              return robot
                .destroy()
                .then(() => {
                  return robot;
                })
                .catch((error) => {
                  throw new Error(error);
                });
            })
            .catch((error) => {
              throw new Error(error);
            });
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
