const { ROLES } = require("../config/constant");
const User = require("../models/").User;
const Role = require("../models/").Role;
const { sequelize } = require("../models/");
const bcryptjs = require("bcryptjs");

module.exports = {
    isUsername(req) {
        return User.count({
            where: {
                username: req.body.username
            }
        });
    },

    isEmail(req) {
        return User.count({
            where: {
                email: req.body.email
            }
        });
    },

    checkRole(req) {
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    return req.body.roles[i];
                }
            }
        }

        return null;
    },

    async register(req) {
        const t = await sequelize.transaction();
        try {
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 8)
            }, { transaction: t });

            if (req.body.roles) {
                const roles = await Role.findAll({
                    attributes: ['id'],
                    where: {
                        name: req.body.roles
                    }
                });

                await user.setRoles(roles, { transaction: t });
            } else {
                await user.setRoles([1], { transaction: t });
            }

            await t.commit();
            return null;
        } catch (error) {
            await t.rollback();
            return error;
        }
    }
}